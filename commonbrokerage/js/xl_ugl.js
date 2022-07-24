function xlGl_append(th){
    if (th.checked) {
        if ($('#xlUgl_div').html().trim() == '') {
            $.ajax({
                url: '/brokerage/template/xl_Ugl.php',
                method: 'post',
                success: function(res) {
                    $('#xlUgl_div').html(res);
                },
                complete:function(){
                    var effective_date = $('#rqbieffdate').val();
                    var expiration_date = $('#rqbiexpdate').val();
                    var eo_limit = $('#ugl_eachOccuLt_0').val();
                    var ga_limit = $('#ugl_genAggreLt_0').val();
                    var pco_limit = $('#ugl_prodLt_0').val();
                    var piai_limit = $('#ugl_personalInjLt_0').val();
                    $('.ugl_effectDt').datepicker('update', effective_date);
                    $('.ugl_expDt').datepicker('update', expiration_date);
                    save_update_ugl({effective_date:effective_date, expiration_date:expiration_date, eo_limit:eo_limit, ga_limit:ga_limit, pco_limit:pco_limit, piai_limit:piai_limit},0);
                }
            });
        }
    } else {
        cov_uncheck(th, 'Ugl', 'General Liability');
    }
}

//  ugl add another
var uglAdd = 0;
function xl_addUgl() {
    var uglAcc = $('.uglAccor').last();
    var curr_acc = uglAcc.attr('id');
    var curr_acc_plus = curr_acc.split('_')[1];
    var gl_prem = uglAcc.find('.agl_premium').val();
    var ul_prem = uglAcc.find('.ugl_premium').val();
    var poliType = $('input[name="uglType_'+curr_acc_plus+'"]:checked').val();
    var each_occu_select = uglAcc.find('.ugl_eachOccuLt').val();
    var gen_aggre_select = uglAcc.find('.ugl_genAggreLt').val();
    var prodLt_select = uglAcc.find('.ugl_prodLt').val();
    var persInj_select = uglAcc.find('.ugl_personalInjLt').val();
    var ugl_classCode = uglAcc.find('.ugl_cc').val();
    var ugl_zip = uglAcc.find('.ugl_zc').val();
    var ugl_expo = uglAcc.find('.ugl_expo').val();

    if (each_occu_select == 'other') {
        var each_occu = uglAcc.find('.ugl_eachOccuLt_other').val();
    } else {
        var each_occu = uglAcc.find('.ugl_eachOccuLt').val();
    }
    if (gen_aggre_select == 'other') {
        var gen_aggre = uglAcc.find('.ugl_genAggreLt_other').val();
    } else {
        var gen_aggre = uglAcc.find('.ugl_genAggreLt').val();
    }
    if (prodLt_select == 'other') {
        var prodLt = uglAcc.find('.ugl_prodLt_other').val();
    } else {
        var prodLt = uglAcc.find('.ugl_prodLt ').val();
    }
    if (persInj_select == 'other') {
        var persInj = uglAcc.find('.ugl_personalInjLt_other').val();
    } else {
        var persInj = uglAcc.find('.ugl_personalInjLt').val();
    }

    if (gl_prem && ul_prem && poliType && each_occu && gen_aggre && prodLt && persInj && ugl_classCode && ugl_zip && ugl_expo) {
        uglAdd++;
        $.when(ugl_AddAnotherFun(uglAdd, uglAcc)).then(function(response) {
            var effective_date = $('#rqbieffdate').val();
            var expiration_date = $('#rqbiexpdate').val();
            var eo_limit = $('#ugl_eachOccuLt_'+uglAdd).val();
            var ga_limit = $('#ugl_genAggreLt_'+uglAdd).val();
            var pco_limit = $('#ugl_prodLt_'+uglAdd).val();
            var piai_limit = $('#ugl_personalInjLt_'+uglAdd).val();

            $('.ugl_effectDt_'+uglAdd).datepicker('update', effective_date);
            $('.ugl_expDt_'+uglAdd).datepicker('update', expiration_date);
            save_update_ugl({effective_date:effective_date, expiration_date:expiration_date, eo_limit:eo_limit, ga_limit:ga_limit, pco_limit:pco_limit, piai_limit:piai_limit},uglAdd);
        });
        xl_scrollAccor(uglAcc, 'ugl','down');
        xl_alert('success');
    } else {
        ugl_emptyValid(uglAcc, gl_prem, ul_prem, each_occu, gen_aggre, prodLt, persInj, ugl_classCode, ugl_zip, ugl_expo);
        xl_alert('empty');
    }
}

