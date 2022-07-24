function xlPremium_append(th) {
	if(th.checked){
		$('.xlLayer_premTab, .xlLayer_over').removeClass('width60');
		$('.xlLayer_premTab thead tr:first-child th').attr('colspan','5');
		$('.xlLayer_premTab thead tr:last-child th').eq(1).after('<th class="width10_perc bg-lav layer_thAdd"> Override Factor </th>');
		$('.xlLayer_premTab thead tr:last-child th').eq(3).after('<th class="bg-lav layer_thAdd"> Override Premium </th>');

		var trLen = $('.xlLayer_premTab tbody tr').length;

		for(var i=1; i<=trLen; i++) {
			var factVal = $('.xlLayer_premTab tbody tr:nth-child('+i+') td:nth-child(2) input').val();
			var premVal = $('.xlLayer_premTab tbody tr:nth-child('+i+') td:nth-child(3) .xlLayer_prem ').val();
			$('.xlLayer_premTab tbody tr:nth-child('+i+') td:nth-child(2)').after('<td class="layer_tdAdd"> <input type="text" class="form-control form-control-sm xlLayer_fact_over" value="'+factVal+'"></td>');
			$('.xlLayer_premTab tbody tr:nth-child('+i+') td:nth-child(4)').after('<td class="layer_tdAdd"><div class="input-group input-group-sm justify-content-center"> <div class="input-group-addon bg-light text-center"><i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm xlLayer_prem_over xl_number" value="'+premVal+'" maxlength="19"> </div> </div></td>');
			$('.xlLayer_premTab tbody tr:nth-child('+i+') td:last-child').after('<td class="layer_tdAdd"> <button type="button" class="btn btn-xs btn-success xlLayer_add layerBtn mr-1" onclick="xlLayer_addRow();"><i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlLayer_del layerBtn" onclick="xlLayer_delRow($(this));"><i class="fa fa-trash"></i></button> </td>');
		}
		$('.xlLayerPrem_LayerTotTr td:first-child').attr('colspan','3');
		$('.xlLayerPrem_LayerTotTr td:first-child').after('<td class="xlLayerPrem_layerTotTd"> <div class="input-group input-group-sm justify-content-center"> <div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i> </div><div><input type="text" class="form-control form-control-sm xlLayerPrem_layerTot xl_number" value="5,000" maxlength="19" disabled></div></div></td>')
		$('.xlLayer_premTab tfoot tr:nth-child(2) td:first-child').attr('colspan','4');
	} else {
		$('.xlLayer_premTab thead tr:first-child th').attr('colspan','3');
		$('.layer_thAdd, .layer_tdAdd, .xlLayerPrem_layerTotTd').remove();
		$('.xlLayer_premTab tfoot tr td:first-child').attr('colspan','2');
		$('.xlLayer_premTab, .xlLayer_over').addClass('width60');
	}
	
}

var uct_add = 0;
function uctAddFun(thisValue) {
	var ulPrem, ulPerc;
	ulPrem = thisValue.closest('tbody').find('tr:last-child .underCal_Prem').val();
	ulPerc = thisValue.closest('tbody').find('tr:last-child .underCal_Perc').val();
	if(ulPrem && ulPerc) {
		uct_add ++;
		thisValue.closest('tbody').find('.underCal_minus').prop('disabled', false);
		var ulLast = thisValue.closest('tbody').find('tr:last-child');
		uctTableAdd(ulLast, uct_add);
	}else {
        new PNotify({ title: 'Warning', text: 'Fill empty fields', delay: 500, type: 'Warning' });
    }	
}

