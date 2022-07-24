Dropzone.autoDiscover = false;

$(function() {

    var myDropzone0 = new Dropzone(".dropzone0", {
        url: "../brokerage_dragdrop_v2/upload.php",
       uploadMultiple: true,
       // paramName: "file",
        // maxFilesize: 30,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        // acceptedFiles: "image/jpeg, image/jpg, image/png, application/pdf, application/msword,",
        // chunking: true,
        init: function() {
            var $this = this;
            $(".uploadTab, .uploadCancelBtn").click(function() {
                $this.removeAllFiles(true);
            });
        },
        // accept: function(file, done) {

        //     var fileName = file.name;
        //     var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1); 
        //     console.log(fileExtension);

        //     var arr = [ "doc","docx","docm","xls","xlsx","xlsm","ppt","pptx","csv","jpeg","jpg","png","pdf","msg","eml"];

        //     if(jQuery.inArray(fileExtension.toLowerCase(), arr) !== -1){
        //         done();
        //     } else {
        //     new PNotify({ title: 'Error', text: file.name+' Removed '+fileExtension.toUpperCase()+' File Format', delay: 1500, type: 'error' });
        //       this.removeFile(file);
        //     }

        // },
        maxFiles: 50,
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

    myDropzone0.on("sending", function(file, xhr, formData) {

        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues0[0]);
        formData.append('subcategory',  passingvalues0[1]);
        // formData.append('radioval',  passingvalues0[2]);
        formData.append('nomediaval',  passingvalues0[2]);
        formData.append('filename',  passingvalues0[3]);
        formData.append('colorpick',  passingvalues0[4]);
        formData.append('colorpick_text',  passingvalues0[5]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));

    });

    myDropzone0.on("maxfilesexceeded", function(file){
        new PNotify({ title: 'Error', text: 'Maximum 50 Files are allowed to upload', delay: 1500, type: 'error' });
    });

    myDropzone0.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone0.on("complete", function(file) {

        console.log(myDropzone0.files.length);

        myDropzone0.removeFile(file);
    });

    myDropzone0.on("success", function(file,responseText) {

        setTimeout(function(){ 
            myDropzone0.processQueue();
        }, 1500);

        // passingvalues0 = [''];

        var finished_files0 = myDropzone0.files.length;

        var obj = jQuery.parseJSON(responseText);

        

        // if ($.trim(responseText) == "Format_not_supported") {
        //     new PNotify({ title: 'Error', text: 'File Format Not Supported', delay: 2000, type: 'error' });
        // }else{
        //     new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        // }
        
        if (finished_files0 <= 1) {
            if (obj.fail > 0) {
                new PNotify({ title: 'Error', text: obj.fail+' File(s) Failed to Upload', delay: 1500, type: 'error' });
            }
            if (obj.success > 0) {
                new PNotify({ title: 'success', text: obj.success+' File(s) Uploaded Successfully', delay: 1500, type: 'success' });
            }
            uploadBtnReset();
        }

        $('.loader').hide();

    });

    var passingvalues0 = [];
    
        $(document).on('click','.upload_dragdrop0',function(){
            $(this).attr('disabled',true);
            passingvalues0 = [''];
            passingvalues0 = [];
            var dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
            var dragdrop_subcategory = $(this).closest('.dragdropcontainers').find('.dragdrop_subcategory').val();
            // var dragdrop_radioval = $(this).closest('.dragdropcontainers').find("input[name='splitLiv']:checked").val();
            var dragdrop_nomediaval = $(this).closest('.dragdropcontainers').find("input[name='noMedia']:checked").val();
            var drag_filename = $(this).closest('.dragdropcontainers').find(".upFileName").val();
            var drag_colorPick = $(this).closest('.dragdropcontainers').find(".colorPick").val();
            var drag_colorPickText = $(this).closest('.dragdropcontainers').find(".colorPickText").val();

            if (dragdropcategory == 'please_select' || dragdropcategory == 'newcategory' || dragdrop_subcategory == 'newsubcategory') {
                new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 1000, type: 'error' });
                $(this).removeAttr('disabled');
            }else{
                passingvalues0.push(dragdropcategory);
                passingvalues0.push(dragdrop_subcategory);
                // passingvalues0.push(dragdrop_radioval);
                passingvalues0.push(dragdrop_nomediaval); 
                passingvalues0.push(drag_filename); 
                passingvalues0.push(drag_colorPick); 
                passingvalues0.push(drag_colorPickText); 

                if (myDropzone0.files.length <= 50) {
                    // console.log(myDropzone0.files.size);

                    myDropzone0.processQueue(); 

                    // if (myDropzone0.files.size <= 50000) {
                    //     myDropzone0.processQueue(); 
                    // }else{
                    //     new PNotify({ title: 'Error', text: 'File Size Greter than 50MB files are not allowed to upload', delay: 1000, type: 'error' });
                    // }
                    
                }else{
                    new PNotify({ title: 'Error', text: 'Only 50 files are allowed to upload', delay: 1000, type: 'error' });
                }
                $(this).removeAttr('disabled');
            }
        });

});

