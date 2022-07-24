//coverage and limits submissionno:
$(document).on('keyup', '.xl_submissionNo', function () {
	var sub_no = $(this).val();
	if (sub_no.length == 3) {
		xl_coverageLimits_submissionNo({ submissionNo: sub_no });
	}
	$(this).focus();
});

//coverage & limits 
$(document).on('click', '.switchYes', function () {
	var supportedtype = ($("input[name='supportRadio']:checked").val() == "supportEx") ? 0 : 1;
	coverage_limit_insert({ is_supported: supportedtype });
});

$(document).on('click', '.switchYes_type', function () {
	var type = ($("input[name='xlType']:checked").val() == "lead") ? 1 : 2;
	var supportedtype = ($("input[name='supportRadio']:checked").val() == "supportEx") ? 0 : 1;
	coverage_limit_insert({ type: type, is_supported: supportedtype });
});

// Each occurance 
$(document).on('change', '.xlType_occuLimit', function () {
	var xlType_occuLimit = $(this).val().replace(/[$,]/g, '');
	if (xlType_occuLimit != 0) {
		xl_emptyReset($(this));
	}
	xlType_occuLimit_other = '';
	coverage_limit_insert({ each_occurance_limit: xlType_occuLimit, each_occurance_limit_other: xlType_occuLimit_other });
});
// Each occurance other
$(document).on('blur', '.xlType_occuLimit_other', function () {
	var xlType_occuLimit_other = $(this).val().replace(/[$,]/g, '');
	if (xlType_occuLimit_other) {
		xl_emptyReset($(this));
	}
	coverage_limit_insert({ each_occurance_limit_other: xlType_occuLimit_other });
});

// Aggregate Limit 
$(document).on('change', '.xlType_aggreLimit', function () {
	var xlType_aggreLimit = $(this).val().replace(/[$,]/g, '');
	if (xlType_aggreLimit != 0) {
		xl_emptyReset($(this));
	}
	xlType_aggreLimit_other = '';
	coverage_limit_insert({ aggregate_limit: xlType_aggreLimit, aggregate_limit_other: xlType_aggreLimit_other });
});
// Aggregate Limit other
$(document).on('blur', '.xlType_aggreLimit_other', function () {
	var xlType_aggreLimit_other = $(this).val().replace(/[$,]/g, '');
	if (xlType_aggreLimit_other) {
		xl_emptyReset($(this));
	}
	coverage_limit_insert({ aggregate_limit_other: xlType_aggreLimit_other });
});
// Products Aggregate Limit 
$(document).on('change', '.xlType_prodAggreLimit', function () {
	var xlType_prodAggreLimit = $(this).val().replace(/[$,]/g, '');
	if (xlType_prodAggreLimit != 0) {
		xl_emptyReset($(this));
	}
	products_aggregate_limit_other = '';
	coverage_limit_insert({ products_aggregate_limit: xlType_prodAggreLimit, products_aggregate_limit_other: products_aggregate_limit_other });

});
// Products Aggregate Limit other
$(document).on('blur', '.xlType_prodAggreLimit_other', function () {
	var xlType_prodAggreLimit_other = $(this).val().replace(/[$,]/g, '');
	if (xlType_prodAggreLimit_other) {
		xl_emptyReset($(this));
	}
	coverage_limit_insert({ products_aggregate_limit_other: xlType_prodAggreLimit_other });
});
// Attachment Point 
$(document).on('change', '.xlType_attachPt', function () {
	var xlType_attachPt = $(this).val().replace(/[$,]/g, '');
	if (xlType_attachPt != 0) {
		xl_emptyReset($(this));
	}
	xlType_attachPt_other = '';
	coverage_limit_insert({ attachment_point: xlType_attachPt, attachment_point_other: xlType_attachPt_other });

});
// Attachment Point other
$(document).on('blur', '.xlType_attachPt_other', function () {
	var xlType_attachPt_other = $(this).val().replace(/[$,]/g, '');
	if (xlType_attachPt_other) {
		xl_emptyReset($(this));
	}
	coverage_limit_insert({ attachment_point_other: xlType_attachPt_other });
});

