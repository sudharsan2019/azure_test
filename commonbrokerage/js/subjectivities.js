$(document).on('click', '.subjchkbx', function() {
	var rid = $(this).data('rid');
	var listcount = $(this).data('listid');

	if ($(this).prop('checked') == true) {
		$('.rqbiSubjDueDate_'+listcount).removeClass('inputDisabled');
		add_subjectivities({rid:rid,is_checked:1},'pre_sub',listcount);
	} else {
		var rid = $(this).data('rid');
		$('.rqbiSubjDueDate_'+listcount).addClass('inputDisabled');
		if($('.rqbiSubjDueDate_'+listcount+' option:selected').html() == "Due Date - Calendar Selection"){
			$('.calendarSelection_'+listcount).addClass('disabled');
		}
		$('.rqbiSubjDueDate_'+listcount+' option[value="0"]').prop('selected',true);
		$('.rqbiSubjDueDate_'+listcount+' .new_due_option').remove();
		$('.subjectivityDate_'+listcount).text('');
		$('.addDueDate_'+listcount).hide();
		remove_subjectivities({rid:rid,is_userdefined:0,is_checked:0,is_active:1},'pre_sub',listcount);
	}
});

$(document).on('click', '.user_subjchkbx', function() {
	var rid = $(this).data('rid');
	var sub_name = $(this).next('.sub_name').html();
	var listcount = $(this).attr('data-listid');

	if ($(this).prop('checked') == true) {
		$('.rqbiSubjDueDate_'+listcount).removeClass('inputDisabled');
		add_subjectivities({rid:rid,subjectivity_name:sub_name,is_userdefined:1,is_checked:1,is_active:1},'user_sub',listcount);
	} else {
		$('.rqbiSubjDueDate_'+listcount).addClass('inputDisabled');
		if ($('.rqbiSubjDueDate_'+listcount+' option:selected').html() == "Due Date - Calendar Selection") {
			$('.calendarSelection_'+listcount).addClass('disabled');
		}
		$('.rqbiSubjDueDate_'+listcount+' option[value="0"]').prop('selected',true);
		$('.rqbiSubjDueDate_'+listcount+' .new_due_option').remove();
		$('.subjectivityDate_'+listcount).text('');
		$('.addDueDate_'+listcount).hide();
		remove_subjectivities({rid:rid,is_userdefined:1,is_checked:0,is_active:1},'user_sub',listcount);
	}
}); 

$(document).on('change', '.due_condition', function() {
	var due_id = $(this).val();
	var listcount = $(this).data('listid');
	var due_condition = $('.rqbiSubjDueDate_'+listcount+' option:selected').html();
	if (due_id == 0) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
	if (due_condition != "Add New") {
		var rid = $("#subjCkbx_"+listcount).data('rid');
		add_subjectivities({rid:rid,acc_due_id:due_id,due_date:'',is_checked:1},'pre_sub',listcount)
		check_due_validation(0);
	}
});

$(document).on('change', '.user_due_condition', function() {
	var due_id = $(this).val();
	var listcount = $(this).data('listid');
	var due_condition = $('.rqbiSubjDueDate_'+listcount+' option:selected').html();
	if (due_id == 0) {
		$(this).addClass('redBorder');
	} else {
		$(this).removeClass('redBorder');
	}
	if (due_condition != "Add New") {
		var listcount = $(this).data('listid');
		var rid = $("#subjCkbx_"+listcount).data('rid');
		
		add_subjectivities({rid:rid,acc_due_id:due_id,is_checked:1},'user_sub',listcount);
		check_due_validation(0);
	}
});

$(document).on('click', '.subjAccordHeader', function() {
	if ($(this).hasClass('collapsed') == false) {
		if ($(this).attr('sub_retrieved') == undefined || $(this).attr('sub_retrieved') == false) {
			get_subjectivities(0);
		}
	}
});

function add_subjectivities(data,sub_type,listcount) {
	try {
		var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		data.acct_id = acc_id;
		data.com_id = com_id;
		data.rqbi_id = rqbi_id;
		$.ajax({
			url: laravel_url+"/add_subjectivities",
			type:'post',
			data:data,
			success:function(response) {
				
			},
			error: function(){
			}
		});
	}
	catch(err) {
		console.log(err);
		
	}
}

