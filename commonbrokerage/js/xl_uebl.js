function xlEbl_append(th , ret_uebl) {
    var checked = $(th).prop('checked');
    if(checked){
        if($('#xlUebl_div').html().trim() == ''){
            $.ajax({
                url: '/brokerage/template/xl_Uebl.php',
                method: 'post',
                success: function(res) {
                    $('#xlUebl_div').html(res);
                    if (ret_uebl == '') {
                        effective_date = $('#rqbieffdate').val();
                        expiration_date = $('#rqbiexpdate').val();
                        $('.uebl_effectDt').datepicker('update', effective_date);
                        $('.uebl_expDt').datepicker('update', expiration_date);
                        var eachemplt_select = $('#uebl_eachEmpLt_0').val();
                        var aggrelt_select = $('#uebl_aggreLt_0').val();
                        xl_add_uebl({effective_date:effective_date, expiration_date:expiration_date, uebl_eachEmpLt:eachemplt_select, uebl_eachEmpLt_other:'', uebl_aggreLt:aggrelt_select, uebl_aggreLt_other:''}, 0);
                    }
                },
                complete:function(){  
                    if (ret_uebl.length > 0) { 
                        var uebl_td = ret_uebl.split(','); 
                        for (uebl_i = 0; uebl_i < uebl_td.length; uebl_i++) {
                            var uex_tab_id = uebl_td[uebl_i];
                            if (uebl_i != 0) { 
                                j= uebl_i;
                                uebl_id = j-1;
                                uebl_accrd = $('#ueblRemoveBtn_'+uebl_id).closest('.ueblAccor');
                                uebl_AddAnotherFun(j, uebl_accrd);
                                UexAdd = uebl_i;
                            }
                            $('#uebl_head_'+uebl_i).attr('aria-expanded',false);
                            $('#uebl_head_'+uebl_i).addClass('collapsed');
                            $('#uebl_collapse_'+uebl_i).removeClass('show');
                            $('.ueblAccor').eq(uebl_i).attr('data-rid', uex_tab_id);
                            $('.xl_addUebl').addClass('d-none');
                        }
                    } 
                }
            });
        }
    }else {
        cov_uncheck(th, 'Uebl', 'Employee Benefits Liability');
    }
}

            //  uebl add another
var ueblAdd = 0;
function xl_addUebl() {
    var ueblAcc = $('.ueblAccor').last();
    var emp_prem = ueblAcc.find('.uebl_empPremium').val();
	var eachemplt_select = ueblAcc.find('.uebl_eachEmpLt').val();
    var aggrelt_select = ueblAcc.find('.uebl_aggreLt').val();

    if (eachemplt_select == 'other') {
        var eachemplt = ueblAcc.find('.uebl_eachEmpLt_other').val();
    } else {
        var eachemplt = ueblAcc.find('.uebl_eachEmpLt').val();
    }
    if (aggrelt_select == 'other') {
        var aggrelt = ueblAcc.find('.uebl_aggreLt_other').val();
    } else {
        var aggrelt = ueblAcc.find('.uebl_aggreLt').val();
    }

    if(emp_prem  && eachemplt !=0 && aggrelt !=0) {
        ueblAdd++;
        uebl_AddAnotherFun(ueblAdd, ueblAcc);

        effective_date = $('#rqbieffdate').val();
        expiration_date = $('#rqbiexpdate').val();
        $('.uebl_effectDt_'+ueblAdd).datepicker('update', effective_date);
        $('.uebl_expDt_'+ueblAdd).datepicker('update', expiration_date);
        var eachemplt_def = $('#uebl_eachEmpLt_'+ueblAdd).val();
        var aggrelt_def = $('#uebl_aggreLt_'+ueblAdd).val();
        xl_add_uebl({effective_date:effective_date, expiration_date:expiration_date, uebl_eachEmpLt:eachemplt_def, uebl_eachEmpLt_other:'', uebl_aggreLt:aggrelt_def, uebl_aggreLt_other:''}, ueblAdd);

        xl_scrollAccor(ueblAcc, 'uebl','down');
        xl_alert('success');
    } else {
        uebl_emptyValid (ueblAcc, emp_prem, eachemplt, aggrelt);
        xl_alert('empty');
    }    
}

