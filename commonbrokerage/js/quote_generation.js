var host = window.location.hostname;
var protocol = window.location.protocol;
var base_url = protocol+"//"+host;
var public_url = base_url+"/brokerage";

$(document).on('click','.quote_bg',function() {
	  
	  if(!($(this).hasClass('collapsed'))) {       
	   		get_quote_version_status_quote_level();
	   		quoteBindIssue('quote');
	   		// get_package_filename();
	  }

});



function get_quote_version_status(){

	$('.brokeragePolicyStatus').find('li').removeClass('completed');
	$('.brokeragePolicyStatus').find('li a').removeClass('quote-color');
	//var accnt_id = localStorage.getItem("accid");
	var accnt_id = accid;
	$.ajax({
        url: laravel_url+"/get_quote_version_status",
        type:'post',
        data:{ accid:accnt_id, rqbi_id:rqbi_id},
        
        success:function(response) {
        	console.log(response);
        quote_ver_status = response;

        enable_diable_excelrater_button(quote_ver_status);

       		if (response == 'new') {

				$('.brokeragePolicyStatus').find('li').removeClass('completed');
				$('.brokeragePolicyStatus').find('li a').removeClass('quote-color');
				$('.brokeragePolicyStatus').find('li a').removeClass('bind-color');
				$('.brokeragePolicyStatus').find('li a').removeClass('issue-color');
			}

			if (response == 'quote') {

				$('#ac_tstatus').val('quote');

				$('.rqbiGenBindBtn').removeClass('disabled');
				

				$('.brokeragePolicyStatus').find('.st_quote').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_quote a').addClass('quote-color');
				$('.brokeragePolicyStatus').find('li a').removeClass('bind-color');
				$('.brokeragePolicyStatus').find('li a').removeClass('issue-color');

				get_quote_version_status_quote_level();
			}

			if (response == 'bind') {

				$('#ac_tstatus').val('bind');

				$(".ac_lob").attr("disabled",true);
				$('.ac_lob').addClass('bg_white');
		      	$('#ac_tbroker').attr('disabled',true);
		      	$('#ac_tbroker').addClass('bg_white');

				$('.rqbiGenBindBtn').removeClass('disabled');
				$('.rqbiGenIssueBtn').removeClass('disabled');

				$('.brokeragePolicyStatus').find('.st_quote').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_quote a').addClass('quote-color');

				$('.brokeragePolicyStatus').find('.st_bind').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_bind a').addClass('bind-color');

				$('.brokeragePolicyStatus').find('li a').removeClass('issue-color');

				get_quote_version_status_quote_level();
			}

			if (response == 'issue') {

				$('#ac_tstatus').val('issue');

				$(".ac_lob").attr("disabled",true);
				$('.ac_lob').addClass('bg_white');
		      	$('#ac_tbroker').attr('disabled',true);
		      	$('#ac_tbroker').addClass('bg_white');

				$('.rqbiGenerateQuoteBtn').addClass('disabled');
				$('.rqbiGenBindBtn').addClass('disabled');
				$('.rqbiGenIssueBtn').removeClass('disabled');

				$('.brokeragePolicyStatus').find('.st_quote').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_quote a').addClass('quote-color');
				
				$('.brokeragePolicyStatus').find('.st_bind').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_bind a').addClass('bind-color');

				$('.brokeragePolicyStatus').find('.st_issue').addClass('completed');
				$('.brokeragePolicyStatus').find('.st_issue a').addClass('issue-color');

				get_quote_version_status_quote_level();
			}
        },
        complete: function () {
        }
    });
}


function enable_diable_excelrater_button(quote_ver_status_val){
	console.log('statts - ', quote_ver_status_val);
	if (quote_ver_status_val == 'bind' || quote_ver_status_val == 'issue') {
		$('.excelrater_fileupload').attr('disabled','disabled');
		$('.btn_canel_excelrater').attr('disabled','disabled');
		$('.btn_upload_excelrater').attr('disabled','disabled');
	}else{
		$('.excelrater_fileupload').removeAttr('disabled');
		$('.btn_canel_excelrater').removeAttr('disabled');
		$('.btn_upload_excelrater').removeAttr('disabled');
	}
	
}

