var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var hours = String(today.getHours()).padStart(2, '0');
var mints = String(today.getMinutes()).padStart(2, '0');
var secnds = String(today.getSeconds()).padStart(2, '0');

function allforms(form_type='') {
    if (form_type == 'aiforms') {
        $('#cover').show();
        $('.bind_aiformsdata').html('');
    } else if (form_type == 'commonforms') {
        $('#commoncover').show();
        $('.bind_commonformsdata').html('');
    } else {
        $('#afcover').show();
        $('.bind_allformsdata').html('');
    }
    var userid = localStorage.getItem('usernumericid');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var rqbid = rqbi_id;
    $.ajax({
        url: laravel_url+"/get_allformsdata",
        type:'post',
        data:{ userid:userid,acct_id:acct_id, rqbid:rqbid, form_type:form_type },
        success:function(response) {
            var obj = JSON.parse(response);
            if (obj.status == 'inserted' || obj.status == 'yes') {
                get_allformsdata_saveddata(form_type);
                $('.cfqspinner').show();
            } else {
                if (form_type == 'aiforms') {
                    $('.bind_aiformsdata').html('');
                    $('.bind_aiformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#cover').hide();
                    $('.cfqspinner').hide();
                } else if (form_type == 'commonforms') {
                    $('.bind_commonformsdata').html('');
                    $('.bind_commonformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th></tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>'); 
                    $('#commoncover').hide();
                    $('.cfqspinner').hide();
                } else {
                    $('.bind_allformsdata').html('');
                    $('.bind_allformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#afcover').hide();  
                    $('.cfqspinner').hide();                  
                }
            }

            // /*User Permissions*/
            // $(permission).each(function(key,val) {
            //    if(val.name == "Upload"){
            //         if( val.id == 1 ) {
            //             $('#pills-upload').addClass('readonly_disabled');
            //         } else if ( val.id == 2 ) {
            //             $('#pills-upload').removeClass('readonly_disabled');
            //             $('#accountNotesTable, .new_notesbtn, .account_list_add_btn, #pills-upload, #pills-addNoteTab, #maindiv_quoteindication').addClass('readonly_disabled');
            //             $('.Qclass_code_submission').focusout();
            //         } else {
            //             $('#pills-upload').removeClass('readonly_disabled');
            //             $('#accountNotesTable, .new_notesbtn, .account_list_add_btn, #pills-upload, #pills-addNoteTab, #maindiv_quoteindication').removeClass('readonly_disabled');
            //             $('.Qclass_code_submission').focus();
            //         }
            //    } 
            // });
        }
    });
}

