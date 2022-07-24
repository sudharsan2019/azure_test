$(document).on('click','.pollicytesting', function () {  	
  	$(this).addClass("pollicytesting").siblings().removeClass("pollicytesting");
  	$('.policy_tab_active').addClass('policy_sidemenu_btn');
});
  
$(document).on('click','.policy_sidemenu_btn', function () {
  	$(this).addClass("pollicytesting").siblings().removeClass("pollicytesting");
    doc_email_accordian();    
});

function doc_email_accordian() {
    $('.collapse').removeClass("show");
    $('#collapseTwo').addClass("show");
    $('.mailTabArrow').addClass('fa-chevron-down');
    $('.docTabArrow').removeClass('fa-chevron-down');
    $('.noteTabArrow').removeClass('fa-chevron-down');
    $('.allTabs span i').removeClass('fa-chevron-down');

    if( $('#PnewNote_collapse').css('display') == 'block' ) {
        $('.policynewnote_close_btn').hide();
        $('#PnewNote_collapse').hide();
        $('.policynewnote_btn_show').show();
    } else {
        $('.policynewnote_close_btn').hide();
        $('#PnewNote_collapse').hide();
        $('.policynewnote_btn_show').show();
    } 
    $('.policy_closeemail_btn').hide();
    $('#pDoc_div').hide();
    $('#pEmail_div').hide();
    $('.policy_emailup_btn').show();
    $('.policy_closeupload_btn').hide();
    $('.policy_upload_btn').show();
}


$(document).on('click','#policynewnote_btn_show', function () {
    $('.vat').focus();
})
  
$(document).on('click', '#open_pdf_edit', function () {
    $('.loader1').show();
	$('#viewer').html('');
    var viewerElement='';
    var link='';
    var hashvalue='';
    var filetype='';
    var accountid='';
    var originalname='';
    var email_id='';
    
    originalname= $(this).closest('#open_pdf_edit').data('docname');
    filetype= $(this).closest('#open_pdf_edit').data('filetype');
    hashvalue= $(this).closest('#open_pdf_edit').data('filehash');
    accountid= $(this).closest('#open_pdf_edit').data('accountid');
    email_id= $(this).closest('#open_pdf_edit').data('emailid');

    WebViewer({
        licenseKey: global_pdf_viewer_key,
        path: base_url + global_pdf_lib_path,
        fullAPI: false,
        extension: 'pdf',
        backendType: 'ems',

    }, document.getElementById('viewer')).then(instance => {
        const { Annotations } = instance;
       
            instance.loadDocument(base_url + global_pdf_str_path +accountid+ '/'+ hashvalue +'.pdf?v='+Math.random(), {
                filename: originalname+'.pdf'
            });   
        

        $('.loader1').fadeOut('slow');
        if ( $('.viewerMaxICon').css('display') == 'none' ) {
            $('.viewerMaxICon').css('display','block');
        } 

        var docViewer = instance.docViewer;
        var annotManager = docViewer.getAnnotationManager();
        var logined_user=login_name;

        link = $('.viewerMaxICon');
        link.attr('href','');
        link.attr('href', link.attr('href') + base_url + global_pdf_new_viewer + originalname + '&user=' + login_name +'&accountid=' + accountid + '&hash=' + hashvalue + '&type=' + filetype + '&emailid=' +email_id);
     
        //instance.setAnnotationUser(login_name);
        instance.annotManager.setCurrentUser(login_name)
        instance.disableTools([ 'CropPage' ]);
       
        function searchListener(searchValue, options, results) {
          
        };
        instance.addSearchListener(searchListener);
        instance.getFitMode();
        docViewer.getTool('AnnotationCreateTextHighlight').setStyles(currentStyle => ({
          StrokeColor: new Annotations.Color(0, 221, 255)
        }));

        docViewer.getTool('AnnotationCreateFreeText').setStyles(currentStyle => ({
          StrokeThickness: 5,
          StrokeColor: new Annotations.Color(0, 0, 255),
          TextColor: new Annotations.Color(0, 0, 0),
          FontSize: '20pt'
        }));

        // Add header button that will get file data on click
        var specific_person_hideshow = global_read_only_user;

        // if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )=='-1' ) {
        $(permission).each(function(key,val) {
            if(val.name.trim() == "Policy File"){
                if( val.id == 3 ) {

                    instance.setHeaderItems(header => {
                        header.push({
                        type: 'actionButton',
                        img: base_url + global_pdf_save_icon_path,
                        onClick: async () => {
                            $('.loader1').show();
                            const doc = docViewer.getDocument();
                            const xfdfString = await annotManager.exportAnnotations();
                            const data = await doc.getFileData({
                                // saves the document with annotations in it
                                xfdfString
                            });
                            const arr = new Uint8Array(data);
                            const blob = new Blob([arr], { type: 'application/pdf' });
                            var reader = new FileReader();
                            reader.onload = function () {
                            var myBase64 = reader.result.replace(/^data:.+;base64,/, '');
                            var url=base_url + global_pdf_save_file_path;

                            const params = {
                                base_value: myBase64,
                                originalname: originalname,
                                account_id: accountid,
                                hash_value: hashvalue,
                                type: filetype
                            }
                        
                                var xhr = new XMLHttpRequest;
                                xhr.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        var data = JSON.parse(this.responseText);
                                        if (data.message == 'pdf is converted') {
                                            setTimeout(function() {
                                            console.log('timeoutstart')
                                            var categoryid = $(".cate_id").val();
                                            var sub_categoryid = $(".category_status").val();
                                            var doc_id = $(".filehiddenvalue").val();
                                            if (sub_categoryid == '0') {
                                                $(".main"+categoryid).children('i').addClass('fa-chevron-down text-warning');
                                                $('.bind_policycategory').find('[data-emailid="'+doc_id+'"]').addClass("active show").click();
                                                $('.bind_policycategory').find('[data-docid="'+doc_id+'"]').addClass("active show").click();
                                            } else {
                                                $(".main"+categoryid).trigger("click");
                                                $(".sub"+categoryid).children('i').addClass('fa-chevron-down text-warning');
                                                $('.bind_policycategory').find('[data-emailid="'+doc_id+'"]').addClass("active show").click();
                                                $('.bind_policycategory').find('[data-docid="'+doc_id+'"]').addClass("active show").click();
                                            }
                                            new PNotify({ title: 'Success', text: 'Pdf saved successfully', delay: 1000, type: 'success' });
                                            $('.loader1').fadeOut('slow');
                                           
                                            }, 3000);
                                              console.log('timeoutend')

                                            } else {
                                                new PNotify({ title: 'Error', text: 'Pdf save failed', delay: 1000, type: 'error' });
                                                $('.loader1').fadeOut('slow');
                                            }
                                        
                                        }
                                    };
                                    xhr.open("POST", url, true);
                                    xhr.setRequestHeader('Content-type', 'application/json')
                                    xhr.send(JSON.stringify(params));
                                };
                                reader.readAsDataURL(blob);
                            }
                        });
                    });
                }
            }

        });
    }); 
});

