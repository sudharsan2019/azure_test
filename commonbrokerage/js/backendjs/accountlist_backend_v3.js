
function getmaincategory(){
  $('.loader').show();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var dateversioning = Date.now();

  $.ajax({
    url: laravel_url+"/getmaincategory?"+dateversioning,
    type:'get',
    data:{accid:accid},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
      $('.bind_maincategory').html('');
      $('.bind_maincategory').html(response);
      $('.bind_maincategory_new').html('');

      $('.bind_subcategory').html('');
      $('.bind_subcategory_new').html('');

      $('.loader').hide();
      menu_permission();
    }
  });
}

function getmaincategory_policy(){
  $('.loader').show();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var dateversioning = Date.now();

  $.ajax({
    url: laravel_url+"/getmaincategory_policy?"+dateversioning,
    type:'get',
    data:{accid:accid},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
      $('.bind_maincategory_policy').html('');
      $('.bind_maincategory_policy').html(response);
      $('.loader').hide();
    }
  });
}

$(document).on('change','.indi_docselect',function(){
  
  var catid = $(this).val();

  if (catid == 'please_select') {
    $('.bind_maincategory_new').html('');
    $('.bind_subcategory_div').hide();
    $('.bind_subcategory').html('');
    $('.bind_subcategory_new').html('');
  }else if (catid == 'newcategory') {
    $('.bind_maincategory_new').html('');
    $('.bind_subcategory_div').hide();
    $('.bind_subcategory').html('');
    $('.bind_subcategory_new').html('');
    $('.bind_maincategory_new').html('<div class="col-md-8"><input type="text" name="addmaincategory" class="form-control addmaincategory border border-green" maxlength="30" placeholder="Add main category"></div> <div class="col-md-4"> <button class="btn btn-xs addmaincategory_btn text-white mt-2"> <i class="fas fa-plus"></i> </button></div>');
    read_onlyuser_v2();
  }else{
    
    $('.bind_maincategory_new').html('');
    $('.bind_subcategory_new').html('');
    getsubcategory(catid);
    
  }  

});


function getsubcategory(catid){
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var dateversioning = Date.now();
  $('.loader').show();
  $.ajax({
      url: laravel_url+"/getsubcategory?"+dateversioning,
      type:'post',
      data:{catid:catid, accid:accid},
      // data:{catid:catid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        $('.bind_subcategory_div').show();
        $('.bind_subcategory').html('');
        $('.bind_subcategory').html(response);
        $('.loader').hide();
      },
      complete:function(response){
        read_onlyuser_v2();   
      }
    });
}

$(document).on('change','.dragdrop_subcategory',function(){
  
  var catid = $(this).val();

  if (catid == 'newsubcategory') {
    $('.bind_subcategory_div').show();
    $('.bind_subcategory_new').html('');
    $('.bind_subcategory_new').html('<div class="col-md-8"><input type="text" name="addsubcategory" class="form-control addsubcategory border border-green" maxlength="30" placeholder="Add sub category"></div> <div class="col-md-4"> <button class="btn btn-xs addsubcategory_btn text-white mt-2"> <i class="fa fa-plus"></i></button></div>');
    read_onlyuser_v2();
  }else{
    $('.bind_subcategory_new').html('');
  }  

});

function getpolicycategory(tabvalue){
  var dateversioning = Date.now();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var username = localStorage.getItem('username');
  var permiss_id = permission.find(x=>x.rid == 20).id;

  $('.loader').show();
  $.ajax({
    url: laravel_url+"/getpolicycategory?"+dateversioning,
    type:'get',
    data:{accid:accid, username:username, tabvalue:tabvalue, permiss_id:permiss_id},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
      // console.log();
      $('.bind_policycategory').html('');
      $('.bind_policycategory').html(response);
      console.log(response);
      // $('.loader').hide();
    },
    complete:function(response){
      // getallmaindivnotes(); 

      getpolicycategory_count();  
      menu_permission();
    }
  });
}

function gettaggedpage_lists(){
  var dateversioning = Date.now();
  // $('.loader').show();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var username = localStorage.getItem('username');
  $.ajax({
    url: laravel_url+"/gettaggedpage_lists?"+dateversioning,
    type:'get',
    data:{accid:accid,username:username},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){

      $('.bind_taggedpagelist').html('');
      $('.bind_taggedpagelist').html(response);
      // $('.loader').hide();
    },
    complete:function(response){
      gettaggedpage_lists_count(); 
    }
  });
}


function gettaggedpage_lists_count(){

    var filecount = $('.taggedfiles').length;
    //console.log('tagged page count - '+filecount);
    $('.bind_taggedpage_count').html('');
    if(filecount != '0'){
      $('.bind_taggedpage_count').html('<span class="badge badge-primary">'+filecount+'</span>');
    }

}

function getpolicycategory_count(){

  $( "#policyList .maincateg_div" ).each(function( index, element ) {

    var doc_filecount = $('#policyList .maincateg_div'+index).closest('.mainfirst_div').find('.itsfile_count').length;
    // var notes_filecount = $('#policyList .maincateg_div'+index).closest('.mainfirst_div').find('.notesfile').length;
    // var tot_filecount =  doc_filecount + notes_filecount;
    var tot_filecount = doc_filecount;

    $('#policyList .maincateg_div'+index).closest('.mainfirst_div').find('.bind_main_catg_count'+index).html('');
    if(tot_filecount != '0'){
      $('#policyList .maincateg_div'+index).closest('.mainfirst_div').find('.bind_main_catg_count'+index).html('<span class="badge badge-primary mr-1">'+tot_filecount+'</span>');
    }

    $( "#policyList .subcateg_div" ).each(function( index1, element1 ) {
      
      var doc_filecount1 = $('#policyList .subcateg_div'+index+index1).closest('.subfirst_div').find('.itsfile_count').length;
      // var notes_filecount = $('#policyList .subcateg_div'+index+index1).closest('.subfirst_div').find('.notesfile').length;
      // var tot_filecount =  doc_filecount + notes_filecount;
      var tot_filecount1 = doc_filecount1;

      $('#policyList .subcateg_div'+index+index1).closest('.subfirst_div').find('.bind_sub_catg_count'+index+index1).html('');
      if(tot_filecount1 != '0'){
        $('#policyList .subcateg_div'+index+index1).closest('.subfirst_div').find('.bind_sub_catg_count'+index+index1).html('<span class="badge badge-primary mr-1">'+tot_filecount1+'</span>');
      }
    });

  });

  $('.loader').hide();
}