function remove_subjectivities(data,sub_type,listcount) {
	try{
		var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		data.acct_id = acc_id;
		data.com_id = com_id;
		data.rqbi_id = rqbi_id;
		$.ajax({
			url: laravel_url+"/remove_subjectivities",
			type:'post',
			data:data,
			success:function(response) {
				if(sub_type == 'pre_sub'){
					$("#subjCkbx_"+listcount).removeAttr('data-rid');
				}
				var numberOfChecked = $('input[type="checkbox"].subjchkbx:checked').length;
				if(numberOfChecked == 0) {
					$('.subjAccordHeader').removeAttr('style');
				}
				$('.rqbiSubjDueDate_'+listcount).removeClass('redBorder');
			},
			error: function() {
			}
		});
	}catch(err) {
		console.log(err);
		
	}
}

function get_subjectivities(validate) {
	try{
		data={};
		var return_value='';
		var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		data.acct_id = acc_id;
		data.com_id = com_id;
		data.rqbi_id = rqbi_id;

		coverage_gl = $('#typeGL').prop('checked');
		coverage_liq = $('#typeLiquor').prop('checked');
		coverage_ocp = $('#typeOCP').prop('checked');
		if(coverage_gl == true && coverage_liq == false && coverage_ocp == false){
			data.coverage_type = 1;
		} else if(coverage_gl == false && coverage_liq == true && coverage_ocp == false){
			data.coverage_type = 2;
		} else if(coverage_gl == false && coverage_liq == false && coverage_ocp == true){
			data.coverage_type = 3;
		} else if(coverage_gl == true && coverage_liq == true && coverage_ocp == false){
			data.coverage_type = 4;
		}
		$.ajax({
			url: laravel_url+"/get_subjectivities",
			type:'post',
			async: false,
			data:data,
			success:function(response) {
				$('.SubjListTable').html(response.pre_sub_div);
				if(response.user_sub_div!=''){
					$(".addSubjDiv").show();
					$(".addSubjDiv").html(response.user_sub_div);
				}
				$(".rqbiAddDueDate ").html(response.add_user_due);
				
				
				if (response.account_sub.length > 0) {
					for(var i = 0;i < response.account_sub.length;i++) {
						var listcount = $('input[type="checkbox"][data-rid="'+response.account_sub[i].rid+'"]').data('listid');
						if (response.account_sub[i].is_checked == 1) {
							$('input[type="checkbox"][data-rid="'+response.account_sub[i].rid+'"]').prop('checked',true);
							$('.rqbiSubjDueDate_'+listcount).removeClass('inputDisabled');
						} else {
							$('.rqbiSubjDueDate_'+listcount).addClass('inputDisabled');
						}
						if (response.account_sub[i].acc_due_id != null) {
							$('.rqbiSubjDueDate_'+listcount+' '+'option[value="'+response.account_sub[i].acc_due_id+'"]').attr('selected',true);
							$('.rqbiSubjDueDate_'+listcount).val(response.account_sub[i].acc_due_id);
							var due_condition = $('.rqbiSubjDueDate_'+listcount+' '+'option[value="'+response.account_sub[i].acc_due_id+'"]').html();

							if (due_condition == "Due Date - Calendar Selection") {
								$('.calendarSelection_'+listcount).removeClass('disabled');
								if (response.account_sub[i].due_date != null && response.account_sub[i].due_date!="00-00-0000 00:00:00") {
									var date = response.account_sub[i].due_date.substr(0,10);
									var date_split = date.split('-');
									var due_date = date_split[1] + '-' + date_split[2] + '-' + date_split[0];
									$('.subjectivityDate_'+listcount).text('').text(due_date);
								}

							}
						}

						
					}
				}
				$('.subjAccordHeader').attr('sub_retrieved','1');
				if (validate == 1) {
					return_value = check_due_validation(1);
				}
				
			},
			complete:function() {
				load_datepicker();
			},
			error: function() {
			}
		});

	}catch(err) {
		console.log(err);
		
	}
					
	return return_value;
}