function uctTableAdd(ulLast, uct_add) {
	var uctTr = '<tr><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm underCal_Prem xl_number" id="underCal_Prem_'+uct_add+'" value="250,000" maxlength="19"></div></div></td><td> <input type="text" class="form-control form-control-sm underCal_Desc"></td><td><div class="input-group input-group-sm"> <input type="text" class="form-control form-control-sm underCal_Perc xl_number" id="underCal_Perc_'+uct_add+'" value="" onkeyup="xlPerc_valid($(this));" maxlength="3"><div class="input-group-addon bg-light text-center"> <i class="fa fa-percent mt-2"></i></div></div></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm underCal_Tot xl_number" id="underCal_Tot_'+uct_add+'" value="250,000" maxlength="19"></div></div></td><td class="text-center"> <button type="button" class="btn btn-xs btn-success underCal_plus xlTableBtn mr-1"  onclick="uctAddFun($(this));"> <i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger underCal_minus xlTableBtn" onclick="uctMinusFun($(this));" disabled> <i class="fa fa-minus"></i></button></td></tr>';
	ulLast.after(uctTr);
}

function uctMinusFun(thisValue) {
	thisValue.closest('tr').remove();
}

function xlLayer_addRow() {
	var last_overFact = $('.xlLayer_premTab tbody tr:last-child').find('.xlLayer_fact_over').val();
	var last_overPrem = $('.xlLayer_premTab tbody tr:last-child').find('.xlLayer_prem_over ').val();
	if (last_overFact && last_overPrem) {
		$('.xlLayer_premTab tbody tr:last-child').after('<tr> <td> 1M x 5M </td><td> <input type="text" class="form-control form-control-sm xlLayer_fact" value="0.5" disabled> </td> <td class="layer_tdAdd"> <input type="text" class="form-control form-control-sm xlLayer_fact_over" value=""></td> <td> <div class="input-group input-group-sm justify-content-center"> <div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i> </div><div><input type="text" class="form-control form-control-sm xlLayer_prem xl_number" value="500" maxlength="19" disabled></div></div></td> <td class="layer_tdAdd"><div class="input-group input-group-sm justify-content-center"> <div class="input-group-addon bg-light text-center"><i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm xlLayer_prem_over xl_number" value="" maxlength="19"> </div> </div></td> <td class="layer_tdAdd"> <button type="button" class="btn btn-xs btn-success xlLayer_add layerBtn mr-1" onclick="xlLayer_addRow();"><i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlLayer_del layerBtn" onclick="xlLayer_delRow($(this));"><i class="fa fa-trash"></i></button> </td> </tr>');	
	} else {
		new PNotify({ title: 'Warning', text: 'Fill empty fields', delay: 500, type: 'Warning' });
	}
}

function xlLayer_delRow(thisValue) {
	if ($('.xlLayer_del').length > 1) {
		thisValue.closest('tr').remove();	
	} else {
		xl_alert('minimum_one');
	}
}

function xlAutoPrem_append() {
	$.post("xlLayerPrem_auto.php", function(postresult) {
		$("#xlAutoLayerPrem").html('').append(postresult);
	});
	$('.xlAutoLayer_table thead tr:first-child th').attr('colspan','4');
	$('.xlAutoLayer_table thead tr:last-child').append('<th class="width15_perc bg-lav"></th>');
	$('.xlAutoLayer_table tbody tr').append('<td><button type="button" class="btn btn-xs btn-success xlAutoLayer_add layerBtn mr-1" onclick="xlAutoLayer_add();"><i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlAutoLayer_del layerBtn" onclick="xlAutoLayer_del($(this));"><i class="fa fa-trash"></i></button></td>');
}