$(document).on('click','.uploadTab',function(){
  getmaincategory();
  uploadBtnReset();
});

$(document).on('click','.uploadCancelBtn',function(){
    uploadBtnReset();
});
function uploadBtnReset(){
    $('.dropzone').text('');
    $('#docselect option:first').prop('selected',true);
    $('.addmaincategory').val('');
    $('.upSubCat option:first').prop('selected',true);
    $('.addsubcategory').val('');
    $('.upFileName').val('');
    $('.colorPickText').val('');
    $('#upSplit, #upLiv, #upNo').prop('checked',false);
    $('input[type="checkbox"]#upNo').prop('checked',false);
    // $('.colorPick').val('#ffffff');
    $('.color-holder').css('background-color','');
    $('.colorEmptyDiv').show();
    $('.colorPick').val('');
}

$(document).on('click','.addmaincategory_btn',function(){
  $(this).attr('disabled',true);
  var addmaincategory = $('.addmaincategory').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();

  if ($.trim(addmaincategory) == '') {
    new PNotify({ title: 'Error', text: 'Please Fill the Field', delay: 1500, type: 'error' });
    $('.addmaincategory_btn').removeAttr('disabled');
  }else{
    $.ajax({
      url: laravel_url+"/addmaincategory",
      type:'post',
      data:{addmaincategory:addmaincategory,accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            getmaincategory();
            $('.bind_maincategory_new').html('');
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          $('.addmaincategory_btn').removeAttr('disabled');
      }
    });

  }
});


$(document).on('click','.addsubcategory_btn',function(){
  $(this).attr('disabled',true);
  var maincateg_val = $('.indi_docselect').val();
  var addsubcategory = $('.addsubcategory').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();

  if ($.trim(addsubcategory) == '') {
    new PNotify({ title: 'Error', text: 'Please Fill the Field', delay: 1500, type: 'error' });
    $('.addsubcategory_btn').removeAttr('disabled');
  }else{
    $.ajax({
      url: laravel_url+"/addsubcategory",
      type:'post',
      data:{maincateg_val:maincateg_val,addsubcategory:addsubcategory,accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            $('.bind_subcategory_new').html('');
            $('.bind_subcategory_div').hide();
            getsubcategory(maincateg_val);
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          $('.addsubcategory_btn').removeAttr('disabled');
      }
    });
  }
  
});



function getmain_subcategory(){
  // $('.loader').show();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var dateversioning = Date.now();

  $.ajax({
    url: laravel_url+"/getmain_subcategory?"+dateversioning,
    type:'get',
    data:{accid:accid},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
      $('.bind_getmain_subcategory').html('');
      $('.bind_getmain_subcategory').html(response);
      // $('.loader').hide()
      menu_permission();
    }
  });
}

function addmain_category(){
  $('.newCateAdd').attr('disabled',true);
  var maincatory = $('.newCateTxt').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();

  if ($.trim(maincatory) == '') {
    new PNotify({ title: 'Error', text: 'Please Fill the Field', delay: 1500, type: 'error' });
    $('.newCateAdd').removeAttr('disabled');
  }else{

    $.ajax({
      url: laravel_url+"/addmaincategory",
      type:'post',
      data:{addmaincategory:maincatory,accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          if (obj.status == 'ok') {
            getmain_subcategory();
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });

            setTimeout(function(){ 
                var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
                getpolicycategory(tabvalue);
            }, 1000);

            $('.newCateTxt').val('');
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          $('.newCateAdd').removeAttr('disabled');
          $('.collapseBtn').click();
      }
    });
  }
  $('.newCateTxt').val('');
  $('.newCateDiv').slideUp('slow');
  $('.cateAddSel option:first').prop('selected', true);
}


