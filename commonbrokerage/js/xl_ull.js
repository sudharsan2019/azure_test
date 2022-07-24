function xlLL_append(th, res_ull, is_retrieved) {
    var checked = $(th).prop('checked');
    if (checked) {
        if ($('#xlUll_div').html().trim() == '') {
            $.ajax({
                url: '/brokerage/template/xl_Ull.php',
                method: 'post',
                success: function(res) {
                    $('#xlUll_div').html(res);
                    
                },
                complete:function(){
                    if (is_retrieved == 0){
                        var effective_date = $('#rqbieffdate').val();
                        var expiration_date = $('#rqbiexpdate').val();
                        var ecc_limit = $('#ull_eachCommonLt_0').val();
                        var agg_limit = $('#ull_aggreLt_0').val();
                        $('.ull_effectDt_0').datepicker('update', effective_date);
                        $('.ull_expDt_0').datepicker('update', expiration_date);
                        save_update_ull({effective_date:effective_date, expiration_date:expiration_date, ecc_limit:ecc_limit,agg_limit:agg_limit},0);
                    }
                    if (res_ull.length > 0) {
                        ull_td = res_ull.split(',');
                        for (ull_i = 0; ull_i < ull_td.length; ull_i++) {
                            var ull_rid = ull_td[ull_i];
                            if (ull_i != 0) {
                                j= ull_i;
                                ull_id = j-1;
                                ull_accrd = $('#ullAccor_'+ull_id).last();
                                ull_AddAnotherFun(j, ull_accrd);
                                ullAdd = ull_i;
                            }
                            
                            $('#ull_head_'+ull_i).attr('aria-expanded',false);
                            $('#ull_head_'+ull_i).addClass('collapsed');
                            $('#ull_collapse_'+ull_i).removeClass('show');
                            $('.ullAccor').eq(ull_i).attr('data-rid', ull_rid);
                            $('.xl_addUll').addClass('d-none');
                        }
                    } 
                }
            });
        }
    } else {
        cov_uncheck(th, 'Ull', 'Liquor');
    }
}

            //  ull add another
var ullAdd = 0;
function xl_addUll(thisValue) {
    var ullAcc = $('.ullAccor').last();
    var ate_prem = ullAcc.find('.ull_ateLiqpremium').val();
    var liq_prem = ullAcc.find('.ull_liqpremium').val();
    var each_com_select = ullAcc.find('.ull_eachCommonLt').val();
    var aggreLt_select = ullAcc.find('.ull_aggreLt').val();
    var ull_class = ullAcc.find('.ull_cc').val();
    var ull_zc = ullAcc.find('.ull_zc').val();
    var ull_expo = ullAcc.find('.ull_expo').val();

    if (each_com_select == 'other') {
        var each_com = ullAcc.find('.ull_eachCommonLt_other').val();
    } else {
        var each_com = ullAcc.find('.ull_eachCommonLt').val();
    }
    if (aggreLt_select == 'other') {
        var aggreLt = ullAcc.find('.ull_aggreLt_other').val();
    } else {
        var aggreLt = ullAcc.find('.ull_aggreLt').val();
    }

    if (ate_prem && liq_prem && each_com && aggreLt && ull_class && ull_zc && ull_expo) {
        ullAdd++;
        $.when(ull_AddAnotherFun(ullAdd, ullAcc)).then(function(response) {
            var ecc_limit = $('#ull_eachCommonLt_'+ullAdd).val();
            var agg_limit = $('#ull_aggreLt_'+ullAdd).val();
            var effective_date = $('#rqbieffdate').val();
            var expiration_date = $('#rqbiexpdate').val();
            $('.ull_effectDt_'+ullAdd).datepicker('update', effective_date);
            $('.ull_expDt_'+ullAdd).datepicker('update', expiration_date);
            save_update_ull({effective_date:effective_date, expiration_date:expiration_date, ecc_limit:ecc_limit,agg_limit:agg_limit},ullAdd);
        });
        
        xl_scrollAccor(ullAcc, 'ull','down');
        xl_alert('success');
    } else {
        ull_emptyValid(ullAcc, ate_prem, liq_prem, each_com, aggreLt, ull_class, ull_zc, ull_expo);
        xl_alert('empty');
    }
}