function get_quote_version_status_quote_level(){

	//var accnt_id = localStorage.getItem("accid");
	var accnt_id = accid;
	var usernumericid = localStorage.getItem("usernumericid");
	$.ajax({
        url: laravel_url+"/get_quote_version_status_quote_level",
        type:'post',
        data:{ accid:accnt_id, rqbi_id:rqbi_id},
        success:function(response) {

        	var obj = JSON.parse(response);

        	if(obj.quote_version_status == 'new') {

        		if($('#cbContinueFullquote').hasClass('accordDisabled')) {
        				$('.rqbiGenerateQuoteBtn').removeClass('disabled');
        		} else {
        				$('.rqbiGenerateQuoteBtn').addClass('disabled');
        		}
        		$('.rqbiGenBindBtn').addClass('disabled');
        		$('.rqbiGenIssueBtn').addClass('disabled');
        	}


        	if(obj.quote_version_status == 'quote'){

        		if($('#cbContinueFullquote').hasClass('accordDisabled')) {

        			$('.rqbiGenerateQuoteBtn').addClass('disabled');
        			$('.rqbiGenIssueBtn').addClass('disabled');

	        		if (obj.disable_bind_status == 1) {

	        				 $('.rqbiGenBindBtn').addClass('disabled');
	        				
	        		} else {

	        				 $('.rqbiGenBindBtn').removeClass('disabled');
	        		}
        		} else {

	        			$('.rqbiGenerateQuoteBtn').addClass('disabled');
	        			$('.rqbiGenBindBtn').addClass('disabled');
	        			$('.rqbiGenIssueBtn').addClass('disabled');
        		} 	   
        	}


        	if(obj.quote_version_status == 'bind'){

        		$('.rqbiGenerateQuoteBtn').addClass('disabled');

        		if($('#cbContinueFullquote').hasClass('accordDisabled')) {

					      		if (obj.disable_bind_status == 1) {

					      				$('.rqbiGenBindBtn').addClass('disabled');
					      				$('.rqbiGenIssueBtn').addClass('disabled');
					      				
					      		} else {

										$('.rqbiGenBindBtn').removeClass('disabled');
					      				$('.rqbiGenIssueBtn').removeClass('disabled');
					      		}
					   } else {

	        			$('.rqbiGenBindBtn').addClass('disabled');
	        			$('.rqbiGenIssueBtn').addClass('disabled');
					   }

        	}

        	if(obj.quote_version_status == 'issue'){

		       	 	$('.rqbiGenerateQuoteBtn').addClass('disabled');
	        		$('.rqbiGenBindBtn').addClass('disabled');
	        		$('.rqbiGenIssueBtn').addClass('disabled');

		        	setTimeout( function(){
						$('#pills-rqbi-tab').removeClass('readonly_disabled');
					      
			            $('.ischeckedfunc').parent('div').parent('td').addClass('readonly_disabled');

			            $('.allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .rqbiQuoteVersion, #rqbieffdate, #rqbiexpdate, .rqbi_policy_type, #rqbi_tab_rightSide, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .rqbiLiquorSicCode_frmgrp, .deductTbleSection, .sirTblSection, .rqbiTpa, .cbClasscode, .cbLocSelect, .rqbiExposure, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .multipleClasscodeDiv, .bind_compostive_loction, .compositeExposure, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .cbContinueFullquote, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiInspectionFee, .rqbiCommission, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, #subjectivitiesAccord, .rqbiGenerateQuoteBtn, .rqbiGenBindBtn, .rqbiGenIssueBtn, .manuFrmsAddRow, .manuscriptFrmTable, .deductibleInsuredDiv, .op_forms_coverages, .all_add_btn, .allfrmsrepeatable_close, .manuFrmuploadInput, .allFrmsEdition').addClass('readonly_disabled');

			            tabKey_restrictions();
		    		},1500);
	        	 
        	}
     
        }
    });
}




function generate_quote(){

	var quote_valid = check_quote_validation();

	var forms_valid_condition = check_forms_validation();

	var forms_valid = forms_valid_condition[0];

	var continue_to_full_valid = ContinuetofulQuote_validation_Check();

	//var tpa_valid = tpa_validationCheck(); 

	var manu_check = manuscript_validation_check('quote');

	var subj_check = duedate_validation();

	var check_prim_assig = check_primary_asignee(0);

	var check_brokvalid = check_account_brok_valid();

	var conflit_rules_validation = conflit_rules_validation1();

	console.log('conflit_rules_validation - '+ conflit_rules_validation);
	
	if(quote_valid == true && forms_valid == true && continue_to_full_valid == true && manu_check == true && subj_check == true && check_prim_assig == true && check_brokvalid == 1 && conflit_rules_validation == true) {

    //document_generation('quote');

    $('.manuscript_card_header').removeAttr('style');

    var savedCondValid = checkDetailsSaved('quote',''); 

    if(savedCondValid == 1) {

		$('#quotecover').show();
    	$('.rqbiGenerateQuoteBtn').addClass('disabled');	
    	$('.rqbiGenerateQuoteSpinner').show();

		  updateQuoteVersionStatus('Quote');

	      // document_generation('quote');

    } else {

		$('html, body').animate({
	      	scrollTop: $('#ac_tname').offset().top-100
	    }, 1000);
	    new PNotify({ title: 'Error', text: "Please Update Account Details After Filled Mandatory Fields By Clicking Update Button", delay: 2000, type: 'error' });

    }
		
	} else {

		if(conflit_rules_validation == false){
			new PNotify({ title: 'Error', text: "Conflict Forms Error", delay: 2000, type: 'error' });
		}else{
			new PNotify({ title: 'Error', text: "Please fill mandatory fields", delay: 2000, type: 'error' });
		}

		
	}

}

