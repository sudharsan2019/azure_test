

$(document).on('blur','.manuFrmNoInput',function(){
    $('.manuFrmuploadInput, .manuPremInput').css('pointer-events', 'none');
    $('.manuPremLbl').addClass('disableFields');

    var rid = $(this).attr('data-rowid');
    var quoteversion = $('#rqbiQuoteVersion').val();
    var form_number = $(this).val();
    var fno_oldvalue = $(this).attr('data-fno-oldvalue');
    var id = $(this).data('id');
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var userid =localStorage.getItem('usernumericid');
    var form_name = $('.manuFrmNameInput_'+rid).val();
    var filename = $('.scriptuploadedfiles_'+rid).text();

    if (form_name != '') {
        $('.manuFrmNameInput').css('pointer-events', 'none');
    } else {
        $('.manuFrmNameInput').css('pointer-events', 'initial');
    }

    if (form_number != ''  && form_name != '' ) {
        if(form_number != fno_oldvalue) {
            $('.manuFrmNoLbl_'+rid).show();
            $('.manuFrmNoLbl_'+rid+' span').show().text(form_number);
            $('.manuFrmNoInput_'+rid).hide();
            $('.manuscriptFrmTable tbody').addClass('disableFields');
            savenumberandname(id,accid,quoteversion,form_number,userid,form_name);
        } else {
            $(this).hide();
            $('.manuFrmNoLbl_'+rid).show().val(form_number);
        }
    }else{
        $('.manuFrmNoLbl_'+rid).hide();
        $('.manuFrmNoInput_'+rid).show();
        $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput').css('pointer-events', 'initial');
        // new PNotify({ title: 'Error', text: 'Number Field Cannot be Empty' , delay: 1000, type: 'error' });
    }
});

function savenumberandname(id,accid,quoteversion,form_number,userid,form_name){
    $.ajax({
        url: laravel_url+"/save_update_manuscript_form_number_name",
        type:'post',
        data:{ id:id, accid:accid, quoteversion:quoteversion, form_number:form_number, userid:userid, form_name:form_name  },
        success:function(response){
            var obj = JSON.parse(response);

            if (obj.status == 'success') {
                new PNotify({ title: 'success', text: obj.msg, delay: 1000, type: 'success' });
                $('.manuscript_card_header').removeAttr('style');
                $('.manuscript_card_header a').removeAttr('style');
                get_formsummary(accid, rqbi_id);
            }else{
                new PNotify({ title: 'Error', text: obj.msg, delay: 1000, type: 'error' });
                $('.manuscriptFrmTable tbody').removeClass('disableFields');
            }
        },
        complete: function() {
            getsaved_menuscriptforms();
        }
    });

}

$(document).on('blur','.manuFrmNameInput',function(){
    $('.manuFrmuploadInput, .manuPremInput').css('pointer-events', 'none');
    $('.manuPremLbl').addClass('disableFields');

    var rid = $(this).attr('data-rowid');
    var quoteversion = $('#rqbiQuoteVersion').val();
    var form_name = $(this).val();
    var fname_oldvalue = $(this).attr('data-fname-oldvalue');
    var id = $(this).data('id');
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var userid =localStorage.getItem('usernumericid');
    var form_number = $('.manuFrmNoInput_'+rid).val();
    var filename = $('.scriptuploadedfiles_'+rid).text();

    if (form_number != ''  && form_name != '' ) {
        if(form_name != fname_oldvalue) {
            $('.manuscriptFrmTable tbody').addClass('disableFields');
            $('.manuFrmNameLbl_'+rid).show();
            $('.manuFrmNameLbl_'+rid+' a').show().text(form_name);
            $('.manuFrmNameInput_'+rid).hide();
            savenumberandname(id,accid,quoteversion,form_number,userid,form_name);
        } else {
            $(this).hide();
            $('.manuFrmNameLbl_'+rid).show().val(form_name);
        }
    }else{
        $('.manuFrmNameLbl_'+rid).hide();
        $('.manuFrmNameInput_'+rid).show();
        $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput').css('pointer-events', 'initial');
        // new PNotify({ title: 'Error', text: 'Name Field Cannot be Empty' , delay: 1000, type: 'error' });
    }
});

