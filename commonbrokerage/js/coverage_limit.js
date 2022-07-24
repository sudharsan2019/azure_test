/****** Coverage and Limit Code ************/
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

$(document).on('change', '#rqbiEachOccur', function() {
	var rqbiEachOccur = $('#rqbiEachOccur').val();
	var rqbiGeneralAggr = $('#rqbiGeneralAggr').val();
	
	if(rqbiEachOccur <= rqbiGeneralAggr){
		add_coverage_limit (rqbiEachOccur,'each_occurence');
		$('#rqbiOcpEachOccur').val('1000000');
		$('#each_errgl').remove();
		$('#rqbiEachOccur').removeAttr('style');
		$('#gnrl_errgl').remove();
		$('#rqbiGeneralAggr').removeAttr('style');
	} else {
		$('#each_errgl').remove();
		$('#rqbiEachOccur').after('<span id="each_errgl" style="color:red; padding-left:6px;">Must be lesser than or equal to General Aggregate</span>')
		$('#rqbiEachOccur').attr('style','border:1px solid #ed0707');
	}   
});

$(document).on('change', '#rqbiGeneralAggr', function() { 
	var rqbiEachOccur = $('#rqbiEachOccur').val();
	var rqbiGeneralAggr = $('#rqbiGeneralAggr').val();

	if(rqbiGeneralAggr >= rqbiEachOccur){
		add_coverage_limit (rqbiGeneralAggr,'general_aggregate');
		$('#rqbiOcpGeneralAggr').val('2000000');
		$('#gnrl_errgl').remove();
		$('#rqbiGeneralAggr').removeAttr('style');
		$('#each_errgl').remove();
		$('#rqbiEachOccur').removeAttr('style');
	} else {
		$('#gnrl_errgl').remove();
		$('#rqbiGeneralAggr').after('<span id="gnrl_errgl" style="color:red; padding-left:6px;">Must be greater than or equal to Each Occurrence</span>')
		$('#rqbiGeneralAggr').attr('style','border:1px solid #ed0707');
	}
    
});

$(document).on('change', '#rqbiProdGeneralAggr', function() { 
	var rqbiProdGeneralAggr = $('#rqbiProdGeneralAggr').val();
    add_coverage_limit (rqbiProdGeneralAggr,'operational_general_aggregate');
});

$(document).on('change', '#rqbiPersonalInjury', function() {  
    var rqbiPersonalInjury = $('#rqbiPersonalInjury').val();
    add_coverage_limit (rqbiPersonalInjury,'personal_advertising_injury');
}); 

$(document).on('change', '#rqbiMedicalExp', function() { 
	var rqbiMedicalExp = $('#rqbiMedicalExp').val();
    add_coverage_limit (rqbiMedicalExp,'medical_expense');
}); 

$(document).on('change', '#rqbiDamagetoPrem', function() { 
	var rqbiDamagetoPrem = $('#rqbiDamagetoPrem').val();
    add_coverage_limit (rqbiDamagetoPrem,'damage_premises');
});

$(document).on('change', '#rqbiLiquorEachOccur', function() {
	var rqbiLiquorEachOccur = $('#rqbiLiquorEachOccur').val();
	var rqbiLiquorGeneralAggr = $('#rqbiLiquorGeneralAggr').val();

	if(rqbiLiquorEachOccur <= rqbiLiquorGeneralAggr){
		add_coverage_limit (rqbiLiquorEachOccur,'liq_each_occurence');
		$('#liq_erreach').remove();
		$('#rqbiLiquorEachOccur').removeAttr('style');
		$('#liq_errgnrl').remove();
		$('#rqbiLiquorGeneralAggr').removeAttr('style');
	} else {
		$('#liq_erreach').remove();
		$('#rqbiLiquorEachOccur').after('<span id="liq_erreach" style="color:red; padding-left:6px;">Must be lesser than or equal to General Aggregate</span>')
		$('#rqbiLiquorEachOccur').attr('style','border:1px solid #ed0707');
	}
	
});

$(document).on('change', '#rqbiLiquorGeneralAggr', function() { 
	var rqbiLiquorEachOccur = $('#rqbiLiquorEachOccur').val();
	var rqbiLiquorGeneralAggr = $('#rqbiLiquorGeneralAggr').val();

	if(rqbiLiquorGeneralAggr >= rqbiLiquorEachOccur){
		add_coverage_limit (rqbiLiquorGeneralAggr,'liq_general_aggregate');
		$('#liq_errgnrl').remove();
		$('#rqbiLiquorGeneralAggr').removeAttr('style');
		$('#liq_erreach').remove();
		$('#rqbiLiquorEachOccur').removeAttr('style');
	} else {
		$('#liq_errgnrl').remove();
		$('#rqbiLiquorGeneralAggr').after('<span id="liq_errgnrl" style="color:red; padding-left:6px;">Must be greater than or equal to Each Occurrence</span>')
		$('#rqbiLiquorGeneralAggr').attr('style','border:1px solid #ed0707');	
	}
    
});

$(document).on('change', '#rqbiOcpEachOccur', function() {
	var rqbiOcpEachOccur = $('#rqbiOcpEachOccur').val();
	var rqbiOcpGeneralAggr = $('#rqbiOcpGeneralAggr').val();

	if(rqbiOcpEachOccur <= rqbiOcpGeneralAggr){
		add_coverage_limit (rqbiOcpEachOccur,'ocp_each_occurence');
		$('#rqbiEachOccur').val('1000000');
		$('#ocp_errech').remove();
		$('#rqbiOcpEachOccur').removeAttr('style');
		$('#ocp_errgnrl').remove();
		$('#rqbiOcpGeneralAggr').removeAttr('style');
	} else {
		$('#ocp_errech').remove();
		$('#rqbiOcpEachOccur').after('<span id="ocp_errech" style="color:red; padding-left:6px;">Must be lesser than or equal to General Aggregate</span>')
		$('#rqbiOcpEachOccur').attr('style','border:1px solid #ed0707');
	}
	
});

$(document).on('change', '#rqbiOcpGeneralAggr', function() { 
	var rqbiOcpEachOccur = $('#rqbiOcpEachOccur').val();
	var rqbiOcpGeneralAggr = $('#rqbiOcpGeneralAggr').val();

	if(rqbiOcpGeneralAggr >= rqbiOcpEachOccur){
		add_coverage_limit (rqbiOcpGeneralAggr,'liq_general_aggregate');
		$('#rqbiGeneralAggr').val('2000000');
		$('#ocp_errgnrl').remove();
		$('#rqbiOcpGeneralAggr').removeAttr('style');
		$('#ocp_errech').remove();
		$('#rqbiOcpEachOccur').removeAttr('style');
	} else {
		$('#ocp_errgnrl').remove();
		new PNotify({ title: 'Error', text: 'Must be greater than or equal to Each Occurrence.', delay: 1500, type: 'error' });
		$('#rqbiOcpGeneralAggr').after('<span id="ocp_errgnrl" style="color:red; padding-left:6px;">Must be greater than or equal to Each Occurrence</span>')
		$('#rqbiOcpGeneralAggr').attr('style','border:1px solid #ed0707');
	}
    
});

$(document).on('blur', '#rqbiSicCode', function() { 
    var rqbiSicCode = $('#rqbiSicCode').val();
    add_coverage_limit (rqbiSicCode,'sic_code_id');
});

$(document).on('blur', '#rqbiOccurDeductible', function() { 
    var rqbiOccurDeductible = $('#rqbiOccurDeductible').val().replace(/,/g, '').replace(/^0+/, "");
    if (rqbiOccurDeductible =="") {
       	$('#rqbiOccurDeductible').attr('style','border-color:red;');
       	$('.dedGlTitle').attr('style','color:red;')
    } else {
        if (rqbiOccurDeductible.length <= 15 ) {
          add_coverage_limit (rqbiOccurDeductible,'deductible');
          $(this).removeClass('redBorder');
          $('.rqbiOccur_Deductible_error_valdtn').css('display','none');
          $(this).val(numberWithCommas(rqbiOccurDeductible));
        } else {
          $(this).addClass('redBorder');
          $('.rqbiOccur_Deductible_error_valdtn').css('display','block');
          $('.rqbiOccur_Deductible_error_valdtn').css('color','red');
        }
    }
});

$(document).on('keyup', '#rqbiOccurDeductible', function() { 
	var rqbiOccurDeductible = $('#rqbiOccurDeductible').val();
	var numberval = numberonly (rqbiOccurDeductible); 
	$(this).val(numberval);
	var rqbiOccurDeductible1 = $('#rqbiOccurDeductible').val();
	if (rqbiOccurDeductible1 !="") {
       	$('#rqbiOccurDeductible').removeAttr('style');
       	$('.dedGlTitle').removeAttr('style');
    }
});


$(document).on('change', '#rqbiDeductType', function() { 
	var rqbiDeductType = $('#rqbiDeductType').val();
	if (rqbiDeductType =="0") {
       	$('#rqbiDeductType').attr('style','border-color:red;');
       	$('.dedTypeGlTitle').attr('style','color:red;')
    } else {
       	$('#rqbiDeductType').removeAttr('style');
       	$('.dedTypeGlTitle').removeAttr('style');
    	add_coverage_limit (rqbiDeductType,'deductible_type');
    }
});

