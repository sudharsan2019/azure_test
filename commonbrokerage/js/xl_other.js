function xlOth_append(th, ret_uoth) {
	var checked = $(th).prop('checked');
	if (checked) {
		if ($('#xlother_div').html().trim() == '') {
			try {
				$.ajax({
					url: '/brokerage/template/xl_other.php',
					method: 'post',
					success: function(res) {
						$('#xlother_div').html(res);
						if (ret_uoth == '') {
							
							effective_date = $('#rqbieffdate').val();
							expiration_date = $('#rqbiexpdate').val();
							xl_add_uoth({effective_date:effective_date, expiration_date:expiration_date}, 0);   
							
						}
					},  
					complete:function(){     
						console.log(ret_uoth);
						if (ret_uoth.length > 0) {   
							var uoth_td = ret_uoth.split(',');   
							for (uoth_i = 0; uoth_i < uoth_td.length; uoth_i++) {
								var uoth_tab_id = uoth_td[uoth_i];
								if (uoth_i != 0) { 
									j= uoth_i;
									uoth_id = j-1;
									uoth_accrd = $('#uothRemoveBtn_'+uoth_id).closest('.uothAccor'); 
									uoth_AddAnotherFun(j, uoth_accrd);
									uothAdd = uoth_i;
									
								}
								
								$('#uoth_head_'+uoth_i).attr('aria-expanded',false);
								$('#uoth_head_'+uoth_i).addClass('collapsed');
								$('#uoth_collapse_'+uoth_i).removeClass('show');
								$('.uothAccor').eq(uoth_i).attr('data-rid', uoth_tab_id);
								$('.xl_addUoth').addClass('d-none');
							}
						} 
					}
				});
			} catch(err) {
				console.log(err);
				
			}
		}
	} else {
		cov_uncheck(th, 'other', 'Other');
	}
}


//  uoth add another
var uothAdd = 0;
function xl_addUoth(thisValue) {
	var uothAcc = $('.uothAccor').last();
	var ul_prem = uothAcc.find('.uoth_ulPremium').val();
	var insLt_select = uothAcc.find('.uoth_insLt').val();
	var aggreLt_select = uothAcc.find('.uoth_aggreLt').val();

	if (insLt_select == 'other') {
		var insLt = uothAcc.find('.uoth_insLt_other').val();
	} else {
		var insLt = uothAcc.find('.uoth_insLt').val();
	}
	if (aggreLt_select == 'other') {
		var aggreLt = uothAcc.find('.uoth_aggreLt_other').val();
	} else {
		var aggreLt = uothAcc.find('.uoth_aggreLt').val();
	}

	if (ul_prem && insLt != 0 && aggreLt !=0) {
		uothAdd++;
		uoth_AddAnotherFun(uothAdd, uothAcc);
		
		$("#uothAccor_"+uothAdd).attr('data-retreiveoth',1);
		xl_add_uoth({}, uothAdd);
		
		xl_scrollAccor(uothAcc, 'uoth','down');
		xl_alert('success');
	} else {
		uoth_emptyValid (uothAcc, ul_prem, insLt_select, insLt, aggreLt_select,  aggreLt);
		xl_alert('empty');
	}
}

