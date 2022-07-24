$(document).on('change', '.endorse_type', function () {
	var selectedval = $(this).children("option:selected").val();
	endorse_type_based_show(selectedval);
    insert_endorse_details(selectedval);	   
});

$(document).on('click', '.endorseDiscardBtn', function () {
    var endorse_type = $('#endors_type').val();
    if (endorse_type == 1) {
        $('#endorsement_popup').show();
    } else if (endorse_type == 2) {
        $('#cancellation_popup').show();
    } else if (endorse_type == 3) {
        $('#reinstatement_popup').show();
    } else if (endorse_type == 4) {
        $('#internalendorsement_popup').show();
    } else if (endorse_type == 5) {
        $('#audit_premium_popup').show();
    }
    $('.endorsediscardPopup').trigger('click');
});

$(document).on('change', '#cancel_reason', function () {
	var selectedval = $(this).children("option:selected").val();
	if( selectedval == 10 ) {
		$('.cancel_reason_sec').show();
	} else {
		$('.cancel_reason_sec').hide();
	}
});

$(document).on('click', '.endorseIssueBtn', function () {
	$('.endorseIssueDocs').show();
});

$(document).on('click', '.reinstateIssueBtn', function () {
	$('.reinstateDocs').show();
});

$(document).on('click', '.cancel_issueBtn', function () {
	$('.cancellation_Docs').show();
});

$(document).on('click', '.audit_IssueBtn', function () {
	$('.audit_IssueDocs').show();
});

function get_endorsetype() {

    if(rqbi_id != "") {
        $.ajax({
            type: "get",
            url: laravel_url + "/getendorse_type",
            data:{
                'rqbi_id': rqbi_id
            },
            success: function (data) {
                $(".endorse_type").find('option').remove();
                $(".endorse_type").append(data);
            },
            error: function () {
                console.log("Getting ajax error");
            },
            complete: function () {

            }
        });
    }
}

function get_cancellation_type() {
    $.ajax({
        type: "get",
        url: laravel_url + "/get_cancellation_type",
        
        success: function (data) {
            //alert("data"+data);
            $(".cancel_reason").find('option').remove();
            $(".cancel_reason").append(data);
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

        }
    });
}

function endorse_visible_process() {
    var host_name = location.host;
    if (host_name == 'localhost' && quote_ver_status == 'issue') {
        $('.endorse_card_header').show();
        $('.endorsementSection').show();
        $('.top_endor_discard_btn_sec').show();
        $('.endorse_rhs').show();
        retrive_endorsment();
        endorse_num_list_dropdown();
    } else if (quote_ver_status != 'issue' && host_name != 'localhost') {
        $('.endorse_card_header').hide();
        $('.endorsementSection').hide();
        $('.top_endor_discard_btn_sec').hide();
        $('.endorse_rhs').hide();
    } else {
        $('.endorse_card_header').hide();
        $('.endorsementSection').hide();
        $('.top_endor_discard_btn_sec').hide();
        $('.endorse_rhs').hide();
    }
}

function insert_endorse_details(selectedval){
    var userid =localStorage.getItem('usernumericid');
    // var acct_id = localStorage.getItem('accid');
    var new_uni_com_id = (new Date).getTime();
    $.ajax({
        url: laravel_url+"/insert_endorse_details",
        type:'post',
        data:{
            'acct_id': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'selectedval':selectedval, 
            'new_uni_com_id' :new_uni_com_id,
            'userid': userid
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            var db_rid = obj.rid;
            $('#endorse_rid').val(db_rid);
            $('.endorse_number').val(obj.end_num);
            
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
            endorse_type_based_enable_disable(selectedval);  
            $('#endors_type').attr('disabled','disabled'); 
        }
    });
}

function update_endorse_details(selectedval, column_name, rid){
    var userid =localStorage.getItem('usernumericid');
    // var acct_id = localStorage.getItem('accid');
    $.ajax({
        url: laravel_url+"/update_endorse_details",
        type:'post',
        data:{
            'acct_id': acct_id,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'selectedval':selectedval, 
            'column_name':column_name, 
            'rid':rid, 
            'userid': userid
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            console.log(obj.message);
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

        }
    });
}