function ull_emptyValid(ullAcc, ate_prem, liq_prem, each_com, aggreLt, ull_class, ull_zc, ull_expo) {
    if (!ate_prem) {
        xl_emptyValid (ullAcc, "ull_ateLiqpremium");
    }
    if (!liq_prem) {
        xl_emptyValid (ullAcc, "ull_liqpremium");
    }
    if (!each_com) {
        xl_emptyValid (ullAcc, "ull_eachCommonLt_other");
    }
    if (!aggreLt) {
        xl_emptyValid (ullAcc, "ull_aggreLt_other");
    }
    if (!ull_class) {
        xl_emptyValid (ullAcc, "ull_cc");
    }
    if (!ull_zc) {
        xl_emptyValid (ullAcc, "ull_zc");
    }
    if (!ull_expo) {
        xl_emptyValid (ullAcc, "ull_expo");
    }
}

function ull_AddAnotherFun(ullAdd, ullAcc) {
    var ullCopy = '<div class="accordion ullAccor mt-4" id="ullAccor_'+ullAdd+'" data-accord_no="'+ullAdd+'" data-rid="" data-retrieved="0"><div class="card"><div class="card-header ull_head" id="ull_head_'+ullAdd+'" data-toggle="collapse" data-target="#ull_collapse_'+ullAdd+'" aria-expanded="true" aria-controls="ull_collapse_'+ullAdd+'" onclick="ullAccorOpen($(this));"> Liquor</div><div id="ull_collapse_'+ullAdd+'" class="collapse show" aria-lebelledy="ull_head_'+ullAdd+'" data-parent="#ullAccor_'+ullAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm ull_policyNo" id="ull_policyNo_'+ullAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm ull_company" id="ull_company_'+ullAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date ull_effectDt ull_effectDt_'+ullAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="ull_effectDt_'+ullAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date ull_expDt ull_expDt_'+ullAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="ull_expDt_'+ullAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row mt-2"><div class="form-group col-auto"> <label> Ategrity Liquor Liability Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm ull_ateLiqpremium xl_number" id="ull_ateLiqpremium_'+ullAdd+'" maxlength="19" placeholder="Ategrity Liquor Liability Premium"></div></div></div><div class="form-group col-auto"> <label> Other Carrier - UL Liquor Liability Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm ull_liqpremium xl_number" id="ull_liqpremium_'+ullAdd+'" maxlength="19" placeholder="UL Liquor Liability Premium"></div></div></div><div class="form-group col-auto"> <label> Each Common Cause Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm "><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ull_eachCommonLt" id="ull_eachCommonLt_'+ullAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Aggregate Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm pl-0"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ull_aggreLt" id="ull_aggreLt_'+ullAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div></div><table class="table table-sm table-bordered xlTable ull_table mt-3" id="ull_table_'+ullAdd+'"><thead class="bg-lav"><tr><th> Class code <span class="redStar"> * </span></th><th class="width20_perc"> Zip code <span class="redStar"> * </span></th><th class="width20_perc"> Exposure <span class="redStar"> * </span></th><th class="width10_perc"> Actions</th></tr></thead><tbody><tr class="ull_cb_tr" id="ull_cb_tr_'+ullAdd+'_0" data-cb_rid=""><td> <input type="text" class="form-control form-control-sm ull_cc" id="ull_cc_'+ullAdd+'_0" placeholder="Class code" data-row_id="'+ullAdd+'_0" onkeyup="ullCC_keyup($(this));" onblur="ullCC_blur($(this));"><small><span class="ull_cc_desc pull-left" id="ull_cc_desc_'+ullAdd+'_0"></span></small><small class="pull-left" id="ull_Invalid_cbClasscode_'+ullAdd+'_0" style="display:none">Invalid Class Code</small></td><td> <input type="text" class="form-control form-control-sm ull_zc" id="ull_zc_'+ullAdd+'_0" placeholder="Zip code" data-row_id="'+ullAdd+'_0" onkeyup="ullZC_keyup($(this));" onblur="ullZc_blur($(this));"><small class="pull-left" id="ull_Invalid_zipcode_'+ullAdd+'_0" style="display:none">Invalid Zipcode</small></td><td> <input type="text" class="form-control form-control-sm ull_expo xl_number" id="ull_expo_'+ullAdd+'_0" placeholder="Exposure" data-row_id="'+ullAdd+'_0" onchange="ullExpo_change($(this));"></td><td class="text-center"> <button type="button" class="btn btn-xs btn-success xlTableBtn ull_table_add mr-1" id="ull_table_add_'+ullAdd+'_0" onclick="ull_tableAdd_fun($(this));"> <i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlTableBtn ull_table_del" id="ull_table_del_'+ullAdd+'_0" data-row_id="'+ullAdd+'_0" onclick="ull_table_del($(this));"> <i class="fa fa-trash"></i></button></td></tr></tbody></table><div class="ull_deleteDiv text-right mt-4 mb-2"> <button type="button" class="btn btn-sm btn-danger ullRemoveBtn" id="ullRemoveBtn_'+ullAdd+'" onclick="ullRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
    $(ullAcc).after(ullCopy);

    $(".ull_effectDt_"+ullAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var ull_effectdate = $('#ull_effectDt_'+ullAdd).val();

        var minDate = new Date(selected.date);
        var nxtYear = dateNextYear(selected.date);
        expDateSet($(this), 'ull', nxtYear, minDate);
        var ull_expdate = $('#ull_expDt_'+ullAdd).val();

        save_update_ull({effective_date:ull_effectdate, expiration_date:ull_expdate}, ullAdd);
    });
    $(".ull_expDt_"+ullAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function(e) {
        var ull_expirdate=$('#ull_expDt_'+ullAdd).val();
        save_update_ull({expiration_date: ull_expirdate}, ullAdd);
    });
}

