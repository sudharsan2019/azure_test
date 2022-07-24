var policy_interval = 0;
var effective_from = '';
var expiry_date = '';
var coverage_ret = '';
var loc_data_ary = '';
var tig_row = new Array();
var source = null;
var empty_source = null;
var is_focused = false;
var cb_userid = localStorage.getItem('usernumericid');
var prem_flag = null;
var naics = 0; /*Naics update*/
var nodata = 0;
var premium_flag_check = null;

$(document).on('change', "#rqbieffdate", function(e) {

	e.preventDefault();

	effective_from = $('#rqbieffdate').val();
	expiry_date = $('#rqbiexpdate').val();

 });

var coverage_type_array = [];
	$("input[name='CoverageType']:checked").each(function(){
		var value = $(this).val();
	    coverage_type_array.push(value);
	});

    coverage_ret = coverage_type_array.toString();

function class_builder_loc_detatils(rowCount){ 
	$('#cbContinueFullquote').addClass('disabled');
	return $.ajax({
		type: "post",
		url: laravel_url+"/get_class_builder_location",
		data:{
		'accid':accid,'com_id':com_id
		},
		success: function(data) {
		
            if(rowCount){
            	$('#cbLocSelect_'+rowCount).find('option').remove();
				$('#cbLocSelect_'+rowCount).append(data);
			}else{
				$('#cbLocSelect_1').find('option').remove();
				$('#cbLocSelect_1').append(data);	
			} 
        	
        	menu_permission();
        	rqbi_responsive();
		},
		error: function(){
		    new PNotify({ title: 'Error', text:'Getting backend error' , delay: 1500, type: 'error' });
		},
		complete :function(){		
			// get_location_compostive_rating();
			setTimeout (function () { 
	            $('#cbContinueFullquote').removeClass('disabled');
	        }, 2900);
		}
	});

	}

$(document).on('click select','.cbClasscode',function(e){
	var cls_val = $(this).val();
	var pre_classcode_id = $(this).closest('.cbuildRow').attr('data-truniqueid');
	$(this).attr('data-previous_classcode_id',pre_classcode_id);
	if(cls_val!='' && cls_val.length >= 5){ //Naics update
		$(this).attr('data-previous_classcode',cls_val);
		
	}
});

var focus_i = 1;
$(document).on('focus','.cbLocSelect',function(e){
	if(focus_i==1){
		var previous_loc = $(this).val();
		$(this).attr('data-previous_location',previous_loc);
	}
	focus_i++;
});


$(document).on('keyup','.rqbiRemarks',function(e){
	var remarks_value = $(this).val();
	remarks_value = charac_numb(remarks_value);
	var rowid = $(this).attr('data-rowid');
	if (parseInt(remarks_value.length) > 25) {
		$('.rqbiRemarks_valdtn_' + rowid).css('display', 'block');
        $('.rqbiRemarks_valdtn_' + rowid).css('color', 'red');
        $('#rqbiRemarks_'+ rowid).addClass('redBorder');
	}else{
		$('.rqbiRemarks_valdtn_' + rowid).css('display', 'none');
		$('#rqbiRemarks_'+ rowid).removeClass('redBorder');
	}	
	$('#rqbiRemarks_'+ rowid).val(remarks_value);
});

$(document).on('focusout','.cbClasscode,.cbLocSelect,.rqbiRemarks',function(e){
	focus_i=1;
	e.preventDefault();

	remove_red_color_border_cb();

	var tg_rowid = $(this).attr('data-rowid');

	var current_val = $(this).val().substr(0,6).trim(); //Naics update
	
	jQuery('#cbClasscode_'+tg_rowid).bind('focus', function(){
	  is_focused = true;
	});

	jQuery('#cbLocSelect_'+tg_rowid).bind('focus', function(){
	  is_focused = true;
	});

	jQuery('#rqbiRemarks_'+tg_rowid).bind('focus', function(){
	  is_focused = false;
	});

	if($('.compositeRateDiv').css('display')=='block' && $(this).hasClass('rqbiRemarks')==false){
		if($(this).hasClass('cbClasscode')==true){
			var pre_classcode_id = $(this).attr('data-previous_classcode_id');
			var pre_classcode = $(this).attr('data-previous_classcode');
			setTimeout(function(){ 
				if(current_val.length >= 5 && pre_classcode != current_val && pre_classcode!='' && hasoption==1 && $('#clscd_change_Popup').css('display')=='none'){//Naics update
					$.ajax({
						url: laravel_url+"/check_classcode_used",
						method: 'post',
						data:{'accid': accid,'com_id' : com_id, 'pre_classcode_id':pre_classcode_id},
						dataType: 'json',
						success: function(response) {
							if(response.check_flag==1){
								alert_check = 1;
								$('.clscd_change_Popup').attr('data-rowid',tg_rowid)
								$('.clscd_change_Popup').trigger('click');
							}else{
								if($('#cbClasscode_'+tg_rowid).val()!= $('#cbClasscode_'+tg_rowid).attr('data-uicheck_class')){
									save_classcode_location_remarks(tg_rowid);		
								}
							}

							sic_work('store_process');	
							
						},
						error: function(){
				
						},
						complete :function(){

						}
					});
				}
			}, 500);
		}
	
		if($(this).hasClass('cbLocSelect')==true){
			
			var row_unic = $('.cbRow_'+tg_rowid).attr('data-truniqueid');
			var previous_loc = $(this).data('previous_location');

			$.ajax({
				url: laravel_url+"/check_location_used",
				method: 'post',
				data:{'accid': accid, 'com_id' : com_id, 'classcode_id':row_unic, 'previous_loc_id':previous_loc},
				dataType: 'json',
				success: function(response) {
					if(response.check_flag==1){
						alert_check = 1;
						$('.loc_change_Popup').attr('data-rowid',tg_rowid)
						$('.loc_change_Popup').trigger('click');
					}else{
						if($('#cbLocSelect_'+tg_rowid).val()!= $('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc')){
							save_classcode_location_remarks(tg_rowid);	
						}
						
					}
				},
				error: function(){
		
				},
				complete :function(){
					
				}
			});
	
		}
	}else{
		
		if($('#rqbiRemarks_'+tg_rowid).val()!= $('#rqbiRemarks_'+tg_rowid).attr('data-uicheck_marks') || $('#cbLocSelect_'+tg_rowid).val()!= $('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc') || $('#cbClasscode_'+tg_rowid).val()!= $('#cbClasscode_'+tg_rowid).attr('data-uicheck_class')){
			save_classcode_location_remarks(tg_rowid);	
		}
		
	}
	
});

function save_classcode_location_remarks(tg_rowid){

	remove_red_color_border_cb();

	var tg_cloneidd = $('.cbRow_'+tg_rowid).attr('data-cloneid');

	var tg_cloneid='';
	if(typeof(tg_cloneidd)!= "undefined" && tg_cloneidd!= null && tg_cloneidd!= '') {
		tg_cloneid=tg_cloneidd;
	}
	else{
		tg_cloneid=0;
	}

	var tg_uniqueid=$('.cbRow_'+tg_rowid).attr('data-truniqueid');
	if(typeof(tg_uniqueid)!= "undefined" && tg_uniqueid!= null && tg_uniqueid!= '') {
	tg_uniqueid=tg_uniqueid;
	}
	else{
		tg_uniqueid=tg_rowid;
	}

	var class_glt = $('#cbClasscode_'+tg_rowid).val();
	var tg_cccode = class_glt.substring(0,6).trim(); //Naics change

	var tg_ccdesc = '';

	var tg_locidd =$('#cbLocSelect_'+tg_rowid).val();
	var tg_locid='';
	if(tg_locidd!='' && tg_locidd!=null && tg_locidd!=0){
		var tg_locid1=tg_locidd.split("-");
		tg_locid=tg_locid1[0].trim();
	}

	var tg_exp =$('#rqbiExposure_'+tg_rowid).val();
	if(typeof(tg_exp)!= "undefined" && tg_exp!= null && tg_exp!='') {
		tg_exp=tg_exp;
	}

	var tg_remarks = $('#rqbiRemarks_'+tg_rowid).val();
	var tg_remarks_valid = 0;
	if ( $('.rqbiRemarks_valdtn_'+tg_rowid).css('display') == 'block') {
		tg_remarks_valid = 1;
	}
	var tg_rate = $('#rqbiFinalRate_'+tg_rowid).val();
	var tg_cr_debit = $('#rqbiCreditDebit_'+tg_rowid).val();

	var tg_ifanyy = $('input[type="checkbox"]#rqbiIfany_'+tg_rowid+':checked').val(); //radio
	var tg_ifany='';
	if(tg_ifanyy=='on'){
		tg_ifany=1;
	}

	var tg_includedd =$('input[type="checkbox"]#rqbiIncluded_'+tg_rowid+':checked').val(); // radio button
	var tg_included='';
	if(tg_includedd=='on'){
		tg_included=1;
	}

	var tg_premium = $('#rqbiPremium_'+tg_rowid).val();

	var tg_addres1 = $('#locAddress1_'+tg_rowid).val();

	var tg_prem_base ='';

	var tg_selected_prem_base = $('#classbuildpremBasis_'+tg_rowid).val();

	var rt_coverage_type1 = coverage_ret;

	if(typeof(rt_coverage_type1) == "undefined" || rt_coverage_type1 == null || rt_coverage_type1 == '' || rt_coverage_type1 == 0) {

		rt_coverage_type1 = $(this).attr('data-cover_type');
	}

	var tg_liquor_grade = $('.liquorgradeval_'+tg_rowid).text();

	var tg_tr_code = $('#locZipcode_'+tg_locid).val();

	if(tg_addres1!=''){

		$('#locAddress1_'+tg_rowid).removeClass('errorBorder');

		if((tg_cccode!='' && tg_cccode!=null && tg_locid!='' && tg_locid!=null && tg_locid!=0 )){
			
			if(tg_cccode.length >= 5 && tg_remarks_valid != 1 && $('#Invalid_cbClasscode_'+tg_rowid).css('display') == 'none'){

				if(rt_coverage_type1!=''){

					if(tg_locid!='' && tg_exp!=''){
						setTimeout(function(){ 
						common_save_class_builder(accid,com_id,rqbi_id,tg_uniqueid,tg_cloneid,tg_cccode,tg_ccdesc,tg_locid,tg_exp,tg_remarks,tg_rate,tg_cr_debit,tg_ifany,tg_included,tg_premium,tg_prem_base,tg_liquor_grade,rt_coverage_type1=null,tg_tr_code,tg_createuser=cb_userid,tg_updateuser=cb_userid,tg_rowid,tg_selected_prem_base);	
						}, 2000);	
					}else{
						//setTimeout(function(){ 
						common_save_class_builder(accid,com_id,rqbi_id,tg_uniqueid,tg_cloneid,tg_cccode,tg_ccdesc,tg_locid,tg_exp,tg_remarks,tg_rate,tg_cr_debit,tg_ifany,tg_included,tg_premium,tg_prem_base,tg_liquor_grade,rt_coverage_type1=null,tg_tr_code,tg_createuser=cb_userid,tg_updateuser=cb_userid,tg_rowid,tg_selected_prem_base);
						//}, 1000);
					}
					
				}else{
					new PNotify({ title: 'Error', text:'Please Choose the Coverage' , delay: 1500, type: 'error' });
				}	
				
			}else{

				
			}

		}else{
			//new PNotify({ title: 'Error', text:'Class code and Location,Exposure is mandatory' , delay: 1500, type: 'error' });
		}
	}else{
		new PNotify({ title: 'Error', text:'Please fill the Location Details' , delay: 1500, type: 'error' });
		$('#locAddress1_'+tg_uniqueid).addClass('errorBorder');
	}

}


function common_save_class_builder(accid,com_id,rqbi_id,tg_uniqueid,tg_cloneid,tg_cccode,tg_ccdesc,tg_locid,tg_exp,tg_remarks,tg_rate,tg_cr_debit,tg_ifany,tg_included,tg_premium,tg_prem_base,tg_liquor_grade,rt_coverage_type1,tg_tr_code,tg_createuser,tg_updateuser,tg_rowid,tg_selected_prem_base){

	if($('#Invalid_cbClasscode_'+tg_rowid).css('display') == "none"){
		$.ajax({
			type: "post",
			url: laravel_url+"/common_save_class_builder_section",
			data:{
			'accid': accid,'com_id':com_id,'rqbi_id':rqbi_id,'unique_id':tg_uniqueid,'clone_unique_id':tg_cloneid,'class_code':tg_cccode,'class_desc':tg_ccdesc,'location_id':tg_locid,'exposure':tg_exp,'remarks':tg_remarks,'final_rate':tg_rate,'credit_debit':tg_cr_debit,'if_any':tg_ifany,'is_included':tg_included,'premium':tg_premium,'prem_base':tg_prem_base,'liquor_grade':tg_liquor_grade,'cov_type':rt_coverage_type1,'t_code':tg_tr_code,'created_by':tg_createuser,'updated_by':tg_updateuser, 'selected_prem_base_id':tg_selected_prem_base
			},
			dataType: 'json',
			success: function(data) {
				var row_db_rid = data.rid;
				//new PNotify({ title: 'Success', text: data.message, delay: 1500, type: 'success' });
				$('.cbRow_'+tg_rowid).attr('data-truniqueid',row_db_rid);
				$('#cbClasscode_'+tg_rowid).attr('data-uicheck_class',data.class_code);
				$('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc',data.location_id);
				
				tig_row.push(row_db_rid);

				if(data.message == 'Update is Success...'){
					$('#cbClasscode_'+tg_rowid).attr('data-uicheck_class',tg_cccode);
					$('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc',tg_locid);
					$('#rqbiExposure_'+tg_rowid).attr('data-uicheck_expo',tg_exp);
					$('#rqbiRemarks_'+tg_rowid).attr('data-uicheck_marks',tg_remarks);
					enabled_continueTofullQuote();
					checkContinueToFullQuoteStatus();

						if (is_focused == true) {

							if($("#cbClasscode_"+tg_rowid).val()!='' && $("#cbLocSelect_"+tg_rowid).val()!='' && $('#rqbiExposure_'+tg_rowid).val()!=''){

								if(($("#cbClasscode_"+tg_rowid).val().length >= 5 && $('#cbClasscode_'+tg_rowid).val() == $('#cbClasscode_'+tg_rowid).attr('data-uicheck_class')) || ($('#cbLocSelect_'+tg_rowid).val() == $('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc'))){ //Naics update
									$('#rqbiExposure_'+tg_rowid).attr('data-uicheck_expo','');
										setTimeout(function(){
											$("#rqbiExposure_"+tg_rowid).trigger("focusout");
										}, 2000);
								}
							
							}
						}

					} else {

						if (is_focused == true) { // If before(exposure) given instead of class and location value triggered
							
							if($("#cbClasscode_"+tg_rowid).val()!='' && $("#cbLocSelect_"+tg_rowid).val()!='' && $('#rqbiExposure_'+tg_rowid).val()!=''){

								if(($("#cbClasscode_"+tg_rowid).val().length >= 5 && $('#cbClasscode_'+tg_rowid).val() == $('#cbClasscode_'+tg_rowid).attr('data-uicheck_class')) || ($('#cbLocSelect_'+tg_rowid).val() == $('#cbLocSelect_'+tg_rowid).attr('data-uicheck_loc'))){ //Naics update
									$('#rqbiExposure_'+tg_rowid).attr('data-uicheck_expo','');
										setTimeout(function(){
											/*$("#rqbiExposure_"+tg_rowid).trigger("focusout"); Unwanted ajax call comment*/
										}, 2000);
								}
							
							}
						}
					}
				
			},
			error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
				if(err == ""){
					$('#Invalid_cbClasscode_'+rowid).css('display','block');
				}
		    	//new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete :function(){
				remove_red_color_border_cb();
				disable_compostive_rating();
				sic_work('store_process');
	            get_classcode_compostive_rating();
				retrive_compostive_rating();
				// save_clscd_prembasis(tg_rowid);	
			}
		});
	}
 
}

