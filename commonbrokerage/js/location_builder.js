var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var hours = String(today.getHours()).padStart(2, '0');
var mints = String(today.getMinutes()).padStart(2, '0');
var secnds = String(today.getSeconds()).padStart(2, '0');

var locedit_chec=false;

function get_rqbiLocations (accid,quote_version_name,indication_click) {
    
    $.ajax({
        url: laravel_url+"/get_rqbiLocations",
        type: 'post',
        data: {
            accid : accid,
            quote_version_name : quote_version_name,
            com_id : com_id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },

        success:function(response){
            console.log('response :',response);
            var obj = JSON.parse(response);
            var inc_rowid = 1;
            var obj_length = obj.loc_details.length;
            var last_loc_id = obj.last_location_id;
            var addloc = '';

            if (obj.copy_address_check == 'checked') { 
                $('#copyAddrCheck').prop('checked',true);
            } else { 
                $('#copyAddrCheck').prop('checked',false); 
            }

            if (obj.loc_details.length > 0) { 
                var loc_details_no = obj.loc_details[0].location_no; 
            } else { 
                var loc_details_no = 1;
            }

            //console.log('bind_cityVal :',obj.bind_cityVal['2']);
            $('.loc_input_fields_wrap').html('<div data-locrowid="1" data-locno="1" class="col-md-12 pull-left p-0 locbigdiv locDiv incRow locMainDiv locMainDiv_'+loc_details_no+'"><div class="pull-left col-md-11 p-0"><div class="pull-left height80 locCount"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">L1</label></div></div><div class="col-md-3 pull-left p-0 height80" style="min-width: 241px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 1 <span class="color_red">*</span></label><div class="txttooltip"><input type="text" class="form-control locAddress1 get_loc_onblr" data-column="address1" data-Lid="'+loc_details_no+'" id="locAddress1_1" data-appendId-val="1" name="locAddress1" placeholder="Enter Address 1"></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 2 </label><div class="txttooltip"><input type="text" class="form-control locAddress2 get_loc_onblr" data-column="address2" data-Lid="'+loc_details_no+'" data-appendId-val="1" id="locAddress2_1" placeholder="Address 2"></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Zip Code <span class="color_red">*</span> </label><input type="text" class="form-control locZipcode get_loc_onblr" data-column="zip" data-Lid="'+loc_details_no+'" data-appendId-val="1" id="locZipcode_1" data-rowid="1" placeholder="Zip Code"></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">City <span class="color_red">*</span> </label><span class="locationCity_1 locCitySpan_1"><select class="form-control loc_city_name_hide_1 locCity location_cty_onchg" data-Lid="'+loc_details_no+'" data-appendId-val="1" id="locCity_1" name="loc_city_name_hide_1" placeholder="City"></select></span></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">State <span class="color_red">*</span> </label><div class="txttooltip"><input readonly type="text" class="form-control locState get_loc_onblr" data-column="state" data-Lid="'+loc_details_no+'" data-appendId-val="1" id="locState_1" placeholder="State"></div></div></div></div><div class="pull-left col-md-1 p-0"  style="position: relative; right: -6px;"><div class="pull-left mt35 p-0 position_relative"><span class="mt-1 mr-1 locAdd loc_add_field_button"  data-add-rowid="1" data-Lid="'+loc_details_no+'" data-appendId-val="1" data-rw-id="1" data-toggle="tooltip" data-html="true" data-placement="top" data-total-count="'+loc_details_no+'" data-original-title="<em> Add </em>" ><i class="fa fa-plus-circle" aria-hidden="true"></i></span><span id="locDelete_1" style="display:none;" class="bg-danger mt-1 mr-1 locDelete remove_field" data-rowid="1" data-toggle="tooltip" data-html="true"  data-placement="top" data-Lid="'+loc_details_no+'" data-appendId-val="1" data-original-title="<em> Delete </em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="mt-1 bg-info locClone" data-loccloneid="1" data-rowid="1"  data-toggle="tooltip" data-html="true" data-placement="top" data-Lid="'+loc_details_no+'" data-appendId-val="1" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span></div></div></div>');

            if (obj.loc_details.length > 0) {
                $('#locAddress1_1').val(obj.loc_details[0].address1);
                $('#locAddress2_1').val(obj.loc_details[0].address2);
                $('#locZipcode_1').val(obj.loc_details[0].zip);
                retrive_and_get_city (obj.loc_details[0].zip,'1',obj.loc_details[0].city);
                $('#locState_1').val(obj.loc_details[0].state_description);
            }

            for (var i in obj.loc_details) {
                if (i > 0) {              
                    $('.locDelete').show();
                    $('.consLocNo').removeClass('loc_inc_no');
                    inc_rowid = $('[data-locrowid]').length+1;
                    each_loc_no = $('.locMainDiv').length+1;
            
                    if (obj.loc_details[i].address1 != null ) { 
                        var get_address1 = obj.loc_details[i].address1; 
                    } else { 
                        var get_address1 = ""; 
                    }

                    if (obj.loc_details[i].address2 != null) { 
                        var get_address2 = obj.loc_details[i].address2; 
                    } else { 
                        var get_address2 = ""; 
                    }

                    if (obj.loc_details[i].zip != null) { 
                        var get_zip = obj.loc_details[i].zip; 
                    } else { 
                        var get_zip = ""; 
                    }

                    if (obj.loc_details[i].city != null) { 
                        var get_city = obj.loc_details[i].city; 
                    } else { 
                        var get_city = ""; 
                    }

                    if (obj.loc_details[i].state_description != null) { 
                        var get_state = obj.loc_details[i].state_description; 
                    } else { 
                        var get_state = ""; 
                    }

                var dataLid = obj.loc_details[i].location_no; 

                var addloc = '<div data-locrowid="'+inc_rowid+'" data-locno="1" class="col-md-12 pull-left p-0 newLocAdd locMainDiv locMainDiv_'+dataLid+' locDiv incRow locRow_'+inc_rowid+'"><div class="pull-left col-md-11 p-0"><div class="pull-left height80 locCount locCount_'+inc_rowid+'"><div class="form-group"><label class="col-sm-12 col-form-label pl-0 consLocNo">L'+each_loc_no+'</label></div></div><div class="col-md-3 pull-left p-0 height80" style="min-width: 241px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 1 <span class="color_red">*</span></label><div class="txttooltip"><input type="text" class="form-control locAddress1 get_loc_onblr" data-column="address1" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" id="locAddress1_'+inc_rowid+'" name="locAddress1" placeholder="Address 1" value="'+get_address1+'"></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 2 </label><div class="txttooltip"><input type="text" class="form-control locAddress2 get_loc_onblr" data-column="address2" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" id="locAddress2_'+inc_rowid+'" placeholder="Address 2" value="'+get_address2+'"></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Zip Code <span class="color_red">*</span> </label><input type="text" class="form-control locZipcode locZipcode_'+inc_rowid+' get_loc_onblr" data-column="zip" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" id="locZipcode_'+inc_rowid+'" data-rowid="'+inc_rowid+'" placeholder="Zip Code" value="'+get_zip+'"></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">City <span class="color_red">*</span> </label><span class="locCitySpan_'+inc_rowid+'"><select class="form-control locCity location_cty_onchg city_name_hide_'+inc_rowid+' locCity_'+inc_rowid+'" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" id="locCity_'+inc_rowid+'" placeholder="City"><option value="'+get_city+'">'+get_city+'</option></select></span></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">State <span class="color_red">*</span> </label><div class="txttooltip"><input readonly type="text" class="form-control locState locState_'+inc_rowid+'" data-column="state" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" id="locState_'+inc_rowid+'" placeholder="State" value="'+get_state+'"></div></div></div></div><div class="pull-left col-md-1 p-0" style="position: relative; right: -6px;"><div class="pull-left mt35 p-0 position_relative"><span class="mt-1 mr-1 locAdd loc_add_field_button"  data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" data-rw-id="'+inc_rowid+'" data-add-rowid="1" data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Add </em>"><i class="fa fa-plus-circle" aria-hidden="true"></i></span><span id="locDelete_'+inc_rowid+'" class="bg-danger mt-1 mr-1 locDelete remove_field" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" data-rowid="'+inc_rowid+'" data-toggle="tooltip" data-html="true"  data-placement="top" data-original-title="<em> Delete </em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="mt-1 bg-info locClone locClone_'+inc_rowid+'" data-loccloneid="'+inc_rowid+'" data-Lid="'+dataLid+'" data-appendId-val="'+inc_rowid+'" data-rowid="'+inc_rowid+'" data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span></div></div></div>';

                $(".loc_input_fields_wrap").append(addloc);
                $('#locRowCount').val(inc_rowid);
                
                if (get_zip != "") {
                    
                    $('#locCity_'+dataLid).html(obj.bind_cityVal[dataLid]);
                }

                $('.loc_add_field_button').attr('data-total-count',last_loc_id);
            }
        }
    },
        complete: function () {
            $('.qvSpinner').hide();
            $('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').removeClass('accordDisabled');
            
            get_state_specific_details ();
            rqbi_responsive();
            
            var loc_main_lghth = $('.locMainDiv').length;
        
            if (loc_main_lghth == 1) { 
                $('.locDelete').hide();
            }

        }
    });
}


