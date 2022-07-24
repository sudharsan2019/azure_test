/****** Quota share ************/

function quota_share_function(response){  
	$('#xlQtaShare_div').html('');
	if($('#xlQtaShare_div').html().trim() == ''){
		try {
			$.ajax({
				url: '/brokerage/template/xl_qtaShare.php',
				method: 'post',
				success: function(res) {    
					if (response.select_data.length == 0) {  
						$('#xlQtaShare_div').html(res);	   
						xl_add_quota_share({}, 0);
					}

					if (response.select_data.length > 0) {   
						$('#xlQtaShare_div').html('');	  
						var obj = response.select_data;   
						for (quota_share in obj) {   
							var rid = obj[quota_share]['rid'];    
							if (quota_share == 0) {
								$('#xlQtaShare_div').html(res);
								retrieve_select_data(rid, quota_share, obj);
							} else {  
								quota_share_addFunction(quota_share);
								retrieve_select_data(rid, quota_share, obj);

							}


						}
						var obj_total = response.total_data;
						retrieve_total_data(obj_total);
						$(".xlQuoteTable").attr('data-retreivequota', 1);
					}

					
				},
				error: function(xhr, status, error){
					var err = JSON.parse(xhr.responseText);
					new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
				}
			});
		} catch(err) {
			console.log(err);

		}
	}
}

$(document).on('blur', '.xlQta_nameIns' ,function() { 
	var xlQta_nameIns = $(this).val().replace(/[$,]/g, '');
	var share_no = $(this).closest('.quota_share_row').data('share');   
	var asic = ["asic", "ategrityspecialtyinsurancecompany" , "ategrity"];
	var name_of_co_insurer_string = xlQta_nameIns.replace(/\s/g,'');
	var name_of_co_insurer_lower = name_of_co_insurer_string.toLowerCase();
	xl_add_quota_share({name_of_co_insurer:xlQta_nameIns},share_no);
	
	
	for (var i=0; i<asic.length; i++) {
		var name = asic[i];
		if (name == name_of_co_insurer_lower) {
			var occurence = ''; 
			var aggregate = '';
			var occurence_other = null;
			var aggregate_other = null;
			var occurence = $(".xlType_occuLimit").val().replace(/[$,]/g, ''); 
			if (occurence == 'other') {
				var occurence_other = $(".xlType_occuLimit_other").val().replace(/[$,]/g, '');  
			} 
			xl_add_quota_share({each_occurence:occurence, each_occurence_others:occurence_other}, share_no);
			
			var aggregate = $(".xlType_aggreLimit").val().replace(/[$,]/g, '');
			if (aggregate == 'other') {
				var aggregate_other = $(".xlType_aggreLimit_other").val().replace(/[$,]/g, '');
			}
			xl_add_quota_share({aggregate_limit:aggregate, aggregate_limit_others:aggregate_other}, share_no);
			
			if (occurence == 'other') {
				$("#xlQta_occurLt_"+share_no).val(occurence);
				xlOtherSelect($("#xlQta_occurLt_"+share_no));
				$("#xlQta_occurLt_"+share_no+"_other").val(occurence_other);
			} else {
				$("#xlQta_occurLt_"+share_no).val(occurence).prop("selected",true);
				xlOtherSelect($("#xlQta_occurLt_"+share_no));
			}
			
			if (aggregate == 'other') {
				$("#xlQta_aggreLt_"+share_no).val(aggregate);
				xlOtherSelect($("#xlQta_aggreLt_"+share_no));
				$("#xlQta_aggreLt_"+share_no+"_other").val(aggregate_other);
			} else {
				$("#xlQta_aggreLt_"+share_no).val(aggregate).prop("selected",true);
				xlOtherSelect($("#xlQta_aggreLt_"+share_no));
			}
			
			break;
		}
	}
});

$(document).on('blur', '.xlQta_policyNo' ,function() { 
	var xlQta_policyNo = $(this).val().replace(/[$,]/g, '');
	var share_no = $(this).closest('.quota_share_row').attr('data-share');     
	xl_add_quota_share({policy_number:xlQta_policyNo},share_no)    
});