$(document).on("click", "#endorseDiscardPopup_ok", function () {
    var endorse_rid = $('#endorse_rid').val();
    if (endorse_rid != '') {
        delete_endorsement(endorse_rid);
        //reset_endorsement(endorse_rid);
    }
});

function delete_endorsement(endorse_rid) {
    // var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        url: laravel_url + "/delete_endorsement",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'rid': endorse_rid,
            'userid': userid
        },

        success: function (data) {},
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
           $('#endors_type').prop('selectedIndex',0);
           $('#endorse_rid').val('');
           $('.endorse_number').val('');
           $('#endors_type').removeAttr('disabled','disabled');
           endorse_type_based_show(0);
        }

    });
}

function reset_endorsement(endorse_rid) {
    // var accid = localStorage.getItem('accid');
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        type: "post",
        url: laravel_url + "/reset_endorsement",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': rqbi_id,
            'rid': endorse_rid,
            'userid': userid
        },

        success: function (data) {},
        error: function () {
            new PNotify({
                title: 'Error',
                text: 'Getting error',
                delay: 1500,
                type: 'error'
            });
        },
        complete: function () {
           $('#endors_type').prop('selectedIndex',0);
           $('#endorse_rid').val('');
           $('.endorse_number').val('');
           $('#endors_type').removeAttr('disabled','disabled');
           endorse_type_based_show(0);
        }

    });
}

function endorse_type_based_show(selectedval) {
    if( selectedval == 0) {
        $('.endorse_fields').hide();
        $('.reinstate_field').hide();
        $('.endorse_number_field').hide();
        $('.rewrite_field').hide();
        $('.audit_field').hide();
        $('.cancellation_field').hide();
        $('.top_endor_discard_btn_sec').hide();
        $('.endosement_accordion').hide();
        $('.endorse_fields, .endorseDiscardBtn, .reinstate_field, .endorse_number_field, .rewrite_field, .audit_field, .cancellation_field').hide();
    } else {
        $('.endorseDiscardBtn').show();
    }
    if( selectedval == 1 || selectedval == 4 ) {
        $('.endorse_fields').show();
        $('.cancellation_field, .reinstate_field, .cancel_reason_sec, .audit_date, .audit_section, .cancellation_section, .rewrite_field, .audit_field').hide();
        $('.endorseDiscardBtn').text('').text('Discard Endorsement');
    } 

    if( selectedval == 1 ) {
        $('.endosement_accordion, .endorsement_section, .endorse_number_field').show();
        $('.reinstatement_section').hide();
    } 

    if( selectedval == 2 ) {
        $('.endosement_accordion, .cancellation_field, .cancellation_section').show();
        $('.endorse_fields, .reinstate_field, .audit_date, .audit_section, .audit_field, .rewrite_field, .endorse_number_field, .endorsement_section').hide();
        $('.endorseDiscardBtn').text('').text('Discard Cancellation');
        get_cancellation_type();

    } 

    if( selectedval == 3 ) {
        $('.endosement_accordion, .reinstatement_section, .reinstate_field, .endorse_number_field').show();
        $('.endorsement_section, .endorse_fields, .cancellation_field, .cancel_reason_sec, .audit_date, .audit_section, .audit_field, .rewrite_field, .cancellation_section').hide();
        $('.endorseDiscardBtn').text('').text('Discard Reinstatement');

    } 

    if( selectedval == 4 ) {
        $('.endosement_accordion, .interendor_section, .endorse_fields, .endorse_number_field').show();
        $('.endorsement_section, .cancellation_field, .reinstate_field, .cancel_reason_sec, .audit_date, .audit_section, .audit_field, .rewrite_field, .reinstatement_section, .cancellation_section').hide();
        $('.endorseDiscardBtn').text('').text('Discard Internal Endorsement');
    }   

    if( selectedval == 5 ) {
        $('.endosement_accordion, .audit_section, .audit_date, .audit_field').show();
        $('.endorsement_section, .cancellation_field, .reinstate_field, .cancel_reason_sec, .rewrite_field, .endorse_fields, .cancellation_section, .endorse_number_field, .interendor_section').hide();
        $('.endorseDiscardBtn').text('').text('Discard Premium Audit');
    }   
}