function ullRemoveBtn(thisValue) {
    var thisLength = $('.ullRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.ullAccor').attr('id');
        thisValue.closest('.ull_deleteDiv').append('<div class="alert alert-warning col-4 ull_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="ull_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function ull_deleteYes(thisId) {
    var accordian_no = $('#'+thisId).data('accord_no');
    var ull_id = $('#ullAccor_'+accordian_no).data("rid");
    delete_ull(ull_id);

    if($('.ullAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'ull','up');
    } else {
        xl_scrollAccor(thisId, 'ull','stay');
    }
    $('#'+thisId).remove();
    xl_alert('delete');
}

var ull_table_add = 0;
function ull_tableAdd_fun(thisValue) {
    var tr_lst_cc, tr_lst_zc, tr_lst_expo;
    var curr_cc1 = thisValue.closest('tr').find('.ull_cc').attr('id');
    var curr_acc_inc1 = curr_cc1.split('_')[2];

    tr_lst_cc = thisValue.closest('tbody').find('tr:last-child .ull_cc').val();
    tr_lst_zc = thisValue.closest('tbody').find('tr:last-child .ull_zc').val();
    tr_lst_expo = thisValue.closest('tbody').find('tr:last-child .ull_expo').val();

    if (tr_lst_cc && tr_lst_zc && tr_lst_expo) {
        ull_table_add ++;
        var ullTabTr = thisValue.closest('tbody').find('tr:last-child');
        ullTable_addFun(ullTabTr, ull_table_add, curr_acc_inc1);
    } else {
        if (!tr_lst_cc) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ull_cc');
        }
        if (!tr_lst_zc) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ull_zc');
        }
        if (!tr_lst_expo) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ull_expo');
        }
        xl_alert('empty');
    }
}