function xlAutoLayer_add(thisValue) {
	var last_overFact = $('.xlAutoLayer_table tbody tr:last-child').find('.xlAutoLayer_fact').val();
	var last_overPrem = $('.xlAutoLayer_table tbody tr:last-child').find('.xlAutoLayer_prem  ').val();
	if (last_overFact && last_overPrem) {
		$('.xlAutoLayer_table tbody tr:last-child').after('<tr> <td> 1M x 1M </td><td> <input type="text" class="form-control form-control-sm xlAutoLayer_fact" value="0.5"></td><td><div class="input-group input-group-sm justify-content-center"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm xlAutoLayer_prem xl_number" value="1,000" maxlength="19"></div> </div></td> <td><button type="button" class="btn btn-xs btn-success xlAutoLayer_add layerBtn mr-1" onclick="xlAutoLayer_add();"><i class="fa fa-plus"></i></button> <button type="button" class="btn btn-xs btn-danger xlAutoLayer_del layerBtn" onclick="xlAutoLayer_del($(this));"><i class="fa fa-trash"></i></button></td></tr>');
	}  else {
		new PNotify({ title: 'Warning', text: 'Fill empty fields', delay: 500, type: 'Warning' });
	}
}

function xlAutoLayer_del(thisValue) {
	if ($('.xlAutoLayer_del').length > 1) {
		thisValue.closest('tr').remove();	
	} else {
		xl_alert('minimum_one');
	}
}

function uca_valid() {
	var ucafun_ex = false;
	$('.ucaAccor').each(function() {
		var thisVal = $(this);
		var comAuto = thisVal.find('.comAutoPremium').val();
		var combin_lt_select = thisVal.find('.uca_combLt').val();
	    if (combin_lt_select == 'other') {
	        var combin_lt = thisVal.find('.uca_combLt_other').val();
	    } else {
	        var combin_lt = thisVal.find('.uca_combLt').val();
	    }
		var fleetBreak_Totalprem = thisVal.find('.fleetBreak_Totalprem').val().replace(/[$,]/g, '');
        if (!comAuto || !combin_lt || !fleetBreak_Totalprem || fleetBreak_Totalprem == 0) {
        	uca_emptyValid(thisVal, comAuto, combin_lt, fleetBreak_Totalprem);
        	ucafun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
        }
	});
	if (ucafun_ex == true) {
		xl_alert('empty','Auto');
	}
	return ucafun_ex;
}
function uex_valid() {
	var uexfun_ex = false;
	$('.uexAccor').each(function() {
		var thisVal = $(this);
		var ul_prem = thisVal.find('.uex_ulPremium').val();
	    var insur_select = thisVal.find('.uex_insur').val();
	    var underlt_select = thisVal.find('.uex_underLt').val();
	    var uex_classCode = thisVal.find('.uex_cc').val();

	    if (insur_select == 'other') {
	        var insur = thisVal.find('.uex_insur_other').val();
	    } else {
	        var insur = thisVal.find('.uex_insur').val();
	    }
	    if (underlt_select == 'other') {
	        var underlt = thisVal.find('.uex_underLt_other').val();
	    } else {
	        var underlt = thisVal.find('.uex_underLt').val();
	    }
	    if (!ul_prem || !insur || !underlt || !uex_classCode) {
	    	uex_emptyValid(thisVal, ul_prem, insur_select, insur, underlt_select, underlt, uex_classCode);
	    	uexfun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
	    }
	});
	if (uexfun_ex == true) {
		xl_alert('empty','Excess');
	}
	return uexfun_ex;
}

function uebl_valid() {
	var ueblfun_ex = false;
	$('.ueblAccor').each(function() {
		var thisVal = $(this);
		var emp_prem = thisVal.find('.uebl_empPremium').val();
		var eachemplt_select = thisVal.find('.uebl_eachEmpLt').val();
	    var aggrelt_select = thisVal.find('.uebl_aggreLt').val();

	    if (eachemplt_select == 'other') {
	        var eachemplt = thisVal.find('.uebl_eachEmpLt_other').val();
	    } else {
	        var eachemplt = thisVal.find('.uebl_eachEmpLt').val();
	    }
	    if (aggrelt_select == 'other') {
	        var aggrelt = thisVal.find('.uebl_aggreLt_other').val();
	    } else {
	        var aggrelt = thisVal.find('.uebl_aggreLt').val();
	    }
	    if (!emp_prem || !eachemplt || !aggrelt) {
	    	uebl_emptyValid (thisVal, emp_prem, eachemplt, aggrelt);
	    	ueblfun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
	    }	
	});
	if (ueblfun_ex == true) {
		xl_alert('empty','Employee Benefits Liability');
	}
	return ueblfun_ex;
}