function get_allformsdata_saveddata(form_type='', searchVal='') {
    var forms_focus_status = localStorage.getItem('forms_focus_status');

    if (form_type == 'aiforms') {
        if(searchVal == '') {
            $('.aisearch').val('');
            $('#aisearch').blur();
        } 
        $('#cover').show();
        $('.bind_aiformsdata').html('');
    } else if (form_type == 'commonforms') {
        if(searchVal == '') {
            $('.commonsearch').val('');
            $('#commonsearch').blur();
        }
        $('#commoncover').show();
        $('.bind_commonformsdata').html('');
    } else {
        if(searchVal == '') {
            $('.allsearch').val('');
            $('#allsearch').blur();
        }
        $('#afcover').show();
        $('.bind_allformsdata').html('');
    }
    
    var userid = localStorage.getItem('usernumericid');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var rqbid = rqbi_id;
    $.ajax({
        url: laravel_url+"/get_allformsdata_saveddata",
        type:'post',
        data:{ acct_id:acct_id, rqbid:rqbid, form_type:form_type, searchVal: searchVal},
        success:function(response) {
            $('.cfqspinner').show();
            var obj = JSON.parse(response);
            if (obj.status == 'empty' && searchVal == '') {
                allforms(form_type);
            } else if (obj.status == 'nodata') {
                if (form_type == 'aiforms') {
                    $('.bind_aiformsdata').html('');
                    $('.bind_aiformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#cover').hide();
                    $('.cfqspinner').hide();

                    if ( forms_focus_status != 'no' ) {
                        $('#aisearch').focus();
                    }
                }
                else if (form_type == 'commonforms') {
                    $('.bind_commonformsdata').html('');
                    $('.bind_commonformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th></tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#commoncover').hide();
                    $('.cfqspinner').hide();

                    if ( forms_focus_status != 'no' ) {
                        $('#commonsearch').focus();
                    }
                }
                else {
                    $('.bind_allformsdata').html('');
                    $('.bind_allformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');  
                    $('#afcover').hide(); 
                    $('.cfqspinner').hide();

                    if ( forms_focus_status != 'no' ) {
                        $('#allsearch').focus();
                    }
                }
            } else if (obj.status == 'empty' && searchVal!='') {
                if (form_type == 'aiforms') {
                    $('.bind_aiformsdata').html('');
                    $('.bind_aiformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#cover').hide();
                    $('.cfqspinner').hide();

                    if ( forms_focus_status != 'no' ) {
                        $('#aisearch').focus();
                    }
                }
                else if (form_type == 'commonforms') {
                    $('.bind_commonformsdata').html('');
                    $('.bind_commonformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th></tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');
                    $('#commoncover').hide();
                    $('.cfqspinner').hide();

                    if ( forms_focus_status != 'no' ) {
                        $('#commonsearch').focus();
                    }
                }
                else {
                    $('.bind_allformsdata').html('');
                    $('.bind_allformsdata').html('<table class="table table-responsive-sm table-bordered text-center rqbiAiTable ai_field_wrap mt-3"><thead class="rqbiAiThead"><tr><th class="width4_perc"></th><th class="width12_perc">Form Number</th><th class="width12_perc">Edition</th><th class="width30_perc">Description</th><th class="width12_perc">Premium</th><th class="width10_perc">Variable Info</th><th class="width12_perc">Flat & Fully Earned</th><th class="width7_perc">Repeatable</th> </tr></thead><tbody class="rqbiAiTable"><tr><td colspan="8" style="color: red;">No Data Available</td></tr></tbody></table>');   
                    $('#afcover').hide(); 
                    $('.cfqspinner').hide(); 

                     if ( forms_focus_status != 'no' ) {
                        $('#allsearch').focus();
                    }               
                }
            } else {
                if (form_type == 'aiforms') {
                    $('.cfqspinner').show();
                    $('.bind_aiformsdata').html('');
                    $('.bind_aiformsdata').html(obj.result);
                    setTimeout(function() {
                        $('.cfqspinner').hide();
                        $('#cover').hide();
                        if ( forms_focus_status != 'no' ) {
                            $('#aisearch').focus();
                        }
                        $('.aiFormsAccord').removeClass('collapsed');
                        checkContinueToFullQuoteStatus();
                        },300);
                } else if (form_type == 'commonforms') { 
                    $('.cfqspinner').show();
                    $('.bind_commonformsdata').html('');
                    $('.bind_commonformsdata').html(obj.result);
                    setTimeout(function() {
                        $('.cfqspinner').hide();
                        $('#commoncover').hide();
                        if ( forms_focus_status != 'no' ) {
                            $('#commonsearch').focus();
                        }
                        $('.commonFormsAccord').removeClass('collapsed');
                        checkContinueToFullQuoteStatus();

                    },300);
                } else {
                    $('.cfqspinner').show();
                    $('.bind_allformsdata').html('');
                    $('.bind_allformsdata').html(obj.result);
                    setTimeout(function() {
                        if ( forms_focus_status != 'no' ) {
                            $('#allsearch').focus();
                        }
                        $('#afcover').hide();
                        $('.cfqspinner').hide();
                        $('.rqbi_allforms_tabs').removeClass('collapsed');
                        checkContinueToFullQuoteStatus();
                    },300);
                }
            }

            if (obj.status!='empty' && searchVal == '') {

                         setTimeout(function(){


                                 var array_values = [];
                            
                                 var form_id_edition = $('input[name="ischeckedfunc"]:checked').map( function (idx, elem) {

                                                var obj_values = {};
                                          
                                                var form_id =  $(this).data('formid');
                                                var rid =  $(this).data('rid');
                                                var form_edition = $('.allFrmsEdition_'+rid).children("option").filter(":selected").text();
                                                var priority =  $(this).data('priority');
                                                var batch_id = $(this).data('batchid');

                                                var form_edition_aft_trim = form_edition.trim();

                                                if (typeof obj_values != 'undefined') { 
               
                                                    if (obj_values != 'null') { 

                                                        obj_values['form_id'] = form_id;
                                                        obj_values['form_edition'] = form_edition_aft_trim;
                                                        obj_values['priority'] = priority;
                                                        obj_values['batch_id'] = batch_id;
                                                        array_values.push(obj_values);

                                                }
                                            }
                                                 return array_values;
                                    }).get();

            
                                    let newUniqueValues = [];

                                    form_id_edition.forEach((el) => {
                                      if (isNotExist(el)){
                                        newUniqueValues.push(el)
                                      }
                                      function isNotExist(obj){
                                        return newUniqueValues.every(el => JSON.stringify(el) !== JSON.stringify(obj) )
                                        
                                      }
                                    })
                                    update_ui_checked(acct_id,rqbi_id,newUniqueValues,form_type);
                                    $('.frmsumm_card_header').removeClass('accordDisabled');
                            },300);
            }

            setTimeout(function(){
                localStorage.removeItem('forms_focus_status');
            },25000);
        },
        complete :function() {
            sinumberset();
            menu_permission();
            $('#locationAccord, #coverageLimitAccord, #cbAccord').removeClass('disabled');
        }
    });
}

function update_ui_checked(acct_id, rqbi_id, form_id_edition,formtype){

    $.ajax({
        url: laravel_url+"/update_ui_checked",
        type:'post',
        data:{acct_id: acct_id, rqbi_id:rqbi_id, form_id_edition:form_id_edition,form_type:formtype},
        success:function(response) {
        }
    });   


    // if( formtype == "allforms" && $("[data-formid= 'ASIC-GL-0005']").hasClass('disabled') == false ) {
    //     get_ui_disabled();
    // }
}


// function get_ui_disabled(){
//     var coverage_type_array = [];
//     $("input[name='CoverageType']:checked").each( function () {
//         var value = $(this).val();
//         coverage_type_array.push(value);
//     });
//     var coverage_type = coverage_type_array.toString();

//     var coverage_array = [];
//     $("input[name='CoverageType2']:checked").each( function () {
//         var value = $(this).val();
//         coverage_array.push(value);
//     });
//     var coverage = coverage_array.toString();

//     var override_required = $('.override_required').is(":checked");


//     if( coverage_type == "1,2" && coverage != ""  && override_required == false ){
//        $.ajax({
//             url: laravel_url+"/get_ui_disabled",
//             type:'get',
//             data:{acct_id: accid, rqbi_id:rqbi_id},
//             success:function(response) {
//                 if( response.count > 0 ){
//                     var form_id = $("[data-formid= 'ASIC-GL-0005']").addClass('disabled'); 
//                 }
//             }
//         });               
//    } 

// }

function allforms_inview(form_type='') {
    var className = '';
    if (rqbi_id) {
        if (form_type == 'aiforms') {
            className = '.aiFormsAccord';
        } else if (form_type == 'commonforms') {
            className = '.commonFormsAccord';
        } else {
            className = '.rqbi_allforms_tabs';
        }
        if ($(className).hasClass('collapsed')) {
            get_allformsdata_saveddata(form_type);
        } else {
            console.log('allformstab_closed');
        }
    } else {
        console.log('rqbi not set');
        new PNotify({ title: 'Error', text: 'Rqbi not set', delay: 1500, type: 'error' });
    }
}


