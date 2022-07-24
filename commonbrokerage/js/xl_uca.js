function xlAuto_append(th, res_uca) {
    try {
        var checked = $(th).prop('checked');
        if (checked) {
            if ($('#xlUca_div').html().trim() == '') {
                $.ajax({
                    url: '/brokerage/template/xl_Uca.php',
                    method: 'post',
                    success: function(res) {
                        $('#xlUca_div').html(res);
                        xlAutoPrem_append();
                        if (res_uca == '') {
                            effective_date = $('#rqbieffdate').val();
                            expiration_date = $('#rqbiexpdate').val();
                            $('.uca_effectDt').datepicker('update', effective_date);
                            $('.uca_expDt').datepicker('update', expiration_date);
                            xl_add_uca({effective_date:effective_date, expiration_date:expiration_date}, 0);   
                        }
                    },
                    complete:function(){
                        if (res_uca.length > 0) {
                            uca_td = res_uca.split(',');
                            for (uca_i = 0; uca_i < uca_td.length; uca_i++) {
                                var uca_tab_id = uca_td[uca_i];
                                if (uca_i != 0) {
                                    j= uca_i;
                                    uca_id = j-1;
                                    uca_accrd = $('#ucaAccor_'+uca_id).last();
                                    uca_AddAnotherFun(j, uca_accrd);
                                    ucaAdd = uca_i;
                                }
                                
                                $('#uca_head_'+uca_i).attr('aria-expanded',false);
                                $('#uca_head_'+uca_i).addClass('collapsed');
                                $('#uca_collapse_'+uca_i).removeClass('show');
                                $('.ucaAccor').eq(uca_i).attr('data-uca_randamid', uca_tab_id);
                                $('.xl_addUca').addClass('d-none');
                            }
                        } 
                    }
                });
            }
        } else {
            cov_uncheck(th, 'Uca', 'Auto');
        } 
    }
    catch(err) {
        console.log(err);
        
    }    
}

           //  uca add another
var ucaAdd = 0;
function xl_addUca() {
    var ucaAcc = $('.ucaAccor').last();
    var comAuto_prem = ucaAcc.find('.comAutoPremium').val();
    var combin_lt_select = ucaAcc.find('.uca_combLt').val();
    if (combin_lt_select == 'other') {
        var combin_lt = ucaAcc.find('.uca_combLt_other').val();
    } else {
        var combin_lt = ucaAcc.find('.uca_combLt').val();
    }
    var fleetBreak_Totalprem = ucaAcc.find('.fleetBreak_Totalprem').val().replace(/[$,]/g, '');


    if(comAuto_prem && combin_lt && fleetBreak_Totalprem > 0) {
        ucaAdd++;
        uca_AddAnotherFun(ucaAdd, ucaAcc);

        $("#ucaAccor_"+ucaAdd).attr('data-retrieve',1);
        effective_date = $('#rqbieffdate').val();
        expiration_date = $('#rqbiexpdate').val();
        $('.uca_effectDt').datepicker('update', effective_date);
        $('.uca_expDt').datepicker('update', expiration_date);
        xl_add_uca({effective_date:effective_date, expiration_date:expiration_date}, ucaAdd);
        xl_scrollAccor(ucaAcc, 'uca','down');
        xl_alert('success');
    } else {
        uca_emptyValid (ucaAcc, comAuto_prem, combin_lt, fleetBreak_Totalprem);
        xl_alert('empty');
    }    
}

function uca_emptyValid(ucaAcc, comAuto_prem, combin_lt, fleetBreak_Totalprem) {
    if (!comAuto_prem) {
        xl_emptyValid (ucaAcc, "comAutoPremium");
    }
    if (!combin_lt) {
        xl_emptyValid (ucaAcc, "uca_combLt_other");
    }
    if (!fleetBreak_Totalprem || fleetBreak_Totalprem == 0 ) {
        ucaAcc.find('.fleetBreakDiv').addClass('borderRed');
    }
}