function rqbi_class_code_retrive(com_id,accid){

	if(com_id!='' && com_id!=null){

	  	$.ajax({
			type: "post",
			url: laravel_url+"/class_code_section_retrive",
			data:{
			'accid': accid,'com_id':com_id},
			success: function(data) {
				var rqbi_clas_area='';
				$('#cbAppendRow').html('');
				var obj = JSON.parse(data);
				
				if((obj.length > 0 && obj!='')){
					
					var get_loc = new Array();

					for (var i in obj) {

					if(obj[i].unique_id!= null ) { var get_unique_id =obj[i].unique_id; } else { var get_unique_id =""; }
					if(obj[i].rid!= null ) { var get_unique_rid =obj[i].rid; } else { var get_unique_rid =""; }
		            if(obj[i].clone_unique_id!= null) { var get_cloneuniqueid =obj[i].clone_unique_id; } else { var get_cloneunique_id =""; }
		            if(obj[i].class_code!= null) { var get_class_code =obj[i].class_code; } else { var get_class_code =""; }
		            if(obj[i].class_desc!= null) { var get_class_code_desc =obj[i].class_desc; } else { var get_class_code_desc =""; }
		            if(obj[i].location_id!= null) { var get_locationid =obj[i].location_id; } else { var get_locationid =""; }
		            if(obj[i].exposure!= null && obj[i].exposure != 0) { var get_exposure =numberWithCommas(obj[i].exposure); } else { var get_exposure =""; }
		            if(obj[i].remarks!= null) { var get_remarks =obj[i].remarks; } else { var get_remarks =""; }
		            if(obj[i].final_rate!= null && obj[i].final_rate != 0) { var get_finalrate =obj[i].final_rate} else { var get_finalrate =""; }
		            if(obj[i].credit_debit!= null && obj[i].credit_debit != 0) { var get_creditdebit =obj[i].credit_debit} else { var get_creditdebit =""; }
		            if(obj[i].if_any!= null) { var get_ifany =obj[i].if_any; } else { var get_ifany =""; }
		            if(obj[i].is_included!= null) { var get_isincluded =obj[i].is_included; } else { var get_isincluded =""; }
		            if(obj[i].premium!= null && obj[i].premium != 0) { var get_premium ='$'+numberWithCommas(obj[i].premium); } else { var get_premium =""; }
		            if(obj[i].prem_base!= null) { var get_premium_base =obj[i].prem_base; } else { var get_premium_base =""; }
		            if(obj[i].liquor_grade!= null) { var get_liq_data =obj[i].liquor_grade; } else { var get_liq_data =""; }
		            if(obj[i].coverage_type!= null) { var get_coverage_type =obj[i].coverage_type; } else { var get_coverage_type =""; }
		            if(obj[i].class_rates!= null) { var get_rates =obj[i].class_rates; } else { var get_rates =""; }
		            if(obj[i].territory_code!= null) { var get_teri_code =obj[i].territory_code; } else { var get_teri_code =""; }

		            if(obj[i].final_over_rate!= null && obj[i].final_over_rate != 0) { var get_over_rate =obj[i].final_over_rate; } else { var get_over_rate =""; }
		            if(obj[i].premium_over!= null && obj[i].premium_over != 0) { var get_over_prem ='$'+numberWithCommas(obj[i].premium_over); } else { var get_over_prem =""; }
		            if(obj[i].premium_flag!= null && obj[i].premium_flag != 0) { var premium_flag =obj[i].premium_flag; } else { var premium_flag =""; }
					if(obj[i].selected_prem_base_id!= null) { var selected_prem_base_id =obj[i].selected_prem_base_id; } else { var selected_prem_base_id =""; }

			        var clss_rowid = parseInt(i) + 1;

			        var loc_data = {};
			        tig_row.push(clss_rowid);
			        loc_data.rowid = clss_rowid;
	                loc_data.locid = get_locationid;
	                get_loc.push(loc_data);

	                get_finalrate = parseFloat(get_finalrate).toFixed(2);
	                get_creditdebit = parseFloat(get_creditdebit).toFixed(2);
	                get_over_rate = parseFloat(get_over_rate).toFixed(2);

	                get_finalrate = (isNaN(get_finalrate) == true) ? "" : get_finalrate;
	                get_creditdebit = (isNaN(get_creditdebit) == true) ? "" : get_creditdebit;
	                get_over_rate = (isNaN(get_over_rate) == true) ? "" : get_over_rate;
	               
	                if(get_over_rate!=''){
	                	var change1 = get_finalrate;
	                	var change2 = get_over_rate;
	                	get_over_rate = change1;
	                	get_finalrate = change2;
	                }

	                if(get_over_prem!=''){
	                	var change3 = get_premium;
	                	var change4 = get_over_prem;
	                	get_over_prem = change3;
	                	get_premium = change4;
	                }

	                var ui_get_exposure = get_exposure.replace(/,/g, '');
	                var ui_get_premium = get_premium.replace(/,/g, ''); 
	                ui_get_premium = ui_get_premium.replace(/\$/g, ''); 

	                if (premium_flag == 1 ) {
	                	get_exposure = ui_get_exposure;
	                }
                            
					rqbi_clas_area='<tr class="cbuildRow cbRow cbRow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-trUniqueid="'+get_unique_rid+'"><td class="border_unset pt-9 pl-3"><div class="txttooltip"><input type="text" class="form-control width98_perc mb-0 mt-0 cbClasscode cbClasscode_'+clss_rowid+'" data-rowid="'+clss_rowid+'" placeholder="Code" name="cbClasscode_'+clss_rowid+'" id="cbClasscode_'+clss_rowid+'" value="'+get_class_code+'" data-cover_type="'+get_coverage_type+'" data-uicheck_class="'+get_class_code+'"></div><small><span class="pull-left clas_desc_'+clss_rowid+'">'+get_class_code_desc+'</span></small><br /><small class="pull-left text_color class_arates_'+clss_rowid+'" style="display: none;">* A Rates</small><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbClasscode_'+clss_rowid+'" style="display:none">Invalid Class Code</p></td><td class="border_unset pt-9 pl-2"><select  class="form-control width98_perc cbLocSelect cbLocSelect_'+clss_rowid+' m0" data-rowid="'+clss_rowid+'" data-cloneid="'+get_cloneuniqueid+'" id="cbLocSelect_'+clss_rowid+'" name="cbLocSelect'+clss_rowid+'" data-cover_type="'+get_coverage_type+'" data-uicheck_loc="'+get_locationid+'"></select><small><span class="pull-left terri_code terri_code_'+clss_rowid+' ml-3">TC:<span class="terri_code_number terri_code_number_'+clss_rowid+'"></span></span></small></td><td class="border_unset pt-9"><div class="col-md-12 pull-left pl-0 pr-0"><div class="form-group  mb-1 col-md-12 pull-left p-0"><div class="pl-2 pr-1"><div class="txttooltip"><input type="text" class="form-control mb-0 mt-0 rqbiExposure rqbiExposure_'+clss_rowid+'" data-rowid="'+clss_rowid+'" placeholder="Exposure" name="rqbiExposure_'+clss_rowid+'" id="rqbiExposure_'+clss_rowid+'"  value="'+get_exposure+'" data-cover_type="'+get_coverage_type+'" data-uicheck_expo="'+ui_get_exposure+'"><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbexposure_'+clss_rowid+'" style="display:none">Invalid </p></div></div></div></div></td><td  class="border_unset pt-9"><div class="col-sm-12 pull-left pr-2 pl-2"><div class="col-md-12 pull-left p-0 rqbiFinalRateDiv rqbiFinalRateDiv_'+clss_rowid+'"><div class="col-md-12 p-0 pull-left"><div class="form-group mb-1 pl-0"><div class="input-group col-sm-12 pull-left p-0"><div class="txttooltip"><input type="text" maxlength="19" data-prevamount="" class="form-control mb-0 rqbiFinalRate rqbiFinalRate_'+clss_rowid+'" placeholder="" name="rqbiFinalRate_'+clss_rowid+'" id="rqbiFinalRate_'+clss_rowid+'" data-rowid="'+clss_rowid+'" value="'+get_finalrate+'" data-cover_type="'+get_coverage_type+'" data-uicheck_rate="'+get_finalrate+'"></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_finalrate_'+clss_rowid+'" style="display:none">Invalid </p></div><small class="pl-5 mt-1 ml28 frPrevAmount"><span class="frPrevAmount_'+clss_rowid+'">'+get_over_rate+'</span></small></div></div></div></div></td><td rowspan="2" class="verticalAlignMiddle cbAction" data-rowid="'+clss_rowid+'"><small class="pull-left liquorGrade_'+clss_rowid+'" style="display: none;">Liquor Grade:<span class="pull-right liquorgradeval liquorgradeval_'+clss_rowid+'">'+get_liq_data+'</span></small><small class="pull-left desigContractor" style="display: none;">Designation of Contractor: 5</small><br><span class="btn btn-sm btn-info icon_btn text-white mb-2 cbCloneRow cbCloneRow_'+clss_rowid+'" id="cbCloneRow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-cloneid="'+get_cloneuniqueid+'"  data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span><br><span class="btn btn-sm btn-primary icon_btn mb-2 cbAddRow cbAddRow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Add </em>"><i class="fa fa-plus"></i></span><span class="btn btn-sm btn-primary icon_btn mb-2 isonotes_btn isonotes_btn_'+clss_rowid+' isonotes_btn_design" data-rowid="'+clss_rowid+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="ISO Notes"><img src="../img/isologo3.png" class="isonotes_img_design" style="width: 31px;margin: -6px 0 0 -8px;"></span><br><span class="btn btn-sm btn-danger icon_btn mb-2 removeCbRow removeCbRow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Delete </em>" style="display: none;"><i class="fa fa-trash"></i></span><br><span class="fontSize17 cbDownArrow cbDownArrow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-cover_type="'+get_coverage_type+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Show Table </em>"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></span><span class="fontSize17 cbUpArrow cbUpArrow_'+clss_rowid+'" data-rowid="'+clss_rowid+'" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Hide Table </em>" style="display: none;"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></span></td></tr><tr class="cbRow cbRow_'+clss_rowid+'" data-trUniqueid="'+get_unique_rid+'"><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip"><label class="col-form-label pull-left">Premium Basis<span class="color_red">*</span></label><select class="custom-select classbuildpremBasis classbuildpremBasis_'+clss_rowid+' col-md-12 " id="classbuildpremBasis_'+clss_rowid+'" data-rowid="'+clss_rowid+'" name="classbuildpremBasis_'+clss_rowid+'"></select> </div></div></div></div><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Remarks</label><input type="text" class="col-md-12 form-control mb-0 rqbiRemarks rqbiRemarks_'+clss_rowid+'" placeholder="" name="rqbiRemarks_'+clss_rowid+'" id="rqbiRemarks_'+clss_rowid+'" value="'+get_remarks+'" data-rowid="'+clss_rowid+'" data-cover_type="'+get_coverage_type+'" data-uicheck_marks="'+get_remarks+'"><div class="rqbiRemarks_valdtn_'+clss_rowid+'" style="display:none">Invalid</div> </div></div></div></div><div class="col-md-4 pull-left pr-0 rqbiApplyModDiv"><div class="form-group row mb-1"><div class="col-md-11 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Credit/Debit</label><input type="text" class="col-md-12 form-control  pull-left mb-0 rqbiCreditDebit rqbiCreditDebit_'+clss_rowid+' wdth97p" id="rqbiCreditDebit_'+clss_rowid+'" name="rqbiCreditDebit_'+clss_rowid+'" data-rowid="'+clss_rowid+'" value="'+get_creditdebit+'" data-cover_type="'+get_coverage_type+'" data-uicheck_credit="'+get_creditdebit+'" disabled><div class="credit_debit_error_'+clss_rowid+'" style="display:none; color: red;">Invalid</div></div></div></div></div></td><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-sm-6 pull-left mt-2 pl-0 rqbiIfanyDiv mb-1"><div class="custom-control custom-checkbox col-sm-5 pull-left ml-1 ifany_radiobtn"><input type="checkbox" class="custom-control-input rqbiIfany rqbiIfany_'+clss_rowid+'" id="rqbiIfany_'+clss_rowid+'" name="rqbiIfany_'+clss_rowid+'" data-rowid="'+clss_rowid+'"><label class="custom-control-label" for="rqbiIfany_'+clss_rowid+'">&nbsp;If Any</label></div><div class="custom-control custom-checkbox col-sm-6 pull-left included_radiobtn"><input type="checkbox" class="custom-control-input rqbiIncluded rqbiIncluded_'+clss_rowid+'" id="rqbiIncluded_'+clss_rowid+'" name="rqbiIncluded_'+clss_rowid+'" data-rowid="'+clss_rowid+'"><label class="custom-control-label" for="rqbiIncluded_'+clss_rowid+'">Included</label></div></div><div class="col-sm-6 pull-left p-0 mb-1 premium_divright"><div class="form-group row mb-1 cb_premium"><div class="col-md-12 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Premium</label><input type="text" maxlength="19" class="col-md-12 form-control mb-0 mt-0 rqbiPremium rqbiPremium_'+clss_rowid+' wdth100p" data-rowid="'+clss_rowid+'" value="'+get_premium+'" placeholder="" name="rqbiPremium_'+clss_rowid+'" id="rqbiPremium_'+clss_rowid+'" data-cover_type="'+get_coverage_type+'" data-uicheck_prem="'+ui_get_premium+'" data-premium_flag="'+premium_flag+'"></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbpremium_'+clss_rowid+'" style="display:none">Invalid </p></div><small class="mt-1 ml-3 premPrevAmount"><span class="premPrevAmount_'+clss_rowid+'">'+get_over_prem+' </span></small></div></div></td></tr><tr data-trUniqueid="'+get_unique_rid+'" class="cbRating cbRating_'+clss_rowid+' cbRow_'+clss_rowid+'" style="display: none;"><td colspan="5" class="p-2"><table class="table table-striped table-responsive-sm table-bordered text-center mb-0 cbRatingTable" id="cbRatingTable_'+clss_rowid+'"><thead class="cbRatingHead" data-cbunique="'+clss_rowid+'"><tr><th class="width7_perc">Coverage</th><th class="width5_perc">LC</th><th class="width7_perc">LCM</th><th class="width5_perc">BR</th><th class="width5_perc">ILF</th><th class="width7_perc">Ded/SIR Factor</th><th class="width6_perc">ABR</th><th class="width8_perc">Mod/SM Factor</th><th class="width6_perc">Final Rate</th><th class="width6_perc">Exposure</th><th class="width6_perc">Premium</th></tr></thead></table></td></tr>';

						$("#cbAppendRow").append(rqbi_clas_area);
						get_classcode_prembasis(clss_rowid,selected_prem_base_id);
					   	if(get_ifany==1){
					   	
					   		$('#rqbiIfany_'+clss_rowid).prop('checked', true);
					   		$('#rqbiPremium_'+clss_rowid).attr("disabled", "disabled");;
							$('#rqbiExposure_'+clss_rowid).attr("disabled", "disabled");;
							$('#rqbiFinalRate_'+clss_rowid).removeAttr("disabled");
							$('#rqbiCreditDebit_'+clss_rowid).removeAttr("disabled");
						}
					 
					   	if(get_isincluded==1){
					   		$('#rqbiIncluded_'+clss_rowid).prop('checked', true);
					   		$('#rqbiFinalRate_'+clss_rowid).attr("disabled", "disabled");;
							$('#rqbiPremium_'+clss_rowid).attr("disabled", "disabled");;
							$('#rqbiCreditDebit_'+clss_rowid).attr("disabled", "disabled");;
							$('#rqbiExposure_'+clss_rowid).attr("disabled", "disabled");;	
						}
					 
					   	var trlen = $('tr.cbRow').length;
					    if( trlen == 2 ) {
					    	$('.removeCbRow').hide();
					    } else {
					    	$('.removeCbRow').show();
					    }

					    if(get_cloneuniqueid!=0 && get_cloneuniqueid!=null && get_cloneuniqueid!=''){
					    	$('#cbLocSelect_'+clss_rowid).attr("disabled", "disabled");
					    }else{
					    	$('#cbLocSelect_'+clss_rowid).removeAttr("disabled");
					    }

					    if(get_liq_data!='' && get_liq_data!=null){
					    	$('.liquorGrade_'+clss_rowid).show();
					    }else{
					    	$('.liquorGrade_'+clss_rowid).hide();
					    }

					     if(get_rates==1){
					    	$('.class_arates_'+clss_rowid).show();
					    	$('#rqbiCreditDebit_'+clss_rowid).attr("disabled", "disabled");
					    		
					    }else{
					    	$('.class_arates_'+clss_rowid).hide();
					    	$('#rqbiCreditDebit_'+clss_rowid).removeAttr("disabled");	
					    }

					    if(get_creditdebit!='' && get_creditdebit!=null){
					    	$('#rqbiCreditDebit_'+clss_rowid).removeClass("disabledField");		
					    }

					    if(get_teri_code!='' && get_teri_code!=null){
					    	$('.terri_code_number_'+clss_rowid).text(get_teri_code);		
					    }

					    if (premium_flag == 8 || premium_flag == 9) {
					    	$('#rqbiCreditDebit_'+clss_rowid).attr("disabled", "disabled"); /* Critical state */
					    }

					    if (premium_flag == 1 ) {
					    	/*Automatic premium generation when click the iso pricing indication list*/
				            if ($(".rqbiExposure_"+clss_rowid).val()!='' && $(".cbClasscode_"+clss_rowid).val()!='' && $(".cbLocSelect_"+clss_rowid).val()!='' && $(".rqbiPremium_"+clss_rowid).val()=='' && $(".rqbiFinalRate_"+clss_rowid).val()=='') {	
			                        $(".rqbiExposure_"+clss_rowid).trigger("focusout");
				            }
					    }			
		       		}	

						loc_data_ary = JSON.stringify(get_loc);

						$.each(JSON.parse(loc_data_ary), function(index) {

							var myrowid=this.rowid;
							var mylocid=this.locid;
	                    	
	                    		$.when(class_builder_loc_detatils(rowCount=myrowid)).then( function () { 
	                    			if ((index+1)==get_loc.length) {
	                    				retrive_compostive_rating(); 
	                    			}
        						});

                         	setTimeout (function () { 
	                       		if (mylocid==0 || mylocid=='') {
									$( "#cbLocSelect_"+myrowid+" option:selected" ).val(0);
								} else {
									$('#cbLocSelect_'+myrowid).val(mylocid);
								}            
                    		}, 2000);

						});

						
	            }else{

	            	rqbi_clas_area='<tr class="cbuildRow cbRow cbRow_1" data-rowid="1" data-trUniqueid="0"><td class="border_unset pt-9 pl-3"><div class="txttooltip"><input type="text" class="form-control width98_perc mb-0 mt-0 cbClasscode cbClasscode_1" data-rowid="1" placeholder="Code" name="cbClasscode_1" id="cbClasscode_1" value="" data-cover_type="" data-uicheck_class=""></div><small><span class="pull-left clas_desc_1"></span></small><br /><small class="pull-left text_color class_arates_1" style="display: none;">* A Rates</small><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbClasscode_1" style="display:none">Invalid Class Code</p></td><td class="border_unset pt-9 pl-2"><select  class="form-control width98_perc cbLocSelect cbLocSelect_1 m0" data-rowid="1" data-cloneid="" id="cbLocSelect_1" name="cbLocSelect1" data-cover_type=""></select><small><span class="pull-left terri_code terri_code_1 ml-3">TC:<span class="terri_code_number terri_code_number_1"></span></span></small></td><td class="border_unset pt-9"><div class="col-md-12 pull-left pl-0 pr-0"><div class="form-group mb-1 col-md-12 pull-left p-0"><div class="pl-2 pr-1"><div class="txttooltip"><input type="text" class="form-control mb-0 mt-0 rqbiExposure rqbiExposure_1" data-rowid="1" placeholder="Exposure" name="rqbiExposure_1" id="rqbiExposure_1" value="" data-cover_type="" data-uicheck_expo=""><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbexposure_1" style="display:none">Invalid </p></div></div></div></div></td><td  class="border_unset pt-9"><div class="col-sm-12 pull-left pr-2 pl-2"><div class="col-md-12 pull-left p-0 rqbiFinalRateDiv rqbiFinalRateDiv_1"><div class="col-md-12 p-0 pull-left"><div class="form-group mb-1 pl-0"><div class="input-group col-sm-12 pull-left p-0"><div class="txttooltip"><input type="text" data-prevamount="" class="form-control mb-0 rqbiFinalRate rqbiFinalRate_1" placeholder="" name="rqbiFinalRate_1" id="rqbiFinalRate_1" data-rowid="1" value="" data-cover_type="" data-uicheck_rate=""></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_finalrate_1" style="display:none">Invalid </p></div><small class="pl-5 mt-1 ml28 frPrevAmount"><span class="frPrevAmount_1"></span></small></div></div></div></div></td><td rowspan="2" class="verticalAlignMiddle cbAction" data-rowid="1"><small class="pull-left liquorGrade_1" style="display: none;">Liquor Grade:<span class="pull-right liquorgradeval liquorgradeval_1"></span></small><small class="pull-left desigContractor" style="display: none;">Designation of Contractor: 5</small><br><span class="btn btn-sm btn-info icon_btn text-white mb-2 disabled cbCloneRow cbCloneRow_1" id="cbCloneRow_1" data-rowid="1" data-cloneid="1"  data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span><br><span class="btn btn-sm btn-primary icon_btn mb-2 disabled cbAddRow cbAddRow_1" data-rowid="1" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Add </em>"><i class="fa fa-plus"></i></span><span class="btn btn-sm btn-primary icon_btn mb-2 isonotes_btn isonotes_btn_1 isonotes_btn_design" data-rowid="1" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="ISO Notes"><img src="../img/isologo3.png" class="isonotes_img_design" style="width: 31px;margin: -6px 0 0 -8px;"></span><br><span class="btn btn-sm btn-danger icon_btn mb-2 removeCbRow removeCbRow_1" data-rowid="1" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Delete </em>" style="display: none;"><i class="fa fa-trash"></i></span><br><span class="fontSize17 disabled cbDownArrow cbDownArrow_1" data-rowid="1" data-cover_type="" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Show Table </em>"><i class="fa fa-long-arrow-down" aria-hidden="true"></i></span><span class="fontSize17 cbUpArrow cbUpArrow_1" data-rowid="1" data-toggle="tooltip" data-html="true" data-placement="right" data-original-title="<em> Hide Table </em>" style="display: none;"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></span></td></tr><tr class="cbRow cbRow_1" data-trUniqueid="0"><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip"><label class="col-form-label pull-left">Premium Basis<span class="color_red">*</span></label><select class="custom-select classbuildpremBasis classbuildpremBasis_1 col-md-12" id="classbuildpremBasis_1" data-rowid="1" name="classbuildpremBasis_1"></select> </div></div></div></div><div class="col-md-4 pull-left pr-0"><div class="form-group row mb-1"><div class="pull-left col-md-11 pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Remarks</label><input type="text" class="col-md-12 form-control mb-0 rqbiRemarks rqbiRemarks_1" placeholder="" name="rqbiRemarks_1" id="rqbiRemarks_1" value="" data-rowid="1" data-cover_type="" data-uicheck_marks=""><div class="rqbiRemarks_valdtn_1" style="display:none">Invalid</div> </div></div></div></div><div class="col-md-4 pull-left pr-0 rqbiApplyModDiv"><div class="form-group row mb-1"><div class="col-md-11 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Credit/Debit</label><input type="text" class="col-md-12 form-control  pull-left mb-0 rqbiCreditDebit rqbiCreditDebit_1 wdth97p" id="rqbiCreditDebit_1" name="rqbiCreditDebit_1" data-rowid="1" value="" data-cover_type="" data-uicheck_credit="" disabled><div class="credit_debit_error_1" style="display:none; color: red;">Invalid</div></div></div></div></div></td><td colspan="2" class="border_unset border_bottom pb-13"><div class="col-sm-6 pull-left mt-2 pl-0 rqbiIfanyDiv mb-1"><div class="custom-control custom-checkbox col-sm-5 pull-left ml-1 ifany_radiobtn"><input type="checkbox" class="custom-control-input rqbiIfany rqbiIfany_1" id="rqbiIfany_1" name="rqbiIfany_1" data-rowid="1"><label class="custom-control-label" for="rqbiIfany_1">&nbsp;If Any</label></div><div class="custom-control custom-checkbox col-sm-6 pull-left included_radiobtn"><input type="checkbox" class="custom-control-input rqbiIncluded rqbiIncluded_1" id="rqbiIncluded_1" name="rqbiIncluded_1" data-rowid="1"><label class="custom-control-label" for="rqbiIncluded_1">Included</label></div></div><div class="col-sm-6 pull-left p-0 mb-1 premium_divright"><div class="form-group row mb-1 cb_premium"><div class="col-md-12 pull-left pr-0"><div class="txttooltip" id="cb_tooltip"><label class="col-form-label pull-left">Premium</label><input type="text" class="col-md-12 form-control mb-0 mt-0 rqbiPremium rqbiPremium_1 wdth100p" data-rowid="1" value="" placeholder="" name="rqbiPremium_1" id="rqbiPremium_1" data-cover_type="" data-uicheck_prem="" data-premium_flag=""></div><p class="pull-left text-danger font80_perc text-left width100_perc" id="Invalid_cbpremium_1" style="display:none">Invalid </p></div><small class="mt-1 ml-3 premPrevAmount"><span class="premPrevAmount_1"></span></small></div></div></td></tr><tr data-trUniqueid="0" class="cbRating cbRating_1 cbRow_1" style="display: none;"><td colspan="5" class="p-2"><table class="table table-striped table-responsive-sm table-bordered text-center mb-0 cbRatingTable" id="cbRatingTable_1"><thead class="cbRatingHead" data-cbunique=1><tr><th class="width8_perc">Coverage</th><th class="width6_perc">LC</th><th class="width7_perc">LCM</th><th class="width6_perc">BR</th><th class="width7_perc">ILF</th><th class="width7_perc">Ded/SIR Factor</th><th class="width6_perc">ABR</th><th class="width6_perc">Mod/SM Factor</th><th class="width6_perc">Final Rate</th><th class="width6_perc">Exposure</th><th class="width6_perc">Premium</th></tr></thead></table></td></tr>';

	            	$("#cbAppendRow").html(rqbi_clas_area);
	            	class_builder_loc_detatils(rowCount=null);
					get_classcode_prembasis(1,'');
	            	var trlen = $('tr.cbRow').length;
				    if( trlen == 2 ) {
				    	$('.removeCbRow').hide();
				    } else {
				    	$('.removeCbRow').show();
				    }
	            }
				sic_work('store_process');
			},
			error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete :function(){
				//getAdditionalAcctPremium();
				menu_permission();
				
	            var cbrowcount = $('.cbuildRow').length; 
	            $('#rowCount').val('').val(cbrowcount);
	            disable_compostive_rating();

	            setTimeout (function(){

            	/*Show Composite rating section by default when data is available*/
				$('#cbCompRating').trigger('click');
					var get_cb_rid = $('.comprow').first().attr('data-rid');
					if( get_cb_rid != 0 && get_cb_rid != undefined ) {
						$('.compositeRateDiv').show();
					} else {
						$('.compositeRateDiv').hide();
					}	

	            	/*Show Graduated rating section by default when data is available*/
					$('#classbuildGraduatedRating').trigger('click');
					var ccode_id = $('#class_code_id').val();
					var crcode_id = $('.graduatedRow').first().attr('data-rid'); 
					if((ccode_id != '' ) && (crcode_id != 0 && crcode_id != undefined )){
						$('.cbGraduatedTableDiv').show();
						$('.GradRatingTbody').show();
					} else {
						$('.Add_GraduatedRating_div').hide();
						$('.cbGraduatedTableDiv').hide();
						$('.GradRatingTbody').hide(); 
					}
            	},2500);   
            	 
	            var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
                var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');  
	            var cbcode_rid = $('.comprow').first().attr('data-rid'); 
	            if((enable_grad_rating == true || gr_disabled == true ) && (cbcode_rid == 0 || cbcode_rid == undefined )){
	                var get_type_name = "ClassBuilder";
	                graduated_rating_exposure_edit(get_type_name);        

	            }else{
	                $('.modify_exposure_rate').css('display','none');
	                $('.modify_exposure_rate p').text('');
	                $('#classbuildGraduatedRating').removeClass('redBorder');
	                disable_graduated_rating('null');
	            }

	            setTimeout ( function () {
					cb_btn_disable_enable();
	            }, 2000);
			}
		});

	}
  }

