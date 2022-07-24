
$(document).on('click', '.rqbiAdditionalAccountDetails', function() {
	if (!($(this).hasClass('collapsed'))) {
		var quote_version = $('#rqbiQuoteVersion').val();
		var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
        getspecificaccount_additionalAccountDetails(accountid,quote_version);
	} 
});

function additionalAccountDetailsRqbi(firsttime='',tria_change=''){
  localStorage.setItem('forms_focus_status', 'no');
  
  var quote_version = $('#rqbiQuoteVersion').val();
  if (firsttime == 'yes') {

  	$('#fullyEarnedDate').val('');
  	$('#rqbiTriaReject').prop('checked',true);
  	$('#rqbiTriaPercAmount').val(5);
  	$('#rqbiTriaAmount').val('');
  	$('#rqbiInspectionFee').val('');
  	$('#rqbiCommission').val('17.5');
  	$('#rqbiPaymentTerm').val('30');
  	$('#rqbiMinPremium').val('25');
  	$('#rqbiMinDeposit').val('100');
  	$('#rqbiAuditableYes').prop('checked',true);
  	$('#rqbiAuditFreq').val('Annual');
  	$('#rqbiDesigContractor').val('');
  }
  var userid = localStorage.getItem('usernumericid');
  var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var tria =  $("input[name='rqbiTria']:checked").val();
  var rqbiTriaPercAmount = $('#rqbiTriaPercAmount').val();
  var rqbiCommission = $('#rqbiCommission').val();
  var fullyEarnedDate = $('#fullyEarnedDate').val();
  var rqbiMinPremium = $('#rqbiMinPremium').val();
  var rqbiMinDeposit = $('#rqbiMinDeposit').val();
  var rqbiAuditable =  $("input[name='rqbiAuditable']:checked").val();
  if(rqbiAuditable == 1){
	var rqbiAuditFreq = $('#rqbiAuditFreq').val();
  }
  else{
	var rqbiAuditFreq = null; 
  }
  var rqbiTriaAmount = $('#rqbiTriaAmount').val();
  var rqbiInspectionFee = $('#rqbiInspectionFee').val();
  var rqbiPaymentTerm = $('#rqbiPaymentTerm').val();
  var rqbiDesigContractor = $('#rqbiDesigContractor').val();

  if (typeof(firsttime) == 'object') {
  	    
  	    firsttime = 'no';
  }

             $.ajax({
                  type:"POST",
                  url: laravel_url+"/save_additionalAccountDetails",
                  data:{  

                      userid : userid,
                      accountid : accountid,
                      quote_version : quote_version,
                      com_id : com_id,
                      tria:tria,
                      rqbiTriaPercAmount:rqbiTriaPercAmount,
                      rqbiTriaAmount:rqbiTriaAmount,
                      rqbiInspectionFee:rqbiInspectionFee,
                      rqbiCommission:rqbiCommission,
                      rqbiPaymentTerm:rqbiPaymentTerm,
                      fullyEarnedDate:fullyEarnedDate,
                      rqbiMinPremium:rqbiMinPremium,
                      rqbiMinDeposit:rqbiMinDeposit,
                      rqbiAuditable:rqbiAuditable,
                      rqbiAuditFreq:rqbiAuditFreq,
                      rqbiDesigContractor : rqbiDesigContractor,
                      firsttime : firsttime,
                      tria_change : tria_change
             
                    },
                    success:function(response){
                    	var obj = JSON.parse(response);
                    	$('#rqbiTriaPercAmount').data('triaper', rqbiTriaPercAmount);
                    	$('#rqbiTriaAmount').data('triaamount', rqbiTriaAmount);
                    	$('#rqbiInspectionFee').data('inspectionfee', rqbiInspectionFee);
                    	$('#rqbiCommission').data('commission', rqbiCommission);
                    	$('#rqbiPaymentTerm').data('paymentterm', rqbiPaymentTerm);
                    	$('#rqbiMinPremium').data('minearprem', rqbiMinPremium);
                    	$('#rqbiMinDeposit').data('minretprem', rqbiMinDeposit);
                    	$('#rqbiDesigContractor').data('desigcontract', rqbiDesigContractor);

                    	$('.rqbiAdditionalAccountDetails').removeAttr('style');
            			$('.rqbiAdditionalAccountDetails a').removeAttr('style');

                    
	                    if (obj.tria_premium !== null) {
		                    $('.rhs_tria_premium').text(obj.tria_premium);
		                } else {
		                    $('.rhs_tria_premium').text('');
		                }

	                    if (obj.commission !== null) {
		                    $('.rhs_commission').text(obj.commission);
		                } else {
		                    $('.rhs_commission').text('');
		                }

	                    if (obj.total_commission !== null) {
		                    $('.rhs_total_commission').text(obj.total_commission);
		                } else {
		                    $('.rhs_total_commission').text('');
		                }
                    	
                    	
                    },
			        complete :function(){
			            // tria_accept_reject_forms();
			           // auditable_yesno_forms();

			        }


                });
}