$(document).on('blur','#liquorDeductible', function() { 
    var liquorDeductible = $('#liquorDeductible').val().replace(/,/g, '').replace(/^0+/, "");
    if (liquorDeductible =="") {
       	$('#liquorDeductible').attr('style','border-color:red;');
       	$('.liquorDeductDiv > label:first-child').attr('style','color:red;');
    } else {
        if (liquorDeductible.length <= 15 ) {          
          add_coverage_limit (liquorDeductible,'liq_deductible');
          $('#liquorDeductible').removeAttr('style');
          $('.liquorDeductDiv div > label:first-child').removeAttr('style');
          $('.liquorDeductible_error_valdtn').css('display','none');
          $(this).removeClass('redBorder');
          $(this).val(numberWithCommas(liquorDeductible));
        } else {
          $(this).addClass('redBorder');
          $('.liquorDeductible_error_valdtn').css('display','block');
          $('.liquorDeductible_error_valdtn').css('color','red');
        }
    }
});

$(document).on('keyup', '#liquorDeductible', function() { 
	var liquorDeductible = $('#liquorDeductible').val();
	var numberval = numberonly (liquorDeductible); 
	$(this).val(numberval);
	var liquorDeductible1 = $('#liquorDeductible').val();
	if (liquorDeductible1 !="") {
       	$('#liquorDeductible').removeAttr('style');
       	$('.liquorDeductDiv > label:first-child').removeAttr('style');
    }
});

$(document).on('change', '#liquorDeductType', function() {
	var liquorDeductType = $('#liquorDeductType').val();
    if (liquorDeductType =="0") {
       	$('#liquorDeductType').attr('style','border-color:red;');
       	$('.liquorDeductTypeDiv > label:first-child').attr('style','color:red;');
    } else {
       	add_coverage_limit (liquorDeductType,'liq_deductible_type');
       	$('#liquorDeductType').removeAttr('style');
       	$('.liquorDeductTypeDiv > label:first-child').removeAttr('style');
    }
});

/*added for Ocp on 4march 2021 by vaishnavi*/
$(document).on('blur','#OcpDeductible', function() { 
    var OcpDeductible = $('#OcpDeductible').val().replace(/,/g, '').replace(/^0+/, "");
    if (OcpDeductible =="") {
       	$('#OcpDeductible').attr('style','border-color:red;');
       	$('.OcpDeductDiv > label:first-child').attr('style','color:red;');
    } else {    
        if((OcpDeductible).length <= 15) {          
          add_coverage_limit (OcpDeductible,'ocp_deductible');
          $('#OcpDeductible').removeAttr('style');
          $('.OcpDeductDiv div > label:first-child').removeAttr('style');
          $('.Ocp_Deductible_error_valdtn').css('display','none');
          $(this).removeClass('redBorder');
          $(this).val(numberWithCommas(OcpDeductible));
        } else {
          $(this).addClass('redBorder');
          $('.Ocp_Deductible_error_valdtn').css('display','block');
          $('.Ocp_Deductible_error_valdtn').css('color','red');
        }
    }
});

$(document).on('keyup', '#OcpDeductible', function() { 
	var OcpDeductible = $('#OcpDeductible').val();
	var numberval = numberonly (OcpDeductible); 
	$(this).val(numberval);
	var OcpDeductible1 = $('#OcpDeductible').val();
	if (OcpDeductible1 !="") {
       	$('#OcpDeductible').removeAttr('style');
       	$('.OcpDeductDiv > label:first-child').removeAttr('style');
    }
});

$(document).on('change', '#OcpDeductType', function() {
	var OcpDeductType = $('#OcpDeductType').val();
    if (OcpDeductType =="0") {
       	$('#OcpDeductType').attr('style','border-color:red;');
       	$('.OcpDeductDiv > label:first-child').attr('style','color:red;');
    } else {
       	add_coverage_limit (OcpDeductType,'ocp_deductible_type');
       	$('#OcpDeductType').removeAttr('style');
       	$('.OcpDeductDiv > label:first-child').removeAttr('style');
    }
});

/*added for Ocp on 4march 2021 by vaishnavi*/
$(document).on('click', '.rqbiDeductibleInsured', function() { 
	var value = $(this).val();
	add_coverage_limit (value,'policy_type');
	$('#optionalCovAccord').removeClass('show');
    $('#additionalInsuredAccord').removeClass('show');
    $('#selectFormsAccord').removeClass('show');
    $('.aiFormsAccord').addClass('collapsed');
    $('.commonFormsAccord').addClass('collapsed');
    $('.rqbi_allforms_tabs').addClass('collapsed');
});

$(document).on('change', '#rqbiOccurSir', function() {
	var rqbiOccurSir = $('#rqbiOccurSir').val();
    if (rqbiOccurSir =="0") {
       	$('#rqbiOccurSir').attr('style','border-color:red;');
       	$('.rqbiOccurSir > label:first-child').attr('style','color:red;');
    } else {
       	add_coverage_limit (rqbiOccurSir,'occurrence_sir');
       	$('#rqbiOccurSir').removeAttr('style');
       	$('.rqbiOccurSir > label:first-child').removeAttr('style');
    }
});

$(document).on('change', '#liquorOccurSir', function() {
	var liquorOccurSir = $('#liquorOccurSir').val();
    if (liquorOccurSir =="0") {
       	$('#liquorOccurSir').attr('style','border-color:red;');
       	$('.liquorOccurSir > label:first-child').attr('style','color:red;');
    } else {
       	add_coverage_limit (liquorOccurSir,'liq_occurrence_sir');
       	$('#liquorOccurSir').removeAttr('style');
       	$('.liquorOccurSir > label:first-child').removeAttr('style');
    }
});

$(document).on('change', '#OcpOccurSir', function() {
	var OcpOccurSir = $('#OcpOccurSir').val();
    if (OcpOccurSir =="0") {
       	$('#OcpOccurSir').attr('style','border-color:red;');
       	$('.OcpOccurSir > label:first-child').attr('style','color:red;');
    } else {
       	add_coverage_limit (OcpOccurSir,'ocp_occurrence_sir');
       	$('#OcpOccurSir').removeAttr('style');
       	$('.OcpOccurSir > label:first-child').removeAttr('style');
    }
});


$(document).on('blur', '#rqbiSir', function() { 
    var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if(rqbiOccurSir_value > 0 ){
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }
    if (rqbiOccurSir_value ==""   && rqbiOccurSir_value != 0 ) {
       	$(this).addClass('redBorder');
    }else{
    	if(rqbiOccurSir_value.length <= 10){
	        add_coverage_limit (rqbiOccurSir_value,'sir');
	        $(this).removeClass('redBorder');
	        $('.Sir_error_valdtn').css('display','none');
          $(this).val(numberWithCommas(rqbiOccurSir_value));
    	}else{
    		$(this).addClass('redBorder');
    		$('.Sir_error_valdtn').css('display','block');
    		$('.Sir_error_valdtn').css('color','red');
    	}
    }
});

$(document).on('blur', '#liquorSir', function() { 
    var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if(rqbiOccurSir_value > 0 ){
        rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
        rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }
    if (rqbiOccurSir_value ==""  && rqbiOccurSir_value != 0 ) {
       	$(this).addClass('redBorder');
    }else{
    	if(rqbiOccurSir_value.length <= 10){
	        add_coverage_limit (rqbiOccurSir_value,'liq_sir');
	        $(this).removeClass('redBorder');
	        $('.liquorSir_error_valdtn').css('display','none');
          $(this).val(numberWithCommas(rqbiOccurSir_value));
    	}else{
    		$(this).addClass('redBorder');
    		$('.liquorSir_error_valdtn').css('display','block');
    		$('.liquorSir_error_valdtn').css('color','red');
    	}
    }
});


$(document).on('blur', '#OcpSir', function() { 
   var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if(rqbiOccurSir_value > 0 ){
    	rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }

    if (rqbiOccurSir_value =="" && rqbiOccurSir_value != 0) {
       	$(this).addClass('redBorder');
    }else{
    	if(rqbiOccurSir_value.length <= 10){
	        add_coverage_limit (rqbiOccurSir_value,'ocp_sir');
	        $(this).removeClass('redBorder');
	        $('.ocpSir_error_valdtn').css('display','none');
          $(this).val(numberWithCommas(rqbiOccurSir_value));
    	}else{
    		$(this).addClass('redBorder');
    		$('.ocpSir_error_valdtn').css('display','block');
    		$('.ocpSir_error_valdtn').css('color','red');
    	}
    }
});

$(document).on('blur', '#rqbiSirAggregate', function() { 
    var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if ( rqbiOccurSir_value > 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }

    if (rqbiOccurSir_value ==""  && rqbiOccurSir_value != 0 ) {
       	$(this).addClass('redBorder');
    }else{
      if (rqbiOccurSir_value.length <= 15) {
        add_coverage_limit (rqbiOccurSir_value,'aggregate_sir');
        $(this).removeClass('redBorder');
        $('.Siraggr_error_valdtn').css('display','none');
        $(this).val(numberWithCommas(rqbiOccurSir_value));
      } else {
        $(this).addClass('redBorder');
        $('.Siraggr_error_valdtn').css('display','block');
        $('.Siraggr_error_valdtn').css('color','red');
      }
    }
});

$(document).on('blur', '#liquorSirAggregate', function() { 
    var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if ( rqbiOccurSir_value > 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }

    if (rqbiOccurSir_value ==""  && rqbiOccurSir_value != 0 ) {
       	$(this).addClass('redBorder');
    }else{
      if (rqbiOccurSir_value.length <= 15) {
        add_coverage_limit (rqbiOccurSir_value,'liq_aggregate_sir');
        $(this).removeClass('redBorder');
        $('.liq_siraggr_error_valdtn').css('display','none');
        $(this).val(numberWithCommas(rqbiOccurSir_value));
      } else {
        $(this).addClass('redBorder');
        $('.liq_siraggr_error_valdtn').css('display','block');
        $('.liq_siraggr_error_valdtn').css('color','red');
      }
    }
});


