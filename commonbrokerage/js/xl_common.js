$(document).on('keyup', '.xl_number', function() {
	var inputVal = $(this).val();
	firstChar = inputVal.charAt(0);
	
	if($.isNumeric(firstChar)) {
		if (inputVal.includes("k")) {
			if (inputVal.length <= 16) {
				$(this).val(inputVal.replace("k", "000"));  
			}
		}
		if (inputVal.includes("K")) {
			if(inputVal.length <= 16) {
				$(this).val(inputVal.replace("K", "000"));
			}
		}
		if (inputVal.includes("m")) {
			if(inputVal.length <= 14) {
				$(this).val(inputVal.replace("m", "000000"));
			}
		}
		if (inputVal.includes("M")) {
			if(inputVal.length <= 14) {
				$(this).val(inputVal.replace("M", "000000"));
			}
		}
		if (inputVal.includes("b")) {
			if(inputVal.length <= 8) {
				$(this).val(inputVal.replace("b", "000000000"));
			}
		}
		if (inputVal.includes("B")) {
			if(inputVal.length <= 8) {
				$(this).val(inputVal.replace("B", "000000000"));
			}
		}
		if (inputVal.includes("t")) {
			if(inputVal.length <= 4) {
				$(this).val(inputVal.replace("t", "000000000000"));
			}
		}
		if (inputVal.includes("T")) {
			if(inputVal.length <= 4) {
				$(this).val(inputVal.replace("T", "000000000000"));
			}
		}
	}
	inputVal = $(this).val();
	var isValid = /^[0-9,.]*$/.test(inputVal);
	if (isValid == false) {
		var inputVal = numberonly(inputVal);
	}
	if ($(this).hasClass('rqbiFinalRate')) {
		var moneyval = credit_debit_moneyformat(inputVal);
	} else {
		var moneyval = moneyformat(inputVal);
	}
	$(this).val(moneyval);
});

/* $('input[type=radio][name=xlType]').change(function() {
	if (this.value == 'excess') {
		$('.attachPtDiv').removeClass('d-none');
	}
	else {
		$('.attachPtDiv').addClass('d-none');
	}
});
 */