$(document).on('change','input[name="rqbiTria"]',function() {
	var rqbiTria = $(this).val();
	$.ajax({
        type:"POST",
        url: laravel_url+"/getBindStatus",
        data:{ rqbi_id: rqbi_id },
        success:function(response) {
        	if (response == 1) {
				if (rqbiTria == 1) {
					$('.triareject').hide();
					$('.triaaccept').show();
					get_rhs_classbuilder(accid);
					$('#rqbiTriaPercAmount').val(5); 
					$('#rqbiTriaPercAmount').removeAttr('readonly');
					$('#rqbiTriaAmount').removeAttr('readonly');
				} else {
					$('.triaaccept').hide();
					$('.triareject').show();
					get_rhs_classbuilder(accid);
					$('#rqbiTriaPercAmount').val('');
					$('#rqbiTriaPercAmount').attr('readonly',true);
					$('#rqbiTriaAmount').val('');
					$('#rqbiTriaAmount').attr('readonly',true);
				}
			} else {

				if (rqbiTria == 1) {
					$('.triareject').hide();
					$('.triaaccept').show();
					get_rhs_classbuilder(accid);

				} else {
					$('.triaaccept').hide();
					$('.triareject').show();
					get_rhs_classbuilder(accid);
				}	
			}

        }
    });
	
	
	additionalAccountDetailsRqbi('','yes');
	$('#optionalCovAccord').removeClass('show');
	$('#additionalInsuredAccord').removeClass('show');
	$('#selectFormsAccord').removeClass('show');
	$('.aiFormsAccord').addClass('collapsed');
	$('.commonFormsAccord').addClass('collapsed');
	$('.rqbi_allforms_tabs').addClass('collapsed');

	setTimeout(function() {
		$('.aiFormsAccord').click();
	    $('.commonFormsAccord').click();
	    $('.rqbi_allforms_tabs').click();
	    get_formsummary(accid, rqbi_id);
	},1000);
});


$(document).on('blur','.rqbiTriaAmount',function() {
var triaamount = $(this).val().replace(/,/g, '').replace(/^0+/, "");
  if ($(this).val(triaamount) != '' && ($(this).val(triaamount) != $(this).data('triaamount'))) {
    additionalAccountDetailsRqbi('no');
    $('#rqbiTriaAmount').removeClass('errorBorder');
  }
});

$(document).on('blur','.rqbiInspectionFee',function() {

	if ($(this).val() != '' && ($(this).val() != $(this).data('inspectionfee'))) {
		if ($(this).val().replace(/,/g, '') != 0) {
			var inspection_fee = $('.rqbiInspectionFee').val().replace(/,/g, '').replace(/^0+/, "");
			var inspection_fee_val = parseInt(inspection_fee).toLocaleString();
			$(this).val(inspection_fee_val);
		} else {
			$(this).val(0);
		}
		additionalAccountDetailsRqbi('no');
	}
});

$(document).on('blur','.rqbiCommission',function() {

	if ($(this).val() != '' && ($(this).val() != $(this).data('commission'))) {
    var comm_value = ($(this).val() * 1);
		if (comm_value <= 100) {
			additionalAccountDetailsRqbi('no');
			$('#rqbiCommission').removeClass('errorBorder');
		}
	}
});

$(document).on('blur','.rqbiPaymentTerm',function() {
	if ($(this).val() != '' && ($(this).val() != $(this).data('paymentterm'))) {
    var pay_value = $(this).val().replace(/,/g, '').replace(/^0+/, "");
    $(this).val(pay_value);
    additionalAccountDetailsRqbi('no');
		$('#rqbiPaymentTerm').removeClass('errorBorder');
	}	

});