function conflit_rules_validation1(){
	var conflict_return = true;
	$.ajax({
        url: laravel_url+"/conflit_rules_validation",
        type:'get',
        async: false,
        data:{ accid:accid, rqbi_id:rqbi_id},
        success:function(response) {
            console.log(response);
            if (response == 'conflict') {
                conflict_return =  false;
            }
        }
    });
    return conflict_return;   
}




function updateQuoteVersionStatus(quote_name='') {


		//var accnt_id = localStorage.getItem("accid");
		var accnt_id = accid;
		var userid = localStorage.getItem('userid');
		var tria =  $("input[name='rqbiTria']:checked").val();

		$.ajax({
	        url: laravel_url+"/update_quote_version_status",
	        type:'post',
	        data:{ accid:accnt_id, rqbi_id:rqbi_id, quote_name:quote_name, tria:tria, userid:userid},

	        success:function(response) {

	        	get_quote_version_status();


	        	if (quote_name == 'Quote') {

        			 update_bind_issue_status(2);
	        	}


	        	if (quote_name == 'Bind') {

	        		 $(".ac_lob").attr("disabled",true);
		        	 $('.ac_lob').addClass('bg_white');
		        	 $('#ac_tbroker').attr('disabled',true);
		        	 $('#ac_tbroker').addClass('bg_white');
        		}

	        	var obj = JSON.parse(response);

	        	$('#rqbiQuoteVersion').find('option[value='+obj.quote_id+']').text(obj.new_quote_name);

	        	if (obj.result_bind_status == 'yes') {

	        	if (tria == 0) { 

						$('#rqbiTriaPercAmount').val('');
						$('#rqbiTriaPercAmount').attr('readonly',true);
						$('#rqbiTriaAmount').val('');
						$('#rqbiTriaAmount').attr('readonly',true);

					} else { 
						
						$('#rqbiTriaPercAmount').val(5);
						$('#rqbiTriaPercAmount').removeAttr('readonly');
						$('#rqbiTriaAmount').removeAttr('readonly');
						getAdditionalAcctPremium();
					}

	        	}

	        }
    	});
}


function update_bind_issue_status(status='') {

	//var accountid = localStorage.getItem("accid");
	var accountid = accid;
    var new_uni_com_id = (new Date).getTime();
    var userid = localStorage.getItem('usernumericid');
    var old_rqbi_id = rqbi_id;
    $.ajax({
        type:"POST",
        url: laravel_url+"/update_bind_issue_status",
        data:{  
            accountid : accountid,rqbi_id : rqbi_id, com_id : com_id,new_uni_com_id : new_uni_com_id,status : status,userid : userid
        },
        success: function (response) {

        	var obj = JSON.parse(response);

        	onchng_quote_version (obj.new_rqbi_id);

        	$('#rqbiQuoteVersion [value= '+old_rqbi_id+']').val(obj.new_rqbi_id);

        	if (status == 2) {
        		// 2 - quote, 4 - issue
        		document_generation('quote');
        	}

        	
        }
    });          

}

function check_quote_validation() {

	var tria =  $("input[name='rqbiTria']:checked").val();
	var zipcode = $('#ac_mailAdd_zip').val();
	var ac_state = $('#ac_mailAdd_state').val();
	var ac_city = $('#ac_mailAdd_city').val();
	var address = $('#ac_mailAdd').val();

	var mandatory_cond = true;

	if(zipcode == '' || address == '' || ac_state == '' || ac_city == '' || ac_city == null) {
		$('html, body').animate({
	      scrollTop: $('#ac_tname').offset().top-140
	    }, 1000);

	    if(zipcode == '') {
	    	$('#ac_mailAdd_zip').addClass('errorBorder');
	    	mandatory_cond = false;
	    } else {
	    	$('#ac_mailAdd_zip').removeClass('errorBorder');
	    }

	    if(address == '') {
	    	$('#ac_mailAdd').addClass('errorBorder');
	    	mandatory_cond = false;
	    } else {
	    	$('#ac_mailAdd').removeClass('errorBorder');
	    }

	    if(ac_state == '') {
	    	$('#ac_mailAdd_state').addClass('errorBorder');
	    	mandatory_cond = false;
	    } else {
	    	$('#ac_mailAdd_state').removeClass('errorBorder');
	    }

	    if (ac_city == '' || ac_city == null) {
	    	$('#ac_mailAdd_city').addClass('errorBorder');
	    	mandatory_cond = false;
	    } else {
	    	$('#ac_mailAdd_city').removeClass('errorBorder');
	    }

	} else {
		$('#ac_mailAdd_zip').removeClass('errorBorder');
		$('#ac_mailAdd').removeClass('errorBorder');
		$('#ac_mailAdd_state').removeClass('errorBorder');
		$('#ac_mailAdd_city').removeClass('errorBorder');
	}

	$('#ac_mailAdd_zip, #ac_mailAdd').addClass('genQuoteValid');

	if(tria == 1 && mandatory_cond) {

		mandatory_cond = checkAdditionalAccountValid();
		
	} else if(tria == 0 && mandatory_cond) {
			$.ajax({
	            type:"POST",
	            async: false,
	            url: laravel_url+"/getBindStatus",
	            data:{ rqbi_id: rqbi_id },
	            success:function(response) {
	            	if(response == 'no') {
	            		mandatory_cond = checkAdditionalAccountValid();
	            	}
	            }
		    });

	}


	return mandatory_cond;
}