$(document).on('click', '#original_dwn', function () {
    var email_list = [];
    $( ".policyCheck_down" ).each(function( index, element ) {
        if($(this).is(":checked")){
            var data = {};
            var dwn_ext= $(this).next('.com_dwn').data('ext');
            var dwn_ID= $(this).next('.com_dwn').data('emailid');
            var dwn_name= $(this).next('.com_dwn').data('docname');
            var dwn_type= $(this).next('.com_dwn').data('filetype');
            var dwn_hashvalue= $(this).next('.com_dwn').data('filehash');
            var dwn_accountid= $(this).next('.com_dwn').data('accountid');

                if(dwn_ext!='' && dwn_ID!='' && dwn_name!='' && dwn_type!='' && dwn_hashvalue!='' && dwn_accountid){
            data.ext = dwn_ext;
            data.doc_id = dwn_ID;
            data.docname = dwn_name;
            data.filetype = dwn_type;
            data.filehash = dwn_hashvalue;
            data.accountid = dwn_accountid;
            data.notes_id = 'empty';

            email_list.push(data);
        }
        }
    });

    var notes_list=[];

    $( ".policyCheck_notes" ).each( function( index, element ) {
        if ($(this).is(":checked")) {
            var nt_data = {};
            var note_val= $(this).val();
            nt_data.notes_id = note_val;
            email_list.push(nt_data);
            notes_list.push(nt_data);
        }
    });
            
    var notes_count=notes_list.length;
    if (notes_count > 0) {
        new PNotify({ title: 'Warning', text: 'Notes will not be downloaded', delay: 3000, type: 'warning' });
    }
            
    var count_check=email_list.length;
    if (count_check > 0) {
        if (count_check <= 20) {
            var path='original';
            download_files(email_list,path);
        } else {
            new PNotify({ title: 'Warning', text: 'File limit of 20 is exceeded. Please uncheck some files', delay: 1000, type: 'warning' });
            return false;
        }
    } else {
        new PNotify({ title: 'Warning', text: 'Please choose a file to download', delay: 1000, type: 'warning' });
        return false;
    }

});
    