$(document).on('click','.newSubCateAdd',function(){
  $('.loader').show();
  $(this).attr('disabled',true);
  var maincateg_val = $(this).closest('.newSubCateDiv').find('#docselect_policy').val();
  var addsubcategory = $('.newSubCateTxt').val();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();

  if ($.trim(addsubcategory) == '') {
    new PNotify({ title: 'Error', text: 'Please Fill the Field', delay: 1500, type: 'error' });
    $('.newSubCateAdd').removeAttr('disabled');
    $('.loader').hide();
  }else{
    $.ajax({
      url: laravel_url+"/addsubcategory",
      type:'post',
      data:{maincateg_val:maincateg_val,addsubcategory:addsubcategory,accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          if (obj.status == 'ok') {
            getmain_subcategory();
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            $('.newSubCateTxt').val('');
            
            setTimeout(function(){ 
                var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
                getpolicycategory(tabvalue);
            }, 1000);

          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          $('.newSubCateAdd').removeAttr('disabled');
          $('.collapseBtn').click();
          $('.loader').hide();
      }
    });
  }
  $('.newSubCateTxt').val('');
  $('.newSubCateDiv').slideUp('slow');
  $('.cateAddSel option:first').prop('selected', true);
  $('#docselect_policy option:first').prop('selected', true);
  
});


function alladdnotes_coverfn(){
  getmain_subcategory();
  resetnoteform();
  $('.add_note_section .new_notesclosebtn').hide();
}



$(document).on('click','.docfile',function(){
  $('.loader').show();
  if($(this).hasClass("taggedfiles") || $(this).hasClass("taggedfiles_attach")){
    $('.filehiddenvalue').addClass("thistagged");
  }else{
    $('.filehiddenvalue').removeClass("thistagged");
  }

  $('.viewerMaxICon').css('display','none');
  $('.fileReassign').show();
  var docid = $(this).data('docid');
  var Eattch_id = $(this).data('eattch_id');
  $('.filehiddenvalue').val('');
 
  setTimeout(function(){
     $('.filehiddenvalue').val(docid);
  },100);
 
  $('.filehiddenvalue').addClass("thisdoc");
  var filetype = $(this).attr('data-filetype');
   if(filetype == "document"){
    $('.filehiddenvalue').removeClass("mail");
    $('.filehiddenvalue').addClass(filetype);
   }else{
    $('.filehiddenvalue').removeClass("document");
    $('.filehiddenvalue').addClass(filetype);
   }
  
  if(!Eattch_id){
    getdocfiledetails(docid);
    var cattype = $(this).data('cattype');
    getmainsubcate(cattype);
  }else{
    $('.filehiddenvalue').addClass("Is_attach");
    setTimeout(function(){
      $('.filehiddenvalue').val(Eattch_id);
    },500);
    
    var Is_attach = "yes";
    var cattype = $(this).data('categid');
    
    getfiledetails(Eattch_id,Is_attach);
    getmainsubcate(cattype);
  }
  
  reset_policynotes();
  $('.sideFilesDiv').show();
  $('.sideNotesDiv').hide();

  if($(this).hasClass("eattch")){
     $('.fileReassign').hide();
     $('.sDocName').attr("disabled",true);
     $('.sDocType').attr("disabled",true);
     $('.sDocTag').attr("disabled",true);
     $('.sDocTagClr').css("pointer-events","none");
     $('.savedocumentfilename').addClass("disabled");
     $('.savedocumentfilename').css("pointer-events","none");
     $('.resetfilevalues').addClass("disabled");  
     $('.resetfilevalues').css("pointer-events","none"); 
     
  }else{
     $('.fileReassign').show();
     $('.sDocName').removeAttr("disabled");
     $('.sDocType').removeAttr("disabled");
     $('.sDocTag').removeAttr("disabled");
     $('.sDocTagClr').removeAttr("style");
     $('.savedocumentfilename').removeClass("disabled");
     $('.resetfilevalues').removeClass("disabled");
     $('.savedocumentfilename').removeAttr("style");
     $('.resetfilevalues').removeAttr("style");
  }

});




$(document).on('click','.itsfile',function(){
  $('.loader').show();
  if($(this).hasClass("taggedfiles") || $(this).hasClass("taggedfiles_attach") ){
    $('.filehiddenvalue').addClass("thistagged");
  }else{
    $('.filehiddenvalue').removeClass("thistagged");
  }
  var filetype = $(this).attr('data-filetype');
   if(filetype == "document"){
    $('.filehiddenvalue').removeClass("mail");
    $('.filehiddenvalue').addClass(filetype);
   }else{
    $('.filehiddenvalue').removeClass("document");
    $('.filehiddenvalue').addClass(filetype);
   }
  $('.viewerMaxICon').css('display','none');
  $('.fileReassign').show();
  var emailid = $(this).data('emailid');
  var categoryid = $(this).data('categoryid');
  var cattype = $(this).data('cattype');
  if(filetype == "mail"){
    getmainsubcate(categoryid);
  }
  
  $('.filehiddenvalue').val('');
  $('.filehiddenvalue').val(emailid);
  getfiledetails(emailid);
  reset_policynotes();
  $('.sideFilesDiv').show();
  $('.sideNotesDiv').hide();
  setTimeout(function(){
    if(categoryid == "undefined"){
      $('.filehiddenvalue1').val("");
      $('.filehiddenvalue1').val(cattype);
    }else{
      $('.filehiddenvalue1').val("");
      $('.filehiddenvalue1').val(categoryid);
    }
    if(cattype){
      $('.filehiddenvalue1').val("");
      $('.filehiddenvalue1').val(cattype);
    }
  },1000);
    
  
 if($(this).hasClass("eattch")){
     $('.fileReassign').hide();
     $('.sDocName').attr("disabled",true);
     $('.sDocType').attr("disabled",true);
     $('.sDocTag').attr("disabled",true);
     $('.sDocTagClr').css("pointer-events","none");
     $('.savedocumentfilename').addClass("disabled");
     $('.savedocumentfilename').css("pointer-events","none");
     $('.resetfilevalues').addClass("disabled");  
     $('.resetfilevalues').css("pointer-events","none");  
  }else{
     $('.fileReassign').show();
     $('.sDocName').removeAttr("disabled");
     $('.sDocType').removeAttr("disabled");
     $('.sDocTag').removeAttr("disabled");
     $('.sDocTagClr').removeAttr("style");
     $('.savedocumentfilename').removeClass("disabled");
     $('.resetfilevalues').removeClass("disabled");
     $('.savedocumentfilename').removeAttr("style");
     $('.resetfilevalues').removeAttr("style");
  }
});


$(document).on('click','.resetfilevalues',function(){

  $('.fileReassign').show();
  var emailid = $(this).data('emailid');
  $('.filehiddenvalue').val('');
  $('.filehiddenvalue').val(emailid);
  getfiledetails(emailid);
  reset_policynotes();
  $('.sideFilesDiv').show();
  $('.sideNotesDiv').hide();
  
});

function getdocfiledetails(docid){

    $.ajax({
      url: laravel_url+"/getdocfiledetails",
      type:'get',
      cache: false,
      data:{docid:docid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        var obj = jQuery.parseJSON(response);
        
        /*if(obj[0].living_doc_filename){
          //$('#viewer').html(''); 
        }*/
       
        var allowextension = ["rtf", "bat", "wav", "vb", "mdb", "xps", "vbs", "bmp", "ods", "tif", "tiff", "aac", "aiff","au","m4a","avi","mka" ,"wmf","webm","flv","wmv","mid","mov","mpg","vob","wma","txt","ppt","pptx","pps","pptm","tar","rar","sql","aiff","gif","mp3","mp4","zip" ,"doc","docx","xls","xlsx","csv","docm","xlsm","DOC","DOCX","XLS","XLSX","CSV","DOCM","XLSM"];
        var editable_allowextension = [ "doc", "docx", "docm", "xls", "xlsx", "xlsm", "csv"];
        if(jQuery.inArray(obj[0].extension, allowextension) !== -1){

        $('#viewer').html('');
        $('#viewer').html("<div id='alert_msg'> <h2> No preview available for this type of file. Please download </h2> </div>");

        if(jQuery.inArray(obj[0].extension, editable_allowextension) !== -1){
            $('#viewer').html('');
        }

        }
        reset_filedetails();
      
        if (obj[0].drag_drop_filename) {
          $('.sDocName').val(obj[0].drag_drop_filename);
          $('.bind_sideheader').html(obj[0].drag_drop_filename);
        }else{

          if (obj[0].extension == 'msg' || obj[0].extension == 'eml') { 
              if (obj[0].subject_email) {
                $('.sDocName').val(obj[0].subject_email);
                $('.bind_sideheader').html(obj[0].subject_email);
              } else {
                if (obj[0].drag_drop_filename == null || obj[0].drag_drop_filename == "" ) {
                     $('.sDocName').val(obj[0].attach_name);
                     $('.bind_sideheader').html(obj[0].attach_name);
              } else{
                    $('.sDocName').val(obj[0].drag_drop_filename);
                    $('.bind_sideheader').html(obj[0].drag_drop_filename);
              }
             
            }
            
          }else{
            if (obj[0].dragname != "") {
                   
              var drag_filename = obj[0].dragname;
              $('.sDocName').val(drag_filename);
              $('.bind_sideheader').html(drag_filename);
            }else{
    
              var drag_filename1 = obj[0].doc_name;
              var file_name1 = drag_filename1.substr(0, drag_filename1.lastIndexOf('.'));
              $('.sDocName').val(file_name1);
              $('.bind_sideheader').html(file_name1);
            }

           
          }
          
        }
        
        $('.sDocType').val(obj[0].dragtype);
        // $('#sDocDateTxt').val(obj[0].inserted_date_time);
        // $('#sDocDateTxt').val(formatedatepicker(obj[0].inserted_date_time));

        if (obj[0].extension == 'msg' || obj[0].extension == 'eml') {
           $('#sDocDateTxt').val(formatedate(obj[0].date_email));
          }else{
            $('#sDocDateTxt').val(formatedate(obj[0].created_at));
          }


        
        $('.sDocTag').val(obj[0].drag_drop_tagname);

        $('.sDocTagClr').val('');
        $('.sDocTagClr').css('background-color', '');
        // $('.colorEmptyDiv').hide();

        $('.sDocTagClr').val(obj[0].drag_drop_tagcolor);
        $('.sDocTagClr').css('background-color', obj[0].drag_drop_tagcolor);

        if(obj[0].drag_drop_tagcolor){
          $('.colorEmptyDiv').hide();
        }else{
          $('.colorEmptyDiv').show();
        }
        
        $('.resetfilevalues').removeAttr('disabled');
        $('.savedocumentfilename').removeAttr('disabled');

        $('.resetfilevalues').attr('data-emailid',docid);
        $('.savedocumentfilename').attr('data-emailid',docid);

        $('.filehiddenvalue1').val('');
        $('.filehiddenvalue1').val(docid);  

        if (obj[0].sub_category) {
          $('.filehiddenvalue1').val(obj[0].sub_category);  
        }else{
          $('.filehiddenvalue1').val(obj[0].assigned_stage);  
        }
      
      },
      complete:function(response){
        // getpolicycategory_count();
        $('.loader').hide();
        menu_permission();
      }
    });
}

function getfiledetails(emailid,Is_attach=null){
   
    $.ajax({
      url: laravel_url+"/getfiledetails",
      type:'get',
      cache: false,
      data:{emailid:emailid,Is_attach:Is_attach},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        var obj = jQuery.parseJSON(response);
        
        /*if(obj[0].living_doc_filename){
          //$('#viewer').html(''); 
        }*/
     
      var allowextension = ["rtf", "bat", "wav", "vb", "mdb", "xps", "vbs", "bmp", "ods", "tif", "tiff", "aac", "aiff","au","m4a","avi","mka" ,"wmf","webm","flv","wmv","mid","mov","mpg","vob","wma","txt","ppt","pptx","pps","pptm","tar","rar","sql","aiff","gif","mp3","mp4","zip" ,"doc","docx","xls","xlsx","csv","docm","xlsm","DOC","DOCX","XLS","XLSX","CSV","DOCM","XLSM"];
      var editable_allowextension = [ "doc", "docx", "docm", "xls", "xlsx", "xlsm", "csv"];
        if(Is_attach){
         
         if(jQuery.inArray(obj[0].extension, allowextension) !== -1){
          $('#viewer').html('');
          $('#viewer').html("<div id='alert_msg'> <h2> No preview available for this type of file. Please download </h2></div>");
          
          }
          if(jQuery.inArray(obj[0].extension, editable_allowextension) !== -1){
            $('#viewer').html('');
          }
        }

        reset_filedetails();

        if (obj[0].drag_drop_filename) {
          $('.sDocName').val(obj[0].drag_drop_filename);
          $('.bind_sideheader').html(obj[0].drag_drop_filename);
        }else{

          if (obj[0].extension == 'msg' || obj[0].extension == 'eml' || obj[0].extension == 'email') { //v5 update email
           if (obj[0].subject_email) {
                $('.sDocName').val(obj[0].subject_email);
                $('.bind_sideheader').html(obj[0].subject_email);
              } else {
                if (obj[0].drag_drop_filename == null  || obj[0].drag_drop_filename == "") {
                     $('.sDocName').val(obj[0].attach_name);
                     $('.bind_sideheader').html(obj[0].attach_name);
              } else{
                    $('.sDocName').val(obj[0].drag_drop_filename);
                    $('.bind_sideheader').html(obj[0].drag_drop_filename);
              }
             
            }
            
          }else{
            var drag_filename = obj[0].attach_name;
            var file_name = drag_filename.substr(0, drag_filename.lastIndexOf('.'));
            $('.sDocName').val(file_name);
            $('.bind_sideheader').html(file_name);
          }
          
        }
       
        $('.sDocType').val(obj[0].dragtype);
        // $('#sDocDateTxt').val(obj[0].inserted_date_time);
        // $('#sDocDateTxt').val(formatedatepicker(obj[0].inserted_date_time));

        if (obj[0].extension == 'msg' || obj[0].extension == 'eml') {
           $('#sDocDateTxt').val(formatedate(obj[0].date_email));
          }else{
            $('#sDocDateTxt').val(formatedate(obj[0].inserted_date_time));
          }


        
        $('.sDocTag').val(obj[0].drag_drop_tagname);

        $('.sDocTagClr').val('');
        $('.sDocTagClr').css('background-color', '');
        // $('.colorEmptyDiv').hide();

        $('.sDocTagClr').val(obj[0].drag_drop_tagcolor);
        $('.sDocTagClr').css('background-color', obj[0].drag_drop_tagcolor);

        if(obj[0].drag_drop_tagcolor){
          $('.colorEmptyDiv').hide();
        }else{
          $('.colorEmptyDiv').show();
        }
        
        $('.resetfilevalues').removeAttr('disabled');
        $('.savedocumentfilename').removeAttr('disabled');

        $('.resetfilevalues').attr('data-emailid',emailid);
        $('.savedocumentfilename').attr('data-emailid',emailid);

        $('.filehiddenvalue1').val('');
        $('.filehiddenvalue1').val(emailid);  

        if (obj[0].sub_category) {
          $('.filehiddenvalue1').val(obj[0].sub_category);  
        }else{
          $('.filehiddenvalue1').val(obj[0].assigned_stage);  
        }

      },
      complete:function(response){
        // getpolicycategory_count();
        $('.loader').hide();
        menu_permission();
      }
    });
}