function ullTable_addFun(ullTabTr, ull_table_add, curr_acc_inc1) {
    var ullTab = '<tr class="ull_cb_tr" id="ull_cb_tr_'+ull_table_add+'_'+curr_acc_inc1+'" data-cb_rid=""><td> <input type="text" class="form-control form-control-sm ull_cc" id="ull_cc_'+ull_table_add+'_'+curr_acc_inc1+'" placeholder="Class code" data-row_id="'+ull_table_add+'_'+curr_acc_inc1+'" onkeyup="ullCC_keyup($(this));" onblur="ullCC_blur($(this));"><small><span class="ull_cc_desc pull-left" id="ull_cc_desc_'+ull_table_add+'_'+curr_acc_inc1+'"></span></small><small class="pull-left" id="ull_Invalid_cbClasscode_'+ull_table_add+'_'+curr_acc_inc1+'" style="display:none">Invalid Class Code</small></td><td> <input type="text" class="form-control form-control-sm ull_zc" id="ull_zc_'+ull_table_add+'_'+curr_acc_inc1+'" placeholder="Zip code" data-row_id="'+ull_table_add+'_'+curr_acc_inc1+'" onkeyup="ullZC_keyup($(this));" onblur="ullZc_blur($(this));"><small class="pull-left" id="ull_Invalid_zipcode_'+ull_table_add+'_'+curr_acc_inc1+'" style="display:none">Invalid Zipcode</small></td><td> <input type="text" class="form-control form-control-sm ull_expo xl_number" id="ull_expo_'+ull_table_add+'_'+curr_acc_inc1+'" placeholder="Exposure" data-row_id="'+ull_table_add+'_'+curr_acc_inc1+'" onchange="ullExpo_change($(this));"></td><td class="text-center"> <button type="button" class="btn btn-xs btn-success xlTableBtn ull_table_add mr-1" id="ull_table_add_'+ull_table_add+'_'+curr_acc_inc1+'" onclick="ull_tableAdd_fun($(this));"> <i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlTableBtn ull_table_del" id="ull_table_del_'+ull_table_add+'_'+curr_acc_inc1+'" data-row_id="'+ull_table_add+'_'+curr_acc_inc1+'" onclick="ull_table_del($(this));"> <i class="fa fa-trash"></i></button></td></tr>';
    ullTabTr.after(ullTab);
}

function ull_table_del(thisValue) {
    var ullTable = thisValue.closest('.ull_table').attr('id');
    var thisLength = $('#'+ullTable).find('.ull_table_del').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var row_no = $(thisValue).attr('data-row_id');
        var cb_rid = $('#ull_cb_tr_'+row_no).data('cb_rid');
        if (cb_rid != '')
            delete_ull_cb(cb_rid);
        thisValue.closest('tr').remove();
        ull_table_add --;
        xl_alert('delete');
    }
}


$(document).on('change', '.ull_policyNo', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var policy_no = $(this).val();
    save_update_ull({policy_number:policy_no},accordian_no);
});

$(document).on('change', '.ull_company', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var company_name = $(this).val();
    save_update_ull({company_name:company_name},accordian_no);
});

$(document).on('change', '.ull_ateLiqpremium', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var allp_premium = $(this).val().replace(/[$,]/g, '');
    if (allp_premium) {
        xl_emptyReset($(this));
    }
    save_update_ull({allp_premium:allp_premium},accordian_no);
});

$(document).on('change', '.ull_liqpremium', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var ull_premium = $(this).val().replace(/[$,]/g, '');
    if (ull_premium) {
        xl_emptyReset($(this));
    }
    save_update_ull({ull_premium:ull_premium},accordian_no);
});

$(document).on('change', '.ull_eachCommonLt', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var ecc_limit = $(this).val();
    if (ecc_limit != "other") {
        var ecc_limit = $(this).val();
        $('.ull_eachCommonLt_other').val('');
        save_update_ull({ecc_limit:ecc_limit,ecc_limit_other:null},accordian_no);
    } else {
        save_update_ull({ecc_limit:ecc_limit},accordian_no);
    }
});

$(document).on('change', '.ull_eachCommonLt_other', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var ecc_limit_other = $(this).val().replace(/[$,]/g, '');
    if (ecc_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ull({ecc_limit_other:ecc_limit_other},accordian_no);
});

