
  $(document).on('click','#pills-policy', function() {
  	// alert()
  });
  $(document).on('click','.pollicytesting', function() {  	
  	$(this).addClass("pollicytesting").siblings().removeClass("pollicytesting");
  	$('.policy_tab_active').addClass('policy_sidemenu_btn');
    // doc_email_accordian();
 });
  
  $(document).on('click','.policy_sidemenu_btn', function() {
  	//alert();
  	// $(this).addClass("active").siblings().removeClass("active");
  	$(this).addClass("pollicytesting").siblings().removeClass("pollicytesting");
    // $('.poliAllBtn').removeClass('active');
    doc_email_accordian();    
  });

  function doc_email_accordian()
  {

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


  $(document).on('click','.policynewnote_btn_show',function(){
    $('.vat').focus();
  })
  
  
$(document).on('click', '.open_pdf_edit', function () {
    $('.loader1').show();
	$('#viewer').html('');
    var DOCUMENT_ID='';
    var viewerElement='';
    
    
    DOCUMENT_ID= $(this).closest('.editortabpdf').data('emailid');
     
    WebViewer({
    licenseKey: 'CICD_PDFTRON_KEY',
    path: base_url + '/brokerage/js/pdfeditor_pdftron/feb_2020/lib',
	  initialDoc: laravel_url + '/downloadaspdf?emailid=' + DOCUMENT_ID,
	  fullAPI: false,
    extension: 'pdf',

	}, document.getElementById('viewer')).then(instance => {
     const { Annotations } = instance;

    var docViewer = instance.docViewer;
    var annotManager = docViewer.getAnnotationManager();
    var logined_user=login_name;
    
        //instance.setAnnotationUser(login_name);
        instance.annotManager.setCurrentUser(login_name)
        instance.disableTools([ 'CropPage' ]);
        
        /* var LayoutMode = instance.LayoutMode;
        instance.setLayoutMode(LayoutMode.Single); */
  
        docViewer.on('documentLoaded', function() {
        loadxfdfStrings(DOCUMENT_ID).then(function(rows) {
          JSON.parse(rows).forEach(function(col) {
            annotManager.importAnnotCommand(col.annotation).then(function(annotations) {
              annotManager.drawAnnotationsFromList(annotations);
            });
          });
        });
        // instance.setZoomLevel('100%');
       
        function searchListener(searchValue, options, results) {
          
        };
        instance.addSearchListener(searchListener);
    
        instance.getFitMode();
        
        //console.log(instance.getLayoutMode());

       docViewer.getTool('AnnotationCreateTextHighlight').setStyles(currentStyle => ({
          StrokeColor: new Annotations.Color(0, 221, 255)
        }));

        docViewer.getTool('AnnotationCreateFreeText').setStyles(currentStyle => ({
          StrokeThickness: 5,
          StrokeColor: new Annotations.Color(0, 0, 255),
          TextColor: new Annotations.Color(0, 0, 0),
          FontSize: '20pt'
        }));
      });


   
    
      annotManager.on('annotationChanged', (annott, action, { imported }) => { 
       if (imported) return;
      const xfdfStrings = annotManager.exportAnnotCommand();
      Promise.resolve(xfdfStrings).then(function(value) {
      var xfdfString1=value;
      annott.forEach(function(annot) {
      savexfdfString(DOCUMENT_ID,annot.Id,xfdfString1,logined_user);
      });
      }, function(value) {});
      });


  
});



    
            // Make a POST request with document ID, annotation ID and XFDF string
        var savexfdfString = function(documentId, annotationId, xfdfString, logined_user) {
          return new Promise(function(resolve) {
            fetch(laravel_url + `/pdf_annotation_add?documentId=${documentId}`, {
              method: 'POST',
              body: JSON.stringify({
                annotationId,
                xfdfString,
                logined_user
              })
            }).then(function(res) {
              if (res.status === 200) {
                resolve();
              }
            });
          });
        };

        

        // Make a GET request to get XFDF string
        var loadxfdfStrings = function(documentId) {
          return new Promise(function(resolve) {
            fetch(laravel_url + `/pdf_annotation_fetch/${documentId}`, {
              method: 'GET'
            }).then(function(res) {
              if (res.status === 200) {
                  $('.loader1').fadeOut('slow');
                res.text().then(function(xfdfStrings) {
                  resolve(xfdfStrings);
                });
              }else{
                $('.loader1').fadeOut('slow');
              }
            });
          });
        };

        });





$(document).on('click', '.stamp', function () {
 $('#sample-image').toggle();
});