function ugl_emptyValid(uglAcc, gl_prem, ul_prem, each_occu, gen_aggre, prodLt, persInj, ugl_classCode, ugl_zip, ugl_expo) {
    if (!gl_prem) {
        xl_emptyValid (uglAcc, "agl_premium");
    }
    if (!ul_prem) {
        xl_emptyValid (uglAcc, "ugl_premium");
    }
    if (!each_occu) {
        xl_emptyValid (uglAcc, "ugl_eachOccuLt_other");
    }
    if (!gen_aggre) {
        xl_emptyValid (uglAcc, "ugl_genAggreLt_other");
    }
    if (!prodLt) {
        xl_emptyValid (uglAcc, "ugl_prodLt_other");
    }
    if (!persInj) {
        xl_emptyValid (uglAcc, "ugl_personalInjLt_other");
    }
    if (!ugl_classCode) {
        xl_emptyValid (uglAcc, "ugl_cc");
    }
    if (!ugl_zip) {
        xl_emptyValid (uglAcc, "ugl_zc");
    }
    if (!ugl_expo) {
        xl_emptyValid (uglAcc, "ugl_expo");
    }
}

function ugl_AddAnotherFun(uglAdd, uglAcc) {  
    var uglCopy = '<div class="accordion mt-4 uglAccor" id="uglAccor_'+uglAdd+'" data-accord_no="'+uglAdd+'" data-rid="" data-retrieved="0"><div class="card"><div class="card-header ugl_head" id="ugl_head_'+uglAdd+'" data-toggle="collapse" data-target="#ugl_collapse_'+uglAdd+'" aria-expanded="true" aria-controls="ugl_collapse_'+uglAdd+'" onclick="uglAccorOpen($(this));"> General Liability</div><div id="ugl_collapse_'+uglAdd+'" class="collapse show" aria-lebelledy="ugl_head_'+uglAdd+'" data-parent="#uglAccor_'+uglAdd+'"><div class="card-body"><div class="form-group row mt-2"> <label class="col-auto mr-2"> Policy Type <span class="redStar"> * </span> </label><div class="col-auto"><div class="custom-control custom-radio custom-control-inline"> <input type="radio" class="custom-control-input ugl_typeOcc ugl_policy_type" id="ugl_typeOcc_'+uglAdd+'" name="uglType_'+uglAdd+'" value="0" checked> <label class="custom-control-label" for="ugl_typeOcc_'+uglAdd+'"> Occurrence </label></div><div class="custom-control custom-radio custom-control-inline"> <input type="radio" class="custom-control-input ugl_typeClaim ugl_policy_type" id="ugl_typeClaim_'+uglAdd+'" name="uglType_'+uglAdd+'" value="1"> <label class="custom-control-label" for="ugl_typeClaim_'+uglAdd+'"> Claims Made </label></div></div></div><div class="row"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm ugl_policyNo" id="ugl_policyNo_'+uglAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm ugl_company" id="ugl_company_'+uglAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date ugl_effectDt ugl_effectDt_'+uglAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="ugl_effectDt_'+uglAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date ugl_expDt ugl_expDt_'+uglAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="ugl_expDt_'+uglAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row"><div class="form-group col-md-3"> <label> Ategrity General Liability Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm agl_premium xl_number" id="agl_premium_'+uglAdd+'" maxlength="19" placeholder="Ategrity General Liability Premium"></div></div></div><div class="form-group col-auto"> <label> Other Carrier - UL General Liability Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm ugl_premium xl_number" id="ugl_premium_'+uglAdd+'" maxlength="19" placeholder="UL General Liability Premium"></div></div></div><div class="form-group col-auto"> <label> Each Occurrence Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ugl_eachOccuLt" id="ugl_eachOccuLt_'+uglAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> General Aggregate Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ugl_genAggreLt" id="ugl_genAggreLt_'+uglAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000"> 1,000,000</option><option value="2000000" selected> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-md-3"> <label> Products Completed Operations Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ugl_prodLt" id="ugl_prodLt_'+uglAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000"> 1,000,000</option><option value="2000000" selected> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-md-4"> <label> Personal Injury & Advertising Injury Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm ugl_personalInjLt" id="ugl_personalInjLt_'+uglAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div></div><div class="row"><div class="col-md-6"> <label> SIC code </label> <select class="form-control form-control-sm xl_SIC" id="xl_SIC_'+uglAdd+'"></select> </div><div class="col-md-2"> <label> Hazard code </label> <select class="form-control form-control-sm xl_hazard" id="xl_hazard_'+uglAdd+'"><option value="" disabled selected="true"></option><option value="1"> Low</option><option value="2"> Medium</option><option value="3"> High</option> </select></div></div><table class="table table-sm table-bordered xlTable ugl_table mt-3" id="ugl_table_'+uglAdd+'"><thead class="bg-lav"><tr><th> Class code <span class="redStar"> * </span></th><th class="width20_perc"> Zip code <span class="redStar"> * </span></th><th class="width20_perc"> Exposure <span class="redStar"> * </span></th><th class="width10_perc"> Actions</th></tr></thead><tbody><tr class="ugl_cb_tr" id="ugl_cb_tr_'+uglAdd+'_0" data-cb_rid=""><td> <input type="text" class="form-control form-control-sm ugl_cc" id="ugl_cc_'+uglAdd+'_0" placeholder="Class code" data-row_id="'+uglAdd+'_0" onblur="uglCC_save($(this));" onkeyup="uglCC_search($(this));"><small><span class="ugl_cc_desc pull-left" id="ugl_cc_desc_'+uglAdd+'_0"></span></small><small class="pull-left" id="ugl_Invalid_cbClasscode_'+uglAdd+'_0" style="display:none">Invalid Class Code</small></td><td> <input type="text" class="form-control form-control-sm ugl_zc" id="ugl_zc_'+uglAdd+'_0" placeholder="Zip code" data-row_id="'+uglAdd+'_0" onblur="uglZC_save($(this));" onkeyup="uglZC_search($(this));"><small class="pull-left" id="ugl_Invalid_zipcode_'+uglAdd+'_0" style="display:none">Invalid Zipcode</small></td><td> <input type="text" class="form-control form-control-sm ugl_expo xl_number" id="ugl_expo_'+uglAdd+'_0" placeholder="Exposure" maxlength="19" data-row_id="'+uglAdd+'_0" onblur="uglExpo_save($(this));"></td><td class="text-center"> <button type="button" class="btn btn-xs btn-success xlTableBtn ugl_table_add mr-1" id="ugl_table_add_'+uglAdd+'_0" onclick="ugl_table_add($(this));"> <i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlTableBtn ugl_table_del" id="ugl_table_del_'+uglAdd+'_0" data-row_id="'+uglAdd+'_0" onclick="ugl_table_del($(this));"> <i class="fa fa-trash"></i></button></td></tr></tbody></table><div class="ugl_deleteDiv text-right mt-4 mb-2"> <button type="button" class="btn btn-sm btn-danger uglRemoveBtn" id="uglRemoveBtn_'+uglAdd+'"  onclick="uglRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
    uglAcc.after(uglCopy);

    $(".ugl_effectDt_"+uglAdd).datepicker({
            format: 'mm-dd-yyyy',
            autoclose: true,
            todayHighlight: true
        }).on('changeDate', function(selected) {
            var minDate = new Date(selected.date);
            var nxtYear = dateNextYear(selected.date);
            expDateSet($(this), 'ugl', nxtYear, minDate);

            var accordian_no = $(this).closest('.uglAccor').data('accord_no');
            var ugl_effectdate = $('#ugl_effectDt_'+accordian_no).val();
            var ugl_expdate = $('#ugl_expDt_'+accordian_no).val();
            save_update_ugl({effective_date:ugl_effectdate, expiration_date:ugl_expdate}, accordian_no);
        });
    
        $(".ugl_expDt_"+uglAdd).datepicker({
            format: 'mm-dd-yyyy',
            autoclose: true
        }).on('changeDate', function(e) {
            var accordian_no = $(this).closest('.uglAccor').data('accord_no');
            var ugl_expirdate=$('#ugl_expDt_'+accordian_no).val();
            save_update_ugl({expiration_date: ugl_expirdate}, accordian_no);
        });
}