$(document).on('change', '.ull_aggreLt', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var agg_limit = $(this).val();
    if (agg_limit != "other") {
        var agg_limit = $(this).val();
        $('.ull_aggreLt_other').val('');
        save_update_ull({agg_limit:agg_limit,agg_limit_other:null},accordian_no);
    } else {
        save_update_ull({agg_limit:agg_limit},accordian_no);
    }
});

$(document).on('change', '.ull_aggreLt_other', function() {
    var accordian_no = $(this).closest('.ullAccor').data('accord_no');
    var agg_limit_other = $(this).val().replace(/[$,]/g, '');
    if (agg_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ull({agg_limit_other:agg_limit_other},accordian_no);
});

function save_update_ull(data, accord_no) {
    var ull_id = $('#ullAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (ull_id != '' && ull_id != null) {
        data.rid = ull_id;
        data.updated_by =  localStorage.getItem('usernumericid');
    } else {
        data.created_by =  localStorage.getItem('usernumericid');
    }
    data.acct_id = acc_id;
    data.com_id = com_id;
    data.rqbi_id = rqbi_id;
    try {
        $.ajax({
            url: laravel_url+"/save_update_ull",
            type:'post',
            data : data,
            success:function(response) {
                if (ull_id == '' || ull_id == null) {
                    $('#ullAccor_'+accord_no).data("rid", response.ull_id);
                }
                if (response.update_quote_version == 1) {
                    updateQuoteNameBasedTotalPremium();
                }
            },
            complete : function() {
                
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}

var awesomplete_classcode = {};

function ullCC_keyup(thisValue) {
    var class_code = thisValue.val();
    $('.ull_cc_desc').val();
    var row_id = thisValue.attr('data-row_id');
    xl_ull_initialize_previousClassCode(class_code, row_id, 2);
    thisValue.focus();
}

function xl_ull_initialize_previousClassCode (classcode, rowid, coverage_type) {
    previousclasscode_input = (document.getElementById('ull_cc_'+rowid));
    previousclasscode_global1 = ["1001 - Ada"];
    if (jQuery.isEmptyObject(awesomplete_classcode[rowid])) {
        awesomplete_classcode[rowid] = new Awesomplete(previousclasscode_input, {
            list: previousclasscode_global1,
            minChars: 1,
            maxItems: 500,
            autoFirst: false
        });
    }

    var class_code = $('#ull_cc_'+rowid).val();
    //class_code = class_code.substring(0, 5);

    var coverage_type_array = [];
   
    coverage_type_array.push(coverage_type);

    var cov_ty = coverage_type_array.toString();

    if (class_code.length > 1) {
        /*Check coverages checked or not*/
        $.ajax({
            url: "/brokerage/template/master_class_code_search.php",
            method: 'GET',
            data:{
                'classcode_gl': class_code,'coverage':cov_ty,
            },
            dataType: 'json',

            success: function(response) {

                $('#ull_Invalid_cbClasscode_'+rowid).css('display','none');
                if (response.status != 'fail'  && response.status != '') {
                    suggestionList = response;
                    finalSuggestArray = [];
                    $.each(suggestionList, function(index, value) {

                        finalSuggestArray[index] = [[value.classcode_gl + ' - ' + value.classname],[value.classcode_gl + ' - ' + value.classname]];
                    });

                    awesomplete_classcode[rowid].list = finalSuggestArray;
                        
                } else {
                    ullCC_error(rowid);
                    return false;
                }  
                awesomplete_classcode[rowid] = '';
            },
            error: function(){
                ullCC_error(rowid);
            },
            complete :function(){
            }
        });
        
    }
}

function ullCC_blur(thisValue) {

    var cid =  thisValue.attr('data-row_id');
    var cc = $('#ull_cc_'+cid).val();

   if(cc != ''){
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
                        $('#ull_cc_'+cid).val(res[0].class_code);
                        $('#ull_cc_desc_'+cid).html(res[0].class_description);
                        xl_emptyReset(thisValue);
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
                        var accord_no = $('#ull_cc_'+cid).closest('.ullAccor').data('accord_no');
                        save_update_ullcb({class_code:class_code, class_code_desc:class_code_desc}, accord_no, cid);
                    }         
               }
            });
     
        } else {
            $('#ull_cc_desc_'+cid).html('');
        }
     } else {
        ullCC_error(cid);
     }
}

