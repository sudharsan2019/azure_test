function xlEl_append(th, ret_uel) {
	var checked = $(th).prop('checked');
	if (checked) {
		if ($('#xlUel_div').html().trim() == '') {
			try {
				$.ajax({
					url: '/brokerage/template/xl_Uel.php',
					method: 'post',
					success: function(res) {
						$('#xlUel_div').html(res);
						if (ret_uel == '') {
							effective_date = $('#rqbieffdate').val();
							expiration_date = $('#rqbiexpdate').val();
							xl_add_uel({effective_date:effective_date, expiration_date:expiration_date}, 0);    
						}
					},  
					complete:function(){     
						console.log(ret_uel);
						if (ret_uel.length > 0) {
							var uel_td = ret_uel.split(',');   
							for (uel_i = 0; uel_i < uel_td.length; uel_i++) {
								var uel_tab_id = uel_td[uel_i];
								if (uel_i != 0) { 
									j= uel_i;
									uel_id = j-1;
									uel_accrd = $('#uelRemoveBtn_'+uel_id).closest('.uelAccor'); 
									uel_AddAnotherFun(j, uel_accrd);
									uelAdd = uel_i;
								}
								
								$('#uel_head_'+uel_i).attr('aria-expanded',false);
								$('#uel_head_'+uel_i).addClass('collapsed');
								$('#uel_collapse_'+uel_i).removeClass('show');
								$('.uelAccor').eq(uel_i).attr('data-rid', uel_tab_id);
								$('.xl_addUel').addClass('d-none');
							}
						} 
					}
				});
			} catch(err) {
				console.log(err);
				
			}
			
		}
	}else {
		cov_uncheck(th, 'Uel', 'Employers Liability');
	}
}


//  uel add another
var uelAdd = 0;
function xl_addUel() {
	var uelAcc = $('.uelAccor').last();
	var uel_prem = uelAcc.find('.uel_empPremium').val();
	var each_acci_select = uelAcc.find('.uel_acci').val();
	var policy_lt_select = uelAcc.find('.uel_disLt').val();
	var each_emp_select = uelAcc.find('.uel_empDis').val();

	if (each_acci_select == 'other') {
		var each_acci = uelAcc.find('.uel_acci_other').val();
	} else {
		var each_acci = uelAcc.find('.uel_acci').val();
	}

	if (policy_lt_select == 'other') {
		var policy_lt = uelAcc.find('.uel_disLt_other ').val();
	} else {
		var policy_lt = uelAcc.find('.uel_disLt').val();
	}

	if (each_emp_select == 'other') {
		var each_emp = uelAcc.find('.uel_empDis_other').val(); 
	} else {
		var each_emp = uelAcc.find('.uel_empDis').val();	
	}

	if (uel_prem && each_acci && policy_lt && each_emp) {
		uelAdd++;
		uel_AddAnotherFun(uelAdd, uelAcc);
		$("#uelAccor_"+uelAdd).attr('data-retreiveel',1);
		xl_add_uel({}, uelAdd);
		
		xl_scrollAccor(uelAcc, 'uel','down');
		xl_alert('success');
	} else {
		uel_emptyValid (uelAcc, uel_prem, each_acci, policy_lt, each_emp);
		xl_alert('empty');
	}
}

function uel_emptyValid (uelAcc, uel_prem, each_acci, policy_lt, each_emp) {
	if (!uel_prem) {
		xl_emptyValid (uelAcc, "uel_empPremium");
	}
	if (!each_acci) {
		xl_emptyValid (uelAcc, "uel_acci_other");
	}
	if (!policy_lt) {
		xl_emptyValid (uelAcc, "uel_disLt_other");
	}
	if (!each_emp) {
		xl_emptyValid (uelAcc, "uel_empDis_other");	
	}
}

