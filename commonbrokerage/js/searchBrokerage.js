var host = window.location.hostname;
var protocol = window.location.protocol;
var base_url = protocol + "//" + host;
var public_url = base_url + "/brokerage";
var upload_url = '/brokerage_dragdrop_v2/v4uploads/documents_filesystem/';
var emailid = '';
var eid = '';
var login_uid = localStorage["userid"];
var login_name = localStorage["username"];
var broker_id;

setInterval(function () {
	mailAutoRefresh();
}, 300000);

$(document).on('click', '.submissionmail_active', function () {
	eid = $(this).attr('emailid');
	broker_id = $(this).find('h6').find('.emailist').text();
	$(this).addClass("submissionmailactive").siblings().removeClass("submissionmailactive");
	display_email(eid);
	display_account_details(eid);
});

$(document).on('click', '.resetbtn_esubmission', function () {
	get_emailst();
});

$(document).ready(function () {
	$('.email_date_from').val('');
	$('.email_date_to').val('');
	$('.accountName').html('');
	$('.brokerName').html('');
	$('.submissionid').html('');
	$('.accountName2').html('');
	$('.brokerName2').html('');
	$('.submissionid2').html('');
	$('.download1').html('');
	$('.download2').html('');
	$('#account_create').css('display', 'none');
	$('#pdfmail_view').css('display', 'none');
	get_emailst();
});

//List of all submission emails
function get_emailst() {
	$('#pdfmail_view').css('display', 'none');
	$('.loader').show();
	$.ajax({
		type: "post",
		url: laravel_url + '/getemaillists',
		data: { 'login_uid': login_uid },
		dataType: "json",
		success: function (response) { 
			var emaillist = response;
			emailListView(emaillist,4);
			$('.loader').fadeOut('slow');
		},
	});
}
function emailListView(emaillist,submission) {
	empty_esubmission_records(submission);
	if (emaillist.length > 0) {
		for (var i = 0; i < emaillist.length; i++) {
			var icon_stats = emaillist[i].flag_status;
			var icon_view1;
			if (jQuery.inArray(0, icon_stats) !== -1) {
				icon_view1 = '<span class="badge badge-danger badge-pill pull-right sub_icon_text">Red</span>';
			} else {
				icon_view1 = '<span class="badge batch_bg_green badge-pill pull-right sub_icon_text">Green</span>';
			}

			var email_from = emaillist[i].from_email;
			if (email_from.length > 20)
				email_from = email_from.substring(0, 20) + '...';

			var subject_from = emaillist[i].subject_email;
			if (subject_from != null && subject_from != '') {
				if (subject_from.length > 20)
					subject_from = subject_from.substring(0, 20) + '...';
			} else {
				subject_from = '';
			}

			inline = '<input type="checkbox" data-ckid ="' + emaillist[i].ten_email_id + '"  class="checkbox_class" name="complete_checkbox" value="' + emaillist[i].ten_email_id + '" /><div class="list-group-item list-group-item-action flex-column align-items-start nopadding getemaildata submissionmail_active curosor_pointer" emailid="' + emaillist[i].ten_email_id + '"><div class="d-flex w-100 justify-content-between"><span class="pull-left title_align_design">' + (i + 1) + '. </span><h6 class="mb-1 text-left usermailid"><span class="pull-left margin_left_22 emailist">' + email_from + '</span><br/><span class="pull-left email_subject_title_design">' + subject_from + '</span></h6></div><p class="mb-1 text-left pull-left width100_perc email_subtitle_design"><small class="email_date_design">' + emaillist[i].date_email + '</small>' + icon_view1 + '</p></span></div>';

			$(".showmaillists").append(inline);

		}

	} else {
		$(".showmaillists").append('<p>No records found</p>');
		$('#pdfmail_view').css('display', 'none');
	}

}

$('.assign_cancel_btn').click(
	function () {
		$('.assign_to_search').val('');
	});