function ullCC_error(ccId) {
    $('#ull_cc_desc_'+ccId).html('');
    $('#ull_cc_'+ccId).val('').addClass('border-red');
    $('#ull_cc_desc_'+ccId).html('');
    $('#ull_Invalid_cbClasscode_'+ccId).css('display','block');
    $('#ull_Invalid_cbClasscode_'+ccId).css('color','red');
}
var awesomplete_zipcode = {};

function ullZC_keyup(thisValue) {
    var zipcode = thisValue.val();
    var rowid = thisValue.attr('data-row_id');
    var numberval = numberonly(zipcode);
    xl_ull_initialize_previousZipCode(numberval, rowid);
    thisValue.focus();
}

function xl_ull_initialize_previousZipCode (zipcode, rowid) {
    $(this).focus();
    previouszipcode_input = (document.getElementById('ull_zc_'+rowid));
    previouszipcode_global1 = ["1001 - Ada"];
    if (jQuery.isEmptyObject(awesomplete_zipcode[rowid])) {
        awesomplete_zipcode[rowid] = new Awesomplete(previouszipcode_input, {
            list: previouszipcode_global1,
            minChars: 4,
            maxItems: 500,
            //autoFirst: false
        });
    }

    var zip_code = $('#ull_zc_'+rowid).val();
    if (zipcode.length >= 3) {

        $.ajax({
            url: laravel_url+"/get_zip_details",
            type:'post',
            data:{
                'zipcode': zip_code,
            },
            success: function(response) {
                suggestionList = JSON.parse(response);
                if (suggestionList.length > 0) {
                    $('#ull_Invalid_zipcode_'+rowid).css('display','none');
                    finalSuggestArray = [];
                    $.each(suggestionList, function(index, value) {
                        finalSuggestArray[index] = [[value.us_zip + ' - ' + value.us_county],[value.us_zip + ' - ' + value.us_county]];
                    });
                    awesomplete_zipcode[rowid].list = finalSuggestArray;
                    $(this).focus();
                }
            }
        });
    }
}

function ullZc_blur(thisValue) {
    var row_id =  thisValue.attr('data-row_id');
    var zipcode = $('#ull_zc_'+row_id).val();
    if (zipcode != '') {
        if (zipcode.length > 4) {
            zipcode = zipcode.substring(0, 5);
            $.ajax({
                url: laravel_url+"/get_zip_details",
                method: 'post',
                data:{'zipcode': zipcode},
                success: function(response) {
                    suggestionList = JSON.parse(response);
                    if (suggestionList.length > 0) {
                        zipcode_result = suggestionList;
                        var selected_zipcode = suggestionList[0].us_zip + ' - ' + suggestionList[0].us_county;
                        $('#ull_zc_'+row_id).val(selected_zipcode);
                        xl_emptyReset(thisValue);
                    } else {
                        $('#ull_zc_'+row_id).val('').addClass('border-red');
                        $('#ull_Invalid_zipcode_'+row_id).css('display','block');
                        $('#ull_Invalid_zipcode_'+row_id).css('color','red');
                    }
                    
                },
                error: function(xhr, status, error){
                var err = JSON.parse(xhr.responseText);
                new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
                },
                complete: function(){
                    if (zipcode_result.length > 0) {
                        var zipcode = suggestionList[0].us_zip;
                        var county = suggestionList[0].us_county;
                        var accord_no = $('#ull_zc_'+row_id).closest('.ullAccor').data('accord_no');
                        save_update_ullcb({zipcode:zipcode, county:county}, accord_no, row_id);
                    }                
                }
            });
        }
        
    }
}