$(document).on('click', '#recent_dwn', function () {
    var email_list = [];
    $( ".policyCheck_down" ).each(function( index, element ) {
        if ($(this).is(":checked")) {
            var data = {};
            var dwn_ext= $(this).next('.com_dwn').data('ext');
            var dwn_ID= $(this).next('.com_dwn').data('emailid');
            var dwn_name= $(this).next('.com_dwn').data('docname');
            var dwn_type= $(this).next('.com_dwn').data('filetype');
            var dwn_hashvalue= $(this).next('.com_dwn').data('filehash');
            var dwn_accountid= $(this).next('.com_dwn').data('accountid');
                if(dwn_ext!='' && dwn_ID!='' && dwn_name!='' && dwn_type!='' && dwn_hashvalue!='' && dwn_accountid){
            data.ext = dwn_ext;
            data.doc_id = dwn_ID;
            data.docname = dwn_name;
            data.filetype = dwn_type;
            data.filehash = dwn_hashvalue;
            data.accountid = dwn_accountid;
            data.notes_id = 'empty';

            email_list.push(data);
        }
        }
    });

    var notes_list=[];

    $( ".policyCheck_notes" ).each( function ( index, element ) {
        if ($(this).is(":checked")) {
            var nt_data = {};
            var note_val= $(this).val();
            nt_data.notes_id = note_val;
            email_list.push(nt_data);
            notes_list.push(nt_data);
        }
    });
                    
    var notes_count=notes_list.length;
    if (notes_count > 0) {
        new PNotify({ title: 'Warning', text: 'Notes will not be downloaded', delay: 3000, type: 'warning' });
    }
                  
    var count_check=email_list.length;
    if (count_check > 0) {
        if (count_check <= 20) {
        var path='recent';
        download_files(email_list,path);
        } else {
        new PNotify({ title: 'Warning', text: 'File limit of 20 is exceeded. Please uncheck some files', delay: 1000, type: 'warning' });
            return false;
        }
    } else {
        new PNotify({ title: 'Warning', text: 'Please choose a file to download', delay: 1000, type: 'warning' });
        return false;
    }
});

function download_files (files,path) {
    
    function download_next(i) {
        if (files[i].notes_id == 'empty') {
            try {
                var a = document.createElement('a');
                if (path=='original') { 
                    
                        if(files[i].ext=='msg' || files[i].ext=='MSG' || files[i].ext=='EML' || files[i].ext=='eml' || files[i].ext=='png' || files[i].ext=='PNG' || files[i].ext=='JPG' || files[i].ext=='jpg' || files[i].ext=='jpeg' || files[i].ext=='JPEG' || files[i].ext=='email') {
                            a.href = base_url + global_pdf_str_path +files[i].accountid+'/original/' + files[i].filehash + '.pdf';
                        }else{
                            a.href = base_url + global_pdf_str_path +files[i].accountid+'/original/' + files[i].filehash + '.'+files[i].ext;
                        }    
                  
                } else {
                   
                        if(files[i].ext=='msg' || files[i].ext=='MSG' || files[i].ext=='EML' || files[i].ext=='eml' || files[i].ext=='png' || files[i].ext=='PNG' || files[i].ext=='JPG' || files[i].ext=='jpg' || files[i].ext=='jpeg' || files[i].ext=='JPEG' || files[i].ext=='email') {
                            a.href = base_url + global_pdf_str_path +files[i].accountid+'/' + files[i].filehash + '.pdf';
                        } else{
                            a.href = base_url + global_pdf_str_path +files[i].accountid+'/' + files[i].filehash + '.'+files[i].ext;
                    }    
                   
                }  

                a.target = '_blank';
                if (files[i].ext=='msg' || files[i].ext=='MSG' || files[i].ext=='EML' || files[i].ext=='eml' || files[i].ext=='png' || files[i].ext=='PNG' || files[i].ext=='JPG' || files[i].ext=='jpg' || files[i].ext=='jpeg' || files[i].ext=='JPEG' || files[i].ext=='email') {
                    a.download = files[i].docname+'.pdf';
                } else {
                    a.download = files[i].docname;
                }

                (document.body || document.documentElement).appendChild(a);
                    if (a.click) {
                        a.click(); 
                    } else {
                        if (files[i].ext=='msg' || files[i].ext=='MSG' || files[i].ext=='EML' || files[i].ext=='eml' || files[i].ext=='png' || files[i].ext=='PNG' || files[i].ext=='JPG' || files[i].ext=='jpg' || files[i].ext=='jpeg' || files[i].ext=='JPEG' || files[i].ext=='email') {
                            window.open(files[i].docname+'.pdf');
                        } else {
                            window.open(files[i].docname);
                        }
                    }
               
                    a.parentNode.removeChild(a);
                    setTimeout( function() {
                        download_next(i + 1);
                    }, 1000);
            }
            catch(err) {
                new PNotify({ title: 'Error', text: err.message , delay: 1000, type: 'error' });
                return false;
            }
        }
    }
          
    download_next(0);
}