$(document).on('click', '.ischeckedfunc', function() {
    var rowid = $(this).closest('tr').data('rowid');
    var rid = $(this).closest('tr').data('rid');
    var form_type = $(this).data('formtype');
    var form_id = $(this).data('formid');

    if ($('.ischeckedfunc_'+rowid).prop('checked') === true) {   
        var checkboxval =  'checked';
    } else {
        var checkboxval =  'unchecked';

        if (form_id == 'ASIC-NOT-0004') {

            $('.ischeckedform').text('');
        }
    }

    var formmid =  $('.allFrmsNum_'+rowid).text();

    var ajaxpass = true;

    if ($('.all_checked_'+rid).prop('checked') == true) {   

        if ($.inArray( formmid, forms_frontend_rules.form_id )  !== -1 ) {

            $.each(forms_frontend_rules.all_form_id[formmid], function (key, val) {

                var index = val.indexOf(",");    
                if (index !== -1) {
                    var res = val.split(",");
                    $.each(res, function (key1, val1) {
                        if ($('[data-formid="'+val1+'"]').prop('checked') == true) {   
                            $('.all_checked_'+rid).prop('checked', false);
                            $('.conflitrulecheck_'+rowid).html('<p class="conflitrulecheck_'+rowid+'" style="color:red;" >'+val1+' is already checked</p>');
                            ajaxpass = false;
                            return false;
                        } else {
                            $('.conflitrulecheck_'+rowid).html('');
                            ajaxpass = true;
                        }
                    });
                } else {
                    if ($('[data-formid="'+val+'"]').prop('checked') == true) {   
                        $('.all_checked_'+rid).prop('checked', false);
                        $('.conflitrulecheck_'+rowid).html('<p class="conflitrulecheck_'+rowid+'" style="color:red;" >'+val+' is already checked</p>');
                        ajaxpass = false;
                        return false;
                    } else {
                        $('.conflitrulecheck_'+rowid).html('');
                        ajaxpass = true;
                    }
                }
                
            });

        }
    } else {

        if (form_type == '1') {
             $('.aiFormsAccord').removeAttr('style');
             $('.aiFormsAccord a').removeAttr('style');
        } else if (form_type == '2') {
            $('.commonFormsAccord').removeAttr('style');
            $('.commonFormsAccord a').removeAttr('style');
        } else if(form_type == '3') {
            $('.rqbi_allforms_tabs').removeAttr('style');
            $('.rqbi_allforms_tabs a').removeAttr('style');
        }

         $('.allformsclose_'+rid).click();

         if (typeof(forms_frontend_rules.all_form_id[formmid]) != 'undefined') {

             $.each(forms_frontend_rules.all_form_id[formmid], function (key, val) {

                    var index = val.indexOf(",");    
                    if (index !== -1) {
                        var res = val.split(",");
                        $.each(res, function (key1, val1) {
                            var row_id = $('[data-formid="'+val1+'"]').data('rowid');
                            $('.conflitrulecheck_'+row_id).html('');
                        });
                    } else {
                        var row_id = $('[data-formid="'+val+'"]').data('rowid');
                        $('.conflitrulecheck_'+row_id).html('');
                    }

             });
         }
    }
    

if (ajaxpass == true) {
    var userid = localStorage.getItem('usernumericid');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        url: laravel_url+"/update_checkboxval_insavedforms",
        type:'post',
        data:{ userid:userid,rid:rid,acct_id:acct_id,com_id:com_id,form_type:form_type,rqbi_id:rqbi_id,checkboxval:checkboxval },
        success:function(response) {
            var obj = JSON.parse(response);
            
            get_formsummary(accid, rqbi_id);
            get_rhs_classbuilder(accid);
            updateQuoteNameBasedTotalPremium();
        }
    });
}
    
    if ($('.all_checked_'+rid).prop('checked') == true) {   
        $('.allFrmsPremLbl_'+rid).removeClass('d-none');
        $('.isflatfullcheckedfunc_'+rid).removeClass('d-none');
        $('.allFrmsFillin_'+rid).removeClass('d-none');
        $('.all_add_btn_'+rid).removeClass('d-none');
        $('.allfrmsrepeatable_close_'+rid).removeClass('d-none');
    } else {
        $('.allFrmsPremLbl_'+rid).addClass('d-none');
        $('.isflatfullcheckedfunc_'+rid).addClass('d-none');
        $('.allFrmsFillin_'+rid).addClass('d-none');
        $('.all_add_btn_'+rid).addClass('d-none');
        $('.allfrmsrepeatable_close_'+rid).addClass('d-none');
    }
});


$(document).on('click', '.isflatfullcheckedfunc' ,function() {
    var rowid = $(this).closest('tr').data('rowid');
    var rid = $(this).closest('tr').data('rid');
    if ($('.isflatfullcheckedfunc_'+rowid).prop('checked') === true) {   
        var checkboxval =  'checked';
    } else {
        var checkboxval =  'unchecked';
    }
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        url: laravel_url+"/update_flatfullcheckboxval_insavedforms",
        type:'post',
        data:{ userid:userid, rid:rid, checkboxval:checkboxval },
        success:function(response) {
            get_formsummary(accid, rqbi_id);
        }
    });
});