function coverage_limit_insert(value) {
	try {
		var get_rqbi_id = $('#rqbiQuoteVersion').val();
		value.created_by = localStorage.getItem('usernumericid');
		value.acct_id = accid;
		if (com_id!='' && get_rqbi_id!='') { 
			value.com_id = com_id;
			value.rqbi_id = get_rqbi_id;
		}
		$.ajax({
			url: laravel_url + "/coverage_limit_xl_add",
			type: 'post',
			data: value,
			success: function (response) {
				// get_coverage_limits_xl(accid, com_id);
				$('.covLimitAccordHead').removeAttr('style');
				$('.covLimitAccordHead a').removeAttr('style');
				var obj = JSON.parse(response);
				if (obj.result != "") {
					if (obj.result == "success") {
						console.log(obj.msg);
						if (obj.msg == "Updated Successfully") {
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
						}
					}
				}

			},
			complete: function () {
			}
		});
	} catch (err) {
		console.log(err);
	}
}
var awesomplete_subno = {};
function xl_coverageLimits_submissionNo(value) {

	previoussub_input = document.querySelector('.xl_submissionNo');
	if (jQuery.isEmptyObject(awesomplete_subno)) {
		awesomplete_subno = new Awesomplete(previoussub_input, {
			minChars: 3,
			maxItems: 100,
			autoFirst: false
		});
	}

	$.ajax({
		url: laravel_url + "/get_xlcoverage_submissionNo",
		method: 'POST',
		data: value,
		dataType: 'json',

		success: function (response) {
			$(".subnoinvalid").remove();
			$(".subnoinvalid").val('');
			if (response.status == 1) {
				suggestionList = response.data;
				finalSuggestArray = [];
				$.each(suggestionList, function (index, value) {
					finalSuggestArray.push(value.submission_number);
				});
				awesomplete_subno.list = finalSuggestArray;
				$(this).focus();
			} else {
				$(".xl_submissionNo").val('');
				$('.xl_submissionNo').after('<small class="pull-left subnoinvalid" style="color:red">Invalid Submission Number</small>');
			}

			awesomplete_subno = '';

		},
		error: function () {

		},
		complete: function () {
		}
	});
}

$(document).on('blur', '.xl_submissionNo', function () {
	try {
		var submission_no = $(this).val();
		var rqbi_id_val = $('#rqbiQuoteVersion').val();
		unsupported_to_supported(submission_no, rqbi_id_val, com_id);
		$.ajax({
			type: 'post',
			url: laravel_url + "/submission_number_retrieve",
			data: { submission_no: submission_no, get_rqbi_id: rqbi_id_val },
			success: function (response) {
				console.log(response);
			},
			complete: function () {
			},
			error: function (data) {

			}
		});
	} catch (err) {
		console.log(err);

	}
});

$(document).on('change', '#covPrimaryState', function () {
	try {
		var singleselect = $('#singleselect').val();
		var covPrimaryState = $('#covPrimaryState').val();
		var rqbi_id_val = $('#rqbiQuoteVersion').val();
		var current_user = localStorage.getItem('usernumericid');

		if (covPrimaryState != "" && singleselect == "XSLiability") {
			$('#covPrimaryState').removeAttr('style');
			$.ajax({
				type: 'post',
				url: laravel_url + "/store_coverage_primary_state_xl",
				data: { primary_state: covPrimaryState, rqbi_id: rqbi_id_val, acct_id: accid, com_id: com_id, created_by: current_user },
				success: function (response) {
					$('.covLimitAccordHead').removeAttr('style');
					$('.covLimitAccordHead a').removeAttr('style');
					var obj = JSON.parse(response);
					if (obj.msg == "Updated Successfully") {
						enabled_continueTofullQuote();
						checkContinueToFullQuoteStatus();
					}
				},
				complete: function () {
				},
				error: function (data) {

				}
			});
		}
	} catch (err) {
		console.log(err);
	}
});