/*Start Endorsement type based disable or enable fields*/
function endorse_type_based_enable_disable (selectedval) {
    if (  selectedval == 1  ) {
        $('.ac_tname_frmgrp, .brokerageDba_frmgrp, .ac_mailAdd_zip_frmgrp, .ac_mailAdd_state_frmgrp, .ac_mailAdd_city_frmgrp, .ac_mailAdd_frmgrp, .insuredType_frmgrp, .businessDescription_frmgrp, .business_segment_frmgrp, .njTransaction_frmgrp, #rqbieffdate, #rqbiexpdate, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .deductibleInsuredDiv, .deductTbleSection, .sirTblSection, .rqbiTpa, .cbClasscode, .cbLocSelect, .rqbiExposure, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .multipleClasscodeDiv, .bind_compostive_loction, .compositeExposure, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .cbContinueFullquote, .override_required_ck, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiInspectionFee, .rqbiCommission, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, .op_forms_coverages, .allFrmsEdition, .allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .manuFrmsAddRow, .manuscriptFrmTable, .manuFrmuploadInput').removeClass('readonly_disabled').removeAttr('readonly');

        $('.ischeckedfunc').parent('div').parent('td').removeClass('readonly_disabled');

        $('#endors_type, #endorseDte').removeAttr('disabled');

        $('.classbuildGraduatedRating, .cbCompRating').removeClass('disabled');

        $('.lob_multiselect, .business_unit_frmgrp, .ac_tstatus_frmgrp, .bind_brokers_frmgrp, .ac_tpass_frmgrp, .rqbiQuoteVersion, #rqbi_tab_rightSide, .rqbi_policy_type, .endorse_number, .cancellationDate, .cancel_reason, #cancellationMethod, #cancel_return_prem, .can_reason_det, #audit_date, .rqbiLiquorSicCode_frmgrp, #reinstatementDate').addClass('readonly_disabled');
    } 

    if ( selectedval == 2 ) {
        $('.cancellationDate, .cancel_reason, .cancellationMethod, #cancel_return_prem, .can_reason_det').removeClass('readonly_disabled');

        $('#endors_type').removeAttr('disabled');

        $('.ac_tpass_frmgrp, .business_segment_frmgrp, .rqbiInspectionFee_frmgrp, .rqbiCommis_frmgrp, .rqbiExposure, .cbCompRating, .compositeExposure, #audit_date, #reinstatementDate').addClass('readonly_disabled');

        endorse_common_disable_fields ();

        $('#endorseDte').attr('disabled');
    }

    if ( selectedval == 3 ) {
        $('#reinstatementDate').removeClass('readonly_disabled');

        $('#endors_type').removeAttr('disabled');

        $('.ac_tpass_frmgrp, .business_segment_frmgrp, .cancellationDate, .cancel_reason, .cancellationMethod, #cancel_return_prem, .can_reason_det, #audit_date, .rqbiExposure, .cbCompRating, .compositeExposure, .rqbiInspectionFee_frmgrp, .rqbiCommis_frmgrp').addClass('readonly_disabled');

        endorse_common_disable_fields ();

        $('#endorseDte').attr('disabled');
    }

    if ( selectedval == 4 ) {
        $('.ac_tpass_frmgrp, .business_segment_frmgrp, .rqbiInspectionFee_frmgrp, .rqbiCommis_frmgrp').removeClass('readonly_disabled').removeAttr('readonly');

        $('#endors_type, #endorseDte').removeAttr('disabled');

        $('.cancellationDate, .cancel_reason, #cancellationMethod, #cancel_return_prem, .can_reason_det, .rqbiExposure, .cbCompRating, .compositeExposure, #audit_date, #reinstatementDate').addClass('readonly_disabled');

        endorse_common_disable_fields ();
    }

    if ( selectedval == 5 ) {
        $('#audit_date, .rqbiExposure, .compositeExposure').removeClass('readonly_disabled').removeAttr('readonly');

        $('#endors_type').removeAttr('disabled');
        $('.cbCompRating').removeClass('disabled');

        $('#reinstatementDate').addClass('readonly_disabled');

        endorse_common_disable_fields ();
    }
}