function uel_valid() {
	var uelfun_ex = false;
	$('.uelAccor').each(function() {
		var thisVal = $(this);
		var uel_prem = thisVal.find('.uel_empPremium').val();
		var each_acci_select = thisVal.find('.uel_acci').val();
		var policy_lt_select = thisVal.find('.uel_disLt').val();
		var each_emp_select = thisVal.find('.uel_empDis').val();

		if (each_acci_select == 'other') {
			var each_acci = thisVal.find('.uel_acci_other').val();
		} else {
			var each_acci = thisVal.find('.uel_acci').val();
		}

		if (policy_lt_select == 'other') {
			var policy_lt = thisVal.find('.uel_disLt_other ').val();
		} else {
			var policy_lt = thisVal.find('.uel_disLt').val();
		}

		if (each_emp_select == 'other') {
			var each_emp = thisVal.find('.uel_empDis_other').val(); 
		} else {
			var each_emp = thisVal.find('.uel_empDis').val();	
		}
		if (!uel_prem || !each_acci || !policy_lt || !each_emp) {
			uel_emptyValid (thisVal, uel_prem, each_acci, policy_lt, each_emp);
			uelfun_ex = true;
			accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
		}	
	});
	if (uelfun_ex == true) {
		xl_alert('empty','Employers Liability');
	}
	return uelfun_ex;
}

function ugl_valid() {
	var uglfun_ex = false;
	$('.uglAccor').each(function() {
		var thisVal = $(this);
		var gl_prem = thisVal.find('.agl_premium').val();
	    var ul_prem = thisVal.find('.ugl_premium').val();
	    var each_occu_select = thisVal.find('.ugl_eachOccuLt').val();
	    var gen_aggre_select = thisVal.find('.ugl_genAggreLt').val();
	    var prodLt_select = thisVal.find('.ugl_prodLt').val();
	    var persInj_select = thisVal.find('.ugl_personalInjLt').val();
	    var ugl_classCode = thisVal.find('.ugl_cc').val();
	    var ugl_zip = thisVal.find('.ugl_zc').val();
	    var ugl_expo = thisVal.find('.ugl_expo').val();

	    if (each_occu_select == 'other') {
	        var each_occu = thisVal.find('.ugl_eachOccuLt_other').val();
	    } else {
	        var each_occu = thisVal.find('.ugl_eachOccuLt').val();
	    }
	    if (gen_aggre_select == 'other') {
	        var gen_aggre = thisVal.find('.ugl_genAggreLt_other').val();
	    } else {
	        var gen_aggre = thisVal.find('.ugl_genAggreLt').val();
	    }
	    if (prodLt_select == 'other') {
	        var prodLt = thisVal.find('.ugl_prodLt_other').val();
	    } else {
	        var prodLt = thisVal.find('.ugl_prodLt ').val();
	    }
	    if (persInj_select == 'other') {
	        var persInj = thisVal.find('.ugl_personalInjLt_other').val();
	    } else {
	        var persInj = thisVal.find('.ugl_personalInjLt').val();
	    }
	    if (!gl_prem || !ul_prem || !each_occu || !gen_aggre || !prodLt || !persInj || !ugl_classCode || !ugl_zip || !ugl_expo) {
	    	ugl_emptyValid(thisVal, gl_prem, ul_prem, each_occu, gen_aggre, prodLt, persInj, ugl_classCode, ugl_zip, ugl_expo);
	    	uglfun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
	    }
	});
	if (uglfun_ex == true) {
		xl_alert('empty','General Liability');
	}
	return uglfun_ex;
}