function uel_AddAnotherFun(uelAdd, uelAcc) {
	var uelCopy = '<div class="accordion uelAccor mt-4 uelaccordion" id="uelAccor_'+uelAdd+'" data-rid="" data-accord_no="'+uelAdd+'"><div class="card"><div class="card-header uel_head" id="uel_head_'+uelAdd+'" data-toggle="collapse" data-target="#uel_collapse_'+uelAdd+'" aria-expanded="true" aria-controls="uel_collapse_'+uelAdd+'"> Employers Liability</div><div id="uel_collapse_'+uelAdd+'" class="collapse show" aria-lebelledy="uel_head_'+uelAdd+'" data-parent="#uelAccor_'+uelAdd+'"><div class="card-body"><div class="row mt-2"><div class="form-group col-md-3"> <label> Policy Number </label> <input type="text" name="" class="form-control form-control-sm uel_policyNo" id="uel_policyNo_'+uelAdd+'"></div><div class="form-group col-md-3"> <label> Company </label> <input type="text" name="" class="form-control form-control-sm uel_company" id="uel_company_'+uelAdd+'"></div><div class="form-group col-md-3"> <label> Effective Date </label><div class="input-group input-group-sm date uel_effectDt mr-2"><div><input type="text" class="form-control form-control-sm" id="uel_effectDt_'+uelAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div><div class="form-group col-md-3"> <label> Expiration Date </label><div class="input-group input-group-sm date uel_expDt mr-2"><div><input type="text" class="form-control form-control-sm" id="uel_expDt_'+uelAdd+'" placeholder="mm-dd-yyyy" aria-invalid="false" autocomplete="off" readonly></div><div class="input-group-addon bg-info text-center"> <i class="fa fa-fw fa-calendar mt-2"></i></div></div></div></div><div class="row mt-2"><div class="form-group col-auto"> <label> UL Employers Liability Premium <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div><input type="text" class="form-control form-control-sm uel_empPremium xl_number" id="uel_empPremium_'+uelAdd+'" maxlength="19" placeholder="UL Employers Liability Premium"></div></div></div><div class="form-group col-auto"> <label> Bodily Injury Each Accident (By Accident) <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uel_acci" id="uel_acci_'+uelAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Bodily Injury Policy Limit (By Disease) <span class="redStar"> * </span></label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uel_disLt" id="uel_disLt_'+uelAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div><div class="form-group col-auto"> <label> Bodily Injury Each Employee (By Disease) <span class="redStar"> * </span> </label><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div><div> <select class="form-control form-control-sm uel_empDis" id="uel_empDis_'+uelAdd+'" onchange="xlOtherSelect($(this));"><option value="500000"> 500,000</option><option value="1000000" selected> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></div></div><div class="uel_deleteDiv text-right my-2"> <button type="button" class="btn btn-sm btn-danger uelRemoveBtn" id="uelRemoveBtn_'+uelAdd+'" onclick="uelRemoveBtn($(this));"> <i class="fa fa-trash mr-1"></i> Delete </button></div></div></div></div></div>';
	uelAcc.after(uelCopy);
	
	$(".uel_effectDt").datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true,
		todayHighlight: true
	}).on('changeDate', function(selected) {
		var minDate = new Date(selected.date);
		var nxtYear = dateNextYear(selected.date);
		expDateSet($(this), 'uel', nxtYear, minDate);
		var accordion_no = $(this).closest('.uelAccor').data('accord_no');
		var uel_effectdate = $('#uel_effectDt_'+uelAdd).val();
		expiry = $('#uel_expDt_'+uelAdd).val();
		
		effectdate = uel_effectdate.split('-')
		var effective_date = effectdate[2] + '-' +effectdate[0] + '-' + effectdate[1];
		
		var expir_split = expiry.split('-');
		var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
		xl_add_uel({effective_date: effective_date, expiration_date: expiry_date},accordion_no);
		
	});
	$(".uel_expDt").datepicker({
		format: 'mm-dd-yyyy',
		autoclose: true
	}).on('changeDate', function (e) {
		var uel_expirydate = $('#uel_expDt_'+uelAdd).val();
		var expir_split = uel_expirydate.split('-');
		var expiry_date = expir_split[2] + '-' + expir_split[0] + '-' + expir_split[1];
		var accordion_no = $(this).closest('.uelAccor').data('accord_no');
		xl_add_uel({expiration_date: expiry_date},accordion_no);
	});
}

function uelRemoveBtn(thisValue) {
	var thisLength = $('.uelRemoveBtn').length;
	if (thisLength == 1) {
		xl_alert('minimum_one');
	} else {
		var thisId = thisValue.closest('.uelAccor').attr('id');
		thisValue.closest('.uel_deleteDiv').append('<div class="alert alert-warning col-4 uel_delAlert delAlert shadow-lg text-center" role="alert"><div class="alert-header d-inline"> Are you sure want to <b> Delete? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_del mr-1" onclick="uel_deleteYes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_del" onclick="accor_deleteNo('+"'"+thisId+"'"+');"> No </button></div></div>');
	}
}

function uel_deleteYes(thisId) {
	if($('.uelAccor:first-child').attr('id') != thisId) {
		xl_scrollAccor(thisId, 'uel','up'); 
	} else {
		xl_scrollAccor(thisId, 'uel','stay');
	}
	var accordion_no = $('#'+thisId).data('accord_no');
	xl_delete_uel({is_checked: 0, accordion : accordion_no});
	$('#'+thisId).remove();
	xl_alert('delete');
}