function uglRemoveBtn(thisValue) {
    var thisLength = $('.uglRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.uglAccor').attr('id');
        thisValue.closest('.ugl_deleteDiv').append('<div class="alert alert-warning col-4 ugl_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="ugl_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function ugl_deleteYes(thisId) {
    var accordian_no = $('#'+thisId).data('accord_no');
    var ugl_id = $('#uglAccor_'+accordian_no).data("rid");
    delete_ugl(ugl_id);
    if ($('.uglAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'ugl','up');   
    } else {
        xl_scrollAccor(thisId, 'ugl','stay');
    }
    $('#'+thisId).remove();
    xl_alert('delete');
}

function ugl_table_add(thisValue) {
    var tr_lst_cc, tr_lst_zc, tr_lst_expo;
    var curr_cc = thisValue.closest('tr').find('.ugl_cc').attr('id');
    var curr_acc_no = curr_cc.split('_')[2];
    var curr_acc_inc = curr_cc.split('_')[3];

    tr_lst_cc = thisValue.closest('tbody').find('tr:last-child .ugl_cc').val();
    tr_lst_zc = thisValue.closest('tbody').find('tr:last-child .ugl_zc').val();
    tr_lst_expo = thisValue.closest('tbody').find('tr:last-child .ugl_expo').val();

    if (tr_lst_cc && tr_lst_zc && tr_lst_expo) {
        curr_acc_inc ++;
        var uglTabTr = thisValue.closest('tbody').find('tr:last-child');
        uglTable_addFun(uglTabTr, curr_acc_no, curr_acc_inc);
    } else {
        if (!tr_lst_cc) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ugl_cc');
        }
        if (!tr_lst_zc) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ugl_zc');
        }
        if (!tr_lst_expo) {
            xl_emptyValid (thisValue.closest('tbody').find('tr').last(), 'ugl_expo');
        }
        xl_alert('empty');
    }
}