function endorse_common_disable_fields () {
    $('.ac_tname_frmgrp, .ac_lob_frmgrp, .business_unit_frmgrp, .ac_tstatus_frmgrp, .bind_brokers_frmgrp, .brokerageDba_frmgrp, .ac_mailAdd_zip_frmgrp, .ac_mailAdd_state_frmgrp, .ac_mailAdd_city_frmgrp, .ac_mailAdd_frmgrp, .insuredType_frmgrp, .businessDescription_frmgrp, .njTransaction_frmgrp, .rqbiQuoteVersion, #rqbi_tab_rightSide, #rqbieffdate, #rqbiexpdate, .rqbi_policy_type, .endorse_number, #locationAccord, .pstateSec, .stateSpecficSec, .covckbx, .rqbiEachOccurDiv_frmgrp, .rqbiGeneralAggrDiv_frmgrp, .rqbiProdGeneralAggr_frmgrp, .rqbiPersonalInjury_frmgrp, .rqbiMedicalExp_frmgrp, .rqbiDamagetoPrem_frmgrp, .deductibleInsuredDiv, .deductTbleSection, .sirTblSection, .rqbiTpa, .cbClasscode, .cbLocSelect, .rqbiFinalRate, .cbAction, .rqbiRemarks, .rqbiCreditDebit, .ifany_radiobtn, .included_radiobtn, .rqbiPremium, .classbuildGraduatedRating, .ExposureFrom, .gradExpEditInput, .gradRateEditInput, .graduate_actions, .Add_GraduatedRating_div, .multipleClasscodeDiv, .bind_compostive_loction, .bind_premium_basis, .composite_actions, .bind_compostive_class_code_singleselect, .compositeDevRate, .compositepremium, .cbContinueFullquote, .override_required_ck, .triaAcceptReject, .rqbiTriaPercAmount, .rqbiTriaAmount, .rqbiPaymentTerm, #fullyEarnedDate, .rqbiMinPremium, .rqbiMinDeposit, .rqbiAuditableDiv, .rqbiAuditFreq, .rqbiDesigContractor, .op_forms_coverages, .allFrmsEdition, .allFrmsPremLbl, .isflatfullcheckedfunc, .allforms_readonly, .manuFrmsAddRow, .manuscriptFrmTable, .manuFrmuploadInput').addClass('readonly_disabled');
}

/*End Endorsement type based disable or enable fields*/

function retrive_endorsment(source) {
    // var accid = localStorage.getItem('accid');
    var get_rqbi_id = $('#rqbiQuoteVersion').val();

    $.ajax({
        type: "post",
        url: laravel_url + "/retrive_endorsment",
        data: {
            'accid': accid,
            'com_id': com_id,
            'rqbi_id': get_rqbi_id
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data);
            if (obj.data.length > 0) {
                if (obj.data[0]['endorse_status'] != 2){            
                    retrieve_list(obj.data[0]);    
                }     
            }

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
        }
    });

}

$(document).on('focusout','#endorseDte, #audit_Dte, #reinstateDte',function() {
    
    var effetcive_date = $(this).val();
    var this_id = $(this).attr('id');
    var this_lbl_name = $(this).attr('data-lbl-name');
    var column_name = '';

    if (this_lbl_name == 'Endorsement') {
        column_name = 'effective_date';
    } else if ( this_lbl_name == 'Cancellation') {
        column_name = 'cancel_effective_date';
    } else if ( this_lbl_name == 'Reinstatement') {
        column_name = 'reinstatement_effective_date';
    } else if( this_lbl_name == 'Audit') {
        column_name = 'audit_effective_date';
    } 

    Endrs_effectiveDate_validation(effetcive_date, this_id, this_lbl_name, column_name);
});

