$(document).on('click','.issue_card_header',function() {

	if(!($(this).hasClass('collapsed'))) {      
     	get_quote_version_status_quote_level();
     	quoteBindIssue('issue');
 	}
});

function generate_issue(){

	var quote_valid = check_quote_validation();

	var forms_valid_condition = check_forms_validation();

	var forms_valid = forms_valid_condition[0];

	//var checked_form_valid = forms_valid_condition[1];

	var continue_to_full_valid = ContinuetofulQuote_validation_Check();

	var tpa_valid = tpa_validationCheck();

	var manu_check = manuscript_validation_check('issue');

	var subj_check = duedate_validation();

	var check_prim_assig = check_primary_asignee(0);

	if(quote_valid == true && forms_valid == true && continue_to_full_valid == true && tpa_valid == true && manu_check == true && subj_check == true && check_prim_assig == true) {
		
		$('.manuscript_card_header').removeAttr('style');

		var insured_type = $('#insuredType').val();
		var businessDescription = $('#businessDescription').val();
		var business_segment = $('#business_segment').val();
		var njTransaction = $('#njTransaction').val();
		var ac_mailAdd_state = $('#ac_mailAdd_state').val();

		var mandatory_issue_cond = true;

		if(insured_type == '') {
			$('html, body').animate({
		      scrollTop: $('#ac_tname').offset().top-100
		    }, 1000);
			$('#insuredType').addClass('errorBorder');
			mandatory_issue_cond = false;
		} 
		if(insured_type == 'Other') {

			var insured_type_other = $('#insuredType_Other').val();
			if(insured_type_other == ''){
				$('html, body').animate({
			      scrollTop: $('#insuredType_Other').offset().top-100
			    }, 1000);
				$('#insuredType_Other').addClass('errorBorder');
				mandatory_issue_cond = false;	
			}
			
		} 
		if(businessDescription.trim() == '') {
	 		$('html, body').animate({
		      scrollTop: $('#ac_tname').offset().top-100
		    }, 1000);
			$('#businessDescription').addClass('errorBorder');
			mandatory_issue_cond = false;
		}
		if(business_segment == '') {
			$('html, body').animate({
		      scrollTop: $('#ac_tname').offset().top-100
		    }, 1000);
			$('#business_segment').addClass('errorBorder');
			mandatory_issue_cond = false;	
		}
		if(njTransaction.trim() == '' && ac_mailAdd_state == 'New Jersey') {
			$('html, body').animate({
		      scrollTop: $('#ac_tname').offset().top-100
		    }, 1000);
			$('#njTransaction').addClass('errorBorder');
			mandatory_issue_cond = false;
		}

		if(mandatory_issue_cond == true) {

			var insured_type = $('#insuredType').val();

			var savedCondValid = checkDetailsSaved('issue',insured_type);

			if(savedCondValid == 1) {

					$('#quotecover').show();
				    $('.rqbiGenIssueBtn').addClass('disabled');
					$('.rqbiGenIssueSpinner').show();
					document_generation('issue');					

			} else {

	        		$('html, body').animate({
				      scrollTop: $('#ac_tname').offset().top-100
				    }, 1000);
	        		new PNotify({ title: 'Error', text: "Please Update Account Details After Filled Mandatory Fields By Clicking Update Button", delay: 2000, type: 'error' });

			}
		}
			
	}  else {

			new PNotify({ title: 'Error', text: "Please fill mandatory fields", delay: 2000, type: 'error' });
	}
}


function download_generate_issue() {

	var select_att_file = [];

	if($('#rqbiIssueListCkbx_1').prop('checked')) {
		var link1 = $('.issue_href1').attr('href');
		var link1_name = $('.issue_href1').text();
		
		select_att_file1 = {};
		select_att_file1['file_dl_path'] = link1;
		select_att_file1['fileName'] = link1_name;
		select_att_file.push(select_att_file1);
	}

	if($('#rqbiIssueListCkbx_4').prop('checked')) {
		var link2 = $('.issue_href2').attr('href');
		var link2_name = $('.issue_href2').text();
		
		select_att_file2 = {};
		select_att_file2['file_dl_path'] = link2;
		select_att_file2['fileName'] = link2_name;
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
		down_fname = 'BrokWBIssueDownload'+mm+'-'+dd+'-'+yy+'.zip';
		downloadZip_formatFiles(select_att_id_string, down_fname);
	} else {
		new PNotify({ title: 'Warning', text: 'No Files Found', delay: 1800, type: 'error' });
	}
}

$(document).on('keyup', '#rqbiPolicyEmailInput', function () {
    var value = $(this).val();
    var email_valid = isEmail(value); 
	if(email_valid) {
		$('#rqbiPolicyEmailInput').removeAttr('style');
		$('#isuEmilLbl').removeAttr('style');
	} 
});

$(document).on('focusout', '#rqbiPolicyEmailInput', function () {
	$('.rqbiPolicySendEmailBtn').attr('disabled',true);
    var value = $('#rqbiPolicyEmailInput').val();
    var aryVal = value.split(',');
    for (var i in aryVal) {
    	var email_valid = isEmail($.trim(aryVal[i]));
    	console.log('aryVal[i] :',aryVal[i]);
    	if ($.trim(aryVal[i]) != "") { 
			if(email_valid) {
				$('.rqbiPolicySendEmailBtn').removeAttr('disabled');
				$('#rqbiPolicyEmailInput').removeAttr('style');
				$('#isuEmilLbl').removeAttr('style');
				$('.issue_vlidEml').hide();
			} else {
				$('#rqbiPolicyEmailInput').attr('style','border-color:#ed4613;');
				$('#isuEmilLbl').attr('style','color:#ed4613;');
				$('.rqbiPolicySendEmailBtn').attr('disabled',true);
				$('#rqbiPolicyEmailInput').attr('style','border-color:#ed4613;');
				$('#isuEmilLbl').attr('style','color:#ed4613;');
				$('.issue_vlidEml').show();
			}
		} else {
			$('.rqbiPolicySendEmailBtn').removeAttr('disabled');
			$('#rqbiPolicyEmailInput').removeAttr('style');
			$('#isuEmilLbl').removeAttr('style');
			$('.issue_vlidEml').hide();
		}
	}
	
});


$(document).on('click', '.rqbiPolicySendEmailBtn', function () {
	var validEmailchk = false;
    var value = $('#rqbiPolicyEmailInput').val();
    $(this).attr('disabled',true);
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

	if(validEmailchk) {
		$('#rqbiPolicyEmailInput').removeAttr('style');
		$('#isuEmilLbl').removeAttr('style');

		var link1 = "";
		var link1_name = "";
		if($('#rqbiIssueListCkbx_1').prop('checked')) {
			link1 = $('.issue_href1').attr('href');
			link1_name = $('.issue_href1').text();
		}

		var link2 = "";
		var link2_name = "";
		if($('#rqbiIssueListCkbx_4').prop('checked')) {
			link2 = $('.issue_href2').attr('href');
			link2_name = $('.issue_href2').text();
		}
		var polcy_no = $('#policy_no').text();
		var subj_email = "Policy Document - "+polcy_no;
		sendQuoteBindIssue_email(email_array, link1, link1_name, link2, link2_name, subj_email, 'Issue');
	} else {
		$('#rqbiPolicyEmailInput').attr('style','border-color:#ed4613;');
		$('#isuEmilLbl').attr('style','color:#ed4613;');
	}
});