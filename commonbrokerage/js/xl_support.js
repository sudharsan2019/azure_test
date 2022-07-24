$(document).on('click', '.xl_quoteBtn', function() {
    try {
        $('.loader').show();
        var gl_acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var gl_rqbi_id = rqbi_id;
        var import_flag = 1; //inital account;
        $.ajax({
            url: laravel_url+"/create_xl_acct",
            type:'post',
            data : {acct_id : gl_acct_id, import_flag : import_flag},
            success:function(response) {
                if (response.status == 1) {
                    xl_add_rqbi(response.new_acct_id, gl_acct_id, gl_rqbi_id);
                    if (response.lob == 'XSLiability') {
                        xl_lob_change = true;
                    } else {
                        xl_lob_change = false;
                    }
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
});


function xl_add_rqbi(xl_id, gl_acct_id, gl_rqbi_id) {
    try {
        var xl_com_id = (new Date).getTime();
        var created_by = localStorage.getItem('usernumericid');
        var import_flag = 1; //inital account;
        var generate_quote_version = 0;
        $.ajax({
            url: laravel_url+"/xl_add_rqbi",
            type:'post',
            data : {acct_id : xl_id, com_id : xl_com_id, rqbi_id : gl_rqbi_id, created_by : created_by, import_flag : import_flag},
            success:function(response) {
                var xl_rqbi_id = response.xl_rqbi_id;
                xl_import_gl(xl_id, xl_rqbi_id, xl_com_id, gl_acct_id, gl_rqbi_id, generate_quote_version);
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function xl_import_gl(xl_acct_id, xl_rqbi_id, xl_com_id, gl_acct_id, gl_rqbi_id, generate_quote_version) {
    try {
        var created_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_import_gl",
            type:'post',
            data:{xl_acct_id:xl_acct_id, xl_rqbi_id:xl_rqbi_id, xl_com_id:xl_com_id, gl_acct_id:gl_acct_id, gl_rqbi_id:gl_rqbi_id, created_by:created_by, generate_quote_version:generate_quote_version},
            success: function (response) {
                if (response.status == 1) {
                    $('.xl_importBtns').removeClass('d-none');
                    var hasclass = $('.xl_importGlBtn').hasClass('xl_clearimport')
                    if (hasclass == false) {
                        $('.xl_importGlBtn').addClass('xl_clearimport');
                        $('.xl_importGlBtn').removeClass('btn-success').addClass('btn-danger');
                        $('.xl_importGlBtn').removeClass('xl_importfromgl');
                        $('.xl_importGlBtn').html('Clear import from GL');
                    }
                }
            },
            complete:function() {
                if (generate_quote_version == 0) {
                    var check_parent_child = 1;
                    getspecificaccount(xl_acct_id, check_parent_child);
                } else {
                    $('.covLimitAccordHead').addClass('collapsed');
                    $('#coverageLimitAccord').removeClass('show');
                    clear_coverages(0);
                    updateQuoteNameBasedTotalPremium();
                    get_rqbitable_Details(xl_acct_id,xl_rqbi_id);
                    get_rqbiLocations (xl_acct_id,'','');
                    $('#coverageLimit_sec').attr('data_coverage_retrieved', 0);
                    
                }
                $('.loader').hide();
            }

        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '.xl_gotoXLBtn', function() {
    $('.loader').show();
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var account_flag = 2; //retrieve xl account
    goto_btn_retrieval(acct_id, account_flag);
});

$(document).on('click', '.xl_gotoGLBtn', function() {
    $('.loader').show();
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var account_flag = 1; //retrieve gl account
    goto_btn_retrieval(acct_id, account_flag);
});

function goto_btn_retrieval(acct_id, account_flag){
    try {
        $.ajax({
            url: laravel_url+"/goto_account",
            type:'post',
            data : {acct_id : acct_id, account_flag : account_flag},
            success:function(response) {
                if(response.status == 1) {
                    var check_parent_child = 1;
                    getspecificaccount(response.acct_id, check_parent_child);
                    new PNotify({ title: 'Success', text: 'moved successfully', delay: 1000, type: 'success' });
                }
            },
            complete:function() {
                $('.loader').hide();
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function xl_clear_import(){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_clear_import",
            type:'post',
            data : {acct_id:acct_id, rqbi_id:xl_rqbi_id, com_id:com_id, deleted_by:deleted_by},
            success:function(response) {
                if(response.status == 1) {
                    $('.xl_importGlBtn').addClass('xl_importfromgl');
                    $('.xl_importGlBtn').removeClass('xl_clearimport');
                    $('.xl_importGlBtn').removeClass('btn-danger').addClass('btn-success');
                    $('.xl_importGlBtn').html('<i class="fa fa-arrow-down text-white"></i>Import from GL');
                    save_ugl_default_accord(com_id, xl_rqbi_id);
                    updateQuoteNameBasedTotalPremium();
                    new PNotify({ title: 'Success', text: 'Cleared successfully', delay: 1000, type: 'success' });
                }
            },
            complete:function() {
                $('.covLimitAccordHead').addClass('collapsed');
                $('#coverageLimitAccord').removeClass('show');
                clear_coverages(0);
                get_rqbitable_Details(acct_id,xl_rqbi_id);
                get_rqbiLocations (acct_id,'','');
                if($('#xlUgl_div').html().trim() == ''){
                    $.ajax({
                        url: '/brokerage/template/xl_Ugl.php',
                        method: 'post',
                        success: function(res1) {
                            $('#xlUgl_div').html(res1);
                        }
                    });
                }
                $('#coverageLimit_sec').attr('data_coverage_retrieved', 0);
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '.xl_importfromgl', function() {
    xl_has_manual_data();
});

function xl_has_manual_data(){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_has_manual_data",
            type:'post',
            data : {acct_id : acct_id, rqbi_id : xl_rqbi_id, deleted_by : deleted_by},
            success:function(response) {
                if (response.has_manual_data == 1) {
                    $('.xl_importBtns').append('<div class="alert alert-warning xlImportGl_alert xlImportClear_alert shadow-lg text-center mr-2" role="alert"><div class="alert-header d-inline"> Select Yes to clear all Manual entries in ULGL/ ULL/ UEBL/ USG coverage and continue with Import from GL. Select No to cancel</div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success xlImportGl_yes mr-1" data-has_submission="'+response.has_submission+'"> Yes </button> <button type="button" class="btn btn-xs btn-danger xlImportClear_no"> No </button></div></div>');
                } else {
                    if(response.has_submission == 1){
                        xl_update_rqbi();
                    } else {
                        update_xl_acct();
                    }
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click', '.xlImportGl_yes', function() {
    var has_submission = $(this).data('has_submission');
    xl_clear_manual_data(has_submission);
    $('.xlImportClear_alert').remove();
    new PNotify({ title: 'Success', text: 'Imported successfully', delay: 1000, type: 'success' });
});



function xl_clear_manual_data(import_type){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_clear_manual_data",
            type:'post',
            data : {acct_id : acct_id, rqbi_id : xl_rqbi_id, deleted_by : deleted_by},
            success:function(response) {
                if(response.status == 1) {
                    if (import_type == 1) {
                        xl_update_rqbi();
                    } else {
                        update_xl_acct();
                    }
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function update_xl_acct() {
    try {
        var xl_acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var import_flag = 2; //reimport
        $.ajax({
            url: laravel_url+"/create_xl_acct",
            type:'post',
            data : {acct_id : xl_acct_id, import_flag : import_flag},
            success:function(response) {
                if (response.status == 1) {
                    xl_update_rqbi();
                    get_xl_account_info();
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function xl_update_rqbi() {
    try {
        var updated_by = localStorage.getItem('usernumericid');
        var xl_acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var import_flag = 2 //reimport
        var generate_quote_version = 1;
        $.ajax({
            url: laravel_url+"/xl_add_rqbi",
            type:'post',
            data : {acct_id : xl_acct_id, com_id : com_id, rqbi_id : xl_rqbi_id, updated_by : updated_by, import_flag : import_flag},
            success:function(response) {
                xl_import_gl(xl_acct_id, xl_rqbi_id, com_id, response.gl_acct_id, response.gl_rqbi_id, generate_quote_version);
            },
            complete:function() {
                $('.xl_importGlBtn').addClass('xl_clearimport');
                $('.xl_importGlBtn').removeClass('xl_importfromgl');
                $('.xl_importGlBtn').removeClass('btn-success').addClass('btn-danger');
                $('.xl_importGlBtn').html('Clear import from GL');
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function xl_supported_to_unsupported() {
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var xl_rqbi_id = rqbi_id;
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_supported_to_unsupported",
            type:'post',
            data : {acct_id : acct_id, rqbi_id : xl_rqbi_id, com_id:com_id, deleted_by : deleted_by},
            success:function(response) {
                save_ugl_default_accord(com_id, xl_rqbi_id);
                updateQuoteNameBasedTotalPremium();
            },
            complete:function() {
                clear_coverages(1);
                clear_ugl();
                get_rqbitable_Details(acct_id,xl_rqbi_id);
                get_rqbiLocations (acct_id,'','');
                setTimeout(function(){ brok_xl_retrieve(com_id); }, 3000);
                check_xl_supported(xl_rqbi_id);
            }
        });
    }
    catch(err) {
		console.log(err);
		
	} 
}

function clear_ugl() {
    try {
        var ugl_checked = $('#xlCov_gl').prop('checked');
        if (ugl_checked == false) {
            $('#xlCov_gl').prop('checked', true);
        }
        $.ajax({
            url: '/brokerage/template/xl_Ugl.php',
            method: 'post',
            success: function(res) {
                $('#xlUgl_div').html(res);
            },
        });
    }
    catch(err) {
		console.log(err);
		
	} 
}

function check_xl_supported(xl_rqbi_id) {
    try {
        if (xl_rqbi_id != '' && xl_rqbi_id != undefined) {
            var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
            $.ajax({
                url: laravel_url+"/check_xl_supported",
                type:'post',
                data : {acct_id : acct_id, rqbi_id : xl_rqbi_id, com_id:com_id},
                success:function(response) {
                    if (response.is_supported == 1) {
                        $('.xl_importBtns').removeClass('d-none');
                        if (response.is_imported == 1) {
                            var hasclass = $('.xl_importGlBtn').hasClass('xl_clearimport')
                            if (hasclass == false) {
                                $('.xl_importGlBtn').addClass('xl_clearimport');
                                $('.xl_importGlBtn').removeClass('xl_importfromgl');
                                $('.xl_importGlBtn').removeClass('btn-success').addClass('btn-danger');
                                $('.xl_importGlBtn').html('Clear import from GL');
                            }
                        } else if (response.is_imported == 2) {
                            var hasclass = $('.xl_importGlBtn').hasClass('xl_importfromgl')
                            if (hasclass == false) {
                                $('.xl_importGlBtn').addClass('xl_importfromgl');
                                $('.xl_importGlBtn').removeClass('xl_clearimport');
                                $('.xl_importGlBtn').removeClass('btn-danger').addClass('btn-success');
                                $('.xl_importGlBtn').html('<i class="fa fa-arrow-down text-white"></i>Import from GL');
                            }
                        }
                    } else {
                        var xl_btn_status = $('.xl_importBtns').hasClass('d-none');
                        if (xl_btn_status == false) {
                            $('.xl_importBtns').addClass('d-none');
                        }
                    }
                },
                complete:function() {
                    
                }
            });
        }
        
    }
    catch(err) {
    console.log(err);
    
  } 
  }
  

$(document).on('click','.xlClearGl_yes',function() {
    $('.xlImportClear_alert').remove();
    xl_clear_import();
});

function check_has_xl_acct(){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/check_has_xl_acct",
            type:'post',
            data:{acct_id:acct_id},
            success: function (response) {
                if (response.has_xl_acct == 1) {
                    $('.xl_quoteBtn').addClass('disabled');
                    $('.gl_goXl').removeClass('d-none');
                    $('.xl_importBtns').addClass('d-none');
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function check_has_gl_submission(){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/check_has_gl_submission",
            type:'post',
            data:{acct_id:acct_id, rqbi_id:rqbi_id},
            success: function (response) {
                if (response.has_submission == 1) {
                    xl_uctAppend('hide');
                    $('.support_unsupportDiv').after('').after('<div class="form-row xl_submisNoDiv mt-2 mb-4"><label class="col-form-label fontBold mr-1"> Submission # </label> <div class="col-auto"><input type="text" class="form-control form-control-sm border-primary xl_submissionNo" ></div> </div>');
                    $(".xl_submissionNo").val(response.gl_submission_number);
                } else {
                    xl_uctAppend('show');
                    $('.xl_submisNoDiv').addClass('d-none');
                    $('.xl_submisNoDiv').remove();
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function get_xl_account_info(){
    try {
        var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/getspecificaccount",
            type:'post',
            data:{accid:acct_id,check_parent_child:1},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                setTimeout(function() {
                    var obj = jQuery.parseJSON(response);
                
                    $('.session_hide_tab').find('.active').find('.accountid').val('');
                    $('.session_hide_tab').find('.active').find('.accountid').val(obj.id);
                    $('#ac_tname').val(obj.accountname);
                    $('#hidden_id').val(accid);
                    // $('#ac_tbroker').val(obj.broker);
                    if (obj.broker == null) {
                        var selected_brok = '';
                        $('.invalid_brok_alert').removeAttr('style').css('display', 'grid');
                        $('#ac_tbroker').addClass('errorBorder');
                    } else {
                        var selected_brok = obj.broker;
                    }
                    $('#ac_tbroker').val(selected_brok);
                    $('#ac_ttype').val(obj.accounttype);
                    $('#singleselect').val(obj.lob);
                    $('#ac_tstatus').val(obj.accountstatus);
                    $('#ac_tpass').val(obj.primary_assignee);
                    $('#ac_tsass').val(obj.secondary_assignee);
                    $('#ac_tpri').val(obj.priority);
                    $('#ac_tipre').val(obj.indication_premium);
                    $('#ac_tqpre').val(obj.quote_premium);
                    $('#business_unit').val(obj.business_unit);
                    $('#brokerageDba').val(obj.dba);
                    $('#insuredType').val(obj.insured_type);
                    $('#businessDescription').val(obj.business_description);
                    $('#njTransaction').val(obj.nj_transaction);
                    $('#pg_policyNumber').val(obj.program_policy_number)
                
                    var submission_number = obj.submission_number;
                    if (obj.policy_number != null) {
                        submission_number = obj.policy_number;
                        $('#sub_text').html('Policy # : <strong>' + submission_number + '</strong>');
                        $('#policy_no').text(submission_number);
                    } else {
                        $('#sub_text').html('Submission # : <strong>' + submission_number + '</strong>');
                        $('#sub_number').text(submission_number);
                    }
                
                    menu_permission();
                
                
                    if (obj.insured_type_other != null) {
                        $('.insuredtype_other_div').show();
                        $('.insuredType_Other').val(obj.insured_type_other)
                    } else {
                        $('.insuredType_Other').val('')
                        $('.insuredtype_other_div').hide();
                    }
                
                    $('.primary_log_details_remove_btn').click();
                
                
                    if (obj.acc_effective_date != null) {
                        $('#effect_dt').datepicker('setDate', formatedate(obj.acc_effective_date));
                    } else {
                        $('#effect_dt').datepicker("setDate", null);
                    }
                
                    if (obj.acc_expiry_date != null) {
                        $('#expire_dt').datepicker('setDate', formatedate(obj.acc_expiry_date));
                    } else {
                        $('#expire_dt').datepicker("setDate", null);
                    }
                
                
                
                    $('#ac_mailAdd').val(obj.acc_address);
                    $('#ac_mailAdd_zip').val(obj.acc_zip);
                
                    if (obj.acc_city != '') {
                        append_city1_retrival(obj.acc_zip, obj.acc_city);
                        isopricing_mail(accid);
                    }
                
                
                    if (obj.child_accountid == null) {
                        getchildaccount(obj.id);
                    }
                
                    // $('#ac_mailAdd_city').val(obj.acc_city);
                    $('#ac_mailAdd_state').val(obj.acc_state);
                    $('#ac_quteNo').val(obj.quote_number);
                    $('#ac_poliNo').val(obj.policy_number);
                
                    var indval = $('#rqbiSubmission').val();
                    if (indval != 0) {
                
                    } else {
                
                
                        var rqbitab = setInterval(function() {
                            $('#pills-rqbi-tab').trigger('click');
                            clearInterval(rqbitab);
                        }, 200);
                    }
                
                    if (obj.business_segment == null) {
                        $("#business_segment option:first").prop('selected', true);
                    } else {
                        $('#business_segment').val(obj.business_segment);
                    }
                
                    $('#acc_crdate').text(formatedate(obj.createdate));
                
                    var archivebindval = '';
                    var action_reason = '';
                    if (obj.action_reason !== null) {
                        action_reason = obj.action_reason;
                    } else {
                        action_reason = 'Deleted';
                    }
                
                    if (obj.is_lost == 1) {
                        archivebindval = 'Lost';
                    } else if (obj.is_lost == 2) {
                        archivebindval = 'Declined';
                    } else if (obj.is_lost == 3) {
                        archivebindval = 'Cancel';
                    } else if (obj.is_lost == null && obj.status == 1) {
                        archivebindval = 'Deleted';
                
                    }
                
                    if (archivebindval != '') {
                
                        var archived_date = obj.deleted_on;
                
                        if (archived_date !== null) {
                            var archived_date_spl = archived_date.split(' ');
                            var month_day_year_spl = archived_date_spl[0].split('-');
                            var month_day_year = month_day_year_spl[1] + '/' + month_day_year_spl[2] + '/' + month_day_year_spl[0];
                            $('.archivebindval').text('');
                            $('.archivebindval').html('<span class="fontweight500">' + archivebindval + ':</span> ' + month_day_year + ' (' + action_reason + ')');
                        } else {
                            $('.archivebindval').text('');
                        }
                
                    } else {
                        $('.archivebindval').text('');
                    }
                
                
                
                    // $('.archivebindval').text('');
                    // $('.archivebindval').text(archivebindval);
                
                
                
                    $('.user').show();
                    $('.qid').show();
                
                    $('.bindacc_nametop').html('');
                    $('.bindbroker_nametop').html('');
                    $('.bindquoteid_top qid').html('');
                    $('.bindacc_nametop').html(": <b>" + obj.accountname + "</b>");
                    $('.bindbroker_nametop').html(": <b>" + obj.broker_name + "</b>");
                    var chek_quote_id = obj.quote_id;
                    if (chek_quote_id != null && chek_quote_id != '') {
                        $('.bindquoteid_top').html(": <b>" + chek_quote_id + "</b>");
                    } else {
                        $('.bindquoteid_top').html('');
                    }
                
                    var childmounthyear = obj.acc_effective_date;
                    if (childmounthyear != null) {
                        var childmonth = obj.acc_effective_date.split('-');
                
                        if (childmonth[1] == '01') {
                            tabmonth = 'Jan'
                        }
                        if (childmonth[1] == '02') {
                            tabmonth = 'Feb'
                        }
                        if (childmonth[1] == '03') {
                            tabmonth = 'Mar'
                        }
                        if (childmonth[1] == '04') {
                            tabmonth = 'Apr'
                        }
                        if (childmonth[1] == '05') {
                            tabmonth = 'May'
                        }
                        if (childmonth[1] == '06') {
                            tabmonth = 'Jun'
                        }
                        if (childmonth[1] == '07') {
                            tabmonth = 'Jul'
                        }
                        if (childmonth[1] == '08') {
                            tabmonth = 'Aug'
                        }
                        if (childmonth[1] == '09') {
                            tabmonth = 'Sep'
                        }
                        if (childmonth[1] == '10') {
                            tabmonth = 'Oct'
                        }
                        if (childmonth[1] == '11') {
                            tabmonth = 'Nov'
                        }
                        if (childmonth[1] == '12') {
                            tabmonth = 'Dec'
                        }
                
                        $('.session_hide_tab').find('.active').find('.bind_monthyear').text(tabmonth + '-' + childmonth[0]);
                    } else {
                
                        $('.session_hide_tab').find('.active').find('.bind_monthyear').text("TBD-" + new Date().getFullYear());
                    }
                
                    $('.session_hide_tab').find('.active').find('.bind_monthyear').data('monthyearval', obj.monthyeartab);
                
                    $('#submit_btn1').text('Update');
                
                
                    var specific_person_hideshow = ['asic.underwriter1@gmail.com'];
                
                    var specific_diable_style = '';
                    if ($.inArray(localStorage.getItem('userid'), specific_person_hideshow) != '-1') {
                        $('#submit_btn1').attr('disabled', 'disabled');
                    } else {
                        $('#submit_btn1').removeAttr('disabled');
                    }
                    
                }, 1000);
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}



