function xlStopGap_append(th,res_usg) {
    try {
        var checked = $(th).prop('checked');
        if (checked) {
            if ($('#xlstopGap_div').html().trim() == '') {
                $.ajax({
                    url: '/brokerage/template/xl_stopGap.php',
                    method: 'post',
                    success: function(res) {
                        $('#xlstopGap_div').html(res);
                        if (res_usg == '') {
                            effective_date = $('#rqbieffdate').val();
                            expiration_date = $('#rqbiexpdate').val();
                            $('.usg_effectDt').datepicker('update', effective_date);
                            $('.usg_expDt').datepicker('update', expiration_date);
                            xl_add_usg({effective_date:effective_date, expiration_date:expiration_date}, 0);   
                        }
                    },
                    complete:function() {
                        if (res_usg.length > 0) {
                            usg_td = res_usg.split(',');
                            for (usg_i = 0; usg_i < usg_td.length; usg_i++) {
                                var usg_tab_id = usg_td[usg_i];
                                if (usg_i != 0) {
                                    j= usg_i;
                                    usg_id = j-1;
                                    usg_accrd = $('#usgAccor_'+usg_id).last();
                                    usg_AddAnotherFun(j, usg_accrd);
                                    usgAdd = usg_i;
                                }
                                
                                $('#usg_head_'+usg_i).attr('aria-expanded',false);
                                $('#usg_head_'+usg_i).addClass('collapsed');
                                $('#usg_collapse_'+usg_i).removeClass('show');
                                $('.usgAccor').eq(usg_i).attr('data-usg_randamid', usg_tab_id);
                                $('.xl_addUsg').addClass('d-none');
                            }
                        } 
                    }
                });
            }
        } else {
            cov_uncheck(th, 'stopGap', 'Stop Gap'); 
        }
    }
    catch(err) {
        console.log(err);
        
    }    
}
            //  usg add another
var usgAdd = 0;
function xl_addUsg(thisValue) {
    var usgAcc = $('.usgAccor').last();
    console.log(usgAcc);
    var ul_prem = usgAcc.find('.usg_ulPremium').val();
    var acci_select = usgAcc.find('.usg_acci').val();
    var disEmp_select = usgAcc.find('.usg_disEmp').val();
    var aggreLt_select = usgAcc.find('.usg_AggreLt').val();

    if (acci_select == 'other') {
        var acci = usgAcc.find('.usg_acci_other').val();
    } else {
        var acci = usgAcc.find('.usg_acci').val();
    }
    if (disEmp_select == 'other') {
        var disEmp = usgAcc.find('.usg_disEmp_other').val();
    } else {
        var disEmp = usgAcc.find('.usg_disEmp').val();
    }
    if (aggreLt_select == 'other') {
        var aggreLt = usgAcc.find('.usg_AggreLt_other').val();
    } else {
        var aggreLt = usgAcc.find('.usg_AggreLt').val();
    }

    if(ul_prem && acci && disEmp && aggreLt) {
        usgAdd++;
        usg_AddAnotherFun(usgAdd, usgAcc);
        $("#usgAccor_"+usgAdd).attr('data-retrieve',1);
        effective_date = $('#rqbieffdate').val();
        expiration_date = $('#rqbiexpdate').val();
        $('.usg_effectDt').datepicker('update', effective_date);
        $('.usg_expDt').datepicker('update', expiration_date);
        xl_add_usg({effective_date:effective_date, expiration_date:expiration_date}, usgAdd);
        
        xl_scrollAccor(usgAcc, 'usg','down');
        xl_alert('success');
    } else {
        usg_emptyValid (usgAcc, ul_prem, acci, disEmp, aggreLt);
        xl_alert('empty');
    }
}

function usg_emptyValid(usgAcc, ul_prem, acci, disEmp, aggreLt) {
    if (!ul_prem) {
        xl_emptyValid (usgAcc, "usg_ulPremium");
    }
    if (!acci) {
        xl_emptyValid (usgAcc, "usg_acci_other");
    }
    if (!disEmp) {
        xl_emptyValid (usgAcc, "usg_disEmp_other");
    }
    if (!aggreLt) {
        xl_emptyValid (usgAcc, "usg_AggreLt_other");
    }
}