function reset_filedetails(){
  $('.sDocName').val('');
  $('.bind_sideheader').html('');
  $('.sDocType').val('');
  $('#sDocDateTxt').val('');
  $('.sDocTag').val('');
  $('.sDocTagClr').val('');
  $('.resetfilevalues').attr('data-emailid','');
  $('.savedocumentfilename').attr('data-emailid','');

  $('.resetfilevalues').attr('disabled','disabled');
  $('.savedocumentfilename').attr('disabled','disabled');
}

$(document).on('click','.savedocumentfilename',function(){

  // var emailid = $(this).data('emailid');
  if ( $( '.filehiddenvalue' ).hasClass( "thisdoc" ) ) {
    var file_type = "1";
    if ( $( '.filehiddenvalue' ).hasClass( "Is_attach" ) ) {
      var Is_attach = "true";
    }
  } else{
    var file_type = "0";
  }
  if ( $( '.filehiddenvalue' ).hasClass( "mail" ) ) 
  {
   var is_file_type = "mail";
  } else if( $( '.filehiddenvalue' ).hasClass( "document" ) )
  { 
  var is_file_type = "document";
  }
  var emailid = $('.filehiddenvalue').val();
  var sDocName = $('.sDocName').val();
  var sDocType = $('.sDocType').val();
  var sDocTag = $('.sDocTag').val();
  var sDocTagClr = $('.sDocTagClr').val();
  var main_cate = $('.cate_id').val();
  var sub_cate = $('.category_status').val();

  if (sDocName == '') {
    new PNotify({ title: 'Error', text: 'File Name Could not be empty', delay: 1500, type: 'error' });
  }else{

    $.ajax({
      url: laravel_url+"/savedocumentfilename",
      type:'post',
      cache:false,
      data:{emailid:emailid, sDocName:sDocName, sDocType:sDocType, sDocTag:sDocTag, sDocTagClr:sDocTagClr, file_type:file_type, Is_attach:Is_attach, is_file_type:is_file_type },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        var obj = jQuery.parseJSON(response);
        if($('.bind_taggedpagelist').find('.taggedfiles').hasClass("active")){
                $('.TaggedPagesTxtTab').addClass("tagactive");
                // $('.tagactive').click();
              }else{
                 $('.TaggedPagesTxtTab').removeClass("tagactive");
              }
          $('.filehiddenvalue').removeClass("thisdoc");
          $('.filehiddenvalue').removeClass("Is_attach");
          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            getfiledetails(emailid);
            
            setTimeout(function(){ 
                var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
                getpolicycategory(tabvalue);
            }, 1000);

            gettaggedpage_lists();
            allpolicy_coverfn();

            setTimeout(function(){
            
              if (is_file_type == 'document'){
               
                if ( $( '.filehiddenvalue' ).hasClass( "thistagged" ) ) {
                 
                  $(".TaggedPagesTxtTab").click();
                  $(".TaggedPagesTabDiv").find('[data-docid="'+emailid+'"]').addClass("active show").click(); 
                  $(".TaggedPagesTabDiv").find('[data-emailid="'+emailid+'"]').addClass("active show").click(); 
                }else{
                  
                   if(sub_cate == '0'){
                    
                      $(".main"+main_cate).trigger("click");
                      $(".main"+main_cate).children('i').addClass('fa-chevron-down text-warning');
                      
                      setTimeout(function(){
                        $('[data-docid="'+emailid+'"]').addClass("active show").click();
                        $('[data-Eattch_id="'+emailid+'"]').addClass("active show").click();
                      },500);
                      
                    }else{
                      $(".main"+sub_cate).trigger("click");
                      $(".sub"+main_cate).trigger("click");
                      $(".sub"+main_cate).children('i').addClass('fa-chevron-down text-warning');
                      // $('[data-cattype="'+categoryid+'"]').click();
                      // $('[data-docid="'+emailid+'"]').addClass("active show");
                      setTimeout(function(){
                        $('[data-docid="'+emailid+'"]').addClass("active show").click();
                        $('[data-eattch_id="'+emailid+'"]').addClass("active show").click();

                      },500); 
                    }

                }
                   
              } else {

                $('.itsfile').each(function(){
                  var getemail = $(this).attr('data-emailid');

                  if(getemail == emailid){
                    if( $('.TaggedPagesTxtTab').hasClass("tagactive")){
                    $('.tagactive').click();
                    $('.bind_taggedpagelist .itsfile').each(function(){
                      var tagfile = $(this).attr('data-emailid');
                        if(tagfile == emailid){
                          $(this).addClass("active show").click();
                        //$(".TaggedPagesTabDiv").find('[data-docid="'+emailid+'"]').addClass("active show").click(); 

                        }else{
                          $('.bind_sideheader').html("");
                        }
                    });
                      return false;
                   } else{

                      $(this).parents().closest(".mainfirst_div").find(".maincateg_div").click();
                      $(this).parents().closest(".subfirst_div").find(".subcateg_div").click();
                      $(this).addClass("active show").click();
                    }
                  }
                });

              }
          

            },1800);

          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }

      }
    });

  }

});