function uglTable_addFun(uglTabTr, curr_acc_no, curr_acc_inc) {
    var uglTab = '<tr class="ugl_cb_tr" id="ugl_cb_tr_'+curr_acc_no+'_'+curr_acc_inc+'" data-cb_rid=""><td> <input type="text" class="form-control form-control-sm ugl_cc" id="ugl_cc_'+curr_acc_no+'_'+curr_acc_inc+'" placeholder="Class code" data-row_id="'+curr_acc_no+'_'+curr_acc_inc+'" onblur="uglCC_save($(this));" onkeyup="uglCC_search($(this));"><small><span class="ugl_cc_desc pull-left" id="ugl_cc_desc_'+curr_acc_no+'_'+curr_acc_inc+'"></span></small><small class="pull-left" id="ugl_Invalid_cbClasscode_'+curr_acc_no+'_'+curr_acc_inc+'" style="display:none">Invalid Class Code</small></td><td> <input type="text" class="form-control form-control-sm ugl_zc" id="ugl_zc_'+curr_acc_no+'_'+curr_acc_inc+'" placeholder="Zip code" data-row_id="'+curr_acc_no+'_'+curr_acc_inc+'" onblur="uglZC_save($(this));" onkeyup="uglZC_search($(this));"><small class="pull-left" id="ugl_Invalid_zipcode_'+curr_acc_no+'_'+curr_acc_inc+'" style="display:none">Invalid Zipcode</small></td><td> <input type="text" class="form-control form-control-sm ugl_expo xl_number" id="ugl_expo_'+curr_acc_no+'_'+curr_acc_inc+'" placeholder="Exposure" maxlength="19" data-row_id="'+curr_acc_no+'_'+curr_acc_inc+'" onblur="uglExpo_save($(this));"></td><td class="text-center"> <button type="button" class="btn btn-xs btn-success xlTableBtn ugl_table_add mr-1" id="ugl_table_add_'+curr_acc_no+'_'+curr_acc_inc+'" onclick="ugl_table_add($(this));"> <i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlTableBtn ugl_table_del" id="ugl_table_del_'+curr_acc_no+'_'+curr_acc_inc+'" data-row_id="'+curr_acc_no+'_'+curr_acc_inc+'" onclick="ugl_table_del($(this));"> <i class="fa fa-trash"></i></button></td></tr>';
    uglTabTr.after(uglTab);
}

$(document).on('change', '.ugl_policy_type', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var policy_type = $(this).val();
    save_update_ugl({policy_type:policy_type}, accordian_no);
});

$(document).on('change', '.ugl_policyNo', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var policy_no = $(this).val();
    save_update_ugl({policy_number:policy_no}, accordian_no);
});

$(document).on('change', '.ugl_company', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var company_name = $(this).val();
    save_update_ugl({company_name:company_name}, accordian_no);
});

$(document).on('change', '.agl_premium', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var agl_premium = $(this).val().replace(/[$,]/g, '');
    if (agl_premium) {
        xl_emptyReset($(this));
    }
    save_update_ugl({agl_premium:agl_premium}, accordian_no);
});

$(document).on('change', '.ugl_premium', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var ulgl_premium = $(this).val().replace(/[$,]/g, '');
    if (ulgl_premium) {
        xl_emptyReset($(this));
    }
    save_update_ugl({ulgl_premium:ulgl_premium}, accordian_no);
});

$(document).on('change', '.ugl_eachOccuLt', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var eo_limit = $(this).val();
    if (eo_limit != "other") {
        var eo_limit = $(this).val();
        $('.ugl_eachOccuLt_other').val('');
        save_update_ugl({eo_limit:eo_limit,eo_limit_other:null}, accordian_no);
    } else {
        save_update_ugl({eo_limit:eo_limit}, accordian_no);
    }
});

$(document).on('change', '.ugl_eachOccuLt_other', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var eo_limit_other = $(this).val().replace(/[$,]/g, '');
    if (eo_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ugl({eo_limit_other:eo_limit_other}, accordian_no);
});

$(document).on('change', '.ugl_genAggreLt', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var ga_limit = $(this).val();
    if (ga_limit != "other") {
        var ga_limit = $(this).val();
        $('.ugl_genAggreLt_other').val('');
        save_update_ugl({ga_limit:ga_limit,ga_limit_other:null}, accordian_no);
    } else {
        save_update_ugl({ga_limit:ga_limit}, accordian_no);
    }
});

$(document).on('change', '.ugl_genAggreLt_other', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var ga_limit_other = $(this).val().replace(/[$,]/g, '');
    if (ga_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ugl({ga_limit_other:ga_limit_other}, accordian_no);
});

$(document).on('change', '.ugl_prodLt', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var pco_limit = $(this).val();
    if (pco_limit != "other") {
        var pco_limit = $(this).val();
        $('.ugl_prodLt_other').val('');
        save_update_ugl({pco_limit:pco_limit,pco_limit_other:null}, accordian_no);
    } else {
        save_update_ugl({pco_limit:pco_limit}, accordian_no);
    }
});

$(document).on('change', '.ugl_prodLt_other', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var pco_limit_other = $(this).val().replace(/[$,]/g, '');
    if (pco_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ugl({pco_limit_other:pco_limit_other}, accordian_no);
});