function ull_valid() {
	var ullfun_ex = false;
	$('.ullAccor').each(function() {
		var thisVal = $(this);
		var ate_prem = thisVal.find('.ull_ateLiqpremium').val();
	    var liq_prem = thisVal.find('.ull_liqpremium').val();
	    var each_com_select = thisVal.find('.ull_eachCommonLt').val();
	    var aggreLt_select = thisVal.find('.ull_aggreLt').val();
	    var ull_class = thisVal.find('.ull_cc').val();
	    var ull_zc = thisVal.find('.ull_zc').val();
	    var ull_expo = thisVal.find('.ull_expo').val();

	    if (each_com_select == 'other') {
	        var each_com = thisVal.find('.ull_eachCommonLt_other').val();
	    } else {
	        var each_com = thisVal.find('.ull_eachCommonLt').val();
	    }
	    if (aggreLt_select == 'other') {
	        var aggreLt = thisVal.find('.ull_aggreLt_other').val();
	    } else {
	        var aggreLt = thisVal.find('.ull_aggreLt').val();
	    }
	    if (!ate_prem || !liq_prem || !each_com || !aggreLt || !ull_class || !ull_zc || !ull_expo) {
	    	ull_emptyValid(thisVal, ate_prem, liq_prem, each_com, aggreLt, ull_class, ull_zc, ull_expo);
	    	ullfun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
	    }
	});
	if (ullfun_ex == true) {
		xl_alert('empty','Liquor');
	}
	return ullfun_ex;
}

function usg_valid() {
	var usgfun_ex = false;
	$('.usgAccor').each(function() {
		var thisVal = $(this);
		var ul_prem = thisVal.find('.usg_ulPremium').val();
	    var acci_select = thisVal.find('.usg_acci').val();
	    var disEmp_select = thisVal.find('.usg_disEmp').val();
	    var aggreLt_select = thisVal.find('.usg_AggreLt').val();

	    if (acci_select == 'other') {
	        var acci = thisVal.find('.usg_acci_other').val();
	    } else {
	        var acci = thisVal.find('.usg_acci').val();
	    }
	    if (disEmp_select == 'other') {
	        var disEmp = thisVal.find('.usg_disEmp_other').val();
	    } else {
	        var disEmp = thisVal.find('.usg_disEmp').val();
	    }
	    if (aggreLt_select == 'other') {
	        var aggreLt = thisVal.find('.usg_AggreLt_other').val();
	    } else {
	        var aggreLt = thisVal.find('.usg_AggreLt').val();
	    }
		if (!ul_prem || !acci || !disEmp || !aggreLt) {
			usg_emptyValid (thisVal, ul_prem, acci, disEmp, aggreLt);
			usgfun_ex = true;
			accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
		}
	});
	if (usgfun_ex == true) {
		xl_alert('empty','Stop Gap');
	}
	return usgfun_ex;
}

function uoth_valid() {
	var uothfun_ex = false;
	$('.uothAccor').each(function() {
		var thisVal = $(this);
		var ul_prem = thisVal.find('.uoth_ulPremium').val();
	    var insLt_select = thisVal.find('.uoth_insLt').val();
	    var aggreLt_select = thisVal.find('.uoth_aggreLt').val();

	    if (insLt_select == 'other') {
	        var insLt = thisVal.find('.uoth_insLt_other').val();
	    } else {
	        var insLt = thisVal.find('.uoth_insLt').val();
	    }
	    if (aggreLt_select == 'other') {
	        var aggreLt = thisVal.find('.uoth_aggreLt_other').val();
	    } else {
	        var aggreLt = thisVal.find('.uoth_aggreLt').val();
	    }
	    if (!ul_prem || !insLt || !aggreLt) {
	    	uoth_emptyValid (thisVal, ul_prem, insLt_select, insLt, aggreLt_select,  aggreLt);
	    	uothfun_ex = true;
	    	accorOpen($(this));
	    	xl_scrollAccor($(this).attr('id'), 'uca','stay');
	    }
	});
	if (uothfun_ex == true) {
		xl_alert('empty','Other');
	}
	return uothfun_ex;
}