$(document).on("click", "#loceditWarningOk", function () {
    
    var u_rid = $(this).attr('data-cuniqueid');
    var data_column1 = $('#loceditWarningOk').attr('data-data_column'); 
    var value1 = $('#loceditWarningOk').attr('data-value'); 
    var data_Lid1 = $('#loceditWarningOk').attr('data-data_Lid'); 
    var get_this_id1=$('#loceditWarningOk').attr('data-get_this_id');
    var data_appendid_val=$('#loceditWarningOk').attr('data-appendid-val');
    var ssource=$('#loceditWarningOk').attr('data-ssource');

    if(ssource=='location'){
        location_save_and_update(data_column1,data_Lid1,value1,get_this_id1,data_appendid_val);    
    }else{
        city_save_and_update(data_column1,data_Lid1,value1);
    }
    
        $(".cbLocSelect").each(function(){
            var loc = $(this).find('option:selected').val();
            var erid = $(this).attr('data-rowid');

                if(loc == u_rid) {
                    if($('#locZipcode_'+u_rid).val()!='' && $('#locCity_'+u_rid).val()!='' && $('#locAddress1_'+u_rid).val()!=''){
                        $("#rqbiExposure_"+erid).trigger("focusout");
                    }
                }
            
        });
     
});

$(document).on("click", "#loceditWarningCancel", function () {
    var rowid = $('#loceditWarningOk').attr('data-data_Lid'); 
    var data_column = $('#loceditWarningOk').attr('data-data_column'); 
    var previous_zip = $('#locZipcode_'+rowid).attr('data-previous_zip');
    if(data_column=='zip'){
        $('#locZipcode_'+rowid).val(previous_zip);
        $('#invld_zip_erHlght').remove();
    }
});