function uca_AddAnotherFun(ucaAdd, ucaAcc) {
    var ucaCopy = '<div class="accordion ucaAccor mt-4" id="ucaAccor_'+ucaAdd+'" data-uca_randamid="" data-accr_no="'+ucaAdd+'"><div class="card"><div class="card-header uca_head" id="uca_head_'+ucaAdd+'" data-toggle="collapse" data-target="#uca_collapse_'+ucaAdd+'" aria-expanded="true" aria-controls="uca_collapse_'+ucaAdd+'"> Auto</div><div id="uca_collapse_'+ucaAdd+'" class="collapse show" aria-lebelledy="uca_head_'+ucaAdd+'" data-parent="#ucaAccor_'+ucaAdd+'"><div class="card-body"><div class="row my-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" class="form-control form-control-sm uca_policyNo" id="uca_policyNo_'+ucaAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" class="form-control form-control-sm uca_company" id="uca_company_'+ucaAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date uca_effectDt uca_effectDt_'+ucaAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uca_effectDt_'+ucaAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date uca_expDt uca_expDt_'+ucaAdd+' mr-2"><div><input type="text" class="form-control form-control-sm" id="uca_expDt_'+ucaAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Combined Single Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uca_combLt" id="uca_combLt_'+ucaAdd+'" onchange="xlOtherSelect($(this));"><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Other Carrier - UL Commercial Auto Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm comAutoPremium xl_number" id="comAutoPremium_'+ucaAdd+'" maxlength="19" placeholder="UL Commercial Auto Premium"></div></div></div></div><div class="fleetBreakDiv my-2"><fieldset class="bg_lightGreen card mx-5"><legend class="ml-4 text-blue"><h6> Fleet Breakdown</h6></legend><div class="card-body"><table class="table table-sm table-bordered xlTable fleetBreak_table" id="fleetBreak_table_'+ucaAdd+'"><thead class="bg-lav"><tr><th> Unit</th><th> Range</th><th> Actual</th><th> Count</th><th> Premium</th></tr></thead><tbody><tr class="xl_private_pass xl_private_pass_'+ucaAdd+'" data-private_pass=""><td> <label class="private_pass"> Private Passenger </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$50 - $75"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm privatePass_act xl_number" id="privatePass_act_'+ucaAdd+'" value="75" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm privatePass_count xl_number" id="privatePass_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm privatePass_prem xl_number" id="privatePass_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_light_truck xl_light_truck_'+ucaAdd+'" data-light_truck=""><td> <label class="light_truck"> Light Truck </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$75 - $150"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ltTruct_act xl_number" id="ltTruct_act_'+ucaAdd+'" value="150" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm ltTruct_count xl_number" id="ltTruct_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ltTruct_prem xl_number" id="ltTruct_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_medium_truck xl_medium_truck_'+ucaAdd+'" data-medium_truck=""><td> <label class="medium_truck"> Medium Truck </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$125 - $250"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm mdTruct_act xl_number" id="mdTruct_act_'+ucaAdd+'" value="250" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm mdTruct_count xl_number" id="mdTruct_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm mdTruct_prem xl_number" id="mdTruct_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_heavy_truck xl_heavy_truck_'+ucaAdd+'" data-heavy_truck=""><td> <label class="heavy_truck"> Heavy Truck </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$225 - $500"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm hvyTruct_act xl_number" id="hvyTruct_act_'+ucaAdd+'" value="500" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm hvyTruct_count xl_number" id="hvyTruct_count_'+ucaAdd+'" placeholder="# of Vehicles"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm hvyTruct_prem xl_number" id="hvyTruct_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_exheavy_truck xl_exheavy_truck_'+ucaAdd+'" data-exheavy_truck=""><td> <label class="exheavy_truck"> Extra Heavy Truck </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$275 - $600"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ExhvyTruct_act xl_number" id="ExhvyTruct_act_'+ucaAdd+'" value="600" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm ExhvyTruct_count xl_number" id="ExhvyTruct_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ExhvyTruct_prem xl_number" id="ExhvyTruct_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_tractor xl_tractor_'+ucaAdd+'" data-tractor=""><td> <label class="tractor"> Tractor </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$500 - $1,000"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm trackor_act xl_number" id="trackor_act_'+ucaAdd+'" value="1000" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm trackor_count xl_number" id="trackor_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm trackor_prem xl_number" id="trackor_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_bus xl_bus_'+ucaAdd+'" data-bus=""><td> <label class="bus"> Bus </label></td><td> <input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="$350 - $1,000"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm bus_act xl_number" id="bus_act_'+ucaAdd+'" value="1000" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm bus_count xl_number" id="bus_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm bus_prem xl_number" id="bus_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr><tr class="xl_ownVechi xl_ownVechi_'+ucaAdd+'" data-ownVechi=""><td> <input type="text" name="" class="form-control form-control-sm text-center ownVechi_desc" id="ownVechi_desc_'+ucaAdd+'" placeholder="Description of Vehicle"></td><td><input type="text" name="" class="form-control form-control-sm text-center fleet_range" disabled="true" value="N/A"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ownVechi_act xl_number" id="ownVechi_act_'+ucaAdd+'" value="" placeholder="Actual value" maxlength="19"></div></td><td> <input type="text" name="" class="form-control form-control-sm ownVechi_count xl_number" id="ownVechi_count_'+ucaAdd+'" placeholder="# of Vehicles" maxlength="19"></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" name="" class="form-control form-control-sm ownVechi_prem xl_number" id="ownVechi_prem_'+ucaAdd+'" placeholder="Premium" maxlength="19"></div></td></tr></tbody><tfoot class="bg-light"><tr><td colspan="4" class="txt_right"> $1M x Primary Auto PREMIUM</td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" class="form-control form-control-sm fleetBreak_Totalprem xl_number" id="fleetBreak_Totalprem_'+ucaAdd+'" maxlength="19" disabled></div></td></tr></tfoot></table></div></fieldset></div><div class="uca_deleteDiv text-right mt-4 mb-2"> <button type="button" class="btn btn-sm btn-danger ucaRemoveBtn" id="ucaRemoveBtn_'+ucaAdd+'" onclick="ucaRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
    
    ucaAcc.after(ucaCopy);

    $(".uca_effectDt_"+ucaAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function(selected) {
        var minDate = new Date(selected.date);
        var nxtYear = dateNextYear(selected.date);
        expDateSet($(this), 'uca', nxtYear, minDate);

        var effective_date = $('#uca_effectDt_'+ucaAdd).val();
        expiry_date = $('#uca_expDt_'+ucaAdd).val();

        var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
        xl_add_uca({effective_date: effective_date, expiration_date: expiry_date}, accordion_no);
    });
    $(".uca_expDt_"+ucaAdd).datepicker({
        format: 'mm-dd-yyyy',
        autoclose: true
    }).on('changeDate', function (e) {
        var uca_expirydate = $('#uca_expDt_'+ucaAdd).val();
        var expir_split = uca_expirydate.split('-');
        var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];

        var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
        xl_add_uca({expiration_date: expiry_date}, accordion_no);
    });

}