$(document).on('blur', '#OcpSirAggregate', function() { 
    var rqbiOccurSir_value = $(this).val().replace(/,/g,'');
    if ( rqbiOccurSir_value > 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "");
    } else if ( rqbiOccurSir_value == 0 ) {
      rqbiOccurSir_value = rqbiOccurSir_value.replace(/^0+/, "0");
    }

    if (rqbiOccurSir_value ==""  && rqbiOccurSir_value != 0 ) {
       	$(this).addClass('redBorder');
    }else{
      if (rqbiOccurSir_value.length <= 15) {
        add_coverage_limit (rqbiOccurSir_value,'ocp_aggregate_sir');
        $(this).removeClass('redBorder');
        $('.ocp_siraggr_error_valdtn').css('display','none');
        $(this).val(numberWithCommas(rqbiOccurSir_value));
      } else {
        $(this).addClass('redBorder');
        $('.ocp_siraggr_error_valdtn').css('display','block');
        $('.ocp_siraggr_error_valdtn').css('color','red');
      }
    }
});

function get_coverage_types () {
	var coverage_type_array = [];
    $("input[name='CoverageType']:checked").each( function () {
    	var value = $(this).val();
		coverage_type_array.push(value);
	});
    var coverage_type = coverage_type_array.toString();

    if(coverage_type == "1,2"){
    	covTyp = 4;
    } else {
    	covTyp = coverage_type;
    }
    
	if(coverage_type_array.length <= 2){
    	if(covTyp !=""){
			add_coverage_limit (covTyp,'coverages');
			if (covTyp == 2 || covTyp == 3) {
				update_gltype(null);
			}
		} else {
			update_gltype(null);
		}
	}

}

function add_coverage_limit (value,column_name) {
	var accnt_id = accid;
    var get_rqbi_id = $('#rqbiQuoteVersion').val();

    var current_user =localStorage.getItem('usernumericid');
    var d = new Date($.now());
	var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	$.ajax({
		url: laravel_url+"/add_coverage_limit",
		type:'post',
		data:{accnt_id:accnt_id,get_rqbi_id:get_rqbi_id,com_id:com_id,value:value,column_name:column_name,current_user:current_user},
		success: function (response) {
			$('.covLimitAccordHead').removeAttr('style');
            $('.covLimitAccordHead a').removeAttr('style');
		    var obj = JSON.parse(response);
		    if (column_name != 'coverages') {
		      	if (obj.result !="") {  
	          		if (obj.result == "success") {
		            	if(obj.msg == "Updated Successfully") {
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
		            	}
		            } 
		        }
	        }

	        if(column_name == "coverages"){
	        	enabled_continueTofullQuote();
	        	checkContinueToFullQuoteStatus();
	        }
		},
		complete: function () {
			var deductible = [
				'250', '500', '750', '1000', '2500',
				'5000', '10000', '15000', '20000', '25000'
			];
			
			$('.rqbiOccurDeductible').autocomplete({
				source:[deductible]
			});

			$('.liquorDeductible').autocomplete({
				source:[deductible]
			});
			
			$('.OcpDeductible').autocomplete({
				source:[deductible]
			});
			
			covCkbxFunctionality();
		}
	});
}