function check_forms_validation() {

	//var accnt_id = localStorage.getItem("accid");
	var accnt_id = accid;
	var mandatory_cond = true;

	var checked_form_cond = true;

	$.ajax({

	        url: laravel_url+"/check_forms_validation",
	        type:'post',
	        async: false,
	        data:{ accid:accnt_id, rqbi_id:rqbi_id},

	        success:function(response) {

	        	var obj = JSON.parse(response);
	        	if(obj.data.length > 0){

	        		mandatory_cond = false;

		        	for(let i in obj.data) {

		        		  var form_type = obj.data[i].form_type;

		        		  if(form_type == 1) {

		        		  		$('.aiFormsAccord').css('border', '1px solid #ed4613');
		        		  		$('.aiFormsAccord a').css('color', '#ed4613');

		        		  } 

		        		  if(form_type == 2) {

		        		  		$('.commonFormsAccord').css('border', '1px solid #ed4613');
		        		  		$('.commonFormsAccord a').css('color', '#ed4613');

		        		  } 

		        		  if(form_type == 3) {

		        		  		$('.rqbi_allforms_tabs').css('border', '1px solid #ed4613');
		        		  		$('.rqbi_allforms_tabs a').css('color', '#ed4613');
		        		  } 

		        		  if(form_type == 4 || form_type == 5 || form_type == 6) {

		        		  		$('#optionaCoverage_sec').css('border', '1px solid #ed4613');
		        		  		$('#optionaCoverage_sec a').css('color', '#ed4613');
		        		  } 
		        	}
	        	} else {

	        			$('.aiFormsAccord').removeAttr('style');
		        		$('.aiFormsAccord a').removeAttr('style');
		        		$('.commonFormsAccord').removeAttr('style');
		        		$('.commonFormsAccord a').removeAttr('style');
		        		$('.rqbi_allforms_tabs').removeAttr('style');
		        		$('.rqbi_allforms_tabs a').removeAttr('style');
		        		$('#optionaCoverage_sec').removeAttr('style');
		        		$('#optionaCoverage_sec a').removeAttr('style');
	        	}


	        	// if (obj.checked_form_data.length > 0) {

	        	// 	checked_form_cond = false;

	        	// 	$('.rqbi_allforms_tabs').css('border', '1px solid #ed4613');

		        // 	$('.rqbi_allforms_tabs a').css('color', '#ed4613');

		        // 	$('#optionalCovAccord').removeClass('show');
				// 	$('.rqbi_allforms_tabs').addClass('collapsed');
				// 	$('.rqbi_allforms_tabs').click();
	        	// }
	        }
    });


    return [mandatory_cond,checked_form_cond];

}