function ucaRemoveBtn(thisValue) {
    var thisLength = $('.ucaRemoveBtn').length;
    if (thisLength == 1) {
        xl_alert('minimum_one');
    } else {
        var thisId = thisValue.closest('.ucaAccor').attr('id');
        thisValue.closest('.uca_deleteDiv').append('<div class="alert alert-warning col-4 uca_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="uca_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
    }
}

function uca_deleteYes(thisId) {
    if($('.ucaAccor:first-child').attr('id') != thisId) {
        xl_scrollAccor(thisId, 'uca','up');
    } else {
        xl_scrollAccor(thisId, 'uca','stay');
    }
    
    var uca_random_digit = $('#'+thisId).attr('data-uca_randamid');
    xl_delete_uca({rid: uca_random_digit, is_checked: 0});
    $('#'+thisId).remove();
    xl_alert('delete');
}

$(document).on('blur', '.uca_policyNo', function() {
	var uca_policyNo = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
    xl_add_uca ({policy_number:uca_policyNo}, accordion_no);
});

$(document).on('blur', '.uca_company', function() {
	var uca_company = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
    xl_add_uca({company:uca_company}, accordion_no);
});

$(document).on('change', '.uca_combLt', function() {
	var uca_combLt = $(this).val().replace(/[$,]/g, '');	
    var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
    if (uca_combLt != 'other'){
        uca_combLt_other = '';
        xl_add_uca({combined_single_limit:uca_combLt, combined_single_limit_other:uca_combLt_other}, accordion_no);
    } else {
        xl_add_uca({combined_single_limit:uca_combLt}, accordion_no);
    }
});

$(document).on('blur', '.uca_combLt_other', function() {
	var uca_combLt_other = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
    if (uca_combLt_other) {
        xl_emptyReset($(this));
    }
    xl_add_uca({combined_single_limit_other:uca_combLt_other}, accordion_no);
});

$(document).on('blur', '.comAutoPremium', function() {
	var comAutoPremium = $(this).val().replace(/[$,]/g, '');
    var accordion_no = $(this).closest('.ucaAccor').attr('data-accr_no');
    if (comAutoPremium) {
        xl_emptyReset($(this));
    }
    xl_add_uca({other_ulca_premium:comAutoPremium}, accordion_no);
});

function xl_add_uca (value,accordion_no) {
    try {
    	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    	value.acct_id = acc_id;
    	value.com_id = com_id;
    	value.rqbi_id = rqbi_id;

        var uca_id = $('#ucaAccor_'+accordion_no).attr("data-uca_randamid");
        if (uca_id != '' && uca_id != null) {
            value.rid = uca_id;
            value.updated_by =  localStorage.getItem('usernumericid');
        } else {
            value.created_by =  localStorage.getItem('usernumericid');
        }
     	$.ajax({
    		url: laravel_url+"/add_uca",
    		type:'post',
    		data:value,
    		success: function (response) {
    		  $( "#ucaAccor_"+accordion_no ).attr("data-uca_randamid", response.uca_id);
    		}
    	}); 
    }
    catch(err) {
        console.log(err);
        
    }
}

function calculate_vehile_premium(type, count_name, act_prem_name, prem_name, uca_accordion, actual_premiumval) {
    var no_of_vehicle = $('#'+count_name+'_'+uca_accordion).val().replace(/[$,]/g, '');
    var act_prem = $('#'+act_prem_name+'_'+uca_accordion).val().replace(/[$,]/g, '');
    var tot_prem = $('#'+prem_name+'_'+uca_accordion).val().replace(/[$,]/g, '');
    if (type == 'count' ) {
        if (no_of_vehicle != 0) {
            if (no_of_vehicle != '' && act_prem != '') {
                var total_premium_num = no_of_vehicle*act_prem;
                total_premium = parseInt(total_premium_num).toLocaleString();
                $('#'+prem_name+'_'+uca_accordion).val(total_premium);
                actual_premium = act_prem;
            } else if (no_of_vehicle != '' && tot_prem != '') {
                var actual_premium = tot_prem/no_of_vehicle;
                total_premium = parseInt(actual_premium).toLocaleString();
                $('#'+act_prem_name+'_'+uca_accordion).val(total_premium); 
            } else if (no_of_vehicle == '') {
                total_premium_num = ''; 
                actual_premium = actual_premiumval; 
                $('#'+prem_name+'_'+uca_accordion).val(total_premium_num);
                $('#'+act_prem_name+'_'+uca_accordion).val(actual_premium);

            } 
            return [no_of_vehicle, actual_premium, total_premium_num];
        } else {
            $('#'+count_name+'_'+uca_accordion).val('');
        }
        
    }
    else if (type == 'act_prem') {
        if (act_prem != 0) {
            if (no_of_vehicle != '' && act_prem != '') {
                var total_premium_num = no_of_vehicle*act_prem;
                total_premium = parseInt(total_premium_num).toLocaleString();
                $('#'+prem_name+'_'+uca_accordion).val(total_premium);
            } else if(tot_prem != '' && act_prem != '') {
                var no_of_vehicle = tot_prem/act_prem;
                total_premium = parseInt(no_of_vehicle).toLocaleString();
                $('#'+count_name+'_'+uca_accordion).val(total_premium);
            } else {
                total_premium_num = '';
                no_of_vehicle = '';
                $('#'+prem_name+'_'+uca_accordion).val('');
                $('#'+count_name+'_'+uca_accordion).val('');
            } 

            return [no_of_vehicle, act_prem, total_premium_num];
        } else {
            $('#'+act_prem_name+'_'+uca_accordion).val('');
        }
    } else {
        if (tot_prem != 0) {
            if(no_of_vehicle != '' && tot_prem != ''){
                var actual_premium = Math.round(tot_prem/no_of_vehicle);
                total_premium = parseInt(actual_premium).toLocaleString();
                $('#'+act_prem_name+'_'+uca_accordion).val(total_premium);
            }else if(act_prem != '' && tot_prem != '') {
                var no_of_vehicle = Math.round(tot_prem/act_prem);
                total_premium = parseInt(no_of_vehicle).toLocaleString();
                $('#'+count_name+'_'+uca_accordion).val(total_premium);
            } else if (tot_prem == '') {
                actual_premium = actual_premiumval;
                no_of_vehicle = '';
                $('#'+act_prem_name+'_'+uca_accordion).val(actual_premium);
                $('#'+count_name+'_'+uca_accordion).val('');
            } 
            return [no_of_vehicle, actual_premium, tot_prem];
        } else {
        $('#'+prem_name+'_'+uca_accordion).val('');
        }
    }
}

$(document).on('change', '.privatePass_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_private_pass').attr('data-private_pass');
    
    count_name = 'privatePass_count';
    act_prem_name = 'privatePass_act';
    prem_name = 'privatePass_prem';
    vehicle_name = 'private_pass';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 75);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.privatePass_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_private_pass').attr('data-private_pass');
    
    count_name = 'privatePass_count';
    act_prem_name = 'privatePass_act';
    prem_name = 'privatePass_prem';
    vehicle_name = 'private_pass';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name,uca_accordion,'');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.privatePass_prem', function() {

    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_private_pass').attr('data-private_pass');
   
    count_name = 'privatePass_count';
    act_prem_name = 'privatePass_act';
    prem_name = 'privatePass_prem';
    vehicle_name = 'private_pass';
    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 75);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ltTruct_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_light_truck').attr('data-light_truck');

    count_name = 'ltTruct_count';
    act_prem_name = 'ltTruct_act';
    prem_name = 'ltTruct_prem';
    vehicle_name = 'light_truck';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 150);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ltTruct_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_light_truck').attr('data-light_truck');

    count_name = 'ltTruct_count';
    act_prem_name = 'ltTruct_act';
    prem_name = 'ltTruct_prem';
    vehicle_name = 'light_truck';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ltTruct_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_light_truck').attr('data-light_truck');

    count_name = 'ltTruct_count';
    act_prem_name = 'ltTruct_act';
    prem_name = 'ltTruct_prem';
    vehicle_name = 'light_truck';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 150);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.mdTruct_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_medium_truck').attr('data-medium_truck');
    
    count_name = 'mdTruct_count';
    act_prem_name = 'mdTruct_act';
    prem_name = 'mdTruct_prem';
    vehicle_name = 'medium_truck';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 250);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.mdTruct_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_medium_truck').attr('data-medium_truck');
    
    count_name = 'mdTruct_count';
    act_prem_name = 'mdTruct_act';
    prem_name = 'mdTruct_prem';
    vehicle_name = 'medium_truck';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);

    
});