function save_delete_coverage_sub(previous_coverage) {
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	data = {};
	data.acct_id = acc_id;
	data.com_id = com_id;
	data.rqbi_id = rqbi_id;
	coverage_gl = $('#typeGL').prop('checked');
	coverage_liq = $('#typeLiquor').prop('checked');
	coverage_ocp = $('#typeOCP').prop('checked');
	if(coverage_gl == true && coverage_liq == false && coverage_ocp == false){
		data.coverage_type = 1;
	} else if(coverage_gl == false && coverage_liq == true && coverage_ocp == false){
		data.coverage_type = 2;
	} else if(coverage_gl == false && coverage_liq == false && coverage_ocp == true){
		data.coverage_type = 3;
	} else if(coverage_gl == true && coverage_liq == true && coverage_ocp == false){
		data.coverage_type = 4;
	}
	data.is_active = 1;
	data.previous_coverage = previous_coverage;
	data.created_by = localStorage.getItem('usernumericid');
	$.ajax({
		url: laravel_url+"/save_delete_coverage_sub",
		type:'post',
		data:data,
		success:function(response) {

			if($('.subjAccordHeader').hasClass('collapsed')==true){
				$('.subjAccordHeader').removeClass('collapsed');
			}
			if($('#subjectivitiesAccord').hasClass('show')==false){
				$('#subjectivitiesAccord').addClass('show');
			}
			if (response.status=="Changes") {

				$('.subjAccordHeader').removeAttr('sub_retrieved');
				$('.SubjListTable').html("");
				$(".addSubjDiv").html("");
				$(".rqbiAddDueDate ").html('');
			}
		},
		complete:function() {
			if ($('.subjAccordHeader').attr('sub_retrieved') == undefined || $('.subjAccordHeader').attr('sub_retrieved') == false) {
				get_subjectivities(0);
			}

			$('.add_sub_datepicker').datepicker({
				format: 'mm-dd-yyyy',
				// startDate: '-3d'
				autoclose: true,
				todayHighlight: true,
				changeMonth: true,
				changeYear: true,
			}).on('changeDate', function(e) {
				var selectedDate = $('.addDatepickerInput').val();
				$('.rqbiAddDueDate').attr('data-add_new_date',selectedDate);
			});
		},
		error: function() {
		}
	});
	
}

//Subjectivities - Add New Due Date
$(document).on('change', '.rqbiSubjDueDate', function() {
	var listid = $(this).attr('data-listid');
	var selectedId = $( ".rqbiSubjDueDate_"+listid+" option:selected" ).val();
	var selectedItem = $( ".rqbiSubjDueDate_"+listid+" option[value='"+selectedId+"']" ).html();
	$('.subjectivityDate_'+listid).text('');
	if (selectedItem=='Add New') {
		$('.addDueDate_'+listid).val('').show().focus();
	} else {
		$('.addDueDate_'+listid).val('').hide();
	}	
	if (selectedItem=='Due Date - Calendar Selection') {
		$('.calendarSelection_'+listid).removeClass('disabled');
	} else {
		$('.calendarSelection_'+listid).addClass('disabled');
	}
});

function getDueDate(listid) {
	var newval = $('.addDueDate_'+listid).val();
	if ($('.rqbiSubjDueDate_'+listid).hasClass('user_due_condition')) {
		is_userdefined = 1;
		var sub_id = 0;
	} else {
		is_userdefined = 0;
		var sub_id =  $("#subjCkbx_"+listid).data('pre_sub_id');
	}
	var check_is_checked = $("#subjCkbx_"+listid).prop('checked');
	if (check_is_checked==true) {
		is_checked = 1;
	} else {
		is_checked = 0;
	}

	var rid = $("#subjCkbx_"+listid).data('rid');
	var user_id = localStorage.getItem('usernumericid');

	if (newval != '') {
		data.com_id = com_id;
		data.rqbi_id = rqbi_id;
		data.rid = rid;
		coverage_gl = $('#typeGL').prop('checked');
		coverage_liq = $('#typeLiquor').prop('checked');
		coverage_ocp = $('#typeOCP').prop('checked');
		if (coverage_gl == true && coverage_liq == false && coverage_ocp == false) {
			coverage_type = 1;
		} else if (coverage_gl == false && coverage_liq == true && coverage_ocp == false) {
			coverage_type = 2;
		} else if (coverage_gl == false && coverage_liq == false && coverage_ocp == true) {
			coverage_type = 3;
		} else if (coverage_gl == true && coverage_liq == true && coverage_ocp == false) {
			coverage_type = 4;
		}
		var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
		$.ajax({
			url: laravel_url+"/add_new_duecondition",
			type:'post',
			data:{'rid':rid,'com_id':com_id,'acct_id':acc_id,'rqbi_id':rqbi_id,'coverage_type':coverage_type ,'sub_id':sub_id,'due_condition':newval,'is_userdefined':is_userdefined,'created_by':user_id,is_checked:is_checked,is_active:1},
			success:function(response) {
				if($('#subjCkbx_'+listid).prop('checked')==true){
					$('#rqbiSubjDueDate_'+listid+' option:last').before('<option value="'+response.new_sub_id+'" class="new_due_option">'+newval+'</option>'); 
					$('.addDueDate_'+listid).hide();
					$('.rqbiSubjDueDate_'+listid+' '+'option[value="'+response.new_sub_id+'"]').attr('selected',true);
				}
			},
			error: function() {
			}
		});
	}
	check_due_validation(0);
}

