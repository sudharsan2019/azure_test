function xlExces_append(th, ret_uex){     console.log(ret_uex);
    var checked = $(th).prop('checked');
    if (checked) {
        if ($('#xlexces_div').html().trim() == '') { 
            try {
                $.ajax({
                    url: '/brokerage/template/xl_uex.php',
                    method: 'post',
                    success: function(res) {  
                        $('#xlexces_div').html(res);
                        if (ret_uex == '') {
                          effective_date = $('#rqbieffdate').val();
                          expiration_date = $('#rqbiexpdate').val();
                          xl_add_uex({effective_date:effective_date, expiration_date:expiration_date}, 0);    
                      }
                  },
                  complete:function() {     

                    if (ret_uex.length > 0) {  
                        var uex_td = ret_uex.split(','); 
                        for (uex_i = 0; uex_i < uex_td.length; uex_i++) {
                            var uex_tab_id = uex_td[uex_i];
                            if (uex_i != 0) {  
                                j= uex_i;
                                uex_id = j-1;
                                uex_accrd = $('#uexRemoveBtn_'+uex_id).closest('.uexAccor');
                                uex_AddAnotherFun(j, uex_accrd);
                                UexAdd = uex_i;
                            }

                            $('#uex_head_'+uex_i).attr('aria-expanded',false);
                            $('#uex_head_'+uex_i).addClass('collapsed');
                            $('#uex_collapse_'+uex_i).removeClass('show');
                            $('.uexAccor').eq(uex_i).attr('data-rid', uex_tab_id);
                            $('.xl_addUex').addClass('d-none');
                        }
                    } 
                }
            });
            } catch(err) {
                console.log(err);
                
            }
            
        }
    } else {
        cov_uncheck(th, 'exces', 'Excess');
    }
}

//  uex add another
var uexAdd = 0;
function xl_addUex() {
    var uexAcc = $('.uexAccor').last();
    var ul_prem = uexAcc.find('.uex_ulPremium').val();
    var insur_select = uexAcc.find('.uex_insur').val();
    var underlt_select = uexAcc.find('.uex_underLt').val();
    var uex_classCode = uexAcc.find('.uex_cc').val();

    if (insur_select == 'other') {
        var insur = uexAcc.find('.uex_insur_other').val();
    } else {
        var insur = uexAcc.find('.uex_insur').val();
    }
    if (underlt_select == 'other') {
        var underlt = uexAcc.find('.uex_underLt_other').val();
    } else {
        var underlt = uexAcc.find('.uex_underLt').val();
    }
    
    if (ul_prem && insur !=0 && underlt !=0) {
        uexAdd++;
        uex_AddAnotherFun(uexAdd, uexAcc);
        $("#uexAccor_"+uexAdd).attr('data-retreiveexcess',1);
        xl_add_uex({}, uexAdd);
        
        xl_scrollAccor(uexAcc, 'uex','down');
        xl_alert('success');
    } else {
        uex_emptyValid (uexAcc, ul_prem, insur_select, insur, underlt_select, underlt, uex_classCode);
        xl_alert('empty');
    }
}

function uex_emptyValid(uexAcc, ul_prem, insur_select, insur, underlt_select, underlt, uex_classCode) {
    if (!ul_prem) {
        xl_emptyValid (uexAcc, "uex_ulPremium");
    }
    if (insur_select == 0) {
        xl_emptyValid (uexAcc, "uex_insur");
    }
    if (!insur) {
        xl_emptyValid (uexAcc, "uex_insur_other");
    }
    if (underlt_select == 0) {
        xl_emptyValid (uexAcc, "uex_underLt");
    }
    if (!underlt) {
        xl_emptyValid (uexAcc, "uex_underLt_other");
    }
    if (!uex_classCode) {
        xl_emptyValid (uexAcc, "uex_cc");
    }
}