function del_class_row(u_rid,source){

	var coverage_type_array = [];
	$("input[name='CoverageType']:checked").each(function(){
		var value = $(this).val();
	    coverage_type_array.push(value);
	});

    var del_coverage_ret = coverage_type_array.toString();

	if((u_rid!='' && u_rid!=null && u_rid!=undefined) || (source=='cover_source') ){

			$.ajax({
			type: "post",
			url: laravel_url+"/class_builder_delete",
			data:{
			'accid': accid,'com_id':com_id,'del_id':u_rid,'delete_user':cb_userid,'source':source,'coverage':del_coverage_ret},
			dataType: 'json',
			success: function(data) {
				//new PNotify({ title: 'Success', text: data.message, delay: 1500, type: 'success' });
				rqbi_class_code_retrive(com_id,accid);
				tig_row.splice(0);	
				enabled_continueTofullQuote();
				checkContinueToFullQuoteStatus();	
				get_rhs_classbuilder(accid);
			},
			error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete: function(){
				
				var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
                var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');   
                if(enable_grad_rating == true || gr_disabled == true ){
                    coverage_based_delete_grad_rat(del_coverage_ret,source);
                }
				coverage_based_delete_comp_rat(del_coverage_ret,source);
			}
			});

	}
}


$(document).on('focusout', '.rqbiExposure', function(e){

	e.preventDefault();

		var ridd = $(this).attr('data-rowid');
		var tg_expp = $('#rqbiExposure_'+ridd).val().replace(/,/g, '');
		var invalid = 0;
		if ( tg_expp > 0 ){
			tg_expp = tg_expp.replace(/^0+/, "");
			$('#Invalid_cbexposure_'+ridd).hide();
			$('#rqbiExposure_'+ridd).removeClass('errorBorder');
		} else if (tg_expp == 0 && tg_expp != '') {
			tg_expp = tg_expp.replace(/^0+/, "0");
			$('#rqbiExposure_'+ridd).addClass('errorBorder');
			$('#Invalid_cbexposure_'+ridd).show();
			invalid = 1;
		}
		
		var un_rid = $('.cbRow_'+ridd).attr('data-truniqueid');

		if((tg_expp!= $('#rqbiExposure_'+ridd).attr('data-uicheck_expo')) && (invalid != 1)){
			
			remove_red_color_border_cb();

		effective_from = $('#rqbieffdate').val();
		expiry_date = $('#rqbiexpdate').val();

		if(effective_from!='' && expiry_date!=''){

			if(effective_from!=''){
				$('#rqbieffdate').removeClass('errorBorder');	
			}
			
			if(expiry_date!=''){
				$('#rqbiexpdate').removeClass('errorBorder');	
			}
			

				if(typeof(tg_expp) != "undefined" && tg_expp != null && tg_expp != '' && $("#cbClasscode_"+ridd).attr('data-uicheck_class') != '' && $("#cbLocSelect_"+ridd).attr('data-uicheck_loc') != '' && $("#locZipcode_"+ridd).val() != '') {

			  		var rt_coverage_type = $('#cbClasscode_'+ridd).attr('data-cover_type');

					if(typeof(rt_coverage_type) == "undefined" || rt_coverage_type == null || rt_coverage_type == '' || rt_coverage_type == 0) {

						rt_coverage_type = $(this).attr('data-cover_type');
					}				

					var Deductible_factor = '';
					var rt_cover_type='';
					
					var endDay = new Date(effective_from);
					var startDay = new Date(expiry_date);
					var days = (startDay.getTime() - endDay.getTime()) / (1000 * 60 * 60 * 24);
					policy_interval = Math.floor(days);

					var check_loc= $('#cbLocSelect_'+ridd).val();
					var check_classcode= $('#cbClasscode_'+ridd).val();

						if(rt_coverage_type!='' && check_classcode.length >= 5){

							var ponse='';

								$.ajax({
									url: laravel_url+"/get_rating_need_details",
									type:'post',
									cache : false,
									data:{'accid':accid,'com_id':com_id,'row_unique':un_rid,'locidd':check_loc},

									success:function(response){
										$('#cbAppendRow tr').addClass("disabled");
										$('#cbContinueFullquote').addClass("disabled");
									    ponse = JSON.parse(response);

									    if ((ponse.length > 0 && ponse != '')) {

										    var r_class_code = ponse[0].class_code;
										    var r_zip_code = ponse[0].zip;
										    var r_state = ponse[0].state;
										    var r_city = ponse[0].city;
										    rt_coverage_type = ponse[0].coverage_type;
										    var gl_rqbiEachOccur = ponse[0].each_occurence;
											var gl_GeneralAggr = ponse[0].general_aggregate;
											var liq_rqbiEachOccur = ponse[0].liq_each_occurence;
											var liq_GeneralAggr = ponse[0].liq_general_aggregate;
											var ocp_rqbiEachOccur = ponse[0].ocp_each_occurence;
											var ocp_GeneralAggr = ponse[0].ocp_general_aggregate;
											var deductible_credit = ponse[0].deductible_credit;
											var sir_credit = ponse[0].sir_credit;
											var liq_deductible_credit = ponse[0].liq_deductible_credit;
											var liq_sir_credit = ponse[0].liq_sir_credit;
											var ocp_deductible_credit = ponse[0].ocp_deductible_credit;
											var ocp_sir_credit = ponse[0].ocp_sir_credit;

											if (rt_coverage_type == 1) {
												rt_cover_type = 'CGL,PCO';
											} else if(rt_coverage_type == 2) {
												rt_cover_type = 'LLL';
											} else {
												rt_cover_type = 'OCP';
											}

											if (rt_coverage_type == 1){
												rt_rqbiEachOccur = gl_rqbiEachOccur;
												rt_GeneralAggr = gl_GeneralAggr;
											} else if (rt_coverage_type == 2){
												rt_rqbiEachOccur = liq_rqbiEachOccur;
												rt_GeneralAggr = liq_GeneralAggr;
											} else {
												rt_rqbiEachOccur = ocp_rqbiEachOccur;
												rt_GeneralAggr = ocp_GeneralAggr;
											}

											if (rt_coverage_type == 1) {
												if ( $('#rqbiDeductible').prop('checked') == true ) {
							   						Deductible_factor = deductible_credit;
							 					} else {
							 						Deductible_factor = sir_credit;		
							 					}	
											} else if (rt_coverage_type == 2) {
												if ( $('#rqbiDeductible').prop('checked') == true ) {
							   						Deductible_factor = liq_deductible_credit;
							 					} else {
							 						Deductible_factor = liq_sir_credit;
							 					}
											} else {
												if ( $('#rqbiDeductible').prop('checked') == true ) {
							   						Deductible_factor = ocp_deductible_credit;
							 					} else {
							 						Deductible_factor = ocp_sir_credit;
							 					}
											}


											if(Deductible_factor=='' || Deductible_factor==null || typeof(Deductible_factor)== "undefined" || Deductible_factor==0){
												Deductible_factor=1;
											}

												if(r_class_code!='' && r_zip_code!='' && r_state!='' && r_city!='' && rt_coverage_type!=''){

												    $.ajax({
														url: laravel_url+"/rbqi_calculate_premium",
														type:'post',
														data:{'cp_class_code': r_class_code,'cp_zip_code':r_zip_code,'cp_state':r_state,'cp_city':r_city,'cp_exposure':tg_expp,'cp_aggregate':rt_GeneralAggr,'cp_occurance':rt_rqbiEachOccur,'cp_coverage':rt_cover_type,'cp_deduct_fact':Deductible_factor,'cp_dateinterval':policy_interval,'accid': accid,'com_id':com_id,'row_unique':un_rid,'up_user':cb_userid},
														dataType:'json',
														success:function(response){
															if(response.israte!='Y'){
																$('#rqbiCreditDebit_'+ridd).removeAttr("disabled");		
																$('#rqbiCreditDebit_'+ridd).val('');
																$('#rqbiFinalRate_'+ridd).removeClass('errorBorder');
																$('.class_arates_'+ridd).hide();
																if (response.total_premium != 0 && response.total_premium != null){
																	$('#Invalid_cbpremium_'+ridd).hide();
																	$('#rqbiPremium_'+ridd).removeClass('errorBorder');
																	$('#rqbiPremium_'+ridd).val('$'+numberWithCommas(response.total_premium));
																	$('#rqbiPremium_'+ridd).attr('data-uicheck_prem',response.total_premium);
																}else{
																	if (response.total_premium == 0 || response.total_premium == null) {
																		$('#Invalid_cbpremium_'+ridd).show();
																		$('#rqbiPremium_'+ridd).addClass('errorBorder');
																		$('#rqbiPremium_'+ridd).val('$0');
																		$('#rqbiPremium_'+ridd).attr('data-uicheck_prem','0');
																	}
																}

																if (response.rate != 0 && response.rate != null){
																	$('#Invalid_finalrate_'+ridd).hide();
																		$('#rqbiFinalRate_'+ridd).removeClass('errorBorder');
																	var fin_rate=parseFloat(response.rate).toFixed(2);
																	$('#rqbiFinalRate_'+ridd).val(fin_rate);
																	$('#rqbiFinalRate_'+ridd).attr('data-uicheck_rate',fin_rate);
																} else {
																	if(response.rate == 0 || response.rate == null){
																		$('#Invalid_finalrate_'+ridd).show();
																		$('#rqbiFinalRate_'+ridd).addClass('errorBorder');
																		$('#rqbiFinalRate_'+ridd).val(0);
																		$('#rqbiFinalRate_'+ridd).attr('data-uicheck_rate',0);
																	}
																}

																$('.credit_debit_error_'+ridd).hide();
																$('#rqbiCreditDebit_'+ridd).removeClass('errorBorder');	
															
																$('#rqbiExposure_'+ridd).attr('data-uicheck_expo',tg_expp);
																$('#rqbiExposure_'+ridd).val(numberWithCommas(tg_expp));
																$('.frPrevAmount_'+ridd).html('');
																$('.premPrevAmount_'+ridd).html('');
																$('.terri_code_number_'+ridd).text('').text(response.terri_code);
																new PNotify({ title: 'Success', text: 'Premium is generated ', delay: 1500, type: 'success' });
																if (response.premium_flag == 8) { /*Naics update*/
																	$('#rqbiCreditDebit_'+ridd).attr("disabled", "disabled");
																	$('#rqbiPremium_'+ridd).attr('data-premium_flag',8);
																} else if (response.premium_flag == 9) {
																	$('#rqbiCreditDebit_'+ridd).attr("disabled", "disabled");
																	$('#rqbiPremium_'+ridd).attr('data-premium_flag',9);
																}else {
																	$('#rqbiPremium_'+ridd).attr('data-premium_flag',response.premium_flag);
																}
																naics = 0; /*Naics update*/
																nodata = 0;
																rating_table_hide(ridd);
																sic_work('store_process');
															}else{
																new PNotify({ title: 'Warning', text: 'Please enter rate for A rated class codes', delay: 2500, type: 'warning' });
																$('.terri_code_number_'+ridd).text('').text(response.terri_code);
																$('#rqbiExposure_'+ridd).attr('data-uicheck_expo',tg_expp);
																$('#rqbiPremium_'+ridd).val('');
																$('#rqbiFinalRate_'+ridd).val('');
																$('.class_arates_'+ridd).show();
																$('#rqbiFinalRate_'+ridd).addClass('errorBorder');
																$('#rqbiCreditDebit_'+ridd).attr("disabled", "disabled");
																$('#rqbiPremium_'+ridd).attr('data-premium_flag',response.premium_flag);
																naics = 0; /*Naics update*/
																nodata = 0;
															}
															checkContinueToFullQuoteStatus();
															get_rhs_classbuilder(accid);
																
														},
														error: function(xhr, status, error){

															var err = JSON.parse(xhr.responseText);
															if(err.message == 'Trying to get property of non-object' || err.message == 'Trying to get property \'Result\' of non-object'){

																new PNotify({ title: 'Error', text: 'Premium is not generated', delay: 1500, type: 'error' });
																
															}else{
																new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });	
															}
															
														},
														complete: function(){
															//getAdditionalAcctPremium();
															enabled_continueTofullQuote();
															$('#cbAppendRow tr').removeClass("disabled");
															$('#cbContinueFullquote').removeClass("disabled");

															var rowid = $('#rowId').val();
															var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');   
			                								var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');  
															var ccode_rid = $('.comprow').first().attr('data-rid'); 
												            if((enable_grad_rating == true || gr_disabled == true ) && (ccode_rid == 0 || ccode_rid == undefined )){
																var get_type_name = "ClassBuilder";
			                									graduated_rating_exposure_edit(get_type_name);
															}else{													
																disable_graduated_rating('null');
															}

														}
													});
												}

										}else{
											$('#cbAppendRow tr').removeClass("disabled");
											new PNotify({ title: 'Warning', text: 'Premium is not Generated. Please try Again', delay: 1500, type: 'Warning' });
										}
									},
									error: function(xhr, status, error){
										var err = JSON.parse(xhr.responseText);
										new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
								    	
									},
									complete: function(){
										
									    graduatedratingbtn_disableenable();
										
									}

								});

					}else{
						new PNotify({ title: 'Error', text: 'Please Choose the Coverage', delay: 1500, type: 'error' });
					}

				}else{

					if (tg_expp == '' || tg_expp == null){
						common_data_empty(ridd,accid,un_rid,empty_source='exposure');	
					}else{
						
						if($('#cbClasscode_'+ridd).val() == ''){
							$('#cbClasscode_'+ridd).addClass('redBorder');
						}

						if($('#cbLocSelect_'+ridd).val() == '' || $('#cbLocSelect_'+ridd).val() == 'Select Location'){
							$('#cbLocSelect_'+ridd).addClass('redBorder');
						}
					}
					
				}
			}else{
				//new PNotify({ title: 'Error', text: 'Please enter an Effective and Expiration Date', delay: 5000, type: 'error' });
				
				if(effective_from==''){
					$('#rqbieffdate').addClass('errorBorder');
				}
			
				if(expiry_date==''){
					$('#rqbiexpdate').addClass('errorBorder');
				}
			}

		}

		
});