function supportChange(thisValue) {
	var excess;
	var thisId = thisValue.attr('id');
	$('#'+thisId).prop('checked', false);
	if (thisId == 'supportEx') {
		excess = "Supported Excess"; 
	} else {
		excess = "Unsupported Excess";
		
	}
	$('.switchAlert_support').remove();
	$('.support_unsupportDiv').append('<div class="alert alert-warning col-5 switchAlert_support shadow-lg text-center" role="alert"><div class="alert-header d-inline"> All the data will be erased in RQBI if you switch the type <b>'+excess+'</b>?</div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes mr-1" onclick="support_yesFun('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo" onclick="support_noFun('+"'"+thisId+"'"+');"> No </button></div></div>');
}

function support_yesFun(thisId) {
	$('#'+thisId).prop('checked', true);
	$('.switchAlert_support').remove();
	if (thisId == 'unSupportEx') {
		xl_supported_to_unsupported();
		xl_uctAppend('show');
		$('.xl_submisNoDiv').addClass('d-none');
		$('.xl_submisNoDiv').remove();   
	} else {
	    updatequotashare();
	    clear_coverages(1);
		xl_uctAppend('hide');
		$('.support_unsupportDiv').after('<div class="form-row xl_submisNoDiv mt-2 mb-4"><label class="col-form-label fontBold mr-1"> Submission # </label> <div class="col-auto"><input type="text" class="form-control form-control-sm border-primary xl_submissionNo" ></div> </div>');
	}

}

function support_noFun(thisId) {
	if (thisId == 'supportEx') {
		$('#unSupportEx').prop('checked', true);
	} else if (thisId == 'unSupportEx') {
		$('#supportEx').prop('checked', true);
	}
	$('.switchAlert_support').remove();
}

function quota_share_addFunction(share_no){
	var quoteTable = $('.xlQuoteTable tbody tr:last-child');

	var quote_addTr = '<tr data-share="'+share_no+'" id="quota_share_'+share_no+'" class="quota_share_row quota_share_table"  data-rid=""><td> <input type="text" name="" class="form-control form-control-sm xlQta_nameIns" placeholder="Name of Co-Insurer" id="xlQta_nameIns_'+share_no+'"></td><td> <input type="text" name="" class="form-control form-control-sm xlQta_policyNo" placeholder="Policy #" id="xlQta_policyNo_'+share_no+'"></td><td><div class="input-group input-group-sm"><input type="text" name="" class="form-control form-control-sm xlQta_share xl_number" id="xlQta_share_'+share_no+'" onkeyup="xlPerc_valid($(this));" maxlength="3"><div class="input-group-addon text-center"><i class="fa fa-percent mt-2"></i></div></div></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><select class="form-control form-control-sm xlQta_occurLt" id="xlQta_occurLt_'+share_no+'" onchange="xlOtherSelect($(this));"><option value="0"> Please select </option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12,000,000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></td><td><div class="input-group input-group-sm"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><select class="form-control form-control-sm xlQta_aggreLt" id="xlQta_aggreLt_'+share_no+'"  onchange="xlOtherSelect($(this));"><option value="0"> Please select </option><option value="1000000"> 1,000,000</option><option value="2000000"> 2,000,000</option><option value="3000000"> 3,000,000</option><option value="4000000"> 4,000,000</option><option value="5000000"> 5,000,000</option><option value="6000000"> 6,000,000</option><option value="7000000"> 7,000,000</option><option value="8000000"> 8,000,000</option><option value="9000000"> 9,000,000</option><option value="10000000"> 10,000,000</option><option value="11000000"> 11,000,000</option><option value="12000000"> 12,000,000</option><option value="13000000"> 13,000,000</option><option value="14000000"> 14,000,000</option><option value="15000000"> 15,000,000</option><option value="other"> Other</option> </select></div></div></td><td> <button type="button" class="btn btn-xs btn-danger xlRemovCoInsBtn ml-2" data-toggle="tooltip" data-placement="right" title="Remove"> <i class="fa fa-minus"></i> </button> </td></tr>';

	quoteTable.after(quote_addTr);
	$('[data-toggle="tooltip"]').tooltip();
}

function xlAddCoInsBtn(value){

	var quotaPlus = $('.quota_share_row').length;    console.log(quotaPlus); 
	if (quotaPlus > 0 && quotaPlus < 4) {    console.log(quotaPlus);	 console.log("<br>");
	var share_no = $('.xlQuoteTable tbody tr:last-child').attr('data-share'); 
	share_no++;   
	quota_share_addFunction(share_no);
	$(".xlQuoteTable").attr('data-retreivequota', 1);
	xl_add_quota_share({}, share_no);

 
} else {
	new PNotify({ title: 'Error', text: 'Cannot add more than 3 coinsurer', delay: 1000, type: 'error' });
}


}



$(document).on('click','.xlRemovCoInsBtn',function() {
	$(this).closest('tr').remove();
	var share_no = $(this).closest('.quota_share_row').attr('data-share'); 
	var delete_quota = $(this).closest('.quota_share_row').attr('data-rid');      console.log(delete_quota); 
	xl_del_quota({is_active: 0},delete_quota);
	//quotaPlus--;
});


function xlOtherSelect(thisSelect) { 
	var thId = thisSelect.attr('id');
	var thId_accor = thId.split('_').slice(0,2).join('_');
	if (thisSelect.val() == 'other') {
		thisSelect.closest('.input-group').after('<div class="input-group input-group-sm mt-1"><div class="input-group-addon bg-light text-center"> <i class="fa fa-usd mt-2"></i></div> <div><input type="text" class="form-control form-control-sm '+thId_accor+'_other '+thId+'_other xl_number" id="'+thId+'_other" maxlength="19"></div></div>');
	} else {  
		$('.'+thId+'_other').closest('.input-group').remove();
	}
}

function dateNextYear(datVal) {
	return new Date(datVal.getFullYear()+1, datVal.getMonth(), datVal.getDate()); 
}

function expDateSet(thisValue, cov, nxtYear, minDate) {
	thisValue.closest('.'+cov+'Accor').find('.'+cov+'_expDt').datepicker('setStartDate', '');
	thisValue.closest('.'+cov+'Accor').find('.'+cov+'_expDt').datepicker('setDate', nxtYear);
	thisValue.closest('.'+cov+'Accor').find('.'+cov+'_expDt').datepicker('setStartDate', minDate);
}

function xlPerc_valid(thisValue) {
	if(thisValue.val() > 100) {
		thisValue.val('');
	}
}

function xlTypeChange(thisValue) {
	var type;
	var thisId = thisValue.attr('id');
	$('#'+thisId).prop('checked', false);
	if (thisId == 'xlTypeLead') {
		type = "lead"; 
	} else {
		type = "excess";
	}
	$('.switchAlert_type').remove();
	thisValue.closest('.row').after('<div class="alert alert-warning col-5 switchAlert_type shadow-lg text-center" role="alert"><div class="alert-header d-inline"> All the data will be erased in RQBI if you switch the type <b>'+type+'</b>?</div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success switchYes_type mr-1" onclick="xlType_yes('+"'"+thisId+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger switchNo_type" onclick="xlType_no('+"'"+thisId+"'"+');"> No </button></div></div>');
}

function xlType_yes(thisId) {
	$('#'+thisId).prop('checked', true);
	$('.switchAlert_type').remove();
	if (thisId == 'xlTypeLead') {
		$(".attachPtDiv").addClass('d-none');
	} else {
		$(".attachPtDiv").removeClass('d-none');
	}
}

function xlType_no(thisId) {
	if (thisId == 'xlTypeLead') {
		$('#xlTypeExcess').prop('checked', true);
		$(".attachPtDiv").removeClass('d-none');
	} else {
		$('#xlTypeLead').prop('checked', true);
		$(".attachPtDiv").addClass('d-none');
	}
	$('.switchAlert_type').remove();
}

function xl_scrollAccor(thisId, cov, act) {
	if (act == 'up') {
		$('html, body').animate({
			scrollTop: $('#'+thisId).closest('.'+cov+'Accor').prev('.'+cov+'Accor').offset().top-120
		}, 500);
	} else if (act == 'down') {	
		$('html, body').animate({
			scrollTop: thisId.next('.'+cov+'Accor').offset().top-120
		}, 500);
	} else {
		$('html, body').animate({
			scrollTop: $('#'+thisId).closest('.'+cov+'Accor').offset().top-120
		}, 500);
	}
}

function accor_deleteNo(thisId) {

    $('#'+thisId).find('.delAlert').remove();
}

function xl_emptyValid(thisValue, val) {
    thisValue.find('.'+val).addClass('border-red');
}

function xl_emptyReset(thisValue) {
	thisValue.removeClass('border-red');
}

function cov_uncheck(thisValue, cov, covName) {
	thisValue.checked = true;
    $('.xlCov_delAlert').remove();
    $('.xl_allCovDiv').after('<div class="alert alert-warning col-7 xlCov_delAlert shadow-lg text-center mt-2" role="alert"><div class="alert-header d-inline"> All the data will be erased in this coverage. If you want to <b> remove '+covName+'? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success covAlertDel_yes mr-1" onclick="covDel_yes('+"'"+thisValue.id+"'"+', '+"'"+cov+"'"+');"> Yes </button> <button type="button" class="btn btn-xs btn-danger" onclick="covAlert_remove();"> No </button></div></div>');
}

function covDel_yes(thisId, cov) {
    if (cov == 'Uca') {
    	$("#xlAutoLayerPrem").html('');
    	xl_delete_uca({is_checked: 1});	
    } else if (cov == 'exces') {
        xl_delete_uex({is_checked: 1});
    } else if (cov == 'Uebl') {
        xl_delete_uebl({is_checked: 1});
    } else if (cov == 'Uel') {
		xl_delete_uel({is_checked: 1});
    } else if (cov == 'Ugl') {
        delete_all_ugl();
    } else if (cov == 'Ull') {
        delete_all_ull();
    } else if (cov == 'stopGap') {
        xl_delete_usg({is_checked: 1});
    } else if (cov == 'other') {
        xl_delete_uoth({is_checked: 1 });
    }
    $('#xl'+cov+'_div').html('');
    $('#'+thisId).prop('checked', false);
    covAlert_remove();
    new PNotify({ text: 'Removed', delay: 1000, type: 'error' });
}

function covAlert_remove() {
	$(".xlCov_delAlert").remove();
}

function covAddBtn_toggle(thisValue, cov , covHead) {
	var covHead_len = $('.'+covHead).length;
	var covClose_len = $('.'+covHead+'.collapsed').length;
	if (covHead_len - covClose_len >= 1) {
		$('.xl_add'+cov).removeClass('d-none');
	} else {
		$('.xl_add'+cov).addClass('d-none');
	}
}

function xl_alert(type, txt) {
	txt = (txt ? txt : '');
	if (type == 'empty') {
		new PNotify({ title: 'Warning', text: 'Fill '+txt+' mandatory fields', delay: 1000, type: 'Warning' });	
	} else if (type == 'success') {
		new PNotify({ title: 'Success', text: 'Added successfully', delay: 1000, type: 'success' });
	} else if (type == 'minimum_one') {
		new PNotify({ text: 'Minimum one required', delay: 1000, type: 'error' });
	} else if (type == 'delete') {
		new PNotify({ text: 'Deleted', delay: 500, type: 'error' });
	}
}

$.post("xlLayerPrem_main.php", function(postresult) {
	$("#xlLayerPrem_mainDiv").html('').append(postresult);
});

function accorOpen(acc) {
	acc.find('.card-header').attr('aria-expanded', true);
	acc.find('.collapse').addClass('show');
}

