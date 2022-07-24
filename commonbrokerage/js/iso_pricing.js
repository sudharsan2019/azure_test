var iso_today = mm + '-' + dd + '-' + yyyy;

/*Start ISO Pricing Tab - Coverages*/
$(document).on('change', '#isoOCP', function() {
 	if (  $('#isoGL').prop('checked') == true && $('#isoOCP').prop('checked') == true && $('#isoLiquor').prop('checked') == false) {
		$('.isoCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL or OCP )');
		$('.isoqqCovMsg').removeAttr('style').hide();				
		$('#isoOCP').prop('checked',false);
	} else if (  $('#isoGL').prop('checked') == false && $('#isoOCP').prop('checked') == true && $('#isoLiquor').prop('checked') == true) {
		$('.isoCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select Liquor or OCP )');
		$('.isoqqCovMsg').removeAttr('style').hide();				
		$('#isoOCP').prop('checked',false);
	} else if (  $('#isoGL').prop('checked') == true && $('#isoOCP').prop('checked') == true && $('#isoLiquor').prop('checked') == true) {
		$('.isoCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL/Liquor or OCP )');
		$('.isoqqCovMsg').removeAttr('style').hide();				
		$('#isoOCP').prop('checked',false);
	}
});
	
$(document).on('change', '#isoGL, #isoLiquor', function() {
	if (  $('#isoGL').prop('checked') == true && $('#isoOCP').prop('checked') == true && $('#isoLiquor').prop('checked') == false) {
		$('.isoCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL or OCP )');
		$('.isoqqCovMsg').removeAttr('style').hide();				
		$('#isoGL').prop('checked',false);
	} else if ( $('#isoLiquor').prop('checked') == true && $('#isoOCP').prop('checked') == true && $('#isoGL').prop('checked') == false) {
		$('.isoCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select Liquor or OCP )');			
		$('.isoqqCovMsg').removeAttr('style').hide();
		$('#isoLiquor').prop('checked',false);
	}
});

$(document).on('change', '#isoGL, #isoLiquor, #isoOCP', function() {
	if ( $('#isoGL').prop('checked') == false && $('#isoLiquor').prop('checked') == false && $('#isoOCP').prop('checked') == false) {
	    $('.isoqqCovMsg').removeAttr('style').show().text('').text('( Atleast one coverage should be checked )');
	    $('.isoCovMandatoryMsg').removeAttr('style').hide();
    } else {
    	$('.isoqqCovMsg').removeAttr('style').hide();
    }
});
/*End ISO Pricing Tab - Coverages*/

$(document).on('change', '[name="isoCoverageType"]', function() {

	var this_data_id = $(this).attr('id');
	var cov_val = $(this).val();

	if ( $('#isoGL').prop('checked') == true && $('#isoLiquor').prop('checked') == false ) {

		if (this_data_id != 'isoGL' && this_data_id != 'isoOCP') {
			IsocovPopup_show('liquor_uncheck', this_data_id, cov_val);
		}
	}

	if ( $('#isoGL').prop('checked') == false && $('#isoLiquor').prop('checked') == true ) {
		
		if (this_data_id != 'isoLiquor' && this_data_id != 'isoOCP') {
			IsocovPopup_show('gl_uncheck', this_data_id, cov_val);
		}
	}

	if ( $('#isoGL').prop('checked') == false && $('#isoLiquor').prop('checked') == false && $('#isoOCP').prop('checked') == false ) {
		IsocovPopup_show('total_uncheck', this_data_id, cov_val);
	}
 
});


function IsocovPopup_show(uncheck_details, get_id_name, cov_val) {
	$('#IsocovWarningCancel').attr('data-unChk-id',get_id_name);
	$('#IsocovWarningOk').attr('data-unChk-id',get_id_name);
	$('#IsocovWarningOk').attr('data-cov-val',cov_val);
	$('.IsocovPopup').trigger('click');
}

/***** Iso warning popup cancel click event *******/
$(document).on('click', '#IsocovWarningCancel', function () {
	var uncheck_id_name = $(this).attr('data-unChk-id');
	$('#'+uncheck_id_name).click();
});

/***** Iso warning popup Ok click event *******/
$(document).on('click', '#IsocovWarningOk', function () {
	var cov_val = $(this).attr('data-cov-val');
	var uncheck_id_name = $(this).attr('data-unChk-id');
	reset_iso_prisingTab(cov_val, uncheck_id_name);
});