function document_generation(value){
    localStorage.setItem('forms_focus_status', 'no');
	
	$('body').addClass('readonly_disabled');
	
	var value = value;
	var uuid=uuidv3();

	if (value.toLowerCase() == 'quote') {
		var qdoc_master = 'qdoc_master';
	}

	if (value.toLowerCase() == 'bind') {
		var qdoc_master = 'qdoc_bind_master';
	}

	if (value.toLowerCase() == 'issue') {
		var qdoc_master = 'qdoc_issue_master';
	}

	//var acctid = localStorage.getItem("accid");
	var acctid = accid;
	var usernumericid = localStorage.getItem("usernumericid");

    getdiv_lieheight();

    var nooflines='';
    setTimeout ( function () {
	    nooflines = $('#named_insured').attr('data-nooflinecount');
	    divheight = $('#named_insured').attr('data-divheight');
	    console.log('console 2: ', nooflines);
	
		if(host=='localhost'){
			quote_doc_url = base_url + '/docgen/var/www/docgen/'+qdoc_master+'.php?rqbi_id='+rqbi_id+'&uuid='+uuid+'&host='+host+'&policy_status='+value+'&acctid='+acctid+'&nooflines='+nooflines+'&divheight='+divheight;
		}else{
			quote_doc_url = doc_api_url + '/docgen/'+qdoc_master+'.php?rqbi_id='+rqbi_id+'&uuid='+uuid+'&host='+host+'&policy_status='+value+'&acctid='+acctid+'&nooflines='+nooflines+'&divheight='+divheight; 
		}

		$.ajax({
			url: quote_doc_url,
			method: 'get',
			success: function(data) {

					quoteBindIssue(value);
					
					if (value.toLowerCase() == 'quote') {

					
						$('.rqbiGenerateQuoteBtn').addClass('disabled');
						$('.rqbiGenBindBtn').removeClass('disabled');
						$('.rqbiGenerateQuoteSpinner').hide();
					}

					if (value.toLowerCase() == 'bind') {

						$('#frmsummAccord').removeClass('show');
						$('.frmsumm_card_header').addClass('collapsed');

						$('.rqbiGenBindBtn').removeClass('disabled');
						$('.rqbiGenBindSpinner').hide();
						$('.rqbiBindList').show();
						setTimeout(function() {
							$('.frmsumm_card_header').click();	
							$('#quotecover').hide();
						},2000);
						get_tbd_tab_name(accid);

						updateQuoteVersionStatus('Bind');

					}

					if (value.toLowerCase() == 'issue') {
						
						$('.rqbiGenIssueBtn').removeClass('disabled');
						$('.rqbiGenIssueSpinner').hide();
						$('.rqbiIssueList').show();
						get_tbd_tab_name(accid);

						update_bind_issue_status(4);
						get_quote_version_status();

					}
					

				ratingsheet_moveto_category(value);
			}, 
			complete : function() {
				$('body').removeClass('readonly_disabled');
			}
		});
	}, 3000);
}


function ratingsheet_moveto_category(value){
	//var accid = localStorage.getItem("accid");
	// var accid = accid;
	var userid = localStorage.getItem('usernumericid');
	var username = localStorage.getItem('username');
	var value = value;

	$.ajax({
		url: "../brokerage_dragdrop_v2/forms_upload.php",
		method: 'get',
		data:{ accid:accid, userid:userid, username:username, rqbi_id:rqbi_id, value:value},
		success: function(response) {
			console.log(response)


			if (value.toLowerCase() == 'bind') {

				risk_evaluation();
			}
			quote_bind_issue_accordian_open(value);
		}
	});
}

function quote_bind_issue_accordian_open(value) {

	if (value.toLowerCase() == 'quote' || value.toLowerCase() == 'issue') {

		setTimeout(function() {

			$('#coverageLimitAccord').removeClass('show');
			$('.covLimitAccordHead').addClass('collapsed');
			$('.covLimitAccordHead').click();

			$('#cbAccord').removeClass('show');
			$('.cbAccordHeader').addClass('collapsed');
			//setTimeout(function() {
				$('.cbAccordHeader').click();
			//},2000);

			$('#additionalAccAccord').removeClass('show');
			$('.rqbiAdditionalAccountDetails').addClass('collapsed');
			$('.rqbiAdditionalAccountDetails').click();

			var coverage_type_array = [];
		    $("input[name='CoverageType']:checked").each( function () {
		    	var value = $(this).val();
				coverage_type_array.push(value);
			});
		    var coverage_type = coverage_type_array.toString();
		    

		    if (coverage_type != 3) {

				$('#ocAccord').removeClass('show');
				$('#optionaCoverage_sec').addClass('collapsed');
				$('#optionaCoverage_sec').click();

			}

			$('#additionalInsuredAccord').removeClass('show');
			$('.aiFormsAccord').addClass('collapsed');
			$('.aiFormsAccord').click();

			$('#selectFormsAccord').removeClass('show');
			$('.commonFormsAccord').addClass('collapsed');
			$('.commonFormsAccord').click();


	    	$('#optionalCovAccord').removeClass('show');
			$('.rqbi_allforms_tabs').addClass('collapsed');
			$('.rqbi_allforms_tabs').click();


			$('#frmsummAccord').removeClass('show');
			$('.frmsumm_card_header').addClass('collapsed');
			$('.frmsumm_card_header').click();		

			$('#manuscriptAccord').removeClass('show');
			$('.manuscript_card_header').addClass('collapsed');
			$('.manuscript_card_header').click();

			$('#subjectivitiesAccord').removeClass('show');
			$('.subjAccordHeader').addClass('collapsed');
			$('.subjAccordHeader').click();

			if (value.toLowerCase() == 'quote' || value.toLowerCase() == 'bind' || value.toLowerCase() == 'issue') {
				$('#quoteAccord').removeClass('show');
				$('.quote_bg').addClass('collapsed');
				$('.quote_bg').attr('aria-expanded',false);
				setTimeout(function() {
					$('.quote_bg').click();
				},2000);
				
			}

			if (value.toLowerCase() == 'bind'  || value.toLowerCase() == 'issue') {			
				$('#bindAccord').removeClass('show');
				$('.bind_card_header').addClass('collapsed');
				$('.bind_card_header').attr('aria-expanded',false);
				setTimeout(function() {
					$('.bind_card_header').click();
				},2000);
				
			}

			if (value.toLowerCase() == 'issue') {
				$('#issueAccord').removeClass('show');
				$('.issue_card_header').addClass('collapsed');
				$('.issue_card_header').attr('aria-expanded',false);
				setTimeout(function() {
					$('.issue_card_header').click();
				},2000);
				
			}

		},3500);

		setTimeout(function(){

			$('html, body').animate({
				//scrollTop: $('.bind_card_header').offset().top-120
				scrollTop: $('.quote_bg').offset().top-120
			}, 800);
		},15000);	

		setTimeout(function(){
			$('#frmsummAccord').removeClass('show');
			$('.frmsumm_card_header').addClass('collapsed');
			$('.frmsumm_card_header').click();
			$('#quotecover').hide();
		},11500);	

	}
}