// append notes in category and sub category


// $(document).on('click','.maincateg_div',function(){
//    var dateversioning = Date.now();
//   $('.loader').show();
//   var catgid = $(this).data('maincategoryid');
//   var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
//     // setTimeout(function(){
//     //     var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
//     //     getpolicycategory(tabvalue);
//     // }, 1000);
//   var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
//   $.ajax({
//       url: laravel_url+"/getnotes_policyfile?"+dateversioning,
//       type:'get',
//       data:{catgid:catgid, accid:accid, tabvalue:tabvalue},
//       headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//       },
//       success:function(response){
//         if (response) {
//           var obj = jQuery.parseJSON(response);
//           $('.bind_maincateg_notes'+catgid).html('');
//           var table = '';
//           $.each(obj, function(key,value) {
//             table='<div class="d-flex my-1 ml-2">';
//             // table+='<input type="checkbox" class="policyCheck mt-2 mr-1" value="">';
//             table+='<a class="list-group-item list-group-item-action poList notesfile" data-cattype="'+value.type+'" data-notesid="'+value.id+'" data-toggle="list" href="javascript:;"> '+value.blob_decoded+
//             ' <span class="taggedDate">( '+formatedate(value.createddate)+' )</span> </a>';
//             table+='</div>';
//             // console.log(formatedate(value.createddate));
//             $('.bind_maincateg_notes'+catgid).append(table);
//           });
//         }else{
//           $('.bind_maincateg_notes'+catgid).html('');
//           $('.loader').hide();
//         }
//         $('.loader').hide();
//       }
//     });
// });