function get_coverage_limits_xl(acc_id, com_id) {
	try {
		$.ajax({
			url: laravel_url + "/get_xlcoverage_limits",
			type: 'post',
			data: { com_id: com_id, acct_id: acc_id },
			success: function (response) {
				if (response != '') {
					$('.xl_submisNoDiv').addClass('d-none');
					$('.xl_submisNoDiv').remove();

					primary_state = response[0]['primary_state'];
					each_occurance_limit = response[0]['each_occurance_limit'];
					each_occurance_limit_other = response[0]['each_occurance_limit_other'];
					products_aggregate_limit = response[0]['products_aggregate_limit'];
					products_aggregate_limit_other = response[0]['products_aggregate_limit_other'];
					aggregate_limit = response[0]['aggregate_limit'];
					aggregate_limit_other = response[0]['aggregate_limit_other'];
					attachment_point = response[0]['attachment_point'];
					attachment_point_other = response[0]['attachment_point_other'];
					if (primary_state != null) {
						$("#covPrimaryState").val(primary_state);
					} else {
						$("#covPrimaryState").val(0);
					}
					if (response[0].is_supported == 0) {
						check_has_gl_submission();
						$("#supportEx").prop("checked", true);
						xl_uctAppend('hide');
					} else {

						$("#unSupportEx").prop("checked", true);
						xl_uctAppend('show');
						$('.xl_submisNoDiv').addClass('d-none');
						$('.xl_submisNoDiv').remove();
					}

					if (response[0].type == 2) {
						$("#xlTypeExcess").prop("checked", true);
						$('.attachPtDiv').removeClass('d-none');
					} else {
						$("#xlTypeLead").prop("checked", true);
						$('.attachPtDiv').addClass('d-none');
					}
					if (each_occurance_limit != null) {
						if (each_occurance_limit == 'other') {
							if (each_occurance_limit_other != null) {
								each_occurance_limit_other1 = parseInt(each_occurance_limit_other).toLocaleString();
							} else {
								each_occurance_limit_other1 = '';
							}
							$(".xlType_occuLimit").val(each_occurance_limit);
							xlOtherSelect($('.xlType_occuLimit'));
							$(".xlType_occuLimit_other").val(each_occurance_limit_other1);
						} else {
							$(".xlType_occuLimit").val(each_occurance_limit).prop("selected", true);

						}
					} else {
						$(".xlType_occuLimit").val(0);
					}
					if (aggregate_limit != null) {
						if (aggregate_limit == 'other') {
							if (aggregate_limit_other != null) {
								aggregate_limit_other1 = parseInt(aggregate_limit_other).toLocaleString();
							} else {
								aggregate_limit_other1 = '';
							}
							$(".xlType_aggreLimit").val(aggregate_limit);
							xlOtherSelect($('.xlType_aggreLimit'));
							$(".xlType_aggreLimit_other").val(aggregate_limit_other1);
						} else {
							$(".xlType_aggreLimit").val(aggregate_limit).prop("selected", true);
						}
					} else {
						$(".xlType_aggreLimit").val(0);
					}
					if (products_aggregate_limit != null) {
						if (products_aggregate_limit == 'other') {
							if (products_aggregate_limit_other != null) {
								products_aggregate_limit_other1 = parseInt(products_aggregate_limit_other).toLocaleString();
							} else {
								products_aggregate_limit_other1 = '';
							}

							$(".xlType_prodAggreLimit").val(products_aggregate_limit);
							xlOtherSelect($('.xlType_prodAggreLimit'));
							$(".xlType_prodAggreLimit_other").val(products_aggregate_limit_other1);
						} else {
							$(".xlType_prodAggreLimit").val(products_aggregate_limit).prop("selected", true);
						}
					} else {
						$(".xlType_prodAggreLimit").val(0);
					}
					if (attachment_point != null) {
						if (attachment_point == 'other') {
							if (attachment_point_other != null) {
								attachment_point_other1 = parseInt(attachment_point_other).toLocaleString();
							} else {
								attachment_point_other1 = '';
							}
							$(".xlType_attachPt").val(attachment_point);
							xlOtherSelect($('.xlType_attachPt'));
							$(".xlType_attachPt_other").val(attachment_point_other1);
						} else {
							$(".xlType_attachPt").val(attachment_point).prop("selected", true);
						}
					} else {
						$(".xlType_attachPt").val(0);
					}

				} else {
					$('.xl_submisNoDiv').addClass('d-none');
					$('.xl_submisNoDiv').remove();
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
}