function rating_data_append(rt_cover_type,r_class_code,un_rid,cb_premium_grid,exp){
    
    var coverage = rt_cover_type;
    var class_code = r_class_code;
    var fin_rate = 0;
    var expo = exp;
	var annual_premium = 0;
	var Total_LC = 0;
	var Total_LCM = 0;
	var Total_BR = 0;
	var Total_ILF = 0;
	var Total_FACT = 0;
	var Total_ABR = 0;
	var Total_CRE = 0;
	var Total_fin_rate = 0;
	var Total_expo = 0;
	var Total_annual_premium = 0;

    
	$("[data-cbuniqueval="+un_rid+"]").remove();
	
	if (cb_premium_grid) {

		var cov_keyval = [];

		$.each(cb_premium_grid['Result'], function( key, value ) {
		     
				    abr = value.AdjBaseRate;			
				    annual_premium = Math.round(value.ProPremium);
					annual_premium = numberWithCommas(annual_premium);
			        LC = value.LossCost;
			        LCM = parseFloat(value.LostcostModifier).toFixed(2);
			        BR = value.BaseRate;
			        ILF = parseFloat(value.IncLimitFactor).toFixed(2);
			        ABR = abr;
			        FACT = parseFloat(value.DetectFactor).toFixed(2);
			        CRE = parseFloat(value.Credit).toFixed(2);
			        expo = numberWithCommas(expo);
			        fin_rate = parseFloat(value.ActualFinalRate).toFixed(2);
			        a_rates = value.Is_arate;

			        if(FACT == 1){
			        	FACT = '1.0';
			        }else{
			        	FACT = FACT;
			        }

			        if(CRE == 1){
			        	CRE = '1.0';
			        }else{
			        	CRE = CRE;
			        }

			        if(a_rates == 'Y'){
			        	annual_premium = '';
			        	fin_rate = '';
			        	CRE = '';
			        }

					ILF = (isNaN(ILF) == true)? "":ILF;
					LC = (isNaN(LC) == true)? "":LC;
					LCM = (isNaN(LCM) == true)? "":LCM;
					BR = (isNaN(BR) == true)? "":BR;
					ABR = (isNaN(ABR) == true)? "":ABR;
					FACT = (isNaN(FACT) == true)? "":FACT;
					fin_rate = (isNaN(fin_rate) == true)? "":fin_rate;

				        if (coverage == 'LLL') {

					        if(key == 'LiquorLiability'  && jQuery.inArray(class_code, global_liquor_cc)!==-1){

					        	$('[data-cbunique="'+un_rid+'"]').after("<tbody data-cbuniqueval='"+un_rid+"'><tr style=''><td>"+key+"</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr><tr class='rating_total check_total'><td>Total</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr></tbody>"); 
					        }
				        }

				        if (coverage == 'OCP') {

					        if(key == 'OCP'  && jQuery.inArray(class_code, global_ocp_cc)!==-1) {
					        
					        	$('[data-cbunique="'+un_rid+'"]').after("<tbody data-cbuniqueval='"+un_rid+"'><tr style=''><td>"+key+"</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr><tr class='rating_total check_total'><td>Total</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr></tbody>"); 
					        }
				         }

				        if (coverage == 'CGL,PCO'  || coverage == 'CGL') {

					        if (key == 'PremOps') {
					              
					        	$('[data-cbunique="'+un_rid+'"]').after("<tbody data-cbuniqueval='"+un_rid+"'><tr style=''><td>"+key+"</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr>"); 
					        	Total_LC = LC;
								Total_LCM = LCM;
								Total_BR = BR;
								Total_ILF = ILF;
								Total_FACT = FACT;
								Total_ABR = ABR;
								Total_CRE = CRE;
								Total_fin_rate = value.ActualFinalRate;
								Total_expo = expo;								
								Total_annual_premium = value.ProPremium;   
					        }
					      	if (coverage == 'CGL,PCO') {

					            if (key == 'ProdCops') {  

									Total_LC = parseFloat(Total_LC)+parseFloat(LC);
									Total_LC = (Total_LC).toLocaleString();

									Total_LCM = Total_LCM;

									Total_BR = parseFloat(Total_BR)+parseFloat(BR);
									Total_BR = (Total_BR).toLocaleString();

									Total_ILF = Total_ILF+'/'+ILF;
									Total_FACT = Total_FACT;

									Total_ABR = parseFloat(Total_ABR)+parseFloat(ABR);
									Total_ABR = (Total_ABR).toLocaleString();

									Total_CRE = Total_CRE+'/'+CRE;
									var fi_one = parseFloat(Total_fin_rate).toFixed(2);
									var fi_two = parseFloat(value.ActualFinalRate).toFixed(2);
									Total_fin_rate = parseFloat(fi_one)+parseFloat(fi_two);	
					            	if (Total_fin_rate != 0) {
										Total_fin_rate = (Total_fin_rate).toLocaleString();
									} else {
										Total_fin_rate = "";
									}

									Total_expo = Total_expo;
									Total_annual_premium = parseInt(Total_annual_premium)+parseInt(value.ProPremium); 
									if (Total_annual_premium != 0) {
										Total_annual_premium = numberWithCommas(Total_annual_premium);
									} else {
										Total_annual_premium = "";
									}
									
					                
					                $('[data-cbunique="'+un_rid+'"]').next().after("<tr data-cbuniqueval='"+un_rid+"' style=''><td>"+key+"</td><td>"+LC+"</td><td>"+LCM+"</td><td>"+BR+"</td><td>"+ILF+"</td><td>"+FACT+"</td><td>"+ABR+"</td><td>"+CRE+"</td><td>"+fin_rate+"</td><td>"+expo+"</td><td>"+annual_premium+"</td></tr></tbody>"); 

					                if ( !$('#cbRatingTable_'+un_rid+' .check_total').hasClass( 'rating_total' ) ) {
						                $('#cbRatingTable_'+un_rid+'').find('tbody').next('tr').after("<tr class='rating_total check_total' data-cbuniqueval='"+un_rid+"' style=''><td>Total</td><td>"+Total_LC+"</td><td>"+Total_LCM+"</td><td>"+Total_BR+"</td><td>"+Total_ILF+"</td><td>"+Total_FACT+"</td><td>"+Total_ABR+"</td><td>"+Total_CRE+"</td><td>"+Total_fin_rate+"</td><td>"+Total_expo+"</td><td>"+Total_annual_premium+"</td></tr>"); 
						            }
					            }
					        }
				     
				    	}

		    });			

		}else{

			$("[data-cbuniqueval="+un_rid+"]").remove();
		}


}

$(document).on('change', '.cbLocSelect', function () {

	var cid = $(this).attr('data-rowid');
	var sta_val = $('#cbLocSelect_'+cid).val();
	var cov_ty = $('#cbClasscode_'+cid).attr('data-cover_type');

	if(typeof(cov_ty) == "undefined" || cov_ty == null || cov_ty == '' || cov_ty == 0) {

		cov_ty = $(this).attr('data-cover_type');
	}

	var liq_state = $('#locState_'+sta_val).val();
	var get_zip = $('#locZipcode_'+sta_val).val();
	var liq_code = $('#cbClasscode_'+cid).val();

	if(typeof(sta_val)!= "undefined" && sta_val!= null && sta_val!='') {

	    liquor_grade_data(cov_ty,liq_state,liq_code,cid);
	}
});