function get_coverageLimit (accid,rqbi_id) {
	EachandGnrl_error_removed();
    $.ajax({
        url: laravel_url+"/getspecificaccount_coveragelimits",
        type:'post',
        data:{
        	accid : accid,
        	rqbi_id : rqbi_id,
        	com_id : com_id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {  
        	$('#rqbiOccurDeductible, #rqbiDeductType, #liquorDeductible, #liquorDeductType, #OcpDeductible, #OcpDeductType, #covPrimaryState, #rqbiOccurSir, #liquorOccurSir, #OcpOccurSir').removeAttr('style');
        	$('.covStateSpecDiv button').attr('style','border: 1px solid #eee !important');
	        var obj = jQuery.parseJSON(response);
			
			if(obj[0].esubmission_status== 1){
				$("#supportEx").prop("checked", true);
				xl_uctAppend('hide');
				$('.support_unsupportDiv').append ('<div class="form-row xl_submisNoDiv mt-2 mb-4"><label class="col-form-label fontBold mr-1"> Submission # </label> <div class="col-auto"><input type="text" class="form-control form-control-sm border-primary xl_submissionNo" ></div> </div>');
			  }else{
				 $("#unSupportEx").prop("checked", true);
				 xl_uctAppend('show');
			  }

	        if (obj.length > 0) {
	        	coverages_click_options (obj[0].coverages, obj[0].gl_type);
				$('#rqbiEachOccur option').removeAttr('selected');

		    	if (obj[0].each_occurence !=null) { 
		    		$('#rqbiEachOccur').val(obj[0].each_occurence); 
		    	} else { 
		    		$('#rqbiEachOccur').val('1000000'); 
		    	}
		        
		        if (obj[0].general_aggregate !=null) { 
		        	$('#rqbiGeneralAggr').val(obj[0].general_aggregate); 
		        } else { 
		        	$('#rqbiGeneralAggr').val('2000000');
		        }

		        if (obj[0].liq_each_occurence !="") { 
		        	$('#rqbiLiquorEachOccur').val(obj[0].liq_each_occurence); 
		        } else { 
		        	$('#rqbiLiquorEachOccur').val('1000000');
		        }

		        if (obj[0].liq_general_aggregate !="") { 
		        	$('#rqbiLiquorGeneralAggr').val(obj[0].liq_general_aggregate); 
		        } else { 
		        	$('#rqbiLiquorGeneralAggr').val('1000000');
		        }

		        if (obj[0].ocp_each_occurence !="") { 
		        	$('#rqbiOcpEachOccur').val(obj[0].ocp_each_occurence); 
		        } else { 
		        	$('#rqbiOcpEachOccur').val('1000000');
		        }

		        if (obj[0].ocp_general_aggregate !="") { 
		        	$('#rqbiOcpGeneralAggr').val(obj[0].ocp_general_aggregate); 
		        } else { 
		        	$('#rqbiOcpGeneralAggr').val('2000000');
		        }

		        if (obj[0].operational_general_aggregate !=null) { 
		        	$('#rqbiProdGeneralAggr').val(obj[0].operational_general_aggregate); 
		        } else { 
		        	$('#rqbiProdGeneralAggr').val('2000000');
		        }

		        if (obj[0].personal_advertising_injury !=null) { 
		        	$('#rqbiPersonalInjury').val(obj[0].personal_advertising_injury); 
		        } else { 
		        	$('#rqbiPersonalInjury').val('1000000');
		        }

		        if (obj[0].medical_expense !=null) { 
		        	$('#rqbiMedicalExp').val(obj[0].medical_expense); 
		        } else { 
		        	$('#rqbiMedicalExp').val('5000');
		        }

		        if (obj[0].damage_premises !=null) { 
		        	$('#rqbiDamagetoPrem').val(obj[0].damage_premises); 
		        } else { 
		        	$('#rqbiDamagetoPrem').val('100000');
		        }

		        if (obj[0].deductible !="") { 
		        	$('#rqbiOccurDeductible').val(numberWithCommas(obj[0].deductible)); 
		        } else { 
		        	$('#rqbiOccurDeductible').val('5000');
		        }

		        if (obj[0].deductible_type !="") { 
		        	$('#rqbiDeductType').val(obj[0].deductible_type); 
		        } else { 
		        	$('#rqbiDeductType').val('0');
		        }	

		        if (obj[0].deductible_credit !="" && obj[0].deductible_credit != null) { 
		        	$('#glDeductCredit').val(obj[0].deductible_credit); 
		        	$('#glDeductCredit').attr('data-value',obj[0].deductible_credit);
		        } else { 
		        	$('#glDeductCredit').val(''); 
		        	$('.glDeductCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].liq_deductible !="") { 
		        	$('#liquorDeductible').val(numberWithCommas(obj[0].liq_deductible)); 
		        } else { 
		        	$('#liquorDeductible').val('5,000');
		        }

		        if (obj[0].liq_deductible_type !="") { 
		        	$('#liquorDeductType').val(obj[0].liq_deductible_type); 
		        } else { 
		        	$('#liquorDeductType').val('0'); 
		        }

		        if (obj[0].liq_deductible_credit !="" && obj[0].liq_deductible_credit != null) { 
		        	$('#liquorDeductCredit').val(obj[0].liq_deductible_credit); 
		        	$('#liquorDeductCredit').attr('data-value',obj[0].liq_deductible_credit);
		        } else { 
		        	$('#liquorDeductCredit').val(''); 
		        	$('.liquorDeductCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].ocp_deductible !="") { 
		        	$('#OcpDeductible').val(numberWithCommas(obj[0].ocp_deductible)); 
		        } else { 
		        	$('#OcpDeductible').val('5000');
		        }

		        if (obj[0].ocp_deductible_type !="") { 
		        	$('#OcpDeductType').val(obj[0].ocp_deductible_type); 
		        } else { 
		        	$('#OcpDeductType').val('0'); 
		        }

		        if (obj[0].ocp_deductible_credit !=""  && obj[0].ocp_deductible_credit != null) { 
		        	$('#OcpDeductCredit').val(obj[0].ocp_deductible_credit); 
		        	$('#OcpDeductCredit').attr('data-value',obj[0].ocp_deductible_credit);
		        } else { 
		        	$('#OcpDeductCredit').val(''); 
		        	$('.OcpDeductCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].occurrence_sir !="") { 
		        	$('#rqbiOccurSir').val(obj[0].occurrence_sir); 
		        } else { 
		        	$('#rqbiOccurSir').val('0'); 
		        }

		        if (obj[0].sir !="" && obj[0].sir != null) { 
		        	$('#rqbiSir').val(numberWithCommas(obj[0].sir)); 
		        } else if(obj[0].sir == 0 ){
              $('#rqbiSir').val(0); 
            }else { 
		        	$('#rqbiSir').val(''); 
		        }

		        if (obj[0].aggregate_sir !="") { 
		        	$('#rqbiSirAggregate').val(numberWithCommas(obj[0].aggregate_sir)); 
		        } else { 
		        	$('#rqbiSirAggregate').val(''); 
		        }

		        if (obj[0].sir_credit !="" && obj[0].sir_credit != null) { 
		        	$('#SirCredit').val(obj[0].sir_credit); 
		        	$('#SirCredit').attr('data-value',obj[0].sir_credit); 
		        } else { 
		        	$('#SirCredit').val(''); 
		        	$('.SirCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].liq_occurrence_sir !="" && obj[0].liq_occurrence_sir != null) { 
		        	$('#liquorOccurSir').val(obj[0].liq_occurrence_sir); 
		        } else { 
		        	$('#liquorOccurSir').val('0'); 
		        }

		        if (obj[0].liq_sir !="" && obj[0].liq_sir != null) {
		        	$('#liquorSir').val(numberWithCommas(obj[0].liq_sir)); 
		        } else if(obj[0].liq_sir == 0 ){
              $('#liquorSir').val(0); 
            } else { 
		        	$('#liquorSir').val(''); 
		        }

		        if (obj[0].liq_aggregate_sir !="") { 
		        	$('#liquorSirAggregate').val(numberWithCommas(obj[0].liq_aggregate_sir)); 
		        } else { 
		        	$('#liquorSirAggregate').val(''); 
		        }

		        if (obj[0].liq_sir_credit !="" && obj[0].liq_sir_credit != null) { 
		        	$('#liquorSirCredit').val(obj[0].liq_sir_credit); 
		        	$('#liquorSirCredit').attr('data-value',obj[0].liq_sir_credit); 
		        } else { 
		        	$('#liquorSirCredit').val(''); 
		        	$('.liquorSirCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].ocp_occurrence_sir !="") { 
		        	$('#OcpOccurSir').val(obj[0].ocp_occurrence_sir); 
		        } else { 
		        	$('#OcpOccurSir').val('0'); 
		        }

		        if (obj[0].ocp_sir !="" && obj[0].ocp_sir != null) { 
		        	$('#OcpSir').val(numberWithCommas(obj[0].ocp_sir)); 
		        } else if(obj[0].ocp_sir == 0 ){
              $('#OcpSir').val(0); 
            } else { 
		        	$('#OcpSir').val(''); 
		        }

		        if (obj[0].ocp_aggregate_sir !="") { 
		        	$('#OcpSirAggregate').val(numberWithCommas(obj[0].ocp_aggregate_sir)); 
		        } else { 
		        	$('#OcpSirAggregate').val(''); 
		        }

		        if (obj[0].ocp_sir_credit !="" && obj[0].ocp_sir_credit != null) { 
		        	$('#OcpSirCredit').val(obj[0].ocp_sir_credit); 
		        	$('#OcpSirCredit').attr('data-value',obj[0].ocp_sir_credit); 
		        } else { 
		        	$('#OcpSirCredit').val(''); 
		        	$('.OcpSirCredit_error_valdtn').css('display','none');
		        }

		        if (obj[0].policy_type == '1') { 
		        	$('#rqbiDeductible').click(); 
		        } 

		        if (obj[0].policy_type == '2') { 
		        	$('#rqbiSelfInsured').click(); 
		        } 

		        if (obj[0].primary_state !="") { 
		        	$('#covPrimaryState').val(obj[0].primary_state);
		        } else { 
		        	$('#covPrimaryState').val("0");
		        }
			} else {
				$('#typeGL').prop('checked',false);
				$('#typeLiquor').prop('checked',false);
				$('#typeOCP').prop('checked',false);
				$('#typeGL').prop('checked',true);
        $('#rqbiEachOccur').val('1000000');
				$('#rqbiGeneralAggr').val('2000000');
				$('#rqbiLiquorEachOccur').val('1000000');
				$('#rqbiLiquorGeneralAggr').val('1000000');
				$('#rqbiProdGeneralAggr').val('2000000');
				$('#rqbiPersonalInjury').val('1000000');
				$('#rqbiMedicalExp').val('5000');
				$('#rqbiDamagetoPrem').val('100000');
		        
		    $('#rqbiDeductible').click();
				$('#rqbiOccurDeductible').val('5000');
				$('#liquorDeductible').val('5000');
				$('#OcpDeductible').val('5000');
				$('#rqbiDeductType').val('0');
				$('#liquorDeductType').val('0');
				$('#OcpDeductType').val('0');
				$('#rqbiOccurSir').val('0');
				$('#liquorOccurSir').val('0');
				$('#OcpOccurSir').val('0');
				$('#rqbiSirAggregate').val('');
				$('#liquorSirAggregate').val('');
				$('#OcpSirAggregate').val('');
				$('#rqbiSir').val('');
				$('#liquorSir').val('');
				$('#OcpSir').val('');
				$('#glDeductCredit').val('');
				$('#SirCredit').val('');
				$('#liquorDeductCredit').val('');
				$('#liquorSirCredit').val('');
				$('#OcpSirCredit').val('');
				$('#OcpDeductCredit').val('');
				$('.SirCredit_error_valdtn,.glDeductCredit_error_valdtn,.liquorDeductCredit_error_valdtn,.liquorSirCredit_error_valdtn,.OcpSirCredit_error_valdtn,.OcpDeductCredit_error_valdtn').css('display','none');

				$('#covPrimaryState').val("0");
				$('#covStateSpecific').val('');
				$('#covStateSpecific').multiselect('refresh');
				$('.covStateSpecDiv button').attr('style','border: 1px solid #eee !important');

				coverage_typeBase_show();
			}
      	},
    });
}

function coverages_click_options (value_coverage, gl_type) {
	$('#typeGL').prop('checked',false);
	$('#typeLiquor').prop('checked',false);
	$('#typeOCP').prop('checked',false);
	$('.cov_gl_type').prop('checked', false)
	console.log('value_coverage :',value_coverage);
	var gl_type_visibility = $('.gl_type_div').css('display');

	if (value_coverage == "4") {
		$('#typeGL').prop('checked',true);
		$('#typeLiquor').prop('checked',true);
		if (gl_type_visibility == 'none') {
			$('.gl_type_div').css('display', 'block');
		}
		if (gl_type != null) {
			$('.cov_gl_type[value="'+gl_type+'"]').prop('checked',true);
		}
	}

	if (value_coverage == "1") {
		$('#typeGL').prop('checked',true);
		if (gl_type_visibility == 'none') {
			$('.gl_type_div').css('display', 'block');
		}
		if (gl_type != null) {
			$('.cov_gl_type[value="'+gl_type+'"]').prop('checked',true);
		}
	}

	if (value_coverage == "2") {
		$('#typeLiquor').prop('checked',true);
		if (gl_type_visibility == 'block') {
			$('.gl_type_div').css('display', 'none');
		}
	}

	if (value_coverage == "3") {
		$('#typeOCP').prop('checked',true);
		if (gl_type_visibility == 'block') {
			$('.gl_type_div').css('display', 'none');
		}
	}

	coverage_typeBase_show();
}


function coverage_typeBase_show() {
	var changeVal = $('.rqbiDeductibleInsured:checked').val();

	if(changeVal == "1") {
		$('.deductTbleSection').show();	
		$('.sirTblSection').hide();
	} else {
		$('.deductTbleSection').hide();	
		$('.sirTblSection').show();
	}

	if ( $('#typeGL').prop('checked') == true && $('#typeLiquor').prop('checked') == false && $('#typeOCP').prop('checked') == false ) {
	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .showSubjOnliquorCov, .rqbiOcpSicCode, .rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();
	    $('.rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .hideListOnOcpCov, .rqbiLiquorSicCode').show();

		if(changeVal == "1") {
			$('.deductibleMonoline').show();
			$('.liquorDeductDiv, .OcpDeductDiv, .sirGl, .sirLiquor, .sirOcp').hide();
		} else{
			$('.sirGl').show();
			$('.liquorDeductDiv, .OcpDeductDiv, .deductibleMonoline, .sirLiquor, .sirOcp').hide();
		}

		$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

		deduct_SIR_toggle();

	    $('.noSelectMsg').hide();
    } else if ( $('#typeGL').prop('checked') == true && $('#typeLiquor').prop('checked') == true && $('#typeOCP').prop('checked') == false) {
	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .showSubjOnliquorCov, .hideListOnOcpCov, .rqbiLiquorSicCode').show();
	    $('.rqbiOcpSicCode, .rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

	    if( $('#rqbiDeductible').prop('checked') == true ) {
	    	$('.deductibleMonoline, .liquorDeductDiv').show();
	    }

	    if(changeVal == "1") {
			$('.deductibleMonoline, .liquorDeductDiv').show();
			$('.sirGl, .sirLiquor, .OcpDeductDiv, .sirOcp').hide();
		} else{
			$('.sirGl, .sirLiquor').show();
			$('.deductibleMonoline, .liquorDeductDiv, .OcpDeductDiv, .sirOcp').hide();
		}

		$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

	    $('.noSelectMsg').hide();
    } else if ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == true && $('#typeOCP').prop('checked') == false ) {
	    $('.LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .showSubjOnliquorCov, .hideListOnOcpCov, .rqbiLiquorSicCode, .liquorDeductDiv').removeAttr('style').show();
	    $('.glLiquorTittle, .rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv, .covGlSection, .rqbiOcpSicCode, .rqbiDesigContractorDiv, .deductibleMonoline').hide();

	    if(changeVal == "1") {
			$('.liquorDeductDiv').show();
			$('.deductibleMonoline, .sirGl, .sirLiquor,.OcpDeductDiv, .sirOcp').hide();
		} else{
			$('.sirLiquor').show();
			$('.deductibleMonoline, .liquorDeductDiv, .sirGl,.OcpDeductDiv, .sirOcp').hide();
		}

		deduct_SIR_toggle();

	    $('.noSelectMsg').hide();
    } else if ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == false && $('#typeOCP').prop('checked') == false ) {
	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv, .showSubjOnliquorCov, .rqbiOcpSicCode, .rqbiDesigContractorDiv').hide();
	    $('.rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .hideListOnOcpCov, .rqbiLiquorSicCode').show();

		deduct_SIR_toggle();

		if(changeVal == "1") {
			$('.deductibleMonoline').show();
			$('.liquorDeductDiv, .sirGl, .sirLiquor, .OcpDeductDiv, .sirOcp').hide();
		} else{
			$('.sirGl').show();
			$('.liquorDeductDiv, .deductibleMonoline, .sirLiquor, .OcpDeductDiv, .sirOcp').hide();
		}

		$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

	    $('.covMandatoryMsg').hide();
	    $('.covMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');

    } else if ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == false && $('#typeOCP').prop('checked') == true ) {
	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .covGlSection, .showSubjOnliquorCov, .hideListOnOcpCov, .rqbiLiquorSicCode, .liquorDeductDiv, .rqbiEachOccurDiv, .rqbiGeneralAggrDiv').hide();
	    $('.OcpEachOccurDiv, .OcpGeneralAggrDiv').show()

		deduct_SIR_toggle();

		if(changeVal == "1") {
			$('.OcpDeductDiv').show();
			$('.liquorDeductDiv, .deductibleMonoline, .sirGl, .sirLiquor, .sirOcp').hide();
		} else{
			$('.sirOcp').show();
			$('.liquorDeductDiv, .deductibleMonoline, .sirLiquor, .sirGl, .OcpDeductDiv').hide();
		}

		$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('OCP');		
	    $('.noSelectMsg').hide();
    }

    if ( $('#typeGL').prop('checked') == true && ( $('#typeLiquor').prop('checked') == true ) ) {

		$('.dedGlTitle').text('').text('GL Deductible');
		$('.dedTypeGlTitle').text('').text('GL Deductible Type');
		$('.noSelectMsg').hide();

	} else {
		$('.dedGlTitle').text('').text('Deductible');
		$('.dedTypeGlTitle').text('').text('Deductible Type');
	}
		
	if ( ( $('#typeGL').is(':checked') || $('#typeLiquor').is(':checked') ) || $('#typeOCP').is(':checked')) {
	    $('.covMandatoryMsg').hide();
    }

    coverage_base_ocShow('cov_limit_file');
}

//TPA Name field display
function get_tpa_select_dropdown(){
	// var accid = localStorage.getItem("accid");
	var rqbi_id_val = $('#rqbiQuoteVersion').val();

	$.ajax({
		url: laravel_url+"/get_tpa_select_dropdown",
		type:'post',
		data:{
			accid : accid,
			rqbi_id : rqbi_id_val,
			com_id : com_id
		},
		success:function(response){
			var obj = JSON.parse(response);
			
		  $('#rqbiTpaSelect').html(obj.tpa_selct_options);
		  $('.rqbiTpaAddress').val(obj.address_value);
			$('.rqbiTpaContactName').val(obj.contact_name_value);
			$('.rqbiTpaMobileNo').val(obj.mobile_no_value);
			$('.rqbiTpaEmailid').val(obj.email_id_value);

			var tpaselect_val = $('#rqbiTpaSelect').val();
			if(tpaselect_val != "0" && tpaselect_val != "New"){

				$('#rqbiTpaSelect').removeClass('inputDisabled');
			    $('.rqbiTpaAddress').removeClass('inputDisabled');
				$('.rqbiTpaContactName').removeClass('inputDisabled');
				$('.rqbiTpaMobileNo').removeClass('inputDisabled');
				$('.rqbiTpaEmailid').removeClass('inputDisabled');

			}
		},
		complete: function() {
			
		}, error: function (data) {
			
		}
	});
}

function rqbiTpaSelect_onchange (get_processType) {
	var tpaVal = $('#rqbiTpaSelect').val();
	var get_rqbi_id = $('#rqbiQuoteVersion').val();
	// var accid = localStorage.getItem("accid");
	var current_user =localStorage.getItem('usernumericid');

	if (tpaVal == "New") {
		$('.rqbiTpaNameDiv').show();
		$('.rqbiTpaAddress').addClass('inputDisabled').val('');
		$('.rqbiTpaContactName').addClass('inputDisabled').val('');
		$('.rqbiTpaMobileNo').addClass('inputDisabled').val('');
		$('.rqbiTpaEmailid').addClass('inputDisabled').val('');
	} else if (tpaVal == "1") {
		$('.rqbiTpaNameDiv').hide();
		$('#rqbiTpaSelect').css("border", "");
		var dropdown_value = tpaVal;
		// var accid = localStorage.getItem("accid");
	   	$.ajax({
			url: laravel_url+"/check_tpa_dropdown_value",
			type:'post',
			data:{accid:accid,dropdown_value:dropdown_value,rqbi_id:get_rqbi_id,com_id:com_id,current_user:current_user},
			success: function(response) {
				var obj = JSON.parse(response);
			  	if (obj.data) {
				    if (obj.data.length > 0) {
				    	$('#rqbiTpaAddress').val(obj.data[0].address).removeClass('inputDisabled');
				    	$('#rqbiTpaContactName').val(obj.data[0].contact_name).removeClass('inputDisabled');
				    	$('#rqbiTpaMobileNo').val(obj.data[0].mobile_no).removeClass('inputDisabled');
				    	$('#rqbiTpaEmailid').val(obj.data[0].email_id).removeClass('inputDisabled');
				    	$('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
			        	$('.tpaSaveButton').show();
		    			$('.tpaCancelButton').show();
			        } else {
			        	tpa1(tpaVal);
			        }
			    }
			},
			complete: function() {
				$('.tpaSaveButton').removeAttr('style').removeAttr('disabled');
			}
		});
	} else if (tpaVal == "0") {
		$('.rqbiTpaNameDiv').hide();
		$('#rqbiTpaAddress').val('').addClass('inputDisabled');
		$('#rqbiTpaContactName').val('').addClass('inputDisabled');
		$('#rqbiTpaMobileNo').val('').addClass('inputDisabled');
		$('#rqbiTpaEmailid').val('').addClass('inputDisabled');
		$('.tpaSaveButton').html('<i class="fa fa-save" aria-hidden="true"></i> Save'); 
    $('#rqbiTpaContactName').css("border", "");
    $('#rqbiTpaMobileNo').css("border", "");
    $('#rqbiTpaEmailid').css("border", "");
    $('#rqbiTpaAddress').css("border", ""); 
    $('.rqbiTpaMobileNo_append_asterik').text('');
    $('.rqbiTpaContactName_append_asterik').text('');
    $('.rqbiTpaEmailid_append_asterik').text('');
    $('.rqbiTpaAddress_append_asterik').text('');
	} else {
		$('.rqbiTpaNameDiv').hide();
		$('#rqbiTpaSelect').css("border", "");
		var dropdown_value = tpaVal;
	   	$.ajax({
			url: laravel_url+"/check_tpa_dropdown_value",
			type:'post',
			data:{accid:accid,dropdown_value:dropdown_value,rqbi_id:get_rqbi_id,com_id:com_id,current_user:current_user},
			success: function (response) {
				var obj = JSON.parse(response);
			  	    
			    if (obj.data.length > 0) {
			    	$('#rqbiTpaAddress').val(obj.data[0].address).removeClass('inputDisabled');
			    	$('#rqbiTpaContactName').val(obj.data[0].contact_name).removeClass('inputDisabled');
			    	$('#rqbiTpaMobileNo').val(obj.data[0].mobile_no).removeClass('inputDisabled');
			    	$('#rqbiTpaEmailid').val(obj.data[0].email_id).removeClass('inputDisabled');
			    	$('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
			    	$('.tpaSaveButton').show();
		    		$('.tpaCancelButton').show();
	        } else {
	        	$('#rqbiTpaAddress').val('');
				    $('#rqbiTpaContactName').val('');
  					$('#rqbiTpaMobileNo').val('');
  					$('#rqbiTpaEmailid').val('');
  					$('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
  					$('.tpaSaveButton').show();
	    		  $('.tpaCancelButton').show();
	        }
			},
			complete: function() {
				$('.tpaSaveButton').removeAttr('style').removeAttr('disabled');		
			}
		});
	}
}

/*TPA - Add new - Add*/
$(document).on('click', '.saveTpa', function() {
	var tpaname = $('#rqbiTpaName').val();
	var acc_id = accid;
	var get_rqbi_id =$('#rqbiQuoteVersion').val();
	var current_user =localStorage.getItem('usernumericid');

	if (tpaname != '') {
		$.ajax({
	        type:"POST",
	        url: laravel_url+"/save_new_tpa_dropdown",
	        data:{  
	            accountid : acc_id,
	            rqbiTpaSelect:tpaname,
	            rqbiTpaAddress:'',
	            rqbiTpaContactName:'',
	            rqbiTpaMobileNo:'',
	            rqbiTpaEmailid:'',
	            rqbi_id:get_rqbi_id,
	            com_id:com_id,
	            current_user:current_user
	        },
	        success: function (response) {
	        	var obj = jQuery.parseJSON( response );
	            $('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
	            if (obj.result == 'success') {
	            	get_tpa_select_dropdown();
	            	$('#rqbiTpaName').val('');
	            	$('.rqbiTpaNameDiv').hide();

	                new PNotify({ title: 'Success', text: obj.msg, delay: 2000, type: 'success' });
	           	}else{
	                new PNotify({ title: 'Error', text: obj.msg, delay: 2000, type: 'error' });
	            }    
	        }
	    });
	}
});

/*TPA - Add new - Cancel*/
$(document).on('click', '.cancelTpa', function() {
	$('.rqbiTpaNameDiv').hide();
	$('.rqbiTpaSelect option[value="0"]').attr('selected','selected');
	tpaDisableFields ();
	$('#rqbiTpaSelect').val('0');
	$('.tpaSaveButton').html('<i class="fa fa-save" aria-hidden="true"></i> Save');
});

function tpa1(option_value){
	var acc_id = accid;
	var get_rqbi_id =$('#rqbiQuoteVersion').val();
	var current_user =localStorage.getItem('usernumericid');
	
	$.ajax({
		url: laravel_url+"/get_tpa_master_default_value",
		type:'post',
		data:{option_value:option_value,acc_id:acc_id,rqbi_id:get_rqbi_id,com_id:com_id,current_user:current_user},
		success: function (response) {
			var obj = JSON.parse(response);
			  	    
			if (obj.length > 0) {
			    $('#rqbiTpaAddress').val(obj[0].address).removeClass('inputDisabled');
			    $('#rqbiTpaContactName').val(obj[0].contact_name).removeClass('inputDisabled');
			    $('#rqbiTpaMobileNo').val(obj[0].mobile_number).removeClass('inputDisabled');
			    $('#rqbiTpaEmailid').val(obj[0].email_id).removeClass('inputDisabled');
			    $('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
			    
		    } else {
		       	$('#rqbiTpaAddress').val('');
				$('#rqbiTpaContactName').val('');
				$('#rqbiTpaMobileNo').val('');
				$('#rqbiTpaEmailid').val('');
		    }
		},
		complete: function() {
				    
		}
	});
}

$(document).on('click', '.tpaSaveButton', function() { 
    var rqbi_id_val = $('#rqbiQuoteVersion').val();
	  var accountid = accid;
    var rqbiTpaSelect = $('#rqbiTpaSelect').val();
    var rqbiTpaAddress = $('#rqbiTpaAddress').val();
    var rqbiTpaContactName = $('#rqbiTpaContactName').val();
    var rqbiTpaMobileNo = $('#rqbiTpaMobileNo').val();
    var rqbiTpaEmailid = $('#rqbiTpaEmailid').val();
    var current_user =localStorage.getItem('usernumericid');

    if(rqbiTpaSelect != 0 && rqbiTpaSelect != "New") {
    	$('#rqbiTpaSelect').css("border", "");
	    $.ajax({
	        type:"POST",
	        url: laravel_url+"/save_rqbitpa",
	        data:{  
	            accountid : accountid,
	            rqbiTpaSelect:rqbiTpaSelect,
	            rqbiTpaAddress:rqbiTpaAddress,
	            rqbiTpaContactName:rqbiTpaContactName,
	            rqbiTpaMobileNo:rqbiTpaMobileNo,
	            rqbiTpaEmailid:rqbiTpaEmailid,
	            rqbi_id:rqbi_id_val,
	            com_id:com_id,
	            current_user:current_user
	        },
	        success: function(response) {
	        	$('.covLimitAccordHead').removeAttr('style');
             	$('.covLimitAccordHead a').removeAttr('style');
	            var obj = jQuery.parseJSON( response );
	            $('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
	            if (obj.result == 'success') {
	                new PNotify({ title: 'Success', text: obj.msg, delay: 2000, type: 'success' });
	            } else {
	                new PNotify({ title: 'Error', text: obj.msg, delay: 2000, type: 'error' });
	            }
	        }
	    });
	} else{

		$('#rqbiTpaSelect').css("border", "1px solid red");
	}
});

function get_tpa_section (accid,get_clickType){
	var rqbi_id_val = $('#rqbiQuoteVersion').val();

    $.ajax({
        url: laravel_url+"/get_tpa_section",
        type:'post',
        data:{
        	accid : accid,
        	rqbi_id : rqbi_id_val,
        	com_id : com_id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (response) {
	        var obj = jQuery.parseJSON(response);

	        if (obj.length > 0) {
	        	$('#rqbiTpaSelect').val(obj[0].select_tpa).removeClass('inputDisabled');
		        $('#rqbiTpaAddress').val(obj[0].address).removeClass('inputDisabled');
		        $('#rqbiTpaContactName').val(obj[0].contact_name).removeClass('inputDisabled');
		        $('#rqbiTpaMobileNo').val(obj[0].mobile_no).removeClass('inputDisabled');
		        $('#rqbiTpaEmailid').val(obj[0].email_id).removeClass('inputDisabled');
		        $('.tpaSaveButton').html('<i class="fa fa-refresh" aria-hidden="true"></i> Update');
		        if(get_clickType != "cancelTpa_click"){
		        	$('.tpaSaveButton').attr('style','pointer-events: none;').attr('disabled',true);
		        }
		    } else {
		    	$('#rqbiTpaSelect').val('0');
		       	$('#rqbiTpaAddress').val('');
				$('#rqbiTpaContactName').val('');
				$('#rqbiTpaMobileNo').val('');
				$('#rqbiTpaEmailid').val('');
				$('.tpaSaveButton').html('<i class="fa fa-save" aria-hidden="true"></i> Save').removeAttr('style').removeAttr('disabled');
		    	$('.tpaSaveButton').hide();
		    	$('.tpaCancelButton').hide();
		    }
      	}
    });
}

$(document).on('change', '#rqbiTpaAddress, #rqbiTpaContactName, #rqbiTpaMobileNo, #rqbiTpaEmailid', function() {
	$('.tpaSaveButton').removeAttr('style').removeAttr('disabled');
});


function get_primary_state () {
	return $.ajax({
		type:'post',
        url: laravel_url+"/get_covergae_primary_state",
		success: function (response) {
			var state = jQuery.parseJSON(response);
			$('.covPrimaryStateDiv').html(state.primstate);
			$('.covStateSpecDiv').html(state.statespec);
		},
		complete: function () {
			$('#covStateSpecific').multiselect({
				includeSelectAllOption : true,
				nonSelectedText: 'Select an Option'
			});
			retrive_coverage_primary_state();
		},
	    error: function (data) {
	              
	    }
	});
}

//BW-CR-D3
function retrive_coverage_primary_state() {
	var rqbi_id_val = $('#rqbiQuoteVersion').val();
	// var accid = localStorage.getItem("accid");
	var current_user = localStorage.getItem('usernumericid');
	
	if(rqbi_id_val) {
		if (rqbi_id_val !="") {
			
			$.ajax({
				type: 'post',
		        url: laravel_url+"/retrive_coverage_primary_state",
				data: {rqbi_id:rqbi_id_val,accid:accid,com_id:com_id,current_user:current_user},
				success: function(response) {
					var state = jQuery.parseJSON(response);
					if (state.primstate!="") { 
						$('#covPrimaryState').val(state.primstate);
					} else {
						$('#covPrimaryState').val('0');
					}
				},

				complete: function (){
					
				},

			    error: function (data) {
			              
			    }
			});
		}
	}
}

$(document).on('change', '#covPrimaryState', function () { 
    var singleselect = $('#singleselect').val();
	var covPrimaryState = $('#covPrimaryState').val();
    var rqbi_id_val = $('#rqbiQuoteVersion').val();
	// var accid = localStorage.getItem("accid");
	var current_user =localStorage.getItem('usernumericid');

	if(covPrimaryState!="" && singleselect=="GL"){
		$('#covPrimaryState').removeAttr('style');
		$.ajax({
			type:'post',
	        url: laravel_url+"/store_coverage_primary_state",
	        data:{covPrimaryState:covPrimaryState,rqbi_id:rqbi_id_val,accid:accid,com_id:com_id,current_user:current_user},
			success: function(response) {
				$('.covLimitAccordHead').removeAttr('style');
             	$('.covLimitAccordHead a').removeAttr('style');
				var obj =JSON.parse(response);
				if(obj.msg == "Updated Successfully") {
					enabled_continueTofullQuote();
					checkContinueToFullQuoteStatus();
				}
			},
			complete: function (){
				
			},
		    error: function (data) {
		              
		    }
		});
	}
});


$(document).on('change', '#covStateSpecific', function () {
	var covStateSpecific = JSON.stringify($(this).val());
	var data_click =$(this).attr('data-click');
	var rqbi_id_val = $('#rqbiQuoteVersion').val();
 	// var accid = localStorage.getItem("accid");
	var current_user =localStorage.getItem('usernumericid');

    var chk_this_lgnth = $(this).val();
    if(chk_this_lgnth != null) {
	    if (chk_this_lgnth.length > 0) { 
	    	$('.covStateSpecDiv button').attr('style','border: 1px solid #eee !important');
			}
	}

	if (covStateSpecific!="") {
		$.ajax({
			type:'post',
	        url: laravel_url+"/store_state_specific",
	        data:{covStateSpecific:covStateSpecific,rqbi_id:rqbi_id_val,accid:accid,com_id:com_id,current_user:current_user},
			success: function (response) {
				var obj =JSON.parse(response);
				$('.covLimitAccordHead').removeAttr('style');
             	$('.covLimitAccordHead a').removeAttr('style');
				if(obj.msg == "Updated Successfully") {
					if(data_click == "no") {
						enabled_continueTofullQuote();
						checkContinueToFullQuoteStatus();
					}	
				}
			},
			complete: function (){
				
			},
		    error: function (data) {
		              
		    }
		});
	}
});

function get_state_specific_details () {
	var getrqbi_id = $('#rqbiQuoteVersion').val();
	// var accid = localStorage.getItem("accid");
	var current_user =localStorage.getItem('usernumericid');

	if(rqbi_id!=""){
		$.ajax({
			type:'post',
	        url: laravel_url+"/get_state_specific_details",
	        data:{rqbi_id:getrqbi_id,accid:accid,com_id:com_id,current_user:current_user},
			success: function (response) {
				var state = jQuery.parseJSON(response);
				if (state.state_specific!="") {
					if (state.array_details =="not_array") { 
						var obj = JSON.parse(state.state_specific);
					} else { 
						var obj =state.state_specific;
					}

					if (obj.length >0) {
						$('#covStateSpecific').val(obj);
						$('#covStateSpecific').multiselect('refresh');
						$('.covStateSpecDiv button').attr('style','border: 1px solid #eee !important');
					} else {
						$('#covStateSpecific').val('');
						$('#covStateSpecific').multiselect('refresh');
					}
				}
			},
			complete: function (){
				$('#covStateSpecific').attr('data-click','no');
			},
		    error: function (data) {
		              
		    }
		});
	}
}

function cov_mandatory_check () {

	var cov_val_status = true;
	var rqbiDeductibleInsured_value="";

	var covPrimaryState = $('#covPrimaryState').val();
	var covPrimaryState_val_status = chk_trueOrfalse(covPrimaryState,'chk_with_zero','#covPrimaryState');
	if(!covPrimaryState_val_status){
    	cov_val_status = covPrimaryState_val_status
    }

	var covStateSpecific = $('#covStateSpecific').val();
	if(covStateSpecific != null){
    if(covStateSpecific.length == "0") { 
      cov_val_status = false;
      $('.covStateSpecDiv button').attr('style','border :1px solid #e10f0f !important'); 
    }
  } else {
    cov_val_status = false;
    $('.covStateSpecDiv button').attr('style','border :1px solid #e10f0f !important');
  }
	
	var coverage_type_array = [];
    $("input[name='CoverageType']:checked").each( function () {
    	var value = $(this).val();
		coverage_type_array.push(value);
	});
    var coverage_type = coverage_type_array.toString();
    var coverage_type_val_status = chk_trueOrfalse(coverage_type,'','');
    if(!coverage_type_val_status){
    	cov_val_status = coverage_type_val_status
    }
    
    $("input[name='rqbiDeductibleInsured']:checked").each( function () {
    	rqbiDeductibleInsured_value = $(this).val();
	});

	var rqbiOccurDeductible = $('#rqbiOccurDeductible').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "1" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		var rqbiOccurDeductible_val_status = chk_trueOrfalse(rqbiOccurDeductible,'','#rqbiOccurDeductible');
		if(!rqbiOccurDeductible_val_status){
	    	cov_val_status = rqbiOccurDeductible_val_status
	    }
	}
	
	var rqbiDeductType = $('#rqbiDeductType').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "1" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		var rqbiDeductType_val_status = chk_trueOrfalse(rqbiDeductType,'chk_with_zero','#rqbiDeductType');
		if(!rqbiDeductType_val_status){
	    	cov_val_status = rqbiDeductType_val_status
	    }
	}

	var liquorDeductible = $('#liquorDeductible').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "2" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		var liquorDeductible_val_status = chk_trueOrfalse(liquorDeductible,'','#liquorDeductible');
		if(!liquorDeductible_val_status){
	    	cov_val_status = liquorDeductible_val_status
	    }
	}

	var liquorDeductType = $('#liquorDeductType').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "2" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		var liquorDeductType_val_status = chk_trueOrfalse(liquorDeductType,'chk_with_zero','#liquorDeductType');
		if(!liquorDeductType_val_status){
	    	cov_val_status = liquorDeductType_val_status
	    }
	}

	var OcpDeductible = $('#OcpDeductible').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "3") {
		var OcpDeductible_val_status = chk_trueOrfalse(OcpDeductible,'','#OcpDeductible');
		if(!OcpDeductible_val_status){
	    	cov_val_status = OcpDeductible_val_status
	    }
	}
	var OcpDeductType = $('#OcpDeductType').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "3") {
		var OcpDeductType_val_status = chk_trueOrfalse(OcpDeductType,'chk_with_zero','#OcpDeductType');
		if(!OcpDeductType_val_status){
	    	cov_val_status = OcpDeductType_val_status
	    }
	}

	var rqbiOccurSir = $('#rqbiOccurSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "1" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		rqbiOccurSir_val_status = chk_trueOrfalse(rqbiOccurSir,'chk_with_zero','#rqbiOccurSir');
		if(!rqbiOccurSir_val_status){
	    	cov_val_status = rqbiOccurSir_val_status
	    }
	}
	var rqbiSirAggregate = $('#rqbiSirAggregate').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "1" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		var rqbiSirAggregate_val_status = chk_trueOrfalse(rqbiSirAggregate,'','#rqbiSirAggregate');
		if(!rqbiSirAggregate_val_status){
	    	cov_val_status = rqbiSirAggregate_val_status
	    }
	}
	var rqbiSir = $('#rqbiSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "1" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		if($('.Sir_error_valdtn').css('display') == 'block' || rqbiSir == ""){
			var rqbiSir_val_status = false;
			$('#rqbiSir').addClass('redBorder');
			if(!rqbiSir_val_status){
		    	cov_val_status = rqbiSir_val_status
		    }
		}else{
			$('#rqbiSir').removeClass('redBorder');
		}
	}

	var liquorOccurSir = $('#liquorOccurSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "2" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		var liquorOccurSir_val_status = chk_trueOrfalse(liquorOccurSir,'chk_with_zero','#liquorOccurSir');
		if(!liquorOccurSir_val_status){
	    	cov_val_status = liquorOccurSir_val_status
	    }
	}

	var liquorSirAggregate = $('#liquorSirAggregate').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "2" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		var liquorSirAggregate_val_status = chk_trueOrfalse(liquorSirAggregate,'','#liquorSirAggregate');
		if(!liquorSirAggregate_val_status){
	    	cov_val_status = liquorSirAggregate_val_status
	    }
	}
	var liquorSir = $('#liquorSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "2" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		if($('.liquorSir_error_valdtn').css('display') == 'block' || liquorSir == ""){
			var liquorSir_val_status = false;
			$('#liquorSir').addClass('redBorder');
			if(!liquorSir_val_status){
		    	cov_val_status = liquorSir_val_status
		    }
		}else{
			$('#liquorSir').removeClass('redBorder');
		}
	}

	var OcpOccurSir = $('#OcpOccurSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "3") {
		var OcpOccurSir_val_status = chk_trueOrfalse(OcpOccurSir,'chk_with_zero','#OcpOccurSir');
		if(!OcpOccurSir_val_status){
	    	cov_val_status = OcpOccurSir_val_status
	    }
	}
	var OcpSirAggregate = $('#OcpSirAggregate').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "3") {
		var OcpSirAggregate_val_status = chk_trueOrfalse(OcpSirAggregate,'','#OcpSirAggregate');
		if(!OcpSirAggregate_val_status){
	    	cov_val_status = OcpSirAggregate_val_status
	    }
	}
	var OcpSir = $('#OcpSir').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "3") {
		if($('.ocpSir_error_valdtn').css('display') == 'block' || OcpSir == ""){
			var OcpSir_val_status = false;
			$('#OcpSir').addClass('redBorder');
			if(!OcpSir_val_status){
		    	cov_val_status = OcpSir_val_status
		    }
		}else{
			$('#OcpSir').removeClass('redBorder');
		}
	}
	var OcpDeductCredit = $('#OcpDeductCredit').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "3") {
		if($('.OcpDeductCredit_error_valdtn').css('display') == 'block'){
			var OcpDeductCredit_val_status = false;
			$('#OcpDeductCredit').addClass('redBorder');
			if(!OcpDeductCredit_val_status){
		    	cov_val_status = OcpDeductCredit_val_status
		    }
		}else{
			$('#OcpDeductCredit').removeClass('redBorder');
		}
	}

	var OcpSirCredit = $('#OcpSirCredit').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "3") {
		if($('.OcpSirCredit_error_valdtn').css('display') == 'block'){			
			var OcpSirCredit_val_status = false;
			$('#OcpSirCredit').addClass('redBorder');
			if(!OcpSirCredit_val_status){
		    	cov_val_status = OcpSirCredit_val_status
		    }
		}else{
			$('#OcpSirCredit').removeClass('redBorder');
		}
	}

	var liquorDeductCredit = $('#liquorDeductCredit').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "2" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		if($('.liquorDeductCredit_error_valdtn').css('display') == 'block'){
			var liquorDeductCredit_val_status = false;
			$('#liquorDeductCredit').addClass('redBorder');
			if(!liquorDeductCredit_val_status){
		    	cov_val_status = liquorDeductCredit_val_status
		    }
		}else{
			$('#liquorDeductCredit').removeClass('redBorder');
		}
	}

	var liquorSirCredit = $('#liquorSirCredit').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "2" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		if($('.liquorSirCredit_error_valdtn').css('display') == 'block'){
			var liquorSirCredit_val_status = false;
			$('#liquorSirCredit').addClass('redBorder');
			if(!liquorSirCredit_val_status){
		    	cov_val_status = liquorSirCredit_val_status
		    }
		}else{
			$('#liquorSirCredit').removeClass('redBorder');
		}
	}

	
	var glDeductCredit = $('#glDeductCredit').val();
	if (rqbiDeductibleInsured_value == "1" && coverage_type == "1" || rqbiDeductibleInsured_value == "1" && coverage_type == "1,2") {
		if($('.glDeductCredit_error_valdtn').css('display') == 'block'){
			var glDeductCredit_val_status = false;
			$('#glDeductCredit').addClass('redBorder');
			if(!glDeductCredit_val_status){
		    	cov_val_status = glDeductCredit_val_status
		    }
		}else{
			$('#glDeductCredit').removeClass('redBorder');
		}
	}

	var SirCredit = $('#SirCredit').val();
	if (rqbiDeductibleInsured_value == "2" && coverage_type == "1" || rqbiDeductibleInsured_value == "2" && coverage_type == "1,2") {
		if($('.SirCredit_error_valdtn').css('display') == 'block'){
			var SirCredit_val_status = false;
			$('#SirCredit').addClass('redBorder');
			if(!SirCredit_val_status){
		    	cov_val_status = SirCredit_val_status
		    }
		}else{
			$('#SirCredit').removeClass('redBorder');
		}

	}

  /********* SIC Code validation *******/
	var rqbi_SicCode = $('#rqbi_SicCode').val();
	if(rqbi_SicCode == ''){
		// $('#rqbi_SicCode').addClass('redBorder');
		// cov_val_status = false;
	}
  
	return cov_val_status;
}