$(document).on('focusout', '.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput', function() {
    var rid = $(this).attr('data-rowid');
    var fno = $('.manuFrmNoInput_'+rid).val();
    var fname = $('.manuFrmNameInput_'+rid).val();

    if($(this).hasClass('manuFrmuploadInput')) {
        setTimeout( function() {
            $('.manuPremLbl').removeClass('disableFields');
            $('.manuPremInput').css('pointer-events', 'initial');
        }, 2500);
    } else {
        if((fno != '' && fname == '') || (fno == '' && fname != '')) {
            $('.manuPremLbl').removeClass('disableFields');
            $('.manuPremInput').css('pointer-events', 'initial');
        } else {
            setTimeout( function() {
                $('.manuPremLbl').removeClass('disableFields');
                $('.manuPremInput').css('pointer-events', 'initial');
            }, 2500);
        }
    }
});

$(document).on('keyup', '.manuFrmNoInput, .manuFrmNameInput', function() {
    $('.manuPremLbl').addClass('disableFields');
    $('.manuPremInput').css('pointer-events', 'none');
});

/*Start Prevent tab key when save the manuscript form values*/
// $(document).on('blur','.manuFrmNoInput, .manuFrmNameInput',function(){
//     $('.manuscriptFrmTable').keydown(function(objEvent) {
//         if (objEvent.keyCode == 9) { 
//             objEvent.preventDefault(); 
//         }
//     });
// })
/*End Prevent tab key when save the manuscript form values*/

$(document).on('focus','.manuFrmNoInput, .manuFrmNameInput',function(){
    var rid = $(this).attr('data-rowid');

    if ($(this).hasClass('manuFrmNameInput')) {
        var form_no = $('.manuFrmNoInput_'+rid).val();

        // $('.manuFrmNameInput_'+rid).css('pointer-events', 'initial');

        if (form_no != '') {
            $('.manuFrmNoInput').css('pointer-events', 'none');
        } else {
            $('.manuFrmNoInput').css('pointer-events', 'initial');
        }
    }    

    if ($(this).hasClass('manuFrmNoInput')) {
        var form_name = $('.manuFrmNameInput_'+rid).val();
        // $('.manuFrmNoInput_'+rid).css('pointer-events', 'initial');

        if (form_name != '') {
            $('.manuFrmNameInput').css('pointer-events', 'none');
        } else {
            $('.manuFrmNameInput').css('pointer-events', 'initial');
        }
    } 
});

$(document).on('keyup','.manuFrmNoInput, .manuFrmNameInput',function(){
    $('.manuPremLbl').addClass('disableFields');
    if($(this).val() != '') {
         $(this).removeClass('manufrm_redBorder');
    } else {
        $(this).addClass('manufrm_redBorder');
    }
});