$(document).on('click select', '.get_loc_onblr', function () {
    var zip_val = $(this).val();
    if(zip_val!=''&&zip_val.length==5){
        $(this).attr('data-previous_zip',zip_val);
    }
});

$(document).on('change', '.get_loc_onblr', function () {

	var data_column = $(this).attr('data-column');
	var data_Lid = $(this).attr('data-Lid');
	var value = $(this).val().substr(0,5);
    var get_this_id = $(this).attr("id");
    var data_appendid_val = $(this).attr('data-appendid-val');

    var previous_zip = $(this).attr('data-previous_zip');

    if (value.length == 5 && previous_zip != value) {
        if ($('#locZipcode_'+data_appendid_val).val() !='' && $('#locCity_'+data_appendid_val).val() !='' && $('#locAddress1_'+data_appendid_val).val() !='' && data_column == "zip"){//mytest
            locedit_chec=false;
            // var accid = localStorage.getItem('accid');
            $.ajax({
                url: laravel_url+"/check_zipcode_used",
                method: 'post',
                data:{'accid': accid,'com_id' : com_id,'rqbi_id' : rqbi_id, 'pre_loc_id':data_Lid},
                dataType: 'json',
                success: function(response) {
                    if(response.check_flag==1){
                        $('.loceditPopup').trigger('click');
        
                        $('#loceditWarningOk').attr('data-cuniqueid', data_Lid); 
                        $('#loceditWarningOk').attr('data-data_column', data_column); 
                        $('#loceditWarningOk').attr('data-value', value); 
                        $('#loceditWarningOk').attr('data-data_Lid', data_Lid); 
                        $('#loceditWarningOk').attr('data-get_this_id', get_this_id);
                        $('#loceditWarningOk').attr('data-appendid-val', data_appendid_val);
                        $('#loceditWarningOk').attr('data-ssource', 'location'); 
                    }else{
                        locedit_chec=true;
                    }
                },
                error: function(){
        
                },
                complete :function(){
                    if(locedit_chec==true){
                        location_save_and_update(data_column,data_Lid,value,get_this_id,data_appendid_val);
                    } 
                }
            });
               
        } else{
            location_save_and_update(data_column,data_Lid,value,get_this_id,data_appendid_val);
        }
        
        
    }else{
        location_save_and_update(data_column,data_Lid,value,get_this_id,data_appendid_val);
    }

    
});