function reset_iso_prisingTab(cov_val, uncheck_id_name) {
	var accnt_id = accid;
	var isoCoverage_type_array = [];

    $("input[name='isoCoverageType']:checked").each( function () {
    	var value = $(this).val();
		isoCoverage_type_array.push(value);
	});

    var IsoCoverage_type = isoCoverage_type_array.toString();
    var iso_coverages = IsoCoverage_type;
    var reset_IsocovValue = "reset_all";
    

    if (IsoCoverage_type == "1" && cov_val == "2") {
    	reset_IsocovValue = 2;
    } else if (IsoCoverage_type == "2" && cov_val == "1") {
    	reset_IsocovValue = 1;
    } 

    var hiddn_length = $('.Qclass_code_coverage').length;
    
  	$(".Qclass_code_coverage").each(function() {
		var cov_typ 	= $(this).val();
		var data_rowid 	= $(this).attr('data-rowid');
		if (hiddn_length > 1) {
			
			if (cov_typ == reset_IsocovValue || reset_IsocovValue == "reset_all") {
				removeDiv_process(data_rowid, accnt_id, reset_IsocovValue) 
			}

		} else {
			if (cov_typ == reset_IsocovValue || reset_IsocovValue == "reset_all") {
           		isopricing_mail(accnt_id);
           		$('.Qclass_code_submission').val('');
	           	$('.loc_add').val('');
	           	$('.Qexposure_amount').val('');
	       		$('.class_isotext').text("");
	       		$('.iso_eff_date').val('');
	       		iso_limit_slide_reset();
	       		iso_term_reset()
	       		$('.Iso_gl_prem_rw').remove();
	       		$('.Iso_liq_prem_rw').remove();
	       		$('.Iso_ocp_prem_rw').remove();
	       		$('.Iso_total_prem').remove();
	       		$('.tp_comma').html("");
	       		$('.htmlToPdfBtn').addClass('d-none');
	       		$('.city_name_hide').show();
   				$('.cityVisible').hide();
   				$('.premium_base').text('');
   				$('.class_ctext').text("");
   				$('.loc_add_text').text("L1");

   				serialize_iso_row_no();
           	}
           	$('.remove_more_btn').hide();
		 	$('.remove_more_btn1').hide();
           	
        }
	});
}

function removeDiv_process(data_rowid, accnt_id, reset_IsocovValue) {

	var hdnLngth = $('.Qclass_code_coverage').length;
	if (hdnLngth > 1) {
		$('#cov_clsCd_row'+data_rowid).remove();
		if (data_rowid == 1) {
			$('.Iso_gl_prem_rw').remove();
		} else if (data_rowid == 2) {
			$('.Iso_liq_prem_rw').remove();
		} else {
			$('.remove_more_btn1').hide();
		}
	} else {
		isopricing_mail(accnt_id);
		$('.remove_more_btn').hide();
		$('.remove_more_btn1').hide();
		$('.Qclass_code_submission').val('');
	    $('.loc_add').val('');
	    $('.Qexposure_amount').val('');
       	$('.class_isotext').text("");
       	$('.iso_eff_date').val('');
       	iso_limit_slide_reset();
       	iso_term_reset();
       	$('.Iso_gl_prem_rw').remove();
   		$('.Iso_liq_prem_rw').remove();
   		$('.Iso_ocp_prem_rw').remove();
   		$('.Iso_total_prem').remove();
   		$('.tp_comma').html("");
   		$('.htmlToPdfBtn').addClass('d-none');
   		$('.city_name_hide').show();
   		$('.cityVisible').hide();
   		$('.premium_base').text('');
   		$('.class_ctext').text("");
   		$('.loc_add_text').text("L1");

   		serialize_iso_row_no();
	}
	
}


function iso_limit_slide_reset() {
	let my_range = $("#inline-radios1").data("ionRangeSlider");
	my_range.update({
		from: 0,	
	});
	global_limit_slider = limits[0]

	my_range.reset();

	my_range.destroy();

	ion_range_slider();
}

function iso_term_reset() {
	var switchStatus = false;
	if ($("#switchValue").is(':checked')) {
	    switchStatus = true;
	}
	if(switchStatus) {
		$('#switchValue').trigger('click');
	}
}

function isotabclick(){
	$(".Qzip_code_submission ").each( function () {
    	var data_qzipid = $(this).attr('data-qzipid');
		var this_id = $(this).attr('id');
		var city_val = $('#city_name_td'+data_qzipid+' .cityVisible').val();
		
		console.log('city_val :',city_val);
		if(city_val =="" || city_val == "undefined") {
			
			$('#'+this_id).val('').removeClass('errorBorder');
			$('#isopricing_zip_err_msg'+data_qzipid).hide();
		}
	});
}