function uoth_emptyValid(uothAcc, ul_prem, insLt_select, insLt, aggreLt_select,  aggreLt) {
	if (!ul_prem) {
		xl_emptyValid (uothAcc, "uoth_ulPremium");
	}
	if (insLt_select == 0) {
		xl_emptyValid (uothAcc, "uoth_insLt");
	}
	if (!insLt) {
		xl_emptyValid (uothAcc, "uoth_insLt_other");
	}
	if (aggreLt_select == 0) {
		xl_emptyValid (uothAcc, "uoth_aggreLt");
	}
	if (!aggreLt) {
		xl_emptyValid (uothAcc, "uoth_aggreLt_other");
	}
}
function uoth_AddAnotherFun(uothAdd, uothAcc) {
	var uothCopy = '<div class="accordion uothAccor mt-4 uothaccordion" id="uothAccor_'+uothAdd+'" data-rid="" data-accord_no="'+uothAdd+'"><div class="card"><div class="card-header uoth_head" id="uoth_head_'+uothAdd+'" data-toggle="collapse" data-target="#uoth_collapse_'+uothAdd+'" aria-expanded="true" aria-controls="uoth_collapse_'+uothAdd+'"> Other</div><div id="uoth_collapse_'+uothAdd+'" class="collapse show" aria-lebelledy="uoth_head_'+uothAdd+'" data-parent="#uothAccor_'+uothAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm uoth_policyNo" id="uoth_policyNo_'+uothAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm uoth_company" id="uoth_company_'+uothAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date uoth_effectDt mr-2"><div><input type="text" class="form-control form-control-sm" id="uoth_effectDt_'+uothAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date uoth_expDt mr-2"><div><input type="text" class="form-control form-control-sm" id="uoth_expDt_'+uothAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row mt-2"><div class="form-group col-md-3"> <label> Other UL Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm uoth_ulPremium xl_number" id="uoth_ulPremium_'+uothAdd+'" maxlength="19" placeholder="Other UL Premium"></div></div></div><div class="form-group col-md-3 align-self-center"><div class="custom-control custom-checkbox mt-3 mr-2"> <input type="checkbox" class="custom-control-input uoth_occu" id="uoth_occu_'+uothAdd+'"> <label class="custom-control-label" for="uoth_occu_'+uothAdd+'"> Occurrence Coverage Basis </label></div></div><div class="form-group col-md-3"> <label> Liability Type </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm uoth_liabType" id="uoth_liabType_'+uothAdd+'" maxlength="30" placeholder="Liability Type"></div></div></div><div class="form-group col-md-3"> <label> Limit Of Insurance <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uoth_insLt" id="uoth_insLt_'+uothAdd+'" onchange="xlOtherSelect($(this));"><option value="0"> Please select</option><option value="500000"> 500,000</option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-md-3"> <label> Aggregate Limit <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uoth_aggreLt" id="uoth_aggreLt_'+uothAdd+'" onchange="xlOtherSelect($(this));"><option value="0"> Please select</option><option value="500000"> 500,000</option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div></div><table class="table table-sm table-borderless uoth_limitsTable mt-4" id="uoth_limitsTable_'+uothAdd+'"><tbody id="limit_table" class ="limit_table_'+uothAdd+'"><tr class="limit_row" data-rowrid="" id="limit_row_'+uothAdd+'_0" data-row_no="0"><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" class="form-control form-control-sm uoth_limits xl_number" id="uoth_limits_'+uothAdd+'_0" maxlength="19" placeholder="Limit"></div></td><td> <input type="text" class="form-control form-control-sm uoth_limitsDesc" id="uoth_limitsDesc_'+uothAdd+'_0" placeholder="Limit Description"></td><td> <button type="button" class="btn btn-xs btn-success uoth_limitsAdd" onclick="uoth_limitsAdd($(this));"> <i class="fa fa-plus"></i> </button></td></tr></tbody></table> <div class="uoth_deleteDiv text-right mt-4 mb-2"> <button type="button" class="btn btn-sm btn-danger uothRemoveBtn" id="uothRemoveBtn_'+uothAdd+'" onclick="uothRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
	uothAcc.after(uothCopy);
	
	$('.uoth_effectDt').datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true,
		todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'uoth', nxtYear, minDate);
		var accordion_no = $(this).closest('.uothAccor').data('accord_no');
		var uex_effectdate = $('#uoth_effectDt_'+uexAdd).val();
		expiry = $('#uoth_expDt_'+uexAdd).val();
		
		effectdate = uex_effectdate.split('-')
		var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];
		
		var expir_split = expiry.split('-');
		var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
		xl_add_uoth({effective_date: effective_date, expiration_date: expiry_date},accordion_no);
	});
	
	$('.uoth_expDt').datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true
	}).on('changeDate', function (e) {
		var uex_expirydate = $('#uoth_expDt_'+uexAdd).val();
		var expir_split = uex_expirydate.split('-');
		var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
		var accordion_no = $(this).closest('.uothAccor').data('accord_no');
		xl_add_uoth({expiration_date: expiry_date},accordion_no);
	});
}