//search section start
function searchandsort(load_id) {
	var search_string = $('#br_ac_name_search').val();
	search_url = laravel_url + '/search_email';

	if (search_string != '' && search_string != null) {
		$.ajax({
			url: search_url,
			data: {
				search_string: search_string,
				load_id: load_id
			},
			method: 'post',
			dataType: 'json',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			beforeSend: function () {

			},
			success: function (response) {
				var emaillist = response['data'];
				emailListView(emaillist,2);
			},
		});
	} else {
		get_emailst();
	}
}

$(document).on('keyup', '#br_ac_name_search', function () {
	$('#pdfmail_view').css('display', 'none');
	if ($(this).val() != '' && $(this).val() != null) { // check if value changed
		searchandsort();
	}
	else {
		get_emailst();
	}
});

$(document).on('click', '.submissionfiltersearch', function () {
	$('#pdfmail_view').css('display', 'none');
	var email_date_from = $(this).closest('.account_div_form').find('.email_date_from').val();
	var email_date_to = $(this).closest('.account_div_form').find('.email_date_to').val();
	var flag_fill_val = $(this).closest('.account_div_form').find('.flag_fill_val').val();
	advancesearchandsort(email_date_from, email_date_to, flag_fill_val);
});
function advancesearchandsort(email_date_from, email_date_to, flag_fill_val) {

	if (email_date_from == '' && email_date_to == '' && flag_fill_val == '') {
		new PNotify({ title: 'Error', text: 'Please select atleast one field', delay: 2000, type: 'error' });
	}
	else {
		if (datedifferencee(email_date_from, email_date_to) < 0) {

			new PNotify({ title: 'Error', text: 'Created To-date cannot be less than of From date', delay: 2000, type: 'error' });
		} else {
			$.ajax({
				url: laravel_url + "/fill_search_email",
				data: {
					email_date_from: email_date_from,
					email_date_to: email_date_to,
					flag_fill_val: flag_fill_val,
				},
				method: 'post',
				dataType: 'json',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				beforeSend: function () {

				},
				success: function (response) {
					var emaillist = response['data'];
					emailListView(emaillist,3);
				},
			});
		}
	}
}

function datedifferencee(fromdatee, todatee) {
	console.log(fromdatee);
	var fromdate = fromdatee.replace(/-/g, ",");
	var todate = todatee.replace(/-/g, ",");

	var startDay = new Date(fromdate);
	var endDay = new Date(todate);

	var millisecondsPerDay = 1000 * 60 * 60 * 24;

	var millisBetween = endDay.getTime() - startDay.getTime();
	var days1 = millisBetween / millisecondsPerDay;

	// Round down.
	var days = Math.floor(days1);

	return days;
}

function display_email(email_id) {
	$('#pdfmail_view').show();
	$.ajax({
		url: laravel_url + "/get_email_filename",
		dataType: 'json',
		data: { email_id: email_id },
		success: function (response) {
			filesystem_hash = response['filesystem_hash'];
			if (response['status'] == 'success') {
				$('#pdfmail_view').attr('src', public_url + upload_url + 'Email_' + email_id + '/' + filesystem_hash + '.pdf');

			}
		}
	});
}