$(document).on('change', '.mdTruct_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_medium_truck').attr('data-medium_truck');
    
    count_name = 'mdTruct_count';
    act_prem_name = 'mdTruct_act';
    prem_name = 'mdTruct_prem';
    vehicle_name = 'medium_truck';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 250);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.hvyTruct_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_heavy_truck').attr('data-heavy_truck');
    
    count_name = 'hvyTruct_count';
    act_prem_name = 'hvyTruct_act';
    prem_name = 'hvyTruct_prem';
    vehicle_name = 'heavy_truck';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 500);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.hvyTruct_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_heavy_truck').attr('data-heavy_truck');
    
    count_name = 'hvyTruct_count';
    act_prem_name = 'hvyTruct_act';
    prem_name = 'hvyTruct_prem';
    vehicle_name = 'heavy_truck';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.hvyTruct_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_heavy_truck').attr('data-heavy_truck');
    
    count_name = 'hvyTruct_count';
    act_prem_name = 'hvyTruct_act';
    prem_name = 'hvyTruct_prem';
    vehicle_name = 'heavy_truck';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 500);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ExhvyTruct_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_exheavy_truck').attr('data-exheavy_truck');
    
    count_name = 'ExhvyTruct_count';
    act_prem_name = 'ExhvyTruct_act';
    prem_name = 'ExhvyTruct_prem';
    vehicle_name = 'exheavy_truck';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 600);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ExhvyTruct_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_exheavy_truck').attr('data-exheavy_truck');
    
    count_name = 'ExhvyTruct_count';
    act_prem_name = 'ExhvyTruct_act';
    prem_name = 'ExhvyTruct_prem';
    vehicle_name = 'exheavy_truck';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ExhvyTruct_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_exheavy_truck').attr('data-exheavy_truck');
    
    count_name = 'ExhvyTruct_count';
    act_prem_name = 'ExhvyTruct_act';
    prem_name = 'ExhvyTruct_prem';
    vehicle_name = 'exheavy_truck';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 600);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});