function location_save_and_update(data_column,data_Lid,value,get_this_id1,data_appendid_val){

    var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
    var acnt_id = $('#acnt_id').val();
    var current_user = localStorage.getItem('usernumericid');
    var split_this_id = get_this_id1.split("_");
    var this_attr_id = split_this_id[1];
    var validation_error = false;
    var address1 = $('#locAddress1_'+data_appendid_val).val().trim();
    $('#locAddress1_'+data_appendid_val).val(address1);
    var address2 = $('#locAddress2_'+data_appendid_val).val();
    var zip = $('#locZipcode_'+data_appendid_val).val();
    var city = $('#locCity_'+data_appendid_val).val();
    var state = $('#locState_'+data_appendid_val).val();

    var split_value = zip.split("-");
    var zip_code = split_value[0].trim();

    $('#locZipcode_'+data_appendid_val).val(zip_code);
    
    if (data_column == "address1" || data_column == "zip") { 
            if (value.trim() == "") {
                validation_error = true;
            }
        }

        if (validation_error) {

            $('#'+get_this_id1).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
            if (data_column == "zip") {
                $('#locCity_'+data_appendid_val).html('');
                $('#locState_'+data_appendid_val).val('');
            }

        } else if (address1 == '') {
            
            get_city (zip_code,data_column,data_Lid,rqbiQuoteVersion,acnt_id,this_attr_id,get_this_id1,address1,address2,data_appendid_val,'empty_address');  
      
        } else {

            $('#'+get_this_id1).removeAttr('style').prev("label").removeAttr('style');
            $('#invld_zip_erHlght').remove();

            if (rqbiQuoteVersion != "") {
                if (value != "" || data_column == "address2") {
                    if (data_column == "zip") {
                        var split_value = zip.split("-");
                        var zip_code = split_value[0].trim();
                        $('#locZipcode_'+data_appendid_val).val(zip_code);
                        console.log("zip_code 2 : "+zip_code);
                        get_city (zip_code,data_column,data_Lid,rqbiQuoteVersion,acnt_id,this_attr_id,get_this_id1,address1,address2,data_appendid_val,'');  
                    } else {
                        var lzpcd = $('#locZipcode_'+data_appendid_val).val();
                        if (lzpcd != "") {
                            console.log("zip_code 3 : "+zip_code);
                            get_city (zip_code,data_column,data_Lid,rqbiQuoteVersion,acnt_id,this_attr_id,get_this_id1,address1,address2,data_appendid_val,''); 
                        } 
                   }
                } 

            } else {
                new PNotify({ title: 'Error', text: 'Quote Version Should not Empty', delay: 1500, type: 'error' });    
            }
        }
}

function get_city (zip,data_column,data_Lid,rqbiQuoteVersion,accid,this_attr_id,get_this_id,address1='',address2='',data_appendid_val,empty_address='') {
	var current_user = localStorage.getItem('usernumericid');
		    
	$.ajax({
		type: "post",
		url: laravel_url+"/get_zip_base_details",
		data: {
            zip : zip,
            data_column : data_column,
            data_Lid : data_Lid,
            rqbiQuoteVersion : rqbiQuoteVersion,
            accid : accid,
            com_id : com_id,
            current_user : current_user,
            address1: address1,
            address2: address2,
            empty_address: empty_address
        },
		dataType: "json",
		success: function(data) {
            var obj = data;
            $('.new_allFrmVarInfoSecAuto').hide();
            $('.locDetAccord').removeAttr('style');
            $('.locDetAccord a').removeAttr('style');
            if (obj.city != "") {
                $('#locCity_'+data_appendid_val).html(obj.city_options);
                $('#locState_'+data_appendid_val).val(obj.state_description);
                $('ul li a input[value="'+obj.state+'"]').prop('checked',false);
                $('ul li a input[value="'+obj.state+'"]').click();
                $('#invld_zip_erHlght').remove();
            } else {
                if (zip.length > 1) {
                    $('#locZipcode_'+data_appendid_val).val('');
                    $('#locCity_'+data_appendid_val).html('');
                    $('#locState_'+data_appendid_val).val('');
                    $('#locZipcode_'+data_appendid_val).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
                    $('#invld_zip_erHlght').remove();
                    $('#locZipcode_'+data_appendid_val).after( '<label style="color:#ed4613;" id="invld_zip_erHlght">Invalid Zipcode</label>' );
                }
            }

            if (obj.process == "Updated Successfully") {
                enabled_continueTofullQuote();
                checkContinueToFullQuoteStatus();
            }
		},
		error: function() {
		    new PNotify({ title: 'Error', text: 'json not found', delay: 1500, type: 'error' });
		},
		complete: function() {
            rqbi_class_code_retrive(com_id,accid);
		}
	});
}