$(document).on('blur', '.xlQta_share' ,function() { 
	var xlQta_share = $(this).val().replace(/[$,]/g, '');
	var share_no = $(this).closest('.quota_share_row').attr('data-share');     
	xl_add_quota_share({percentage_share_layer:xlQta_share},share_no)    
});

$(document).on('change', '.xlQta_occurLt', function() {
	var xlQta_occurLt = $(this).val().replace(/[$,]/g, '');    
	var share_no = $(this).closest('.quota_share_row').attr('data-share'); 
	if (xlQta_occurLt == 'other') {
		var xlQta_occurLt_other = $("#xlQta_occurLt_other_"+share_no).val();  
	} else {
		var xlQta_occurLt_other = null;   
	}
	xl_add_quota_share({each_occurence:xlQta_occurLt, each_occurence_others:xlQta_occurLt_other}, share_no);
});

$(document).on('change', '.xlQta_occurLt_other', function() {
	var xlQta_occurLt_other = $(this).val().replace(/[$,]/g, '');
	var share_no = $(this).closest('.quota_share_row').attr('data-share'); 
	xl_add_quota_share({each_occurence_others:xlQta_occurLt_other}, share_no);
});

$(document).on('change', '.xlQta_aggreLt', function() {
	var xlQta_aggreLt = $(this).val().replace(/[$,]/g, '');    
	var share_no = $(this).closest('.quota_share_row').attr('data-share'); 
	if (xlQta_aggreLt == 'other') {
		var xlQta_aggreLt_other = $("#xlQta_aggreLt_other_"+share_no).val();  
	} else {
		var xlQta_aggreLt_other = null;
	}
	xl_add_quota_share({aggregate_limit:xlQta_aggreLt, aggregate_limit_others:xlQta_aggreLt_other}, share_no);
});

$(document).on('change', '.xlQta_aggreLt_other', function() {
	var xlQta_aggreLt_other = $(this).val().replace(/[$,]/g, '');
	var share_no = $(this).closest('.quota_share_row').attr('data-share'); 
	xl_add_quota_share({aggregate_limit_others:xlQta_aggreLt_other}, share_no);
});

function xl_add_quota_share (value, share_no) {     
	var quota_id = $('#quota_share_'+share_no).attr('data-rid');    console.log("rid"+quota_id);
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	if (quota_id != '' && quota_id != null) {
		value.rid = quota_id;
		value.updated_by =  localStorage.getItem('usernumericid');
	} else {
		value.created_by =  localStorage.getItem('usernumericid');
	}
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.rqbi_id = rqbi_id;
	try {
		$.ajax({
			url: laravel_url+"/xl_add_quota",
			type:'post',
			data:value,
			success: function (response) {
				if (quota_id == '' || quota_id == null) {   console.log(response.quota_id);
					$('#quota_share_'+share_no).attr("data-rid", response.quota_id); 
				}
				var obj = response.total_data;
				retrieve_total_data(obj);
				
			}
		}); 
	} catch(err) {
		console.log(err);   
	}
}




function xl_del_quota (value,delete_quota) {    
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	value.rid = delete_quota;
	value.deleted_by = localStorage.getItem('usernumericid');
	value.acct_id = acc_id;
	value.com_id = com_id;
	value.deleted_on = '';
	try {
		$.ajax({
			url: laravel_url+"/xl_del_quota",
			type:'post',
			data:value,
			success: function (response) {
				
				var obj = response.total_data;
				retrieve_total_data(obj);
				
			}
		}); 
	} catch(err) {
		console.log(err);   
	}
	
}

function get_quotashare (com_id) {   
	var acc_id = $('.session_hide_tab').find('.active').find('.accountid').val();
	try {
		$.ajax({
			url: laravel_url+"/xl_get_quota",
			type: 'post',
			data: {com_id : com_id, acct_id : acc_id, rqbi_id : rqbi_id},
			success:function(response){    console.log(response);
				var retreive_quota =  $(".xlQuoteTable").attr('data-retreivequota');   
				if(retreive_quota != 1){
					quota_share_function(response);
				}
			}
			
		})
	} catch(err) {
		console.log(err);   
	}
}