$(document).on('change', '.trackor_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_tractor').attr('data-tractor');
    
    count_name = 'trackor_count';
    act_prem_name = 'trackor_act';
    prem_name = 'trackor_prem';
    vehicle_name = 'tractor';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 1000);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.trackor_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_tractor').attr('data-tractor');
    
    count_name = 'trackor_count';
    act_prem_name = 'trackor_act';
    prem_name = 'trackor_prem';
    vehicle_name = 'tractor';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.trackor_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_tractor').attr('data-tractor');
    
    count_name = 'trackor_count';
    act_prem_name = 'trackor_act';
    prem_name = 'trackor_prem';
    vehicle_name = 'tractor';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 1000);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.bus_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_bus').attr('data-bus');
    
    count_name = 'bus_count';
    act_prem_name = 'bus_act';
    prem_name = 'bus_prem';
    vehicle_name = 'bus';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 1000);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.bus_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_bus').attr('data-bus');
    
    count_name = 'bus_count';
    act_prem_name = 'bus_act';
    prem_name = 'bus_prem';
    vehicle_name = 'bus';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.bus_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_bus').attr('data-bus');
    
    count_name = 'bus_count';
    act_prem_name = 'bus_act';
    prem_name = 'bus_prem';
    vehicle_name = 'bus';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, default_prem = 1000);
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id}, uca_accordion, vehicle_name);
});