function getallmaindivnotes(){
  // alert();
  var dateversioning = Date.now();
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');

    $.ajax({
      url: laravel_url+"/getnotes_policyfile?"+dateversioning,
      type:'get',
      data:{accid:accid, tabvalue:tabvalue},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        
        if (response) {
          var obj = jQuery.parseJSON(response);

          $( ".maincateg_div" ).each(function() {
            var catgid = $(this).data('maincategoryid');
            $('.bind_maincateg_notes'+catgid).html('');
            var table = '';
            $.each(obj, function(key,value) {

              if (catgid == value.type) {
                  table='<div class="d-flex notefile_style my-1">';
                  table+='<input type="checkbox" class="policyCheck_notes mt-2 mr-1" value="'+value.id+'">';

                  if ($.trim(value.subjectname_decoded) != '') {
                    var notes_vals = value.subjectname_decoded;
                  }else{
                    var notes_vals = value.blob_decoded;
                  }

                  table+='<a class="list-group-item list-group-item-action poList notesfile" data-cattype="'+value.type+'" data-notesid="'+value.id+'" data-toggle="list" href="javascript:;"> '+notes_vals+
                  ' <span class="taggedDate">( '+formatedate(value.createddate)+' )</span> </a>';
                  table+='</div>';

                  $('.bind_maincateg_notes'+catgid).append(table);
              }

          });

        });

          $( ".subcateg_div" ).each(function() {
            var catgid = $(this).data('subcategoryid');

            $('.bind_subcateg_notes'+catgid).html('');
            var table = '';

            $.each(obj, function(key1,value1) {

              if (catgid == value1.type) {

                if ($.trim(value1.subjectname_decoded) != '') {
                  var notes_vals = value1.subjectname_decoded;
                }else{
                  var notes_vals = value1.blob_decoded;
                }
                  
                  table='<div class="d-flex my-1">';
                  table+='<input type="checkbox" class="policyCheck_notes mt-2 mr-1" value="'+value1.id+'">';
                  table+='<a class="list-group-item list-group-item-action poList notesfile" data-cattype="'+value1.type+'" data-notesid="'+value1.id+'" data-toggle="list" href="javascript:;"> '+notes_vals+
                  ' <span class="taggedDate">( '+formatedate(value1.createddate)+' )</span> </a>';
                  table+='</div>';

                  $('.bind_subcateg_notes'+catgid).append(table);
              }

            });

          });
           
        }
        // else{
        //   $('.bind_maincateg_notes'+catgid).html('');
        // }
        
      },
      complete:function(response){
        // getpolicycategory_count();
        $('.loader').hide();
      }
    });

}



// $(document).on('click','.subcateg_div',function(){
//   var dateversioning = Date.now();
//   $('.loader').show();
//   var subcatgid = $(this).data('subcategoryid');
//   var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
//   // setTimeout(function(){ 
//     //     var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
//     //     getpolicycategory(tabvalue);
//     // }, 1000);
//   var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');

//   $.ajax({
//       url: laravel_url+"/getnotes_policyfile?"+dateversioning,
//       type:'get',
//       data:{catgid:subcatgid, accid:accid, tabvalue:tabvalue},
//       headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//       },
//       success:function(response){

//         if (response) {
//           var obj = jQuery.parseJSON(response);
//           $('.bind_subcateg_notes'+subcatgid).html('');
//           var table = '';
          
//           $.each(obj, function(key,value) {

//             table='<div class="d-flex my-1 ml-2">';
//             table+='<input type="checkbox" class="policyCheck mt-2 mr-1" value="">';
//             table+='<a class="list-group-item list-group-item-action poList notesfile" data-cattype="'+value.type+'" data-notesid="'+value.id+'" data-toggle="list" href="javascript:;"> '+value.blob_decoded+
//             ' <span class="taggedDate">( '+formatedate(value.createddate)+' )</span> </a>';
//             table+='</div>';

//             $('.bind_subcateg_notes'+subcatgid).append(table);
//           });
//         }else{
//           $('.bind_subcateg_notes'+subcatgid).html('');
//           $('.loader').hide();
//         }
         

//         $('.loader').hide();
          
//       }
//     });
  
// });


$(document).on('click','.notesfile , .resetNotevalues',function(){

  $('.loader').show();
  $('#viewer').html('');
  $('.fileReassign').hide();
  var noteid = $(this).data('notesid');
  var cattype = $(this).data('cattype');
  getmainsubcate(cattype);
    $( ".notesfile" ).each(function( index ) {
      var note = $(this).data('notesid');
      if(noteid == note){
        $(this).addClass("active show");
      }
    });

  $('.filehiddenvalue').val('');
  policy_notes(noteid);
  reset_filedetails();

  $('.oldcategval_hidden').val('');
  $('.oldcategval_hidden').val($(this).data('cattype'));

  $('.sideFilesDiv').hide();
  $('.sideNotesDiv').show();
  // getmainsubcate(cattype);
  // $('.loader').hide(); 
});

function getmainsubcate(categoryid){
$.ajax({
    url: laravel_url+"/category_details",
    type:'post',
    data:{categoryid:categoryid},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
         //alert("response "+response);
         // $('.sideNotesDiv_hidden').append(response);
         $('.sideNotesDiv_hidden').html('');
         $('.sideNotesDiv_hidden').html(response);
         $('.sideFileDiv_hidden').html('');
         $('.sideFileDiv_hidden').html(response);
         $('.fileReassignSave').attr('disabled',false);
    }
  });

}