$(document).on('change', '.rqbiAddDueDate', function() {
	var selectedId = $( ".rqbiAddDueDate option:selected" ).val();
	var selectedItem = $( ".rqbiAddDueDate option[value='"+selectedId+"']" ).html();
	$('.rqbiAddDueDate').removeAttr('data-add_new_due');
	$('.rqbiAddDueDate').removeAttr('data-add_new_date');
	if (selectedItem =='Add New') {
		$('.userAddDueDate').val('').show().focus();
	} else {
		$('.userAddDueDate').val('').hide();
	}
	if (selectedItem =='Due Date - Calendar Selection') {
		$('.add_calendarSelection').removeClass('disabled');
	} else {
		$('.add_calendarSelection').addClass('disabled');
	}
});

$(document).on('focusout', '.userAddDueDate', function() {
	var new_due = $('.userAddDueDate').val();
	if (new_due!='') {
		$('.rqbiAddDueDate').attr('data-add_new_due',new_due);
		$('.userAddDueDate').val('').hide();
		$('.rqbiAddDueDate').removeAttr('data-add_new_date');
		$('.rqbiAddDueDate option:last').before('<option value="" class="add_due_option has_selected">'+new_due+'</option>');
		$('.has_selected').attr('selected',true);
		$('.has_selected').removeClass('has_selected');
	}
});


