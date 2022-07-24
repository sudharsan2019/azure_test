// $.getScript("custom.js", function () {
//  alert("Script loaded but not necessarily executed.");
// });

    Dropzone.autoDiscover = false;

$(function() {


// dropzone_submission start
    let dropzone_submission = new Dropzone(".dropzone_submission", {
        url: "../brokerage_dragdrop_v2/upload_front.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      dropzone_submission.on("sending", function(file, xhr, formData) {
        // formData.append('userid',  localStorage.getItem('usernumericid'));
        // formData.append('username',  localStorage.getItem('username'));
    });

     dropzone_submission.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    dropzone_submission.on("complete", function(file) {
        dropzone_submission.removeFile(file);
    });

    dropzone_submission.on("success", function(file, response) {

        var finished_files = dropzone_submission.files.length;
        if (finished_files <= 1) {
            res = response.trim();
            if (res == 'fail') {
               get_emailst();
               new PNotify({ title: 'Error', text: 'Not a valid Format', delay: 2000, type: 'error' });
           }else{
               console.log('esubmission count - ',finished_files);
               get_emailst();
               new PNotify({ title: 'Success', text: 'Uploaded', delay: 2000, type: 'success' });
           }
        }

        
    });

    
    $('.submission_upload_btn').click(function(){  

        dropzone_submission.processQueue();
        
    });
// });
// dropzone_submission end













});