function uebl_emptyValid (ueblAcc, emp_prem, eachemplt, aggrelt) {
    if (!emp_prem) {
        xl_emptyValid (ueblAcc, "uebl_empPremium");
    }
    if (!eachemplt) {
        xl_emptyValid (ueblAcc, "uebl_eachEmpLt_other");
    }
    if (!aggrelt) {
        xl_emptyValid (ueblAcc, "uebl_aggreLt_other");
    }
}

function uebl_AddAnotherFun(ueblAdd, ueblAcc) {
	var ueblCopy ='';
    var ueblCopy = '<div class="accordion mt-4 ueblAccor" id="ueblAccor_'+ueblAdd+'" data-rid="" data-accord_no="'+ueblAdd+'"><div class="card"><div class="card-header uebl_head" id="uebl_head_'+ueblAdd+'" data-toggle="collapse" data-target="#uebl_collapse_'+ueblAdd+'" aria-expanded="true" aria-controls="uebl_collapse_'+ueblAdd+'"> Employee Benefits Liability</div><div id="uebl_collapse_'+ueblAdd+'" class="collapse show" aria-lebelledy="uebl_head_'+ueblAdd+'" data-parent="#ueblAccor_'+ueblAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm uebl_policyNo" id="uebl_policyNo_'+ueblAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm uebl_company" id="uebl_company_'+ueblAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date uebl_effectDt uebl_effectDt_'+ueblAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uebl_effectDt_'+ueblAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date uebl_expDt uebl_expDt_'+ueblAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uebl_expDt_'+ueblAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row mt-2"><div class="form-group col-auto"> <label> UL Employee Benefits Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm uebl_empPremium xl_number" id="uebl_empPremium_'+ueblAdd+'" maxlength="19" placeholder="UL Employee Benefits Premium"></div></div></div><div class="form-group col-auto"> <label> Each Employee Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uebl_eachEmpLt" id="uebl_eachEmpLt_'+ueblAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Aggregate Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uebl_aggreLt" id="uebl_aggreLt_'+ueblAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div></div><div class="uebl_deleteDiv text-right my-2"> <button type="button" class="btn btn-sm btn-danger ueblRemoveBtn" id="ueblRemoveBtn_'+ueblAdd+'" onclick="ueblRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
    ueblAcc.after(ueblCopy);

    $(".uebl_effectDt_"+ueblAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var minDate = new Date(selected.date);
        var nxtYear = dateNextYear(selected.date);
        expDateSet($(this), 'uebl', nxtYear, minDate);
      
        var accordion_no = $(this).closest('.ueblAccor').data('accord_no');
        var uebl_effectdate = $('#uebl_effectDt_'+ueblAdd).val();
        expiry = $('#uebl_expDt_'+ueblAdd).val();
        xl_add_uebl({effective_date: uebl_effectdate, expiration_date: expiry},accordion_no);
    });
    $(".uebl_expDt_"+ueblAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        var uebl_expirydate = $('#uebl_expDt_'+ueblAdd).val();
        var accordion_no = $(this).closest('.ueblAccor').data('accord_no');
        xl_add_uebl({expiration_date: uebl_expirydate},accordion_no);
    });
}