function risk_evaluation(){
	//var accid = localStorage.getItem("accid");
	// var accid = accid;
	var userid = localStorage.getItem('usernumericid');
	var username = localStorage.getItem('username');
	var uuid=uuidv3();

	$.ajax({
		url: "../brokerage_dragdrop_v2/risk_evaluation.php",
		method: 'get',
		data:{ accid:accid, userid:userid, username:username, rqbi_id:rqbi_id, uuid:uuid, host:host},
		success: function(response) {
			console.log(response)
			quoteBindIssue('bind');
		}
	});
}

function uuidv3() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
		

function quoteBindIssue(value=''){

	//var accid = localStorage.getItem("accid");
	// var accid = accid;
	var category = value.toLowerCase();
	$.ajax({
		url: laravel_url+"/get_docgen_pdf_url",
	    type:'get',
	    data:{ accid:accid, rqbi_id:rqbi_id, category:category},
		success: function(response) {

			if(category == 'quote'){
				$('.bind_quote_docurl').html('');
				$('.bind_quote_docurl').html(response);
			}

			if(category == 'bind'){
				// $('.rqbiBindList').show();
				$('.bind_binder_docurl').html('');
				$('.bind_binder_docurl').html(response);
			}

			if(category == 'issue'){
				// $('.rqbiIssueList').show();
				$('.bind_issue_docurl').html('');
				$('.bind_issue_docurl').html(response);
			}
		}
	});
}


function checkDetailsSaved(gen_value='',insured_type=''){
		var ac_mailAdd_zip = $('#ac_mailAdd_zip').val();
		var ac_mailAdd_city = $('#ac_mailAdd_city').val();
		var savedCond = 0;

		$.ajax({
	        url: laravel_url+"/checkDetailsSaved",
	        type:'post',
	        async: false,
	        data:{accid:accid,gen_value:gen_value,insured_type:insured_type},

	        success:function(response) {

	        	var obj = JSON.parse(response);

	        	if (obj.savedCond == 'yes') {
					savedCond = 1;
	        	} else {
					savedCond = 0;
	        	}

	        	if (obj.acc_zip != ac_mailAdd_zip || obj.acc_city != ac_mailAdd_city) {
	        		savedCond = 0;
	        	}

	        }
	    });

	    return savedCond;
}


$(".genrtQuotCls").each(function() {

	var checkd_val = $(this).prop('checked');
	console.log("checkd_val :",checkd_val);

});


function download_generate_quote() {

	var select_att_file = [];

	if($('.QuotDocCkbox').prop('checked')) {
		var quote_href1 = $('.quote_href1').attr('href');
		var quote_href1_name = $('.quote_href1').text();
		
		select_att_file1 = {};
		select_att_file1['file_dl_path'] = quote_href1;
		select_att_file1['fileName'] = quote_href1_name;
		select_att_file.push(select_att_file1);
	}

	if($('.ratgCkbox').prop('checked')) {
		var quote_href2 = $('.quote_href2').attr('href');
		var quote_href2_name = $('.quote_href2').text();
		
		select_att_file2 = {};
		select_att_file2['file_dl_path'] = quote_href2;
		select_att_file2['fileName'] = quote_href2_name;
		select_att_file.push(select_att_file2);
	}

	if (select_att_file.length > 0) {
		select_att_id_string = JSON.stringify(select_att_file);
		token = $('meta[name="csrf-token"]').attr('content');
		cdate = new Date();
		yy = cdate.getFullYear().toString().substr(2, 2);
		mm = cdate.getMonth() + 1;
		if (mm < 10) {
			mm = '0' + mm;
		}
		dd = cdate.getDate();
		tm = cdate.getTime();
		rand = Math.floor(Math.random() * 1000000000);
		down_fname = 'BrokWBQuoteDownload'+mm+'-'+dd+'-'+yy+'.zip';
		downloadZip_formatFiles(select_att_id_string, down_fname);
	} else {
		new PNotify({ title: 'Warning', text: 'No Files Found', delay: 1800, type: 'error' });
	}

}