function usg_AddAnotherFun(usgAdd, usgAcc) {
    var usgCopy = '<div class="accordion usgAccor mt-4" id="usgAccor_'+usgAdd+'" data-usg_randamid="" data-accr_no="'+usgAdd+'"><div class="card"><div class="card-header usg_head" id="usg_head_'+usgAdd+'" data-toggle="collapse" data-target="#usg_collapse_'+usgAdd+'" aria-expanded="true" aria-controls="usg_collapse_'+usgAdd+'"> Stop Gap</div><div id="usg_collapse_'+usgAdd+'" class="collapse show" aria-lebelledy="usg_head_'+usgAdd+'" data-parent="#usgAccor_'+usgAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm usg_policyNo" id="usg_policyNo_'+usgAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm usg_company" id="usg_company_'+usgAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date usg_effectDt_'+usgAdd+' usg_effectDt mr-2"><div><input type="text" class="form-control form-control-sm" id="usg_effectDt_'+usgAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date usg_expDt usg_expDt_'+usgAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="usg_expDt_'+usgAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row mt-2"><div class="form-group col-auto"> <label> UL Stop Gap Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm usg_ulPremium xl_number" id="usg_ulPremium_'+usgAdd+'" maxlength="19" placeholder="UL Stop Gap Premium"></div></div></div><div class="form-group col-auto"> <label> Bodily Injury By Accident (Each Accident) <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm usg_acci" id="usg_acci_'+usgAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Bodily Injury By Disease (Each Employee) <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm usg_disEmp" id="usg_disEmp_'+usgAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Bodily Injury By Disease Aggregate Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm usg_AggreLt" id="usg_AggreLt_'+usgAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="col-auto align-self-center mt-2"> <label class="mr-2"> States </label> <select class="form-control form-control-sm usg_stat" id="usg_stat_'+usgAdd+'" multiple="multiple"><option value="oh"> OH</option><option value="nd"> ND</option><option value="wa"> WA</option><option value="wy"> WY</option> </select></div></div><div class="usg_deleteDiv text-right mt-5 mb-2">  <button type="button" class="btn btn-sm btn-danger usgRemoveBtn mb-2" id="usgRemoveBtn_'+usgAdd+'" onclick="usgRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';

    usgAcc.after(usgCopy);

    $(".usg_effectDt_"+usgAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var minDate = new Date(selected.date);
        var nxtYear = dateNextYear(selected.date);
        expDateSet($(this), 'usg', nxtYear, minDate);

        var effective_date = $('#usg_effectDt_'+usgAdd).val();
        expiry_date = $('#usg_expDt_'+usgAdd).val();

        var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
        xl_add_usg({effective_date: effective_date, expiration_date: expiry_date}, accordion_no);

    });
    $(".usg_expDt_"+usgAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        var usg_expirydate = $('#usg_expDt_'+usgAdd).val();
        var expir_split = usg_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];

        var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
        xl_add_usg({expiration_date: expiry_date}, accordion_no);
    });
    
    $('#usg_stat_'+usgAdd).multiselect({
        includeSelectAllOption: true,
    });
}

