
// var accid = localStorage.getItem('accid');
// var accid = accid;
var useremail = localStorage.getItem('userid');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();


$(document).ready(function(){
/*Coverage & Limits - Gl and Liquor Deductible*/
var deductible = [
	'250', '500', '750', '1000', '2500',
	'5000', '10000', '15000', '20000', '25000'
];
	/*Coverage & Limits - State multiselect*/
	// $.ajax({
	//   method:"GET",
	//   url: laravel_url+"/get_primary_state",
	//   	success: function(response) {
	// 		var state = jQuery.parseJSON(response);
			
	// 		$('.covPrimaryStateDiv').html(state.primstate);
	// 		$('.covStateSpecDiv').html(state.statespec);

	// 		$('#covStateSpecific').multiselect({
	// 			includeSelectAllOption : true,
	// 			nonSelectedText: 'Select an Option'
	// 		}); 
	//     }
	// });


	graduatedratingbtn_disableenable();
	
	/*Coverage & Limits - Gl and Liquor Deductible*/
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

	$("#datepicker").datepicker({ 
	    autoclose: true, 
	    todayHighlight: true
		}).datepicker('update', new Date());

	$("#retroactiveDate").datepicker({ 
	    autoclose: true, 
	    todayHighlight: true
	});

	$('.datepicker').each(function() {
	   $(this).datepicker({
	  	 autoclose: true
	   });
	});

	$(".rqbi_effect_dt").datepicker({ 
        autoclose: true, 
        format: 'mm-dd-yyyy',
        clearBtn: true,
    });    

    $(".rqbi_expire_dt").datepicker({ 
        autoclose: true, 
        todayHighlight: true,
        format: 'mm-dd-yyyy',
        clearBtn: true,
    });

	$('#covStateSpecific').multiselect({
		includeSelectAllOption : true,
		nonSelectedText: 'Select an Option'
	});

	$('.lob_multiselect .btn-group').addClass('col-lg-12 p-0');

	$('.compositeMultiCcode').multiselect({
		includeSelectAllOption : true,
		nonSelectedText: 'Please Select'
	}); 

	/*Quote - Docs list validation -> Bind - Disable, Enable*/
	var doclistcount = $('.quoteDocsList').length;

	if ( doclistcount == 0) {
		$('.bind_card_header').addClass('disabled');
	} else {
		$('.bind_card_header').removeClass('disabled');
	}
	
	//Classbuilder classcode autocomplete
	var awesomplete_classcode = {};

	$(document).on('keyup', '.cbClasscode', function() {
		var clcode = $(this).val();
		var rowid = $(this).attr('data-rowid');
		$('#Invalid_cbClasscode_'+rowid).css('display','none');
		initialize_previousClassCode(clcode, rowid);

		$(this).focus();
	});

	function initialize_previousClassCode (classcode, rowid) {
		previousclasscode_input = (document.getElementById('cbClasscode_'+rowid));
		previousclasscode_global1 = ["1001 - Ada"];
		if(jQuery.isEmptyObject(awesomplete_classcode[rowid])){
			awesomplete_classcode[rowid] = new Awesomplete(previousclasscode_input, {
				list: previousclasscode_global1,
				minChars: 1,
				maxItems: 500,
				autoFirst: false
			});
		}

		var class_code = $('#cbClasscode_'+rowid).val();
		//class_code = class_code.substring(0, 5);

		var coverage_type_array = [];
    	$("input[name='CoverageType']:checked").each(function(){
    		var value = $(this).val();
		    coverage_type_array.push(value);
		});

    	var cov_ty = coverage_type_array.toString();

		if (class_code.length >= 1){
			/*Check coverages checked or not*/
			if ( ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == false && ( $('#typeOCP').prop('checked') == false ) ) ) {
			    $('.covLimitAccordHead').removeClass('collapsed');
			    $('#coverageLimitAccord').addClass('show');

				$('html, body').animate({
			      scrollTop: $('.covckbx').offset().top-120
			    }, 1000);
			} else {
				$.ajax({
					url: "/brokerage/template/master_class_code_search.php",
					method: 'GET',
					data:{
						'classcode_gl': class_code,'coverage':cov_ty,
					},
					dataType: 'json',

					success: function(response) {
				        
						if(response.status!='fail'){
							suggestionList = response;
							finalSuggestArray = [];
							$.each(suggestionList, function(index, value) {

								finalSuggestArray[index] = [[value.classcode_gl + ' - ' + value.classname],[value.classcode_gl + ' - ' + value.classname]];
							});
							
							hasoption = 1;
							awesomplete_classcode[rowid].list = finalSuggestArray;
							  
						}else{
							 $('.rqbiPremBaseval_'+rowid).html('');
				             $('.clas_desc_'+rowid).html('');
				             $('#cbClasscode_'+rowid).val('');
				             $('#Invalid_cbClasscode_'+rowid).css('display','block');
				             $('#Invalid_cbClasscode_'+rowid).css('color','red');
							 hasoption = 0;  
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
	}

	covCkbxFunctionality ();
	
	var awesomplete_zipcode = {};

	$(document).on('keyup', '.locZipcode', function() {
		var zipcode = $(this).val();
		var rowid = $(this).attr('data-rowid');
		$(this).removeAttr('style').prev("label").removeAttr('style');
		var numberval = numberonly(zipcode); 
		$(this).val(numberval);
		var zipcode1 = $(this).val();
		initialize_previousZipCode(zipcode1, rowid);
		$(this).focus();
	});

	function initialize_previousZipCode (zipcode, rowid) {
		$(this).focus();
		previouszipcode_input = (document.getElementById('locZipcode_'+rowid));
		previouszipcode_global1 = ["1001 - Ada"];
		if(jQuery.isEmptyObject(awesomplete_zipcode[rowid])){
			awesomplete_zipcode[rowid] = new Awesomplete(previouszipcode_input, {
				list: previouszipcode_global1,
				minChars: 4,
				maxItems: 500,
				//autoFirst: false
			});
		}

		var zip_code = $('#locZipcode_'+rowid).val();
		if (zipcode.length > 4){

			$.ajax({
				url: laravel_url+"/get_zip_details",
				type:'post',
				data:{
					'zipcode': zip_code,
				},
				success: function(response) {
					suggestionList = JSON.parse(response);
					finalSuggestArray = [];
					$.each(suggestionList, function(index, value) {
						finalSuggestArray[index] = [[value.us_zip + ' - ' + value.us_county],[value.us_zip + ' - ' + value.us_county]];
					});
					awesomplete_zipcode[rowid].list = finalSuggestArray;
					$(this).focus();
				}
			});
		}
	}

	$(this).removeAttr('style').css('pointer-events', 'initial');

	/*Accounts notes read more*/

	$('.accNotesDesc').each(function(element){
		var th = $(this).text();
		if(th.length > 64 ){
			$(this).after('<a href="javascript:void(0);">Read More</a>');	
		}
	});
	
	$("#pills-rqbi .datepicker-days").find('td.today').removeClass('today active');
});

//Deductible and Self insured retention
$(document).on('change', '.rqbiDeductibleInsured', function() {
	var changeVal = $(this).val();

	if(changeVal == "1"){
		$('.rqbiSirAggregateDiv, .rqbiOccurSirDiv, .sirPremiumDiv, .rqbiTpa').hide();
	} else{
		$('.rqbiSirAggregateDiv, .rqbiOccurSirDiv, .sirPremiumDiv, .rqbiTpa').show();
		$('.deductibleMonoline, .liquorDeductDiv, .deductPremiumDiv').hide();
	}
	
	covCkbxFunctionality ();
});

/*Deductible Checkbox functionality*/

function covCkbxFunctionality () {
	var changeVal = $('.rqbiDeductibleInsured:checked').val();

	if(changeVal == "1") {
		$('.deductTbleSection').show();	
		$('.sirTblSection, .rqbiTpa').hide();
	} else {
		$('.deductTbleSection').hide();	
		$('.sirTblSection, .rqbiTpa').show();
	}

	if ( ( $('#typeGL').prop('checked') == true && $('#typeLiquor').prop('checked') == false && ( $('#typeOCP').prop('checked') == false ) ) ) {
			if(changeVal == "1") {
				$('.deductibleMonoline').show();
				$('.liquorDeductDiv, .OcpDeductDiv, .sirGl, .sirLiquor, .sirOcp').hide();
			} else{
				$('.sirGl').show();
				$('.liquorDeductDiv, .OcpDeductDiv, .deductibleMonoline, .sirLiquor, .sirOcp').hide();
			}

			$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

			$('.deductPremiumDiv').show();	
			$('.rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

		} else if ( $('#typeGL').prop('checked') == true && ( $('#typeLiquor').prop('checked') == true  && ( $('#typeOCP').prop('checked') == false ) ) ) {
			if(changeVal == "1") {
				$('.deductibleMonoline, .liquorDeductDiv').show();
				$('.OcpDeductDiv, .sirGl, .sirLiquor, .sirOcp').hide();
			} else{
				$('.deductibleMonoline, .liquorDeductDiv, .OcpDeductDiv, .sirOcp').hide();
				$(' .sirGl, .sirLiquor').show();
			}

			$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

			$('.deductPremiumDiv').show();
			$('.rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

		} else if  (  $('#typeGL').prop('checked') == false &&  $('#typeLiquor').prop('checked') == true &&  $('#typeOCP').prop('checked') == false ) {
			if(changeVal == "1") {
				$('.liquorDeductDiv').show();
				$('.sirLiquor,.OcpDeductDiv, .deductibleMonoline, .sirGl, .sirOcp').hide();
			} else{
				$('.sirLiquor').show();
				$('.liquorDeductDiv,.OcpDeductDiv, .deductibleMonoline, .sirGl, .sirOcp').hide();
			}

			$('.rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

		} else if  (  $('#typeGL').prop('checked') == false &&  $('#typeLiquor').prop('checked') == false &&  $('#typeOCP').prop('checked') == true ) {

			if(changeVal == "1") {
				$('.OcpDeductDiv').show();
				$('.liquorDeductDiv,.deductibleMonoline, .sirGl, .sirLiquor, .sirOcp').hide();
			} else{
				$('.sirOcp').show();
				$('.liquorDeductDiv, .deductibleMonoline, .sirLiquor, .sirGl').hide();
			}

			$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('OCP');

			$('.rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').show();
		
		} else if ( ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == false && ( $('#typeOCP').prop('checked') == false ) ) ) {
			if(changeVal == "1") {
				$('.deductibleMonoline').show();
				$('.liquorDeductDiv, .OcpDeductDiv, .sirGl, .sirLiquor, .sirOcp').hide();
			} else{
				$('.sirGl').show();
				$('.liquorDeductDiv, .OcpDeductDiv, .deductibleMonoline, .sirLiquor, .sirOcp').hide();
			}

			$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

			$('.deductPremiumDiv').show();	
			$('.rqbiDesigContractorDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

			$('.covMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');
		}

		if ( $('#typeGL').prop('checked') == true && ( $('#typeLiquor').prop('checked') == true ) ) {

			$('.dedGlTitle').text('').text('GL Deductible');
			$('.dedTypeGlTitle').text('').text('GL Deductible Type');

		} else {
			$('.dedGlTitle').text('').text('Deductible');
			$('.dedTypeGlTitle').text('').text('Deductible Type');
		}

}


function tpaDisableFields () {
	$('.rqbiTpaAddress').addClass('inputDisabled');
	$('.rqbiTpaContactName').addClass('inputDisabled');
	$('.rqbiTpaMobileNo').addClass('inputDisabled');
	$('.rqbiTpaEmailid').addClass('inputDisabled');
}
//Classbuilder - Edit Classcode
$(document).on('click', '.rqbiCcodeLabel', function() {
	var rid = $(this).parent('td').parent('tr').attr('data-trUniqueid');
	var classcode = $(this).text();
	$('.rqbiCcode_'+rid).show().val(classcode).focus();
	$('.rqbiCcodeLabel_'+rid).hide();
});

$(document).on('focusout', '.rqbiCcode', function() {
	var rid = $(this).parent('td').parent('tr').attr('data-trUniqueid');
	var classcode = $(this).val();
	$('.rqbiCcodeLabel_'+rid).show().text(classcode);
	$('.rqbiCcode_'+rid).hide();
});

//Classbuilder - Arrow icon click function  
$(document).on('click', '.cbDownArrow', function() {
	var rowid = $(this).attr('data-rowid');
	$('.cbUpArrow_'+rowid).show();
	$('.cbDownArrow_'+rowid).hide();
	$('.cbRating_'+rowid).show();
});

$(document).on('click', '.cbUpArrow', function() {
	var rowid = $(this).attr('data-rowid');
	$('.cbUpArrow_'+rowid).hide();
	$('.cbDownArrow_'+rowid).show();
	$('.cbRating_'+rowid).hide();
});

//Class Builder Credibility toggle Funtion
$(document).on('click', '.cbBtnToggle', function() {
	var rowid = $(this).attr('data-rowid');

    $(this).find('.cbBtnToggle').toggleClass('active');  
    
    if ($(this).find('.credibilityActive').length>0) {
    	$(this).find('.cbBtnToggle').toggleClass('credibilityActive');
    }

    $(this).find('.cbBtnToggle').toggleClass('btn-default');

    if($('.credibilityBtn_'+rowid).hasClass('active')){
    	$('.rqbiOverridePrem_'+rowid).addClass('inputDisabled');
    }else{
    	$('.rqbiOverridePrem_'+rowid).removeClass('inputDisabled');
    }  
});

//Generate Quote Button Click
// $(document).on('click', '.rqbiGenerateQuoteBtn', function() {
	
// });

//View Binder Button Click
$(document).on('click', '.rqbiViewBinder', function() {
	$('.rqbiBindList').show();
});

//Issue - View Policy Function
$(document).on('click', '.rqbiViewIssuePolicy', function() {
	$('.rqbiPolicyLists').show();
});

//Class Builder - Graduated rating table
$(document).on('click', '.classbuildGraduatedRating', function() {
	$('.cbGraduatedTableDiv').toggle();
	$('.Add_GraduatedRating_div').css('display','block');

	var class_code_id = $('#class_code_id').val();
	if(class_code_id != ""){
		retrive_graduated_rating('null');
	}
	
});

$(document).on('click', '.AddGraduatedRating', function() {
	$('.AddGraduatedRating').addClass('disabled');
	$('.AddGraduatedRating').addClass('enable_grad_rating');
	$('.GradRatingTbody').toggle();
	disable_graduated_rating('add_first_row');
});


//Class Builder - Composite rating table
$(document).on('click', '.cbCompRating', function() {
	$('.compositeRateDiv').toggle();
	var data_rid = $('.comprow').attr('data-rid');
	if(data_rid != undefined && data_rid != ""){
		retrive_compostive_rating();
	}
});

//Class Builder - Graduated Amount Edit Function
$(document).on('click', '.gradExpLabel', function() {
	var rid = $(this).parent('td').parent('tr').attr('data-graduatedRowId');
	var exposureto = $(this).val();
	$('.gradExpEditInput_'+rid).show().val(exposureto).focus();
	$('.gradExpLabel_'+rid).hide();
});

$(document).on('focusout', '.gradExpEditInput', function() {
	var rid = $(this).attr('data-rowid');
	// var rid = $(this).parent('td').parent('tr').attr('data-graduatedRowId');
	var exposureto = $(this).val();
	var expto = $(this).val().replace(' ', '').replace(/,/g, '').replace('$', '').replace(/\s/g, '');
	var expfrom = $('.ExposureFrom_'+rid).val().replace(' ', '').replace(/,/g, '').replace('$', '').replace(/\s/g, '');
	// $('.gradExpEditInput_'+rid).hide();
	$('.gradExpLabel_'+rid).show().val(exposureto).focus();

	if(BigInt(expfrom) > BigInt(expto) || BigInt(expfrom) == BigInt(expto)) {
		$('.ExposureTo_'+rid).addClass('redBorder');
		$('#show_exposure_greater_'+rid).show();
		$('.show_exposure_to_max_valdtn').css("display", "none");
	} else {
		$('.ExposureTo_'+rid).removeClass('redBorder');
	}
});

/*Class builder add row*/
var inc_cbrowid = 1;
$(document).on("click", ".cbAddRow", function(e) {
	e.preventDefault();
	graduatedratingbtn_disableenable();

	var empty_val = false;
	var ifanyandincluded_check = $(this).attr('data-rowid');
	var rowId = $('#rowId').val();
    //alert(rowId+"=="+rowCount);
    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');   
    if(enable_grad_rating == true || gr_disabled == true ){
		$('.cbaddPopup').trigger('click');
	}

	if($('input[type="checkbox"]#rqbiIfany_'+ifanyandincluded_check+':checked').val()=='on'){//mytest}
		
		$('#cbLocSelect_'+ifanyandincluded_check).removeClass('redBorder');
		$('#cbClasscode_'+ifanyandincluded_check).removeClass('redBorder');
		$('#rqbiFinalRate_'+ifanyandincluded_check).removeClass('redBorder');

	    	var ccode = $("#cbClasscode_"+ifanyandincluded_check).val();
			if(ccode == ""){
				$('#cbClasscode_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		var loc = $("#cbLocSelect_"+ifanyandincluded_check).val();

			if(loc == "" || loc == 'Select Location'){
				$('#cbLocSelect_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		
		var exp = $("#rqbiFinalRate_"+ifanyandincluded_check).val();

			if(exp == "" || exp == 0){
				$('#rqbiFinalRate_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}

		var prem_basis = $('.classbuildpremBasis_'+ifanyandincluded_check).val();

		if (prem_basis == '') {
			$('.classbuildpremBasis_'+ifanyandincluded_check).addClass('redBorder');
			empty_val = true;
		}

	}else if($('input[type="checkbox"]#rqbiIncluded_'+ifanyandincluded_check+':checked').val()=='on'){

		var ccode = $("#cbClasscode_"+ifanyandincluded_check).val();

			if(ccode == ""){
				$('.cbClasscode_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		var loc = $("#cbLocSelect_"+ifanyandincluded_check).val();

			if(loc == "" || loc == 'Select Location'){
				$('#cbLocSelect_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}

		var prem_basis = $('.classbuildpremBasis_'+ifanyandincluded_check).val();

		if (prem_basis == '') {
			$('.classbuildpremBasis_'+ifanyandincluded_check).addClass('redBorder');
			empty_val = true;
		}
		
	}else{

		$(".cbClasscode").each(function(){
	    	var ccode = $(this).val();
	    	var crid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+crid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+crid+':checked').val()=='on'){//mytest
				empty_val = false;
	    	}else{
	    		if(ccode == ""){
					$('.cbClasscode_'+crid).addClass('redBorder');
					empty_val = true;
				}
	    	}

			
		});

		$(".cbLocSelect").each(function(){
	    	var loc = $(this).find('option:selected').text();
	    	var lrid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+lrid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+lrid+':checked').val()=='on'){//mytest
	    		empty_val = false;
	    	}else{
				if(loc == "" || loc == 'Select Location'){
					$('.cbLocSelect_'+lrid).addClass('redBorder');
					empty_val = true;
				}
			}
		});

		$(".rqbiExposure").each(function(){
	    	var exp = $(this).val();
	    	var erid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+erid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+erid+':checked').val()=='on'){//mytest
	        	empty_val = false;
	    	}else{
				if(exp == "" || exp == 0){
					$('.rqbiExposure_'+erid).addClass('redBorder');
					empty_val = true;
				}
			}
		});


		$(".classbuildpremBasis").each(function(){
	    	var prem_basis = $(this).val();
	    	var prid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+prid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+prid+':checked').val()=='on'){//mytest
	        	empty_val = false;
	    	}else{
				if(prem_basis == ""){
					$('.classbuildpremBasis_'+prid).addClass('redBorder');
					empty_val = true;
				}
			}
		});
	}

	if (empty_val!=true) {
		var rowCount = $('#rowCount').val();

		var rid = $(this).attr('data-rowid');

		//var clcode = $('#cbClasscode_'+rid).val();
		//var loc = $('.cbLocSelect_'+rid).val();
		var coverty = $('#cbClasscode_'+rid).attr('data-cover_type');
		//var p_base = $('.rqbiPremBaseval_'+rid).text();

		rowCount++;
		inc_cbrowid++;
		
	    var addRow = '<tr class="cbuildRow cbRow cbRow_'+rowCount+'" data-rowid="'+rowCount+'" data-trUniqueid="'+rowCount+'"><td class="border_unset pt-9 pl-3 loadingSpinner"><div class="txttooltip"><input type="text" class="form-control width98_perc mb-0 mt-0 cbClasscode cbClasscode_'+rowCount+'" data-rowid="'+rowCount+'" placeholder="Code" name="cbClasscode_'+rowCount+'" id="cbClasscode_'+rowCount+'" data-cover_type="" data-uicheck_class=""></div><div class="icon-container ccspinner_'+rowCount+'"><i class="cbloader"></i></div><small><span class="pull-left clas_desc_'+rowCount+'"></span></small><br /><small class="pull-left text_color class_arates_'+rowCount+'" style="display: none;">* A Rates</small><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbClasscode_'+rowCount+'" style="display:none">Invalid Class Code</p></td><td class="border_unset pt-9 pl-2 loadingSpinner"><select  class="form-control width98_perc cbLocSelect cbLocSelect_'+rowCount+' m0" id="cbLocSelect_'+rowCount+'" data-rowid="'+rowCount+'" data-cloneid="" name="cbLocSelect_'+rowCount+'" data-cover_type="" data-uicheck_loc=""></select><small><span class="pull-left terri_code terri_code_'+rowCount+' ml-3">TC:<span class="terri_code_number terri_code_number_'+rowCount+'"></span></span></small><div class="icon-container locspinner_'+rowCount+'"><i class="cbloader"></i></div></td><td class="border_unset pt-9"><div class="col-md-12 pull-left pl-0 pr-0"><div class="form-group mb-1 col-md-12 pull-left p-0"><div class="pl-2 pr-1"><div class="txttooltip"><input type="text" class="form-control  mb-0 mt-0 rqbiExposure rqbiExposure_'+rowCount+'" data-rowid="'+rowCount+'" placeholder="Exposure" name="rqbiExposure_'+rowCount+'" id="rqbiExposure_'+rowCount+'" data-cover_type="" data-uicheck_expo=""><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbexposure_'+rowCount+'" style="display:none">Invalid </p></div></div></div></div></td><td  class="border_unset pt-9"><div class="col-sm-12 pull-left pr-2 pl-2"><div class="col-md-12 pull-left p-0 rqbiFinalRateDiv rqbiFinalRateDiv_'+rowCount+'"><div class="col-md-12 p-0 pull-left"><div class="form-group mb-1 pl-0"><div class="input-group col-sm-12 pull-left p-0"><div class="txttooltip"><input type="text" class="form-control mb-0 rqbiFinalRate rqbiFinalRate_'+rowCount+'" placeholder="" name="rqbiFinalRate_'+rowCount+'" id="rqbiFinalRate_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-uicheck_rate="" maxlength="19"></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_finalrate_'+rowCount+'" style="display:none">Invalid </p></div><small class="pl-5 mt-1 ml28 frPrevAmount"><span class=" frPrevAmount_'+rowCount+'"> $ </span> </small> </div></div></div></div></td><td rowspan="2" class="verticalAlignMiddle cbAction" data-rowid="'+rowCount+'" data-cloneid=""><small class="pull-left liquorGrade liquorGrade_'+rowCount+'" style="display: none;">Liquor Grade:<span class="pull-right liquorgradeval liquorgradeval_'+rowCount+'"></span></small><small class="pull-left desigContractor desigContractor_'+rowCount+'" style="display: none;">Designation of Contractor: 5</small><br><span class="btn btn-sm btn-info icon_btn text-white mb-2 disabled cbCloneRow cbCloneRow_'+rowCount+'" id="cbCloneRow_'+rowCount+'" data-rowid="'+rowCount+'" data-cloneid="" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Clone </em>"><i class="fa fa-files-o"></i></span><br><span class="btn btn-sm btn-primary icon_btn mb-2 disabled cbAddRow cbAddRow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Add </em>"><i class="fa fa-plus"></i></span><span class="btn btn-sm btn-primary icon_btn mb-2 isonotes_btn_design isonotes_btn isonotes_btn_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="ISO Notes"><img src="../img/isologo3.png" class="isonotes_img_design" style="width: 31px;margin: -6px 0 0 -8px;"></span><br><span class="btn btn-sm btn-danger icon_btn mb-2 removeCbRow removeCbRow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Delete </em>"><i class="fa fa-trash"></i></span><br><span class="fontSize17 disabled cbDownArrow cbDownArrow_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Show Table </em>"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></span><span class="fontSize17 cbUpArrow cbUpArrow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Hide Table </em>" style="display: none;"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></span></td></tr> <tr class="cbRow cbRow_'+rowCount+'" data-trUniqueid="'+rowCount+'"><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip"><label class="col-form-label pull-left">Premium Basis<span class="color_red">*</span></label><select class="custom-select classbuildpremBasis classbuildpremBasis_'+rowCount+' col-md-12" id="classbuildpremBasis_'+rowCount+'" data-rowid="'+rowCount+'" name="classbuildpremBasis_'+rowCount+'"></select> </div></div></div></div><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Remarks</label><input type="text" class="col-md-12 form-control mb-0 rqbiRemarks rqbiRemarks_'+rowCount+'" data-rowid="'+rowCount+'" placeholder="" name="rqbiRemarks_'+rowCount+'" id="rqbiRemarks_'+rowCount+'" data-cover_type="" data-uicheck_marks=""><div class="rqbiRemarks_valdtn_'+rowCount+'" style="display:none">Invalid</div> </div></div></div></div><div class="col-md-4 pull-left pr-0 rqbiApplyModDiv rqbiApplyModDiv_'+rowCount+'" data-rowid="'+rowCount+'"><div class="form-group row mb-1"><div class="col-md-11 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Credit/Debit</label><input type="text" class="col-md-12 form-control pull-left mb-0 rqbiCreditDebit rqbiCreditDebit_'+rowCount+' wdth97p" id="rqbiCreditDebit_'+rowCount+'" name="rqbiCreditDebit_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-uicheck_credit="" disabled><div class="credit_debit_error_'+rowCount+'" style="display:none; color: red;">Invalid</div></div></div></div></div></td><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-sm-6 pull-left mt-2 pl-0 mb-1 rqbiIfanyDiv rqbiIfanyDiv_'+rowCount+'"><div class="custom-control custom-checkbox col-sm-5 pull-left ml-1 ifany_radiobtn"><input type="checkbox" class="custom-control-input rqbiIfany" id="rqbiIfany_'+rowCount+'" data-rowid="'+rowCount+'" name="rqbiIfanyIncluded_'+rowCount+'"><label class="custom-control-label" for="rqbiIfany_'+rowCount+'">&nbsp;If Any</label></div><div class="custom-control custom-checkbox col-sm-6 pull-left included_radiobtn"><input type="checkbox" class="custom-control-input rqbiIncluded" id="rqbiIncluded_'+rowCount+'" data-rowid="'+rowCount+'" name="rqbiIfanyIncluded_'+rowCount+'"><label class="custom-control-label" for="rqbiIncluded_'+rowCount+'">Included</label></div></div><div class="col-sm-6 pull-left p-0 mb-1 premium_divright"><div class="form-group row mb-1 cb_premium"><div class="col-md-12 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Premium</label><input type="text" class="col-md-12 form-control mb-0 mt-0 rqbiPremium rqbiPremium_'+rowCount+' wdth100p" data-rowid="'+rowCount+'" data-prevamount="" placeholder="" name="rqbiPremium_'+rowCount+'" id="rqbiPremium_'+rowCount+'" data-cover_type="" data-uicheck_prem="" maxlength="19" data-premium_flag=""></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbpremium_'+rowCount+'" style="display:none">Invalid </p></div><small class="mt-1 ml-3 premPrevAmount"><span class="premPrevAmount_'+rowCount+'"> $ </span></small></div></div></td></tr><tr data-trUniqueid="'+rowCount+'" class="cbRating cbRating_'+rowCount+' cbRow_'+rowCount+'" style="display: none;"><td colspan="5" class="p-2"><table class="table table-striped table-responsive-sm table-bordered text-center mb-0 cbRatingTable" id="cbRatingTable_'+rowCount+'"><thead class="cbRatingHead" data-cbunique="'+rowCount+'"><tr><th class="width8_perc">Coverage</th><th class="width6_perc">LC</th><th class="width7_perc">LCM</th><th class="width6_perc">BR</th><th class="width7_perc">ILF</th><th class="width7_perc">Ded/SIR Factor</th><th class="width6_perc">ABR</th><th class="width6_perc">Mod/SM Factor</th><th class="width6_perc">Final Rate</th><th class="width6_perc">Exposure</th><th class="width6_perc">Premium</th></tr></thead></table></td></tr>';

	    $("#cbAppendRow").append(addRow);
	    $('#rowCount').val(rowCount);
	    $('#cbClasscode_'+rowCount).focus();

	    var trlen = $('tr.cbRow').length;
	    if( trlen == 2 ) {
	    	$('.removeCbRow').hide();
	    } else {
	    	$('.removeCbRow').show();
	    }

	    serialize_cb_loc_no();

	    class_builder_loc_detatils(rowCount);
		get_classcode_prembasis(rowCount,'');

	    rowid = rowCount;

	    var getval = setInterval (function () {
			//$('#cbClasscode_'+rowCount).val(clcode).removeClass('disabledField');
			//$('.cbLocSelect_'+rowCount).val(loc).removeClass('disabledField');
			$('.ccspinner_'+rowCount).hide();
			$('.locspinner_'+rowCount).hide();
	    	clearInterval(getval);
	    }, 1000);
	} else {
		new PNotify({ title: 'Error', text: 'Please enter mandatory fields', delay: 1500, type: 'error' });
	}
	    // $( document ).tooltip();
	    $('[data-toggle="tooltip"]').tooltip();
});

/*Class builder clone row*/
$(document).on("click", ".cbCloneRow", function(e) {
	e.preventDefault();
	graduatedratingbtn_disableenable();

	var empty_val = false;
	var ifanyandincluded_check = $(this).attr('data-rowid');
	
		if($('input[type="checkbox"]#rqbiIfany_'+ifanyandincluded_check+':checked').val()=='on'){//mytest

		$('#cbLocSelect_'+ifanyandincluded_check).removeClass('redBorder');
		$('#cbClasscode_'+ifanyandincluded_check).removeClass('redBorder');
		$('#rqbiFinalRate_'+ifanyandincluded_check).removeClass('redBorder');

		var ccode = $("#cbClasscode_"+ifanyandincluded_check).val();
			if(ccode == ""){
				$('.cbClasscode_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		var loc = $("#cbLocSelect_"+ifanyandincluded_check).val();

			if(loc == "" || loc == 'Select Location'){
				$('#cbLocSelect_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		
		var exp = $("#rqbiFinalRate_"+ifanyandincluded_check).val();

			if(exp == "" || exp == 0){
				$('#rqbiFinalRate_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}

	}else if($('input[type="checkbox"].rqbiIncluded_'+ifanyandincluded_check+':checked').val()=='on'){

		var ccode = $("#cbClasscode_"+ifanyandincluded_check).val();

			if(ccode == ""){
				$('.cbClasscode_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
		
		var loc = $("#cbLocSelect_"+ifanyandincluded_check).val();

			if(loc == "" || loc == 'Select Location'){
				$('#cbLocSelect_'+ifanyandincluded_check).addClass('redBorder');
				empty_val = true;
			}
	}else{

		$(".cbClasscode").each(function(){
	    	var ccode = $(this).val();
	    	var crid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+crid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+crid+':checked').val()=='on'){//mytest
	    		empty_val = false;
	    	}else{
				if(ccode == ""){
					$('.cbClasscode_'+crid).addClass('redBorder');
					empty_val = true;
				}
			}
		});

		$(".cbLocSelect").each(function(){
	    	var loc = $(this).find('option:selected').text();
	    	var lrid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+lrid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+lrid+':checked').val()=='on'){//mytest
				empty_val = false;
	    	}else{
				if(loc == "" || loc == 'Select Location'){
					$('.cbLocSelect_'+lrid).addClass('redBorder');
					empty_val = true;
				}
			}
		});

		$(".rqbiExposure").each(function(){
	    	var exp = $(this).val();
	    	var erid = $(this).attr('data-rowid');

	    	if($('input[type="checkbox"]#rqbiIfany_'+erid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+erid+':checked').val()=='on'){//mytest
				empty_val = false;
	    	}else{
				if(exp == "" || exp == 0){
					$('.rqbiExposure_'+erid).addClass('redBorder');
					empty_val = true;
				}
			}
		});
	}

	if (empty_val!=true) {
		var rowCount = $('#rowCount').val();
		//var cloneid = $(this).attr('data-cloneid');
		var cloneid = rowCount;
		var rid = $(this).attr('data-rowid');
		var loc = $('.cbLocSelect_'+rid).val();
		var coverty = $('#cbClasscode_'+rid).attr('data-cover_type');
		var liq_grade = $('.liquorgradeval_'+rid).text();
		var teri_code = $('.terri_code_number_'+rid).text();

		rowCount++;

	    var cloneRow = '<tr class="cbRow cbRow_'+rowCount+'" data-rowid="'+rowCount+'" data-trUniqueid="'+rowCount+'" data-cloneid="'+cloneid+'"><td class="border_unset pt-9 pl-3"><div class="txttooltip"><input type="text" class="form-control width98_perc mb-0 mt-0 cbClasscode  cbClasscode_'+rowCount+'" data-rowid="'+rowCount+'" placeholder="Code" name="cbClasscode_'+rowCount+'" id="cbClasscode_'+rowCount+'" data-cover_type="" data-uicheck_class=""></div><small><span class="pull-left clas_desc_'+rowCount+'"></span></small><br /><small class="pull-left text_color class_arates_'+rowCount+'" style="display: none;">* A Rates</small><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbClasscode_'+rowCount+'" style="display:none">Invalid Class Code</p></td><td class="border_unset pt-9 pl-2"><select  class="form-control width98_perc cbLocSelect cbLocSelect_'+rowCount+' m0" data-cloneid="'+cloneid+'" id="cbLocSelect_'+rowCount+'" data-rowid="'+rowCount+'" name="cbLocSelect_'+rowCount+'" data-cloneid="'+cloneid+'" data-cover_type="" data-uicheck_loc=""></select><small><span class="pull-left terri_code terri_code_'+cloneid+' ml-3">TC:<span class="terri_code_number terri_code_number_'+rowCount+'"></span></span></small></td><td class="border_unset pt-9"><div class="col-md-12 pull-left pl-0 pr-0"><div class="form-group mb-1 col-md-12  pull-left p-0"><div class="pl-2 pr-1"><div class="txttooltip"><input type="text" class="form-control mb-0 mt-0 rqbiExposure rqbiExposure_'+rowCount+'" data-rowid="'+rowCount+'" placeholder="Exposure" name="rqbiExposure_'+rowCount+'" id="rqbiExposure_'+rowCount+'"  data-cover_type="" data-uicheck_expo=""><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbexposure_'+rowCount+'" style="display:none">Invalid </p></div></div></div></div></td><td  class="border_unset pt-9"><div class="col-sm-12 pull-left pr-2 pl-2"><div class="col-md-12 pull-left p-0 rqbiFinalRateDiv rqbiFinalRateDiv_'+rowCount+'"><div class="col-md-12 p-0 pull-left"><div class="form-group mb-1 pl-0"><div class="input-group col-sm-12 pull-left p-0"><div class="txttooltip"><input type="text" class="form-control mb-0 rqbiFinalRate rqbiFinalRate_'+rowCount+'" placeholder="" name="rqbiFinalRate_'+rowCount+'" id="rqbiFinalRate_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-uicheck_rate=""></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_finalrate_'+rowCount+'" style="display:none">Invalid </p></div><small class="pl-5 mt-1 ml28 frPrevAmount"><span class=" frPrevAmount_'+rowCount+'"> $ </span></small></div></div></div></div></td><td rowspan="2" class="verticalAlignMiddle cbAction" data-rowid="'+rowCount+'" data-cloneid="'+cloneid+'"><small class="pull-left liquorGrade liquorGrade_'+rowCount+'" style="display: none;">Liquor Grade:<span class="pull-right liquorgradeval liquorgradeval_'+rowCount+'"></span></small><small class="pull-left desigContractor desigContractor_'+rowCount+'" style="display: none;">Designation of Contractor: 5</small><br> <span class="btn btn-sm btn-info icon_btn text-white mb-2 disabled cbCloneRow cbCloneRow_'+rowCount+'" id="cbCloneRow_'+rowCount+'" data-rowid="'+rowCount+'" data-cloneid="'+cloneid+'"  data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Clone </em>"><i class="fa fa-files-o"></i></span><br><span class="btn btn-sm btn-primary icon_btn mb-2 disabled cbAddRow cbAddRow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Add </em>"><i class="fa fa-plus"></i></span><span class="btn btn-sm btn-primary icon_btn mb-2 isonotes_btn isonotes_btn_'+rowCount+' isonotes_btn_design" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="ISO Notes"><img src="../img/isologo3.png" class="isonotes_img_design" style="width: 31px;margin: -6px 0 0 -8px;"></span><br><span class="btn btn-sm btn-danger icon_btn mb-2 removeCbRow removeCbRow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Delete </em>"><i class="fa fa-trash"></i></span><br><span class="fontSize17 disabled cbDownArrow cbDownArrow_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Show Table </em>"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></span><span class="fontSize17  cbUpArrow cbUpArrow_'+rowCount+'" data-rowid="'+rowCount+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Hide Table </em>" style="display: none;"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></span></td></tr> <tr class="cbRow cbRow_'+rowCount+'" data-trUniqueid="'+rowCount+'" data-cloneid="'+cloneid+'"><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip"><label class="col-form-label pull-left">Premium Basis<span class="color_red">*</span></label><select class="custom-select classbuildpremBasis classbuildpremBasis_'+rowCount+' col-md-12 " id="classbuildpremBasis_'+rowCount+'" data-rowid="'+rowCount+'" name="classbuildpremBasis_'+rowCount+'"></select> </div></div></div></div><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Remarks</label><input type="text" class="col-md-12 form-control mb-0 rqbiRemarks rqbiRemarks_'+rowCount+'" placeholder="" name="rqbiRemarks_'+rowCount+'" id="rqbiRemarks_'+rowCount+'" data-cover_type="" data-uicheck_marks=""><div class="rqbiRemarks_valdtn_'+rowCount+'" style="display:none">Invalid</div></div></div></div></div><div class="col-md-4 pull-left pr-0 rqbiApplyModDiv rqbiApplyModDiv_'+rowCount+'" data-rowid="'+rowCount+'"><div class="form-group row mb-1"><div class="col-md-11 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Credit/Debit</label><input type="text" class="col-md-12 form-control pull-left mb-0 rqbiCreditDebit rqbiCreditDebit_'+rowCount+'" id="rqbiCreditDebit_'+rowCount+'" name="rqbiCreditDebit_'+rowCount+'" data-rowid="'+rowCount+'" data-cover_type="" data-uicheck_credit="" disabled><div class="credit_debit_error_'+rowCount+'" style="display:none; color: red;">Invalid</div></div></div></div></div></td><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-sm-6 pull-left mt-2 pl-0 mb-1 rqbiIfanyDiv rqbiIfanyDiv_'+rowCount+'"><div class="custom-control custom-checkbox col-sm-5 pull-left ml-1 ifany_radiobtn"><input type="checkbox" class="custom-control-input rqbiIfany" id="rqbiIfany_'+rowCount+'" name="rqbiIfanyIncluded_'+rowCount+'" data-rowid="'+rowCount+'"><label class="custom-control-label" for="rqbiIfany_'+rowCount+'">&nbsp;If Any</label></div><div class="custom-control custom-checkbox col-sm-6 pull-left included_radiobtn"><input type="checkbox" class="custom-control-input rqbiIncluded" id="rqbiIncluded_'+rowCount+'" name="rqbiIfanyIncluded_'+rowCount+'" data-rowid="'+rowCount+'"><label class="custom-control-label" for="rqbiIncluded_'+rowCount+'">Included</label></div></div><div class="col-sm-6 pull-left p-0 mb-1 premium_divright"><div class="form-group row mb-1 cb_premium"><div class="col-md-12 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Premium</label><input type="text" class="col-md-12 form-control mb-0 mt-0 rqbiPremium rqbiPremium_'+rowCount+' wdth100p" data-rowid="'+rowCount+'" data-prevamount="" placeholder="" name="rqbiPremium_'+rowCount+'" id="rqbiPremium_'+rowCount+'" data-cover_type="" data-uicheck_prem="" data-premium_flag=""></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbpremium_'+rowCount+'" style="display:none">Invalid </p></div><small class="mt-1 ml-3 premPrevAmount"><span class="premPrevAmount_'+rowCount+'"> $ </span></small></div></div></td></tr><tr data-trUniqueid="'+rowCount+'" data-cloneid="'+cloneid+'" class="cbRating cbRating_'+rowCount+' cbRow_'+rowCount+'" style="display: none;"><td colspan="5" class="p-2"><table class="table table-striped table-responsive-sm table-bordered text-center mb-0 cbRatingTable cbRatingTable_'+rowCount+'"><thead class="cbRatingHead" data-cbunique="'+rowCount+'"><tr><th class="width8_perc">Coverage</th><th class="width6_perc">LC</th><th class="width7_perc">LCM</th><th class="width6_perc">BR</th><th class="width7_perc">ILF</th><th class="width7_perc">Ded/SIR Factor</th><th class="width6_perc">ABR</th><th class="width6_perc">Mod/SM Factor</th><th class="width6_perc">Final Rate</th><th class="width6_perc">Exposure</th><th class="width6_perc">Premium</th></tr></thead></table></td></tr>';

	    $("#cbAppendRow").append(cloneRow);
	    $('#rowCount').val(rowCount);
	    $('#cbClasscode_'+rowCount).focus();
		
		get_classcode_prembasis(rowCount,'');
	    
	    var trlen = $('tr.cbRow').length;

	    if( trlen == 2 ) {
	    	$('.removeCbRow').hide();
	    } else {
	    	$('.removeCbRow').show();
	    }
	    class_builder_loc_detatils(rowCount);
	    	setTimeout(function(){ 
			    $('.cbLocSelect_'+rowCount).val(loc).addClass('disabledField');
			    $('#cbClasscode_'+rowCount).attr('data-cover_type', coverty);
				$('#cbLocSelect_'+rowCount).attr('data-cover_type', coverty);
				$('#rqbiExposure_'+rowCount).attr('data-cover_type', coverty);
				$('.cbDownArrow_'+rowCount).attr('data-cover_type', coverty);
				$('#rqbiRemarks_'+rowCount).attr('data-cover_type', coverty);
				$('#rqbiCreditDebit_'+rowCount).attr('data-cover_type', coverty);
				$('#rqbiPremium_'+rowCount).attr('data-cover_type', coverty);
				$('#rqbiFinalRate_'+rowCount).attr('data-cover_type', coverty);
				$('.terri_code_number_'+rowCount).text(teri_code);
				if(typeof(liq_grade) != "undefined" && liq_grade != null && liq_grade !='') {
					$('.liquorgradeval_'+rowCount).text(liq_grade);
					$('.liquorGrade_'+rowCount).show();
				}
			}, 2000);

		} else {
			new PNotify({ title: 'Error', text: 'Please enter mandatory fields', delay: 1500, type: 'error' });
		}
	    
	    // $( document ).tooltip();
	    $('[data-toggle="tooltip"]').tooltip();
    
});

/*Class builder - Delete row*/
$(document).on("click", ".removeCbRow", function () {
	var rid = $(this).attr('data-rowid');
	var cbClasscode = $('#cbClasscode_'+rid).val();
	checkclasscode_in_composite(cbClasscode,rid);
	$('.cbDeletePopup').trigger('click');	
	var gr_rowid = $('#rowId').val();

    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');
    if(enable_grad_rating == true || gr_disabled == true){ 

		$('#cb_delete_msg').css('display','none');	
		$('#cb_gr_delete_msg').css('display','block');	
	}else{
		$('#cb_delete_msg').css('display','block');
		$('#cb_gr_delete_msg').css('display','none');
	}

	$('#cbrow_delete_ok').attr('data-cbrowid', rid);
	var u_rid = $('.removeCbRow_'+rid).parent('td').parent('tr').attr('data-truniqueid');
	$('#cbrow_delete_ok').attr('data-cuniqueid', u_rid);
	
});

$(document).on("click", "#cbrow_delete_ok", function () {
	var rid = $(this).attr('data-cbrowid');
	var u_rid = $(this).attr('data-cuniqueid');
	var check_calsscode = $(this).attr('data-check_calsscode');
	var com_calsscode_rid = $(this).attr('data-com_calsscode_rid');

	var gr_rowid = $('#rowId').val();
    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');
    if(enable_grad_rating == true || gr_disabled == true){ 
		reset_graduated_rating();
	}

    $('.cbRow_'+rid).remove();
    var trlen = $('tr.cbRow').length;
    if( trlen == 2 ) {
    	$('.removeCbRow').hide();
    } else {
    	$('.removeCbRow').show();
    }
    var rowCount = $('#rowCount').val();
	$('#rowCount').val(rowCount);

	del_class_row(u_rid,source='class_source');
	if(com_calsscode_rid != "" && com_calsscode_rid != undefined ){		
		var comclassid = com_calsscode_rid.split(',');
		if(check_calsscode == 1){
			$.each(comclassid,function(i){
	            delete_compostive_rating(comclassid[i]);
	        });
		}
	}
	serialize_cb_loc_no();

	graduatedratingbtn_disableenable();
});

function serialize_cb_loc_no() {
	loc_no = 1;
	$(".cbuildRow").each(function () {
		$(this).find('.cbLoc_no').text('L'+loc_no);
		loc_no++;
	});
}

function checkclasscode_in_composite(cbClasscode,rid){
	// var accid = localStorage.getItem('accid');
	// var accid = accid;
	$.ajax({
      type: "post",
      cache : false,
      url: laravel_url+"/checkclasscode_in_composite",
      data:{ 'accid': accid, 'com_id' : com_id, 'cbClasscode' : cbClasscode
      },
      success:function(response){
        var obj = JSON.parse(response); 
        var cbClasscode = $('.cbClasscode_'+rid).val();
        var cbLocSelect = $('.cbLocSelect_'+rid).val();
      	if(obj.count >= 1 && cbClasscode != "" && cbLocSelect !=""){
      		$("#cb_delete_msg").text("This Class Code includes Composite Rate, Which will also be deleted. Do you want to Continue?");
      		$('#cbrow_delete_ok').attr('data-check_calsscode', 1);
      		$('#cbrow_delete_ok').attr('data-com_calsscode_rid',obj.com_class);
      		
      	}else{
      		$("#cb_delete_msg").text("Are you sure you want to delete?");
      		$('#cbrow_delete_ok').attr('data-check_calsscode', 0);
      	}       
      }
    });

}
/*Class builder - Previous rate for final and premium rate*/
$(document).on('focusout','.rqbiFinalRate', function() {
	var rid = $(this).attr('data-rowid');
	var finalrate = $(this).val();

	if (finalrate != '') {
		//$('.frPrevAmount_'+rid).text('').text('$'+finalrate);
		//$('.frPrevAmount_'+rid).text('').text('$'); No need this 
	}
});

$(document).on('focusout','.rqbiPremium', function() {
	var rid = $(this).attr('data-rowid');
	var premrate = $(this).val();

	if (premrate != '') {
		//$('.premPrevAmount_'+rid).text('').text('$'+premrate);
		//$('.premPrevAmount_'+rid).text('').text('$'); No need this 
	}
});

/*Graduated rating add row*/
var inc_gr_rowid = 1;
$(document).on("click", ".gradRatingAddRow", function() {

	var empty_check = graduatedrating_mandatoryField_chk();
	var empty_exposureto = get_exposureto();

	if(empty_check && empty_exposureto){
		var rowid = $('#rowId').val();
		var addRow="";
		var curr_rowid = $(this).attr('data-rowId');
		var curr_rid = $(this).attr('data-rid');
		var gradexpval = $('.gradExpEditInput_'+rowid).val();
		var exptoval = $('.ExposureTo_'+rowid).val();
		var rid = 0;
		var num = 1;
		if(exptoval != ""){
			exptoval = exptoval.replace('$','').replace( /,/g,'');			
			exptoval = BigInt(exptoval)+BigInt(1);
			exptoval = numberWithCommas(exptoval);
		}
		$('.ExposureRate_'+rowid).attr('disabled','disabled');
	    $('.ExposureTo_'+rowid).attr('disabled','disabled');

		rowid++;
		inc_gr_rowid++;

		addRow = '<tr class="graduatedRow graduatedRow_'+rowid+'" data-rowId="'+rowid+'" data-rid="'+rid+'"><td class="pl-3 text-left expfromVal_'+rowid+'"> <input type="text" class="form-control ExposureFrom ExposureFrom_'+rowid+'" name="exposurefrom_'+rowid+'" id="exposurefrom_'+rowid+'" value="" disabled=""><div  class="show_exposurefrom_error" id="show_exposurefrom_error_'+rowid+'" style="display:none;text-align:center;color:red;"></div><div class="show_exposure_from_max_valdtn show_exposure_from_max_valdtn_'+rowid+'" style="display:none;text-align:center;color:red;">Invalid</div></td>';

		addRow+='<td class="pl-3 text-left"><input type="text" class="gradExpLabel form-control mt-2 mr-2 mb-2 gradExpEditInput gradExpEditInput_'+rowid+' ExposureTo ExposureTo_'+rowid+'" data-rowId="'+rowid+'" name="gradExpEditInput_'+rowid+'" id="gradExpEditInput_'+rowid+'" value="" style="display: none;"><div class="show_exposure_greater" id="show_exposure_greater_'+rowid+'" style="display:none;text-align:left;color:red;">Should be greater than Exposure From Value</div><p class="ExposureToMandatoryMsg_'+rowid+'"></p><div class="show_exposure_to_max_valdtn show_exposure_to_max_valdtn_'+rowid+'" style="display:none;text-align:left;">Invalid</div></td>';

		addRow+='<td class="pl-3 text-left"><input type="text" class="gradRateLabel form-control mt-2 mr-2 mb-2 gradRateEditInput gradRateEditInput_'+rowid+' ExposureRate ExposureRate_'+rowid+'" data-rowId="'+rowid+'" name="gradRateEditInput_'+rowid+'" id="gradRateEditInput_'+rowid+'" value="" style="display: none;"><p class="mb-1 ExposureRateMandatoryMsg_'+rowid+'"></p></td>';

		addRow+='<td class="text-left graduate_actions"><button id="gradRatingAddRow_'+rowid+'" type="button" data-rowid="'+rowid+'" class="btn btn-sm btn-primary ml-1 cbAddTier gradRatingAddRow disabled"><i class="fa fa-plus-circle" aria-hidden="true"></i></button><button type="button" id="gradRatingDelRow_'+rowid+'" class="btn btn-sm btn-danger removeRow disabled" data-rowId="'+rowid+'" data-rid="'+rid+'" data-html="true" data-toggle="tooltip" data-original-title="<em>Remove</em>"><i class="fa fa-trash" aria-hidden="true"></i></button></td>';
		addRow+='</tr>';

		   	$("#appendRow").append(addRow);
		   	$('#rowId').val(rowid);
		   	$('.ExposureFrom_'+rowid).val('$ '+exptoval);
			$('.gradExpLabel_'+rowid).hide();
			$('.gradExpEditInput_'+rowid).show();
			$('.gradRateLabel_'+rowid).hide();
			$('.gradRateEditInput_'+rowid).show();
	}
});

function get_exposureto(){

	var return_Exposure = true;
	$(".ExposureTo").each(function(){
    	var Exposure_To  = $(this).val();
    	var grid_to = $(this).attr('data-rowid');
    	if (Exposure_To == "") {
    		return_Exposure = false;
			$('.ExposureTo_'+grid_to).addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
    	}    	
	});	
	return return_Exposure;
}

/*Graduated rating delete row*/
$(document).on("click", ".removeRow", function() {
    var rowid = $(this).attr('data-rowId');
    var rid = $(this).attr('data-rid');
    $('.gradDeletePopup').trigger('click');
    $('#grad_delete_ok').attr('data-rowId', rowid);
    $('#grad_delete_ok').attr('data-rid', rid);
});

$(document).on("click", "#grad_delete_ok", function() {
    var rowid = $(this).attr('data-rowId');
    var rid = $(this).attr('data-rid');
    $('.graduatedRow_'+rowid).remove();
    var rowid = $('#rowId').val();
	$('#rowId').val(rowid);
	var trlen = $('.GradRatingTbody tr').length;
    if( trlen == 2 ) {
    	$('.removeRow').hide();
    } else {
    	$('.removeRow').show();
    }  
    //console.log('trlen',trlen);
    if(trlen == 0){
    	$('.GradRatingTbody').html('');
    	$('.GradRatingTbody').empty();
    }
    delete_graduated_rating(rid);
});

/*Graduated rating - edit exposure to and rate*/

/*added by vaishnavi*/
function enableGradFields (rid) {
	$('#gradRatingAddRow_'+rid).removeClass('disabled');
	$('#gradRatingDelRow_'+rid).removeClass('disabled');
}

function disableGradFields (rid) {	
	$('#gradRatingAddRow_'+rid).addClass('disabled');
	$('#gradRatingDelRow_'+rid).addClass('disabled');
}

$(document).on('keyup', '.gradRateEditInput', function() {
    this.value = this.value.match(/^\d+\.?\d{0,2}/);
});

$(document).on('keyup', '.gradExpEditInput', function() {
    var rowid = $(this).attr('data-rowid');
	var ExposureFrom  = $('.ExposureFrom_'+rowid).val().replace('$','').replace( /,/g,'');
	var ExposureTo = $('.gradExpEditInput_'+rowid).val();
	var ExposureRate = $('.gradRateEditInput_'+rowid).val();
	
	if(ExposureTo != ""){
		ExposureTo  = (ExposureTo).replace('$','').replace( /,/g,'');
	}
	
	if(ExposureRate != ""){
		var ExposureRate = (ExposureRate).replace( /,/g,'');
	}

	if ((parseInt(ExposureFrom) < parseInt(ExposureTo)) && ExposureRate!='' && (ExposureFrom != ExposureTo)) {

		$('.gradExpEditInput_'+rowid).removeClass('redBorder');
		enableGradFields (rowid);
		$('#show_exposure_greater').css("display", "none");

	} else if(ExposureTo!=""){

		$('.gradExpEditInput_'+rowid).addClass('redBorder');
		disableGradFields (rowid);
		$('#show_exposure_greater').css("display", "block");
	}

	if (ExposureFrom == ExposureTo || ExposureFrom > ExposureTo){
		disableGradFields (rowid);
		$('.gradExpEditInput_'+rowid).addClass('redBorder');
		$('#show_exposure_greater').removeAttr('style').css("display", "block");
	}

	// if( $(this).val() == '' ) {
	// 	$(this).addClass('redBorder');
	// } else {
	// 	$(this).removeClass('redBorder');
	// }
});

$(document).on('keyup', '.gradRateEditInput', function() {
    var rowid = $(this).attr('data-rowid');
	var ExposureFrom  = $('.ExposureFrom_'+rowid).val().replace('$','').replace( /,/g,'');
	var ExposureTo = $('.gradExpEditInput_'+rowid).val();
	
	if(ExposureTo != ""){
		ExposureTo  = (ExposureTo).replace('$','').replace( /,/g,'');
	}

	if ((parseInt(ExposureFrom) < parseInt(ExposureTo)) && (ExposureTo != '')) {
		$('.gradExpEditInput_'+rowid).removeClass('redBorder');
		enableGradFields (rowid);
		$('#show_exposure_greater').css("display", "none");
		
	}else if(ExposureTo!=""){
		$('.gradExpEditInput_'+rowid).addClass('redBorder');
		disableGradFields (rowid);
		$('#show_exposure_greater').css("display", "block");
	}

	if( $(this).val() == '' ) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

/*added by vaishnavi*/


function location_mandatoryField_chk () {

	var empty_check_vl = false;

	$(".locAddress1").each(function(){
    	var value = $(this).val();
		if(value == ""){
			empty_check_vl=true;
			$(this).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
		}
	});

	$(".locZipcode").each(function(){
    	var value = $(this).val();
		if(value == ""){
			empty_check_vl=true;
			$(this).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
		}
	});

	return empty_check_vl;
}

function setInstantValues(locRowCount=''){

	var addr2 = $('#locAddress2_'+locRowCount).val();
	var city = $('#locCity_'+locRowCount).val();
	var state = $('#locState_'+locRowCount).val();

	$('#clone_address2').val(addr2);
	$('#clone_city').val(city);
	$('#clone_state').val(state);
	
}


/*Class builder - Composite rating add row*/
$(document).on("click", ".compositeAddRow", function() {
	graduatedratingbtn_disableenable();
	var crid = $('#compositeRowid').val();
	var row_id = $(this).attr('data-rowid');
	var uniqid = $(this).attr('data-rid');
	var rid = 0;
	crid++;
	uniqid++;


    var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');   
    var cbr_disabled = $('.classbuildGraduatedRating').hasClass('disabled');   
    if((cbr_disabled != true) && (enable_grad_rating == true || gr_disabled == true )){
		$('.compositeaddPopup').trigger('click');
	}

	var empty_check = compositerating_mandatoryField_chk();

	if(empty_check){
		var addCompositeRow = '<tr data-rowid="'+crid+'" class="comprow compositeRow compRow_'+crid+'" data-rid="'+rid+'"><td class="pl-3 pb-0 pt-3 text-left border_bottom0"><div class="form-group col-md-12 p-0 mb-1 pull-left multipleClasscodeDiv multipleClasscodeDiv_'+crid+'"><div class="col-sm-12 p-0"><select class="custom-select compositeMultiCcode compositeMultiCcode_'+crid+'" data-rowid="'+crid+'" data-rid="'+rid+'" id="multi-select-classcodes_'+crid+'" name="compositeMultiCcode_'+crid+'"  multiple="multiple"></select></div></div></td><td class="pl-3 pb-0 pt-3 text-left border_bottom0"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0"><select  class="custom-select compositeLocation compositeLocation_'+crid+'" data-rid="'+rid+'" id="compositeLocation_'+crid+'" data-rowid="'+crid+'" name="compositeLocation_'+crid+'"><option value=""> Select Location </option></select></div></div></td><td class="pl-3 pb-0 pt-3 text-left border_bottom0"><div class="form-group col-md-12 mt-1 p-0 mb-1 pull-left"><div class="col-sm-12 pl-0"><div class="txttooltip"><input type="text" class="form-control pull-left compositeExposure compositeExposure_'+crid+'" id="compositeExposure_'+crid+'" data-rid="'+rid+'" data-rowid="'+crid+'" value="" placeholder="Enter Exposure" name="compositeExposure_'+crid+'"></div><div class="Invalid_comp_Exposure Invalid_compositeExposure_'+crid+'" style="display:none">Invalid</div></div></div></td><td class="pb-0 pt-3 border_bottom0"><div class="form-group col-md-12 mt-1 mb-1 pull-left"><div class="col-sm-12 p-0"><select class="custom-select compositeExpBasis compositeExpBasis_'+crid+'" id="compositeExpBasis_'+crid+'" data-rid="'+rid+'" data-rowid="'+crid+'" name="compositeExpBasis_'+crid+'"><option value=""> Select </option><option value="250"> 250 </option><option value="500"> 500 </option><option value="1000"> 1,000 </option><option value="2500"> 2,500 </option></select></div></div></td><td rowspan="2" class="text-center tdBorderLeft border_bottom composite_actions"><button type="button" class="btn btn-sm btn-info disabled mr-1 compositeAddRow text-white"  id="compositeAddRow_'+crid+'" data-rowid="'+crid+'" data-rid="'+rid+'"><i class="fa fa-plus" aria-hidden="true"></i></button><button type="button" class="btn btn-sm btn-danger compositeDeleteRow" id="compositeDeleteRow_'+crid+'" data-rowid="'+crid+'"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr><tr data-rowid="'+crid+'" data-rid="'+rid+'" class="trbottomborder compRow_'+crid+'"><td colspan="4" class="border_bottom"><div class="col-md-12 pull-left p-0 mt-2"><div class="form-group row mb-1 pull-left  col-md-5 composite_class_code_div"><label class="col-form-label col-md-6">Composite Class Code<span class="color_red">*</span></label><div class="pl-2 col-md-6" style="margin: 0 0 0 -25px;padding: 0;"><select class="custom-select compositeMainCcode compositeMainCcode_'+crid+'" data-rid="'+rid+'" id="compositeMainCcode_'+crid+'" data-rowid="'+crid+'" name="compositeMainCcode_'+crid+'"><option value="">Please Select</option><option value="">98555 - Quarries</option><option value="">48039 - Sewers</option><option value="">58503 - Pulp Mfg.</option><option value="">92055 - Dredging</option><option value="">11039 - Caterers</option><option value="">98555 - Quarries</option><option value="">48039 - Sewers</option><option value="">99793 - Truckers</option></select></div></div><div class="form-group row mb-1 pull-left pl-2"><label class="col-form-label">Developed Rate</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" class="form-control pull-left  compositeDevRate compositeDevRate_'+crid+'" data-rid="'+rid+'" id="compositeDevRate_'+crid+'" data-rowid="'+crid+'" value="" placeholder="Developed Rate" name="compositeDevRate_'+crid+'"><div class="cr_devprate_invalid_msg_' + crid + '" style="display:none;"> Invalid </div></div></div></div><div class="form-group row mb-1 pull-left pl-3 ml-1"><label class="col-form-label">Premium</label><div class="pl-2 pr-2"><div class="txttooltip" id="comp_tooltip"><input type="text" value="" class="form-control pull-left compositepremium compositepremium_'+crid+'" data-rid="'+rid+'" id="compositepremium_'+crid+'" data-rowid="'+crid+'" placeholder="Premium" name="compositepremium_'+crid+'" ></div></div></div></div></td></tr>';
	
	$(this).addClass("disabled");

	$('#compositeTblBody').append(addCompositeRow);
	$('#compositeRowid').val(crid);

	var trlen = $('tr.comprow').length;
    if( trlen == "0" ) {
    	$('.compositeDeleteRow').hide();
    } else {
    	$('.compositeDeleteRow').show();
    }

	$('.compositeMultiCcode').each(function() {
	    $(this).multiselect({
			includeSelectAllOption : true,
			nonSelectedText: 'Please Select'
		});
	});
	// get_location_compostive_rating(crid);
	get_classcode_compostive_rating(crid);
	get_premium_basis(crid);


		for (var i = row_id; i >= 1; i--) {
			$('.compositeMultiCcode_'+i).each(function() {
				var class_code_id = $(this).val();
					setTimeout(function(){
			  			$.each(class_code_id, function( key, value ) {
							$(".compositeMultiCcode_"+crid+" option[value="+value+"]").attr("disabled","disabled");
							$(".compositeMultiCcode_"+crid).multiselect('refresh');
						});
					},1000);
			});
		}

	}

});


function graduatedrating_mandatoryField_chk() {

	var empty_check_gr = true;
	$(".ExposureFrom").each(function(){
    	var Exposure_From = $(this).val();
    	var grid_from = $(this).attr('data-rowid');

		if(Exposure_From == "" || $('.show_exposure_from_max_valdtn_'+grid_from).css('display') == 'block' || $('.show_exposurefrom_error_'+grid_from).css('display') == 'block'){	
			$('.ExposureFrom_'+grid_from).addClass('redBorder');
			empty_check_gr = false;
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});

	$(".ExposureTo").each(function(){
    	var Exposure_To  = $(this).val().replace(/,/g, '').replace('$', '').replace(/\s/g, '');
    	var grid_to = $(this).attr('data-rowid');
    	var ExpFrom = $('.ExposureFrom_'+grid_to).val().replace(/,/g, '').replace('$', '').replace(/\s/g, '');
    	var last_row = $('#rowId').val();
    	var ExposureFrom = $('.ExposureFrom_'+last_row).val();
    	var exposure_last_row = $('.ExposureTo_'+last_row).val();
		if (Exposure_To == "" || $('.show_exposure_to_max_valdtn_'+grid_to).css('display') == 'block' || $('#show_exposure_greater_'+grid_to).css('display') == 'block' || ($('.show_exposureto_error_'+grid_to).css('display') == 'block')) {
			 if (exposure_last_row != "") {	
				$('.ExposureTo_'+grid_to).addClass('redBorder');
				empty_check_gr = false;
				$('#show_exposure_greater_'+grid_to).show();
				$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
	            $('.cbAccordHeader a').attr('style','color: #ed4613;');
			 } else if (exposure_last_row == ""){
			 	$('.ExposureTo_'+grid_to).removeClass('redBorder');
			 } 
		} else if ((Exposure_To != "") && (ExpFrom == Exposure_To)) {
			$('.ExposureTo_'+grid_to).addClass('redBorder');
			$('#show_exposure_greater_'+grid_to).show();
			empty_check_gr = false;
		} else {
			$('.ExposureTo').removeClass('redBorder');
		}
	});

	$(".ExposureRate").each(function(){
    	var ExposureRate = $(this).val();
    	var grid_to = $(this).attr('data-rowid');    	
		if(ExposureRate == ""){
			$('.ExposureRate_'+grid_to).addClass('redBorder');
			empty_check_gr = false;
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});	

	return empty_check_gr;
}

function compositerating_mandatoryField_chk() {

	var empty_check_cr = true;
	var empty_check1 = 0;
	var empty_check2 = 0;
	var empty_check3 = 0;
	var empty_check4 = 0;
	var empty_check5 = 0;
	var empty_check6 = 0;
	var empty_check7 = 0;

	$(".multipleClasscodeDiv").each(function(){
    	var value = $(this).find('.compositeMultiCcode').val();
		if(value == "" || value == null){
			empty_check1=1;
			$(this).find('.btn-group .multiselect.dropdown-toggle').addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}else{
			$(this).find('.btn-group .multiselect.dropdown-toggle').removeClass('redBorder');
		}
	});

	$(".compositeLocation").each(function(){
    	var value = $(this).val();
		if(value == ""||value == null){
			empty_check2=1;
			$(this).addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});

	$(".compositeExposure").each(function(){
    	var value = $(this).val();
		if(value == "" || value == null  || value == 0 || $('.Invalid_comp_Exposure').css('display') == 'block'){
			empty_check3=1;
			$(this).addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});

	$(".compositeExpBasis").each(function(){
    	var value = $(this).val();
		if(value == "" ||value == null){
			empty_check4=1;
			$(this).addClass('redBorder'); 
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});

	$(".compositeMainCcode").each(function(){
    	var value = $(this).val();
		if(value == "" || value == null){
			empty_check5=1;
			$(this).addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});
	
	$(".compositeDevRate").each(function(){
    	var value = $(this).val();
		if(value == "" || value == null  || value == 0 || $('.cr_devprate_invalid_msg').css('display') == 'block'){
			empty_check6=1;
			$(this).addClass('redBorder'); 
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});

	$(".compositepremium").each(function(){
    	var value = $(this).val();
		if(value == "" ||value == null ||value == 0){
			empty_check7=1;
			$(this).addClass('redBorder');
			$('.cbAccordHeader').attr('style','border: 1px solid #ed4613;');
            $('.cbAccordHeader a').attr('style','color: #ed4613;');
		}
	});	
	
	if(empty_check1 == 1 && empty_check2 == 1 && empty_check3 == 1 && empty_check4 == 1 && empty_check5 == 1 &&   empty_check6 == 1 && empty_check7 == 1){
		empty_check_cr = true;
        $(".multipleClasscodeDiv").find('.btn-group .multiselect.dropdown-toggle').removeClass('redBorder');
        $(".compositeLocation").removeClass('redBorder');
        $(".compositeExposure").removeClass('redBorder');
        $(".compositeExpBasis").removeClass('redBorder');
        $(".compositeMainCcode").removeClass('redBorder');
        $(".compositeDevRate").removeClass('redBorder');
        $(".compositepremium").removeClass('redBorder');
        $('.Invalid_comp_Exposure').hide();
        $('.cr_devprate_invalid_msg').hide();
        $('.compositeRateDiv').hide();
	} else if(empty_check1 == 1 || empty_check2 == 1 || empty_check3 == 1 || empty_check4 == 1 || empty_check5 == 1 ||  empty_check6 == 1 || empty_check7 == 1){
		empty_check_cr = false;
	} else {
		empty_check_cr=true;
	}

	return empty_check_cr;
}


/*Composite rating delete row*/
$(document).on("click", ".compositeDeleteRow", function() {
	var row_id = $(this).attr('data-rowid');
	var rid = $(this).attr('data-rid');
	$('.compDeletePopup').trigger('click');

	var gr_rowid = $('#rowId').val();
	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');  
	var cbr_disabled = $('.classbuildGraduatedRating').hasClass('disabled');   
	
    if((cbr_disabled != true) && (enable_grad_rating == true || gr_disabled == true )){
		$('#cr_delete_msg').css('display','none');	
		$('#cr_gr_delete_msg').css('display','block');	
	}else{

		$('#cr_delete_msg').css('display','block');
		$('#cr_gr_delete_msg').css('display','none');
	}

	$('#comp_delete_ok').attr('data-rowid', row_id);
	$('#comp_delete_ok').attr('data-rid', rid);
});

$(document).on("click", "#comp_delete_ok", function() {
	var row_id = $(this).attr('data-rowid');
	var rid = $(this).attr('data-rid');
	
	$('.compRow_'+row_id).remove();
	var trlen = $('tr.comprow').length;
    if( trlen == "0" ) {
    	$('.compositeDeleteRow').hide();
    } else {
    	$('.compositeDeleteRow').show();
    }  
    //console.log('trlen',trlen);
    if(trlen == 0){
    	$('#compositeTblBody').html('');
    	$('#compositeTblBody').empty();
    	$('.compositeRateDiv').hide();
    }

    var gr_rowid = $('#rowId').val();
	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
    var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');  
	if(enable_grad_rating == true || gr_disabled == true ){
		reset_graduated_rating();
	}
		
    $.when(delete_compostive_rating(rid)).then( function () {
	    graduatedratingbtn_disableenable();
	    disable_graduated_rating('null');
    });

});

/*AI, Common forms and All forms - Variable info*/
$(document).on('click', '.aiFillin', function () {
	var rid = $(this).attr('data-rowid');
	var frmno = $('.aiFormNum_'+rid).text();
	var frmdesc = $('.aiDesc_'+rid).text();

	$('.formTitle_'+rid).text('').text(frmno+' - '+'Additional Insured - '+frmdesc);
	$('.aiVarInfoSec_'+rid).show();
});



$(document).on('click', '.aiVarInfoCancel', function () {
	var rid = $(this).attr('data-rowid');
	$('.aiVarInfoSec_'+rid).hide();
});

$(document).on('click', '.comnVarInfoCancel', function () {
	var rid = $(this).attr('data-rowid');
	$('.cmnFrmVarInfoSec_'+rid).hide();
});

$(document).on('click', '.cmnFormsFillin', function () {
	var rid = $(this).attr('data-rowid');
	var frmno = $('.comnFrmNum_'+rid).text();
	var frmdesc = $('.comnFrmDesc_'+rid).text();

	$('.cmnformTitle_'+rid).text('').text(frmno+' - '+'Additional Insured - '+frmdesc);
	$('.cmnFrmVarInfoSec_'+rid).show();
});

$(document).on('click', '.cfVarInfoCancel', function () {
	var rid = $(this).attr('data-rowid');
	$('.cmnFrmVarInfoSec_'+rid).hide();
});

// $(document).on('click', '.allFrmsFillin', function () {
// 	var rid = $(this).attr('data-rowid');
// 	var frmno = $('.allFrmsNum_'+rid).text();
// 	var frmdesc = $('.allFrmsDesc_'+rid).text();

// 	$('.allFrmTitle_'+rid).text('').text(frmno+' - '+'Additional Insured - '+frmdesc);
// 	$('.allFrmVarInfoSec_'+rid).show();
// });

// $(document).on('click', '.afVarInfoCancel', function () {
// 	var rid = $(this).attr('data-rowid');
// 	$('.allFrmVarInfoSec_'+rid).hide();
// });

/*Optional Coverages Form*/
// $(document).on('click', '.ocFillin', function () {
// 	var rid = $(this).attr('data-rowid');

// 	$('.ocVarInfoSec_'+rid).toggle();
// });

// $(document).on('click', '.afVarInfoCancel', function () {
// 	var rid = $(this).attr('data-rowid');
// 	$('.allFrmVarInfoSec_'+rid).hide();
// });

/*Validations*/

$(document).on('keypress blur', '.rqbiFinalRate, .rqbiPremium',function(){

	var inputVal = $(this).val();
	if($.isNumeric(inputVal)) {
		var inputVallen = (inputVal + '').replace('.', '').replace(',', '').length;
   		if(inputVallen > 14) {
   			var sliceinput = inputVal.slice(0,-4);
   			$(this).val(sliceinput);
   		}
 	}

});

$(document).on('keypress blur', '.rqbiExposure, .compositeExposure ',function(){
	var inputVal = $(this).val().replace( /,/g,'');
	if($.isNumeric(inputVal)) {
		var inputVallen = inputVal.length;
   		if(inputVallen > 15) {
   			var sliceinput = inputVal.substring(0, 15);
   			$(this).val(numberWithCommas(sliceinput));
   		}
 	}

});


$(document).on('keyup', '.rqbiExposure, .rqbiFinalRate, .rqbiPremium,  .rqbiPaymentTerm, .compositeExposure, .compositepremium, .rqbiOccurSir, .rqbiSirAggregate, .rqbiInspectionFee, .rqbiTriaAmount, .allFrmPremium, .cmnFrmPremium, .aiPremium, .OccurDeductOtherTxt, .manuPremInput, .allFrmsPremInp, .rqbiOccurSir, .liquorOccurSir, .OcpOccurSir, .rqbiSir, .liquorSir,  .OcpSir,.rqbiSirAggregate, .liquorSirAggregate,  .OcpSirAggregate,  .ExposureTo', function() {
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
	
		// if ( $(this).hasClass('rqbiCreditDebit') || $(this).hasClass('rqbiFinalRate')) {
		// 	var moneyval = credit_debit_moneyformat(inputVal);
		// } else {
		// 	var moneyval = moneyformat(inputVal);
		// }

		if ($(this).hasClass('rqbiFinalRate')) {
			var moneyval = credit_debit_moneyformat(inputVal);
		} else {
			var moneyval = moneyformat(inputVal);
		}

		$(this).val(moneyval);
 });  

// $('.rqbiCreditDebit').keypress(function (e) {
// 	alert('sdafa')
//      //if the letter is not digit then display error and don't type anything
//      if (e.which != 8 && e.which != 0 && (e.which > 57 || e.which == 47 || e.which == 42 || e.which == 46)) {
//         //display error message
//         // $("#errmsg").html("Digits Only").show().fadeOut("slow");
//                return false;
//     }
//    });



/*Start classbuilder - credit/debit money format*/
function credit_debit_numberWithCommas(x) {
    var n= x.toString().split(".");
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return n.join(".");
}

function credit_debit_moneyformat(amount){
	finalVal = amount.replace(/[`a-z~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
	finalVal = finalVal.replace(/\s+/g,'');

 	return credit_debit_numberWithCommas(finalVal);
}
/*End classbuilder - credit/debit money format*/

function moneyformat(amount){
	value = amount.replace(/[`a-z~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	finalVal = value.replace(/\s+/g,'');
 	return numberWithCommas(finalVal);
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberonly(val) {
	inputVal = val.replace(/[`a-z~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	finalVal =  inputVal.replace(/\s+/g,'');
 	return finalVal;
}

function floatingpointonly(val) {
	inputVal = val.replace(/[`a-z~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
	finalVal =  inputVal.replace(/\s+/g,'');
 	return finalVal;
}

function alphanumeric(amount){
	value = amount.replace(/[^a-zA-Z0-9 ]/g, '');
	return value;
}

function charac_numb(amount){
	value = amount.replace(/[^a-z0-9\s]/gi, '');
	return value;
}

/*Tria mobile number validation*/
$(document).on('keyup', '.rqbiTpaMobileNo', function() {
 	var inputVal = $(this).val();
	var numberval = numberonly(inputVal);
	
    if(inputVal.length > 10){
    	numberval = inputVal.slice(0,10); 
    }

	$(this).val(numberval);
 });

$(document).on('keyup', '.allFrmsPremInp, .manuPremInput', function() {
 	var inputVal = $(this).val();
	var numberval = numberonly(inputVal);
	
    if(inputVal.length > 20){
    	numberval = inputVal.slice(0,20); 
    }

	$(this).val(numberval);
 });



/*Coverage & Limit - Deductible and SIR Credit*/

$(document).on('keyup', '.glDeductCredit, .liquorDeductCredit, .OcpDeductCredit, .SirCredit, .liquorSirCredit, .OcpSirCredit', function() {
 	this.value = this.value.match(/^\d+\.?\d{0,2}/);
 });


/*Additiona account details validation*/
// $(document).on('keyup', '.rqbiPaymentTerm, .rqbiAuditFreq', function() {
//  	var inputVal = $(this).val();
	
//     if(inputVal.length > 10){
//     	result = inputVal.slice(0,10); 
//     }

// 	$(this).val(result);
//  });

// $(document).on('keyup', '.rqbiInspectionFee, .rqbiTriaAmount', function() {
//  	var inputVal = $(this).val();
// 	var numberval = numberonly(inputVal);
// 	var numberval = moneyformat(numberval);
	
//     if(inputVal.length > 15){
//     	numberval = inputVal.slice(0,15); 
//     }

// 	$(this).val(numberval);
//  });

// $(document).on('keyup', '.rqbiTriaPercAmount, .rqbiCommission', function() {
//  	var inputVal = $(this).val();
// 	var numberval = floatingpointonly(inputVal);
// 	$(this).val(numberval);
//  });

// $(document).on('keyup', '.rqbiMinPremium, .rqbiMinDeposit, .rqbiTriaPercAmount', function() {
//  	var inputVal = $(this).val();
// 	var numberval = floatingpointonly(inputVal);
// 	 if(inputVal.length > 10){
//     	numberval = inputVal.slice(0,10); 
//     }
// 	$(this).val(numberval);
//  });

/*Email id validation*/
$(document).ready(function() {
    $('#tpaForm').bootstrapValidator({
        fields: {
            rqbiTpaEmailid: {
                validators: {
                    emailAddress: {
                        message: 'The value is not a valid email address'
                    }
                }
            }
        }
    });
});

/*Generate quote, bind, issue address validation*/
// $(document).on('click', '.rqbiGenerateQuoteBtn', function() {
// 	var zipcode = $('#ac_mailAdd_zip').val();
// 	var address = $('#ac_mailAdd').val();
// 	var effdte = $('#effect_dt').val();
// 	var expdte = $('#expire_dt').val();
// 	var doclistcount = $('.quoteDocsList').length;

// 	if(zipcode == '' || address == '' || effdte == '' || expdte == '') {
// 		$('html, body').animate({
// 	      scrollTop: $('#ac_tname').offset().top-140
// 	    }, 1000);

// 	    if(zipcode == '') {
// 	    	$('#ac_mailAdd_zip').addClass('errorBorder');
// 	    }
// 	    if(address == '') {
// 	    	$('#ac_mailAdd').addClass('errorBorder');
// 	    }
// 	    if(effdte == '') {
// 	    	$('#effect_dt').addClass('errorBorder');
// 	    }
// 	    if(expdte == '') {
// 	    	$('#expire_dt').addClass('errorBorder');
// 	    }
// 	} else {
// 	    $('#ac_mailAdd_zip, #ac_mailAdd, #effect_dt, #expire_dt').removeClass('errorBorder');
// 	}

// 	if ( doclistcount == 0) {
// 		$('.bind_card_header').addClass('disabled');
// 	} else {
// 		$('.bind_card_header').removeClass('disabled');
// 	}

// 	$('#ac_mailAdd_zip, #ac_mailAdd, #effect_dt, #expire_dt').addClass('genQuoteValid');
// });

$(document).on('click', '.rqbiIssuePolicy', function() {
	
	var busin_desc = $('#businessDescription').val();
	var busin_seg = $('#business_segment').val();
	var state = $('#ac_mailAdd_state').val();

	if(state == 'New Jersey') {
		var nj_trans = $('#njTransaction').val();
		$('#njTransaction').addClass('issuePolicyValid');
	}

	if(busin_desc == '' || busin_seg == '' || nj_trans == '') {
		$('html, body').animate({
	      scrollTop: $('#ac_mailAdd_zip').offset().top-140
	    }, 1000);


	    if (busin_desc == '') {
	    	$('#businessDescription').addClass('errorBorder');
	    }

	    if(busin_seg == '') {
	    	$('#business_segment').addClass('errorBorder');
	    }

	    if (nj_trans == '') {
	    	$('#njTransaction').addClass('errorBorder');
	    }
	} else {
	    $('#businessDescription, #business_segment, #njTransaction').removeClass('errorBorder');
	}
	$('#businessDescription, #business_segment, #njTransaction').addClass('issuePolicyValid');
});

/*Empty validation for Zip code, Address, Business description and NJ transaction*/
$(document).on('keyup', '#ac_mailAdd_zip, #ac_mailAdd, #businessDescription, #njTransaction', function () {
	if ( $(this).hasClass('genQuoteValid') ||  $(this).hasClass('issuePolicyValid')) {
		if($(this).val() != '') {
			$(this).removeClass('errorBorder');
		} else {
			$(this).addClass('errorBorder');
		}
	}
});

/*Empty validation for Form of business, business segment, Effective date, Expiration date*/
$(document).on('change',  '#business_segment, #effect_dt, #expire_dt', function() {
	if ( $(this).hasClass('genQuoteValid') ||  $(this).hasClass('issuePolicyValid')) {
		if($(this).val() != '') {
			$(this).removeClass('errorBorder');
		} else {
			$(this).addClass('errorBorder');
		}
	}
	
});

$(document).on('change', '.insuredType', function() {

    var insuredType = $(this).val();

    if(insuredType!=''){

    	$('#insuredType').removeClass('errorBorder');
    }

    if(insuredType == 'Other') {

        $('.insuredtype_other_div').show();

    } else {

        $('.insuredType_Other').val('')
        $('.insuredtype_other_div').hide();
    }
});

$(document).on('keyup', '.insuredType_Other', function() {

    var insuredType_Other = $(this).val();

    if(insuredType_Other!=''){

    	$('#insuredType_Other').removeClass('errorBorder');
    }

});

/*Classbuilder - Add, Clone, Delete and View rating - disable validation*/
$(document).on('keyup', '.cbClasscode, .rqbiExposure', function() {
	var rowid = $(this).attr('data-rowid');
	var classcode = $('.cbClasscode_'+rowid).val();
	var cloneid = $('.cbLocSelect_'+rowid).attr('data-cloneid');
	var loc = $('.cbLocSelect_'+rowid).val();
	var exp = $('.rqbiExposure_'+rowid).val();
	var prem_basis = $('.classbuildpremBasis_'+rowid).val();

	if (cloneid == '') {
		if ( classcode != '' && loc != '' && exp != '' && prem_basis != '') {
			enableCbBtns (rowid);
		} else {
			disableCbBtns (rowid);
		}
	} else {
		if ( classcode != '' && exp != '' && prem_basis != '') {
			enableCbBtns (rowid);
		} else {
			disableCbBtns (rowid);
		}
	}

	if( $(this).val() == '' ) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

$(document).on('change', '.cbLocSelect', function() {
	var rowid = $(this).attr('data-rowid');
	var cloneid = $(this).attr('data-cloneid');
	var classcode = $('.cbClasscode_'+rowid).val();
	var loc = $('.cbLocSelect_'+rowid).val();
	var cloneid = $('.cbLocSelect_'+rowid).attr('data-cloneid');
	var prem_basis = $('.classbuildpremBasis_'+rowid).val();
	var exp = $('.rqbiExposure_'+rowid).val();

	if (cloneid == '') {
		if ( classcode != '' && loc != '' && exp != '' && prem_basis != '') {
			enableCbBtns (rowid);
		} else {
			disableCbBtns (rowid);
		}
	} else {
		if ( classcode != '' && exp != '' && prem_basis != '') {
			enableCbBtns (rowid);
		} else {
			disableCbBtns (rowid);
		}
	}

	if( $(this).val() == '' ) {
		var mytest = $(this).val();
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

function enableCbBtns (rid) {
	$('.cbCloneRow_'+rid).removeClass('disabled');
	$('.cbAddRow_'+rid).removeClass('disabled');
	$('.cbDownArrow_'+rid).removeClass('disabled');
}

function disableCbBtns (rid) {
	$('.cbCloneRow_'+rid).addClass('disabled');
	$('.cbAddRow_'+rid).addClass('disabled');
	$('.cbDownArrow_'+rid).addClass('disabled');
}

/*Composite Rating - Add, Save and New, Delete - disable validation*/
$(document).on('keyup', '.compositeExposure', function() {
	var rowid = $(this).attr('data-rowid');
	var multiccode = $('.compositeMultiCcode_'+rowid).val();
	var loc = $('.compositeLocation_'+rowid).val();
	var exp = $('.compositeExposure_'+rowid).val();
	var expbasis = $('.compositeExpBasis_'+rowid).val();
	var premium = $('.compositepremium_'+rowid).val();
	var devlop_rate = $('.compositeDevRate_'+rowid).val();
	var mainccode = $('.compositeMainCcode_'+rowid).val();

	if ( multiccode != '' && loc != '' && exp != '' && expbasis != '' && mainccode != '' && devlop_rate != '' && premium != '' ) {
		enableCompFields (rowid);
	} else {
		disableCompFields (rowid);
	}

	if( $(this).val() == '' ) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

$(document).on('keyup', '.compositepremium ', function() {
	var rowid = $(this).attr('data-rowid');
	var multiccode = $('.compositeMultiCcode_'+rowid).val();
	var loc = $('.compositeLocation_'+rowid).val();
	var exp = $('.compositeExposure_'+rowid).val();
	var expbasis = $('.compositeExpBasis_'+rowid).val();
	var exposure = $('.compositeExposure_'+rowid).val();
	var devlop_rate = $('.compositeDevRate_'+rowid).val();
	var mainccode = $('.compositeMainCcode_'+rowid).val();

	if ( multiccode != '' && loc != '' && exp != '' && expbasis != '' && mainccode != '' && devlop_rate != '' && exposure != '' ) {
		enableCompFields (rowid);
	} else {
		disableCompFields (rowid);
	}

	if( $(this).val() == '' ) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

$(document).on('change', '.compositeMultiCcode, .compositeMainCcode, .compositeLocation, .compositeExpBasis', function() {
	var rowid = $(this).attr('data-rowid');
	var multiccode = $('.compositeMultiCcode_'+rowid).val();
	var loc = $('.compositeLocation_'+rowid).val();
	var exp = $('.compositeExposure_'+rowid).val();
	var expbasis = $('.compositeExpBasis_'+rowid).val();	
	var premium = $('.compositepremium_'+rowid).val();
	var devlop_rate = $('.compositeDevRate_'+rowid).val();
	var mainccode = $('.compositeMainCcode_'+rowid).val();

	if ( multiccode != '' && loc != '' && exp != '' && expbasis != '' && mainccode != '' && expbasis != '' && premium != '') {
		enableCompFields (rowid);
	} else {
		disableCompFields (rowid);
	}

	if( $(this).val() == '' ) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
});

function enableCompFields (rid) {
	$('#compositeSave_'+rid).removeClass('disabled');
	$('#compositeAddRow_'+rid).removeClass('disabled');
	//$('#compositeDeleteRow_'+rid).removeClass('disabled');
}

function disableCompFields (rid) {
	$('#compositeSave_'+rid).addClass('disabled');
	$('#compositeAddRow_'+rid).addClass('disabled');
	//$('#compositeDeleteRow_'+rid).addClass('disabled');
}

/*Coverages and limits - Each occurrence and General aggregate selectbox onchange*/
$(document).on('change', '#typeGL, #typeLiquor, #typeOCP' ,function() {
	var changeVal = $('.rqbiDeductibleInsured:checked').val();
	var covtype = $(this).attr('data-covtype');
	var this_checked = false;
	var checked_type = $(this).prop('checked');
	this_checked = checked_type;

	if(changeVal == "1") {
		$('.deductTbleSection').show();	
		$('.sirTblSection').hide();
	} else {
		$('.deductTbleSection').hide();	
		$('.sirTblSection').show();
	}

	var covT_Value = $(this).val();
	if (covT_Value == "1,2" || covT_Value == "1") {
		$('#optionaCoverage_sec').removeClass('accordDisabled');
	} else {
		$('#optionaCoverage_sec').addClass('accordDisabled');
	}

	$('#covWarningCancel').removeAttr('data-covtype').attr('data-covtype', covtype);

	if ( $('#typeGL').prop('checked') == true && $('#typeLiquor').prop('checked') == false && $('#typeOCP').prop('checked') == false ) { 
	    
	    if(this_checked == false){
	    	$('.covPopup').trigger('click');//Coverage modification alert
	    } else {
	    	get_coverage_types();
	    	update_deductible('gl');
	    }

	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv, .rqbiOcpSicCode, .rqbiDesigContractorDiv').hide();
	    $('.rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .rqbiLiquorSicCode').show();

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
	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .rqbiLiquorSicCode').show();
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
	    get_coverage_types();
	    update_deductible('gl_liq');
    } else if ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == true && $('#typeOCP').prop('checked') == false ) {
	    	
	    if(this_checked == false){
	    	$('.covPopup').trigger('click');//Coverage modification alert
	    } else {
	    	get_coverage_types();
	    	update_deductible('liq');
	    }

	    $('.LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .rqbiLiquorSicCode, .liquorDeductDiv').removeAttr('style').show();
	    $('.glLiquorTittle, .rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .rqbiOcpSicCode, .rqbiDesigContractorDiv, .deductibleMonoline, .OcpEachOccurDiv, .OcpGeneralAggrDiv').hide();

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

    	if(this_checked == false){
	    	$('.covPopup').trigger('click');//Coverage modification alert
	    } else {
	    	get_coverage_types();
	    }

	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .OcpEachOccurDiv, .OcpGeneralAggrDiv, .rqbiOcpSicCode, .rqbiDesigContractorDiv').hide();
	    $('.rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .covGlSection, .rqbiLiquorSicCode').show();

		deduct_SIR_toggle();

		if(changeVal == "1") {
			$('.deductibleMonoline').show();
			$('.liquorDeductDiv, .sirGl, .sirLiquor, .OcpDeductDiv, .sirOcp').hide();
		} else{
			$('.sirGl').show();
			$('.liquorDeductDiv, .deductibleMonoline, .sirLiquor, .OcpDeductDiv, .sirOcp').hide();
		}

		$('.sirGlLiqTitle, .deductGlLiqTitle').text('').text('GL');

	    $('.noSelectMsg').hide();

	    $('.covMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');

    } else if ( $('#typeGL').prop('checked') == false && $('#typeLiquor').prop('checked') == false && $('#typeOCP').prop('checked') == true ) {
    	
    	if(this_checked == false){
	    	$('.covPopup').trigger('click');//Coverage modification alert
	    } else {
	    	get_coverage_types();
	    	update_deductible('ocp');
	    }

	    $('.glLiquorTittle, .LiquorEachOccurDiv, .LiquorGeneralAggrDiv, .covGlSection, .rqbiLiquorSicCode, .liquorDeductDiv,.rqbiEachOccurDiv, .rqbiGeneralAggrDiv').hide();
	    $('.OcpEachOccurDiv, .OcpGeneralAggrDiv').show();
	    //$('.rqbiEachOccurDiv, .rqbiGeneralAggrDiv, .rqbiOcpSicCode, .rqbiDesigContractorDiv, .deductibleMonoline').show();

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

    setTimeout(function(){
    	checkContinueToFullQuoteStatus();
    }, 300);

    coverage_base_ocShow('rqbi_file');
});

function deduct_SIR_toggle() {
	if( $('#rqbiDeductible').prop('checked') == true ) {
    	$('.deductibleMonoline, .deductPremiumDiv').show();
    	$('.liquorDeductDiv').hide();
    }
}

/*Location details - Copy from mailing address*/
// var accid = localStorage.getItem("accid");
// var accid = accid;
    
function clearLocation () {
	$('#locAddress1_1').val('');
	$('#locZipcode_1').val('');
	$('.locCitySpan_1').html('').append('<select class="form-control loc_city_name_hide_1" id="locCity_1" name="loc_city_name_hide_1" placeholder="City"></select>');
	$('#locState_1').val('');
	$('#locState_1').val('');
}

//AI forms - Premium Amount Edit Function
$(document).on('click', '.aiPremiumLbl', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).text();
	prem = prem.substring(1);

	$('.aiPremiumInp_'+rid).show().text(prem).focus();
	$('.aiPremiumLbl_'+rid).hide();
});

$(document).on('focusout', '.aiPremiumInp', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).val();
	//var txtbxval = $('.aiPremiumLbl_'+rid).text(prem);

	if(prem != '') {
		$('.aiPremiumLbl_'+rid).show().text('$'+prem);
	}else{
		$('.aiPremiumLbl_'+rid).show().text('');
	}

	$('.aiPremiumInp_'+rid).hide();
});


//OC forms - Premium Amount Edit Function
$(document).on('click', '.ocPremiumLbl', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).text();
	prem = prem.substring(1);

	$('.ocPremiumInp_'+rid).show().val(prem).focus();
	$('.ocPremiumLbl_'+rid).hide();
});

$(document).on('focusout', '.ocPremiumInp', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).val();
	var txtbxval = $('.aiPremiumLbl_'+rid).text(prem);

	if(prem != '') {
		$('.ocPremiumLbl_'+rid).show().text('$'+prem);
	}else{
		$('.ocPremiumLbl_'+rid).show().text('');
	}

	$('.ocPremiumInp_'+rid).hide();
});

//OC Hire and Auto forms - Premium Amount Edit Function
$(document).on('click', '.ocPremium_hireAuto_Lbl', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).text();
	prem = prem.substring(1);

	$('.ocPremium_hireAuto_Inp_'+rid).show().val(prem).focus();
	$('.ocPremium_hireAuto_Lbl_'+rid).hide();
});

$(document).on('focusout', '.ocPremium_hireAuto_Inp', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).val();
	var txtbxval = $('.aiPremiumLbl_'+rid).text(prem);

	if(prem != '') {
		$('.ocPremium_hireAuto_Lbl_'+rid).show().text('$'+prem);
	}else{
		$('.ocPremium_hireAuto_Lbl_'+rid).show().text('');
	}

	$('.ocPremium_hireAuto_Inp_'+rid).hide();
});


//OC Stop Gap forms - Premium Amount Edit Function
$(document).on('click', '.ocPremium_stopGap_Lbl', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).text();
	prem = prem.substring(1);

	$('.ocPremium_stopGap_Inp_'+rid).show().val(prem).focus();
	$('.ocPremium_stopGap_Lbl_'+rid).hide();
});

$(document).on('focusout', '.ocPremium_stopGap_Inp', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).val();
	
	if(prem != '') {
		$('.ocPremium_stopGap_Lbl_'+rid).show().text('$'+prem);
	}else{
		$('.ocPremium_stopGap_Lbl_'+rid).show().text('');
	}

	$('.ocPremium_stopGap_Inp_'+rid).hide();
});


//Common forms - Premium Amount Edit Function
$(document).on('click', '.comnFrmPremLbl', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).text();
	prem = prem.substring(1);

	$('.comnFrmPremInp_'+rid).show().text(prem).focus();
	$('.comnFrmPremLbl_'+rid).hide();
});

$(document).on('focusout', '.comnFrmPremInp', function() {
	var rid = $(this).attr('data-rowid');
	var prem = $(this).val();
	//var txtbxval = $('.comnFrmPremLbl_'+rid).text(prem);

	if(prem != '') {
		$('.comnFrmPremLbl_'+rid).show().text('$'+prem);
	}else{
		$('.comnFrmPremLbl_'+rid).show().text('');
	}

	$('.comnFrmPremInp_'+rid).hide();
});

//All forms - Premium Amount Edit Function

// $(document).on('blur', '.OccurDeductOtherTxt', function() {
// 	var selectedval = $(this).val();
// 	$('.rqbiOccurDeductible').val('').val(selectedval);
// });

/*GL, Liquor on change function*/
$(document).on('change', '.glLiquor', function() {
	gl_liquor_changefunc();
});

$(document).on('change', '#typeOCP', function() {
	if (  $('#typeGL').is(':checked') || $('#typeLiquor').is(':checked') ) {
		$('.covMandatoryMsg').show().text('').text('( Either select GL/Liquor or OCP )');
		$('#typeOCP').prop('checked',false);
		gl_liquor_changefunc();
		$('.noSelectMsg').hide();
	} 
});

$(document).on('change', '#typeGL, #typeLiquor', function() {
	if (  $('#typeGL').is(':checked') && $('#typeOCP').is(':checked') && $('#typeLiquor').not(':checked')) {
		$('.covMandatoryMsg').show().text('').text('( Either select GL or OCP )');
		$('#typeGL').prop('checked',false);
		gl_liquor_changefunc();

	} else if ( $('#typeLiquor').is(':checked') && $('#typeOCP').is(':checked') && $('#typeGL').not(':checked')) {
		$('.covMandatoryMsg').show().text('').text('( Either select Liquor or OCP )');		
		$('#typeLiquor').prop('checked',false);
		gl_liquor_changefunc();
	}
});

/*Start Quick Quote - Coverages*/
$(document).on('change', '#qqOCP', function() {
 	if (  $('#qqGL').prop('checked') == true && $('#qqOCP').prop('checked') == true && $('#qqLiquor').prop('checked') == false) {
		$('.qqCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL or OCP )');
		$('.qqCovMsg').removeAttr('style').hide();				
		$('#qqOCP').prop('checked',false);
	} else if (  $('#qqGL').prop('checked') == false && $('#qqOCP').prop('checked') == true && $('#qqLiquor').prop('checked') == true) {
		$('.qqCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select Liquor or OCP )');
		$('.qqCovMsg').removeAttr('style').hide();				
		$('#qqOCP').prop('checked',false);
	} else if (  $('#qqGL').prop('checked') == true && $('#qqOCP').prop('checked') == true && $('#qqLiquor').prop('checked') == true) {
		$('.qqCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL/Liquor or OCP )');
		$('.qqCovMsg').removeAttr('style').hide();				
		$('#qqOCP').prop('checked',false);
	}
});
	
$(document).on('change', '#qqGL, #qqLiquor', function() {
	if (  $('#qqGL').prop('checked') == true && $('#qqOCP').prop('checked') == true && $('#qqLiquor').prop('checked') == false) {
		$('.qqCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select GL or OCP )');
		$('.qqCovMsg').removeAttr('style').hide();				
		$('#qqGL').prop('checked',false);
	} else if ( $('#qqLiquor').prop('checked') == true && $('#qqOCP').prop('checked') == true && $('#qqGL').prop('checked') == false) {
		$('.qqCovMandatoryMsg').removeAttr('style').show().text('').text('( Either select Liquor or OCP )');			
		$('.qqCovMsg').removeAttr('style').hide();
		$('#qqLiquor').prop('checked',false);
	}
});

$(document).on('change', '#qqGL, #qqLiquor, #qqOCP', function() {
	if ( $('#qqGL').prop('checked') == false && $('#qqLiquor').prop('checked') == false && $('#qqOCP').prop('checked') == false) {
	    $('.qqCovMsg').removeAttr('style').show().text('').text('( Atleast one coverage should be checked )');
	    $('.qqCovMandatoryMsg').removeAttr('style').hide();
    } else {
    	$('.qqCovMsg').removeAttr('style').hide();
    }
});

/*End Quick Quote - Coverages*/

function gl_liquor_changefunc() {
	if ( ( $('#typeGL').is(':checked') || $('#typeLiquor').is(':checked') ) && $('#typeOCP').not(':checked')) {
		$('.rqbiDesigContractorDiv').hide();
	} else if ( $('#typeGL').not(':checked') && $('#typeLiquor').not(':checked') && $('#typeOCP').is(':checked') ) {
		$('.rqbiDesigContractorDiv').show();
	}
}

/*Class builder continue to full quote button click*/
$(document).on('click', '.cbContinueFullquote', function () {
	if ( ( $('#typeLiquor').prop('checked') == false ) && ( $('#typeGL').prop('checked') == false ) && ( $('#typeOCP').prop('checked') == false ) ) {
        // new PNotify({ title: 'Error', text: 'Please select either GL/Liquor or OCP', delay: 1000, type: 'error' });
        $('html, body').animate({
	      scrollTop: $('.covLimitAccordHead').offset().top-120
	    }, 1000);

	    $('.covLimitAccordHead').trigger('click');
	    $('.covMandatoryMsg').show().text('').text('( Atleast one coverage should be checked )');
	}
});



/*OC - Retroactive Date*/
$(document).on('change', '.retroDateNone', function () {
	if( $('#retroDateNone').prop('checked') == true ) {
		$('#retroactiveDate').addClass('disabled');
	} 
});

// /*Manuscript Forms - Form Name*/
$(document).on('click', '.manuFrmNameLbl', function () {
  var rid = $(this).attr('data-rowid');
  var frmname = $(this).text();

  if(frmname != '') {
    $('.manuFrmNameInput_'+rid).show().focus().val('').val($.trim(frmname));
  } else {
    $('.manuFrmNameInput_'+rid).val('').show().focus();
  }

  $('.manuFrmNameLbl_'+rid).hide();
});

// /*Manuscript Forms - Form Number*/
$(document).on('click', '.manuFrmNoLbl', function () {
  var rid = $(this).attr('data-rowid');
  var frmno = $('.manuFrmNoLbl_'+rid+' span').text();

  if(frmno != '') {
    $('.manuFrmNoInput_'+rid).show().focus().val('').val($.trim(frmno));
  } else {
    $('.manuFrmNoInput_'+rid).val('').show().focus();
  }

  $('.manuFrmNoLbl_'+rid).hide();
});

// /*Manuscript Forms - Premium*/
$(document).on('click', '.manuPremLbl', function () {
  var rid = $(this).attr('data-rowid');
  var premium = $('.manuPremLbl_'+rid+' span').text();

  if(premium != '') {
    $('.manuPremInput_'+rid).show().focus().val('').val($.trim(premium));
  } else {
    $('.manuPremInput_'+rid).val('').show().focus();
  }

  $('.manuPremLbl_'+rid).hide();
});

// function edit_premium(rowid) {
//   var premium = $('.manuPremLbl_'+rowid+' span').text();

//   if(premium != '') {
//     $('.manuPremInput_'+rowid).show().focus().val('').val($.trim(premium));
//   } else {
//     $('.manuPremInput_'+rowid).val('').show().focus();
//   }

//   $('.manuPremLbl_'+rowid).hide();
// }

 /*Brokerage - Add row function*/
$(document).on('click', '.manuFrmsAddRow', function () {

	var formnumber_empty = [];
	var formname_empty = [];

	$( ".manuFrmNoInput" ).each(function( index ) {
		if ($( this ).val() == '') {
			formnumber_empty.push($( this ).val());
		}
	});


	$( ".manuFrmNameInput" ).each(function( index ) {
		if ($( this ).val() == '') {
			formname_empty.push($( this ).val());
		}
	});


	if (formnumber_empty.length > 0 || formname_empty.length > 0 ) {
 		$(".manuFrmNoInput, .manuFrmNoLbl").each( function() {
 			if($(this).hasClass('manuFrmNoInput')) {
            	var value = $(this).val();
            } else {
            	var value = $(this).text();
            }
            if (value == "" || value == 0) {
                $(this).addClass('manufrm_redBorder');
            }else{
                $(this).removeClass('manufrm_redBorder');
            }
        }); 

        $(".manuFrmNameInput, .manuFrmNameLbl").each( function() {
            if($(this).hasClass('manuFrmNameInput')) {
            	var value = $(this).val();
            } else {
            	var value = $(this).text();
            }
            if (value == "" || value == 0) {
                $(this).addClass('manufrm_redBorder');
            }else{
                $(this).removeClass('manufrm_redBorder');
            }
        }); 

		new PNotify({ title: 'Error', text: 'Please fill mandatory fields', delay: 1000, type: 'error' });
	}else{
		// var lastrowfrmno = $('.manuFrmNoInput.lastrow').val();
		// var lastrowfrmname = $('.manuFrmNameInput.lastrow').val();
		// var frmname = $('.formNameInput').val();
		// var lastrowprem = $('.manuFrmuploadInput.lastrow').val();
		$('.manuFrmNoInput, .manuFrmNameInput, .manuPremInput, .manuFrmuploadInput').removeClass('lastrow');

		var rowid = $('.menuscript_trclass').length;
		rowid++;

		$('.manuscriptFrmTable tbody').prepend('<tr><td></td><td><lable class="pull-left text-left width100_perc manuFrmNoLbl manuFrmNoLbl_'+rowid+'" data-rowid="'+rowid+'"><span></span></lable><div class="txttooltip"><input type="text" class="form-control disableField manuFrmNoInput manuFrmNoInput_'+rowid+'" data-rowid="'+rowid+'" style="display: none;"></div></td><td class="text-left"><lable class="pull-left text-left width100_perc manuFrmNameLbl manuFrmNameLbl_'+rowid+'" data-rowid="'+rowid+'"></lable><div class="txttooltip"><input type="text" class="form-control disableField manuFrmNameInput manuFrmNameInput_'+rowid+'" data-rowid="'+rowid+'" style="display: none;"></div></td><td><input type="file" class="form-control-file disableField manuFrmuploadInput manuFrmuploadInput_'+rowid+'" name="manuFrmuploadInput_'+rowid+'" id="manuFrmuploadInput_'+rowid+'" data-file="no" data-rowid="'+rowid+'"><small class="text-danger pull-left fileFormatWarn_'+rowid+'" style="display: none;"></small></td><td><label class="width100_perc font_normal mb-0 manuPremLbl manuPremLbl_'+rowid+'" data-rowid="'+rowid+'">$<span class="manuPremAmount_'+rowid+'">2,000</span></label><div class="txttooltip"><input type="text" class="form-control disableField manuPremInput manuPremInput_'+rowid+'" value="" name="manuPremInput_'+rowid+'" id="manuPremInput_'+rowid+'" data-premium="" data-rowid="'+rowid+'" style="display: none;"></div></td><td><a href="javascript:void(0);" class="manuFrmDelete btn btn-sm btn-danger fontSize13" data-rowid="'+rowid+'"><i class="fa fa-trash"></i></a></td></tr>');

		$('.manuFrmNoLbl_'+rowid).hide();
		$('.manuFrmNameLbl_'+rowid).hide();
		$('.manuPremLbl_'+rowid).hide();
		$('.manuFrmNoInput_'+rowid).show().focus().addClass('lastrow');
		$('.manuFrmNameInput_'+rowid).show().addClass('lastrow');
		$('.manuPremInput_'+rowid).show().addClass('lastrow');
		$('.manuFrmuploadInput_'+rowid).addClass('lastrow');
	}
});

/*Manuscript Forms - Delete Popup*/
$(document).on('click', '.manuFrmDelete', function () {
	var id = $(this).data('id');
	$('.menuscripthiddenid').val('');
	$('.menuscripthiddenid').val(id);

	$('.manuFrmDeletePopup').trigger('click');
});


/*Right Side Bar - Gl, Liquor ,Ocp*/
$(document).on('click', '.glPremiumSection', function () {
	$('.rhsGlPremium').slideToggle();
	var element = $(".rhsGlPremium").is(":visible");
	
	if( element == true ){
		// alert(element)
        alert("The paragraph  is visible.");
    } else{
        alert("The paragraph  is hidden.");
    }
});

/*RQBI tab click*/
$(document).on('click', '#pills-rqbi-tab', function(e) {
	/*Append rqbi_tab.php page*/

	setTimeout(function(){
		enable_diable_excelrater_button(quote_ver_status);	
	}, 3000);
	
	
	var check_brokvalid = check_account_brok_valid();
	if (check_brokvalid == 1) {
		$.post("rqbi_tab.php", function(postresult){
			$("#pills-rqbi").html('').append(postresult);
			// var accid = localStorage.getItem('accid');
			// var accid = accid;
			$('#acnt_id').val(accid);
			rqbi_policy_status();

			if (xl_lob_change == true) {
				if(($('#xl_covDiv').html()?.trim() == '')) {
					$.ajax({
						url: '/brokerage/template/xl_cov.php',
						method: 'post',
						success: function(res) {
							$('.stateSpecficSec, .covckbx, .covLimitsSec, .deductibleInsuredDiv, .deductTbleSectionDiv, .cbAccord, .cbContinueFqdiv, .sirTblSection, .rqbiTpa').hide();
							$('#xl_covDiv').html(res);
							if($('#xlUgl_div').html().trim() == ''){
								$.ajax({
									url: '/brokerage/template/xl_Ugl.php',
									method: 'post',
									success: function(res1) {
										$('#xlUgl_div').html(res1);
									}
								});
							}else {
								$('#xlUgl_div').html('');
							}
						}

					})
				}
				if($('#xl_premiumDiv').html()?.trim() == '') {
					$.ajax({
						url:'/brokerage/template/xl_premium.php',
						method: 'post',
						success: function(res) {
							$('#xl_premiumDiv').html(res);
						}
					});
				}
			$('.xl_quoteBtn, .gl_goXl').addClass('d-none');
		}
			$.when(bind_add_quote_list(accid)).then( function () { 
				get_quote_version_list(accid,"");
				cb_btn_disable_enable();
				covCkbxFunctionality();
				menu_permission();
			}); 
			
		});
		$(this).removeAttr('style').css('pointer-events', 'none');
	} else {
		e.preventDefault();
		$('#pills-accNotes-tab').trigger('click');
	}
});

function update_state_specific_forms(accid=''){
	var covStateSpecific = JSON.stringify($('#covStateSpecific').val());
	$.ajax({
		type:"POST",
		url: laravel_url+"/updateStateSpecificForms",
		data:{ accid : accid,rqbid : rqbi_id },
		success:function(response){
			   if($('#cbContinueFullquote').hasClass('accordDisabled')) {
			   		$('#cbContinueFullquote').removeClass('accordDisabled');
			   }
			   checkContinueToFullQuoteStatus();
				
		}
	});
}
 
function cb_btn_disable_enable() {

	var act_chk=false;

	$(".cbClasscode").each(function () {
		var rowid = $(this).attr('data-rowid');
		var ccode = $('.cbClasscode_'+rowid).val();
		var loc = $('.cbLocSelect_'+rowid).val();
		var exp = $('.rqbiExposure_'+rowid).val();
		var prem_basis = $('.classbuildpremBasis_'+rowid).val();

		if($('input[type="checkbox"]#rqbiIfany_'+rowid+':checked').val()=='on' || $('input[type="checkbox"]#rqbiIncluded_'+rowid+':checked').val()=='on'){//mytest
			$('.cbCloneRow_'+rowid).removeClass('disabled');
			$('.cbAddRow_'+rowid).removeClass('disabled');
			$('.cbDownArrow_'+rowid).removeClass('disabled');
			act_chk=true;
		}else{
			act_chk=false;
		}

		if(act_chk==false){

			if(ccode ='' || (loc == '' || loc == null) || (exp == '' || exp == 0) || prem_basis == '') {
				$('.cbCloneRow_'+rowid).addClass('disabled');
				$('.cbAddRow_'+rowid).addClass('disabled');
				$('.cbDownArrow_'+rowid).addClass('disabled');
			} else {
				$('.cbCloneRow_'+rowid).removeClass('disabled');
				$('.cbAddRow_'+rowid).removeClass('disabled');
				$('.cbDownArrow_'+rowid).removeClass('disabled');
			}
		}
	});
}

/*Classbuilder accordion - header click*/
$(document).on('click', '.cbAccordHeader', function () {
	cb_btn_disable_enable();
});




/*Check quote version is exist or not*/
function check_quote_versionList(){
	var qversion = $('.rqbiQuoteVersion').val();
	if ( qversion == '' ) {
    	$('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').addClass('accordDisabled');
  	}else {
    	$('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote, #aiFormsAccord, #commonFormsAccord').removeClass('accordDisabled');
  	}
}

/*Awesome complete dropdown click*/
$(document).on('click', '.awesomplete li', function () {
    $('.awesomplete ul').removeAttr('style').css('display', 'none');
});

$(document).on('click', 'input[type=radio][name=rqbiPolicytype]', function(){
	// var acct_id	= localStorage.getItem("accid");
	// var acct_id	= accid;
	var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
	var current_user =localStorage.getItem('userid');
    var current_date = yyyy+'-'+mm+'-'+dd;
    var policy_type = $(this).val();

    if(rqbiQuoteVersion !="") {

		$.ajax({
	      url: laravel_url+"/update_policy_type",
	      type:'post',
	      data:{acct_id:accid,rqbiQuoteVersion:rqbiQuoteVersion,current_user:current_user,current_date:current_date,policy_type:policy_type},
	      success:function(response){
	      	$('#cbContinueFullquote').removeClass('accordDisabled');        
	      },
	      complete: function() {
	          
	      }

	    });
	}else{
		new PNotify({ title: 'Error', text: 'Quote Version Should not Empty', delay: 1500, type: 'error' });	
	}

});

/*Find accordion is open or close*/
// $(document).on('click', '.rqbi_all_tabs, .aiFormsAccord, .commonFormsAccord', function() {
// 	if($(this).hasClass('collapsed')) {
// 		alert('close');
// 	} else {
// 		alert('open');
// 	}
// });

function graduatedratingbtn_disableenable() {
	var cbrowlen = $('.cbuildRow').length;
	var comprowlen = $('.comprow').length;
	var expcount = 0;
	var sel_class_codes_array = [];
	var cbClasscode_array = [];
	var cbClasscode = "";
	var sel_class_codes = "";

	$(".rqbiExposure").each ( function() {
		var set_value = $(this).val();
	    if( set_value != '') {
			var data_rowid = $(this).attr('data-rowid');
			cbClasscode = cbClasscode_array.push($('.cbClasscode_'+data_rowid).val());
	        expcount = expcount+1;
	    }
	});

	if ( expcount == 1) {
		$('.classbuildGraduatedRating').removeClass('disabled');
	}else if(expcount == 0 ){
		$('.classbuildGraduatedRating').addClass('disabled');
	} else if ( expcount > 1) {
		disable_graduated_rating('null');
	}
}

function compareArrays(arr1, arr2) {
    return $(arr1).not(arr2).length == 0 && $(arr2).not(arr1).length == 0
};

  $(document).on('click', '.glToggler', function(){
    $(".gl_toggled_content").slideToggle();

    if($('.gl_toggled_content').hasClass('forarrow')){
    	$('.gl_toggled_content').removeClass('forarrow');
    	$('.gldownarrow').show();
    	$('.glrightarrow').hide();
    } else {
    	$('.gl_toggled_content').addClass('forarrow');
    	$('.gldownarrow').hide();
    	$('.glrightarrow').show();
    }
  });  

  $(document).on('click', '.liquorToggler', function(){
    $(".liquor_toggled_content").slideToggle();

    if($('.liquor_toggled_content').hasClass('forarrow')){
    	$('.liquor_toggled_content').removeClass('forarrow');
    	$('.liquordownarrow').show();
    	$('.liquorrightarrow').hide();
    } else {
    	$('.liquor_toggled_content').addClass('forarrow');
    	$('.liquordownarrow').hide();
    	$('.liquorrightarrow').show();
    }
  });  

  $(document).on('click', '.ocpToggler', function(){
    $(".ocp_toggled_content").slideToggle();

    if($('.ocp_toggled_content').hasClass('forarrow')){
    	$('.ocp_toggled_content').removeClass('forarrow');
    	$('.ocpdownarrow').show();
    	$('.ocprightarrow').hide();
    } else {
    	$('.ocp_toggled_content').addClass('forarrow');
    	$('.ocpdownarrow').hide();
    	$('.ocprightarrow').show();
    }
  });


  $(document).on('click', '.quote_policy_details_btn', function(){
    	if($('.rqbi_rhspane_section').css('display') == 'none') {
    		$('.rqbi_rhspane_section').show();
    		$('.rqbi_according_section').removeClass('col-md-12');
    		$('.rqbi_according_section').addClass('col-md-10');
    		$('.composite_class_code_div').addClass('col-md-4');
    		$('.composite_class_code_div').removeClass('col-md-5');
    		$('.quote_policy_details_btn').hide();
    		get_righthandpanel_value();
    		rqbi_responsive ();
    	} else {
    		$('.rqbi_rhspane_section').hide();
    		$('.rqbi_according_section').addClass('col-md-12');
    		$('.rqbi_according_section').removeClass('col-md-10');
    		$('.composite_class_code_div').removeClass('col-md-4');
    		$('.composite_class_code_div').addClass('col-md-5');
    		$('.quote_policy_details_btn').hide();
    	}      
  });

  $(document).on('click', '.close_right_section_btn', function(){
    	if($('.rqbi_rhspane_section').css('display') == 'block') {
    		$('.rqbi_rhspane_section').hide();
    		$('.rqbi_according_section').addClass('col-md-12');
    		$('.rqbi_according_section').removeClass('col-md-10');
    		$('.quote_policy_details_btn').show();  
    		$('.composite_class_code_div').removeClass('col-md-4');
    		$('.composite_class_code_div').addClass('col-md-5');  
    		rqbi_responsive();		
    	} else {
    		$('.rqbi_rhspane_section').show();
    		$('.rqbi_according_section').removeClass('col-md-12');
    		$('.rqbi_according_section').addClass('col-md-10');
    		$('.quote_policy_details_btn').hide();
    		$('.composite_class_code_div').addClass('col-md-4');
    		$('.composite_class_code_div').removeClass('col-md-5');
    	}
  });


$(document).on('change', '#business_segment', function() {
	var business_segment = $('#business_segment').val();
	if(business_segment != '') {
		$('#business_segment').removeClass('errorBorder');
	}
});


$(document).on('keyup', '#businessDescription', function() {
	var businessDescription = $('#businessDescription').val();
	if(businessDescription != '') {
		$('#businessDescription').removeClass('errorBorder');
	}
});

$(document).on('keyup', '#njTransaction', function() {
	var njTransaction = $('#njTransaction').val();
	if(njTransaction != '') {
		$('#njTransaction').removeClass('errorBorder');
	}
});

/*added by vaishnavi on 09aprl2021*/
$(document).on('change', '.rqbiExposure, .rqbiFinalRate', function() {

	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');	
	var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');	
	var exposure_update = 0;
	var exposure_empty = 0;
	if(enable_grad_rating == true || gr_disabled == true ){
		var exposure_value = $('.rqbiExposure').val();
		if(exposure_value != "" && exposure_value != 0){
			exposure_value = exposure_value.replace('$','').replace( /,/g,'');
			exposure_update = 1;
		}else{
			exposure_empty = 1;
		}
		var exposure_rate = $('.rqbiFinalRate').val();
		if(exposure_rate != "" && exposure_rate != 0){
			exposure_rate = exposure_rate.replace('$','').replace( /,/g,'');
			exposure_update = 1;
		}else{
			exposure_empty = 1;
		}
		var rowId = $('#rowId').val();	
		var ccode_rid = $('.comprow').first().attr('data-rid'); 
		if((parseInt(rowId) > 1 && exposure_update == 1 && exposure_empty == 0) && ( ccode_rid == 0 || ccode_rid == undefined )){
			graduated_rating_exposure_edit("ClassBuilder");
			$('.modify_exposure_rate').css('display','none');
			$('.modify_exposure_rate p').empty();
			$('.classbuildGraduatedRating').removeClass('redBorder');
			getAdditionalAcctPremium();
		}else if((exposure_empty == 1) && ( ccode_rid == 0 || ccode_rid == undefined )){
			$('.modify_exposure_rate').css('display','block');
            $('.modify_exposure_rate p').empty().text('Impact in Graduated rating: Please fill mandatory fields, the exposure/final rate cannot be empty');
         	$('.classbuildGraduatedRating').addClass('redBorder');
		}else{
            $('.modify_exposure_rate').css('display','none');
            $('.modify_exposure_rate p').empty();
            $('.classbuildGraduatedRating').removeClass('redBorder');
        }
	}else{
		$('.modify_exposure_rate').css('display','none');
        $('.modify_exposure_rate p').empty();
        $('.classbuildGraduatedRating').removeClass('redBorder');
	}
});


$(document).on('change', '.compositeExposure, .compositeDevRate', function() {
	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');	
	var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');	
	var exposure_update = 0;
	var exposure_empty = 0;
	if(enable_grad_rating == true || gr_disabled == true ){
		var exposure_value = $('.compositeExposure').val();
		if(exposure_value != "" && exposure_value != 0){
			exposure_value = exposure_value.replace('$','').replace( /,/g,'');
			exposure_update = 1;
		}else{
			exposure_empty = 1;
		}
		var exposure_rate = $('.compositeDevRate').val();
		if(exposure_rate != "" && exposure_rate != 0){
			exposure_rate = exposure_rate.replace('$','').replace( /,/g,'');
			exposure_update = 1;
		}else{
			exposure_empty = 1;
		}
		var rowId = $('#rowId').val();	
		var ccode_rid = $('.comprow').first().attr('data-rid'); 
		if((parseInt(rowId) > 1 && exposure_update == 1 && exposure_empty == 0) && ( ccode_rid != 0 && ccode_rid != undefined )){
			graduated_rating_exposure_edit("CompositeExposure");
			$('.modify_exposure_rate').css('display','none');
			$('.modify_exposure_rate p').empty();
			$('.classbuildGraduatedRating').removeClass('redBorder');
			getAdditionalAcctPremium();
		}else if((exposure_empty == 1) && ( ccode_rid != 0 && ccode_rid != undefined )){
			$('.modify_exposure_rate').css('display','block');
            $('.modify_exposure_rate p').empty().text('Impact in Graduated rating: Please fill mandatory fields, the exposure/final rate cannot be empty');
         	$('.classbuildGraduatedRating').addClass('redBorder');
		}else {
            $('.modify_exposure_rate').css('display','none');
            $('.modify_exposure_rate p').empty();
            $('.classbuildGraduatedRating').removeClass('redBorder');
            if ( ccode_rid != 0 && ccode_rid != undefined ) {
				graduated_rating_exposure_edit("CompositeExposure");
            }
        }

	}else{
		$('.modify_exposure_rate').css('display','none');
        $('.modify_exposure_rate p').empty();
        $('.classbuildGraduatedRating').removeClass('redBorder');
	}
});

/*added by vaishnavi on 09aprl2021*/

function getTermsExpDate(pdf_id=''){
	var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	var rqbi_id_val = $('#rqbiQuoteVersion').val();
	$.ajax({
        type:"POST",
        url: laravel_url+"/get_efft_date_terms",
        data:{ pdf_id : pdf_id,rqbi_id: rqbi_id_val },
        success:function(response){ 
            var obj = JSON.parse(response);
            var iso_effective_date = obj.iso_effective_date;
            var iso_effective_date_spl = iso_effective_date.split('-');
            var iso_effective_date_org = iso_effective_date_spl[1]+'-'+iso_effective_date_spl[2]+'-'+iso_effective_date_spl[0];
            var terms = parseInt(obj.iso_terms);
			CurrentDate = new Date(iso_effective_date_org);
			CurrentDate.setMonth(CurrentDate.getMonth() + terms);
			CurrentDate = formattedDate(CurrentDate);
			$('#rqbieffdate').val(iso_effective_date_org);
			$('#rqbiexpdate').val(CurrentDate);
        },
       complete:function(){
        	update_rqbi_date();
        	get_rqbitable_Details(acct_id,rqbi_id_val);
       }
    });
}

function formattedDate(d = new Date) {
  return [d.getMonth()+1, d.getDate(), d.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('-');
}



function expDateChanged() {
		$('#rqbiexpdate').removeClass('errorBorder');
		$('#expDateEmptyValid').hide();
		update_rqbi_date();
}

function effectDateChanged() {

		$('#rqbieffdate').removeClass('errorBorder');
	    $('#effDateEmptyValid').hide();
	    $('#rqbiexpdate').removeClass('errorBorder');
		$('#expDateValid').hide();
	    var eff_date = $('#rqbieffdate').val();
	    if(eff_date != ''){
	    	CurrentDate = new Date(eff_date);
			CurrentDate.setMonth(CurrentDate.getMonth() + 12);
			CurrentDate = formattedDate(CurrentDate);
			$('#rqbiexpdate').val(CurrentDate);
			$('#rqbi_expir_dt').datepicker('setStartDate', new Date($('#rqbieffdate').val()))
			$('#rqbi_expir_dt').datepicker("update",new Date(CurrentDate));
	    }
	    else {
	    	$('#rqbiexpdate').val('');
	    }
}

$(document).on('keyup','#rqbieffdate',function(){
	var eff_date = $('#rqbieffdate').val();
	if(eff_date == '') {
		$('#rqbiexpdate').val('');
		$('#rqbiexpdate').removeClass('errorBorder');
		$('#expDateValid').hide();
	}
})

function update_rqbi_date() {

	var mandatory_condition_status = checkRqbiDateValidation();

	if(mandatory_condition_status == true) {

		// var acct_id	= localStorage.getItem("accid");
		// var acct_id	= accid;
		var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
		rqbi_effect_dt = $('#rqbieffdate').val();
		rqbi_exp_dt = $('#rqbiexpdate').val();
		$.ajax({
	        type:"POST",
	        url: laravel_url+"/update_rqbi_date",
	        data:{acct_id: accid, rqbiQuoteVersion: rqbiQuoteVersion, rqbi_effect_dt: rqbi_effect_dt, rqbi_exp_dt: rqbi_exp_dt },
	        success:function(response){
	        	if($(".rqbiExposure").val()!= '' && $(".cbClasscode").val()!= '' && $(".cbLocSelect").val()!= ''){
	        		$('.rqbiExposure').attr('data-uicheck_expo','');
						setTimeout(function(){
							$(".rqbiExposure").trigger("focusout");	
						}, 2000);
	        	} 
	        }
	    });

	}

}



function nl2br (str, is_xhtml) {   
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
}

$(document).on('click','.isonotes_btn',function(){
	var rowid = $(this).data('rowid');
	var class_code	= $('.cbClasscode_'+rowid).val();
	var class_desc = $('.clas_desc_'+rowid).text();
	var location_no = $('.cbLocSelect_'+rowid).val();

	$.ajax({
        type:"GET",
        url: laravel_url+"/get_iso_notes",
        data:{location_no: location_no, class_code: class_code, class_desc: class_desc, accid: accid, rqbi_id:rqbi_id},
        success:function(response){
        	obj = JSON.parse(response);
        	$('.bind_iso_notes').html('');
        	// $('.bind_iso_notes').html(obj.data);
        	$('.bind_iso_notes').html(nl2br(obj.data), '<br />');
        },
        complete :function(){
        	$('.isonotes_popup_btn').trigger('click');
    	}
    });

	
});

$(document).on('keyup', '.rqbiCreditDebit', function(e){
	this.value = this.value.replace(/[^0-9+-\.]/g,'');
});


$(document).on('click', '#covWarningCancel', function () {
	var covtype = $(this).attr('data-covtype');

	$('.glLiquor[data-covtype='+covtype+']').prop('checked',true);
});

/*Enable Rqbi tab click event*/
$(document).on('click', '.rqbiClickFuncOn', function () {
	$('#pills-rqbi-tab').removeAttr('style').css('pointer-events', 'initial');
	$('.new_notesbtn').show();
});

/*Remove red border after entering the value*/
$(document).on('keyup', '.get_loc_onblr, .locZipcode, .rqbiOccurDeductible, .rqbiSirAggregate, .liquorSirAggregate, .rqbiTpaAddress, .rqbiTpaAddress, .rqbiTpaMobileNo, .rqbiTpaEmailid, .cbClasscode, .rqbiExposure, .compositeExposure, .gradExpEditInput, .gradRateEditInput, .rqbiAdditionalSubj', function() {
	var getval = $(this).val();
	if( getval != '' || getval != undefined || getval != null || getval != 0) {
		$(this).removeAttr('style').removeClass('redBorder');
	}
});

$(document).on('change', '.locCity, .rqbiDeductType, .rqbiOccurSir, .rqbiTpaSelect, .cbLocSelect, .compositeLocation, .compositeExpBasis, .compositeMainCcode ', function() {
	var getval = $(this).val();
	if( getval != '' || getval != undefined || getval != null || getval != 0 ) {
		$(this).removeAttr('style').removeClass('redBorder');
	}
});


$(document).on('click','.override_required',function() {

	var override_req = 0;
	if ($(this).prop('checked') === true) {   
        override_req =  1;
    } else {
        override_req =  0;
    }
    var userid = localStorage.getItem('usernumericid');

    $('.aiFormsAccord').addClass('collapsed');
    $('.commonFormsAccord').addClass('collapsed');
    $('.rqbi_allforms_tabs').addClass('collapsed');

    $('#additionalInsuredAccord').removeClass('show');
    $('#selectFormsAccord').removeClass('show');
    $('#optionalCovAccord').removeClass('show');

    $.ajax({
        url: laravel_url+"/update_override_required",
        type:'post',
        data:{ accid:accid, rqbi_id:rqbi_id, userid:userid, override_req:override_req },
        success:function(response) {

	        // $('.aiFormsAccord').click();
         //    $('.commonFormsAccord').click();
         //    $('.rqbi_allforms_tabs').click();
        }
    });

});

function check_primary_asignee(acct_id){
	if(acct_id == 0){
		acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		var primary_assignee = $('#ac_tpass :selected').val();
	}else{
		var primary_assignee = 0;
	}
	var return_value = true;
	$.ajax({
        url: laravel_url+"/check_primary_asignee",
        type:'post',
		async: false,
        data:{acct_id:acct_id, user_id:primary_assignee},
        success:function(response) {
			if(response.user_status == 1){
				$('.inactive_assignee_alert').removeAttr('style').css('display','grid');
				$('#ac_tpass').addClass('redBorder');
				$('html,body').animate({
					scrollTop: $("#ac_tpass").offset().top - 100},'slow');
				return_value = false;
			}else{
				$('.inactive_assignee_alert').removeAttr('style').css('display','none');
				$('#ac_tpass').removeClass('redBorder');
				return_value = true;
			}
	       
        }
    });
	return return_value;
}

function get_account_status(accnt_id){
	// var accnt_id = accid;
	if (accnt_id != '') {
		$.ajax({
			url: laravel_url+"/get_quote_version_status",
			type:'post',
			async: false,
			data:{ accid:accnt_id, rqbi_id:rqbi_id},
			
			success:function(response) {
				return_status = response;
			},
			complete: function () {
			}
		});
		return return_status;
	} else {
		return 'new';
	}
	
}

function update_deductible(coverage_type){
	var deductible = 0;
	var deductible1 = 0;
	if(coverage_type == 'gl'){
		deductible = $('.rqbiOccurDeductible').val();
	}else if(coverage_type == 'liq'){
		deductible = $('.liquorDeductible').val();
	}else if(coverage_type == 'ocp'){
		deductible = $('.OcpDeductible').val();
	}else if(coverage_type == "gl_liq"){
		deductible = $('.rqbiOccurDeductible').val();
		deductible1 = $('.liquorDeductible').val();
	}

	if(coverage_type != "" && deductible != 0){
		// var accnt_id = localStorage.getItem("accid");
		// var accnt_id = accid;
    	var get_rqbi_id = $('#rqbiQuoteVersion').val();
		var current_user = localStorage.getItem('usernumericid');
		$.ajax({
	        url: laravel_url+"/update_deductible",
	        type:'post',
	        data:{ accnt_id:accid, get_rqbi_id:get_rqbi_id,com_id:com_id, current_user : current_user, coverage_type : coverage_type, deductible : deductible, deductible1 : deductible1},
	        
	        success:function(response) {
	        	//alert("response");
	        }
	    });
	}
}



function removeAccordionHighlights(){

	 $('#optionaCoverage_sec').removeAttr('style');
     $('#optionaCoverage_sec a').removeAttr('style');
	 $('.aiFormsAccord').removeAttr('style');
     $('.aiFormsAccord a').removeAttr('style');
     $('.commonFormsAccord').removeAttr('style');
     $('.commonFormsAccord a').removeAttr('style');
     $('.rqbi_allforms_tabs').removeAttr('style');
     $('.rqbi_allforms_tabs a').removeAttr('style');
     $('.frmsumm_card_header').removeAttr('style');
     $('.frmsumm_card_header a').removeAttr('style');     
     $('.manuscript_card_header').removeAttr('style');
     $('.manuscript_card_header a').removeAttr('style');
     $('.subjAccordHeader').removeAttr('style');
}

/*Start RHS Premium Summary sticky functionality*/
$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };

    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function() {
    if ($('#pills-tab').isOnScreen() == true) {
        $('.rqbi_rhspane_section').removeClass('rhsfixed');
        $('.quote_policy_details_btn').removeClass('rhsbtnfixed');
    } else {
        $('.rqbi_rhspane_section').addClass('rhsfixed');
        $('.quote_policy_details_btn').addClass('rhsbtnfixed');
    }
});
/*End RHS Premium Summary sticky functionality*/
		
				// xl start
$(document).on('click','.xl_quoteBtn', function(){
	$('.gl_goXl').removeClass('d-none');
	$(this).prop('disabled', true);
});

$(document).on('click','.xl_importGlBtn',function() {
	$('.xlImportClear_alert').remove();
	if ($(this).hasClass('xl_clearimport')) {
		$('.xl_importBtns').append('<div class="alert alert-warning xlClearGl_alert xlImportClear_alert shadow-lg text-center mr-2" role="alert"><div class="alert-header d-inline"> If you want to <b> clear imported data from GL? </b> </div><div class="d-inline ml-4"> <button type="button" class="btn btn-xs btn-success xlClearGl_yes mr-1"> Yes </button> <button type="button" class="btn btn-xs btn-danger xlImportClear_no"> No </button></div></div>');
	}
});

$(document).on('click','.xlImportClear_no',function() {
	$('.xlImportClear_alert').remove();
});

function xl_uctAppend(act) {
	if (act == 'show') {
		$.post("xl_premium_uct.php", function(postresult) {
			$("#xl_uctDiv").html('').append(postresult);
		});
	} else if (act == 'hide') {
		$("#xl_uctDiv").html('');
	}
}

function coverageLimitSec(thisValue) {
   if (xl_lob_change == true) {
        var data_retrieved = thisValue.attr('data_coverage_retrieved');
        var acc_id = accid;
        if(data_retrieved == 0){
          $(".xlQuoteTable").attr('data-retreivequota', 0);
            get_quotashare(com_id);
            brok_xl_retrieve(com_id); 
            $("#xlTypeLead").prop("checked", true);
            get_coverage_limits_xl(acc_id, com_id);
        }
        $('.gl_type_div').hide();
    }
}
		//// xl end

function rqbi_responsive () {
    if (window.matchMedia('(min-width: 1366px)').matches) {
		var cb_row_count = $('.locDiv').length;
        $('.locAddress1').parent('div').parent('div').parent('div').removeAttr('style').css('min-width', '200px');

        if(cb_row_count == 1) {
        	$('.locClone').css({'position': 'relative', 'right': '-1px'});
        	if($('.rqbi_rhspane_section').is(':visible')){
	        	$('.locClone').css({'position': 'relative', 'right': '0px'});
	        	$('.locClone').css('top', '0px');
	        }
        } else if(cb_row_count > 1) {
        	if($('.rqbi_rhspane_section').is(':visible')){
	        	$('.locClone').css({'position': 'relative', 'right': '-46px'});
	        	$('.locClone').css('top', '-36px');
	        } else {
	        	$('.locClone').css({'position': 'relative', 'right': '0px'});
	        	$('.locClone').css('top', '0px');
	        }
        }

        $('.close_right_section_btn').css({'margin-right': '3px', 'padding': '12px 6px 12px 6px'});

        $('.rqbiApplyModDiv label').css({'position': 'relative', 'left': '12px'});
        $('.ifany_radiobtn').removeClass('col-sm-5').addClass('col-sm-12').css({'position': 'relative', 'left': '-4px'});
        $('.included_radiobtn').removeClass('col-sm-6').addClass('col-sm-12').css({'position': 'relative', 'left': '2px'});
        $('.ifany_radiobtn label').removeClass('pull-left');
        $('.included_radiobtn label').removeClass('pull-left');
        $('.cb_premium label').removeClass('pl-2').addClass('pl-0').css({'position': 'relative', 'left': '2px'});

        $('.composite_class_code_div, .comp_devloped_rate, .comp_premium').removeClass('row');
        $('.composite_class_code_div').removeClass('col-md-5').addClass('col-md-4');
        $('.composite_class_code_div div').removeClass('col-md-6 pl-2').addClass('col-md-12').css('margin', '0px');

        $('.comp_devloped_rate, .comp_premium').addClass('col-md-4');
        $('.comp_premium').removeClass('pl-3 ml-1');
        $('.comp_premium').addClass('pl-0');
        $('.composite_class_code_div label').removeClass('col-md-6').addClass('col-md-12 text-left pl-0');        

        $('.comp_devloped_rate label, .comp_premium label').addClass('pull-left pl-2');
        $('.multipleClasscodeDiv .btn-group .multiselect.dropdown-toggle').css('margin', '0px');
        $('.multipleClasscodeDiv .btn-group').addClass('pr-0');
    }

    if(window.matchMedia('(min-width: 1536px)').matches) {

    	$('.locClone').css({'position': 'relative', 'right': '0px'});
    	$('.ifany_radiobtn').removeClass('col-sm-12').addClass('col-sm-5').css({'position': 'relative', 'left': '0px'});
        $('.included_radiobtn').removeClass('col-sm-12').addClass('col-sm-6').css({'position': 'relative', 'left': '0px'});
        $('.locClone').css({'position': 'relative', 'right': '0px'});
        $('.locClone').css('top', '0px');

        $('.ifany_radiobtn label').addClass('pull-left');
        $('.included_radiobtn label').addClass('pull-left');

        $('.composite_class_code_div, .comp_devloped_rate, .comp_premium').addClass('row');
        $('.composite_class_code_div').removeClass('col-md-4').addClass('col-md-5');
        $('.composite_class_code_div div').removeClass('col-md-12').addClass('col-md-6 pl-2').css('margin', '0 0 0 -25px');

        $('.comp_devloped_rate, .comp_premium').removeClass('col-md-4');
        $('.comp_premium').addClass('pl-3 ml-1');
        $('.comp_premium').removeClass('pl-0');
        $('.composite_class_code_div label').removeClass('col-md-12 text-left pl-0').addClass('col-md-6');        

        $('.comp_devloped_rate label, .comp_premium label').removeClass('pull-left pl-2');
        $('.multipleClasscodeDiv .btn-group .multiselect.dropdown-toggle').css('margin', '0 0 0 10px');
        $('.multipleClasscodeDiv .btn-group').removeClass('pr-0');
    }
}

$(document).on('click', '#notedte .input-group-addon', function () {
	$('.notes_date').focus();
});

$(document).on("click", ".varinfo_datepicker .input-group-addon", function() {
    $('.varinfo_datepicker').find('input').focus();
});