$(document).on('blur', '.allFrmsPremInp' ,function() {
    var ridd = $(this).attr('data-rowid');
    var prem = $(this).val();
    var txtbxval = $('.allFrmsPremLbl_'+ridd).text(prem);
    if (prem != '') {
        $('.allFrmsPremLbl_'+ridd).show().text('$'+prem);
    } else {
        $('.allFrmsPremLbl_'+ridd).show().text('$');
    }
    $('.allFrmsPremInp_'+ridd).hide();
    var premiumval = $(this).val().replace('$', '').replace(/,/g, '');
    if (premiumval > 0) {
        premiumval = premiumval.replace(/^0+/, "");
    } else if (premiumval == 0) {
        premiumval = premiumval.replace(/^0+/, "0");
    }
    $('.allFrmsPremLbl_'+ridd).text('').text('$'+numberWithCommas(premiumval));
    $('.allFrmsPremInp_'+ridd).val(numberWithCommas(premiumval));
    var rid = $(this).closest('tr').data('rid');
    var userid = localStorage.getItem('usernumericid');
    // if (premiumval.length !== 0) {
        // if (parseInt(premiumval) > 0) {
            $.ajax({
                url: laravel_url+"/update_premium_val_insavedforms",
                type:'post',
                data:{ userid:userid, rid:rid,com_id : com_id, premiumval:premiumval },
                success:function(response) {
                                
                     var obj = JSON.parse(response);
                     get_formsummary(accid, rqbi_id);
                     get_rhs_classbuilder(accid);
                     updateQuoteNameBasedTotalPremium();
                }
            });
        // } 
    // }
});

$(document).on('change', '.allFrmsEdition', function() {
    var rid = $(this).val();
    var rowid = $(this).data('rowid');
    var userid = localStorage.getItem('usernumericid');
    $(this).closest('tr').find('.brokerageform_modal').css('pointer-events','none');
    var uniqid = $(this).attr('data-uniqeid');
    $('.formEditionChangeLoader_'+uniqid).removeAttr('style');
    $.ajax({
        url: laravel_url+"/replace_formedition_val",
        type:'post',
        data:{ userid:userid, com_id:com_id, rid:rid, rowid:rowid },
        success:function(response) {
            var obj = JSON.parse(response);

            $('.allFrmsEdition_'+rowid).replaceWith(obj.table);
            $('.new_allFrmVarInfoSec_'+rowid).remove();
             get_formsummary(accid, rqbi_id);
             get_rhs_classbuilder(accid);
             updateQuoteNameBasedTotalPremium();
             $('.formEditionChangeLoader_'+uniqid).css('display','none');
            
        },
        complete :function() {
            sinumberset();
        }
    });
});

$(document).on('click', '.allfrmsclose', function() {
    var rowid = $(this).attr('data-rowid');
    $('.new_allFrmVarInfoSec_'+rowid).hide();
});

$(document).on('click', '.allFrmsFillin', function () {
    var rid = $(this).closest('tr').data('rid');
    var rowid = $('.allFrmsFillin_'+rid).data('rowid');
    var form_id = $('.allFrmsNum_'+rowid).text();
    $.ajax({
        url: laravel_url+"/get_variabledata_allforms",
        type:'post',
        data:{ rid:rid,rqbi_id: rqbi_id,form_id : form_id},
        success:function(response) {
            $('.bind_allformsvariabledata_'+rowid).html('');
            $('.bind_allformsvariabledata_'+rowid).html(response);

            setTimeout(function(){
                var null_textarea_count = $('.bind_allformsvariabledata_'+rowid).find('.null_data .fillin_textarea').length;
                var group_textarea_count = $('.bind_allformsvariabledata_'+rowid).find('.group_data .fillin_textarea').length;
                
                if( form_id == 'CG 20 32' || form_id == 'ASIC-GL-0131' || form_id == 'ASIC-GL-0137' || form_id == 'ASIC-GL-0147' || form_id == 'CG 20 32' ) {
                    $('.null_data_'+rid).css('height', '145px');
                } else {
                    $('.null_data_'+rid).css('height', 'auto');
                }

                if( form_id == 'ASIC-GL-0140' ) {
                    $('.Allfillindataarea_'+rid).parent('div').parent('div').parent('div').css('margin-top', '30px')
                } else{
                    $('.Allfillindataarea_'+rid).parent('div').parent('div').parent('div').css('margin-top', 'auto')
                }

                if ( null_textarea_count >= 1 ) {
                    $('.null_data .mainWrap').css('height', '83px');
                } else {
                    $('.null_data .mainWrap').css('height', '70px');
                }

                if ( group_textarea_count >= 1 ) {
                    $('.group_data .mainWrap').css('height', '83px');
                } else {
                    $('.group_data .mainWrap').css('height', '70px');
                }

                $(".varinfo_datepicker").datepicker({ 
                        autoclose: true,
                        format: 'mm-dd-yyyy'
                });

            },500);
            menu_permission();
        }
    });
    $('.new_allFrmVarInfoSec_'+rowid).show();
});


$(document).on('change', '.Allfillindataradio', function() {
    var rowids = $(this).data('savedrid');
    if ($('.Allfillindataradio_'+rowids).prop('checked')==true) { 
        $('.Allfillindataradioyes_'+rowids).val('yes');
        $('.Allfillindataradiono_'+rowids).val('');
    } else {
        $('.Allfillindataradioyes_'+rowids).val('');
        $('.Allfillindataradiono_'+rowids).val('no');
    }
});