function downloadZip_formatFiles(select_att_id_string, down_fname) {

	$.ajax({
		type:'post',
		data :{ 
			select_att_id_string : select_att_id_string,
			down_fname			 : down_fname
		},
		url:laravel_url+'/doczipdwn',
		headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
		success:function(res) {
			if (res.status != 'error') {
				fetch(base_url+"/brokerage.be/temp/"+down_fname, { method: 'HEAD' })
				.then(res => {
					if (res.ok) {
						console.log('Zip file exists.');
						var link = document.createElement('a');
						link.download = down_fname;
						link.href = base_url+"/brokerage.be/temp/"+down_fname;
						link.click();
						delzipfile(down_fname);
					} else {
						console.log('Zip file does not exist.');
					}
				}).catch(err => console.log('Error:', err));
			} else {
				delzipfile(down_fname);
			}
		}
	});
}

function delzipfile(down_fname) {
	$.ajax({
		type:'post',
		data:{down_fname:down_fname},
		url:laravel_url+'/doczipdwndelete',
		headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
		success:function(res) {
		}
	});
}


$(document).on('focusout', '#rqbiQuoteEmailInput', function () {
	$('.rqbiQuoteSendEmailBtn').attr('disabled',true);
    var value = $(this).val();
    var aryVal = value.split(',');
    
    for (var i in aryVal) {
	    var email_valid = isEmail($.trim(aryVal[i]));
	    if ($.trim(aryVal[i]) != "") { 
		    if (email_valid && aryVal[i] != "") {
				$('.rqbiQuoteSendEmailBtn').removeAttr('disabled');
				$('#rqbiQuoteEmailInput').removeAttr('style');
				$('#qutEmilLbl').removeAttr('style');
				$('.quote_vlidEml').hide();
			} else {
				$('.rqbiPolicySendEmailBtn').attr('disabled',true);
				$('.rqbiQuoteSendEmailBtn').attr('disabled',true);
				$('#rqbiQuoteEmailInput').attr('style','border-color:#ed4613;');
				$('#qutEmilLbl').attr('style','color:#ed4613;');
				$('.quote_vlidEml').show();
			}
		} else {
			$('.rqbiQuoteSendEmailBtn').removeAttr('disabled');
			$('#rqbiQuoteEmailInput').removeAttr('style');
			$('#qutEmilLbl').removeAttr('style');
			$('.quote_vlidEml').hide();
		}
	}
	
});

$(document).on('click', '.rqbiQuoteSendEmailBtn', function () {
	var validEmailchk = false;
    var value = $('#rqbiQuoteEmailInput').val();
    $('.rqbiQuoteSendEmailBtn').attr('disabled',true);
    var aryVal = value.split(',');
    var email_array = [];

    for (var i in aryVal) {
	    var email_valid = isEmail($.trim(aryVal[i]));
	    
	    if ($.trim(aryVal[i]) != "") { 
	    	email_array.push($.trim(aryVal[i]));
		    if (email_valid) {
		    	validEmailchk = true;
		    } else {
		    	validEmailchk = false;
		    }
		}
	}
     
	if (validEmailchk) {
		$('#rqbiQuoteEmailInput').removeAttr('style');
		$('#qutEmilLbl').removeAttr('style');

		var link1 = "";
		var link1_name = "";
		if($('#rqbiQuoteListCkbx_1').prop('checked')) {
			link1 = $('.quote_href1').attr('href');
			link1_name = $('.quote_href1').text();
		}

		var link2 = "";
		var link2_name = "";
		if($('#rqbiQuoteListCkbx_4').prop('checked')) {
			link2 = $('.quote_href2').attr('href');
			link2_name = $('.quote_href2').text();
		}

		var sub_no = $('#sub_text strong').text();
		var subj_email = "Quote Document - "+sub_no;
		sendQuoteBindIssue_email(email_array, link1, link1_name, link2, link2_name, subj_email, 'Quote');
	} else {
		$('#rqbiQuoteEmailInput').attr('style','border-color:#ed4613;');
		$('#qutEmilLbl').attr('style','color:#ed4613;');
	}
});