function usgRemoveBtn(thisValue) {
    var thisLength = $('.usgRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.usgAccor').attr('id');
        thisValue.closest('.usg_deleteDiv').append('<div class="alert alert-warning col-4 usg_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="usg_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function usg_deleteYes(thisId) {
    if($('.usgAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'usg','up'); 
    } else {
        xl_scrollAccor(thisId, 'usg','stay');
    }
    
    var usg_random_digit = $('#'+thisId).attr('data-usg_randamid');
    xl_delete_usg({rid: usg_random_digit, is_checked: 0});
    $('#'+thisId).remove();
    xl_alert('delete');
}

$(document).on('blur', '.usg_policyNo', function() {
    var usg_policyNo = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    xl_add_usg ({policy_number:usg_policyNo}, accordion_no);
});

$(document).on('blur', '.usg_company', function() {
    var usg_company = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    xl_add_usg({company:usg_company}, accordion_no);
});

$(document).on('blur', '.usg_ulPremium', function() {
    var stopgap_premium = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (stopgap_premium) {
        xl_emptyReset($(this));
    }
    xl_add_usg({stopgap_premium:stopgap_premium}, accordion_no);
});

$(document).on('change', '.usg_acci', function() {
    var usg_accident = $(this).val().replace(/[$,]/g, '');    
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_accident != 'other') {
        usg_acci_other = '';
        xl_add_usg({biba_accident:usg_accident, biba_accident_other:usg_acci_other}, accordion_no);
    } else {
        xl_add_usg({biba_accident:usg_accident}, accordion_no);
    }
    
});

$(document).on('blur', '.usg_acci_other ', function() {
    var usg_acci_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_acci_other) {
        xl_emptyReset($(this));
    }
    xl_add_usg({biba_accident_other:usg_acci_other}, accordion_no);
});

$(document).on('change', '.usg_disEmp', function() {
    var usg_employee = $(this).val().replace(/[$,]/g, '');    
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_employee != 'other') {
        var usg_disEmp_other = '';
        xl_add_usg({bibd_employee:usg_employee, bibd_employee_other:usg_disEmp_other}, accordion_no);
    } else {
        xl_add_usg({bibd_employee:usg_employee}, accordion_no);
    }
});

$(document).on('blur', '.usg_disEmp_other', function() {
    var usg_disEmp_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_disEmp_other) {
        xl_emptyReset($(this));
    }
    xl_add_usg({bibd_employee_other:usg_disEmp_other}, accordion_no);
});

$(document).on('change', '.usg_AggreLt', function() {
    var usg_aggregate = $(this).val().replace(/[$,]/g, '');    
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_aggregate != 'other') {
        usg_AggreLt_other = '';
        xl_add_usg({bida_limit:usg_aggregate, bida_limit_other:usg_AggreLt_other}, accordion_no);

    } else {
        xl_add_usg({bida_limit:usg_aggregate}, accordion_no);
    }
});

$(document).on('blur', '.usg_AggreLt_other', function() {
    var usg_AggreLt_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    if (usg_AggreLt_other) {
        xl_emptyReset($(this));
    }
    xl_add_usg({bida_limit_other:usg_AggreLt_other}, accordion_no);
});

$(document).on('change', '.usg_stat', function() {
    var usg_stat = $(this).val();
    var accordion_no = $(this).closest('.usgAccor').attr('data-accr_no');
    xl_add_usg({state:usg_stat}, accordion_no);
});

function xl_add_usg (value, accordion_no) {
    try {
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        value.acct_id = acc_id;
        value.com_id = com_id;
        value.rqbi_id = rqbi_id;

        var usg_id = $('#usgAccor_'+accordion_no).attr("data-usg_randamid");
        if (usg_id != '' && usg_id != null) {
            value.rid = usg_id;
            value.updated_by = localStorage.getItem('usernumericid');
        } else {
            value.created_by = localStorage.getItem('usernumericid');
        }
        $.ajax({
            url: laravel_url+"/xl_add_usg",
            type:'post',
            data:value,
            success: function (response) {
                $( "#usgAccor_"+accordion_no ).attr("data-usg_randamid", response.usg_id);
                if (response.update_quote_version == 1) {
                    updateQuoteNameBasedTotalPremium();
                }
            }
        }); 

    }
    catch(err) {
        console.log(err);
        
    }

}

function xl_delete_usg (value) {
    try {
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        value.acct_id = acc_id;
        value.com_id = com_id;
        value.rqbi_id = rqbi_id;

        value.user_id = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_del_usg",
            type:'post',
            data:value,
            success: function (response) {
                updateQuoteNameBasedTotalPremium();
            }
        }); 
    }
    catch(err) {
        console.log(err);
        
    }

}