$(document).on('blur','.manuPremInput',function(){
    $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput').css('pointer-events', 'none');
    var rid = $(this).attr('data-rowid');
    $('.manuPremLbl_'+rid).show();

    var quoteversion = $('#rqbiQuoteVersion').val();
    var form_premium = $(this).val();
    if ( form_premium > 0 ) {
        form_premium = form_premium.replace('$', '').replace(/,/g, '').replace(/^0+/, "");
    } 
    else if ( form_premium == '' ) {
        form_premium = '';
    }
    var id = $(this).data('id');
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var userid =localStorage.getItem('usernumericid');

    var manuFrmNoInput = $('.manuFrmNoInput_'+rid).val();
    var manuFrmNameInput = $('.manuFrmNameInput_'+rid).val();

    var premium = $(this).attr('data-premium');


    // if (form_premium > 0) {

        $('.manuPremLbl_'+rid+' span').show().text(numberWithCommas(form_premium));
        $('.manuPremInput_'+rid).hide();

        if (form_premium != premium) {
            $.ajax({
                url: laravel_url+"/save_update_manuscript_formpremium",
                type:'post',
                data:{ id:id, accid:accid, quoteversion:quoteversion,com_id:com_id, form_premium:form_premium, userid:userid  },
                success:function(response){
                    var obj = JSON.parse(response);

                    if (obj.status == 'success') {
                        new PNotify({ title: 'success', text: obj.msg, delay: 1000, type: 'success' });
                        get_formsummary(accid, rqbi_id);
                    }else{
                        new PNotify({ title: 'Error', text: obj.msg, delay: 1000, type: 'error' });
                    }

                     get_rhs_classbuilder(accid);
                     updateQuoteNameBasedTotalPremium();
                },
                complete: function() {
                    getsaved_menuscriptforms();
                }
            });
        }else{
            $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput').css('pointer-events', 'initial');
        }

        

    // }else{
    //     $('.manuPremLbl_'+rid).hide();
    //     $('.manuPremInput_'+rid).show();
    //     // new PNotify({ title: 'Error', text: 'Field Cannot be Empty' , delay: 1000, type: 'error' });
    //     $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput, .manuPremInput').css('pointer-events', 'initial');
    // }


});


function getsaved_menuscriptforms(){
    var quoteversion = $('#rqbiQuoteVersion').val();
    $('.manuscriptFrmTable tbody').addClass('disableFields');
    $('.manuPremLbl').addClass('disableFields');

    $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput, .manuPremInput').css('pointer-events', 'none');
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
        $.ajax({
            url: laravel_url+"/getsaved_menuscriptforms",
            type:'post',
            data:{ accid:accid, quoteversion:quoteversion },
            success:function(response){
                $('.manuscriptFrmTable tbody').html('');
                $('.manuscriptFrmTable tbody').append(response); 
                setTimeout( function() {
                    $('.manuscriptFrmTable tbody').removeClass('disableFields');
                    $('.manuPremLbl').removeClass('disableFields');
                    $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput, .manuPremInput').css('pointer-events', 'initial');
                }, 1000);
            },
            complete: function() {
                $('.manuFrmsAddRow').removeAttr('disabled');
                // if ( quoteversion != '' ) {
                //   $('.rqbi_all_tabs, #locationAccord, .cbContinueFullquote').removeClass('accordDisabled');
                // }                    
                menu_permission();
            }
        });
}



function menuscript_delete(){
    var id = $('.menuscripthiddenid').val();
    var userid =localStorage.getItem('usernumericid');

    if (id =='') {
        getsaved_menuscriptforms();
        new PNotify({ title: 'success', text: 'Deleted Successfully', delay: 1000, type: 'success' });
        return false;
    }

    $.ajax({
        url: laravel_url+"/menuscript_delete",
        type:'post',
        data:{ accid:accid,com_id:com_id,rqbi_id:rqbi_id,id:id, userid:userid},
        success:function(response){
            var obj = JSON.parse(response);

            if (obj.status == 'success') {
                new PNotify({ title: 'success', text: obj.msg, delay: 1000, type: 'success' });
                get_formsummary(accid, rqbi_id);
            }else{
                new PNotify({ title: 'Error', text: obj.msg, delay: 1000, type: 'error' });
            }

            if(obj.manuscript_premium !== null){
                $('.rhs_manuscript_premium').text(obj.manuscript_premium);
                } else {
                    $('.rhs_manuscript_premium').text('');
                }


                if(obj.total_premium !== null){
                    $('.rhs_total_premium').text(obj.total_premium);
                    $('.totalPremiumLabel').text(obj.total_premium);
                } else {
                    $('.rhs_total_premium').text('');
                }


                if(obj.total_commission !== null){
                    $('.rhs_total_commission').text(obj.total_commission);
                } else {
                    $('.rhs_total_commission').text('');
                }

                 updateQuoteNameBasedTotalPremium();
        },
        complete: function() {
            getsaved_menuscriptforms();
        }
    });
}