$(document).on('blur', '.uel_policyNo', function() {
	var uel_policyNo = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no');    
	xl_add_uel ({policy_number:uel_policyNo}, accordion_no);
});


$(document).on('blur', '.uel_company', function() {
	var uel_company = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	xl_add_uel({company:uel_company}, accordion_no);
});


$(document).on('blur', '.uel_empPremium', function() {
	var uel_empPremium = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	if (uel_empPremium) {
		xl_emptyReset($(this));
	}
	xl_add_uel({ul_employers_liability_premium:uel_empPremium}, accordion_no);
});

$(document).on('change', '.uel_acci', function() {
	var uel_bodilyInj_acci = $(this).val().replace(/[$,]/g, '');    
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	
	if (uel_bodilyInj_acci == 'other') {
		var uel_bodilyInj_acci_other = $("#uel_acci_other_"+accordion_no).val();  
	} else {
		var uel_bodilyInj_acci_other = null;
	}
	xl_add_uel({bodily_injury_each_accident:uel_bodilyInj_acci, bodily_injury_each_accident_other:uel_bodilyInj_acci_other}, accordion_no);
});

$(document).on('change', '.uel_acci_other', function() {
	var uel_bodilyInj_acci_other = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	if (uel_bodilyInj_acci_other) {
		xl_emptyReset($(this));
	}
	xl_add_uel({bodily_injury_each_accident_other:uel_bodilyInj_acci_other}, accordion_no);
});


$(document).on('change', '.uel_disLt', function() {
	var uel_bodilyInj_disLt = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	
	if (uel_bodilyInj_disLt == 'other') {
		var uel_bodilyInj_disLt_other = $("#uel_disLt_other_"+accordion_no).val();  
	} else {
		var uel_bodilyInj_disLt_other = null;
	}
	xl_add_uel({bodily_injury_policy_limit:uel_bodilyInj_disLt,bodily_injury_policy_limit_other:uel_bodilyInj_disLt_other}, accordion_no);
});

$(document).on('change', '.uel_disLt_other', function() {
	var uel_bodilyInj_disLt_other = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	if (uel_bodilyInj_disLt_other) {
		xl_emptyReset($(this));
	}
	xl_add_uel({bodily_injury_policy_limit_other:uel_bodilyInj_disLt_other}, accordion_no);
});

$(document).on('change', '.uel_empDis', function() {
	var uel_bodilyInj_empDis = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	
	if (uel_bodilyInj_empDis == 'other') {
		var uel_bodilyInj_empDis_other = $("#uel_empDis_other_"+accordion_no).val();  
	} else {
		var uel_bodilyInj_empDis_other = null;
	}
	xl_add_uel({bodily_injury_each_employee:uel_bodilyInj_empDis,bodily_injury_each_employee_other:uel_bodilyInj_empDis_other}, accordion_no);
});

$(document).on('change', '.uel_empDis_other', function() {
	var uel_bodilyInj_empDis_other = $(this).val().replace(/[$,]/g, '');
	var accordion_no = $(this).closest('.uelAccor').data('accord_no'); 
	if (uel_bodilyInj_empDis_other) {
		xl_emptyReset($(this));
	}
	xl_add_uel({bodily_injury_each_employee_other:uel_bodilyInj_empDis_other}, accordion_no);
});

function xl_add_uel (value, accord_no) {     
	var uel_id = $('#uelAccor_'+accord_no).data("rid");
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	if (uel_id != '' && uel_id != null) {
		value.rid = uel_id;
		value.updated_by =  localStorage.getItem('usernumericid');
	} else {
		value.created_by =  localStorage.getItem('usernumericid');
	}
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.rqbi_id = rqbi_id;
	try {
		$.ajax({
			url: laravel_url+"/xl_add_uel",
			type:'post',
			data:value,
			success: function (response) {
				if (uel_id == '' || uel_id == null) {
					$('#uelAccor_'+accord_no).data("rid", response.uel_id);
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

function xl_delete_uel (value) {
	var accord_no = value.accordion;
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	var uel_id = $('#uelAccor_'+accord_no).attr("data-rid");
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.rqbi_id = rqbi_id;
	value.rid = uel_id;
	
	value.deleted_by =localStorage.getItem('usernumericid');
	try {
		$.ajax({
			url: laravel_url+"/xl_del_uel",
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