$(document).on('focusout','#endorse_wording, #endorse_premium, #cancel_return_prem, #audit_wording, #premium_audit, #can_reason_det',function() {
    
    var this_value = $(this).val();
    var this_id = $(this).attr('id');
    var this_rid = $('#endorse_rid').val();
    var column_name = "";
    if (this_id == 'endorse_wording' || this_id == 'audit_wording') {
        if (this_value == "") {
            if ( this_id == 'audit_wording' ) {
                $('#'+this_id).addClass('redBorder');
                $('#invalid_audit_wording').show();
                $('#invalid_audit_wording').css('color','red');
            } else if ( this_id == 'endorse_wording' ) {
                $('#'+this_id).addClass('redBorder');
                $('#invalid_endorse_wording').show();
                $('#invalid_endorse_wording').css('color','red');
            } 
        } else {
            column_name = "endorse_wording";
            $('#'+this_id).removeClass('redBorder');
            $('#invalid_endorse_wording').hide();
        }
    } else if (this_id == 'endorse_premium' || this_id == 'cancel_return_prem' || this_id == 'premium_audit' ) {
        column_name = "premium";
    } else if (this_id == 'can_reason_det') {
        column_name = "cancel_reason_desc";
    }

    if(column_name != '' && this_value != '' ) {
        update_endorse_details(this_value, column_name, this_rid);
    }
});


$(document).on('change','#cancel_reason',function() {
    var this_value = $(this).val();
    var this_id = $(this).attr('id');
    var this_rid = $('#endorse_rid').val();
    var column_name = "cancel_reason_id";   
    if(column_name != '' && this_value != '') {
       update_endorse_details(this_value, column_name, this_rid);
    }
});

$(document).on('click','#audit_waiver, .cancel_method_radio',function() {
    var this_value = 0;
    var this_id = $(this).attr('id');
    var this_rid = $('#endorse_rid').val();
    var column_name = ""; 
    $('.audit_wording_sec').hide();
    $('.audit_premium_sec').hide(); 

    if (this_id == 'cancel_method_flat') {
        this_value = 1;
        column_name = "cancel_method"; 
    } else if (this_id == 'cancel_method_shortrate') {
        this_value = 2;
        column_name = "cancel_method"; 
    } else if (this_id == 'cancel_method_prorate') {
        this_value = 3;
        column_name = "cancel_method"; 
    } else if (this_id == 'audit_waiver') {
        if ($('#audit_waiver').prop('checked') == true ) {
            this_value = 1;
            column_name = "audit_waiver";
            $('.audit_wording_sec').show();
            $('.audit_premium_sec').show(); 
        } else {
            this_value = 0;
            $('.audit_wording_sec').hide();
            $('.audit_premium_sec').hide(); 
            update_endorse_details(this_value, column_name, this_rid);
        }
    }

    if (this_value != 0) {
       update_endorse_details(this_value, column_name, this_rid);
    }
});


$(document).on('click','.date_icon',function() {    
    var txbx_id = $(this).attr('data-id');
    var effetcive_date = $("#"+txbx_id).val();
    var this_lbl_name = $(this).attr('data-lbl-name');
    var column_name = '';

    if (this_lbl_name == 'Endorsement') {
        column_name = 'effective_date';
    } else if ( this_lbl_name == 'Cancellation') {
        column_name = 'cancel_effective_date';
    } else if ( this_lbl_name == 'Reinstatement') {
        column_name = 'reinstatement_effective_date';
    } else if( this_lbl_name == 'Audit') {
        column_name = 'audit_effective_date';
    } 

    Endrs_effectiveDate_validation(effetcive_date, txbx_id, this_lbl_name, column_name);
});