function xlLimits_valid() {

	var limits_ex = false;
	var occLimit_oth, aggreLimit_oth, prod_aggreLimit_oth, attachPt_oth;

	var occLimit = $(".xlType_occuLimit").val();
	if (occLimit == 'other') {
        occLimit_oth = $(".xlType_occuLimit_other").val();
    }
	var aggreLimit = $(".xlType_aggreLimit").val();
	if (aggreLimit == 'other') {
        aggreLimit_oth = $(".xlType_aggreLimit_other").val();
    }
	var prod_aggreLimit = $(".xlType_prodAggreLimit").val();
	if (prod_aggreLimit == 'other') {
        prod_aggreLimit_oth = $(".xlType_prodAggreLimit_other").val();
    }
	if ($('#xlTypeExcess').val() == 'excess') {
		var attachPt = $(".xlType_attachPt").val();
		if (attachPt == 'other') {
			attachPt_oth = $(".xlType_attachPt_other").val();
		}
	}
	if (occLimit == 0 || aggreLimit == 0 || prod_aggreLimit == 0 || attachPt == 0 ) {

		if (occLimit == 0 ) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_occuLimit");
	    }
	    if (!occLimit_oth) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_occuLimit_other");
	    }
	    if (aggreLimit == 0 ) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_aggreLimit");
	    }
	    if (!aggreLimit_oth) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_aggreLimit_other");
	    }
	    if (prod_aggreLimit == 0 ) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_prodAggreLimit");
	    }
	    if (!prod_aggreLimit_oth) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_prodAggreLimit_other");
	    }
	    if (attachPt == 0 ) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_attachPt");
	    }
	    if (!attachPt_oth) {
	        xl_emptyValid ($('#xl_covDiv'), "xlType_attachPt_other");
	    }
		limits_ex = true;
	}
	if (limits_ex == true) {
		xl_alert('empty','Xl Limits');
	}
	return limits_ex;
}

function xlPremium() {

	var ucaValid = uexValid = ueblValid = uelValid = uglValid = ullValid = usgValid = uothValid = xlLimitsValid = undefined;
	xlLimitsValid = xlLimits_valid();

	if ($('.xlCov_auto').prop('checked') == true) {
		ucaValid = uca_valid();
	}
	if ($('.xlCov_exces').prop('checked') == true) {
		uexValid = uex_valid();	
	}
	if ($('.xlCov_ebl').prop('checked') == true) {
		ueblValid = uebl_valid();
	}
	if ($('.xlCov_el').prop('checked') == true) {
		uelValid = uel_valid();
	}
	if ($('.xlCov_gl').prop('checked') == true) {
		uglValid = ugl_valid();
	}
	if ($('.xlCov_ll').prop('checked') == true) {
		ullValid = ull_valid();
	}
	if ($('.xlCov_StopGap').prop('checked') == true) {
		usgValid = usg_valid();
	}
	if ($('.xlCov_other').prop('checked') == true) {
		uothValid = uoth_valid();
	}

	if (ucaValid == undefined && uglValid == undefined && ullValid == undefined && uexValid != undefined) {
	
		$('.uex_cc').each(function() {
			if ($(this).val() == '') {
				$('.uex_ccDiv').removeClass('d-none');
				$('.uex_cc').addClass('border-red');
				xl_scrollAccor('uexAccor_0', 'uex');
			}
		});
		
	}
	if (ucaValid == undefined && uexValid == undefined && uglValid == undefined && ullValid == undefined) {
		new PNotify({ text: 'Auto or Excess or General Liability or Liquor are needed to calculate the Excess Premium', delay: 1500, type: 'error' });
		return;
	}
	if (xlLimitsValid != true && ucaValid != true && uexValid != true && ueblValid != true && uelValid != true && uglValid != true && ullValid != true && usgValid != true && uothValid != true) {
		console.log('success');
	}

}