function ueblRemoveBtn(thisValue) {
    var thisLength = $('.ueblRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.ueblAccor').attr('id');
        thisValue.closest('.uebl_deleteDiv').append('<div class="alert alert-warning col-4 uebl_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="uebl_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function uebl_deleteYes(thisId) {
    if($('.ueblAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'uebl','up'); 
    } else {
        xl_scrollAccor(thisId, 'uebl','stay');
    }
    
    var accordian_no = $('#'+thisId).data('accord_no');
    xl_delete_uebl({is_checked: 0 , accordion : accordian_no});
    $('#'+thisId).remove();
    xl_alert('delete');
}

//database stroing
$(document).on('blur', '.uebl_policyNo', function() { 
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    var uebl_policyNo = $(this).val().replace(/[$,]/g, '');
    xl_add_uebl ({policy_number:uebl_policyNo},accordian_no);
});

$(document).on('blur','.uebl_company',function(){
    var uebl_company = $(this).val().replace(/[$,]/g, '');
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    xl_add_uebl ({company:uebl_company},accordian_no);
});

$(document).on('change','.uebl_empPremium',function(){
    var uebl_empPremium = $(this).val().replace(/[$,]/g, '');
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    if (uebl_empPremium) {
        xl_emptyReset($(this));
    }
    xl_add_uebl ({uebl_emp_premium:uebl_empPremium},accordian_no);
});

// uebl_eachEmpLt
$(document).on('change', '.uebl_eachEmpLt', function() {
    var uebl_eachEmpLt = $(this).val().replace(/[$,]/g, '');    
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    uebl_eachEmpLt_other = '';
    xl_add_uebl({uebl_eachEmpLt:uebl_eachEmpLt, uebl_eachEmpLt_other:uebl_eachEmpLt_other},accordian_no);
});
$(document).on('blur', '.uebl_eachEmpLt_other ', function() {
    var uebl_eachEmpLt_other = $(this).val().replace(/[$,]/g, '');
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    if (uebl_eachEmpLt_other) {
        xl_emptyReset($(this));
    }
    xl_add_uebl({uebl_eachEmpLt_other:uebl_eachEmpLt_other},accordian_no);
});
// uebl_aggreLt
$(document).on('change', '.uebl_aggreLt', function() {
    var uebl_aggreLt = $(this).val().replace(/[$,]/g, '');    
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    uebl_aggreLt_other = '';
    xl_add_uebl({uebl_aggreLt:uebl_aggreLt, uebl_aggreLt_other:uebl_aggreLt_other},accordian_no);
});
$(document).on('blur', '.uebl_aggreLt_other ', function() {
    var uebl_aggreLt_other = $(this).val().replace(/[$,]/g, '');
    var accordian_no = $(this).closest('.ueblAccor').data('accord_no');
    if (uebl_aggreLt_other) {
        xl_emptyReset($(this));
    }
    xl_add_uebl({uebl_aggreLt_other:uebl_aggreLt_other},accordian_no);
});
function xl_add_uebl (value,accord_no) {
    var uebl_id = $('#ueblAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (uebl_id != '' && uebl_id != null) {
        value.rid = uebl_id;
        value.updated_by =  localStorage.getItem('usernumericid');
    } else {
        value.created_by =  localStorage.getItem('usernumericid');
    }
    value.acct_id = acc_id;
    value.com_id = com_id;
    value.rqbi_id = rqbi_id;
    $.ajax({
        url: laravel_url+"/xl_add_uebl",
        type:'post',
        data:value,
        success: function (response) { 
            $('#ueblAccor_'+accord_no).data("rid", response.uebl_id);
            if (response.update_quote_version == 1) {
                updateQuoteNameBasedTotalPremium();
            }
        }
    }); 

}
function xl_delete_uebl (value) {
    var accord_no = value.accordion;
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var uebl_id = $('#ueblAccor_'+accord_no).data("rid");
    value.acct_id = acc_id;
    value.com_id = com_id;
    value.rqbi_id = rqbi_id;
    value.rid = uebl_id;
    value.deleted_by =localStorage.getItem('usernumericid');
    
    $.ajax({
        url: laravel_url+"/xl_del_uebl",
        type:'post',
        data:value,
        success: function (response) {
            updateQuoteNameBasedTotalPremium();
        }
    }); 

}

