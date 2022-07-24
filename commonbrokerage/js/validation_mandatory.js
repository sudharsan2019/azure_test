function ContinuetofulQuote_validation_Check(){

	var mandatory_chk_sts = true;

    /*Rqbi Effective and Expiry Date section */
    var mandatory_chk_sts_rdv = checkRqbiDateValidation();
    console.log("Date : "+mandatory_chk_sts_rdv);

    /*Location Builder section */
	var mandatory_chk_sts_lc = locationRow_emptyCheck();
    mandatory_chk_sts = mandatory_chk_sts_rdv;
    console.log("loction fields : "+mandatory_chk_sts_lc);
    if (!mandatory_chk_sts_lc) {
        $('.locDetAccord').attr('style','border:1px solid #ed4613;');
        $('.locDetAccord a').attr('style','color: #ed4613;');
        mandatory_chk_sts = mandatory_chk_sts_lc;
    } else {
        $('.locDetAccord').removeAttr('style');
        $('.locDetAccord a').removeAttr('style');
    }

    /*Coverage and Limit section */
    var mandatory_chk_sts_cv = cov_mandatory_check();
    console.log("Coverage fields : "+mandatory_chk_sts_cv);
    if (!mandatory_chk_sts_cv) {
        $('.covLimitAccordHead').attr('style','border: 1px solid #ed4613;');
        $('.covLimitAccordHead a').attr('style','color: #ed4613;');
        mandatory_chk_sts = mandatory_chk_sts_cv;
    } else {
        $('.covLimitAccordHead').removeAttr('style');
        $('.covLimitAccordHead a').removeAttr('style');
    }
	
    /*Class builder section */
	var mandatory_chk_sts_cb = classbuilder_emptyCheck();
    console.log("Class build : "+mandatory_chk_sts_cb);
	if (!mandatory_chk_sts_cb) {
		$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
        $('.cbAccordHeader a').attr('style','color: #ed4613;');
		mandatory_chk_sts = mandatory_chk_sts_cb;
	} else {
		$('.cbAccordHeader').removeAttr('style');
		$('.cbAccordHeader a').removeAttr('style');
	}
    
    $('.compositeRateDiv').show();

    /*Composite Rating*/
    var cb_disabled = $('.cbCompRating').hasClass('disabled');
    var composite_div = $('.compositeRateDiv').css('display');
    var comp_length = $('tr.comprow').length;
    if (cb_disabled == false && composite_div == "block" && comp_length > 0) {
        var mandatory_chk_sts_cr = compositerating_mandatoryField_chk();
        console.log("comp rating : "+mandatory_chk_sts_cr);
        if (!mandatory_chk_sts_cr) {
            $('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
            $('.compositeRateDiv').show();
            mandatory_chk_sts = mandatory_chk_sts_cr;
        } else {
            $('.cbAccordHeader').removeAttr('style');
            $('.cbAccordHeader a').removeAttr('style');
        }
    }

    /*Graduated Rating*/
    var gr_disabled = $('#AddGraduatedRating').hasClass('disabled');
    var gr_enable_class = $('#AddGraduatedRating').hasClass('enable_grad_rating');
    var ccode_id = $('#class_code_id').val();
    var crcode_id = $('.graduatedRow').first().attr('data-rid');
    if (gr_disabled == true && gr_enable_class == true && ccode_id != '' && crcode_id != 0 && crcode_id != undefined )  {
        var mandatory_chk_sts_gr = graduatedrating_mandatoryField_chk();
        console.log("grad rating : "+mandatory_chk_sts_gr);
        if (!mandatory_chk_sts_gr) {
            $('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
            mandatory_chk_sts = mandatory_chk_sts_gr;
        } else {
            $('.cbAccordHeader').removeAttr('style');
            $('.cbAccordHeader a').removeAttr('style');
        }
    }
	
	return mandatory_chk_sts
}


function remove_errorHighlited_accordion () {

    $('.locDetAccord').removeAttr('style');
    $('.locDetAccord a').removeAttr('style');
    $('.covLimitAccordHead').removeAttr('style');
    $('.covLimitAccordHead a').removeAttr('style');
    $('.cbAccordHeader').removeAttr('style');
    $('.cbAccordHeader a').removeAttr('style');
    $('.mandatory_fullcode').hide();
    
    /*Class builder section */
    $('.cbClasscode').removeClass('errorBorder');
    $('.cbLocSelect').removeClass('errorBorder');
    $('.rqbiExposure').removeClass('errorBorder');
    $('.rqbiFinalRate').removeClass('errorBorder');
    $('.rqbiPremium').removeClass('errorBorder');
}


function enabled_continueTofullQuote() {
    $('#cbContinueFullquote').removeClass('accordDisabled');
}


function tpa_validationCheck(){

    var rqbiTpaSelect = $('#rqbiTpaSelect').val();
    var rqbiTpaAddress = $('#rqbiTpaAddress').val();
    var rqbiTpaContactName = $('#rqbiTpaContactName').val();
    var rqbiTpaMobileNo = $('#rqbiTpaMobileNo').val();
    var rqbiTpaEmailid = $('#rqbiTpaEmailid').val();

    var returnVal = true;

    var rqbiDeductibleType =  $("input[name='rqbiDeductibleInsured']:checked").val();
    
    if($("#rqbiSelfInsured").prop("checked") == true){

        if(rqbiDeductibleType == 2) {

            if(rqbiTpaSelect == "0" || rqbiTpaSelect == "New"){
                $('#rqbiTpaContactName').css("border", "");
                $('#rqbiTpaMobileNo').css("border", "");
                $('#rqbiTpaEmailid').css("border", "");
                $('#rqbiTpaAddress').css("border", "");
                $('.rqbiTpaMobileNo_append_asterik').text('');
                $('.rqbiTpaContactName_append_asterik').text('');
                $('.rqbiTpaEmailid_append_asterik').text('');
                $('.rqbiTpaAddress_append_asterik').text('');
                returnVal = true;
            }else{
                $('.covLimitAccordHead').removeAttr('style');
                $('.covLimitAccordHead a').removeAttr('style');

                if (rqbiTpaAddress !="" && rqbiTpaContactName !="" && rqbiTpaMobileNo !="" && rqbiTpaEmailid !="") {
                    $('#rqbiTpaContactName').css("border", "");
                    $('#rqbiTpaMobileNo').css("border", "");
                    $('#rqbiTpaEmailid').css("border", "");
                    $('#rqbiTpaAddress').css("border", ""); 
                    $('.rqbiTpaMobileNo_append_asterik').text('');
                    $('.rqbiTpaContactName_append_asterik').text('');
                    $('.rqbiTpaEmailid_append_asterik').text('');
                    $('.rqbiTpaAddress_append_asterik').text('');

                    returnVal = true;

                } else {

                    $('.covLimitAccordHead').attr('style','border: 1px solid #ed4613;');
                    $('.covLimitAccordHead a').attr('style','color: #ed4613;');

                    if (rqbiTpaContactName == '') {
                        $('#rqbiTpaContactName').css("border", "1px solid red");
                        $('.rqbiTpaContactName_append_asterik').text('').text("*");
                    } else {
                        $('#rqbiTpaContactName').css("border", "");
                        $('.rqbiTpaContactName_append_asterik').text('');
                    }

                    if (rqbiTpaMobileNo == '') {
                        $('#rqbiTpaMobileNo').css("border", "1px solid red");
                        $('.rqbiTpaMobileNo_append_asterik').text('').text("*");
                    } else {
                        $('#rqbiTpaMobileNo').css("border", "");
                        $('.rqbiTpaMobileNo_append_asterik').text('');
                    }

                    if (rqbiTpaEmailid == '') {
                        $('#rqbiTpaEmailid').css("border", "1px solid red");                        
                        $('.rqbiTpaEmailid_append_asterik').text('').text("*");
                    } else {
                        $('#rqbiTpaEmailid').css("border", "");
                        $('.rqbiTpaEmailid_append_asterik').text('');
                    }

                    if (rqbiTpaAddress == '') {
                        $('#rqbiTpaAddress').css("border", "1px solid red");
                        $('.rqbiTpaAddress_append_asterik').text('').text("*");
                    } else {
                        $('#rqbiTpaAddress').css("border", "");
                        $('.rqbiTpaAddress_append_asterik').text('');
                    }
                    
                    returnVal = false;
                    //new PNotify({ title: 'Error', text: 'Please Enter the Value', delay: 2000, type: 'error' });
                }
            }
        }
    }
    return returnVal;
}


function checkRqbiDateValidation(){
    var eff_dt = $('#rqbieffdate').val();
    var exp_dt = $('#rqbiexpdate').val();
    var effct_dtjs = new Date($('#rqbieffdate').val());
    var exp_dtjs = new Date(exp_dt);

    var mandatory_condition = true;

    if(eff_dt == '') {
        $('#rqbieffdate').addClass('errorBorder');
        $('#expDateValid').hide();
        $('#effDateEmptyValid').show(); 
        mandatory_condition = false;
    } else if(exp_dt == '') {
        $('#rqbiexpdate').addClass('errorBorder');
        $('#expDateValid').text('Please Enter Expiry Date');
        $('#expDateValid').show();
        $('#effDateEmptyValid').hide();
        mandatory_condition = false;
    } else {
        $('#rqbieffdate').removeClass('errorBorder');
        $('#rqbiexpdate').removeClass('errorBorder');
        $('#effDateEmptyValid').hide();
        $('#expDateValid').hide();
        mandatory_condition = true;
    }

    return mandatory_condition;

}



function checkAdditionalAccountValid(){

    var rqbiTriaPercAmount = $('#rqbiTriaPercAmount').val();
    var rqbiTriaAmount = $('#rqbiTriaAmount').val();
    var rqbiCommission = $('#rqbiCommission').val();
    var rqbiPaymentTerm = $('#rqbiPaymentTerm').val();
    var rqbiMinPremium = $('#rqbiMinPremium').val();
    var rqbiMinDeposit = $('#rqbiMinDeposit').val();

    mandatory_cond = true;
    if((rqbiTriaPercAmount == '' || rqbiTriaAmount == '' || rqbiCommission == '' || rqbiPaymentTerm == '' || rqbiMinPremium == '' || rqbiMinDeposit == '')) {

            $('.rqbiAdditionalAccountDetails').css('border', '1px solid #ed4613');
            $('.rqbiAdditionalAccountDetails a').css('color', '#ed4613');
            $('#additionalAccAccord').addClass('show');
    } else {

            $('.rqbiAdditionalAccountDetails').removeAttr('style');
            $('.rqbiAdditionalAccountDetails a').removeAttr('style');
    }
    if(rqbiTriaPercAmount == '') {
        $('#rqbiTriaPercAmount').addClass('errorBorder');
        mandatory_cond = false;
        console.log('coverages - tria_validation');
        //  $('html, body').animate({
        //       scrollTop: $('#rqbiTriaPercAmount').offset().top-100
        // }, 1000);
    } else {

        if($('#rqbiTriaPercAmount').val() > 100) {
            mandatory_cond = false;
            $('.rqbiAdditionalAccountDetails').css('border', '1px solid #ed4613');
            $('.rqbiAdditionalAccountDetails a').css('color', '#ed4613');
            $('#rqbiTriaPercAmount').addClass('errorBorder');
            $('.invalid_triaper').show();
        } else {
            $('.rqbiAdditionalAccountDetails').removeAttr('style');
            $('.rqbiAdditionalAccountDetails a').removeAttr('style');
            $('#rqbiTriaPercAmount').removeClass('errorBorder');
            $('.invalid_triaper').hide();
        }
    }

    if(rqbiTriaAmount == '') {
        $('#rqbiTriaAmount').addClass('errorBorder');
        mandatory_cond = false;
        $('html, body').animate({
              scrollTop: $('#rqbiTriaAmount').offset().top-100
        }, 1000);
    } 
    if(rqbiCommission == '') {
        $('#rqbiCommission').addClass('errorBorder');
        mandatory_cond = false;
        $('html, body').animate({
              scrollTop: $('#rqbiCommission').offset().top-100
        }, 1000);
    } else {

        if($('#rqbiCommission').val() > 100){
            mandatory_cond = false;
            $('.rqbiAdditionalAccountDetails').css('border', '1px solid #ed4613');
            $('.rqbiAdditionalAccountDetails a').css('color', '#ed4613');
            $('#rqbiCommission').addClass('errorBorder');
            $('.invalid_commission').show();
        } else {
            $('.rqbiAdditionalAccountDetails').removeAttr('style');
            $('.rqbiAdditionalAccountDetails a').removeAttr('style');
            $('#rqbiCommission').removeClass('errorBorder');
            $('.invalid_commission').hide();
        }
    }
    if(rqbiPaymentTerm == '') {
        $('#rqbiPaymentTerm').addClass('errorBorder');
        mandatory_cond = false;
        $('html, body').animate({
              scrollTop: $('#rqbiPaymentTerm').offset().top-100
        }, 1000);
    } 
    if(rqbiMinPremium == '') {
        $('#rqbiMinPremium').addClass('errorBorder');
        mandatory_cond = false;
        $('html, body').animate({
              scrollTop: $('#rqbiMinPremium').offset().top-100
        }, 1000);
    } else {

        if($('#rqbiMinPremium').val() > 100){
            mandatory_cond = false;
            $('.rqbiAdditionalAccountDetails').css('border', '1px solid #ed4613');
            $('.rqbiAdditionalAccountDetails a').css('color', '#ed4613');
            $('#rqbiMinPremium').addClass('errorBorder');
            $('.invalid_minearprem').show();
        } else {
            $('.rqbiAdditionalAccountDetails').removeAttr('style');
            $('.rqbiAdditionalAccountDetails a').removeAttr('style');
            $('#rqbiMinPremium').removeClass('errorBorder');
            $('.invalid_minearprem').hide();
        }

    }
    if(rqbiMinDeposit == '') {
        $('#rqbiMinDeposit').addClass('errorBorder');
        mandatory_cond = false;
        $('html, body').animate({
              scrollTop: $('#rqbiMinDeposit').offset().top-100
        }, 1000);
    } else {

        if($('#rqbiMinDeposit').val() > 100){
            mandatory_cond = false;
            $('.rqbiAdditionalAccountDetails').css('border', '1px solid #ed4613');
            $('.rqbiAdditionalAccountDetails a').css('color', '#ed4613');
            $('#rqbiMinDeposit').addClass('errorBorder');
            $('.invalid_minretprem').show();
        } else {
            $('.rqbiAdditionalAccountDetails').removeAttr('style');
            $('.rqbiAdditionalAccountDetails a').removeAttr('style');
            $('#rqbiMinDeposit').removeClass('errorBorder');
            $('.invalid_minretprem').hide();
        }

    }

    return mandatory_cond;
}