function deleteLocationDetails (data_Lid,rqbiQuoteVersion,accid){

	var deleted_by = localStorage.getItem('usernumericid');
    
	$.ajax({
        type:"POST",
        url: laravel_url+"/delete_rqbiLocations",
        data: {  
      	    accid : accid,
      	    data_Lid : data_Lid,
      	    rqbiQuoteVersion : rqbiQuoteVersion,
      	    deleted_by : deleted_by,
            com_id : com_id
      	},
        success: function (response) {
            var obj = jQuery.parseJSON( response );
            if (obj.status == '1') {
                new PNotify({ title: 'Success', text: obj.message, delay: 2000, type: 'success' });
                enabled_continueTofullQuote();
                checkContinueToFullQuoteStatus();
            } else {
                new PNotify({ title: 'Error', text: obj.message, delay: 2000, type: 'error' });
            }

             $('#additionalInsuredAccord').removeClass('show');
             $('#selectFormsAccord').removeClass('show');
             $('#optionalCovAccord').removeClass('show');

             $('.aiFormsAccord').addClass('collapsed');
             $('.commonFormsAccord').addClass('collapsed');
             $('.rqbi_allforms_tabs').addClass('collapsed');

            setTimeout(function(){

                $('.aiFormsAccord').click();
                $('.commonFormsAccord').click();
                $('.rqbi_allforms_tabs').click();

            },500);

            

            
        }, complete: function (){
            rqbi_class_code_retrive (com_id,accid);
            var loc_main_lghth = $('.locMainDiv').length;
        
            if (loc_main_lghth == 1) { 
                $('.locDelete').hide();
            }
        }
    });
}

function retrive_and_get_city (zipcode,data_Lid,city_name){
    var city_option ='';
    $.ajax({
        type: "post",
        url: laravel_url+"/retrive_and_get_city",
        dataType: "json",
        data: {
            zipcode : zipcode,
            city_name : city_name
        },
        success: function (data) {
            if (data.city_dropdown != 'empty') {
                $('#locCity_'+data_Lid).html('');
                $('#locCity_'+data_Lid).html(data.city_options);
            }
        },
        error: function() {
            
        },
        complete: function() {          
        }
    });
}

$(document).on('change', '.location_cty_onchg' ,function() { 
    var data_column = 'city';
    var data_Lid = $(this).attr('data-Lid');
    var value = $(this).val();
    var get_this_id = $(this).attr("id");
    var data_appendid_val = $(this).attr('data-appendid-val');

    if ($('#locZipcode_'+data_Lid).val() != '' && $('#locCity_'+data_Lid).val() != '' && $('#locAddress1_'+data_Lid).val() != '' && $('.cbLocSelect_'+data_Lid).val() != '') {//mytest
        
        $(".cbLocSelect").each( function () {
                   
            if($(this).find('option:selected').val() == data_Lid){
               
                $('.loceditPopup').trigger('click');

                $('#loceditWarningOk').attr('data-cuniqueid', data_Lid); 
                $('#loceditWarningOk').attr('data-data_column', data_column); 
                $('#loceditWarningOk').attr('data-value', value); 
                $('#loceditWarningOk').attr('data-data_Lid', data_Lid);
                $('#loceditWarningOk').attr('data-get_this_id', get_this_id);
                $('#loceditWarningOk').attr('data-appendid-val', data_appendid_val); 
                $('#loceditWarningOk').attr('data-ssource', 'city');     
            }
    
        });

    } else if ($('#locZipcode_'+data_Lid).val() != '' && $('#locCity_'+data_Lid).val() != '' && $('#locAddress1_'+data_Lid).val() != '' && $('.cbLocSelect_'+data_Lid).val() == '') {

        locedit_chec = true;

    } else {
        locedit_chec = false;
    }

    if (locedit_chec == true) {
        city_save_and_update(data_column,data_Lid,value);
    }

});

function city_save_and_update(data_column,data_Lid,value,get_this_id,data_appendid_val){

    var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
    var acnt_id = $('#acnt_id').val();
    var current_user = localStorage.getItem('usernumericid');

        $.ajax({
        url: laravel_url+"/change_city_loc",
        type: 'post',
        data: {
            data_column : data_column,
            data_Lid : data_Lid,
            value : value,
            rqbiQuoteVersion : rqbiQuoteVersion,
            accid : acnt_id,
            current_user : current_user,
            com_id : com_id
        },
        success: function(response) {
            var obj = JSON.parse(response);
            if (obj.result == "success") {
                new PNotify({ title: 'Success', text: obj.msg, delay: 1500, type: 'success' });
                enabled_continueTofullQuote();
                checkContinueToFullQuoteStatus();
            } else {
                new PNotify({ title: 'Error', text: obj.msg, delay: 1500, type: 'error' });
            }
        },
        complete: function() {
            rqbi_class_code_retrive (com_id,acnt_id);
        }
    });

}