$(document).on('click', '.AllVarInfoSave', function() { 
    var rid = $(this).data('savedrid');
    var userid = localStorage.getItem('usernumericid');
    var get_form_values = $("#allforms"+rid).serializeArray();
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    var str1 = $("#allforms"+rid+" input[type='checkbox'] ").map(function() {
        var arr1 = {};
        arr1['name'] = this.name;
        if (this.value == '') {
            arr1['value'] = 'NotChecked';
        } else {
            arr1['value'] = this.value;
        }
        get_form_values.push(arr1);
    });
    var get_form_values_unique = removeDumplicateValue(get_form_values);
    var varible_val_array = {};
    $.each(get_form_values_unique, function(i, field) {
        varible_val_array[i] = {};
        varible_val_array[i]['fieldname'] = field.name;
        varible_val_array[i]['fieldvalue'] = field.value;
        varible_val_array[i]['fieldtype'] = $('[name="'+field.name+'"]').data('inputtype');
        varible_val_array[i]['fieldmandatory'] = $('[name="'+field.name+'"]').data('mandatory');
    }); 
    varible_val_array1 = JSON.stringify(varible_val_array);
    var Vald_chk =false;
    $(".validationclass_"+rid+" .allforms_val_class").each(function() {
        var gt_vlu = $(this).val();
        if (gt_vlu == "") {
            Vald_chk=true;
        } 
    });
    if (Vald_chk) {
        new PNotify({ title: 'Error', text: 'Please Fill Mandatory Field', delay: 2000, type: 'error' });
    } else {
        $.ajax({
            url: laravel_url+"/saveAllFillInForms",
            type: "POST",
            data: { userid:userid, rid : rid, acct_id : acct_id, varible_val_array1 : varible_val_array1, rqbi_id : rqbi_id },
            success: function(result) {

                var obj = JSON.parse(result);
                if (obj.save_status == 'variabledata_updated') {
                    new PNotify({ title: 'Success', text: 'Successfully Updated', delay: 2000, type: 'success' });
                } else {
                    new PNotify({ title: 'Success', text: 'Successfully Saved', delay: 2000, type: 'success' });
                }

                if (obj.form_type == 1) {
                     $('.aiFormsAccord').removeAttr('style');
                     $('.aiFormsAccord a').removeAttr('style');
                } else if (obj.form_type == 2) {
                    $('.commonFormsAccord').removeAttr('style');
                    $('.commonFormsAccord a').removeAttr('style');
                } else if(obj.form_type == 3) {
                    $('.rqbi_allforms_tabs').removeAttr('style');
                    $('.rqbi_allforms_tabs a').removeAttr('style');
                } else {
                    $('#optionaCoverage_sec').removeAttr('style');
                    $('#optionaCoverage_sec a').removeAttr('style');
                }

                $('.new_allFrmVarInfoSecAuto_'+rid).hide();
                $(".allFrmsFillin_"+rid).css('color','green');
            }
        });
    }
});

function removeDumplicateValue(myArray) { 
    var newArray = [];
    $.each(myArray, function(key, value) {
        var exists = false; 
        $.each(newArray, function(k, val2) {
            if (value.name == val2.name) { 
                exists = true; 
            } 
        });
        if (exists == false && value.name != "") { 
            newArray.push(value); 
        }
    });
    return newArray;
}

$(document).on('click', '.all_add_btn', function(){
    $('#additionalInsuredAccord').addClass('disabled');
    var rid = $(this).data('rid');
    var rowid = $(this).data('rowid');
    $('.repeatable_spinner_'+rid).show();
    repeatableForms(rid,rowid);
});

function repeatableForms(rid='',rowid='') {
    var userid = localStorage.getItem('usernumericid');
    $.ajax({
        url: laravel_url+"/saveRepeatableAllForms",
        type: "POST",
        data: { userid:userid,com_id:com_id, rid : rid },
        success: function(result) {
            var obj = JSON.parse(result);
            $('.all_add_btn_'+rowid).closest('tr').next().after(obj.table);

             get_rhs_classbuilder(accid);

             get_formsummary(accid, rqbi_id);

             updateQuoteNameBasedTotalPremium();
        },
        complete :function() {
            sinumberset();
            $('.repeatable_spinner_'+rid).hide();
            $('#additionalInsuredAccord').removeClass('disabled');
        }
    });
}

function sinumberset() {
    $( ".bind_aiformsdata .sinumber" ).each(function( index ) {
    $(this).find('.numbersi').text('')
    $(this).find('.numbersi').text(index+1)
    });

    $( ".bind_commonformsdata .sinumber" ).each(function( index ) {
    $(this).find('.numbersi').text('')
    $(this).find('.numbersi').text(index+1)
    });

    $( ".bind_allformsdata .sinumber" ).each(function( index ) {
    $(this).find('.numbersi').text('')
    $(this).find('.numbersi').text(index+1)
    });        

    conflitforms_check()             
}

function saveSavedFilterForms() {

    $('#cbContinueFullquote').addClass('accordDisabled');
    $('.frmsumm_card_header').addClass('accordDisabled');
    $('.cfqspinner').show();
    localStorage.setItem('forms_focus_status', 'no');
    
    var current_user = localStorage.getItem('usernumericid');
    var current_date = yyyy+'-'+mm+'-'+dd+' '+hours+':'+mints+':'+secnds;

    var continue_mandatory = ContinuetofulQuote_validation_Check();
    
    if (continue_mandatory) {
        $('#locationAccord, #coverageLimitAccord, #cbAccord').addClass('disabled');
         
        remove_errorHighlited_accordion();

        $('.aiFormsAccord').removeClass('accordDisabled');
        $('.commonFormsAccord').removeClass('accordDisabled');
        $('.rqbi_allforms_tabs').removeClass('accordDisabled');
        $('.subjAccordHeader').removeClass('accordDisabled');
        $('#optionaCoverage_sec').removeClass('accordDisabled');
        $('.xl_quoteBtn').removeClass('d-none');

        $('#additionalAccAccord').removeClass('show'); 
        $('#ocAccord').removeClass('show');
        $('#additionalInsuredAccord').removeClass('show');
        $('#selectFormsAccord').removeClass('show');
        $('#optionalCovAccord').removeClass('show');
        $('#manuscriptAccord').removeClass('show');
        $('#subjectivitiesAccord').removeClass('show');
        

        $('.rqbiAdditionalAccountDetails').addClass('collapsed');
        $('#optionaCoverage_sec').addClass('collapsed');
        $('.aiFormsAccord').addClass('collapsed');
        $('.commonFormsAccord').addClass('collapsed');
        $('.rqbi_allforms_tabs').addClass('collapsed');
        $('.manuscript_card_header').addClass('collapsed');
        $('.subjAccordHeader').addClass('collapsed');
        $('.frmsumm_card_header').addClass('collapsed');

        $('#frmsummAccord').removeClass('show');
        $('#quoteAccord').removeClass('show');
        $('#bindAccord').removeClass('show');
        $('#issueAccord').removeClass('show');
        $('#issueAccord').removeClass('show');

        var covStateSpecific = JSON.stringify($('#covStateSpecific').val());
        var rqbid = rqbi_id;
        var cont_to_full_status = 0;
        var accountid = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/saveSavedFilterForms",
            type: "POST",
            data: { rqbid : rqbid, accountid : accountid,covStateSpecific:covStateSpecific, current_user : current_user, current_date : current_date },
            success: function(result) {
                var obj = JSON.parse(result);
                if(obj.continue_quote_status == 0){
                        $('#cbContinueFullquote').addClass('accordDisabled');  
                } 
                previous_coverage =  obj.previous_coverage;
                save_delete_coverage_sub(previous_coverage);
                get_rhs_classbuilder(accountid);
                coverage_based_opCov_reset();
            },
            complete: function(){

                $('.rqbiAdditionalAccountDetails').click();
                $('.aiFormsAccord').click();
                $('.commonFormsAccord').click();
                $('.rqbi_allforms_tabs').click();
                $('.manuscript_card_header').click();

                $('#cbContinueFullquote').attr('data-oc-updata','yes');
                coverage_base_ocShow('all_form_file');
                checkContinueToFullQuoteStatus();
            }
        });
    } else {
        $('#cbContinueFullquote').removeClass('accordDisabled');
        $('.mandatory_fullcode').show();
        setTimeout(function() {
            $('.mandatory_fullcode').hide();
        },7000);
        $('.cfqspinner').hide();
    }
    
}


