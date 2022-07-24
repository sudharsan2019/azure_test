/****** optional / Miscellaneous Coverage Code ************/
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

$(document).on('click', '#optionaCoverage_sec', function() {
    
    var ex = $(this).attr('aria-expanded');
    var data_oc_updata = $('#cbContinueFullquote').attr('data-oc-updata');
    if (ex == "true") {
        optionalCov_details('empty', 'ocTabClick_process', '', data_oc_updata);
    }

});


$(document).on('change', '.ocCoverages', function(e) {
    
    var optional_type_id = $(this).attr('id');
    var optional_data_id = $(this).attr('data-id');
    optionalCov_details(optional_type_id, 'chek_unchk_process', optional_data_id, 'yes');
    var check_status = $(this).prop('checked');
    if (check_status == false) {
        var accnt_id = $('.session_hide_tab').find('.active').find('.accountid').val();
        var userid = localStorage.getItem('usernumericid');
        var coverage_id = $(this).attr('id');
        if (coverage_id == 'ocEmpLib'){
            var form_type = 4;
        }
        if(coverage_id == 'ocStopGap') {
            var form_type = 5;
        }
        if(coverage_id == 'ocAutoLiability'){
            var form_type = 6;
        }
        setTimeout(function(){
            $.ajax({
                url: laravel_url+"/reset_oc_premium",
                type:'post',
                data:{ userid:userid, acct_id:accnt_id, com_id:com_id, rqbi_id:rqbi_id, form_type:form_type},
                success:function(response) {
                    get_rhs_classbuilder(accnt_id);
                    updateQuoteNameBasedTotalPremium();
                }
            });
        }, 500);
        
    }
    
});


function optionalCov_details(optional_type_id, get_process, optional_data_id, data_oc_updata) {
    $('#Optinalcover_emp').show();
    var accnt_id = accid;
    var get_rqbi_id = $('#rqbiQuoteVersion').val();
    var current_user = localStorage.getItem('usernumericid');
    var get_id_val = optional_type_id;
    var stopgap_checked = "";
    var checkedCol_Nm = "";
    var checked_value = "";


    var coverage_type_array = [];
    $("input[name='CoverageType']:checked").each( function () {
        coverage_type_array.push($(this).val());
    });
    
    var coverage_type = coverage_type_array.toString();
    if (coverage_type == '1') {
        var covTyp = 1;
    } else if (coverage_type == '2') {
        var covTyp = 2;
    } else if (coverage_type == '1,2') {
        var covTyp = 4;
    } else {
        var covTyp = 3;
    }

    if (optional_type_id != "empty" ) {
        checked_value = 0;
        if ($('#'+optional_type_id).prop("checked") == true) {
            checked_value = 1;
        } 

        if (optional_data_id == "ocEmpLib") {
            checkedCol_Nm = "emp_checked";
        }
        if (optional_data_id == "ocAutoLiability") {
            checkedCol_Nm = "hnoa_checked";
        } 
        if (optional_data_id == "ocStopGap") {
            checkedCol_Nm = "stopgap_checked";
        }
        if (optional_data_id == "ocStopGap_state") {
            checkedCol_Nm = "stopgap_checked";
        }
    } 

    $.ajax({
        type:"POST",
        url: laravel_url+"/optionalCov_details",
        data:{ 
            accnt_id : accnt_id,
            get_rqbi_id : get_rqbi_id,
            optional_type_id : optional_type_id,
            checkedCol_Nm :checkedCol_Nm,
            checked_value :checked_value,
            process_type : get_process,
            stopgap_checked : stopgap_checked,
            data_oc_updata : data_oc_updata,
            covTyp : covTyp,
            current_user : current_user
        },
        success:function(response) {
            
            var obj = JSON.parse(response);

            if (obj.oc_details.length > 0) {
                if (obj.oc_details[0].emp_checked == 1) {
                    $('#ocEmpLib').prop('checked',true);
                } else {
                    $('#ocEmpLib').prop('checked',false);
                }

                if (obj.oc_details[0].hnoa_checked == 1) {
                    $('#ocAutoLiability').prop('checked',true);
                } else {
                    $('#ocAutoLiability').prop('checked',false);
                }

                if (data_oc_updata == "yes") {
                    $('#stop_gap_checkbox').hide();
                    if (obj.stopGap_showDet == "yes") {
                        $('#stop_gap_checkbox').show();
                        $('#ocStopGap').prop('checked',false);
                        if (obj.oc_details[0].stopgap_checked == 1) {
                            $('#ocStopGap').prop('checked',true);
                        } 
                    }
                }
            } else {
                if (data_oc_updata == "yes") {
                    $('#stop_gap_checkbox').hide();
                    if (obj.stopGap_showDet == "yes") {
                        $('#stop_gap_checkbox').show();
                    } 
                }
                
                $('#ocEmpLib').prop('checked',false);
                $('#ocAutoLiability').prop('checked',false);
                $('#ocStopGap').prop('checked',false);
                $('#stopGap_countryDiv').html('');
                $('#stopGap_countryDiv').hide();                
            }

            $('.optional_table_bind').html(obj.optional_table);
        },

        complete: function() {
            $('#Optinalcover_emp').hide();
            $('#cbContinueFullquote').attr('data-oc-updata','no');
            menu_permission();
        }, 

        error: function (data) {
            $('#Optinalcover_emp').hide();
        }
    });
}