$(document).on('change', '.ugl_personalInjLt', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var piai_limit = $(this).val();
    if (piai_limit != "other") {
        var piai_limit = $(this).val();
        $('.ugl_personalInjLt_other').val('');
        save_update_ugl({piai_limit:piai_limit,piai_limit_other:null}, accordian_no);
    } else {
        save_update_ugl({piai_limit:piai_limit}, accordian_no);
    }
});

$(document).on('change', '.ugl_personalInjLt_other', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var piai_limit_other = $(this).val().replace(/[$,]/g, '');
    if (piai_limit_other) {
        xl_emptyReset($(this));
    }
    save_update_ugl({piai_limit_other:piai_limit_other}, accordian_no);
});


$(document).on('change', '.xl_SIC', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var sic_code = $(this).val();
    save_update_ugl({sic_code:sic_code}, accordian_no);
});

$(document).on('change', '.xl_hazard', function() {
    var accordian_no = $(this).closest('.uglAccor').data('accord_no');
    var hazard_code = $(this).val();
    save_update_ugl({hazard_code:hazard_code}, accordian_no);
});

var awesomplete_classcode = {};

function uglCC_search(thisValue) {
    var class_code = thisValue.val();
    $('.ugl_cc_desc').val();
    var row_id = thisValue.attr('data-row_id');
    xl_initialize_previousClassCode(class_code, row_id, 1);
    thisValue.focus();
}

function xl_initialize_previousClassCode (classcode, rowid, coverage_type) {
    previousclasscode_input = (document.getElementById('ugl_cc_'+rowid));
    previousclasscode_global1 = ["1001 - Ada"];
    if(jQuery.isEmptyObject(awesomplete_classcode[rowid])){
        awesomplete_classcode[rowid] = new Awesomplete(previousclasscode_input, {
            list: previousclasscode_global1,
            minChars: 1,
            maxItems: 500,
            autoFirst: false
        });
    }

    var class_code = $('#ugl_cc_'+rowid).val();
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

                $('#ugl_Invalid_cbClasscode_'+rowid).css('display','none');
                if (response.status != 'fail' && response.status != '') {
                    suggestionList = response;
                    finalSuggestArray = [];
                    $.each(suggestionList, function(index, value) {

                        finalSuggestArray[index] = [[value.classcode_gl + ' - ' + value.classname],[value.classcode_gl + ' - ' + value.classname]];
                    });
                    awesomplete_classcode[rowid].list = finalSuggestArray;
                } else {
                    $('#ugl_cc_'+rowid).val('').addClass('border-red');
                    $('#ugl_cc_desc_'+rowid).html('');
                    $('#ugl_Invalid_cbClasscode_'+rowid).css('display','block');
                    $('#ugl_Invalid_cbClasscode_'+rowid).css('color','red');
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

function uglCC_save(thisValue) {
    var cid =  thisValue.attr('data-row_id');
    var cc = $('#ugl_cc_'+cid).val();

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
                        $('#ugl_cc_'+cid).val(res[0].class_code);
                        $('#ugl_cc_desc_'+cid).html(res[0].class_description);
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
                        var accord_no = $('#ugl_cc_'+cid).closest('.uglAccor').data('accord_no');
                        var first_rowno = $('#uglAccor_'+accord_no+' table tr .ugl_cc').data('row_id');
                        save_update_uglcb({class_code:class_code, class_code_desc:class_code_desc}, accord_no, cid, first_rowno)
                    }            
               }
            });
     
        } 
    } else {
        $('#ugl_cc_desc_'+cid).html('');
    }
}

var awesomplete_zipcode = {};

function uglZC_search(thisValue) {
    var zipcode = thisValue.val();
    var rowid = thisValue.attr('data-row_id');
    var numberval = numberonly(zipcode);
    xl_initialize_previousZipCode(numberval, rowid);
    thisValue.focus();
}

function xl_initialize_previousZipCode (zipcode, rowid) {
    $(this).focus();
    previouszipcode_input = (document.getElementById('ugl_zc_'+rowid));
    previouszipcode_global1 = ["1001 - Ada"];
    if (jQuery.isEmptyObject(awesomplete_zipcode[rowid])) {
        awesomplete_zipcode[rowid] = new Awesomplete(previouszipcode_input, {
            list: previouszipcode_global1,
            minChars: 4,
            maxItems: 500,
            //autoFirst: false
        });
    }

    var zip_code = $('#ugl_zc_'+rowid).val();
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
                    $('#ugl_Invalid_zipcode_'+rowid).css('display','none');
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

function uglZC_save(thisValue) {
    
    // e.preventDefault();
    var row_id =  thisValue.attr('data-row_id');
    var zipcode = $('#ugl_zc_'+row_id).val();
    if (zipcode != '') {
        if (zipcode.length >= 5) {
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
                        $('#ugl_zc_'+row_id).val(selected_zipcode);
                        xl_emptyReset(thisValue);
                    } else {
                        zipcode_result = '';
                        $('#ugl_zc_'+row_id).val('').addClass('border-red');
                        $('#ugl_Invalid_zipcode_'+row_id).css('display','block');
                        $('#ugl_Invalid_zipcode_'+row_id).css('color','red');
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
                        var accord_no = $('#ugl_zc_'+row_id).closest('.uglAccor').data('accord_no');
                        save_update_uglcb({zipcode:zipcode, county:county}, accord_no, row_id, '');
                    }                
                }
            });
        } 
    }
}