function combinationRulesFunc() {

    var userid = localStorage.getItem('usernumericid');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        url: laravel_url+"/combinationRulesFunc",
        type: "POST",
        data: { userid:userid,rqbi_id : rqbi_id, acct_id : acct_id },
        success: function(result) {
        }
    });
}


function get_continueFullQuote_status () {

    //var accnt_id = localStorage.getItem("accid");
    var accnt_id = accid;

    $.ajax({
        url: laravel_url+"/get_continueFullQuote_status",
        type: "POST",
        data: { rqbid : rqbi_id, accountid : accnt_id },
        success: function(result) {
            var obj = JSON.parse(result);
            if (obj.continue_quote_status == '0') {
                setTimeout(function(){
                    $('#cbContinueFullquote').addClass('accordDisabled');
                    $('#cbContinueFullquote').attr('data-oc-updata','yes');
                },400);   
            } else {
                $('#cbContinueFullquote').removeClass('accordDisabled');
            }  
        }
    });
}

function checkFormsAccord() {

    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        url: laravel_url+"/checkFormsAccord",
        type:'post',
        data:{acct_id:acct_id,rqbi_id: rqbi_id},
        success:function(response){
            var obj = JSON.parse(response);
            if (obj.status == 'yes') {
                $('.aiFormsAccord, .commonFormsAccord, .rqbi_allforms_tabs,.subjAccordHeader, #optionaCoverage_sec').removeClass('accordDisabled');
                $('.xl_quoteBtn').removeClass('d-none');
                check_has_xl_acct();
            } else {
                $('.aiFormsAccord, .commonFormsAccord, .rqbi_allforms_tabs, .subjAccordHeader, #optionaCoverage_sec').addClass('accordDisabled');
            }
        }
    });
}

$(document).on('change', '.blanketckbx', function() {
    var rid = $(this).data('savedrid');
    var this_name = $(this).attr('name');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        type:"POST",
        url: laravel_url+"/CheckRepeatForms",
        data:{ this_name: this_name, acct_id : acct_id,rqbi_id : rqbi_id,rid:rid },
        success:function(response) {
            var obj = JSON.parse(response);
            var total = obj.total_count;
            var blanket_default_value = obj.blanket_default_value;
            var field_type = obj.field_type;
            var var_name = obj.var_name;
            var is_glTyp_val = obj.is_glTyp_val;

            if ($('.Allfillindatacheck_'+rid).prop('checked')==true) {
                if (blanket_default_value!='') {
                    if (field_type == '1' && total == 0) {
                        $('input[name="'+var_name+'"]').val('');
                        $('input[name="'+var_name+'"]').val(blanket_default_value);
                    } else if(field_type != '1' && total == 0) {
                        $('textarea[name="'+var_name+'"]').val('');
                        $('textarea[name="'+var_name+'"]').val(blanket_default_value);
                    }
                }

                if (parseInt(total) > 0) {

                        $('.Allfillindatacheck_'+rid).prop('checked',false);
                        $('.Allfillindatacheck_'+rid).val('NotChecked');
                        $("#aicheckstatus_"+rid).show();

                } else {

                    $('.Allfillindatacheck_'+rid).prop('checked',true);
                    $('.Allfillindatacheck_'+rid).val('checked');
                    $("#aicheckstatus_"+rid).hide();
                }
            } else {

                if ($('.Allfillindatacheck_'+rid).is(':checked')){

                    $('.Allfillindatacheck_'+rid).prop('checked',true);
                    $('.Allfillindatacheck_'+rid).val('checked');

                } else {

                    $('.Allfillindatacheck_'+rid).prop('checked',false);
                    $('.Allfillindatacheck_'+rid).val('NotChecked');
                }
                if (is_glTyp_val == "yes_null") {
                    if (field_type == '1') {
                        $('.Allfillindatatext_'+rid).val('');
                    } else {
                        $('.Allfillindataarea_'+rid).val('');
                    }
                }
            }
        },
    });
});

