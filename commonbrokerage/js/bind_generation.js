
$(document).on('click','.bind_card_header',function() {
	
	if(!($(this).hasClass('collapsed'))) {         
     	get_quote_version_status_quote_level();
     	quoteBindIssue('bind');
 	}
});

function generate_bind() {

	var tria =  $("input[name='rqbiTria']:checked").val();
	//var accnt_id = localStorage.getItem("accid");
	var accnt_id = accid;
	var userid = localStorage.getItem('userid');

	var quote_valid = check_quote_validation();

	var forms_valid_condition = check_forms_validation();

	var forms_valid = forms_valid_condition[0];

	var checked_form_valid = forms_valid_condition[1];

	var continue_to_full_valid = ContinuetofulQuote_validation_Check();

	//var tpa_valid = tpa_validationCheck();

	var manu_check = manuscript_validation_check('bind');

	var subj_check = duedate_validation();

	var check_prim_assig = check_primary_asignee(0);

	var check_brokvalid = check_account_brok_valid();

	if(quote_valid == true && forms_valid == true && continue_to_full_valid == true && manu_check == true && subj_check == true && check_prim_assig == true && check_brokvalid == 1) {

		if (checked_form_valid == 1) {
			$('input:checkbox[data-formid="ASIC-NOT-0004"]').prop('checked',false)
			$('.ischeckedform').text('');
		}
		
		$('#quotecover').show();
		$('.manuscript_card_header').removeAttr('style');

		$('.rqbiGenBindBtn').addClass('disabled');
		$('.rqbiGenBindSpinner').show();

		document_generation('bind');

		if (quote_ver_status == 'quote') {

			get_ind_policy_number(accnt_id);
		}

		$('.rqbiGenIssueBtn').removeClass('disabled');
		
	} else {

			new PNotify({ title: 'Error', text: "Please fill mandatory fields", delay: 2000, type: 'error' });
	}
}


function get_ind_policy_number (generate_accid) {

    var new_uni_com_id = (new Date).getTime();
    var userid = localStorage.getItem('usernumericid');

    if (generate_accid != '' && generate_accid != null) {

	    $.ajax({
	        type:"POST",
	        url: laravel_url+"/get_policy_number",
	        data:{  
	            accountid : generate_accid
	        },
	        success: function (response) {

	            var obj = jQuery.parseJSON( response );
	            if(obj.policy_number != ''){
	            	$('#sub_text').html('Policy # : <strong>'+obj.policy_number+'</strong>');
	            	$('#policy_no').text(obj.policy_number);	
	            }
	        
	        }
	    }); 

	}else{
		new PNotify({ title: 'Error', text: "Policy Number is Not Generated", delay: 2000, type: 'error' });
	}          
}


function download_generate_bind() {

	var select_att_file = [];

	if($('#rqbiBindListCkbx_4').prop('checked')) {
		var link1 = $('.bind_href2').attr('href');
		var link1_name = $('.bind_href2').text();
		
		select_att_file1 = {};
		select_att_file1['file_dl_path'] = link1;
		select_att_file1['fileName'] = link1_name;
		select_att_file.push(select_att_file1);
	}

	if($('#rqbiBindListCkbx_1').prop('checked')) {
		var link2 = $('.bind_href1').attr('href');
		var link2_name = $('.bind_href1').text();
		
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
		down_fname = 'BrokWBbindDownload'+mm+'-'+dd+'-'+yy+'.zip';
		downloadZip_formatFiles(select_att_id_string, down_fname);
	} else {
		new PNotify({ title: 'Warning', text: 'No Files Found', delay: 1800, type: 'error' });
	}

}


$(document).on('focusout', '#rqbiBindEmailInput', function () {
	$('.rqbiBindSendEmailBtn').attr('disabled',true);
    var value = $(this).val();
    var aryVal = value.split(',');
    
    for (var i in aryVal) {
    	var email_valid = isEmail($.trim(aryVal[i]));
    	if ($.trim(aryVal[i]) != "") { 
			if(email_valid && aryVal[i] != "") {
				$('.rqbiBindSendEmailBtn').removeAttr('disabled');
				$('#rqbiBindEmailInput').removeAttr('style');
				$('#bndEmilLbl').removeAttr('style');
				$('.bind_vlidEml').hide();
			} else {
				$('.rqbiBindSendEmailBtn').attr('disabled',true);
				$('#rqbiBindEmailInput').attr('style','border-color:#ed4613;');
				$('#bndEmilLbl').attr('style','color:#ed4613;');
				$('.bind_vlidEml').show();
			}
		} else {
			$('.rqbiBindSendEmailBtn').removeAttr('disabled');
			$('#rqbiBindEmailInput').removeAttr('style');
			$('#bndEmilLbl').removeAttr('style');
			$('.bind_vlidEml').hide();
		}
	}
	
});

$(document).on('click', '.rqbiBindSendEmailBtn', function () {
	var validEmailchk = false;
    var value = $('#rqbiBindEmailInput').val();
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
		$('#rqbiBindEmailInput').removeAttr('style');
		$('#bndEmilLbl').removeAttr('style');

		var link1 = "";
		var link1_name = "";
		if($('#rqbiBindListCkbx_1').prop('checked')) {
			link1 = $('.bind_href1').attr('href');
			link1_name = $('.bind_href1').text();
		}

		var link2 = "";
		var link2_name = "";
		if($('#rqbiBindListCkbx_4').prop('checked')) {
			link2 = $('.bind_href2').attr('href');
			link2_name = $('.bind_href2').text();
		}
		var polcy_no = $('#policy_no').text();
		var subj_email = "Binder - "+polcy_no;
		sendQuoteBindIssue_email(email_array, link1, link1_name, link2, link2_name, subj_email, 'Bind');

	} else {
		$('#rqbiBindEmailInput').attr('style','border-color:#ed4613;');
		$('#bndEmilLbl').attr('style','color:#ed4613;');
	}
});