function uex_AddAnotherFun(uexAdd, uexAcc) {
    var uexCopy ='';
    uexCopy = '<div class="accordion mt-4 uexAccor uexaccordion" id="uexAccor_'+uexAdd+'" data-rid="" data-accord_no="'+uexAdd+'"><div class="card"><div class="card-header uex_head" id="uex_head_'+uexAdd+'" data-toggle="collapse" data-target="#uex_collapse_'+uexAdd+'" aria-expanded="true" aria-controls="uex_collapse_'+uexAdd+'"> Excess</div><div id="uex_collapse_'+uexAdd+'" class="collapse show" aria-lebelledy="uex_head_'+uexAdd+'" data-parent="#uexAccor_'+uexAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm uex_policyNo" id="uex_policyNo_'+uexAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm uex_company" id="uex_company_'+uexAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date uex_effectDt uex_effectDt_'+uexAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uex_effectDt_'+uexAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date uex_expDt uex_expDt_'+uexAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uex_expDt_'+uexAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row"> <label class="col-auto"> Liability Type </label><div class="col-auto"><div class="custom-control custom-radio custom-control-inline"> <input type="radio" class="custom-control-input uex_liabType_lead uex_liabType" id="uex_liabType_lead_'+uexAdd+'" checked="checked" name="uex_liabType_'+uexAdd+'" value="1"> <label class="custom-control-label" for="uex_liabType_lead_'+uexAdd+'"> Excess </label></div><div class="custom-control custom-radio custom-control-inline"> <input type="radio" class="custom-control-input uex_liabType_umb uex_liabType" id="uex_liabType_umb_'+uexAdd+'" name="uex_liabType_'+uexAdd+'" value="2"> <label class="custom-control-label" for="uex_liabType_umb_'+uexAdd+'"> Umbrella </label></div></div></div><div class="row mt-2"><div class="form-group col-auto"> <label> Other UL Excess Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm uex_ulPremium xl_number" id="uex_ulPremium_'+uexAdd+'" maxlength="19" placeholder="Other UL Excess Premium"></div></div></div><div class="form-group col-auto"> <label> Limit of Insurance <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uex_insur" id="uex_insur_'+uexAdd+'" onchange="xlOtherSelect($(this));"><option value="0"> Please select</option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Underlying Limits <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uex_underLt" id="uex_underLt_'+uexAdd+'" onchange="xlOtherSelect($(this));"><option value="0"> Please select</option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div> <div class="form-group col-md-4 uex_ccDiv d-none"> <label> Class Code <span class="redStar"> * </span> </label> <input type="text" class="form-control form-control-sm uex_cc" id="uex_cc_'+uexAdd+'" placeholder="Class code" data-row_id="'+uexAdd+'"> <small><span class="uex_cc_desc" id="uex_cc_desc_'+uexAdd+'"></span></small> <small id="ucc_Invalid_cbClasscode_'+uexAdd+'">Invalid Class Code</small> </div></div><div class="uex_deleteDiv text-right my-2"> <button type="button" class="btn btn-sm btn-danger uexRemoveBtn" id="uexRemoveBtn_'+uexAdd+'" onclick="uexRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
    uexAcc.after(uexCopy);
    
    $('.uex_effectDt_'+uexAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var nxtYear = dateNextYear(selected.date);   console.log(nxtYear);
        $(this).closest('.uexAccor').find('.uex_expDt').datepicker('setDate', nxtYear);
        var accordion_no = $(this).closest('.uexAccor').data('accord_no');
        var uex_effectdate = $('#uex_effectDt_'+uexAdd).val();
        expiry = $('#uex_expDt_'+uexAdd).val();
        
        effectdate = uex_effectdate.split('-')
        var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];
        
        var expir_split = expiry.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        xl_add_uex({effective_date: effective_date, expiration_date: expiry_date},accordion_no);
    });
    
    $('.uex_expDt_'+uexAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        var uex_expirydate = $('#uex_expDt_'+uexAdd).val();
        var expir_split = uex_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
        var accordion_no = $(this).closest('.uexAccor').data('accord_no');
        xl_add_uex({expiration_date: expiry_date},accordion_no);
    });
}

