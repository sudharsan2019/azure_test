$(document).on('click','.btn_canel_excelrater',function(){
    $('#excelrater_fileupload').val('');
    $('#noFile').text('');
});

$(document).on('click','.btn_upload_excelrater',function(){

    console.log($('#excelrater_fileupload')[0].files[0]);

    if ($('#excelrater_fileupload')[0].files[0] != undefined) {

        var userid =localStorage.getItem('usernumericid');
        var form_data = new FormData();         
        var fileName = '';
        var fileExtension = '';

        form_data.append("file", $('#excelrater_fileupload')[0].files[0]);
        form_data.append("rqbi_id", rqbi_id);
        form_data.append("accid", accid);
        form_data.append("userid", userid);        
        fileName = $('#excelrater_fileupload')[0].files[0].name;
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

        var allowedfiles = [];
        allowedfiles.push("XLSM","xlsm");

        if(jQuery.inArray(fileExtension.toLowerCase(), allowedfiles) != -1) {
            $('.loader').show();
            $('.loader .pleasewait_text').text('Upload inprogress...');
            $.ajax({
                url: "../excelrater/excelrater_upload.php", // point to server-side PHP script 
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(response){
                    var obj = JSON.parse(response);

                    if (obj.status == 'success') {
                        new PNotify({ title: 'success', text: obj.msg, delay: 2000, type: 'success' });
                        update_excelrate_values(accid,rqbi_id,userid);
                    }else{
                        new PNotify({ title: 'Error', text: obj.msg, delay: 2000, type: 'error' });
                        $('.loader').hide();
                        $('.loader .pleasewait_text').text('Please Wait...');
                    }
                },
                complete: function() {
                    $('#excelrater_fileupload').val('');
                    $('#noFile').text('');
                }
            });
        } else {
            new PNotify({ title: 'Error', text: 'Invalid file type', delay: 2000, type: 'error' });
            $('#excelrater_fileupload').val('');
            $('#noFile').text('');
        }
    }else{
        new PNotify({ title: 'Error', text: 'Please Upload a File', delay: 2000, type: 'error' });
    }
});


function update_excelrate_values(accid,rqbi_id,userid){
    $.ajax({
        url: laravel_url+"/update_excelrate_values",
        type:'post',
        data:{ accid:accid, rqbi_id:rqbi_id, userid:userid, com_id:com_id},
        success:function(response){

            console.log(response)
            var obj = JSON.parse(response);
            console.log(obj)
            console.log(obj.accdatas.acc_address)

            if (obj.status == 'success') {
                new PNotify({ title: 'success', text: obj.msg, delay: 2000, type: 'success' });
                $('.loader').hide();
                var accountname = obj.accdatas.accountname;
                var acc_address = obj.accdatas.acc_address;
                var acc_zip = obj.accdatas.acc_zip;
                var acc_city = obj.accdatas.acc_city;
                var acc_state = obj.accdatas.acc_state;
                var acc_rqbid = obj.accdatas.rqbi_id;
                update_accountdata(accountname, acc_address, acc_zip, acc_city, acc_state);
                $('#pills-rqbi-tab').click();
                setTimeout (function () {
                    $('#rqbiQuoteVersion').val(rqbi_id).trigger("change");
                }, 3000);
            }else{
                new PNotify({ title: 'Error', text: obj.msg, delay: 2000, type: 'error' });
                $('.loader').hide();
            }
        },
        error: function(xhr, status, error){
                var err = JSON.parse(xhr.responseText);
                new PNotify({ title: 'Error', text: err.message, delay: 2000, type: 'error' });
                $('.loader').hide();
            },
        complete :function(){
               
            }
    });

}

/*Display file name under rater upload*/
$(document).on('change', '#excelrater_fileupload', function () {
  var filename = $("#excelrater_fileupload").val();

  if (/^\s*$/.test(filename)) {
    $(".excelrater_file_upload").removeClass('active');
    $("#noFile").text("No file chosen..."); 
  }else {
    $(".excelrater_file_upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
  }
});


function update_accountdata(accountname, acc_address, acc_zip, acc_city, acc_state){

    if(accountname != ''){
        $('#ac_tname').val(accountname);
        $('.bindacc_nametop').html(": <b>" + accountname + "</b>");
    }

    if(acc_address != ''){
        $('#ac_mailAdd').val(acc_address);
    }

    if(acc_zip != ''){
        $('#ac_mailAdd_zip').val(acc_zip);
    }

    if(acc_state != ''){
        $('#ac_mailAdd_state').val(acc_state);
    }

    // if(acc_city != ''){
    //     // $('#ac_mailAdd_city option:selected').removeAttr('selected');
    //     $('#ac_mailAdd_city option').removeAttr('selected');
    //     // $('#ac_mailAdd_city').val(acc_city);
    //     $("#ac_mailAdd_city option[value='"+acc_city+"']").attr("selected","selected");
    // }

    if(acc_city != ''){
        update_city_dropdown_ui(acc_zip,acc_city);
    }
    
}


function update_city_dropdown_ui(acc_zip,acc_city){
    $.ajax({
        url: laravel_url+"/update_city_dropdown_ui",
        type:'post',
        data:{ acc_zip:acc_zip, acc_city:acc_city },
        success:function(response){
            $('#ac_mailAdd_city option').remove();
            $('#ac_mailAdd_city').append(response)
        }
    });

}