function chk_trueOrfalse (chk_val,chk_with_zero,get_id) {
	var status = true;
	if (chk_with_zero == "") {
		if (chk_val == "") {
			status = false;
			if(get_id != "") {
				$(get_id).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
			}
		}
	} else {
		if (chk_val == "0") {
			status = false;
			if(get_id != "") {
				$(get_id).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
			}
		}
	}
	console.log(status);
	return status;
}

function EachandGnrl_error_removed () {

	$('#each_errgl').remove();
	$('#rqbiEachOccur').removeAttr('style');
	$('#gnrl_errgl').remove();
	$('#rqbiGeneralAggr').removeAttr('style');
	$('#liq_erreach').remove();
	$('#rqbiLiquorEachOccur').removeAttr('style');
	$('#liq_errgnrl').remove();
	$('#rqbiLiquorGeneralAggr').removeAttr('style');
	$('#ocp_errech').remove();
	$('#rqbiOcpEachOccur').removeAttr('style');
}

/*Deductible credit added by vaishnavi - 10-03-2021 */
$(document).on('blur', '#OcpDeductCredit, #liquorDeductCredit, #glDeductCredit, #SirCredit, #liquorSirCredit, #OcpSirCredit', function() { 

    var DeductCredit = $(this).val();
    var DeductCredit_datavalue = $(this).attr('data-value');
    var Max_length = 99;
    var Min_length = 0;    
 	var get_id_name = $(this).attr('id');
 	var column_name = ''; 	

    if((DeductCredit <= Max_length) && (DeductCredit > Min_length)) {

    	if(get_id_name == 'glDeductCredit'){
	 		column_name = 'deductible_credit';

	 	}else if(get_id_name == 'liquorDeductCredit'){
	 		column_name = 'liq_deductible_credit';

	 	}else if(get_id_name == 'OcpDeductCredit'){
	 		column_name = 'ocp_deductible_credit';

	 	}else if(get_id_name == "OcpSirCredit"){
	 		column_name = 'ocp_sir_credit';

	 	}else if(get_id_name == "liquorSirCredit"){
	 		column_name = 'liq_sir_credit';

	 	}else if(get_id_name == "SirCredit"){
	 		column_name = 'sir_credit';
	 	}
	 	if(DeductCredit_datavalue != DeductCredit){
	 		$(this).attr('data-value',DeductCredit);
	 		add_coverage_limit (DeductCredit, column_name);

	 	}
	 	$('.'+get_id_name+'_error_valdtn').css('display','none');
	 	$('.'+get_id_name).removeClass('redBorder');

    }else{
    	if(DeductCredit != ""){    		
	    	$('.'+get_id_name+'_error_valdtn').css('display','block');
	    	$('.'+get_id_name+'_error_valdtn').css('color','red');
	    	$('.'+get_id_name).addClass('redBorder');
    	}else{
	 		$('.'+get_id_name+'_error_valdtn').css('display','none');
	    	$('.'+get_id_name).removeClass('redBorder');
    	}
    }

});