$(document).on('blur','.rqbiMinPremium',function() {

	if ($(this).val() != '' && ($(this).val() != $(this).data('minearprem'))) {

    	var mini_premium = ($(this).val() * 1);
		if (mini_premium <= 100) {
			additionalAccountDetailsRqbi('no');
			$('#rqbiMinPremium').removeClass('errorBorder');
		}
	}
});
$(document).on('blur','.rqbiMinDeposit',function(){

	if ($(this).val() != '' && ($(this).val() != $(this).data('minretprem'))) {
	var mini_deposit = ($(this).val() * 1);
    if (mini_deposit <= 100) {
    		additionalAccountDetailsRqbi('no');
			$('#rqbiMinDeposit').removeClass('errorBorder');
		}
	}
});
$(document).on('change','input[name="rqbiAuditable"]',function(){
	var audit_frequency_check = $(this).val(); 
	if(audit_frequency_check == 0){
		$('.audit_frequency').addClass('d-none');     
	}  else{
        $('.audit_frequency').removeClass('d-none');
	}
	additionalAccountDetailsRqbi('no');
	$('#optionalCovAccord').removeClass('show');
	$('#additionalInsuredAccord').removeClass('show');
	$('#selectFormsAccord').removeClass('show');
	$('.aiFormsAccord').addClass('collapsed');
	$('.commonFormsAccord').addClass('collapsed');
	$('.rqbi_allforms_tabs').addClass('collapsed');
	$('.aiFormsAccord').click();
    $('.commonFormsAccord').click();
    $('.rqbi_allforms_tabs').click();
});
$(document).on('change','.rqbiAuditFreq',function() {

	if ($(this).val() != '') {
		additionalAccountDetailsRqbi('no');
	}
});

$(document).on('blur','.rqbiDesigContractor',function() {

	if ($(this).val() != '' && ($(this).val() != $(this).data('desigcontract'))) {
		additionalAccountDetailsRqbi('no');
	}
});


function getAdditionalAcctPremium() { 
	
	var rqbiTriaPercAmount = $('#rqbiTriaPercAmount').val();
	var total_premium = $('.rhs_total_premium').text()
    total_premium = total_premium.replace(/[,$]/g,'');
	var addPremium = (parseInt(total_premium) * parseFloat(rqbiTriaPercAmount)) / 100; 
	addPremium = Math.round(addPremium);
	if (isNaN(addPremium)) {
		$('#rqbiTriaAmount').val('');
	} else {
		$('#rqbiTriaAmount').val(addPremium);
	}
	additionalAccountDetailsRqbi('no');
} 

$(document).on('keyup','.rqbiTriaPercAmount',function(){
  var triaPercAmount = $(this).val().replace(/,/g, '').replace(/^0+/, "");

	if ($(this).val(triaPercAmount) > 100 || $(this).val(triaPercAmount) < 0) {
    $(this).addClass('errorBorder');
    $('.invalid_triaper').show();
  } else {
    $('.rqbiAdditionalAccountDetails').removeAttr('style');
        $('.rqbiAdditionalAccountDetails a').removeAttr('style');
    if ($(this).val(triaPercAmount) != '' && ($(this).val(triaPercAmount) != $(this).data('triaper'))) {
      $('#rqbiTriaPercAmount').removeClass('errorBorder');
          getAdditionalAcctPremium();
    }
    $(this).removeClass('errorBorder');
    $('.invalid_triaper').hide();
  }
});

$(document).on('keyup','.rqbiCommission',function(){

	if ($(this).val() > 100 || $(this).val() < 0) {
		$(this).addClass('errorBorder');
		$('.invalid_commission').show();
	} else {
		$('.rqbiAdditionalAccountDetails').removeAttr('style');
        $('.rqbiAdditionalAccountDetails a').removeAttr('style');
		$(this).removeClass('errorBorder');
		$('.invalid_commission').hide();
	}

});

$(document).on('keyup','.rqbiMinPremium',function() {

	if ($(this).val() > 100 || $(this).val() < 0) {
		$(this).addClass('errorBorder');
		$('.invalid_minearprem').show();
	} else {
		$('.rqbiAdditionalAccountDetails').removeAttr('style');
        $('.rqbiAdditionalAccountDetails a').removeAttr('style');
		$(this).removeClass('errorBorder');
		$('.invalid_minearprem').hide();
	}

});

$(document).on('keyup','.rqbiMinDeposit',function(){

	if ($(this).val() > 100 || $(this).val() < 0) {
		$(this).addClass('errorBorder');
		$('.invalid_minretprem').show();
	} else {
		$('.rqbiAdditionalAccountDetails').removeAttr('style');
        $('.rqbiAdditionalAccountDetails a').removeAttr('style');
		$(this).removeClass('errorBorder');
		$('.invalid_minretprem').hide();
	}

});