function uglExpo_save(thisValue) {
    var row_no = thisValue.attr('data-row_id');
    var accordian_no = $('#ugl_expo_'+row_no).closest('.uglAccor').data('accord_no');
    var exposure = thisValue.val().replace(/[$,]/g, '');
    if (exposure) {
        xl_emptyReset(thisValue);
    }
    save_update_uglcb({exposure:exposure}, accordian_no, row_no, '');
}


function save_update_ugl(data, accord_no) {
    var ugl_id = $('#uglAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (ugl_id != '' && ugl_id != null) {
        data.rid = ugl_id;
        data.updated_by =  localStorage.getItem('usernumericid');
    } else {
        data.created_by =  localStorage.getItem('usernumericid');
    }
	data.acct_id = acc_id;
	data.com_id = com_id;
	data.rqbi_id = rqbi_id;
    try {
        $.ajax({
            url: laravel_url+"/save_update_ugl",
            type:'post',
            data : data,
            success:function(response) {console.log(response.ugl_id);
                if (ugl_id == '' || ugl_id == null) {
                    $('#uglAccor_'+accord_no).data("rid", response.ugl_id);
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

function save_update_uglcb (data, accord_no, row_no, first_rowno) {
    var ugl_id = $('#uglAccor_'+accord_no).data("rid");
    var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    if (ugl_id != '' && ugl_id != null) {
        data.ul_rid = ugl_id;
    } 
    var cb_id = $('#ugl_cb_tr_'+row_no).data('cb_rid');
    if (cb_id != '' && cb_id != null) {
        data.rid = cb_id;
        data.updated_by =  localStorage.getItem('usernumericid');
    } else {
        data.created_by =  localStorage.getItem('usernumericid');
    }
	
    try {
        $.ajax({
            url: laravel_url+"/save_update_uglcb",
            type:'post',
            data : data,
            success:function(response) {
                if (cb_id == '' || cb_id == null) {
                    $('#ugl_cb_tr_'+row_no).data("cb_rid", response.uglcb_id);
                }
                has_classcode = "class_code" in data;
                if (has_classcode == true) {
                    if(row_no == first_rowno){
                        get_sic_hazard(data.class_code,accord_no);
                    }
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

function ugl_table_del(thisValue) {
    var uglTable = thisValue.closest('.ugl_table').attr('id');
    var thisLength = $('#'+uglTable).find('.ugl_table_del').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var accord_no = $(thisValue).closest('.uglAccor').data('accord_no');
        var row_no = $(thisValue).attr('data-row_id');
        var cb_rid = $('#ugl_cb_tr_'+row_no).data('cb_rid');
        var first_classcode = $('#uglAccor_'+accord_no+' table tr .ugl_cc').val();
        var ul_rid = $('#uglAccor_'+accord_no).data('rid');
        if (cb_rid != '')
            delete_ugl_cb(cb_rid, ul_rid, first_classcode, accord_no);
        thisValue.closest('tr').remove();
        xl_alert('delete');
    }
    
}

function get_sic_hazard(classcode, accord_no) {
    try {
        var rid = $('#uglAccor_'+accord_no).data("rid");
        var updated_by =  localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/get_sic_hazard",
            type:'post',
            data : {rid:rid, classcode:classcode, updated_by:updated_by},
            success:function(response) {
                if (response.sic_option != '') {
                    $('#xl_SIC_'+accord_no).html(response.sic_option);
                }
                if (response.hazard_factor != '') {
                    $("#xl_hazard_"+accord_no).val(response.hazard_factor);
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
 
function save_ugl_default_accord(new_comid, new_rqbiid) {
    try {
        data = {};
        data.acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        data.com_id = new_comid;
        data.rqbi_id = new_rqbiid;
        data.eo_limit = $('#ugl_eachOccuLt_'+uglAdd).val();
        data.ga_limit = $('#ugl_genAggreLt_'+uglAdd).val();
        data.pco_limit = $('#ugl_prodLt_'+uglAdd).val();
        data.piai_limit = $('#ugl_personalInjLt_'+uglAdd).val();
        data.created_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/save_update_ugl",
            type:'post',
            data : data,
            success:function(response) {
                $('#uglAccor_0').data("rid", response.ugl_id);
            },
            complete : function() {
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function xl_ugl_retrieve(res_ugl) {
    try {
        if (res_ugl.length > 0) {
            ugl_td = res_ugl.split(',');
            for (ugl_i = 0; ugl_i < ugl_td.length; ugl_i++) {
                var ugl_rid = ugl_td[ugl_i];
                if (ugl_i != 0) {
                    j= ugl_i;
                    ugl_id = j-1;
                    ugl_accrd = $('#uglAccor_'+ugl_id).last();
                    console.log(ugl_accrd);
                    ugl_AddAnotherFun(j, ugl_accrd);
                    uglAdd = ugl_i;
                    $('.uglAccor').eq(ugl_i).attr('data-rid', ugl_rid);
                    $('#ugl_head_'+ugl_i).attr('aria-expanded',false);
                    $('#ugl_head_'+ugl_i).addClass('collapsed');
                    $('#ugl_collapse_'+ugl_i).removeClass('show');
                }else{
                    $('.uglAccor').eq(ugl_i).attr('data-rid', ugl_rid);
                    xl_get_ugl(ugl_rid, ugl_i);
                    $('#uglAccor_'+ugl_i).attr('data-retrieved',1);
                }
            }
        } 
    }
    catch(err) {
		console.log(err);
		
	}
}

function uglAccorOpen(thisValue) {
    var accordian_no = thisValue.closest('.uglAccor').data('accord_no');
    var rid = thisValue.closest('.uglAccor').data('rid');
    var data_retrieved = thisValue.closest('.uglAccor').attr('data-retrieved');
    if (data_retrieved == 0 && rid != '') {
        xl_get_ugl(rid, accordian_no);
    }
    if(rid == ''){
        $('#uglAccor_'+accordian_no).attr('data-retrieved',1);
    }
}

$(document).on('click', '.ugl_head', function() {
    covAddBtn_toggle(thisValue, 'Ugl' , 'ugl_head');
});

function xl_get_ugl(rid, accordian_no) {
    try {
        $.ajax({
            url: laravel_url+"/xl_get_ugl",
            type:'post',
            data : {rid:rid},
            success:function(response) {
                var ugl_data = response.get_ugl;
                var sic_option = response.sic_option;
                set_retrieved_ugl(ugl_data, sic_option, accordian_no);
            },
            complete : function() {
                $('#uglAccor_'+accordian_no).attr('data-retrieved',1);
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function set_retrieved_ugl(ugl_data, sic_option, accordian_no) {
    try {    
        for (i = 0; i < ugl_data.length; i++) {
            if (i == 0) {        
                if (ugl_data[i].effective_date != null) {
        			var date_time = ugl_data[i].effective_date.split(' ');
        			var effec_split=date_time[0].split('-');
        			var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
        		}
        		if (ugl_data[i].expiration_date != null) {
        			var date_time = ugl_data[i].expiration_date.split(' ');
        			var expir_split=date_time[0].split('-');
        			var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
        		}
                var policy_type = ugl_data[i].policy_type;
                var policy_number = ugl_data[i].policy_number;
                var company_name = ugl_data[i].company_name;
                var agl_premium = ugl_data[i].agl_premium;
                if(agl_premium != null)
                    agl_premium = agl_premium.toLocaleString();
                var ulgl_premium = ugl_data[i].ulgl_premium;
                if(ulgl_premium != null)
                    ulgl_premium = ulgl_premium.toLocaleString();
                var sic_code = ugl_data[i].sic_code;
                var hazard_code = ugl_data[i].hazard_code;

                if (policy_type == 0) {
                    $('#ugl_typeOcc_'+accordian_no).prop('checked',true);
                } else {
                    $('#ugl_typeClaim_'+accordian_no).prop('checked',true);
                }
                $('#ugl_policyNo_'+accordian_no).val(policy_number);
                $('#ugl_company_'+accordian_no).val(company_name);
                $('#ugl_effectDt_'+accordian_no).val(effective_date);
                $('#ugl_expDt_'+accordian_no).val(expiry_date);
                $('#agl_premium_'+accordian_no).val(agl_premium);
                $('#ugl_premium_'+accordian_no).val(ulgl_premium);

                var eo_limit = ugl_data[i].eo_limit;
                if (eo_limit == "other") {
                    $('#ugl_eachOccuLt_'+accordian_no).val('other');
                    var eo_limit_field = $('#ugl_eachOccuLt_'+accordian_no);
                    xlOtherSelect(eo_limit_field);
                    var eo_limit_other = ugl_data[i].eo_limit_other;
                    if(eo_limit_other != null)
                        eo_limit_other = eo_limit_other.toLocaleString();
                    $('#ugl_eachOccuLt_'+accordian_no+'_other').val(eo_limit_other); 
                } else {
                    $('#ugl_eachOccuLt_'+accordian_no).val(eo_limit); 
                }

                var ga_limit = ugl_data[i].ga_limit;
                if (ga_limit == "other") {
                    $('#ugl_genAggreLt_'+accordian_no).val('other');
                    var ga_limit_field = $('#ugl_genAggreLt_'+accordian_no);
                    xlOtherSelect(ga_limit_field);
                    var ga_limit_other = ugl_data[i].ga_limit_other;
                    if(ga_limit_other != null)
                        ga_limit_other = ga_limit_other.toLocaleString();
                    $('#ugl_genAggreLt_'+accordian_no+'_other').val(ga_limit_other);
                } else {
                    $('#ugl_genAggreLt_'+accordian_no).val(ga_limit); 
                }

                var pco_limit = ugl_data[i].pco_limit;
                if (pco_limit == "other") {
                    $('#ugl_prodLt_'+accordian_no).val('other');
                    var pco_limit_field = $('#ugl_prodLt_'+accordian_no);
                    xlOtherSelect(pco_limit_field);
                    var pco_limit_other = ugl_data[i].pco_limit_other
                    if (pco_limit_other != null)
                        pco_limit_other = pco_limit_other.toLocaleString();
                    $('#ugl_prodLt_'+accordian_no+'_other').val(pco_limit_other);
                } else {
                    $('#ugl_prodLt_'+accordian_no).val(pco_limit); 
                }

                var piai_limit = ugl_data[i].piai_limit;
                if (piai_limit == "other") {
                    $('#ugl_personalInjLt_'+accordian_no).val('other');
                    var piai_limit_field = $('#ugl_personalInjLt_'+accordian_no);
                    xlOtherSelect(piai_limit_field);
                    var piai_limit_other = ugl_data[i].piai_limit_other;
                    if (piai_limit_other != null)
                        piai_limit_other = piai_limit_other.toLocaleString();
                    $('#ugl_personalInjLt_'+accordian_no+'_other').val(piai_limit_other);
                } else {
                    $('#ugl_personalInjLt_'+accordian_no).val(piai_limit); 
                }

                if(sic_option != ''){
                    $('#xl_SIC_'+accordian_no).html(sic_option);
                    if (sic_code != null) {
                        $('#xl_SIC_'+accordian_no).val(sic_code).prop('selected',true);
                    }
                }

                if (hazard_code != null) {
                    $("#xl_hazard_"+accordian_no).val(hazard_code).prop('selected',true);
                }
                if (ugl_data[i].rid != null) {
                    var cb_rid = ugl_data[i].rid;
                    var class_code = ugl_data[i].class_code;
                    var class_code_desc = ugl_data[i].class_code_desc;
                    var zipcode = ugl_data[i].zipcode;
                    var county = ugl_data[i].county;
                    var exposure = ugl_data[i].exposure;
                    if(exposure != null)
                        exposure = exposure.toLocaleString();

                    $('#ugl_cb_tr_'+accordian_no+'_'+i).attr('data-cb_rid', cb_rid);
                    $('#ugl_cc_'+accordian_no+'_'+i).val(class_code);
                    $('#ugl_cc_desc_'+accordian_no+'_'+i).html(class_code_desc);
                    if (zipcode != null)
                        $('#ugl_zc_'+accordian_no+'_'+i).val(zipcode+'-'+county);
                    $('#ugl_expo_'+accordian_no+'_'+i).val(exposure);
                }
            } else {
                var uglTabTr = $('#ugl_table_'+accordian_no+' tbody').find('tr:last-child');
                $.when(uglTable_addFun(uglTabTr, accordian_no, i)).then(function(response) {
                    var cb_rid = ugl_data[i].rid;
                    var class_code = ugl_data[i].class_code;
                    var class_code_desc = ugl_data[i].class_code_desc;
                    var zipcode = ugl_data[i].zipcode;
                    var county = ugl_data[i].county;
                    var exposure = ugl_data[i].exposure;
                    if (exposure != null)
                        exposure = exposure.toLocaleString();
                    
                    $('#ugl_cb_tr_'+accordian_no+'_'+i).attr('data-cb_rid', cb_rid);
                    $('#ugl_cc_'+accordian_no+'_'+i).val(class_code);
                    $('#ugl_cc_desc_'+accordian_no+'_'+i).html(class_code_desc);
                    if (zipcode != null)
                        $('#ugl_zc_'+accordian_no+'_'+i).val(zipcode+'-'+county);
                    $('#ugl_expo_'+accordian_no+'_'+i).val(exposure);
                });
            }
        }
    }
    catch(err) {
		console.log(err);
	}
}

function delete_ugl_cb(rid, ul_rid, first_classcode, accord_no) {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/delete_ugl_cb",
            type:'post',
            data : {rid : rid, ul_rid:ul_rid, first_classcode:first_classcode, deleted_by : deleted_by},
            success:function(response) {
                if (response.sic_option != '') {
                    $('#xl_SIC_'+accord_no).html(response.sic_option);
                }
                if (response.hazard_factor != '') {
                    $("#xl_hazard_"+accord_no).val(response.hazard_factor).prop('selected',true);
                }
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function delete_ugl(rid) {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/delete_ugl",
            type:'post',
            data : {acct_id : acc_id, com_id : com_id, rqbi_id : rqbi_id, rid : rid, deleted_by : deleted_by},
            success:function(response) {
                updateQuoteNameBasedTotalPremium();
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

function delete_all_ugl() {
    try {
        var deleted_by = localStorage.getItem('usernumericid');
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/delete_all_ugl",
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