function liquor_grade_data(cov_ty,liq_state,liq_code,cid){
  	if(cov_ty == 2){

        $.ajax({
            url: laravel_url+"/get_liquor_grade_data",
            type:'post',
            data:{'liquor_state': liq_state, 'liq_code': liq_code},
            dataType: "json",
            success:function(dat){
              $('.liquorGrade_'+cid).show();
              $('.liquorgradeval_'+cid).text(dat[0].grade);
            },
            error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete: function(){
			  
			}
        }); 
    }else{
    	$('.liquorGrade_'+cid).hide();
        $('.liquorgradeval_'+cid).text('');
    }
}


$(document).on('click', '.cbDownArrow', function () {
	
	var rowid = $(this).attr('data-rowid');
	var row_uni=$('.cbRow_'+rowid).attr('data-truniqueid');
	var row_if_any =$('#rqbiIfany_'+rowid).is(':checked');
	var row_included =$('#rqbiIncluded_'+rowid).is(':checked');

	//var cov_tyr = coverage_ret;
	var cov_tyr = $('#cbClasscode_'+rowid).attr('data-cover_type');

	if(typeof(cov_tyr) == "undefined" || cov_tyr == null || cov_tyr == '' || cov_tyr == 0) {

		cov_tyr = $(this).attr('data-cover_type');
	}
	if (row_if_any != true && row_included != true) {
		$.ajax({
            url: laravel_url+"/retrive_rate_info",
            type:'post',
            data:{'accid': accid,'com_id': com_id,'row_id': row_uni,'cover_ty': cov_tyr},
            dataType: "json",
            success:function(dat){
            	var prem_response = jQuery.parseJSON(dat[0].premium_response);
            	var prem_final_rate = jQuery.parseJSON(dat[0].final_rate);
            	var prem_final_over_rate = jQuery.parseJSON(dat[0].final_over_rate);
            	var prem_exp = jQuery.parseJSON(dat[0].exposure);
            	var prem = jQuery.parseJSON(dat[0].premium);
            	var fial_rate='';

            	if(prem_final_over_rate==null || prem_final_over_rate=='' || prem_final_over_rate==0){
            		fial_rate = prem_final_rate;
            	}else{
            		fial_rate = prem_final_over_rate;
            	}

            	var rt_cov_type='';

				if(cov_tyr==1){
					rt_cov_type='CGL,PCO';
				}else if(cov_tyr==2){
					rt_cov_type='LLL';
				}else if(cov_tyr==3){
					rt_cov_type='OCP';
				}else{

				}
                rating_data_append(rt_cov_type,dat[0].class_code,rowid,prem_response,prem_exp);
            },
            error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete: function(){
			  
			}
        }); 

	}else{
		rating_table_hide(rowid);
	}

});


$(document).on('click','.rqbiIncluded',function(){
		
	var ti_rowid = $(this).attr('data-rowid');
	var row_uni=$('.cbRow_'+ti_rowid).attr('data-truniqueid');
	var exposure_value = $('#rqbiExposure_'+ti_rowid).val();
	var checked_flag = 0;
	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
	var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');

		var ti_included =$('input[type="checkbox"]#rqbiIncluded_'+ti_rowid+':checked').val();
		$("#rqbiIfany_"+ti_rowid).prop('checked',false);

		var ti_includedd='';

			if(ti_included=='on'){
				ti_includedd=1;
			}

				if(ti_includedd==1){

					$('#rqbiFinalRate_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiPremium_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiCreditDebit_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiExposure_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiExposure_'+ti_rowid).removeClass("errorBorder");
					$('#Invalid_cbexposure_'+ti_rowid).hide();
					$('.credit_debit_error_'+ti_rowid).hide();
					$('#Invalid_cbpremium_'+ti_rowid).hide();
					$('#Invalid_finalrate_'+ti_rowid).hide();
					$('#rqbiFinalRate_'+ti_rowid).removeClass("errorBorder");
					$('#rqbiPremium_'+ti_rowid).removeClass("errorBorder");
   					$('#rqbiCreditDebit_'+ti_rowid).removeClass("errorBorder");

   					if((exposure_value!= "") && (enable_grad_rating == true || gr_disabled == true)){
   						$('.includedPopup').attr('data-value',ti_includedd);
						$('.includedPopup').attr('data-rowid',ti_rowid);
						$('.includedPopup').attr('data-rid',row_uni);
   						$('.includedPopup').trigger('click');
   						checked_flag = 1;
					}

				}else{
					$('#rqbiFinalRate_'+ti_rowid).removeAttr("disabled");
					$('#rqbiPremium_'+ti_rowid).removeAttr("disabled");
					$('#rqbiExposure_'+ti_rowid).removeAttr("disabled");

					if((exposure_value!= "") && (enable_grad_rating == true || gr_disabled == true)){
						$('.includedPopup').attr('data-value',ti_includedd);
						$('.includedPopup').attr('data-rowid',ti_rowid);
						$('.includedPopup').attr('data-rid',row_uni);
   						$('.includedPopup').trigger('click');
   						checked_flag = 1;
					}
				}

			if(checked_flag == 0){
				included_update_and_reset(ti_rowid,row_uni,ti_includedd);				
			}

});

function included_update_and_reset(ti_rowid,row_uni,ti_includedd){
		
	$.ajax({
	    	url: laravel_url+"/included_update_and_reset",
	    	type:'post',
	    	data:{'accid': accid,'com_id': com_id,'row_id': row_uni,'include':ti_includedd,'up_user':cb_userid},
	    	dataType: "json",
	    	success:function(dat){
	            $('#rqbiFinalRate_'+ti_rowid).val('');
				$('#rqbiPremium_'+ti_rowid).val('');
				$('#rqbiCreditDebit_'+ti_rowid).val('');
				$('#rqbiExposure_'+ti_rowid).val('');
				$('.frPrevAmount_'+ti_rowid).html('');
				$('.premPrevAmount_'+ti_rowid).html('');
				$('#rqbiCreditDebit_'+ti_rowid).attr('data-uicheck_credit','');
				$('#rqbiPremium_'+ti_rowid).attr('data-uicheck_prem','');
				$('#rqbiFinalRate_'+ti_rowid).attr('data-uicheck_rate','');
				$('#rqbiExposure_'+ti_rowid).attr('data-uicheck_expo','');
	    		enabled_continueTofullQuote();
	    		checkContinueToFullQuoteStatus();
	    		get_rhs_classbuilder(accid);
	    		rating_table_hide(ti_rowid);
	    },
	    error: function(xhr, status, error){
			var err = JSON.parse(xhr.responseText);
	    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
		},
		complete: function(){
		    cb_btn_disable_enable();
		    sic_work('store_process');
		  	graduatedratingbtn_disableenable();
		}
	});
}

$(document).on('click','.rqbiIfany',function(){
	
	var ti_rowid = $(this).attr('data-rowid');
	var row_uni = $('.cbRow_'+ti_rowid).attr('data-truniqueid');	
	var exposure_value = $('#rqbiExposure_'+ti_rowid).val();
	var checked_flag = 0;
	var enable_grad_rating = $('.AddGraduatedRating').hasClass('enable_grad_rating');
	var gr_disabled = $('.AddGraduatedRating').hasClass('disabled');

		var ti_ifany = $('input[type="checkbox"]#rqbiIfany_'+ti_rowid+':checked').val();
		$("#rqbiIncluded_"+ti_rowid).prop('checked',false);

		var ti_ifanyy='';
		var check_status=null;

			if(ti_ifany=='on'){
				ti_ifanyy=1;
			}

				if(ti_ifanyy==1){
					check_status = 1;
					$('#rqbiPremium_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiExposure_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiFinalRate_'+ti_rowid).removeAttr("disabled");
					$('#rqbiCreditDebit_'+ti_rowid).removeAttr("disabled");
					$('#rqbiExposure_'+ti_rowid).removeClass("errorBorder");
					$('#Invalid_cbexposure_'+ti_rowid).hide();
					$('#Invalid_cbpremium_'+ti_rowid).hide();
					$('#rqbiPremium_'+ti_rowid).removeClass("errorBorder");

					if((exposure_value!= "") && (enable_grad_rating == true || gr_disabled == true)){
						$('.ifanyPopup').attr('data-value',ti_ifanyy);
						$('.ifanyPopup').attr('data-rowid',ti_rowid);
						$('.ifanyPopup').attr('data-checkstatus',check_status);
						$('.ifanyPopup').attr('data-rid',row_uni);
   						$('.ifanyPopup').trigger('click');
   						checked_flag = 1;
					}

				}else{
					check_status=0;
					$('#rqbiPremium_'+ti_rowid).removeAttr("disabled");
					$('#rqbiExposure_'+ti_rowid).removeAttr("disabled");
					$('#rqbiFinalRate_'+ti_rowid).removeAttr("disabled");
					$('#rqbiCreditDebit_'+ti_rowid).attr("disabled", "disabled");
					$('#rqbiCreditDebit_'+ti_rowid).removeClass("errorBorder");
					$('.credit_debit_error_'+ti_rowid).hide();
					$('#rqbiFinalRate_'+ti_rowid).removeClass("errorBorder");
					$('#Invalid_finalrate_'+ti_rowid).hide();

					if((exposure_value!= "") && (enable_grad_rating == true || gr_disabled == true)){
						$('.ifanyPopup').attr('data-value',ti_ifanyy);
						$('.ifanyPopup').attr('data-rowid',ti_rowid);
						$('.ifanyPopup').attr('data-checkstatus',check_status);
						$('.ifanyPopup').attr('data-rid',row_uni);
   						$('.ifanyPopup').trigger('click');
   						checked_flag = 1;
					}
				}

				if(checked_flag == 0){
					ifany_update_and_reset(ti_rowid,row_uni,ti_ifanyy,check_status);
				}
			
});