/*Deductible credit added by vaishnavi - 10-03-2021 */
$(document).on('keyup', '.rqbiTpaName', function() { 
	var value = $(this).val();
	var new_value = alphanumeric(value); 
	$(this).val(new_value);
});

$(document).on('click', '#covWarningCancel', function() { 
	coverage_typeBase_show();
});

$(document).on('click', '.tpaCancelButton', function() { 
	get_tpa_section(accid,'cancelTpa_click');
});

// sic work
function sic_work(details_process){
	var current_user = localStorage.getItem('usernumericid');
	var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        type:"POST",
        cache: false,
        url: laravel_url+"/sic_work",
        data:{ acct_id:acct_id, rqbid : rqbi_id, details_process : details_process, current_user : current_user, com_id : com_id },
        success:function(response){ 
          if(response) {
            $('.bind_siccode_value').html('');
            $('.bind_siccode_value').html(response);
          } 
        }
    });
}

$(document).on('click', '.covLimitAccordHead', function() {
	rqbi_policy_status();
});

$(document).on('change', '#rqbi_SicCode', function() {
	var sic_CodeVal = $('#rqbi_SicCode').val();
	var current_user = localStorage.getItem('usernumericid');
	var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();

	$.ajax({
        type:"POST",
        url: laravel_url+"/change_sic_code",
        data:{ acct_id:acct_id, rqbid : rqbi_id, sic_CodeVal : sic_CodeVal, current_user : current_user, com_id : com_id },
        success:function(response){ 
            console.log(response);
        }
    });

});