function policy_notes(noteid){
  $.ajax({
    url: laravel_url+"/getspecific_notes",
    type:'post',
    data:{noteid:noteid},
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    success:function(response){
        var obj = jQuery.parseJSON(response);

        reset_policynotes();

        $('.sNoteName').val(obj.subjectname);
        $('.sNoteType').val(obj.note_type_text);
        // $('#sNoteDateTxt').val(obj.createddate);
        $('#sNoteDateTxt').val(formatedatepicker(obj.createddate));
        $('#sideAdNoteDes .ql-editor').html(obj.content);
        
        $('#viewer').html('');
        $('#viewer').html(obj.content);

        $('.savedocumentNote').removeAttr('disabled');
        $('.resetNotevalues').removeAttr('disabled');

        $('.savedocumentNote').removeAttr('data-notesid');
        $('.resetNotevalues').removeAttr('data-notesid');

        $('.savedocumentNote').attr('data-notesid',obj.id);
        $('.resetNotevalues').attr('data-notesid',obj.id);

        $('.policycategorybind .bind_getmain_subcategory #select1').val(obj.type);    
        $('.loader').hide(); 
    }
  });
}

function reset_policynotes(){
  $('.sNoteName').val('');
  $('.sNoteType').val('');
  $('#sNoteDateTxt').val('');
  $('#sideAdNoteDes .ql-editor').html('');
  
  $('.savedocumentNote').attr('data-notesid','');
  $('.resetNotevalues').attr('data-notesid','');

  $('.savedocumentNote').removeAttr('data-notesid');
  $('.resetNotevalues').removeAttr('data-notesid');

  $('.savedocumentNote').attr('disabled','disabled');
  $('.resetNotevalues').attr('disabled','disabled');
}

// $( ".selectcategory" ).change(function() {
  $(document).on('change','.selectcategory',function(){
    var categoryid = $(this).val();
    getmainsubcate(categoryid);
    $('.fileReassignSave').attr('disabled',true);
  });
  
$(document).on('click','.savedocumentNote',function(){
   $('.loader').show();
  // var noteid = $(this).data('notesid');
  var noteid = $(this).attr('data-notesid');
  var sNoteName = $('.sNoteName').val();
  var sNoteType = $('.sNoteType').val();
  var sNoteDateTxt = $('#sNoteDateTxt').val();
  var sideAdNoteDes = $('#sideAdNoteDes .ql-editor').html();
  var username = localStorage.getItem('username');
  var userid = localStorage.getItem('userid');
 
  var categoryid = $('.policycategorybind .bind_getmain_subcategory #select1').val();
  
        
  var main_categoryid = $('.cate_id').val();
  var sub_categoryid = $('.category_status').val();

  var desciptionval = $('#sideAdNoteDes').text();

  if (desciptionval != '') {

    $.ajax({
      url: laravel_url+"/policy_updatenotes",
      type:'post',
      data:{noteid:noteid, sNoteName:sNoteName, sNoteType:sNoteType, sideAdNoteDes:sideAdNoteDes, username:username, userid:userid, categoryid:categoryid, sNoteDateTxt:sNoteDateTxt },
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
        var obj = jQuery.parseJSON(response);
          var main_id = categoryid-1;
          var tri_note = main_categoryid-1 ;
          var sub_note = sub_categoryid-1 ;

            $('.downTab').next('.card-body').slideUp();
            $('.downTab').children('i').removeClass('fa-chevron-down text-warning');
            // $(".maincateg_div"+main_id).trigger("click");
          // }
          allpolicy_coverfn();
          setTimeout(function(){
            if(sub_categoryid == '0'){
              
              $(".main"+categoryid).trigger("click");
              $(".main"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              // $('[data-cattype="'+categoryid+'"]').click();
               $('[data-notesid="'+noteid+'"]').addClass("active show").click(); 
            }else{
             
              $(".main"+sub_categoryid).trigger("click");
              $(".sub"+categoryid).trigger("click");
              $(".sub"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              // $('[data-cattype="'+categoryid+'"]').click();
               $('[data-notesid="'+noteid+'"]').addClass("active show").click(); 
            }
            if(main_categoryid == undefined){
              $(".maincateg_div"+main_id).trigger("click");
              $(".maincateg_div"+main_id).children('i').addClass('fa-chevron-down text-warning');
            }
            
            // setactivenotes(noteid)

          },1800);

          if (obj.status == 'ok') {
            $('#viewer').html('');
            $('#viewer').html(sideAdNoteDes);
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          $('#policyList :checkbox').prop('checked',false);
          $('.archiveBtn').hide();
      },
      complete:function(){
        getallmaindivnotes();   
           
      }
    });
    
  }else{
    new PNotify({ title: 'Error', text: 'Fields should not be Empty', delay: 1500, type: 'error' });
  }

  

});


function setactivenotes(noteid){
  setTimeout(function(){
    $('[data-notesid="'+noteid+'"]').addClass("active show").click(); 
  },1500);
}

$(document).on('click','.fileReassignSave',function(){
  
  if ( $( '.filehiddenvalue' ).hasClass( "thisdoc" ) ) {
    var file_type = "1";
  } else{
    var file_type = "0";
  }
  if ( $( '.filehiddenvalue' ).hasClass( "mail" ) ) 
  {
   var is_file_type = "mail";
  } else if( $( '.filehiddenvalue' ).hasClass( "document" ) )
  { 
  var is_file_type = "document";
  }
  var primaryid = $('.filehiddenvalue').val();
  var categoryid =  $('#fileReassignModal').find('.bind_getmain_subcategory #select1').val();
      
  var main_categoryid = $('.cate_id').val();
  var sub_categoryid = $('.category_status').val();

    $.ajax({
      url: laravel_url+"/fileReassignSave",
      type:'post',
      data:{primaryid:primaryid, categoryid:categoryid, file_type:file_type, is_file_type:is_file_type},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          var main_id = categoryid-1;
          var tri_note = main_categoryid-1 ;
          var sub_note = sub_categoryid-1 ;
          $('.filehiddenvalue').removeClass("thisdoc");
          
          setTimeout(function(){
         if ( $( '.filehiddenvalue' ).hasClass( "thistagged" ) ) {
           
              $(".TaggedPagesTxtTab").click();
              if(is_file_type == "document"){
                $(".TaggedPagesTabDiv").find('[data-docid="'+primaryid+'"]').addClass("active show kabi").click(); 
              }else{
                $(".TaggedPagesTabDiv").find('[data-emailid="'+primaryid+'"]').addClass("active show kavi").click(); 
               }
            } 
          else {
           
          if(sub_categoryid == '0'){
             
              $(".main"+categoryid).trigger("click");
              $(".main"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              $('[data-docid="'+primaryid+'"]').addClass("active show").click();
              $('[data-emailid="'+primaryid+'"]').addClass("active show").click();

          }else{
              $(".main"+sub_categoryid).trigger("click");
              $(".sub"+categoryid).trigger("click");
              $(".sub"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              $('[data-docid="'+primaryid+'"]').addClass("active show").click();
              $('[data-emailid="'+primaryid+'"]').addClass("active show").click();
          }
        }
          if(main_categoryid == undefined){
          $(".maincateg_div"+main_id).trigger("click");
          }
          // if(file_type == 1){
          //   $('[data-docid="'+primaryid+'"]').addClass("active show").click(); 
          // }else{
          //   setactiveemail(primaryid)
          // }
          
          
          },1800);

          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
            allpolicy_coverfn();
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }
          // getpolicycategory();

          // setTimeout(function(){ 
          //     var tabvalue = $('.acc_details_pills_tab').find('.active').data('tabvalue');
          //     getpolicycategory(tabvalue);
          // }, 1000);

          $("#fileReassignModal .close").click();

      }
    });

});
function setactiveemail(primaryid){
  setTimeout(function(){
    $('[data-emailid="'+primaryid+'"]').addClass("active show").click(); 
  },1500);
}

$(document).on('click','.fileReassign',function(){

  var categid =  $('.filehiddenvalue1').val();
  $('.bind_getmain_subcategory #select1').val(categid);  
  $('.fileReassignSave').attr('disabled',true);
});


$(document).on('blur','.poListName',function(){

  
  // var accid = $('.session_hide_tab').find('.active').find('.accountid').val();
  var categoryname = $(this).val();
  // var categoryid = $(this).data('categoryid');
  var categoryid = $(this).data('categid');

  $('.viewerMaxICon').hide();

  $('.loader').show();

  if ($.trim(categoryname) == '') {
    new PNotify({ title: 'Error', text: 'Category Name Empty!', delay: 1500, type: 'error' });

    $.ajax({
      url: laravel_url+"/getcategoryname",
      type:'post',
      data:{categoryid:categoryid, accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          $('[data-categid="'+categoryid+'"]').val(response)
      },
      complete:function(response){
        $('.loader').hide();
      }


    });

  }else{

    $.ajax({
      url: laravel_url+"/categoryname_update",
      type:'post',
      data:{categoryid:categoryid, categoryname:categoryname, accid:accid},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);

          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1000, type: 'success' });
          }
          $('.viewerMaxICon').show();
      },
      complete:function(response){
        getmain_subcategory();
        $('.loader').hide();
      }


    });

  }

});