function getspecificaccount_additionalAccountDetails(accid='',quote_version=''){

	$('.rqbiAdditionalAccountDetails').removeAttr('style');
	$('.rqbiAdditionalAccountDetails a').removeAttr('style');

    $.ajax({
        url: laravel_url+"/getspecificaccount_additionalAccountDetails",
        type:'post',
        data: {
            accid:accid,
            quote_version : quote_version
        },
        success:function(response) {


            var n = response.localeCompare('null');

            if (n == '0') {

                $('#fullyEarnedDate').val('');
                additionalAccountDetailsRqbi('yes');

            } else {

                var obj = jQuery.parseJSON(response);

                if (obj.bind_status == '1') {

                    if (obj.tria == '1') {

                    		 $('.triareject').hide();
    					 	 $('.triaaccept').show();

                            setTriaValues(obj);

                    } else {

                            $('#rqbiTriaPercAmount').val('');
                            $('#rqbiTriaPercAmount').attr('readonly',true);
                            $('#rqbiTriaAmount').val('');
                            $('#rqbiTriaAmount').attr('readonly',true);    
                            $('#rqbiTriaAccept').removeAttr('checked');
                            $('#rqbiTriaReject').attr('checked',true);
                            $('.triaaccept').hide();
    						$('.triareject').show();

                    }

                } else {

                    if (obj.tria == '1') {

                    	 $('.triareject').hide();
    					 $('.triaaccept').show();

                        setTriaValues(obj);

                    } else {

                        $('#rqbiTriaPercAmount').val(obj.tria_percentage);
                        $('#rqbiTriaPercAmount').attr("data-triaper",obj.tria_percentage);
                        $('#rqbiTriaPercAmount').removeAttr('readonly');
                        $('#rqbiTriaAmount').removeAttr('readonly');
                        $('#rqbiTriaAccept').removeAttr('checked');
                        $('#rqbiTriaReject').attr('checked',true);
                        $('.triaaccept').hide();
    					$('.triareject').show();
                    }

                }
                $('#rqbiTriaAmount').val(obj.tria_premium);
                $('#rqbiTriaAmount').attr('data-triaamount',obj.tria_premium);
                $('#rqbiInspectionFee').val(obj.inspection_fee.toLocaleString());
                $('#rqbiInspectionFee').attr("data-inspectionfee",obj.inspection_fee);
                $('#rqbiCommission').val(obj.commission_percent);
                $('#rqbiCommission').attr("data-commission",obj.commission_percent);
                $('#rqbiPaymentTerm').val(obj.payment_term);
                $('#rqbiPaymentTerm').attr("data-paymentterm",obj.payment_term);
                var fully_earned_date = obj.fully_earned_date;
                if (fully_earned_date == '0000-00-00' || fully_earned_date == null) {
                    $('#fullyEarnedDate').val('');
                } else {
                    fully_earned_date_spl = fully_earned_date.split('-');
                    fully_earned_date = fully_earned_date_spl[1]+'-'+fully_earned_date_spl[2]+'-'+fully_earned_date_spl[0];
                    $('#fullyEarnedDate').val(fully_earned_date);
                }
                $('#rqbiMinPremium').val(obj.minimum_earned_premium);
                $('#rqbiMinPremium').attr("data-minearprem",obj.minimum_earned_premium);
                $('#rqbiMinDeposit').val(obj.minimum_deposit);
                $('#rqbiMinDeposit').attr("data-minretprem",obj.minimum_deposit);
                if (obj.auditable == '1') {
                    $('#rqbiAuditableYes').attr('checked',true);
					$('#rqbiAuditFreq').val(obj.audit_frequency);
					$('.audit_frequency').removeClass('d-none');     
                } else { 
                    $('#rqbiAuditableNo').attr('checked',true);
					$('.audit_frequency').addClass('d-none');     
                }
                
                $('#rqbiDesigContractor').val(obj.design_contract);
                $('#rqbiDesigContractor').attr("data-desigcontract",obj.design_contract);
            }
        }
    });

    return accid;
}


function setTriaValues(obj='') {
  
    $('#rqbiTriaPercAmount').removeAttr('readonly');
    $('#rqbiTriaAmount').removeAttr('readonly');
    $('#rqbiTriaPercAmount').val(obj.tria_percentage);
    $('#rqbiTriaPercAmount').attr("data-triaper",obj.tria_percentage);  
    $('#rqbiTriaReject').removeAttr('checked');
    $('#rqbiTriaAccept').attr('checked',true);
    
}


$(document).on('keypress','.rqbiMinDeposit, .rqbiMinPremium, .rqbiCommission, .rqbiTriaPercAmount',function(e) {
        var character = String.fromCharCode(e.keyCode)
        var newValue = this.value + character;
        if (isNaN(newValue) || parseFloat(newValue) * 100 % 1 > 0) {
            e.preventDefault();
            return false;
		}
});