function display_account_details(email_aid) {
	$.ajax({
		url: laravel_url + '/display_account_datalist',
		data: { 'email_aid': email_aid },
		dataType: 'json',
		method: 'POST',
		success: function (response) {
			if (response['status'] == 'success') {
				if (jQuery.inArray(0, response['flag_status']) !== -1) {
					$(".acc_not_created").show();
					$("#account_create").hide();
					var lob = (response['submission_number'][0].split("-")[2] == "XL") ? "GL" : "XL";
					$('.accountName').html(": " + response['accountname'][0]);
					$('.brokerName').html(": " + response['broker_name'][0]);
					$('.submissionid').html(": " + response['submission_number'][0]);
					$('.download1').html(response['filename'][0]);
					$('.accnotcreated').html(lob + " ");
				} else {
					    $(".acc_not_created").hide();
					    $('.accountName').html(": " + response['accountname'][0]);
						$('.brokerName').html(": " + response['broker_name'][0]);
						$('.submissionid').html(": " + response['submission_number'][0]);
						$('.download1').html(response['filename'][0]);
					if (response['accountname'].length > 1) {
						$("#account_create").show();
						$('.accountName2').html(": " + response['accountname'][1]);
						$('.brokerName2').html(": " + response['broker_name'][1]);
						$('.submissionid2').html(": " + response['submission_number'][1]);
						$('.download2').html(response['filename'][1]);
					} else {
						$("#account_create").hide();
						$('.accountName2').html('');
						$('.brokerName2').html('');
						$('.submissionid2').html('');
					}
				}
			} else {
				$("#account_create").hide();
				$(".acc_not_created").hide();
				$('.accountName').html('');
				$('.brokerName').html('');
				$('.submissionid').html('');
				$('.download1').html('');
			}

		}
	});
}
// Auto Refreshing Mail list after cron Run
function mailAutoRefresh() {
	$.ajax({
		method: 'POST',
		url: laravel_url + "/getemail_listnew",
		dataType: "json",
		success: function (response) {
			mail_list = response;
			emailListView(mail_list,1);
			$('.loader').fadeOut('slow');
		}
	});
}

$(document).on('click', '.eml_download1', function () {
	var eaid1 = $('.download1').html();
	downoload_email_files(eaid1);
});
$(document).on('click', '.eml_download2', function () {
	var eaid2 = $('.download2').html();
	downoload_email_files(eaid2);
});

function downoload_email_files(eaid) { //console.log(eaid);
	$.ajax({
		url: laravel_url + "/get_email_and_attachmenta_filename",
		dataType: 'json',
		data: { email_id: eid, email_attachid: eaid },
		success: function (response) { //console.log(response);
			var dat_chkk = response['filesystem_hash'];
			if (response['status'] == 'success') {
				downloadd_files(dat_chkk)
			} else {
				new PNotify({ title: 'Error', text: 'Download is failed', delay: 1000, type: 'error' });
			}
		}
	});
}

function downloadd_files(files) {
	function downloadd_next(i) {
		try {
			var e_ext = files[i].ext;
			var a = document.createElement('a');

			a.href = base_url + '/brokerage/brokerage_dragdrop_v2/v4uploads/documents_filesystem/Email_' + files[i].common_id + '/' + files[i].hash_val + '.' + e_ext;
			a.target = '_blank';
			a.download = files[i].doc_name;
			(document.body || document.documentElement).appendChild(a);
			if (a.click) {
				a.click();
			}
			else {
				window.open(files[i].doc_name);
			}
			a.parentNode.removeChild(a);
			setTimeout(function () {
				downloadd_next(i + 1);
			}, 1000);
		}
		catch (err) {
			return false;
		}
	}

	downloadd_next(0);
}
function empty_esubmission_records(submission) { 
	$(".showmaillists").html('');
	if (submission != 1) {
		$('.download1').html('');
		$("#account_create").hide();
		$(".acc_not_created").hide();
		$('.accountName').html('');
		$('.brokerName').html('');
		$('.submissionid').html('');
		$('.accountName2').html('');
		$('.brokerName2').html('');
		$('.submissionid2').html('');
	}
}


function reset_acccountlist() {
	$('#account_list_loader').show();
	accounttablelist();
}

function reset_archivelist() {
	archivetablelist();
}

$('.show_filter_btn').click(function(){  
	$('.filter_div').toggle();
	$('.setting_filter_div').hide();
	$('.submission_div_form').hide();
	$('.account_div_form').show();
	setTimeout(function(){ 
		$('.app-body').toggleClass('filterclose_click');
		$('.app-body').removeClass('filterclose_click_setting');
	}, 10);
});