function retrieve_select_data(rid, quota_share, obj){
	$("#quota_share_"+quota_share).attr('data-rid',rid);
	var name_of_co_insurer = obj[quota_share]['name_of_co_insurer'];
	var policy_number = obj[quota_share]['policy_number'];
	var percentage_share_layer = obj[quota_share]['percentage_share_layer'];
	var each_occurence = obj[quota_share]['each_occurence'];
	var each_occurence_other = obj[quota_share]['each_occurence_others'];
	var aggregate_limit = obj[quota_share]['aggregate_limit'];
	var aggregate_limit_other = obj[quota_share]['aggregate_limit_others'];
	
	$("[data-rid="+rid+"]").find('.xlQta_nameIns').val(name_of_co_insurer);
	$("[data-rid="+rid+"]").find('.xlQta_policyNo').val(policy_number);
	$("[data-rid="+rid+"]").find('.xlQta_share').val(percentage_share_layer);
	
	if (each_occurence == 'other') {
		if (each_occurence_other != null) {  
			var each_occurence_other1 = parseInt(each_occurence_other).toLocaleString();
		} else {   
			var each_occurence_other1 = '';
		}
		
		$("[data-rid="+rid+"]").find('.xlQta_occurLt').val(each_occurence).change();
		$("[data-rid="+rid+"]").find('.xlQta_occurLt_other').val(each_occurence_other1);
	} else if (each_occurence == null) {
		$("[data-rid="+rid+"]").find('.xlQta_occurLt').val(0).prop("selected",true);
	} else {
		$("[data-rid="+rid+"]").find('.xlQta_occurLt').val(each_occurence).prop("selected",true);
	}
	
	
	if (aggregate_limit == 'other') {
		if (aggregate_limit_other != null) {  
			var aggregate_limit_other1 = parseInt(aggregate_limit_other).toLocaleString();
		} else{   
			var aggregate_limit_other1 = '';
		}
		
		$("[data-rid="+rid+"]").find('.xlQta_aggreLt').val(aggregate_limit).change();
		$("[data-rid="+rid+"]").find('.xlQta_aggreLt_other').val(aggregate_limit_other1);
	} else if (aggregate_limit == null) {
		$("[data-rid="+rid+"]").find('.xlQta_aggreLt').val(0).prop("selected",true);
	} else {
		$("[data-rid="+rid+"]").find('.xlQta_aggreLt').val(aggregate_limit).prop("selected",true);
	}
}

function retrieve_total_data(obj){
	if (obj != null) {
		var percentage_share = obj[0]['sum_of_percentage_share_layer']!=null ? parseInt(obj[0]['sum_of_percentage_share_layer']) : 0;
		var total_each_occurence = obj[0]['sum_of_each_occurence']!=null ? parseInt(obj[0]['sum_of_each_occurence']) : 0;
		var total_each_occurence_others = obj[0]['sum_of_each_occurence_others']!=null ? parseInt(obj[0]['sum_of_each_occurence_others']) : 0;
		var total_aggregate_limit = obj[0]['sum_of_aggregate_limit']!=null ? parseInt(obj[0]['sum_of_aggregate_limit']) : 0;
		var total_aggregate_limit_others = obj[0]['sum_of_aggregate_limit_others']!=null ? parseInt(obj[0]['sum_of_aggregate_limit_others']) : 0;
		var each_occurence_total = total_each_occurence + total_each_occurence_others;   console.log(each_occurence_total);
		var aggregate_limit_total = total_aggregate_limit + total_aggregate_limit_others;   console.log(aggregate_limit_total);
		$('.xlQta_share_tot').val(percentage_share);
		$('.xlQta_occurLt_tot').val(each_occurence_total);
		$('.xlQta_aggreLt_tot').val(aggregate_limit_total);

		if ($('.xlQta_share_tot').val() > 100) {
			$('.xlQta_share').addClass('border-red');
			new PNotify({ title: 'Warning', text: 'Total quota share should not greater than 100', delay: 1000, type: 'Warning' });
		} else {
			$('.xlQta_share').removeClass('border-red');
		}
	}
}