function ifany_update_and_reset(ti_rowid,row_uni,ti_ifanyy,check_status){
	
	$.ajax({
        	url: laravel_url+"/ifany_update_and_reset",
        	type:'post',
        	data:{'accid': accid,'com_id': com_id,'row_id': row_uni,'ifany':ti_ifanyy,'check_status':check_status,'up_user':cb_userid},
        	dataType: "json",
        	success:function(dat){

        		if(check_status==1){
        			$('#rqbiPremium_'+ti_rowid).val('');
        			$('#rqbiExposure_'+ti_rowid).val('');
        			$('.premPrevAmount_'+ti_rowid).html('');
					$('#rqbiPremium_'+ti_rowid).attr('data-uicheck_prem','');
					$('#rqbiExposure_'+ti_rowid).attr('data-uicheck_expo','');
        		}else{
        			$('#rqbiFinalRate_'+ti_rowid).val('');
					$('.frPrevAmount_'+ti_rowid).html('');
					$('#rqbiCreditDebit_'+ti_rowid).val('');
					$('#rqbiCreditDebit_'+ti_rowid).attr('data-uicheck_credit','');
					$('#rqbiFinalRate_'+ti_rowid).attr('data-uicheck_rate','');
        		}
        		
        		enabled_continueTofullQuote();
        		checkContinueToFullQuoteStatus();
            	get_rhs_classbuilder(accid);
            	rating_table_hide(ti_rowid);
        },
        error: function(xhr, status, error){
			var err = JSON.parse(xhr.responseText);
	    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
		},
		complete: function(){
		  	cb_btn_disable_enable();
		  	sic_work('store_process');
		  	graduatedratingbtn_disableenable();
		}
  	});

}

 $(document).on('blur', '.cbClasscode', function(e){

 	e.preventDefault();

 	var cid =  $(this).attr('data-rowid');
 	var cc = $('#cbClasscode_'+cid).val();
    var cc_cov_ty = coverage_ret;

    if(cc!=''){

    if (cc.length >= 5) {
  		
       	if(cc!= $('#cbClasscode_'+cid).attr('data-uicheck_class')){
       		remove_red_color_border_cb();

       		$('.class_arates_'+cid).hide();
       		
         	$.ajax({
           	url: laravel_url+"/get_class_code_description",
           	method: 'post',
           	data:{
             'class_code': cc},
           	dataType: 'JSON',
           	success: function(res){          
       		 	if(res.length > 0){
       		 		$('.rqbiPremBaseval_'+cid).html('');
					$('.clas_desc_'+cid).html('');
       		 		$('#Invalid_cbClasscode_'+cid).css('display','none');
	                $('.rqbiPremBaseval_'+cid).html(res[0].premium_base);
					$('.classbuildpremBasis_'+cid).val(res[0].premium_base_id);
	                $('.clas_desc_'+cid).html(res[0].class_description);
	                $('#cbClasscode_'+cid).val(res[0].class_code);
	                coverage_ret=res[0].class_code_type;
	                $('#cbClasscode_'+cid).attr('data-cover_type', coverage_ret);
					$('#cbLocSelect_'+cid).attr('data-cover_type', coverage_ret);
					$('#rqbiExposure_'+cid).attr('data-cover_type', coverage_ret);
					$('.cbDownArrow_'+cid).attr('data-cover_type', coverage_ret);
					$('#rqbiRemarks_'+cid).attr('data-cover_type', coverage_ret);
					$('#rqbiCreditDebit_'+cid).attr('data-cover_type', coverage_ret);
					$('#rqbiPremium_'+cid).attr('data-cover_type', coverage_ret);
					$('#rqbiFinalRate_'+cid).attr('data-cover_type', coverage_ret);

				        	if(coverage_ret==2){
								if($('#cbLocSelect_'+cid).val()!=''){ 
									$('#cbLocSelect_'+cid).trigger('change');
								}		
							}else{
								if($('#cbLocSelect_'+cid).val()!=''){
									$('.liquorGrade_'+cid).hide();
		        					$('.liquorgradeval_'+cid).text('');
		        					$('#cbLocSelect_'+cid).trigger('change');
	        					}
							}

					if(($('#cbLocSelect_'+cid).val()!='' && $('#cbClasscode_'+cid).val()!='') && ( $("#rqbiIfany_"+cid).prop('checked') == true && ( $('#rqbiFinalRate_'+cid).val()!='' || $('#rqbiCreditDebit_'+cid).val()!=''))){
						var row_unic = $('.cbRow_'+cid).attr('data-truniqueid');
						empty_source='class_code_mod';
						common_data_empty(cid,accid,row_unic,empty_source);
					}

	            }else{
					$('#Invalid_cbClasscode_'+cid).css('display','block');
					$('#Invalid_cbClasscode_'+cid).css('color','red');
					$('#cbClasscode_'+cid).addClass('redBorder');
					$('#cbClasscode_'+cid).val('');
	            }
        
             },
             error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete: function(){
				setTimeout(function(){
					save_clscd_prembasis(cid);
				 },2000);				
			}
           });

         }
      
 		} else {
	    	setTimeout(function(){ 
	    		if ($('.cbClasscode').is(':focus')) {
	    			$('#Invalid_cbClasscode_'+cid).removeAttr('style').hide();
	    		} else {
	    			$('#Invalid_cbClasscode_'+cid).removeAttr('style').show();
	    			$('#cbClasscode_'+cid).val('');
	    			$('.clas_desc_'+cid).text('');
	    		}
 			},50);
 		}

  	}else{

  		if(($('#cbLocSelect_'+cid).val()!='' && $('#rqbiExposure_'+cid).val()!='' && $('#rqbiPremium_'+cid).val()!='' && $('#cbClasscode_'+cid).val() == '') || $("#rqbiIfany_"+cid).prop('checked') == true){
  			
			var row_unic = $('.cbRow_'+cid).attr('data-truniqueid');
			empty_source='class_code';

  			common_data_empty(cid,accid,row_unic,empty_source);
  		}

  	}
});

 
$(document).on('focusout', '.rqbiPremium', function(e){

 	e.preventDefault();

 	var over_rowid =  $(this).attr('data-rowid');
 	var over_premium1 = $('#rqbiPremium_'+over_rowid).val().replace(/,/g, '');
 	var over_premium = over_premium1.replace(/\$/g, '')
 	var over_expo = $('#rqbiExposure_'+over_rowid).val();
 	var over_final_rate = $('#rqbiFinalRate_'+over_rowid).val();
 	var class_code = $('#cbClasscode_'+over_rowid).val();

 	premium_flag_check = $(this).attr('data-premium_flag');
 	if (premium_flag_check == 8){
 		nodata = 1;
 		naics = 0;
 	} else if (premium_flag_check == 9) {
 		naics = 1;
 		nodata = 0;
 	} else {
 		nodata = 0;
 		naics = 0;
 	}

 	var invalid = 0;
        if ( over_premium > 0 ){
            over_premium = over_premium.replace(/^0+/, "");
            $('#Invalid_cbpremium_'+over_rowid).hide();
            $('#rqbiPremium_'+over_rowid).removeClass('errorBorder');
        } else if (over_premium == 0 && over_premium != '') {
            over_premium = over_premium.replace(/^0+/, "0");
            $('#rqbiPremium_'+over_rowid).addClass('errorBorder');
            $('#Invalid_cbpremium_'+over_rowid).show();
            invalid = 1;
        }

 	if((over_premium != $('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem')) && (invalid != 1)){

 		remove_red_color_border_cb();
	
		var over_uni = $('.cbRow_'+over_rowid).attr('data-truniqueid');

		if( ($(".class_arates_"+over_rowid).css('display') == 'none') ){

	 	if((over_premium!='' && over_premium!=0) && (over_expo!='' && over_expo!=0) && (over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 0)){

	 		over_final_rate = null;
	 		var cd_value = null;
	 		prem_flag = 3;

	         $.ajax({
	           url: laravel_url+"/override_premium_and_finalrate_and_credit",
	           method: 'post',
	           data:{
	             'over_premium': over_premium,'over_final':over_final_rate,'over_credit':cd_value,'accid':accid,'over_uni_row':over_uni,'com_id': com_id,'up_user':cb_userid,'prem_flag':prem_flag},
	           dataType: 'JSON',
	           success: function(res){
	           	if(res.israte!='Y'){
	           			var total_premium = res.total_premium;
	           			if (total_premium != 0 && total_premium != null) {
	           				total_premium = (isNaN(total_premium) == true)? "":total_premium;
	           				$('#rqbiPremium_'+over_rowid).val('$'+numberWithCommas(total_premium));
	           				$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem',total_premium);
	           				$('#Invalid_cbpremium_'+over_rowid).hide();
							$('#rqbiPremium_'+over_rowid).removeClass('errorBorder');
	           			} else {
	           				$('#Invalid_cbpremium_'+over_rowid).show();
							$('#rqbiPremium_'+over_rowid).addClass('errorBorder');
							$('#rqbiPremium_'+over_rowid).val('$0');
							$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem','0');
	           			}

	           			if (res.rate !=0 && res.rate!= null) {
	           				var fin_rate=parseFloat(res.rate).toFixed(2);
							fin_rate =(isNaN(fin_rate) == true)? "":fin_rate;
							$('#rqbiFinalRate_'+over_rowid).val(fin_rate);	
							$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',fin_rate);
							$('#Invalid_finalrate_'+over_rowid).hide();
							$('#rqbiFinalRate_'+over_rowid).removeClass('errorBorder');
	           			} else {
	           				$('#Invalid_finalrate_'+over_rowid).show();
							$('#rqbiFinalRate_'+over_rowid).addClass('errorBorder');
							$('#rqbiFinalRate_'+over_rowid).val('0');
							$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate','0');
	           			}
						
	           			if ( res.prev_fin_rate != 0 && res.prev_fin_rate != null) {
	           				var over_fin_rate = parseFloat(res.prev_fin_rate).toFixed(2);
							$('.frPrevAmount_'+over_rowid).html('').html(over_fin_rate);	
	           			} else {
	           				$('.frPrevAmount_'+over_rowid).html('').html(0);	
	           			}
						

						if (res.prev_premium != 0 && res.prev_premium != null){
							$('.premPrevAmount_'+over_rowid).html('').html('$'+numberWithCommas(res.prev_premium));	
						} else {
							$('.premPrevAmount_'+over_rowid).html('').html('$0');	
						}

						if (res.credit_debit != 0 && res.credit_debit != null) {
							var credit_debit=parseFloat(res.credit_debit).toFixed(2);
							credit_debit =(isNaN(credit_debit) == true)? "":credit_debit;
							$('#rqbiCreditDebit_'+over_rowid).val(credit_debit);
							$('#rqbiCreditDebit_'+over_rowid).attr('data-uicheck_credit',credit_debit);
							$('.credit_debit_error_'+over_rowid).hide();
							$('#rqbiCreditDebit_'+over_rowid).removeClass('errorBorder');
							
						} else {
							$('#rqbiCreditDebit_'+over_rowid).val(0);
							$('#rqbiCreditDebit_'+over_rowid).attr('data-uicheck_credit',0);
							$('.credit_debit_error_'+over_rowid).show();
							$('#rqbiCreditDebit_'+over_rowid).addClass('errorBorder');
						}
						

						var rt_cover_type=res.cover_type;
						var r_class_code=res.class_code;

						if(rt_cover_type==1){
							rt_cov_type='CGL,PCO';
						}else if(rt_cover_type==2){
							rt_cov_type='LLL';
						}else {
							rt_cov_type='OCP';
						}
						rating_table_hide(over_rowid);
						//new PNotify({ title: 'Success', text: 'Premium is generated ', delay: 1500, type: 'success' });

					}else{
						new PNotify({ title: 'Warning', text: 'Please enter rate for A rated class codes', delay: 2500, type: 'warning' });
						$('#rqbiPremium_'+over_rowid).val('');
						$('#rqbiFinalRate_'+over_rowid).val('');
						$('.frPrevAmount_'+over_rowid).html('');
						$('.premPrevAmount_'+over_rowid).html('');
						$('#rqbiCreditDebit_'+over_rowid).val('');
					}

					enabled_continueTofullQuote();
					checkContinueToFullQuoteStatus();
					sic_work('store_process');
					get_rhs_classbuilder(accid);
		        
		             }, 
		             error: function(xhr, status, error){
								var err = JSON.parse(xhr.responseText);
						    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
					},
					complete: function(){
					}

	           });
	      
	  	}else if((over_premium!='' && over_premium!=0) && (over_expo!='' && over_expo!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 1 && nodata == 0)){ /*Nacis Premium update*/

		  		$.ajax({
		           url: laravel_url+"/premium_update_naics_check",
		           method: 'post',
		           data:{
		             'naics_premium':over_premium,
		             'accid':accid,
		             'rate_uni_row':over_uni,
		             'com_id': com_id,
		             'up_user':cb_userid},
		           dataType: 'JSON',
		           success: function(res){  
		           			$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem',over_premium);
		           			$('#rqbiPremium_'+over_rowid).val('$'+numberWithCommas(over_premium));
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
							get_rhs_classbuilder(accid);
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
							//getAdditionalAcctPremium();  
							disable_graduated_rating('null');
						}

		           });

		}else{
	  		empty_source = 'premium';
			var em_rowid = $(this).attr('data-rowid');
			var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');

			if(($('#cbLocSelect_'+em_rowid).val()!='' && $('#cbClasscode_'+em_rowid).val()!='' && $('#rqbiExposure_'+em_rowid).val()!='' && $('#rqbiPremium_'+em_rowid).val()=='')){
				
				common_data_empty(em_rowid,accid,row_unic,empty_source);
			}
	  	}
	}else{
		if(((over_premium!='' && over_premium!=0) && (over_expo!='' && over_expo!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 0)) || ((over_premium!='' && over_premium!=0) && (over_expo!='' && over_expo!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 1))){

				if (nodata == 1) { //Critical state update
					prem_flag = 8;	
				} else {
					prem_flag = 6;
				}

		         $.ajax({
		           url: laravel_url+"/a_rates_cc_premium_and_finalrate_update",
		           method: 'post',
		           data:{
		             'over_exp': over_expo,'over_prem':over_premium,'accid':accid,'rate_uni_row':over_uni,'com_id': com_id,'up_user':cb_userid,'class_code':class_code,'source':'rate_premium','prem_flag':prem_flag},
		           dataType: 'JSON',
		           success: function(res){  

					        	if (res.rate !=0 && res.rate!= null) {
					        		var finqq_rate=parseFloat(res.rate).toFixed(2);
					          		finqq_rate =(isNaN(finqq_rate) == true)? "":finqq_rate;
							        $('#rqbiFinalRate_'+over_rowid).val(finqq_rate);
							        $('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',finqq_rate);
									$('#Invalid_finalrate_'+over_rowid).hide();
									$('#rqbiFinalRate_'+over_rowid).removeClass('errorBorder');
			           			} else {
			           				$('#Invalid_finalrate_'+over_rowid).show();
									$('#rqbiFinalRate_'+over_rowid).addClass('errorBorder');
									$('#rqbiFinalRate_'+over_rowid).val('0');
									$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate','0');
			           			}
						

					        $('#rqbiPremium_'+over_rowid).val('$'+numberWithCommas(over_premium));
					        $('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem',over_premium);
							//new PNotify({ title: 'Success', text: res.message, delay: 1500, type: 'success' });
							var rt_cover_type=res.cover_type;

							if(rt_cover_type==1){
								rt_cov_type='CGL,PCO';
							}else if(rt_cover_type==2){
								rt_cov_type='LLL';
							}else {
								rt_cov_type='OCP';
							}
							rating_table_hide(over_rowid);
							sic_work('store_process');
							get_rhs_classbuilder(accid);
	
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
								  
						}

		           });
		      
		  }else{

		  	empty_source='premium';
			var em_rowid = $(this).attr('data-rowid');
			var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');

				if(($('#cbLocSelect_'+em_rowid).val()!='' && $('#cbClasscode_'+em_rowid).val()!='' && $('#rqbiExposure_'+em_rowid).val()!='' && $('#rqbiPremium_'+em_rowid).val()=='')){
					
					common_data_empty(em_rowid,accid,row_unic,empty_source);
				}

		  	}
		}

	}

});


 $(document).on('focusout', '.rqbiFinalRate', function(e){

 	e.preventDefault();

 	var over_rowid =  $(this).attr('data-rowid');
 	$('#rqbiFinalRate_'+over_rowid).removeClass('errorBorder');
 	var over_premium = $('#rqbiPremium_'+over_rowid).val();
 	var over_expo = $('#rqbiExposure_'+over_rowid).val();
 	var over_final_rate1 = $('#rqbiFinalRate_'+over_rowid).val().replace(/,/g, '');
 	var over_final_rate = over_final_rate1.replace(/\$/g, '')
 	var class_code = $('#cbClasscode_'+over_rowid).val();

 	premium_flag_check = $('#rqbiPremium_'+over_rowid).attr('data-premium_flag');
 	if (premium_flag_check == 8){
 		nodata = 1;
 		naics = 0;
 	} else if (premium_flag_check == 9) {
 		naics = 1;
 		nodata = 0;
 	} else {
 		nodata = 0;
 		naics = 0;
 	}

 	   var invalid = 0;
        if ( over_final_rate > 0 ){
        	var dl_check = over_final_rate.indexOf(".") == -1;
        	if (dl_check == true) {
 				over_final_rate = over_final_rate.replace(/^0+/, "");
        	} 
            $('#Invalid_finalrate_'+over_rowid).hide();
            $('#rqbiFinalRate_'+over_rowid).removeClass('errorBorder');
        } else if (over_final_rate == 0 && over_final_rate != '') {
            over_final_rate = over_final_rate.replace(/^0+/, "0");
            $('#rqbiFinalRate_'+over_rowid).addClass('errorBorder');
            $('#Invalid_finalrate_'+over_rowid).show();
            invalid = 1;
        }
        
 	if((over_final_rate != $('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate')) && (invalid != 1)){
 		remove_red_color_border_cb();
	
		var over_uni = $('.cbRow_'+over_rowid).attr('data-truniqueid');

		if( ($(".class_arates_"+over_rowid).css('display') == 'none') ) {

		 	if((over_premium!='' && over_premium!=0) && (over_expo!='' && over_expo!=0) && (over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 0)){

		 		over_premium=null;
		 		var cd_value=null;
		 		prem_flag = 4;

		         $.ajax({
		           url: laravel_url+"/override_premium_and_finalrate_and_credit",
		           method: 'post',
		           data:{
		             'over_premium': over_premium,'over_final':over_final_rate,'over_credit':cd_value,'accid':accid,'over_uni_row':over_uni,'com_id': com_id,'up_user':cb_userid,'prem_flag':prem_flag},
		           dataType: 'JSON',
		           success: function(res){ 

			           if(res.israte!='Y'){ 
		           			var total_premium = res.total_premium;
	           				if (total_premium != 0 && total_premium != null) {
		           				total_premium = (isNaN(total_premium) == true)? "":total_premium;
		           				$('#rqbiPremium_'+over_rowid).val('$'+numberWithCommas(total_premium));
		           				$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem',total_premium);
		           				$('#Invalid_cbpremium_'+over_rowid).hide();
								$('#rqbiPremium_'+over_rowid).removeClass('errorBorder');
		           			} else {
		           				$('#Invalid_cbpremium_'+over_rowid).show();
								$('#rqbiPremium_'+over_rowid).addClass('errorBorder');
								$('#rqbiPremium_'+over_rowid).val('$0');
								$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem','0');
		           			}

							if (res.rate !=0 && res.rate!= null) {
	           					var fin_rate=parseFloat(res.rate).toFixed(2);
								fin_rate =(isNaN(fin_rate) == true)? "":fin_rate;
								$('#rqbiFinalRate_'+over_rowid).val(fin_rate);	
								$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',fin_rate);
								$('#Invalid_finalrate_'+over_rowid).hide();
								$('#rqbiFinalRate_'+over_rowid).removeClass('errorBorder');
		           			} else {
		           				$('#Invalid_finalrate_'+over_rowid).show();
								$('#rqbiFinalRate_'+over_rowid).addClass('errorBorder');
								$('#rqbiFinalRate_'+over_rowid).val('0');
								$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate','0');
		           			}

							
							if ( res.prev_fin_rate != 0 && res.prev_fin_rate != null) {
	           				var over_fin_rate = parseFloat(res.prev_fin_rate).toFixed(2);
								$('.frPrevAmount_'+over_rowid).html('').html(over_fin_rate);	
		           			} else {
		           				$('.frPrevAmount_'+over_rowid).html('').html(0);	
		           			}

							if (res.prev_premium != 0 && res.prev_premium != null){
								$('.premPrevAmount_'+over_rowid).html('').html('$'+numberWithCommas(res.prev_premium));	
							} else {
								$('.premPrevAmount_'+over_rowid).html('').html('$0');	
							}

							if (res.credit_debit != 0 && res.credit_debit != null) {
								var credit_debit=parseFloat(res.credit_debit).toFixed(2);
								credit_debit =(isNaN(credit_debit) == true)? "":credit_debit;
								$('#rqbiCreditDebit_'+over_rowid).val(credit_debit);
								$('#rqbiCreditDebit_'+over_rowid).attr('data-uicheck_credit',credit_debit);
								$('.credit_debit_error_'+over_rowid).hide();
								$('#rqbiCreditDebit_'+over_rowid).removeClass('errorBorder');
								
							} else {
								$('#rqbiCreditDebit_'+over_rowid).val(0);
								$('#rqbiCreditDebit_'+over_rowid).attr('data-uicheck_credit',0);
								$('.credit_debit_error_'+over_rowid).show();
								$('#rqbiCreditDebit_'+over_rowid).addClass('errorBorder');
							}

							var rt_cover_type=res.cover_type;
							var r_class_code=res.class_code;

							if(rt_cover_type==1){
								rt_cov_type='CGL,PCO';
							}else if(rt_cover_type==2){
								rt_cov_type='LLL';
							}else{
								rt_cov_type='OCP';
							}
							
							rating_table_hide(over_rowid);
							//new PNotify({ title: 'Success', text: 'Premium is generated ', delay: 1500, type: 'success' });
						}else{
							new PNotify({ title: 'Warning', text: 'Please enter rate for A rated class codes', delay: 2500, type: 'warning' });
							$('#rqbiPremium_'+over_rowid).val('');
							$('#rqbiFinalRate_'+over_rowid).val('');
							$('.frPrevAmount_'+over_rowid).html('');
							$('.premPrevAmount_'+over_rowid).html('');
							$('#rqbiCreditDebit_'+over_rowid).val('');
						}
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
							sic_work('store_process');
							get_rhs_classbuilder(accid);
			        
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
							//getAdditionalAcctPremium();
							disable_graduated_rating('null');
						}

		           });
		      
		  }else if(((over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && $("#rqbiIfany_"+over_rowid).prop('checked') == true && (naics == 0 && nodata == 0)) || ((over_final_rate!='' && over_final_rate!=0) && (over_expo!='' && over_expo!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 1 && nodata == 0))){ /*Naics and final rate update*/

		  	 $.ajax({
		           url: laravel_url+"/finalrate_update_ifany_check",
		           method: 'post',
		           data:{
		             'final':over_final_rate,
		             'accid':accid,
		             'rate_uni_row':over_uni,
		             'com_id': com_id,
		             'up_user':cb_userid},
		           dataType: 'JSON',
		           success: function(res){  
		           			var fin_rate_nn = parseFloat(over_final_rate).toFixed(2);
		           			$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',fin_rate_nn);
							$('#rqbiFinalRate_'+over_rowid).val(fin_rate_nn);
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
							//getAdditionalAcctPremium();  
							disable_graduated_rating('null');
						}

		           });

		  }else{
			  	empty_source='finalrate';
				var em_rowid = $(this).attr('data-rowid');
				var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');

					if(($('#cbLocSelect_'+em_rowid).val()!='' && $('#cbClasscode_'+em_rowid).val()!='' && $('#rqbiExposure_'+em_rowid).val()!='' && $('#rqbiFinalRate_'+em_rowid).val()=='')){
						
						common_data_empty(em_rowid,accid,row_unic,empty_source);
					}	
		  }
		}else{	
			if(((over_expo!='' && over_expo!=0) && (over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 0)) || ((over_expo!='' && over_expo!=0) && (over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && (naics == 0 && nodata == 1))){ /*Nodata and A rate update*/

				if (nodata == 1) { //Critical state update
					prem_flag = 8;	
				} else {
					prem_flag = 7;
				}

		         $.ajax({
		           url: laravel_url+"/a_rates_cc_premium_and_finalrate_update",
		           method: 'post',
		           data:{
		             'rate_expo':over_expo,'rate_final':over_final_rate,'accid':accid,'rate_uni_row':over_uni,'com_id': com_id,'up_user':cb_userid,'class_code':class_code,'source':'rate_final','prem_flag':prem_flag},
		           dataType: 'JSON',
		           success: function(res){ 

					        var total_premium = res.total_premium;
		           			if (total_premium != 0 && total_premium != null) {
		           				total_premium = (isNaN(total_premium) == true)? "":total_premium;
		           				$('#rqbiPremium_'+over_rowid).val('$'+numberWithCommas(total_premium));
		           				$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem',total_premium);
		           				$('#Invalid_cbpremium_'+over_rowid).hide();
								$('#rqbiPremium_'+over_rowid).removeClass('errorBorder');
		           			} else {
		           				$('#Invalid_cbpremium_'+over_rowid).show();
								$('#rqbiPremium_'+over_rowid).addClass('errorBorder');
								$('#rqbiPremium_'+over_rowid).val('$0');
								$('#rqbiPremium_'+over_rowid).attr('data-uicheck_prem','0');
		           			}

					        $('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',over_final_rate);
					        $('#rqbiFinalRate_'+over_rowid).val(over_final_rate);
							
							var rt_cover_type=res.cover_type;

							if(rt_cover_type==1){
								rt_cov_type='CGL,PCO';
							}else if(rt_cover_type==2){
								rt_cov_type='LLL';
							}else {
								rt_cov_type='OCP';
							}

							rating_table_hide(over_rowid);
							sic_work('store_process');
							get_rhs_classbuilder(accid);
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
							
								//getAdditionalAcctPremium();  
								disable_graduated_rating('null');
						}

		           });
		      
		  }else if((over_expo!='' && over_expo!=0) && (over_final_rate=='' && over_final_rate==0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='')){

		  		empty_source='finalrate';
				var em_rowid = $(this).attr('data-rowid');
				var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');

					if(($('#cbLocSelect_'+em_rowid).val()!='' && $('#cbClasscode_'+em_rowid).val()!='' && $('#rqbiExposure_'+em_rowid).val()!='' && $('#rqbiFinalRate_'+em_rowid).val()=='')){
						
						common_data_empty(em_rowid,accid,row_unic,empty_source);
					}	

		  }else if((over_final_rate!='' && over_final_rate!=0) && ($("#cbClasscode_"+over_rowid).val()!='' && $("#cbLocSelect_"+over_rowid).val()!='') && $("#rqbiIfany_"+over_rowid).prop('checked') == true && (naics == 0 && nodata == 0)){ /*Final rate update only*/

		  	 $.ajax({
		           url: laravel_url+"/finalrate_update_ifany_check",
		           method: 'post',
		           data:{
		             'final':over_final_rate,
		             'accid':accid,
		             'rate_uni_row':over_uni,
		             'com_id': com_id,
		             'up_user':cb_userid},
		           dataType: 'JSON',
		           success: function(res){  
		           			var fin_rate_if = parseFloat(over_final_rate).toFixed(2);
		           			$('#rqbiFinalRate_'+over_rowid).attr('data-uicheck_rate',fin_rate_if);
		           			$('#rqbiFinalRate_'+over_rowid).val(fin_rate_if);	
							enabled_continueTofullQuote();
							checkContinueToFullQuoteStatus();
			             }, 
			             error: function(xhr, status, error){
									var err = JSON.parse(xhr.responseText);
							    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
						},
						complete: function(){
								//getAdditionalAcctPremium();  
								disable_graduated_rating('null');
						}

		           });

		  }

		}
	}

});


$(document).on('focusout', '.rqbiCreditDebit', function(e){

	e.preventDefault();

	var ti_rowid = $(this).attr('data-rowid');
	var row_uni = $('.cbRow_'+ti_rowid).attr('data-truniqueid');
	var over_expo_cre = $('#rqbiExposure_'+ti_rowid).val();
	var cd_value = $("#rqbiCreditDebit_"+ti_rowid).val();
	var pre_value = $("#rqbiPremium_"+ti_rowid).val();
	var fin_value = $("#rqbiFinalRate_"+ti_rowid).val();
	cd_value = cd_value.replace(",", "");
	cd_value = cd_value.replace("$", "");
	pre_value = pre_value.replace(",", "");
	pre_value = pre_value.replace("$", "");
	fin_value = fin_value.replace(",", "");

	var invalid = 0;
	if ( cd_value > 0 ){
		var dll_check = cd_value.indexOf(".") == -1;
        	if (dll_check == true) {
 				cd_value = cd_value.replace(/^0+/, "");
        	} 
		
	} else if (cd_value == 0 && cd_value != '') {
		cd_value = cd_value.replace(/^0+/, "");
		$("#rqbiCreditDebit_"+ti_rowid).val(cd_value);
		invalid = 1;
	}

	if(cd_value!= $('#rqbiCreditDebit_'+ti_rowid).attr('data-uicheck_credit') && invalid != 1 ){
		remove_red_color_border_cb();

		if(pre_value!='' && cd_value!=0 && fin_value!='' && $("#cbClasscode_"+ti_rowid).val()!='' && $("#cbLocSelect_"+ti_rowid).val()!='' && (over_expo_cre!='' && over_expo_cre!=0)){
			
			var arith_check=false;
			var arithcount='';

			if($("#rqbiCreditDebit_"+ti_rowid).val().indexOf('-') != -1){
				arith_check = true;
			}

			if(arith_check == true){

				if (cd_value.match(/\-/g).length > 1) {
		        	$(".credit_debit_error_"+ti_rowid).css("display", "block");
		        	$('#rqbiCreditDebit_'+ti_rowid).addClass('errorBorder');
		        	arithcount = 2;
		    	}else{
		    		arithcount = 1;
		    	}

			}

			if(arithcount=='' || arithcount== 1){

		    		$(".credit_debit_error_"+ti_rowid).css("display", "none");
		    		$('#rqbiCreditDebit_'+ti_rowid).removeClass('errorBorder');
		    		prem_flag = 5;

			        $.ajax({
			           url: laravel_url+"/override_premium_and_finalrate_and_credit",
			           method: 'post',
			           data:{
			             'over_premium':pre_value,'over_final':fin_value,'over_credit':cd_value,'accid':accid,'over_uni_row':row_uni,'com_id': com_id,'up_user':cb_userid,'prem_flag': prem_flag},
			           dataType: 'JSON',
			           success: function(res){
				           	if(res.israte!='Y'){

			           			var total_premium = res.total_premium;
			           			if (total_premium != 0 && total_premium != null) {
			           				total_premium = (isNaN(total_premium) == true)? "":total_premium;
			           				$('#rqbiPremium_'+ti_rowid).val('$'+numberWithCommas(total_premium));
			           				$('#rqbiPremium_'+ti_rowid).attr('data-uicheck_prem',total_premium);
			           				$('#Invalid_cbpremium_'+ti_rowid).hide();
									$('#rqbiPremium_'+ti_rowid).removeClass('errorBorder');
			           			} else {
			           				$('#Invalid_cbpremium_'+ti_rowid).show();
									$('#rqbiPremium_'+ti_rowid).addClass('errorBorder');
									$('#rqbiPremium_'+ti_rowid).val('$0');
									$('#rqbiPremium_'+ti_rowid).attr('data-uicheck_prem','0');
			           			}

								if (res.rate !=0 && res.rate!= null) {
		           				var fin_rate=parseFloat(res.rate).toFixed(2);
									fin_rate =(isNaN(fin_rate) == true)? "":fin_rate;
									$('#rqbiFinalRate_'+ti_rowid).val(fin_rate);	
									$('#rqbiFinalRate_'+ti_rowid).attr('data-uicheck_rate',fin_rate);
									$('#Invalid_finalrate_'+ti_rowid).hide();
									$('#rqbiFinalRate_'+ti_rowid).removeClass('errorBorder');
			           			} else {
			           				$('#Invalid_finalrate_'+ti_rowid).show();
									$('#rqbiFinalRate_'+ti_rowid).addClass('errorBorder');
									$('#rqbiFinalRate_'+ti_rowid).val('0');
									$('#rqbiFinalRate_'+ti_rowid).attr('data-uicheck_rate','0');
			           			}

								if ( res.prev_fin_rate != 0 && res.prev_fin_rate != null) {
			           				var over_fin_rate = parseFloat(res.prev_fin_rate).toFixed(2);
									$('.frPrevAmount_'+ti_rowid).html('').html(over_fin_rate);	
			           			} else {
			           				$('.frPrevAmount_'+ti_rowid).html('').html(0);	
			           			}

								if (res.prev_premium != 0 && res.prev_premium != null){
									$('.premPrevAmount_'+ti_rowid).html('').html('$'+numberWithCommas(res.prev_premium));	
								} else {
									$('.premPrevAmount_'+ti_rowid).html('').html('$0');	
								}

								if (res.credit_debit != 0 && res.credit_debit != null) {
									var credit_debit=parseFloat(res.credit_debit).toFixed(2);
									credit_debit =(isNaN(credit_debit) == true)? "":credit_debit;
									$('#rqbiCreditDebit_'+ti_rowid).val(credit_debit);
									$('#rqbiCreditDebit_'+ti_rowid).attr('data-uicheck_credit',credit_debit);
									$('.credit_debit_error_'+ti_rowid).hide();
									$('#rqbiCreditDebit_'+ti_rowid).removeClass('errorBorder');
									
								} else {
									$('#rqbiCreditDebit_'+ti_rowid).val(0);
									$('#rqbiCreditDebit_'+ti_rowid).attr('data-uicheck_credit',0);
									$('.credit_debit_error_'+ti_rowid).show();
									$('#rqbiCreditDebit_'+ti_rowid).addClass('errorBorder');
								}

								var rt_cover_type = res.cover_type;
								var r_class_code = res.class_code;
								
								if(rt_cover_type == 1){
									rt_cov_type = 'CGL,PCO';
								}else if(rt_cover_type == 2){
									rt_cov_type = 'LLL';
								}else {
									rt_cov_type = 'OCP';
								}
								
								rating_table_hide(ti_rowid);
								//new PNotify({ title: 'Success', text: 'Premium is generated ', delay: 1500, type: 'success' });
							}else{
								new PNotify({ title: 'Warning', text: 'Please enter rate for A rated class codes', delay: 2500, type: 'warning' });
								$('#rqbiPremium_'+ti_rowid).val('');
								$('#rqbiFinalRate_'+ti_rowid).val('');
								$('.frPrevAmount_'+ti_rowid).html('');
								$('.premPrevAmount_'+ti_rowid).html('');
								$('#rqbiCreditDebit_'+ti_rowid).val('');
							}
				        	enabled_continueTofullQuote();
				        	checkContinueToFullQuoteStatus();
				        	get_rhs_classbuilder(accid);
				             }, 
				             error: function(xhr, status, error){
										var err = JSON.parse(xhr.responseText);
								    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
							},
							complete: function(){
								//getAdditionalAcctPremium();		  
							}

			        });
		    	}
	     	
			}else{

				empty_source='credit_debit';
				var em_rowid = $(this).attr('data-rowid');
				var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');

					if(($('#cbLocSelect_'+em_rowid).val()!='' && $('#cbClasscode_'+em_rowid).val()!='' && $('#rqbiExposure_'+em_rowid).val()!='' && $('#rqbiCreditDebit_'+em_rowid).val()=='')){
						
						common_data_empty(em_rowid,accid,row_unic,empty_source);
					}	
			}


		}
	}

);

/***************************Rating calculation trigger block start******************/


$(document).on('change', ".rqbiEachOccur,.rqbiGeneralAggr,.rqbiLiquorEachOccur,.rqbiLiquorGeneralAggr,.rqbiOcpEachOccur,.rqbiOcpGeneralAggr", function() {

	var rqbiEachOccur_ch = $('#rqbiEachOccur').val();
	var rqbiGeneralAggr_ch = $('#rqbiGeneralAggr').val();
	var rqbiLiquorEachOccur_ch = $('#rqbiLiquorEachOccur').val();
	var rqbiLiquorGeneralAggr_ch = $('#rqbiLiquorGeneralAggr').val();
	var rqbiOcpEachOccur_ch = $('#rqbiOcpEachOccur').val();
	var rqbiOcpGeneralAggr_ch = $('#rqbiOcpGeneralAggr').val();

		if($(".rqbiExposure").val()!='' && $(".cbClasscode").val()!='' && $(".cbLocSelect").val()!=''){	

			if( (rqbiEachOccur_ch <= rqbiGeneralAggr_ch) && (rqbiLiquorEachOccur_ch <= rqbiLiquorGeneralAggr_ch) && (rqbiOcpEachOccur_ch <= rqbiOcpGeneralAggr_ch) ) {

				$('.rqbiExposure').attr('data-uicheck_expo','');
					setTimeout(function(){
						$(".rqbiExposure").trigger("focusout");	
						
					}, 1000);
			}		
				
			
		}

 });


$(document).on('focusout', "#glDeductCredit,#SirCredit,#liquorDeductCredit,#liquorSirCredit,#OcpDeductCredit,#OcpSirCredit", function() {

	if($(".rqbiExposure").val()!= '' && $(".cbClasscode").val()!= '' && $(".cbLocSelect").val()!= ''){	

		if($('.glDeductCredit_error_valdtn').css('display') == 'none' && $('.liquorDeductCredit_error_valdtn').css('display') == 'none' && $('.OcpDeductCredit_error_valdtn').css('display') == 'none' && $('.SirCredit_error_valdtn').css('display') == 'none' && $('.liquorSirCredit_error_valdtn').css('display') == 'none' && $('.OcpSirCredit_error_valdtn').css('display') == 'none'){

			$('.rqbiExposure').attr('data-uicheck_expo','');
			setTimeout(function(){
				$(".rqbiExposure").trigger("focusout");	

			}, 1000);	
		}		
			
	}
	
 });

/***************************Rating calculation trigger block end******************/


$(document).on("click", "#covWarningOk", function () {
	get_coverage_types();
	if(tig_row.length >= 1){
		del_class_row(u_rid=null,source='cover_source');
	}
	checkContinueToFullQuoteStatus();
	coverage_based_deductible_reset();

	var gl_checked = $('#typeGL').prop('checked');
	var gl_type_visibility = $('.gl_type_div').css('display');
	if (gl_checked == true) {
		if (gl_type_visibility == 'none') {
			$('.gl_type_div').css('display', 'block');
		}
	} else {
		if (gl_type_visibility == 'block') {
			$('.gl_type_div').css('display', 'none');
			$('.cov_gl_type').prop('checked', false);
		}
	}
});

$(document).on('change', ".cbLocSelect", function() {

	empty_source='location';
	var em_rowid = $(this).attr('data-rowid');
	var row_unic = $('.cbRow_'+em_rowid).attr('data-truniqueid');
	var em_loc_check=$('#cbLocSelect_'+em_rowid).val();
	
	if((em_loc_check=='' || em_loc_check==null) && ($("#cbClasscode_"+em_rowid).val()!='' && $("#rqbiExposure_"+em_rowid).val()!='' && $('#rqbiPremium_'+em_rowid)!='') || ($("#rqbiIfany_"+em_rowid).prop('checked') == true && ($('#rqbiFinalRate_'+em_rowid).val()!='' || $('#rqbiCreditDebit_'+em_rowid).val()!=''))){
		common_data_empty(em_rowid,accid,row_unic,empty_source);	
	}
});


function common_data_empty(cid,accid,row_unic,empty_source){

 	$.ajax({
       	url: laravel_url+"/common_empty_reset",
       	method: 'post',
       	data:{
         'row_unic':row_unic,'com_id':com_id,'accid':accid,'up_user':cb_userid,'empty_source':empty_source},
       	dataType: 'JSON',
	       	success: function(res){
	       	if(empty_source=='class_code'){
	       		$('#rqbiFinalRate_'+cid).val('');
				$('#rqbiPremium_'+cid).val('');
				$('#rqbiCreditDebit_'+cid).val('');
				$('.frPrevAmount_'+cid).html('');
				$('.premPrevAmount_'+cid).html('');
				$('.clas_desc_'+cid).html('');
	            $('#cbClasscode_'+cid).val('');
	            $('.rqbiPremBaseval_'+cid).html('');
	            $('.liquorGrade_'+cid).hide();
	    		$('.liquorgradeval_'+cid).text('');
	    		$('#rqbiCreditDebit_'+cid).attr('data-uicheck_credit','');
				$('#rqbiPremium_'+cid).attr('data-uicheck_prem','');
				$('#rqbiFinalRate_'+cid).attr('data-uicheck_rate','');
				$('#cbClasscode_'+cid).attr('data-uicheck_class','');
				$('.class_arates_'+cid).hide();
				$('.classbuildpremBasis_'+cid).val('');
	       	}else if(empty_source=='class_code_mod'){
	       		$('#rqbiFinalRate_'+cid).val('');
	       		$('.frPrevAmount_'+cid).html('');
	       		$('#rqbiCreditDebit_'+cid).val('');
	       		$('#rqbiFinalRate_'+cid).attr('data-uicheck_rate','');
	       		$('#rqbiCreditDebit_'+cid).attr('data-uicheck_credit','');
	       	}else if(empty_source=='credit_debit' || empty_source=='finalrate' || empty_source=='premium'){
	       		$('#rqbiExposure_'+cid).attr('data-uicheck_expo','');
	       		$("#rqbiExposure_"+cid).trigger("focusout");
	       	}else if(empty_source=='exposure'){
	       		$('#rqbiExposure_'+cid).val('');
	       		$('#rqbiFinalRate_'+cid).val('');
				$('#rqbiPremium_'+cid).val('');
				$('#rqbiCreditDebit_'+cid).val('');
				$('.frPrevAmount_'+cid).html('');
				$('.premPrevAmount_'+cid).html('');
				$('.terri_code_number_'+cid).text('');
				$('#rqbiCreditDebit_'+cid).attr('data-uicheck_credit','');
				$('#rqbiPremium_'+cid).attr('data-uicheck_prem','');
				$('#rqbiFinalRate_'+cid).attr('data-uicheck_rate','');
				$('#rqbiExposure_'+cid).attr('data-uicheck_expo','');
				$('.class_arates_'+cid).hide();
	       	// }else if(empty_source=='critcal_st'){ Naics update
	       		
	       	// }
	       }else{
	       		$('#cbLocSelect_'+cid).val('');
	       		$('#rqbiFinalRate_'+cid).val('');
				$('#rqbiPremium_'+cid).val('');
				$('#rqbiCreditDebit_'+cid).val('');
				$('.frPrevAmount_'+cid).html('');
				$('.premPrevAmount_'+cid).html('');
				$('.terri_code_number_'+cid).text('');
				$('#rqbiCreditDebit_'+cid).attr('data-uicheck_credit','');
				$('#rqbiPremium_'+cid).attr('data-uicheck_prem','');
				$('#rqbiFinalRate_'+cid).attr('data-uicheck_rate','');
				$('#cbLocSelect_'+cid).attr('data-uicheck_loc','');
				$('.class_arates_'+cid).hide();
	       	}          
	   		  //new PNotify({ title: 'Warning', text: res.message, delay: 2500, type: 'warning' });
	   		  rating_table_hide(cid);
	   		  enabled_continueTofullQuote();
	   		  checkContinueToFullQuoteStatus();
	         },
	        error: function(xhr, status, error){
				var err = JSON.parse(xhr.responseText);
		    	new PNotify({ title: 'Error', text: err.message, delay: 1500, type: 'error' });
			},
			complete: function(){
				//getAdditionalAcctPremium();
			}
    });
}

$(document).on('click', "#clscd_change_Popup_ok", function() {
	var tg_rowid = $('.clscd_change_Popup').attr('data-rowid');
	save_classcode_location_remarks(tg_rowid);
});

$(document).on('click', "#clscd_change_Popup_cancel", function() {
	var tg_rowid = $('.clscd_change_Popup').attr('data-rowid');
	var pre_classcode = $('.cbClasscode_'+tg_rowid).attr('data-previous_classcode');
	$('.cbClasscode_'+tg_rowid).val(pre_classcode);
});

$(document).on('click', "#loc_change_Popup_ok", function() {
	var tg_rowid = $('.loc_change_Popup').attr('data-rowid');
	save_classcode_location_remarks(tg_rowid);
});

$(document).on('click', "#loc_change_Popup_cancel", function() {
	var tg_rowid = $('.loc_change_Popup').attr('data-rowid');
	var previous_loc = $('.cbLocSelect_'+tg_rowid).attr('data-previous_location');
	$('.cbLocSelect_'+tg_rowid).val(previous_loc);
});

function classbuilder_emptyCheck () {

    var validation_check = true;
    var class_check = true;
    var loc_check = true;
    var expos_check = true;
    var fin_check = true;
    var prem_check = true;
    var credit_check = true;
    var rqbi_validtn_check = true;
    var expto_validtn = true;
	var class_count = 0;
	var exp_count = 0;
	var pre_count = 0;
	var fin_count = 0;
	var value_array = [];
	var get_value = "";
	var prembasis_check = true;

    $(".cbClasscode").each( function() {
    	var r_id = $(this).attr('data-rowid');
        var value = $('#cbClasscode_'+r_id).val();
        var c_val = value.substr(0,6).trim(); //Naics update
        if (c_val == "") { //Naics update
            class_check=false;
            $('#cbClasscode_'+r_id).addClass('redBorder');
        }else{
        	if ( $('#Invalid_cbClasscode_'+r_id).css('display') == "block" ) {
	            class_check=false;
	            $('#cbClasscode_'+r_id).addClass('redBorder');
        	} else {
        		$('#cbClasscode_'+r_id).removeClass('redBorder');
        	}
        }
    });

    $(".cbLocSelect").each( function() {
    	var r_id = $(this).attr('data-rowid');
        var value = $('#cbLocSelect_'+r_id).val();
        if (value == "" || value == 0) {
            loc_check = false;
            $('#cbLocSelect_'+r_id).addClass('redBorder');
        }else{
        	$('#cbLocSelect_'+r_id).removeClass('redBorder');
        }
    });

    $(".rqbiCreditDebit").each( function() {
    	var r_id = $(this).attr('data-rowid');
        if ($('.credit_debit_error_'+r_id).css('display')=='block') {
            credit_check = false;
            $('#rqbiCreditDebit_'+r_id).addClass('redBorder');
        }else{
        	$('#rqbiCreditDebit_'+r_id).removeClass('redBorder');
        }
    });

	$(".rqbiExposure").each( function() {
		var r_id = $(this).attr('data-rowid');
		var value = $('#rqbiExposure_'+r_id).val();
		if(($("#rqbiIfany_"+r_id).prop('checked') == true || $("#rqbiIncluded_"+r_id).prop('checked') == true) && ($('#Invalid_cbexposure_'+r_id).css('display') == 'none')){
			expos_check = true;
			$('#rqbiExposure_'+r_id).removeClass('redBorder');
		} else if (value == 0  || $('#Invalid_cbexposure_'+r_id).css('display') == 'block') {
	    	expos_check = false;
	        $('#rqbiExposure_'+r_id).addClass('redBorder');
	    }else{
		    if (value == "") {
		        expos_check = false;
		        $('#rqbiExposure_'+r_id).addClass('redBorder');
		    }else{	  	
				if( value != '') {
					get_value = value_array.push($('.rqbiPremium_'+r_id).val());
			        exp_count = exp_count+1;
			    }
		    	$('#rqbiExposure_'+r_id).removeClass('redBorder');
		    }	
		}
	    
	});

	$(".classbuildpremBasis").each( function() {
    	var r_id = $(this).attr('data-rowid');
        var value = $('.classbuildpremBasis_'+r_id).val();
        if (value == "") {
            prembasis_check = false;
            $('.classbuildpremBasis_'+r_id).addClass('redBorder');
        }else{
        	$('.classbuildpremBasis_'+r_id).removeClass('redBorder');
        }
    });



	$(".rqbiFinalRate").each( function() {
		var r_id = $(this).attr('data-rowid');
		var value = $('#rqbiFinalRate_'+r_id).val();
	    if(($("#rqbiIfany_"+r_id).prop('checked') == true || $("#rqbiIncluded_"+r_id).prop('checked') == true) && ($('#Invalid_finalrate_'+r_id).css('display') == 'none')) {
			fin_check = true;
			$('#rqbiFinalRate_'+r_id).removeClass('redBorder');
		} else if (value == 0 || $('#Invalid_finalrate_'+r_id).css('display') == 'block'){
				fin_check = false;
		        $('#rqbiFinalRate_'+r_id).addClass('redBorder');
		} else{
		    if (value == "") {
		        fin_check = false;
		         $('#rqbiFinalRate_'+r_id).addClass('redBorder');
		    }else{		    	
				if( value != '') {
					get_value = value_array.push($('.rqbiFinalRate_'+r_id).val());
			        fin_count = fin_count+1;
			    }
		    	$('#rqbiFinalRate_'+r_id).removeClass('redBorder');
		    }	
		}
	});

	$(".rqbiPremium").each( function() {
		var r_id = $(this).attr('data-rowid');
		var value = $('#rqbiPremium_'+r_id).val();
	    if(($("#rqbiIfany_"+r_id).prop('checked') == true || $("#rqbiIncluded_"+r_id).prop('checked') == true) && ($('#Invalid_cbpremium_'+r_id).css('display') == 'none')) {
			prem_check = true;
			$('#rqbiPremium_'+r_id).removeClass('redBorder');
		} else if (value == 0 || $('#Invalid_cbpremium_'+r_id).css('display') == 'block'){
				prem_check = false;
		        $('#rqbiPremium_'+r_id).addClass('redBorder');
		} else{
		    if (value == "") {
		        prem_check = false;
		         $('#rqbiPremium_'+r_id).addClass('redBorder');
		    }else{		    	
				if( value != '') {
					get_value = value_array.push($('.rqbiPremium_'+r_id).val());
			        pre_count = pre_count+1;
			    }
		    	$('#rqbiPremium_'+r_id).removeClass('redBorder');
		    }	
		}
	});

    $(".rqbiRemarks").each( function() {
    	var r_id = $(this).attr('data-rowid');
        if ($('.rqbiRemarks_valdtn_'+r_id).css('display') == 'block' ) {
            rqbi_validtn_check = false;
            $('#rqbiRemarks_'+r_id).addClass('redBorder');
        }else{
        	$('#rqbiRemarks_'+r_id).removeClass('redBorder');
        }
    });    

    // var grad_row_count = $('.graduatedRow').length;
   	// if(grad_row_count >= 2) {
	//     $(".ExposureTo").each( function() {
	//     	var r_id = $(this).attr('data-rowid');
	//     	var exposurefrom = $('#exposurefrom_'+r_id).val();
	//     	var exposureto = $('#gradExpEditInput_'+r_id).val();
	//         if (exposurefrom > exposureto || exposurefrom == exposureto || exposureto == '') {
	//             expto_validtn = false;
	//             $('#gradExpEditInput_'+r_id).addClass('redBorder');
	//         }else{
	//         	$('#gradExpEditInput_'+r_id).removeClass('redBorder');
	//         }
	//     });
	// }

	if (pre_count != 0 && fin_count != 0 && exp_count != 0) {
		validation_check = true;
		$('.Cb_error_ratablerow').css('display','none');
	} else {
		validation_check = false;
		$('.Cb_error_ratablerow').css('display','block');
		$('.Cb_error_ratablerow').css('color','red');
	}

	if (class_check == false || loc_check == false || credit_check == false || expos_check == false || fin_check == false || prem_check == false || rqbi_validtn_check == false || expto_validtn == false || prembasis_check == false) {
		validation_check = false;    	
    }
    
    return validation_check;
}

function remove_red_color_border_cb(){
	$('.cbClasscode').removeClass('redBorder');
	$('.cbLocSelect').removeClass('redBorder');
	$('.rqbiCreditDebit').removeClass('redBorder');
	$('.rqbiExposure').removeClass('redBorder');
	$('.rqbiFinalRate').removeClass('redBorder');
	$('.rqbiPremium').removeClass('redBorder');
	$('.cbAccordHeader').removeAttr('style');
	$('.cbAccordHeader a').removeAttr('style');
	$('.Cb_error_ratablerow').css('display','none');
}


function rating_table_hide(rowid){
	$('.cbUpArrow_'+rowid).hide();
	$('.cbDownArrow_'+rowid).show();
	$('.cbRating_'+rowid).hide();
} 

function get_classcode_prembasis(row_id, prem_basis_val){
	$.ajax({
        type: "post",
        cache: false,
        url: laravel_url + "/get_premium_basis",
        success: function (data) {
            $(".classbuildpremBasis_"+row_id).find('option').remove();
            $(".classbuildpremBasis_"+row_id).append(data);
        },
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
			$(".classbuildpremBasis_"+row_id).val(prem_basis_val);
        }
    });
}

$(document).on('change', ".classbuildpremBasis", function() {
	var tg_rowid = $(this).attr('data-rowid');
	save_clscd_prembasis(tg_rowid);
	var classcode = $('.cbClasscode_'+tg_rowid).val();
	var cloneid = $('.cbLocSelect_'+tg_rowid).attr('data-cloneid');
	var loc = $('.cbLocSelect_'+tg_rowid).val();
	var exp = $('.rqbiExposure_'+tg_rowid).val();
	var prem_basis = $('.classbuildpremBasis_'+tg_rowid).val();

	if (cloneid == '') {
		if ( classcode != '' && loc != '' && exp != '' && prem_basis != '') {
			enableCbBtns (tg_rowid);
		} else {
			disableCbBtns (tg_rowid);
		}
	} else {
		if ( classcode != '' && exp != '' && prem_basis != '') {
			enableCbBtns (tg_rowid);
		} else {
			disableCbBtns (tg_rowid);
		}
	}
	
});

function save_clscd_prembasis(tg_rowid) {
	var tg_uniqueid=$('.cbRow_'+tg_rowid).attr('data-truniqueid');
	var clscd_prembasis = $('.classbuildpremBasis_'+tg_rowid).val();
	var user_id = localStorage.getItem('usernumericid');

	if(clscd_prembasis != ''){
		$.ajax({
			type: "post",
			cache: false,
			url: laravel_url + "/save_prem_basis",
			data: {accid:accid, com_id:com_id, rqbi_id:rqbi_id, rid:tg_uniqueid, selected_prem_base_id:clscd_prembasis,user_id:user_id},
			success: function (data) {
				
			},
			error: function () {
				new PNotify({
					title: 'Error',
					text: 'Getting error',
					delay: 1500,
					type: 'error'
				});
			},
			complete: function () {
				if ($('.classbuildpremBasis_'+tg_rowid).hasClass('redBorder') == true) {
					$('.classbuildpremBasis_'+tg_rowid).removeClass('redBorder');
				}
				enabled_continueTofullQuote();
	    		checkContinueToFullQuoteStatus();
	
			}
		});
	} else {
		if ($('.classbuildpremBasis_'+tg_rowid).hasClass('redBorder') == false) {
			$('.classbuildpremBasis_'+tg_rowid).addClass('redBorder');
		}
	}
}