function get_store_location (accountid,ten_pdfhistory_id) {
    var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
    var created_by = localStorage.getItem('usernumericid');
    var indication_hide_val = $('#indication_hide_id').val();

    if(indication_hide_val == 'new' || indication_hide_val == "") {  
        var indication_hide_id = 0; 
    } else { 
        var indication_hide_id = indication_hide_val;
    }
    
    $.ajax({
        url: laravel_url+"/get_store_location",
        type: 'post',
        data: {
            acct_id : accountid,
            ten_pdfhistory_id : ten_pdfhistory_id,
            rqbiQuoteVersion : rqbiQuoteVersion,
            created_by : created_by,
            indication : indication_hide_id,
            com_id : com_id
        },
        success: function(response) {
          
        },
        complete: function() {
            $.when(get_rqbiLocations (accountid,rqbiQuoteVersion,'indication_click')).then( function () { 
                rqbi_class_code_retrive (com_id,accountid);
            });
            
            get_coverageLimit (accountid,rqbiQuoteVersion);
        }
    });
}

/*Location details - clone row*/
$(document).on("click", ".locClone", function() {
	var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
	rqbi_id = $('#rqbiQuoteVersion').val();
	var acnt_id = $('#acnt_id').val();
    var data_Lid = $(this).attr('data-Lid');
    var current_user = localStorage.getItem('usernumericid');

    var empty_check = locationRow_emptyCheck();

	if (empty_check) {
	    $.ajax({
			url: laravel_url+"/location_clone_add",
			type: 'post',
			data: {
                data_Lid : data_Lid,
                accid : acnt_id,
                rqbiQuoteVersion : rqbiQuoteVersion,
                current_user : current_user,
                com_id : com_id
            },
			success:function(response){
				var obj = JSON.parse(response);

				if (obj.result == 'success') {
                    $.when(get_rqbiLocations (acnt_id,rqbiQuoteVersion,'')).then( function () { 
                        rqbi_class_code_retrive (com_id,acnt_id);
                    });
	                new PNotify({ title: 'Success', text: obj.msg, delay: 1500, type: 'success' });
	                enabled_continueTofullQuote();
                    checkContinueToFullQuoteStatus();
                } else {
	                new PNotify({ title: 'Error', text: obj.msg, delay: 1500, type: 'error' });
	            } 
			},
			complete: function() {
					  	     
			}
		});

	} else {
		new PNotify({ title: 'Error', text: 'Mandatory Field Should not Empty', delay: 1500, type: 'error' });
	}
});

function locationRow_emptyCheck () {

    var validation_check = true;

    $(".locAddress1").each( function() {
        var value = $(this).val();
        if (value.trim() == "") {
            validation_check=false;
            $(this).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
        }
    });

    $(".locZipcode").each( function() {
        var value = $(this).val();
        if (value == "") {
            validation_check = false;
            $(this).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
        }
    });

    return validation_check;
}

$(document).on('change', '#copyAddrCheck', function () {
    var indval = $('#rqbiSubmission').val();
    if ($('#copyAddrCheck').is(':checked')) {
        check_copy_from_address('copy_addr_click'); 
    }   
});

function check_copy_from_address (get_click_action) {
    var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
    var acnt_id = $('#acnt_id').val();
    var address_org = $('#ac_mailAdd').val();
    var state_org = $('#ac_mailAdd_state').val();
    var city_org = $('#ac_mailAdd_city').val();
    var zip_org = $('#ac_mailAdd_zip').val();
    var current_user = localStorage.getItem('usernumericid');
    
    if (address_org != "" && zip_org != "" && city_org != "") { 
        $.ajax({
            url: laravel_url+"/check_copy_from_address",
            type: 'post',
            data: {
                accid : acnt_id,
                rqbiQuoteVersion : rqbiQuoteVersion,
                com_id : com_id,
                address_org : address_org,
                zip_org : zip_org,
                state_org : state_org,
                city_org : city_org,
                current_user : current_user
            },
            success: function(response) {
                if (response == "Already Exist") {
                    $('#copyAddrCheck').prop('checked',false);
                    $('#copy_addr_error').show();
                    $('#already_exits_err').show();
                    
                    setTimeout( function() { 
                        $('.copy_addr_error').hide();
                        $('#already_exits_err').hide(); 
                    }, 3000);
                } else if (response == "Insert Successfully") {
                    $.when(get_rqbiLocations(acnt_id,rqbiQuoteVersion,'')).then( function () { 
                        rqbi_class_code_retrive (com_id,acnt_id);
                    });
                } else {
                    new PNotify({ title: 'Error', text: 'Somethig Wrong', delay: 1500, type: 'error' });
                }
            },
            complete: function() {
                
            },
            error: function (data) {
                  
            }
        });
    } else {
        $('#copyAddrCheck').prop('checked',false);
        $('#copy_addr_error').show();
        if(get_click_action !='new_click') {
            $('#adrs_zip_empty_err').show();
        }
        
        setTimeout( function() { 
            $('#copy_addr_error').hide();
            $('#adrs_zip_empty_err').hide(); 
        }, 3000);
    }
}