function uothRemoveBtn(thisValue) {
	var thisLength = $('.uothRemoveBtn').length;
	if (thisLength == 1) {
		xl_alert('minimum_one');
	} else {
		var thisId = thisValue.closest('.uothAccor').attr('id');
		thisValue.closest('.uoth_deleteDiv').append('<div class="alert alert-warning col-4 uoth_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="uoth_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
	}
}

function uoth_deleteYes(thisId) {
	if($('.uothAccor:first-child').attr('id') != thisId) {
		xl_scrollAccor(thisId, 'uoth','up'); 
	} else {
		xl_scrollAccor(thisId, 'uoth','stay');
	}
	
	var accordion_no = $('#'+thisId).data('accord_no');
	xl_delete_uoth({is_checked: 0, accordion: accordion_no});
	$('#'+thisId).remove();
	xl_alert('delete');
}

function uoth_limitsAdd(thisValue) {
	var tr_lst_lim, tr_lst_desc;
	var oth_limit = thisValue.closest('tr').find('.uoth_limits').attr('id');
	var oth_acc_no = oth_limit.split('_')[2];
	var oth_acc_inc = oth_limit.split('_')[3];
	
	tr_lst_lim = thisValue.closest('tbody').find('.uoth_limits').val();
	tr_lst_desc = thisValue.closest('tbody').find('.uoth_limitsDesc').val();
	if (tr_lst_lim && tr_lst_desc) {
		oth_acc_inc ++;
		thisValue.closest('tbody').find('.uoth_limitsAdd').removeClass('btn-success uoth_limitsAdd').addClass('btn-danger uoth_limitsMinus');
		$('.uoth_limitsMinus').attr('onclick', 'uoth_limitsMinus($(this))');
		thisValue.closest('tbody').find('.uoth_limitsMinus i').removeClass('fa-plus').addClass('fa-minus');
		var othTabTr = thisValue.closest('tbody').find('tr:last-child');
		othTable_addFun(othTabTr, oth_acc_no, oth_acc_inc);
		var accord_rid = $(thisValue).closest('.uothAccor').data('rid'); 
		xl_add_limit ({}, oth_acc_inc, accord_rid, oth_acc_no);
		
	} else {
		if (!tr_lst_lim) {
			thisValue.closest('tr').find('.uoth_limits').addClass('border-red');
		}
		if (!tr_lst_desc) {
			thisValue.closest('tr').find('.uoth_limitsDesc').addClass('border-red');
		}
		xl_alert('empty');
	}
}

function othTable_addFun(othTabTr, oth_acc_no, oth_acc_inc) {
	var othTab = '<tr class="limit_row" data-rowrid="" id="limit_row_'+oth_acc_no+'_'+oth_acc_inc+'" data-row_no="'+oth_acc_inc+'"><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <input type="text" class="form-control form-control-sm uoth_limits xl_number" id="uoth_limits_'+oth_acc_no+'_'+oth_acc_inc+'" maxlength="19" placeholder="Limit"></div></td><td> <input type="text" class="form-control form-control-sm uoth_limitsDesc" id="uoth_limitsDesc_'+oth_acc_no+'_'+oth_acc_inc+'" placeholder="Limit Description"></td><td> <button type="button" class="btn btn-xs btn-success uoth_limitsAdd" onclick="uoth_limitsAdd($(this));"> <i class="fa fa-plus"></i> </button></td></tr>';
	othTabTr.after(othTab);
}

function uoth_limitsMinus(thisValue) {
	var row_no = thisValue.closest('.limit_row').data('row_no');
	var oth_limit_minus = thisValue.closest('tr').find('.uoth_limits').attr('id');
	var accordion_no = oth_limit_minus.split('_')[2];
	var row_no = oth_limit_minus.split('_')[3];
	var others_rid = thisValue.closest('.uothAccor').data('rid'); 
	xl_delete_limit({is_checked: 0, others_rid : others_rid, row: row_no, accordion: accordion_no});
	
	thisValue.closest('tr').remove();
	xl_alert('delete');
}



$(document).on('blur', '.uoth_policyNo', function() {
	var uoth_policyNo = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no');    
	xl_add_uoth ({policy_number:uoth_policyNo}, accordion_no);
});


$(document).on('blur', '.uoth_company', function() {
	var uoth_company = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	xl_add_uoth({company:uoth_company}, accordion_no);
});


$(document).on('blur', '.uoth_ulPremium', function() {
	var uoth_ulPremium = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no');
	if (uoth_ulPremium) {
		xl_emptyReset($(this));
	} 
	xl_add_uoth({other_ul_premium:uoth_ulPremium}, accordion_no);
});



$(document).on('change', '.uoth_occu', function() {
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if ($('.uoth_occu').prop("checked") == true) {
		uoth_occu = 1;
		xl_add_uoth({occurence_coverage_basis:uoth_occu}, accordion_no);
	} else {
		uoth_occu = 0;
		xl_add_uoth({occurence_coverage_basis:uoth_occu}, accordion_no);
	}
});

$(document).on('blur', '.uoth_liabType', function() {
	var uoth_liabType = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	xl_add_uoth({liability_type:uoth_liabType}, accordion_no);
});


$(document).on('change', '.uoth_insLt', function() {
	var uoth_insLt = $(this).val().replace(/[$,]/g, '');    
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if (uoth_insLt != 0) {
		xl_emptyReset($(this));
	}
	if (uoth_insLt == 'other') {
		var uoth_insLt_other = $("#uoth_insLt_other_"+accordion_no).val();  
	} else {
		var uoth_insLt_other = null;
	}
	xl_add_uoth({limit_of_insurance:uoth_insLt, limit_of_insurance_other:uoth_insLt_other}, accordion_no);
});

$(document).on('change', '.uoth_insLt_other', function() {
	var uoth_insLt_other = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if (uoth_insLt_other) {
		xl_emptyReset($(this));
	}
	xl_add_uoth({limit_of_insurance_other:uoth_insLt_other}, accordion_no);
});


$(document).on('change', '.uoth_aggreLt', function() {
	var aggregate_limit = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if (aggregate_limit != 0) {
		xl_emptyReset($(this));
	}
	if (aggregate_limit == 'other') {
		var aggregate_limit_other = $("#uoth_aggreLt_other_"+accordion_no).val();  
	} else {
		var aggregate_limit_other = null;
	}
	xl_add_uoth({aggregate_limit:aggregate_limit,aggregate_limit_other:aggregate_limit_other}, accordion_no);
});

$(document).on('change', '.uoth_aggreLt_other', function() {
	var aggregate_limit_other = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if (aggregate_limit_other) {
		xl_emptyReset($(this));
	}
	xl_add_uoth({aggregate_limit_other:aggregate_limit_other}, accordion_no);
});

$(document).on('change', '.uoth_limits', function() {
	var uoth_limits = $(this).val().replace(/[$,]/g, '');
	var row_no = $(this).closest('.limit_row').data('row_no');
	var accordion_rid = $(this).closest('.uothAccor').data('rid'); 
	var accordion_no = $(this).closest('.uothAccor').data('accord_no'); 
	if (uoth_limits) {
		xl_emptyReset($(this));
	}
	xl_add_limit({limit_other:uoth_limits}, row_no, accordion_rid, accordion_no);
});

$(document).on('change', '.uoth_limitsDesc', function() {
	var limit_description = $(this).val().replace(/[$,]/g, '');
	var row_no = $(this).closest('.limit_row').data('row_no'); 
	var accordion_rid = $(this).closest('.uothAccor').data('rid'); 
	var accordion_no = $(this).closest('.uothAccor').data('accord_no');
	if (limit_description) {
		xl_emptyReset($(this));
	} 
	xl_add_limit({limit_description:limit_description}, row_no, accordion_rid, accordion_no);
});


function xl_add_uoth (value, accord_no) {     
	var uoth_id = $('#uothAccor_'+accord_no).data("rid");
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	if (uoth_id != '' && uoth_id != null) {
		value.rid = uoth_id;
		value.updated_by = localStorage.getItem('usernumericid');
	} else {
		value.created_by = localStorage.getItem('usernumericid');
	}
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.rqbi_id = rqbi_id;
	try {
		$.ajax({
			url: laravel_url+"/xl_add_uoth",
			type:'post',
			data:value,
			success: function (response) {
				if (response.uoth_id) {
					$('#uothAccor_'+accord_no).data("rid", response.uoth_id);
					xl_add_limit ({}, 0, response.uoth_id, accord_no);              
				}
				if (response.update_quote_version == 1) {
					updateQuoteNameBasedTotalPremium();
				}
			}
			
		}); 
	} catch(err) {
		console.log(err);
		
	}
	
}


function xl_add_limit (value, row_no, accordion_rid, accordion_no) {   
	var limit_id = $('#limit_row_'+accordion_no+'_'+row_no).attr("data-rowrid");
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	if (limit_id != '' && limit_id != null) {
		value.rid = limit_id;
		value.updated_by =  localStorage.getItem('usernumericid');
	} else {
		value.created_by =  localStorage.getItem('usernumericid');
	}
	value.others_rid = accordion_rid;
	try {
		$.ajax({
			url: laravel_url+"/xl_add_limit",
			type:'post',
			data:value,
			success: function (response) {
				if (limit_id == '' || limit_id == null) {
					$('#limit_row_'+accordion_no+'_'+row_no).attr("data-rowrid", response.limit_id);
				}
				
			}
		}); 
	} catch(err) {
		console.log(err);
		
	}
	
}
function xl_delete_uoth (value) {
	var accord_no = value.accordion;
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	var uoth_id = $('#uothAccor_'+accord_no).data("rid");
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.rqbi_id = rqbi_id;
	value.rid = uoth_id;
	
	value.deleted_by =localStorage.getItem('usernumericid');
	try {
		$.ajax({
			url: laravel_url+"/xl_del_uoth",
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


function xl_delete_limit (value) {
	var row_no = value.row;
	var accordion_no = value.accordion;
	
	var limit_id = $('#limit_row_'+accordion_no+'_'+row_no).attr("data-rowrid"); 
	value.rid = limit_id;
	
	
	value.deleted_by =localStorage.getItem('usernumericid');
	try {
		$.ajax({
			url: laravel_url+"/xl_del_limit",
			type:'post',
			data:value,
			success: function (response) {
				
			}
		}); 
	} catch(err) {
		console.log(err);
		
	}
	
}

$(document).on('click', '.uoth_head', function() {
	rid=$(this).closest('.uothAccor').attr('data-rid');
	accord_no=$(this).closest('.uothAccor').attr('data-accord_no');
	var retreive_oth =  $("[data-rid="+rid+"]").attr('data-retreiveoth');
	if (retreive_oth != 1) {
		xl_get_uoth(rid,accord_no);
		$("[data-rid="+rid+"]").attr('data-retreiveoth', 1);
	}
	covAddBtn_toggle($(this), 'Uoth' , 'uoth_head');
});


function xl_get_uoth(rid, accordian_no) {
	try {
		$.ajax({
			url: laravel_url+"/xl_get_uoth",
			type:'post',
			data : {rid:rid},
			success:function(response) {
				var uoth_data = response.get_uoth;
				set_retrieve_uoth(uoth_data, rid, accordian_no);
			},
			complete : function() {
				
			}
		});
	} catch(err) {
		console.log(err);
		
	}
}


function set_retrieve_uoth(uoth_data, rid, accordian_no) {   console.log(uoth_data);
	try {
		for (i = 0; i < uoth_data.length; i++) {
			var thisValue = $('#uoth_limitsTable_'+accordian_no+' tbody').find('tr:last-child button');
			if (uoth_data.length-1 == i && i != 0) {
				thisValue.closest('tbody').find('.uoth_limitsAdd').removeClass('btn-success uoth_limitsAdd').addClass('btn-danger uoth_limitsMinus');
				$('.uoth_limitsMinus').attr('onclick', 'uoth_limitsMinus($(this))');
				thisValue.closest('tbody').find('.uoth_limitsMinus i').removeClass('fa-plus').addClass('fa-minus');
			} else {
				thisValue.closest('tbody').find('.uoth_limitsMinus').removeClass('btn-danger uoth_limitsMinus').addClass('btn-success uoth_limitsAdd');
				$('.uoth_limitsMinus').attr('onclick', 'uoth_limitsAdd($(this))');
				thisValue.closest('tbody').find('.uoth_limitsAdd i').removeClass('fa-minus').addClass('fa-plus');
			}
			if (i == 0) {
				if (uoth_data[i]['effective_date'] != null) {
					var date_time = uoth_data[i]['effective_date'].split(' ');
					var effec_split=date_time[0].split('-');
					var effective_date = effec_split[1] + '-' + effec_split[2] + '-' + effec_split[0];
				}
				if (uoth_data[i]['expiration_date'] != null) {
					var date_time = uoth_data[i]['expiration_date'].split(' ');
					var expir_split=date_time[0].split('-');
					var expiry_date = expir_split[1] + '-' + expir_split[2] + '-' + expir_split[0];
				}
				
				var uoth_company = uoth_data[i]['company'];
				var uoth_policy_number = uoth_data[i]['policy_number'];
				var uoth_effec_date = effective_date;
				var uoth_expiry_date = expiry_date;
				var other_ul_premium = uoth_data[i]['other_ul_premium']!=null?parseInt(uoth_data[i]['other_ul_premium']).toLocaleString() : uoth_data[i]['other_ul_premium'];
				var occurence_coverage_basis = uoth_data[i]['occurence_coverage_basis'];
				var liability_type = uoth_data[i]['liability_type'];
				var limit_of_insurance = uoth_data[i]['limit_of_insurance'];
				var limit_of_insurance_other = uoth_data[i]['limit_of_insurance_other'];
				var aggregate_limit = uoth_data[i]['aggregate_limit'];
				var aggregate_limit_other = uoth_data[i]['aggregate_limit_other'];
				
				$("[data-rid="+rid+"]").find('.uoth_company').val(uoth_company);
				$("[data-rid="+rid+"]").find('.uoth_policyNo').val(uoth_policy_number);
				$("[data-rid="+rid+"]").find('.uoth_effectDt').datepicker('update',uoth_effec_date)
				$("[data-rid="+rid+"]").find('.uoth_expDt').datepicker('update',uoth_expiry_date);
				$("[data-rid="+rid+"]").find('.uoth_ulPremium').val(other_ul_premium);
				$("[data-rid="+rid+"]").find('.uoth_liabType').val(liability_type);
				
				if (occurence_coverage_basis == 1) {
					$("[data-rid="+rid+"]").find('.uoth_occu').prop('checked', true);
				} else {
					$("[data-rid="+rid+"]").find('.uoth_occu').prop('checked', false);
				}
				
				
				if (limit_of_insurance == 'other') {
					if (limit_of_insurance_other != null) {  
						var limit_of_insurance_other1 = parseInt(limit_of_insurance_other).toLocaleString();
					} else {   
						var limit_of_insurance_other1 = '';
					}
					
					$("[data-rid="+rid+"]").find('.uoth_insLt').val(limit_of_insurance).change();
					$("[data-rid="+rid+"]").find('.uoth_insLt_other').val(limit_of_insurance_other1);
				} else if (limit_of_insurance == null) {
					$("[data-rid="+rid+"]").find('.uoth_insLt').val(0).prop("selected",true);
				} else {
					$("[data-rid="+rid+"]").find('.uoth_insLt').val(limit_of_insurance).prop("selected",true);
				}
				
				if (aggregate_limit == 'other') {
					if (aggregate_limit_other != null) {
						var aggregate_limit_other1 = parseInt(aggregate_limit_other).toLocaleString();
					} else {
						var aggregate_limit_other1 = '';
					}
					
					$("[data-rid="+rid+"]").find('.uoth_aggreLt').val(aggregate_limit).change();
					$("[data-rid="+rid+"]").find('.uoth_aggreLt_other').val(aggregate_limit_other1);
				} else if (aggregate_limit == null) {
					$("[data-rid="+rid+"]").find('.uoth_aggreLt').val(0).prop("selected",true);
				} else {
					$("[data-rid="+rid+"]").find('.uoth_aggreLt').val(aggregate_limit).prop("selected",true);
				}
				if (uoth_data[i].rid != null) {
					$('#limit_row_'+accordian_no+'_'+i).attr('data-rowrid', uoth_data[i].rid);
					$('#uoth_limits_'+accordian_no+'_'+i).val(uoth_data[i].limit_other);
					$('#uoth_limitsDesc_'+accordian_no+'_'+i).val(uoth_data[i].limit_description);
				}
			} else {       
				var uothTabTr = $('#uoth_limitsTable_'+accordian_no+' tbody').find('tr:last-child');
				$.when(othTable_addFun(uothTabTr, accordian_no, i)).then(function(response) {
					$('#limit_row_'+accordian_no+'_'+i).attr('data-rowrid', uoth_data[i].rid);
					$('#uoth_limits_'+accordian_no+'_'+i).val(uoth_data[i].limit_other);
					$('#uoth_limitsDesc_'+accordian_no+'_'+i).val(uoth_data[i].limit_description);
				});
			}
		}
	} catch(err) {
		console.log(err);
		
	}
}