function Endrs_effectiveDate_validation(effetcive_date, this_id, lbl_name, column_name) {

    var rqbi_effect_date = new Date($('#rqbieffdate').val());
    var rqbi_expiry_date = new Date($('#rqbiexpdate').val());
    var eff_date = new Date(effetcive_date);
    console.log("==",eff_date,"===",effetcive_date);
    var this_rid = $('#endorse_rid').val();
    
    if (effetcive_date != "") {
        
        if (eff_date < rqbi_effect_date) {
            $('#'+lbl_name+'_eff_err').html("The "+ lbl_name +" Effective Date is prior to the Policy Effective Date. Please select a new "+ lbl_name +" Effective Date.").attr("style","color:#ed4613;");
            $('#'+this_id).attr('style','border-color:#ed4613;');
            
        } else if (eff_date > rqbi_effect_date && eff_date > rqbi_expiry_date) {
            $('#'+lbl_name+'_eff_err').html("The "+ lbl_name +" Effective Date is after the Policy Expiration Date. Please select a new "+ lbl_name +" Effective Date").attr("style","color:#ed4613;");
            $('#'+this_id).attr('style','border-color:#ed4613;');

        } else {
             update_endorse_details(effetcive_date, column_name, this_rid);
        }  
    }
}

function endorse_num_list_dropdown() {

    $.ajax({
        type: "get",
        url: laravel_url + "/endorse_num_list_dropdown",
        data:{
            'rqbi_id': rqbi_id
        },
        success: function (data) {
            console.log(data);
            var obj_val = JSON.parse(data);
            $('.endorse_num_list').html(obj_val.endrsNum_options);
        },
        error: function () {
            
        },
        complete: function () {

        }
    });

}

$(document).on('change','.endorse_num_list',function() { 

    var value = $(this).val();
    if (value != "") {
        endorse_num_base_details(value)
    }

});

function endorse_num_base_details(endorse_num_rid) {
    $.ajax({
        type: "post",
        url: laravel_url + "/endorse_num_base_details",
        data:{
            'endorse_num_rid': endorse_num_rid
        },
        success: function (data) {
            //console.log(data);
            var obj = JSON.parse(data);
            if (obj.endorse_details.length > 0) {
                retrieve_list(obj.endorse_details[0]);   
                //endorse_type_based_show(obj.endorse_details[0].endorse_type);
            }
        },
        error: function () {
            
        },
        complete: function () {

        }
    });
}


function retrieve_list(data){
    $('#endorse_rid').val(data.rid);
    $('.endorse_number').val(data.end_num);
    endorse_type_based_show(data.endorse_type)
    var effective_date = (data.effective_date).split('-');
    effective_date = effective_date[2]+'-'+effective_date[1]+'-'+effective_date[0];
    $("#endors_type > [value=" + data.endorse_type + "]").prop("selected", "true");
    $('#endors_type').attr('disabled','disabled');
    if (data.endorse_type == 1) {
        $('.endorse_wording').val(data.endorse_wording);
        $('.endorseDte').val(effective_date);
    } else if (data.endorse_type == 2) {
        $('#cancel_return_prem').val(data.premium);
        $('#prorate').val(data.prorate);   
        $('.cancel_effective_date').val(effective_date);     
        setTimeout(function () {
            $("#cancel_reason > [value=" + data.cancel_reason_id + "]").prop("selected", "true");
        }, 500);
        if (data.cancel_method == 1) {
            $('#cancel_method_flat').prop('checked', true);
        } else if (data.cancel_method == 2) {
            $('#cancel_method_shortrate').prop('checked', true);
        } else if (data.cancel_method == 3) {
            $('#cancel_method_prorate').prop('checked', true);
        }
        var others = $('#cancel_reason option:selected').val();
        if ( others == 10 ) {
            $('#can_reason_det').show();
        }
    } else if (data.endorse_type == 3) {
        $('.endorse_wording').val(data.endorse_wording);
        $('.reinstateDte').val(effective_date);
    } else if (data.endorse_type == 5) {
        $('#audit_wording').val(data.endorse_wording);
        if (data.audit_waiver != 0) {
            $('#audit_waiver').prop('checked', true);
            $('.audit_wording_sec').show();
            $('.audit_premium_sec').show();
        } else {
            $('#audit_waiver').prop('checked', false);
            $('.audit_wording_sec').hide();
            $('.audit_premium_sec').hide();
        }
        $('.audit_Dte').val(data.effective_date);
        $('#premium_audit').val(data.premium);
    }
}

$(document).on("click", "#endorseDte", function() {
    $(".datepicker-days .day").click(function() {
    });
});    

$(document).on("click", ".endorse_date_icon", function() {
    $(".datepicker-days .day").click(function() {
    });
});