/*Add subjectivities*/
$(document).on('click', '.rqbiAddSubject', function() {
	$('.addSubjDiv').show();
	var addsubj = $('.rqbiAdditionalSubj').val().trim();

	if ( addsubj != '') {
		data={};
		if($('.rqbiAddDueDate').val()!='0'){
			due_condition = $('.rqbiAddDueDate').val();
			if (due_condition=='') {
				data.new_due_condition = $('.rqbiAddDueDate option:selected').html();
			} else {
				data.due_condition = due_condition;
			}
		}
		$new_due =[];
		$new_due_i = 0;
		$('.add_due_option').each(function() {
			$new_due[$new_due_i] = $(this).html();
			$new_due_i++;
		});

		if ($new_due.length > 0) {
			data.add_new_due = $new_due;
		}

		if ($('.rqbiAddDueDate').attr('data-add_new_date') != undefined && $('.rqbiAddDueDate').attr('data-add_new_date') != false) {
			add_due_date = $('.rqbiAddDueDate').attr('data-add_new_date');
			var date_split = add_due_date.split('-');
			data.due_date = date_split[2] + '-' + date_split[0] + '-' + date_split[1];
			
		} else {
			due_date = '';
		}
		$('.rqbiAdditionalSubj').removeClass('redBorder');
		$('.add_sub_datepicker').datepicker('update', '');
		var listcount = $('.rqbiSubjList').length;
		listcount++;

		coverage_gl = $('#typeGL').prop('checked');
		coverage_liq = $('#typeLiquor').prop('checked');
		coverage_ocp = $('#typeOCP').prop('checked');
		if (coverage_gl == true && coverage_liq == false && coverage_ocp == false) {
			coverage_type = 1;
		} else if (coverage_gl == false && coverage_liq == true && coverage_ocp == false) {
			coverage_type = 2;
		} else if (coverage_gl == false && coverage_liq == false && coverage_ocp == true) {
			coverage_type = 3;
		} else if (coverage_gl == true && coverage_liq == true && coverage_ocp == false) {
			coverage_type = 4;
		}
		var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();

		data.com_id = com_id;
		data.acct_id = acc_id;
		data.rqbi_id = rqbi_id;
		data.coverage_type = coverage_type;
		data.subjectivity_name = addsubj;
		data.created_by = localStorage.getItem('usernumericid');
		data.is_checked = 1;
		data.is_userdefined = 1;
		data.is_active = 1;
		data.created_by = localStorage.getItem('usernumericid');
		
		$.ajax({
			url: laravel_url+"/add_new_subjectivities",
			type:'post',
			data:data,
			success:function(response) {
				var addRow = '<div class="pull-left mt-0 subjLists rqbiSubjList rqbiSubjList_'+listcount+'"><div class="custom-control custom-checkbox col-sm-12 displayTableCell"><input type="checkbox" class="custom-control-input user_subjchkbx due_validate" id="subjCkbx_'+listcount+'" data-rid="'+response.rid+'" data-listid="'+listcount+'" name="subjCkbx_'+listcount+'"><label class="custom-control-label pull-left sub_name" for="subjCkbx_'+listcount+'">'+addsubj+'</label><small class="subjectivityDate subjectivityDate_'+listcount+' col-md-12 p-0 pull-left"></small></div></div><div class="pull-left subjDuedate subjDuedate_'+listcount+'"><select  class="form-control col-sm-10 rqbiSubjDueDate rqbiSubjDueDate_'+listcount+' ml-0 pull-left pl-2 user_due_condition" id="rqbiSubjDueDate_'+listcount+'" name="rqbiSubjDueDate_'+listcount+'" tabindex="-1" data-listid="'+listcount+'"><option value="0">Select</option>'+response.due_div+'</select><div class="input-group col-sm-1 date mb-3 p-0 datepicker sub_datepicker pull-left pt-0" data-listid="'+listcount+'" data-date-format="mm-dd-yyyy"><input class="form-control datepickerInput datepickerInput_'+listcount+'" data-listid="'+listcount+'" type="text" style="display: none;"><span class="input-group-addon calendarSelection calendarSelection_'+listcount+' disabled text-primary" data-listid="'+listcount+'"><i class="fa fa-calendar" aria-hidden="true"></i></span></div><button type="button" class="removeSubjRow pull-left" data-listid="'+listcount+'" data-html="true" data-toggle="tooltip" data-original-title="<em>Remove</em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></button><div class="col-sm-12 pull-left p-0"><input type="text" maxlength="10" data-listid="'+listcount+'" class="form-control col-sm-10 addDueDate addDueDate_'+listcount+'" id="addDueDate_'+listcount+'" name="addDueDate_'+listcount+'" placeholder="Add New" onfocusout="getDueDate('+listcount+')" style="display: none;"></div></div>';
				$(".addSubjDiv").append(addRow);
				$('#subjCkbx_'+listcount).prop('checked',true);
				if ($('.rqbiAddDueDate').attr('data-add_new_due') != undefined && $('.rqbiAddDueDate').attr('data-add_new_due') != false) {
					$('.rqbiAddDueDate').removeAttr('data-add_new_due');
					$('.rqbiAddDueDate').removeAttr('data-add_new_date');
					
				}
				if (response.selected_due_id != '') {
					$('.rqbiSubjDueDate_'+listcount+' '+'option[value="'+response.selected_due_id+'"]').attr('selected',true);
					var selected_due = $('.rqbiSubjDueDate_'+listcount+' '+'option[value="'+response.selected_due_id+'"]').html();
					if (selected_due == "Due Date - Calendar Selection") {
						$('.calendarSelection_'+listcount).removeClass('disabled');
						if ($('.rqbiAddDueDate').attr('data-add_new_date')!=undefined && $('.rqbiAddDueDate').attr('data-add_new_date')!=false) {
							$('.rqbiAddDueDate').removeAttr('data-add_new_date');
							$('.subjectivityDate_'+listcount).text('').text(add_due_date);
							$('.sub_datepicker [data-listid="'+listcount+'"]').datepicker('update',add_due_date)
						}
					}
				}
				
				
				$('#subjListCount').val(listcount);
				$('.rqbiAdditionalSubj').val('');
				$('.rqbiAddDueDate option[value="0"]').prop('selected',true);
				$('.add_due_option').remove();
				$('.add_calendarSelection').addClass('disabled');

				load_datepicker();
				
			},
			error: function() {
			}
		});

		
	} else {
		new PNotify({ title: 'Error', text: 'Please Enter Additional Subjectivity', delay: 1500, type: 'error' });
		$('.rqbiAdditionalSubj').addClass('redBorder');
	} 
});

	

 
$(document).on("click", ".removeSubjRow", function() {
    var listid = $(this).attr('data-listid');
    $('.subjDeletePopup').trigger('click');
    $('#subj_delete_ok').attr('data-listid', listid);
});

