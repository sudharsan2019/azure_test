// $.getScript("custom.js", function () {
// 	alert("Script loaded but not necessarily executed.");
// });

    Dropzone.autoDiscover = false;

$(function() {

    // $('.dropzone').each(function(index, value){
    // console.log(index);
    //Dropzone class
    let myDropzone0 = new Dropzone(".dropzone0", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone0.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues0[0]);
        formData.append('dragname',  passingvalues0[1]);
        formData.append('dragtype',  passingvalues0[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone0.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone0.on("complete", function(file) {
        myDropzone0.removeFile(file);
    });

    myDropzone0.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues0 = [''];

        var finished_files0 = myDropzone0.files.length;
        console.log('drag9  count - ',finished_files0);
        if (finished_files0 <= 1) {
            getallindication_docs();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files0);
        }

    });

    let passingvalues0 = [];
    
    // $('.upload_dragdrop0').click(function(){  
        $(document).on('click','.upload_dragdrop0',function(){
        // });
        passingvalues0 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues0.push(dragdropcategory);
            passingvalues0.push(dragname);
            passingvalues0.push(dragtype); 
            myDropzone0.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });



// dropzone1 start
    let myDropzone1 = new Dropzone(".dropzone1", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone1.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues1[0]);
        formData.append('dragname',  passingvalues1[1]);
        formData.append('dragtype',  passingvalues1[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone1.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone1.on("complete", function(file) {
        myDropzone1.removeFile(file);
    });

    myDropzone1.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues1 = [''];

        var finished_files1 = myDropzone1.files.length;
        console.log('drag9  count - ',finished_files1);
        if (finished_files1 <= 1) {
            getallindication_emails();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files1);
        }

    });

    let passingvalues1 = [];
    
    // $('.upload_dragdrop1').click(function(){  
        $(document).on('click','.upload_dragdrop1',function(){
            passingvalues1 = [];
        // alert('upload_dragdrop1');

        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues1.push(dragdropcategory);
            passingvalues1.push(dragname);
            passingvalues1.push(dragtype); 
            myDropzone1.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone1 end




// dropzone2 start
    let myDropzone2 = new Dropzone(".dropzone2", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone2.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues2[0]);
        formData.append('dragname',  passingvalues2[1]);
        formData.append('dragtype',  passingvalues2[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone2.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone2.on("complete", function(file) {
        myDropzone2.removeFile(file);
    });

    myDropzone2.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues2 = [''];

        var finished_files2 = myDropzone2.files.length;
        console.log('drag9  count - ',finished_files2);
        if (finished_files2 <= 1) {
            getallquote_docs();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files2);
        }
    });

    let passingvalues2 = [];
    
    // $('.upload_dragdrop2').click(function(){  
        $(document).on('click','.upload_dragdrop2',function(){
            passingvalues2 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues2.push(dragdropcategory);
            passingvalues2.push(dragname);
            passingvalues2.push(dragtype); 
            myDropzone2.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone2 end


// dropzone3 start
    let myDropzone3 = new Dropzone(".dropzone3", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone3.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues3[0]);
        formData.append('dragname',  passingvalues3[1]);
        formData.append('dragtype',  passingvalues3[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone3.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone3.on("complete", function(file) {
        myDropzone3.removeFile(file);
    });

    myDropzone3.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues3 = [''];

        var finished_files3 = myDropzone3.files.length;
        console.log('drag9  count - ',finished_files3);
        if (finished_files3 <= 1) {
            getallquote_emails();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files3);
        }
    });

    let passingvalues3 = [];
    
    // $('.upload_dragdrop3').click(function(){  
        $(document).on('click','.upload_dragdrop3',function(){
            passingvalues3 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues3.push(dragdropcategory);
            passingvalues3.push(dragname);
            passingvalues3.push(dragtype); 
            myDropzone3.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone3 end


// dropzone4 start
    let myDropzone4 = new Dropzone(".dropzone4", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone4.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues4[0]);
        formData.append('dragname',  passingvalues4[1]);
        formData.append('dragtype',  passingvalues4[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone4.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone4.on("complete", function(file) {
        myDropzone4.removeFile(file);
    });

    myDropzone4.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues4 = [''];

        var finished_files4 = myDropzone4.files.length;
        console.log('drag9  count - ',finished_files4);
        if (finished_files4 <= 1) {
            getallbind_docs();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files4);
        }
    });

    let passingvalues4 = [];
    
    // $('.upload_dragdrop4').click(function(){  
        $(document).on('click','.upload_dragdrop4',function(){
            passingvalues4 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues4.push(dragdropcategory);
            passingvalues4.push(dragname);
            passingvalues4.push(dragtype); 
            myDropzone4.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone4 end


// dropzone5 start
    let myDropzone5 = new Dropzone(".dropzone5", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone5.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues5[0]);
        formData.append('dragname',  passingvalues5[1]);
        formData.append('dragtype',  passingvalues5[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone5.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone5.on("complete", function(file) {
        myDropzone5.removeFile(file);
    });

    myDropzone5.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues5 = [''];

        var finished_files5 = myDropzone5.files.length;
        console.log('drag9  count - ',finished_files5);
        if (finished_files5 <= 1) {
             getallbind_emails();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files5);
        }
    });

    let passingvalues5 = [];
    
    // $('.upload_dragdrop5').click(function(){  
        $(document).on('click','.upload_dragdrop5',function(){
            passingvalues5 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues5.push(dragdropcategory);
            passingvalues5.push(dragname);
            passingvalues5.push(dragtype); 
            myDropzone5.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone5 end


// dropzone6 start
    let myDropzone6 = new Dropzone(".dropzone6", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone6.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues6[0]);
        formData.append('dragname',  passingvalues6[1]);
        formData.append('dragtype',  passingvalues6[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone6.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone6.on("complete", function(file) {
        myDropzone6.removeFile(file);
    });

    myDropzone6.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues6 = [''];

        var finished_files6 = myDropzone6.files.length;
        console.log('drag9  count - ',finished_files6);
        if (finished_files6 <= 1) {
            getallissue_docs();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files6);
        }
    });

    let passingvalues6 = [];
    
    // $('.upload_dragdrop6').click(function(){  
        $(document).on('click','.upload_dragdrop6',function(){
            passingvalues6 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues6.push(dragdropcategory);
            passingvalues6.push(dragname);
            passingvalues6.push(dragtype); 
            myDropzone6.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone6 end



// dropzone7 start
    let myDropzone7 = new Dropzone(".dropzone7", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone7.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues7[0]);
        formData.append('dragname',  passingvalues7[1]);
        formData.append('dragtype',  passingvalues7[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone7.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone7.on("complete", function(file) {
        myDropzone7.removeFile(file);
    });

    myDropzone7.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues7 = [''];

        var finished_files7 = myDropzone7.files.length;
        console.log('drag9  count - ',finished_files7);
        if (finished_files7 <= 1) {
           getallissue_emails();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files7);
        }
    });

    let passingvalues7 = [];
    
    // $('.upload_dragdrop7').click(function(){  
        $(document).on('click','.upload_dragdrop7',function(){
            passingvalues7 = [];
        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues7.push(dragdropcategory);
            passingvalues7.push(dragname);
            passingvalues7.push(dragtype); 
            myDropzone7.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }
        
    });
// });
// dropzone7 end




// dropzone8 start
    let myDropzone8 = new Dropzone(".dropzone8", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone8.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues8[0]);
        formData.append('dragname',  passingvalues8[1]);
        formData.append('dragtype',  passingvalues8[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    myDropzone8.on("complete", function(file) {
        myDropzone8.removeFile(file);
    });
    myDropzone8.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });

    myDropzone8.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues8 = [''];

        var finished_files8 = myDropzone8.files.length;
        if (finished_files8 <= 1) {
            console.log('drag8 count - ',finished_files8);
            $('.pollicytesting').trigger('click');
            getall_document_email_notes_count();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }
    });

    let passingvalues8 = [];
    
    // $('.upload_dragdrop8').click(function(){  
        $(document).on('click','.upload_dragdrop8',function(){

        // $('.loader').show();

        passingvalues8 = [];

        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();

        if (dragdropcategory != '') {
            passingvalues8.push(dragdropcategory);
            passingvalues8.push(dragname);
            passingvalues8.push(dragtype); 
            myDropzone8.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }

        $('.policy_tab_active').removeClass('policy_sidemenu_btn');
        $('#collapseOne').addClass("show");
        $('#collapseTwo').removeClass("show");
        $('#collapseThree').removeClass("show");
        
    });
// });
// dropzone8 end


// dropzone9 start
    let myDropzone9 = new Dropzone(".dropzone9", {
        url: "../brokerage_dragdrop_v2/upload.php",
       // uploadMultiple: true,
       // paramName: "file",
       // maxFilesize: 2,
        //maxFiles: 10,
        //acceptedFiles: "image/*,application/pdf",
        addRemoveLinks: true,
        autoProcessQueue: false,
        parallelUploads: 50
    });

      myDropzone9.on("sending", function(file, xhr, formData) {
        formData.append('accountid', $('.session_hide_tab').find('.active').find('.accountid').val());
        formData.append('category',  passingvalues9[0]);
        formData.append('dragname',  passingvalues9[1]);
        formData.append('dragtype',  passingvalues9[2]);
        formData.append('userid',  localStorage.getItem('usernumericid'));
        formData.append('username',  localStorage.getItem('username'));
    });

    
    myDropzone9.on('uploadprogress', function (file, progress) {
        $('.loader').show();
    });
    myDropzone9.on("complete", function(file) {
        myDropzone9.removeFile(file);
    });

    myDropzone9.on("success", function(file) {

        $('.dragname').val('');
        $('.dragtype').val('');

        passingvalues9 = [''];

        var finished_files9 = myDropzone9.files.length;
         console.log('drag9 count 11 - ',finished_files9);
        if (finished_files9 <= 1) {

            console.log('drag9 count - ',finished_files9);
            $('.pollicytesting').trigger('click');
            getall_document_email_notes_count();
            new PNotify({ title: 'Success', text: 'Uploaded Successfully', delay: 2000, type: 'success' });
        }else{
            console.log('drag9 else count - ',finished_files9);
        }

    });

    let passingvalues9 = [];
    
    // $('.upload_dragdrop9').click(function(){  
        $(document).on('click','.upload_dragdrop9',function(){

         passingvalues9 = [];

        let dragdropcategory = $(this).closest('.dragdropcontainers').find('.dragdropcategory').val();
        //let dragname = $(this).closest('.dragdropcontainers').find('.dragname').val();
        let dragname = '';
        let dragtype = $(this).closest('.dragdropcontainers').find('.dragtype').val();


        if (dragdropcategory != '') {
            passingvalues9.push(dragdropcategory);
            passingvalues9.push(dragname);
            passingvalues9.push(dragtype); 
            myDropzone9.processQueue();
        }else{
            // $(this).closest('.dragdropcontainers').find(".dragdrop_errormsg").html('Fill All Fields').css('color','red').fadeIn('fast').delay(1500).fadeOut('slow');
            new PNotify({ title: 'Error', text: 'Fill All Fields', delay: 2000, type: 'error' });
        }

         $('.policy_tab_active').removeClass('policy_sidemenu_btn');
        $('#collapseOne').removeClass("show");
        $('#collapseTwo').addClass("show");
        $('#collapseThree').removeClass("show");
         $('.mailTab').trigger('click');
    });
// });
// dropzone9 end










});