$(document).on('change', '.ownVechi_desc', function() {
    var vehicle_name = $(this).val().replace(/[$,]/g, '');
    var uca_random_digit = $(this).closest('.ucaAccor').attr('data-uca_randamid');
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_ownVechi').attr('data-ownVechi');
    xl_add_ucavehicle({vehicle_name:vehicle_name, rid: insert_id, is_user_desc:1}, uca_accordion);
});

$(document).on('change', '.ownVechi_act', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_ownVechi').attr('data-ownVechi');

    count_name = 'ownVechi_count';
    act_prem_name = 'ownVechi_act';
    prem_name = 'ownVechi_prem';

    prem_array = calculate_vehile_premium(type="act_prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];
    
    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id, is_user_desc:1}, uca_accordion);
});

$(document).on('change', '.ownVechi_count', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_ownVechi').attr('data-ownVechi');

    count_name = 'ownVechi_count';
    act_prem_name = 'ownVechi_act';
    prem_name = 'ownVechi_prem';

    prem_array = calculate_vehile_premium(type="count", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id, is_user_desc:1}, uca_accordion);
});

$(document).on('change', '.ownVechi_prem', function() {
    var uca_accordion = $(this).closest('.ucaAccor').attr('data-accr_no');
    insert_id = $(this).closest('.xl_ownVechi').attr('data-ownVechi');

    count_name = 'ownVechi_count';
    act_prem_name = 'ownVechi_act';
    prem_name = 'ownVechi_prem';

    prem_array = calculate_vehile_premium(type="prem", count_name, act_prem_name, prem_name, uca_accordion, '');
    no_of_vehicle = prem_array[0];
    actual_premium = prem_array[1];
    total_premium_num = prem_array[2];

    xl_add_ucavehicle({number_of_vehicles:no_of_vehicle, actual_premium: actual_premium, total_premium: total_premium_num, rid: insert_id, is_user_desc:1}, uca_accordion);
});