function sendQuoteBindIssue_email(email_value, link1, link1_name, link2, link2_name, subj_email, type) {
	var linkaray = [];
	var linkAryNm = [];
	//var fromemail = "broker@gmail.com";
	var fromemail = "brokerage_gl_dev@outlook.com";
	var emailsubject = subj_email;
	var description = "Hi";
	console.log("link1 :",link1);
	if (link1 != "") {
		linkaray.push(link1);
		linkAryNm.push(link1_name);
	} 

	if (link2 != "") {
		linkaray.push(link2);
		linkAryNm.push(link2_name);
	}

	var pdf_links = "empty_link";
	var pdf_links_name = "empty_name";
	if (linkaray.length > 0) {
		pdf_links = JSON.stringify(linkaray);
		pdf_links_name = JSON.stringify(linkAryNm);
	}
	
	
	$.ajax({
      	url: laravel_url+"/quoteBindIssue_sendEmail",
      	type:'post',
      	data: { 
      		fromemail		: fromemail,
      		reply_to		: email_value,
      		emailsubject	: emailsubject,
      		description		: description,
      		pdf_links		: pdf_links,
      		pdf_links_name 	: pdf_links_name
      	},
      	headers: {
          	'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      	},
      	success:function(response){
          	var obj = jQuery.parseJSON(response);
          	if (obj.status == 'ok') {
            	new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
          	} else {
            	new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            	
          	}
      	},
      	complete: function() {
      		if (type == "Quote") {
      			$('.rqbiQuoteSendEmailBtn').removeAttr('disabled');
      			$('#rqbiQuoteEmailInput').val('');
      		} else if (type == "Bind") {
      			$('.rqbiBindSendEmailBtn').removeAttr('disabled');
      			$('#rqbiBindEmailInput').val('');
      		} else {
      			$('.rqbiPolicySendEmailBtn').removeAttr('disabled');
      			$('#rqbiPolicyEmailInput').val('');
      		}
      	}
    });
} 


function getdiv_lieheight() {
	var accnt_id = accid;
	if(host=='localhost'){
		var getcount_url = base_url + '/docgen/var/www/docgen/gl_info.php';
	} else {
		var getcount_url = doc_api_url + '/docgen/gl_info.php';
	}
	
	$.ajax({
      	url: getcount_url,
      	type:'post',
      	datatype: JSON,
      	cache: false,
      	data: { type: 'ui', accid:accnt_id, rqbi_id:rqbi_id, host: host},
      	
      	success:function(response){
          	var jsonarray = jQuery.parseJSON(response)
          	console.log(jsonarray);
          	$.each(jsonarray, function(key,value) {
            	$('#named_insured').html('').append('<p class="wrapword" style="margin: 0;">'+value.accountname+'</p><p class="wrapword" style="margin: 0;">'+value.acc_address+', '+value.acc_city+', '+value.acc_state+', '+value.acc_zip+'</p>');

            	$('#agency_addr').html('').append('<p class="wrapword" style="margin: 0;">'+value.agency_name+'</p><p class="wrapword" style="margin: 0;">'+value.agency_address+', '+value.agency_city+', '+value.agency_state+', '+value.agency_zipcode+'</p>');
            });

          	var named_insured_id = $('.named_insured').attr('id');
          	var agency_addr_id = $('.agency_addr').attr('id');

          	var nooflines = countLines(named_insured_id, agency_addr_id);
          	$('#named_insured').attr('data-nooflinecount', nooflines.linecount);
          	$('#agency_addr').attr('data-nooflinecount', nooflines.linecount);          	

          	$('#named_insured').attr('data-divheight', nooflines.divheight);
          	$('#agency_addr').attr('data-divheight', nooflines.divheight);
          	console.log('console 1: ', countLines(named_insured_id, agency_addr_id));
      	},
      	complete: function() {
      		
      	}
    });
} 

function countLines(named_insured_id, agency_addr_id) {
	/*Find line count for named insured*/
	var policy_linecount = [];
	var divHeight_1 = $('#named_insured').height();
	var lineHeight_1 = parseInt($('#named_insured').css('line-height'))

	var lines_1 = divHeight_1 / lineHeight_1;	


	/*Find line count for Agency and mailing address*/
	var divHeight_2 = $('#agency_addr').height();
	var lineHeight_2 = parseInt($('#agency_addr').css('line-height'));

	var lines_2 = divHeight_2 / lineHeight_2;

	if (lines_1 >= lines_2) {
		var line_count = lines_1;
	} else {
		var line_count = lines_2;
	}	

	if (divHeight_1 >= divHeight_2) {
		var divheight = divHeight_1;
	} else {
		var divheight = divHeight_2;
	}

	return {
        'linecount': line_count, 
        'divheight': divheight
    };

}