$(document).on('change', '#retroactive_checkbox', function() {
    var data_rowid= $(this).attr('data-rowid');
    var data_retroative_Name= $(this).attr('data-retroative-Name');
    if ($(this).prop('checked')==true) {
        $('[name="'+data_retroative_Name+'"]').addClass('accordDisabled');
        $(this).val('checked');
        $('[name="'+data_retroative_Name+'"]').removeClass('allforms_val_class');
        $('[name="'+data_retroative_Name+'"]').val('');
    } else {
        $(this).val('unchecked');
        $('[name="'+data_retroative_Name+'"]').removeClass('accordDisabled');
        $('[name="'+data_retroative_Name+'"]').addClass('allforms_val_class');
    }
});



function coverage_base_ocShow(file_details) {

    var coverage_type_array = [];
    $("input[name='CoverageType']:checked").each( function () {
        coverage_type_array.push($(this).val());
    });
    var coverage_type = coverage_type_array.toString();
    
    if(coverage_type == "1" || coverage_type == "1,2") {
        $('#optionaCoverage_sec').removeClass('OptionCov_accordDisabled');
        $('#optionaCoverage_sec').removeClass('accordDisabled');
        if(file_details == 'all_form_file'){
            $('#optionaCoverage_sec').click();
        } 
    } else {
        $('#optionaCoverage_sec').addClass('OptionCov_accordDisabled');
        $('.optionalCov_Acrdn').removeClass('show');
    }

}


$(document).on('keyup keypress','[data-variable-name="No_of_Emp"], .fillin_autocomplete', function() { 
    var name = $(this).attr('name');
    var value = $(this).val();
    $(this).attr("maxlength", "19");
    if (value !="") {
        if (value != 0) {
            var numberval = moneyformat( value.replace(/^0+/, "") );
            $('[name="'+name+'"]').val(numberval);
        } else if (value == 0) {
            var numberval = moneyformat( value.replace(/^0+/, "0") );
            $('[name="'+name+'"]').val(numberval);
        }
    } 
    
});

var value;
$(document).on('keyup', '.number_only', function(e) { 
    var name = $(this).attr('name');
    var code = e.keyCode || e.which;

    if(code != 189 && code != 187 ) {
        value = $(this).val();
    }else{
        $(this).val(value)
    }

    $(this).attr("maxlength", "19");
    if (value !="") {
        var numberval = numberonly(value);
        if (numberval !="") {
            $('[name="'+name+'"]').val(numberval);
        } else {
            $('[name="'+name+'"]').val(numberval);
        }
    } 
    
});


function coverage_based_opCov_reset() {

    var userid = localStorage.getItem('usernumericid');
    
    $.ajax({
        url: laravel_url+"/reset_oc_section",
        type:'post',
        data:{ userid:userid, acct_id:accid, com_id:com_id, rqbi_id:rqbi_id},
        success:function(response) {

        }
    });
}