$(document).on('change','.manuFrmuploadInput',function(){
    $('.manuFrmNameInput, .manuFrmNoInput, .manuPremInput').css('pointer-events', 'none');

    var id = $(this).data('id');

    var rowid = '';

    if ($(this).hasClass("lastrow")) {
        rowid = 0;
    }else{

        var lastrow = [];

        $( ".manuFrmuploadInput" ).each(function( index ) {
          if ($( this ).hasClass('lastrow')) {
            lastrow.push(index);
          }
        });

        if (lastrow.length > 0) {
            rowid = $(this).data('rowid');
        }else{
            rowid = $(this).data('rowid') - 1;
        }
        
    }

    var quoteversion = $('#rqbiQuoteVersion').val();
    // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
    var userid =localStorage.getItem('usernumericid');

    var form_data = new FormData();         

    var fileName = '';
    var fileExtension = '';

    $.each($("#manuscriptAccord input[type='file']")[rowid].files, function(i, file) {

        form_data.append("manuFrmuploadInput", file);
        form_data.append("manuFrmuploadInput[quoteversion]", quoteversion);
        form_data.append("manuFrmuploadInput[accid]", accid);
        form_data.append("manuFrmuploadInput[userid]", userid);
        form_data.append("manuFrmuploadInput[id]", id);
        
         fileName = file.name;
         fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

    });
    

    var allowedfiles = [];
    allowedfiles.push("pdf","doc","docx");

    if(jQuery.inArray(fileExtension.toLowerCase(), allowedfiles) != -1) {
        $('.manuscriptFrmTable tbody').addClass('disableFields');

        $.ajax({
            url: laravel_url+"/save_update_menuscript_fileupload", // point to server-side PHP script 
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            success: function(response){
                var obj = JSON.parse(response);

                if (obj.status == 'success') {
                    new PNotify({ title: 'success', text: obj.msg, delay: 1000, type: 'success' });
                }else{
                    new PNotify({ title: 'Error', text: obj.msg, delay: 1000, type: 'error' });
                    $('.manuscriptFrmTable tbody').removeClass('disableFields');
                }
            },
            complete: function() {
                getsaved_menuscriptforms();
            }
        });
    } else {
        new PNotify({ title: 'Error', text: 'File Type Not Allowed', delay: 1000, type: 'error' });
        getsaved_menuscriptforms();
        $('.manuFrmNoInput, .manuFrmNameInput, .manuFrmuploadInput, .manuPremInput').css('pointer-events', 'initial');
    }
});

/*Manuscript form - remove uploaded file*/
$(document).on('click', '.mnfrmremovefile', function() {
    var rid = $(this).attr('data-rowid');
    $('.scriptuploadedfiles_'+rid).remove();
    $('.mnfrmremovefile_'+rid).remove();
    $('.manuFrmuploadInput_'+rid).show();
    $('.fileFormatWarn_'+rid).show();

    var id = $(this).attr('data-id');

    $.ajax({
        url: laravel_url+"/menuscript_fileupload_delete",
        type:'post',
        data:{ id:id},
        success:function(response){

            // var obj = JSON.parse(response);

            // if (obj.status == 'success') {
            //     new PNotify({ title: 'success', text: obj.msg, delay: 1000, type: 'success' });
            // }else{
            //     new PNotify({ title: 'Error', text: obj.msg, delay: 1000, type: 'error' });
            // }
        },
        complete: function() {
            getsaved_menuscriptforms();
        }
    });


});