$(document).on('click','#coverageLimit_sec', function() {
    var accountid = accid;
    var slct_version_name = $('#rqbiQuoteVersion').val();
    var ex = $(this).attr('aria-expanded');
    if(ex == "true") {

    	$.when(get_tpa_select_dropdown()).then( function () {
	    	get_tpa_section(accountid,'cov_sec_clk');
	        sic_work('retrive_process');
        });
    }

});

function coverage_based_deductible_reset(){

	// var accid = localStorage.getItem('accid');
    var rqbi_id_val = $('#rqbiQuoteVersion').val();
    var coverage_type_array = [];
    $("input[name='CoverageType']:checked").each( function () {
    	var value = $(this).val();
		coverage_type_array.push(value);
	});
    var coverage_type = coverage_type_array.toString();
    $.ajax({
        type: "post",
        url: laravel_url+"/coverage_based_deductible_reset",
        data:{'accid': accid,'com_id' : com_id, 'rqbi_id' : rqbi_id_val, 'updated_by' :useremail, 'coverage_type' : coverage_type},
        
        success: function(data) {
           //alert("data"+data);
        },
        error: function(){
            new PNotify({ title: 'Error', text:'Getting error' , delay: 1500, type: 'error' });
        },
        complete :function(){
        	get_coverageLimit (accid,rqbi_id_val);
        	get_tpa_section(accid,'cov_base_resetClk');
        }

    });
}