var archive_items = {}

$(document).on('click','.archiveBtn',function(){
  
  archive_items = {}
  
  var email_list = [];
  $( "#policyList .policyemail" ).each(function( index, element ) {
    if($(this).is(":checked")){
       if($(this).val() != ""){
        email_list.push($(this).val());
       }
    }
  });

  var email_attachment_list = [];
  $( "#policyList .policyemail_attachment" ).each(function( index, element ) {
    if($(this).is(":checked")){
       if($(this).val() != ""){
        email_attachment_list.push($(this).val());
       }
    }
  });

  var email_list_notes = [];
  $( "#policyList .policyCheck_notes" ).each(function( index, element ) {
    if($(this).is(":checked")){
       if($(this).val() != ""){
        email_list_notes.push($(this).val());
       }
    }
  });


  var document_list = [];
  $( "#policyList .policy_document" ).each(function( index, element ) {
    if($(this).is(":checked")){
       if($(this).val() != ""){
        document_list.push($(this).val());
       }
    }
  });

   archive_items['mails'] = email_list;
   archive_items['attachment'] = email_attachment_list;
   archive_items['notes'] = email_list_notes;
   archive_items['document'] = document_list;
 
  var archive_restore = $(this).data('changetab');

  if (email_list.length == '0' && email_attachment_list.length == '0'  && email_list_notes.length == '0' && document_list.length == '0') {
    new PNotify({ title: 'Error', text: 'Please Select atleast one File', delay: 1500, type: 'error' });
  }else{
    change_archive_restore(archive_restore);
    setTimeout(function(){  allpolicy_coverfn(); }, 1000)    
  }
  $('.downloadBtn').hide();
});


// $(document).on('click','.restoreBtn',function(){

//   var email_list1 = [];
//   $( "#archiveList .policyCheck" ).each(function( index, element ) {
//     if($(this).is(":checked")){
//        if($(this).val() != ""){
//         email_list1.push($(this).val());
//        }
//     }
//   });

//   var archive_restore = 'archive';

//   if (email_list1.length == '0') {
//     new PNotify({ title: 'Error', text: 'Please Select atleast one File', delay: 1500, type: 'error' });
//   }else{
//     change_archive_restore(email_list1,archive_restore);
//     setTimeout(function(){  allarchive_coverfn(); }, 1000)
//   }
  
// });

function change_archive_restore(archive_restore){
  archive_items_str = JSON.stringify(archive_items);
    $.ajax({
      url: laravel_url+"/change_archive_restore",
      type:'post',
      data:{email_list:archive_items_str, archive_restore:archive_restore},
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success:function(response){
          var obj = jQuery.parseJSON(response);
          if (obj.status == 'ok') {
            new PNotify({ title: 'Success', text: obj.message, delay: 1500, type: 'success' });
          }else{
            new PNotify({ title: 'Error', text: obj.message, delay: 1500, type: 'error' });
          }

      }
    });
}


$(document).on("click",".viewerMaxICon",function(){
  var categoryid = $(".cate_id").val();
  var sub_categoryid = $(".category_status").val();
  var doc_id = $(".filehiddenvalue").val();

  console.log(categoryid);
  console.log(sub_categoryid);
  console.log(doc_id);

   if(sub_categoryid == '0'){
    
              $(".main"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              $('.bind_policycategory').find('[data-emailid="'+doc_id+'"]').addClass("active show").click();
              $('.bind_policycategory').find('[data-docid="'+doc_id+'"]').addClass("active show").click();
          } else {
            
              $(".main"+categoryid).trigger("click");
              $(".sub"+categoryid).children('i').addClass('fa-chevron-down text-warning');
              $('.bind_policycategory').find('[data-emailid="'+doc_id+'"]').addClass("active show").click();
              $('.bind_policycategory').find('[data-docid="'+doc_id+'"]').addClass("active show").click();
           }
});