function manuscript_validation_check(generated_value=''){

    var mand_check = true;

    $.ajax({

            url: laravel_url+"/check_manuscriptforms_validation",
            type:'post',
            async: false,
            data:{ accid:accid, rqbi_id:rqbi_id},

            success:function(response) {

                var obj = JSON.parse(response);

                for(let i=0;i<obj.data.length;i++){

                    if(obj.data.length > 0) {

                        if(obj.data[i].form_name == null || obj.data[i].form_number == null) {

                            mand_check = false;

                        }  

                    if(generated_value == 'issue') { 

                        if(obj.data[i].uploaded_file_originalname == null){

                         mand_check = false;

                        }
                    }  
                } 
            }
        }
    });
    
    var manuscript_tr_length = $('.manuscriptFrmTable').children('tbody').children('tr').length;

    var manu_array = [];
    var manu_fname_array = [];
    var manu_upload_array = [];

    var arrcheck_form = true;
    var array_fname_array = true;
    var arrcheck_upload = true;

    for (i =1; i<=manuscript_tr_length; i++){
        
        var empty = 'empty'
        var form = $('.manuFrmNoInput_'+i).val();
        var formname = $('.manuFrmNameInput_'+i).val();
        var uploadval = $('.scriptuploadedfiles_'+i).text()

        if(form != ''){
            manu_array.push(form);
        }else{
            manu_array.push('empty');
            $('.manuFrmNoLbl_'+i).css('display','none');
            $('.manuFrmNoInput_'+i).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
        }

        if(formname != ''){
            manu_fname_array.push(formname);
        }else{
            manu_fname_array.push('empty');
            $('.manuFrmNameLbl_'+i).css('display','none');
            $('.manuFrmNameInput_'+i).attr('style','border-color:#ed4613;').prev("label").attr('style','color:#ed4613;');
        }

        if(generated_value == 'issue'){

                if(uploadval != ''){
                    manu_upload_array.push(uploadval);
                }else{
                    manu_upload_array.push('empty');
                    $('.menuerror_msg_'+i).html('');
                    $('.menuerror_msg_'+i).html('Required');
                }
        }

    }

    if(jQuery.inArray("empty", manu_array) !== -1){
        arrcheck_form = false;
        mand_check = false;
    }

    if(jQuery.inArray("empty", manu_fname_array) !== -1){
        array_fname_array = false;
        mand_check = false;
    }
    
    if(generated_value == 'issue'){

        if(jQuery.inArray("empty", manu_upload_array) !== -1){
            arrcheck_upload = false;
            mand_check = false;
        }
    }

    if(mand_check == false){
        $('.manuscript_card_header').css('border','1px solid red');
        $('.manuscript_card_header a').css('color', '#ed4613');
    } else {
        $('.manuscript_card_header').removeAttr('style');
        $('.manuscript_card_header a').removeAttr('style');
    }
    
     return mand_check;
}

/*Tab off function*/
// $(document).on('keydown', '.manuFrmNoInput', function(e) { 
//     var rid = $(this).attr('data-rowid');
//     var keyCode = e.keyCode || e.which; 
//     if (keyCode == 9) { 
//         $('.manuFrmuploadInput_'+rid).attr('tabindex', '-1');
//         $('.manuFrmNameLbl_'+rid).css('display', 'none');
//         $('.manuFrmNameInput_'+rid).show().removeAttr('style').trigger(e);
//     } 
// });

// $(document).on('keydown', '.manuFrmNameInput', function(e) { 
//     var rid = $(this).attr('data-rowid');
//     var keyCode = e.keyCode || e.which; 
//     if (keyCode == 9) { 
//         $('.manuFrmuploadInput_'+rid).removeAttr('tabindex');
//     } 
// });

// $(document).on('keydown', '.manuFrmuploadInput', function(e) { 
//     var rid = $(this).attr('data-rowid');
//     var keyCode = e.keyCode || e.which; 
//     if (keyCode == 9) { 
//         $('.manuPremLbl_'+rid).css('display', 'none');
//         $('.manuPremInput_'+rid).show().removeAttr('style').trigger(e);
//     } 
// });

// $(document).on('keydown', '.manuPremInput', function(e) { 
//     var rid = $(this).attr('data-rowid');
//     var next_rid = parseInt(rid)+parseInt(1);

//     var keyCode = e.keyCode || e.which; 
//     if (keyCode == 9) { 
//         $('.manuFrmNoLbl_'+next_rid).css('display', 'none');
//         $('.manuFrmNoInput_'+next_rid).show().removeAttr('style').addClass('input_box_shadow').trigger(e);
//     } 
// });