function ullExpo_change(thisValue) {
    var row_no = thisValue.attr('data-row_id');
    var accordian_no = $('#ull_expo_'+row_no).closest('.ullAccor').data('accord_no');
    var exposure = thisValue.val().replace(/[$,]/g, '');
    if (exposure) {
        xl_emptyReset(thisValue);
    }
    save_update_ullcb({exposure:exposure}, accordian_no, row_no);
}

function save_update_ullcb (data, accord_no, row_no) {
    var ull_id = $('#ullAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (ull_id != '' && ull_id != null) {
        data.ul_rid = ull_id;
    } 
    var cb_id = $('#ull_cb_tr_'+row_no).data('cb_rid');
    if (cb_id != '' && cb_id != null) {
        data.rid = cb_id;
        data.updated_by =  localStorage.getItem('usernumericid');
    } else {
        data.created_by =  localStorage.getItem('usernumericid');
    }
    // data.acct_id = acc_id;
    // data.com_id = com_id;
    // data.rqbi_id = rqbi_id;
    try {
        $.ajax({
            url: laravel_url+"/save_update_ullcb",
            type:'post',
            data : data,
            success:function(response) {
                if (cb_id == '' || cb_id == null) {
                    $('#ull_cb_tr_'+row_no).data("cb_rid", response.ullcb_id);
                }
            },
            complete : function() {
                
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}
function ullAccorOpen(thisValue) {
    var accordian_no = thisValue.closest('.ullAccor').data('accord_no');
    var rid = thisValue.closest('.ullAccor').data('rid');
    var data_retrieved = thisValue.closest('.ullAccor').attr('data-retrieved');
    if (data_retrieved == 0 && rid != '') {
        xl_get_ull(rid, accordian_no);
    }
    if (rid == '') {
        $('#ullAccor_'+accordian_no).attr('data-retrieved',1);
    }
}

$(document).on('click', '.ull_head', function() {
    covAddBtn_toggle($(this), 'Ull' , 'ull_head');
});

function xl_get_ull(rid, accordian_no) {
    try {
        $.ajax({
            url: laravel_url+"/xl_get_ull",
            type:'post',
            data : {rid:rid},
            success:function(response) {
                var ull_data = response.get_ull;
                set_retrieved_ull(ull_data,accordian_no);
            },
            complete : function() {
                $('#ullAccor_'+accordian_no).attr('data-retrieved',1);
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}

function set_retrieved_ull(ull_data, accordian_no) {
    try {
        for (i = 0; i < ull_data.length; i++) {
            if (i == 0) {
                if (ull_data[i].effective_date != null) {
                    var date_time = ull_data[i].effective_date.split(' ');
                    var effec_split=date_time[0].split('-');
                    var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
                }
                if (ull_data[i].expiration_date != null) {
                    var date_time = ull_data[i].expiration_date.split(' ');
                    var expir_split=date_time[0].split('-');
                    var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
                }
                var policy_number = ull_data[i].policy_number;
                var company_name = ull_data[i].company_name;
                var allp_premium = ull_data[i].allp_premium;
                if (allp_premium != null)
                        allp_premium = allp_premium.toLocaleString();
                var ull_premium = ull_data[i].ull_premium;
                if (ull_premium != null)
                        ull_premium = ull_premium.toLocaleString();

                $('#ull_policyNo_'+accordian_no).val(policy_number);
                $('#ull_company_'+accordian_no).val(company_name);
                $('#ull_effectDt_'+accordian_no).val(effective_date);
                $('#ull_expDt_'+accordian_no).val(expiry_date);
                $('#ull_ateLiqpremium_'+accordian_no).val(allp_premium);
                $('#ull_liqpremium_'+accordian_no).val(ull_premium);

                var ecc_limit = ull_data[i].ecc_limit;
                if (ecc_limit == "other") {
                    $('#ull_eachCommonLt_'+accordian_no).val('other');
                    var ecc_limit_field = $('#ull_eachCommonLt_'+accordian_no);
                    xlOtherSelect(ecc_limit_field);
                    var ecc_limit_other = ull_data[i].ecc_limit_other;
                    if(ecc_limit_other != null)
                        ecc_limit_other = ecc_limit_other.toLocaleString();
                    $('#ull_eachCommonLt_'+accordian_no+'_other').val(ecc_limit_other); 
                } else {
                    $('#ull_eachCommonLt_'+accordian_no).val(ecc_limit); 
                }

                var agg_limit = ull_data[i].agg_limit;
                if (agg_limit == "other") {
                    $('#ull_aggreLt_'+accordian_no).val('other');
                    var agg_limit_field = $('#ull_aggreLt_'+accordian_no);
                    xlOtherSelect(agg_limit_field);
                    var agg_limit_other = ull_data[i].agg_limit_other;
                    if (agg_limit_other != null)
                        agg_limit_other = agg_limit_other.toLocaleString();
                    $('#ull_aggreLt_'+accordian_no+'_other').val(agg_limit_other);
                } else {
                    $('#ull_aggreLt_'+accordian_no).val(agg_limit); 
                }

                if (ull_data[i].rid != null) {
                    var cb_rid = ull_data[i].rid;
                    var class_code = ull_data[i].class_code;
                    var class_code_desc = ull_data[i].class_code_desc;
                    var zipcode = ull_data[i].zipcode;
                    var county = ull_data[i].county;
                    var exposure = ull_data[i].exposure;
                    if (exposure != null)
                        exposure = exposure.toLocaleString();

                    $('#ull_cb_tr_'+accordian_no+'_'+i).attr('data-cb_rid', cb_rid);
                    $('#ull_cc_'+accordian_no+'_'+i).val(class_code);
                    $('#ull_cc_desc_'+accordian_no+'_'+i).html(class_code_desc);
                    if (zipcode != null)
                        $('#ull_zc_'+accordian_no+'_'+i).val(zipcode+'-'+county);
                    $('#ull_expo_'+accordian_no+'_'+i).val(exposure);
                }
            } else {
                var ullTabTr = $('#ull_table_'+accordian_no+' tbody').find('tr:last-child');
                $.when(ullTable_addFun(ullTabTr, accordian_no, i)).then(function(response) {
                    var cb_rid = ull_data[i].rid;
                    var class_code = ull_data[i].class_code;
                    var class_code_desc = ull_data[i].class_code_desc;
                    var zipcode = ull_data[i].zipcode;
                    var county = ull_data[i].county;
                    var exposure = ull_data[i].exposure;
                    if(exposure != null)
                        exposure = exposure.toLocaleString();
                    
                    $('#ull_cb_tr_'+accordian_no+'_'+i).attr('data-cb_rid', cb_rid);
                    $('#ull_cc_'+accordian_no+'_'+i).val(class_code);
                    $('#ull_cc_desc_'+accordian_no+'_'+i).html(class_code_desc);
                    if (zipcode != null)
                        $('#ull_zc_'+accordian_no+'_'+i).val(zipcode+'-'+county);
                    $('#ull_expo_'+accordian_no+'_'+i).val(exposure);
                });
            }
        }
        ull_table_add = i;
    }
    catch(err) {
        console.log(err);
        
    }
}

function delete_ull_cb(rid) {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/delete_ull_cb",
            type:'post',
            data : {rid : rid, deleted_by : deleted_by},
            success:function(response) {
                
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}

function delete_ull(rid) {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/delete_ull",
            type:'post',
            data : {rid : rid, acct_id : acc_id, com_id : com_id, rqbi_id : rqbi_id, deleted_by : deleted_by},
            success:function(response) {
                updateQuoteNameBasedTotalPremium();
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}

function delete_all_ull() {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/delete_all_ull",
            type:'post',
            data : {acct_id : acc_id, com_id : com_id, rqbi_id : rqbi_id, deleted_by : deleted_by},
            success:function(response) {
                updateQuoteNameBasedTotalPremium(); 
            }
        });
    }
    catch(err) {
        console.log(err);
        
    }
}