$(document).on('change', '.Allfillindatadrop', function() {
    
    var locmapuniqid = $(this).data('locmapuniqid');
    var location_id = $('.Allfillindatadrop_'+locmapuniqid).val();
    var formid = $(this).data('formid');
    var formedition = $(this).data('formedition');
    var groupnum = $(this).data('groupnum');
    var batchId = $(this).data('batchid');
    $.ajax({
        type:"POST",
        url: laravel_url+"/getOtherLocations",
        data:{ location_id : location_id, formid : formid, formedition : formedition, accid : accid, rqbi_id : rqbi_id, groupnum : groupnum, batchId : batchId },
        success:function(response) { 
            var obj = JSON.parse(response);
            var address2 = '';
            if (obj.address2!='') {

                address2 = obj.address2+' ';
            }
            if ( location_id != '' ) { 
                var cty = "";
                if(obj.city != "") {
                    cty = obj.city+', ';
                }

                console.log($('[data-locmapnew=LOCO_'+locmapuniqid+']').val(obj.address1+' '+address2+' '+cty+obj.state+' '+obj.zip));
                $('[data-locmapnew=LOCO_'+locmapuniqid+']').val(obj.address1+' '+address2+' '+cty+obj.state+' '+obj.zip);
                $('input[name=loc_support_'+locmapuniqid).val(obj.address1+''+address2+obj.city+''+obj.state+''+obj.zip);
             }  else {
                if (obj.gltyp_val == "yes_null") {
                    $('[data-locmapnew=LOCO_'+locmapuniqid+']').val('');
                    $('input[name=loc_support_'+locmapuniqid).val('');
                }
             } 
        }
    });
});

// For testing purpose

// function duplicate() {

//     var aiarray = [];
//     var commonarray = [];
//     var allarray = [];

//     var aiarray1 = [''];
//     var commonarray1 = [''];
//     var allarray1 = [''];

//     $( ".bind_aiformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();
//         aiarray.push(val);
//     });

//     $( ".bind_commonformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();
//         commonarray.push(val);
//     });

//     $( ".bind_allformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();
//         allarray.push(val);
//     });

//     aiarray1 = findDuplicates(aiarray);
//     commonarray1 = findDuplicates(commonarray);
//     allarray1 = findDuplicates(allarray);

//     console.log('ai forms id - ', aiarray1);
//     console.log('common forms id - ', commonarray1);
//     console.log('all forms id - ', commonarray1);

//     $( ".bind_aiformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();

//         if (aiarray1.includes(val)) {
//             $('.allFrmsNum_'+rowid).css('color','red')
//         } else {
//         }
//     });

//     $( ".bind_commonformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();

//         if (commonarray1.includes(val)) {
//             $('.allFrmsNum_'+rowid).css('color','red')
//         } else {
//         }
//     });

//     $( ".bind_allformsdata .sinumber" ).each(function( index ) {
//         var rowid = $(this).data('rowid');
//         var val = $('.allFrmsNum_'+rowid).text();

//         if (allarray1.includes(val)) {
//             $('.allFrmsNum_'+rowid).css('color','red')
//         } else {
//         }
//     });
// }

// const findDuplicates = (arr) => {
//     let sorted_arr = arr.slice().sort(); 
//     let results = [];
//     for (let i = 0; i < sorted_arr.length - 1; i++) {
//         if (sorted_arr[i + 1] == sorted_arr[i]) {
//             results.push(sorted_arr[i]);
//         }
//     }
//     return results;
// }


$(document).on('keyup', '.aiformssearch', function() {  
    var searchVal = $('.aisearch').val();
    get_allformsdata_saveddata('aiforms',searchVal);
});

$(document).on('keyup', '.aisearch', function(e) {
    var searchVal = $('.aisearch').val();
    if (e.which == '13') {
        get_allformsdata_saveddata('aiforms',searchVal);
    }   
    formssearch(searchVal, 'table_aiforms');
}); 

$(document).on('keyup', '.aisearch', function() {
    var searchVal = $('.aisearch').val();
        if (searchVal == '') {
        get_allformsdata_saveddata('aiforms');
    }
});

$(document).on('keyup', '.commonformssearch', function() {
    var searchVal = $('.commonsearch').val();
    get_allformsdata_saveddata('commonforms',searchVal);
});

$(document).on('keyup', '.commonsearch', function(e) {
    var searchVal = $('.commonsearch').val();

    if (e.which == '13') {
        get_allformsdata_saveddata('commonforms',searchVal);
    }
    formssearch(searchVal, 'table_commonforms');
});

$(document).on('keyup', '.commonsearch', function() {
    var searchVal = $('.commonsearch').val();
    if (searchVal == '') {
        get_allformsdata_saveddata('commonforms');
    }
});

$(document).on('keyup', '.allformssearch', function() {
    var searchVal = $('.allsearch').val();
    get_allformsdata_saveddata('',searchVal);
});

$(document).on('keyup', '.allsearch', function(e) {
    var searchVal = $('.allsearch').val();

    if (e.which == '13') {
        get_allformsdata_saveddata('',searchVal);
    }

    formssearch(searchVal, 'table_allforms');
    
});

$(document).on('keyup', '.allsearch', function() {
    var searchVal = $('.allsearch').val();
    if (searchVal == '') {
        get_allformsdata_saveddata('');
    }
});