/*Location Details - Delete Row*/
$(document).on("click", ".remove_field", function() {
    var rid = $(this).attr('data-rowid');
    var data_del_id = $(this).attr('data-Lid');
    var uniqid = $(this).attr('data-uniqid_'+rid);
    $('#locrow_delete_ok').attr('data-del-Lid',+data_del_id);
    $('.locDeletePopup').trigger('click');
    $('#locrow_delete_ok').attr('data-locrowid', rid);
    $('#locrow_delete_ok').attr('data-uniqid', uniqid);
    checkloc_in_composite(data_del_id);
});

$(document).on("click", "#locrow_delete_ok", function() {
    var rqbiQuoteVersion = $('#rqbiQuoteVersion').val();
    rqbi_id = $('#rqbiQuoteVersion').val();
    var acnt_id = $('#acnt_id').val();
    var data_Lid = $(this).attr('data-del-Lid');
    var check_comloc = $(this).attr('data-check_comloc');
    var com_loc_rid = $(this).attr('data-com_loc_rid');

    localStorage.setItem('forms_focus_status', 'no');
    
    $('.consLocNo').addClass('loc_inc_no');
    var rid = $(this).attr('data-locrowid');
    var uniqid = $(this).attr('data-uniqid');
    deleteLocationDetails (data_Lid,rqbiQuoteVersion,acnt_id);
    $('.locMainDiv_'+data_Lid).remove();
    $('.new_allFrmVarInfoSecAuto').hide();
    serialize_loc_no ();
    
    if (com_loc_rid) {
        var comlocid = com_loc_rid.split(',');
    }
    
    if (check_comloc == 1) {
        $.each(comlocid,function(i) {
            delete_compostive_rating(comlocid[i]);
        });
    }
});

function serialize_loc_no () {
    loc_no = 1;
    $(".locDiv").each( function () {
        $(this).attr('data-locno',loc_no);
        $(this).find('.loc_inc_no').text('L'+loc_no);
        loc_no++;
    });

    rowid = 1;
    $(".incRow").each( function () {
        $(this).attr('data-locrowid',rowid);
        rowid++;
    });
}

function checkloc_in_composite(data_del_id){
    // var accid = localStorage.getItem('accid');
    $.ajax({
      type: "post",
      cache : false,
      url: laravel_url+"/checkloc_in_composite",
      data:{ 'accid': accid, 'com_id' : com_id, 'loc_del_id' : data_del_id
      },
      success:function(response) {
        var obj = JSON.parse(response); 
        console.log(obj.count);
        if (obj.count >= 1) {
            $("#locDeletePopup").find('p').text("This Location includes Composite Rate, Which will also be deleted. Do you want to Countinue?");
            $('#locrow_delete_ok').attr('data-check_comloc', 1);
            $('#locrow_delete_ok').attr('data-com_loc_rid',obj.com_loc);
        } else if(obj.classBuilder_count >= 1) {
            $("#locDeletePopup").find('p').text("This location includes premium/composite rate, which will also be deleted. Do you want to continue?");
        } else {
            $("#locDeletePopup").find('p').text("Are you sure you want to delete?");
            $('#locrow_delete_ok').attr('data-check_comloc', 0);
        }       
      }
    });
}


$(document).on('mouseover', '.txttooltip', function() {
    var returnval = $(this).find('input').val();

    if( returnval == '' || returnval == 0 ) {
        $(this).removeAttr('data-tip');
    } else {
        $(this).attr('data-tip', returnval);
        $(this).find('input').removeAttr('title');
    }
});


/*Location details add row*/
var inc_rowid = 1;
$(document).on("click", ".loc_add_field_button", function() {
    
    var data_total_count = $(this).attr('data-total-count');
    
    locationRow_add_process(data_total_count);
    
});