$(document).on("click", "#subj_delete_ok", function() {
	var listid = $(this).attr('data-listid');
	var sub_id = $('#subjCkbx_'+listid).data('user_sub_id');
	var rid = $('#subjCkbx_'+listid).data('rid');
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	data = {};
	data.acct_id = acc_id;
	data.com_id = com_id;
	data.rqbi_id = rqbi_id;
	data.rid = rid;
	data.sub_id = sub_id;
	data.is_userdefined = 1;
	coverage_gl = $('#typeGL').prop('checked');
	coverage_liq = $('#typeLiquor').prop('checked');
	coverage_ocp = $('#typeOCP').prop('checked');
	if (coverage_gl == true && coverage_liq == false && coverage_ocp == false) {
		data.coverage_type = 1;
	} else if (coverage_gl == false && coverage_liq == true && coverage_ocp == false) {
		data.coverage_type = 2;
	} else if (coverage_gl == false && coverage_liq == false && coverage_ocp == true) {
		data.coverage_type = 3;
	} else if (coverage_gl == true && coverage_liq == true && coverage_ocp == false) {
		data.coverage_type = 4;
	}
	data.is_active = 1;
	data.delete = 0;
	$.ajax({
		url: laravel_url+"/delete_user_subjectivities",
		type:'post',
		data:data,
		success:function(response){
			$('.rqbiSubjList_'+listid).remove();
    		$('.subjDuedate_'+listid).remove();
		},
		error: function(){
		}
	});
    $('.rqbiSubjList_'+listid).remove();
    $('.subjDuedate_'+listid).remove();
    // var listid = $('#subjListCount').val();
    // listid--;
	// $('#subjListCount').val(listid);
});


function load_datepicker() {
    $('.sub_datepicker').datepicker({
		format: 'mm-dd-yyyy',
		// startDate: '-3d'
		autoclose: true,
		todayHighlight: true,
		changeMonth: true,
		changeYear: true,
	}).on('changeDate', function(e) {
		var listcount = $(this).data('listid');
		var rid = $("#subjCkbx_"+listcount).data('rid');
		var selectedDate = $('.datepickerInput_'+listcount).val();
		var date_split = selectedDate.split('-');
		var due_date = date_split[2] + '-' + date_split[0] + '-' + date_split[1];
		$('.subjectivityDate_'+listcount).text('').text(selectedDate);
		data = {rid:rid,due_date:due_date,is_checked:1,is_active:1};
		if ($("#subjCkbx_"+listcount).hasClass('user_subjchkbx') == true) {
			data.rid = $("#subjCkbx_"+listcount).data('rid');
			var sub_type = 'user_sub';
		} else {
			data.rid = $("#subjCkbx_"+listcount).data('rid');
			var sub_type = 'pre_sub';
		}
		add_subjectivities(data,sub_type,listcount);
	});
}

$(document).on('keypress','.addDueDate,.userAddDueDate',function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});

function duedate_validation() {

	if($('.subjAccordHeader').attr('sub_retrieved') == undefined || $('.subjAccordHeader').attr('sub_retrieved') == false) {
		var return_value = get_subjectivities(1);
	} else {
		var return_value = check_due_validation(1);
	}
	return return_value;
}

function check_due_validation(return_value) {
	var due_validate = 0;
	$(".due_validate:checked").each(function() {
		var listcount = $(this).attr('data-listid');
		var due_condition = $(".rqbiSubjDueDate_"+listcount).val();
		var due_condition_val = $(".rqbiSubjDueDate_"+listcount+" option:selected").html();
		if (due_condition == 0) {
			$(".rqbiSubjDueDate_"+listcount).addClass('redBorder');
			due_validate = 1;
		} else {
			$(".rqbiSubjDueDate_"+listcount).removeClass('redBorder');
		}
		if (due_condition_val == "Add New") {
			var addnew_val = $('.addDueDate_'+listcount).val();
			if (addnew_val=='') {
				$('.addDueDate_'+listcount).addClass('redBorder');
				due_validate = 1;
			}
		}
    });
	if (due_validate == 1) {
		if ($('.subjAccordHeader').hasClass('collapsed') == true) {
			$('.subjAccordHeader').removeClass('collapsed');
			$('#subjectivitiesAccord').addClass('show');
		}

		$('html,body').animate({
			scrollTop: $(".subjAccordHeader").offset().top - 100},'slow');
		$('.subjAccordHeader').attr('style','border: 1px solid #ed4613;');
		if (return_value == 1)
			return false;
	} else {
		$('.subjAccordHeader').removeAttr('style');
		if(return_value == 1)
			return true;
	}
}