function xl_add_ucavehicle (value,row_id, vehicle_name) {
    try {
        var uca_rid = $('#ucaAccor_'+row_id).attr("data-uca_randamid");
        if (uca_rid != '' && uca_rid != null) {
            value.uca_rid = uca_rid;
        } 
        if (value.is_user_desc != 1) {
            value.vehicle_name = $("[data-uca_randamid="+uca_rid+"]").find('.'+vehicle_name).text();
        }
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        value.acct_id = acc_id;
        value.com_id = com_id;
        value.rqbi_id = rqbi_id;
        value.user_id =localStorage.getItem('usernumericid');
     	$.ajax({
    		url: laravel_url+"/add_ucavehicle",
    		type:'post',
    		data:value,
    		success: function (response) {
                rid = response.id;
                if (response.tot_premium != '' || response.tot_premium == 0) {
                    tot_premium = parseInt(response.tot_premium).toLocaleString();
                    $('#fleetBreak_Totalprem_'+row_id).val(tot_premium);
                }
                if (response.tot_premium > 0) {
                    $('#fleetBreak_Totalprem_'+row_id).closest('.fleetBreakDiv').removeClass('borderRed');
                }
                
                if (value.is_user_desc == 1) {
                    $( ".xl_ownVechi_"+row_id ).attr("data-ownVechi",rid);
                } else {
                    if (value.vehicle_name.trim() == "Private Passenger") {
                        $( ".xl_private_pass_"+row_id ).attr("data-private_pass",rid);
                    } else if (value.vehicle_name.trim() == "Light Truck") {
                        $( ".xl_light_truck_"+row_id ).attr("data-light_truck",rid);
                    } else if (value.vehicle_name.trim() == "Medium Truck") {
                        $( ".xl_medium_truck_"+row_id ).attr("data-medium_truck",rid);
                    } else if (value.vehicle_name.trim() == "Heavy Truck") {
                        $( ".xl_heavy_truck_"+row_id ).attr("data-heavy_truck",rid);
                    } else if (value.vehicle_name.trim() == "Extra Heavy Truck") {
                        $( ".xl_exheavy_truck_"+row_id ).attr("data-exheavy_truck",rid);
                    } else if (value.vehicle_name.trim() == "Tractor") {
                        $( ".xl_tractor_"+row_id ).attr("data-tractor",rid);
                    } else if(value.vehicle_name.trim() == "Bus") {
                        $( ".xl_bus_"+row_id ).attr("data-bus",rid);
                    }
                }
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

function xl_delete_uca (value) {
    try {
        var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        value.acct_id = acc_id;
        value.com_id = com_id;
        value.rqbi_id = rqbi_id;

        value.user_id =localStorage.getItem('usernumericid');
        $.ajax({
            url: laravel_url+"/xl_uca_delete",
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