function uexRemoveBtn(thisValue) {
    var thisLength = $('.uexRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.uexAccor').attr('id');
        thisValue.closest('.uex_deleteDiv').append('<div class="alert alert-warning col-4 uex_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="uex_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function uex_deleteYes(thisId) {
    if($('.uexAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'uex','up'); 
    } else {
        xl_scrollAccor(thisId, 'uex','stay');
    }

    var accordion_no = $('#'+thisId).attr('data-accord_no');
    xl_delete_uex({is_checked: 0 , accordion : accordion_no});
    $('#'+thisId).remove();
    xl_alert('delete');
}

$(document).on('blur', '.uex_policyNo', function() {
    var uex_policyNo = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no');    
    xl_add_uex ({policy_number:uex_policyNo}, accordion_no);
});


$(document).on('blur', '.uex_company', function() {
    var uex_company = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    xl_add_uex({company:uex_company}, accordion_no);
});

$(document).on('change', '.uex_liabType', function() {  
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    var uex_liabType = $(this).val();    
    xl_add_uex({liability_type:uex_liabType},accordion_no);
});

$(document).on('change', '.uex_ulPremium', function() {
    var uex_ulPremium = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    if (uex_ulPremium) {
        xl_emptyReset($(this));
    }
    xl_add_uex({other_ul_excess_premium:uex_ulPremium}, accordion_no);
});

$(document).on('change', '.uex_insur', function() {
    var uex_insur = $(this).val().replace(/[$,]/g, '');    
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    if (uex_insur != 0) {
        xl_emptyReset($(this));
    }
    if (uex_insur == 'other') {
        var uex_insur_other = $("#uex_insur_other_"+accordion_no).val();  
    } else {
        var uex_insur_other = null;
    }
    xl_add_uex({limit_of_insurance:uex_insur, limit_of_insurance_other:uex_insur_other}, accordion_no);
});

$(document).on('change', '.uex_insur_other', function() {
    var uex_insur_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    if (uex_insur_other) {
        xl_emptyReset($(this));
    }
    xl_add_uex({limit_of_insurance_other:uex_insur_other}, accordion_no);
});


$(document).on('change', '.uex_underLt', function() {
    var uex_underLt = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    if (uex_underLt != 0) {
        xl_emptyReset($(this));
    }
    if (uex_underLt == 'other') {
        var uex_underLt_other = $("#uex_underLt_other_"+accordion_no).val();  
    } else {
        var uex_underLt_other = null;
    }
    xl_add_uex({underlying_limits:uex_underLt,underlying_limits_other:uex_underLt_other}, accordion_no);
});

$(document).on('change', '.uex_underLt_other', function() {
    var uex_underLt_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.uexAccor').data('accord_no'); 
    if (uex_underLt_other) {
        xl_emptyReset($(this));
    }
    xl_add_uex({underlying_limits_other:uex_underLt_other}, accordion_no);
});

function xl_add_uex (value, accord_no) {     
    var uex_id = $('#uexAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (uex_id != '' && uex_id != null) {
        value.rid = uex_id;
        value.updated_by =  localStorage.getItem('usernumericid');
    } else {
        value.created_by =  localStorage.getItem('usernumericid');
    }
    value.acct_id = acc_id;
    value.com_id = com_id;
    value.rqbi_id = rqbi_id;
    try {
        $.ajax({
            url: laravel_url+"/xl_add_uex",
            type:'post',
            data:value,
            success: function (response) {
                    $('#uexAccor_'+accord_no).data("rid", response.uex_id);
                if (response.update_quote_version == 1) {
                    updateQuoteNameBasedTotalPremium();
                }
                
            }
        }); 
    } catch(err) {
        console.log(err);
        
    }
    
}

function xl_delete_uex (value) {
    var accord_no = value.accordion;
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();  
    var uex_id = $('#uexAccor_'+accord_no).attr("data-rid");   
    value.acct_id = acc_id;
    value.com_id = com_id;
    value.rqbi_id = rqbi_id;
    value.rid = uex_id;
    
    value.deleted_by =localStorage.getItem('usernumericid');
    try {
        $.ajax({
            url: laravel_url+"/xl_del_uex",
            type:'post',
            data:value,
            success: function (response) {
                updateQuoteNameBasedTotalPremium();
            }
        }); 
    } catch(err) {
        console.log(err);
        
    }
}

$(document).on('keyup', '.uex_cc', function() {
    var class_code = $(this).val();
    var row_id = $(this).attr('data-row_id');
    xl_initialize_previousClassCode_ex(class_code, row_id, 1);
    $(this).focus();
});

function xl_initialize_previousClassCode_ex (classcode, rowid, coverage_type) {
    previousclasscode_input = (document.getElementById('uex_cc_'+rowid));
    previousclasscode_global1 = ["1001 - Ada"];
    if(jQuery.isEmptyObject(awesomplete_classcode[rowid])){
        awesomplete_classcode[rowid] = new Awesomplete(previousclasscode_input, {
            list: previousclasscode_global1,
            minChars: 1,
            maxItems: 500,
            autoFirst: false
        });
    }

    var class_code = $('#uex_cc_'+rowid).val();
    //class_code = class_code.substring(0, 5);

    var coverage_type_array = [];
   
    coverage_type_array.push(coverage_type);

    var cov_ty = coverage_type_array.toString();

    if (class_code.length > 1){
        /*Check coverages checked or not*/
        $.ajax({
            url: "/brokerage/template/master_class_code_search.php",
            method: 'GET',
            data:{
                'classcode_gl': class_code,'coverage':cov_ty,
            },
            dataType: 'json',

            success: function(response) {

                $('#uex_Invalid_cbClasscode_'+rowid).css('display','none');
                if (response.status != 'fail' && response.status != '') {
                    suggestionList = response;
                    finalSuggestArray = [];
                    $.each(suggestionList, function(index, value) {

                        finalSuggestArray[index] = [[value.classcode_gl + ' - ' + value.classname],[value.classcode_gl + ' - ' + value.classname]];
                    });
                    awesomplete_classcode[rowid].list = finalSuggestArray;
                } else {
                    $('#uex_cc_'+rowid).val('').addClass('border-red');
                    $('#uex_cc_desc_'+rowid).html('');
                    $('#uex_Invalid_cbClasscode_'+rowid).css('display','block');
                    $('#uex_Invalid_cbClasscode_'+rowid).css('color','red');
                    return false;
                }
                awesomplete_classcode[rowid] = '';
            },
            error: function(){

            },
            complete :function(){
                
            }
        });
        
    }
}

$(document).on('blur', '.uex_cc', function(e){
    e.preventDefault();

    var cid =  $(this).attr('data-row_id');
    var cc = $('#uex_cc_'+cid).val();
    var uexCC = $(this);

    if (cc != '') {
        if(cc.length >= 5){

            cc = cc.substring(0, 5);

            $.ajax({
                url: laravel_url+"/get_class_code_description",
                method: 'post',
                data:{'class_code': cc},
                dataType: 'JSON',
                success: function(res){  
                    cc_result = res;      
                   if (res.length > 0) {
                        $('#uex_cc_'+cid).val(res[0].class_code);
                        $('#uex_cc_desc_'+cid).html(res[0].class_description);
                        xl_emptyReset(uexCC);
                    }
                },
                error: function(xhr, status, error){
                    var err = JSON.parse(xhr.responseText);
                    new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
                },
                complete: function(){
                    if (cc_result.length > 0){
                        var class_code = cc_result[0].class_code;
                        var class_code_desc = cc_result[0].class_description;
                        var accord_no = $('#uex_cc_'+cid).closest('.uexAccor').data('accord_no');
                        var first_rowno = $('#uexAccor_'+accord_no+' table tr .uex_cc').data('row_id');
                        //save_update_uexcb({class_code:class_code, class_code_desc:class_code_desc}, accord_no, cid, first_rowno)
                    }            
               }
            });
     
        } 
    } else {
        $('#uex_cc_desc_'+cid).html('');
    }
});