/*AI, All and  Common forms search*/
function formssearch(searchVal, idname) {
  var input, filter, table, tr, td, i, txtValue;
  input = searchVal;
  filter = input.toUpperCase();
  table = document.getElementById(idname);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      console.log('text value', txtValue);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

$(document).on('focus', '.fillin_autocomplete', function() { 
    var rid = $(this).data('rowid');
    var data_rid = $(this).data('rid');
    var data_varname = $(this).data('varname');
    $.ajax({
        type:"POST",
        url: laravel_url+"/getFormsFieldValue",
        data :{ data_rid : data_rid },
        success:function(response) {

            if(response.length > 0){
                $('[data-varname="'+data_varname+'"]').autocomplete({
                    source: [response]
                });
            }
            
        },  
    });
});

$(document).on('click', '.allFrmsPremLbl', function() {
    var rid = $(this).attr('data-rowid');
    var prem = $(this).text();
    prem = prem.substring(1);
    $('.allFrmsPremInp_'+rid).show().focus().val('').val(prem);
    $('.allFrmsPremLbl_'+rid).hide();
});

// duplicate();


// function tria_accept_reject_forms(){

//     var userid = localStorage.getItem('userid');
//     var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
//     $.ajax({
//         type:"POST",
//         url: laravel_url+"/tria_accept_reject_forms",
//         data:{ userid:userid, acct_id : acct_id, rqbid : rqbi_id },
//         success:function(response){ 
//             console.log(response);
//         },
//         complete :function(){
//             // get_allformsdata_saveddata('aiforms');
//             // get_allformsdata_saveddata('commonforms');
//             // get_allformsdata_saveddata('allforms');
//         }
//     });
// }




// function auditable_yesno_forms(){
//     var userid = localStorage.getItem('userid');
//     var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
//     $.ajax({
//         type:"POST",
//         url: laravel_url+"/auditable_yesno_forms",
//         data:{ userid:userid, acct_id : acct_id, rqbid : rqbi_id },
//         success:function(response){ 
//             console.log(response);
//         },
//         complete :function(){
//             // get_allformsdata_saveddata('aiforms');
//             // get_allformsdata_saveddata('commonforms');
//             // get_allformsdata_saveddata('allforms');
//         }
//     });
// }



// function sir_dedutables_forms(){

//     var userid = localStorage.getItem('userid');
//     var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
//     $.ajax({
//         type:"POST",
//         url: laravel_url+"/sir_dedutables_forms",
//         data:{ userid:userid, acct_id : acct_id, rqbid : rqbi_id },
//         success:function(response){ 
//             console.log(response);
//         }
//     });
// }


$(document).on('click', '.allfrmsrepeatable_close', function(){
  
    var form_id = $(this).attr('data-formid');
    var form_type = $(this).attr('data-formtype');
    var rowid = $(this).attr('data-rowid');
    var batch_id = $(this).attr('data-batchid');
    var rid = $(this).attr('data-rid');


    $('#repeatforms_remove_ok').attr('data-formid',form_id);
    $('#repeatforms_remove_ok').attr('data-formtype',form_type);
    $('#repeatforms_remove_ok').attr('data-rowid',rowid);
    $('#repeatforms_remove_ok').attr('data-batchid',batch_id);
    $('#repeatforms_remove_ok').attr('data-rid',rid);
    $('.repeatFormsClosePopup').trigger('click');

});


$(document).on('click', '#repeatforms_remove_ok', function(){

    var form_id = $(this).attr('data-formid');
    var form_type = $(this).attr('data-formtype');
    var rowid = $(this).attr('data-rowid');
    var batch_id = $(this).attr('data-batchid');
    var rid = $(this).attr('data-rid');

    deleteRepeatableForms(form_id,form_type,rowid,batch_id,rid);

});



function deleteRepeatableForms(form_id='', form_type='', rowid='', batch_id='',rid=''){    

    $('.allformsclose_'+rid).click();
    var userid = localStorage.getItem('usernumericid');
    var acct_id = $('.session_hide_tab').find('.active').find('.accountid').val();
    $.ajax({
        type:"POST",
        url: laravel_url+"/repeatable_close_action",
        data:{ userid:userid, acct_id : acct_id,batch_id:batch_id, rqbi_id : rqbi_id,com_id:com_id,form_id : form_id, form_type : form_type },
        success:function(response) { 

            $('.allFrmsEdition_'+rowid).remove();

            sinumberset(); 
            
            get_rhs_classbuilder(accid);

            updateQuoteNameBasedTotalPremium();     
        }
    });

}

function conflitforms_check(){
    
    $.each(forms_frontend_rules.all_form_id, function (key, val) { 
        $.each(forms_frontend_rules.all_form_id[key], function (key1, val1) { 
                var index = val1.indexOf(",");    
                if (index !== -1) {
                    var res = val1.split(",");
                    $.each(res, function (key2, val2) {
                        var key_rowid = $('[data-formid="'+key+'"]').closest('tr').data('rowid');
                        var rowid = $('[data-formid="'+val2+'"]').closest('tr').data('rowid');

                        if ($('[data-formid="'+val2+'"]').prop('checked') == true && $('[data-formid="'+key+'"]').prop('checked') == true) {   
                            $('.conflitrulecheck_'+key_rowid).html('<p class="conflitrulecheck_'+key_rowid+'" style="color:red;" >'+val2+' is already checked</p>');
                        } else {
                            $('.conflitrulecheck_'+key_rowid).html('');
                        }
                    });
                } else {

                    var key_rowid1 = $('[data-formid="'+key+'"]').closest('tr').data('rowid');
                    var rowid1 = $('[data-formid="'+val1+'"]').closest('tr').data('rowid');

                    if ($('[data-formid="'+val1+'"]').prop('checked') == true && $('[data-formid="'+key+'"]').prop('checked') == true)  {   
                        $('.conflitrulecheck_'+key_rowid1).html('<p class="conflitrulecheck_'+key_rowid1+'" style="color:red;" >'+val1+' is already checked</p>');
                    } else {
                        $('.conflitrulecheck_'+key_rowid1).html('');
                    }
                }
        });
    });

}


function updateQuoteNameBasedTotalPremium(){

     var userid = localStorage.getItem('usernumericid');
     $.ajax({
        type:"POST",
        url: laravel_url+"/updateQuoteName",
        data:{ accid:accid, rqbi_id : rqbi_id, userid : userid },
        success:function(response) { 
            var obj = JSON.parse(response);
            $('#rqbiQuoteVersion').find("option[value='"+rqbi_id+"']").text(obj.newQuoteName);
        },
          complete: function () {
            $('.loader').hide();  
           }
    });

}