function locationRow_add_process(data_total_count) {

    $('.consLocNo').removeClass('loc_inc_no');
    inc_rowid = $('[data-locrowid]').length+1;
    each_loc_no = $('.locMainDiv').length+1;
    
    var data_Lid = parseInt(data_total_count)+1;
    
    var empty_check = location_mandatoryField_chk();

    if(!empty_check){

        var addloc = '<div data-locrowid="'+inc_rowid+'" data-locno="1" class="col-md-12 pull-left p-0 newLocAdd locMainDiv locMainDiv_'+data_Lid+' locDiv incRow locRow_'+inc_rowid+'"><div class="pull-left col-md-11 p-0"><div class="pull-left height80 locCount locCount_'+inc_rowid+'"><div class="form-group"><label class="col-sm-12 col-form-label pl-0 consLocNo">L'+each_loc_no+'</label></div></div><div class="col-md-2 pull-left p-0 height80" style="min-width: 241px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 1 <span class="color_red">*</span> </label><div class="txttooltip"><input type="text" class="form-control locAddress1 get_loc_onblr" data-column="address1" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" id="locAddress1_'+data_Lid+'" name="locAddress1" placeholder="Address 1" ></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Address 2 </label><div class="txttooltip"><input type="text" class="form-control locAddress2 get_loc_onblr" data-column="address2" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" id="locAddress2_'+data_Lid+'" placeholder="Address 2"></div></div></div><div class="col-md-2 pull-left height80" style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">Zip Code <span class="color_red">*</span> </label><input type="text" class="form-control locZipcode locZipcode_'+data_Lid+' get_loc_onblr" data-column="zip" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" id="locZipcode_'+data_Lid+'" data-rowid="'+inc_rowid+'" placeholder="Zip Code" ></div></div><div class="col-md-2 pull-left height80"  style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">City <span class="color_red">*</span> </label><span class="locCitySpan_'+inc_rowid+'"><select class="form-control locCity location_cty_onchg city_name_hide_'+data_Lid+' locCity_'+data_Lid+'" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" id="locCity_'+data_Lid+'" placeholder="City"></select></span></div></div><div class="col-md-2 pull-left height80"  style="width:170px;"><div class="form-group"><label class="col-sm-12 col-form-label pl-0">State <span class="color_red">*</span> </label><div class="txttooltip"><input readonly type="text" class="form-control locState locState_'+data_Lid+'" data-column="state" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" id="locState_'+data_Lid+'" placeholder="State"></div></div></div></div><div class="pull-left col-md-1 p-0" style="position: relative; right: -6px;"><div class="pull-left mt35 p-0 position_relative"><span class="mt-1 mr-1 locAdd loc_add_field_button"  data-add-rowid="1" data-toggle="tooltip" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" data-rw-id="'+inc_rowid+'" data-html="true" data-placement="top" data-total-count="'+data_Lid+'" data-appendId-val="'+data_Lid+'" data-original-title="<em> Add </em>"><i class="fa fa-plus-circle" aria-hidden="true"></i></span><span id="locDelete_'+data_Lid+'" class="bg-danger mt-1 mr-1 locDelete remove_field" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" data-rowid="'+inc_rowid+'" data-toggle="tooltip" data-html="true"  data-placement="top" data-original-title="<em> Delete </em>"><i class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="mt-1 bg-info locClone locClone_'+data_Lid+'" data-loccloneid="'+data_Lid+'" data-Lid="'+data_Lid+'" data-appendId-val="'+data_Lid+'" data-rowid="'+inc_rowid+'" data-toggle="tooltip" data-html="true" data-placement="top" data-original-title="<em> Clone </em>"><i class="fa fa-files-o" aria-hidden="true"></i></span></div></div></div>';


        $(".loc_input_fields_wrap").append(addloc);
        $('#locRowCount').val(inc_rowid);
        $('.new_allFrmVarInfoSecAuto').hide();
        $('.loc_add_field_button').attr('data-total-count',data_Lid);
        setTimeout(function(){ 
        var uniq_id = $('#uniq_id').val();
        $('#locDelete_'+inc_rowid).attr('data-uniqid_'+inc_rowid, uniq_id);
        }, 1000);
        
        serialize_loc_no();

        if ($('[data-locrowid]').length > 1) {
            get_frstRwDel_id = $(".locDelete").first().attr("id");
            $('#'+get_frstRwDel_id).show();
        }

        rqbi_responsive();
    } else {
        new PNotify({ title: 'Error', text: 'Please fill mandatory fields', delay: 1500, type: 'error' });
    }
  
}