$(document).on('click','#typeGL', function() {
	setTimeout(function(){
		var gl_checked = $('#typeGL').prop('checked');
		var gl_type_visibility = $('.gl_type_div').css('display');
		if (gl_checked == true) {
			if (gl_type_visibility == 'none') {
				$('.gl_type_div').css('display', 'block');
			}
		}
	}, 500);
});

function update_gltype(value) {
	try {
		var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		var updated_by = localStorage.getItem('usernumericid');
		var comid = com_id;
		var rqbiid = rqbi_id;
        $.ajax({
            url: laravel_url+"/update_gltype",
            type:'post',
            data : {acct_id:acct_id, com_id:comid, rqbi_id:rqbiid, gl_type:value, updated_by:updated_by},
            success:function(response) {
                enabled_continueTofullQuote();
	    		checkContinueToFullQuoteStatus();
            },
            complete : function() {
                
            }
        });
    }
    catch(err) {
		console.log(err);
		
	}
}

$(document).on('click','.cov_gl_type', function() {
	$('.cov_gl_type').not(this).prop('checked', false);
	var check_status =  $(this).prop('checked');
	if (check_status == true) {
		var value = $(this).val();
		update_gltype(value);
	} else {
		update_gltype(null);
	}
});

$(document).on('blur','.rqbiTpaEmailid', function() {
  var email_val = $(this).val();
  email_validation (email_val, error_msg_class = 'cov_limit_email_valid', email_txtbx_class = 'rqbiTpaEmailid');
});


function email_validation (email_val, error_msg_class, email_txtbx_class) {
    var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

    if (testEmail.test(email_val)) {
      $('.'+email_txtbx_class).removeClass('redBorder');
      $('.'+error_msg_class).hide();
	  return true;
    } else {
      if($('.'+email_txtbx_class).val() != ''){
        $('.'+error_msg_class).show();
        $('.'+email_txtbx_class).addClass('redBorder');
		return false;
      } else {
        $('.'+error_msg_class).hide();
        $('.'+email_txtbx_class).removeClass('redBorder');
		return true;
      }
    }
}