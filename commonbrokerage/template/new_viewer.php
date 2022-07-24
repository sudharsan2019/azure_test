<?php
session_start();

if(!isset($_SESSION['userid'])){
header('Location: /brok-wbui/logout.php');
}

include('../config.php');

?>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <script src='<?php echo $GLOBALS['Site_url'] . $GLOBALS['PDF_LIB_PATH'] ?>/webviewer.min.js?ver=<?php echo microtime(true); ?>'></script>
    
    <title>Ategrity Specialty Insurance Company</title>
    <?php 
    $site_url = $GLOBALS['Site_url'];
    ?>
    <link rel="shortcut icon" href="<?php echo $site_url?>/brok-wbui/img/favicon.ico">
    <link href="<?php echo $site_url; ?>/brok-wbui/css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/lib/pnotify.custom.css" />
    <style>
      header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 30px;
      padding-bottom: 20px;
      padding-top: 8px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      background: #00a5e4;
      text-align: center;
      color: fff;
      font-size: 15px;
      font-weight: bold;
      font-family: sans-serif;
    }
    .sidebarrs{
      position: relative !important;
    }
    </style>
    </head>
    <body>
    <header>
      <div class="title sample"><?php echo $_REQUEST['originalname']; ?></div>
    <div class="menu"><div></div></header>
    <div class="my-4" style="padding: 15px;">
   <!--<div id='viewer_new_<?php //echo $_REQUEST['pdf_id']; ?>'></div>!-->
   <div id='viewer_new'></div>
 </div>
  <script src="<?php echo $site_url; ?>/brok-wbui/vendors/js/jquery.min.js"></script>
  <script src="<?php echo $site_url; ?>/brok-wbui/vendors/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../js/lib/pnotify.custom.js"></script>

<script>
  var host = window.location.hostname;
  var protocol = window.location.protocol;
  var base_url = protocol+"//"+host;
	var originalname='';
	var login_name='';
  var originalnamee='';
  var accountid='';
  var hashvalue='';
  var filetype='';
  var email_id='';

	originalname = "<?php echo $_REQUEST['originalname']; ?>";
	login_name = "<?php echo $_REQUEST['user']; ?>";
  filetype= "<?php echo $_REQUEST['type']; ?>";
  hashvalue= "<?php echo $_REQUEST['hash']; ?>";
  accountid= "<?php echo $_REQUEST['accountid']; ?>";
  email_id= "<?php echo $_REQUEST['emailid']; ?>";

  originalnamee=originalname.split('.').slice(0, -1).join('.');

    WebViewer({
    licenseKey: '<?php echo $GLOBALS['PDF_VIEWER_KEY']; ?>',
    path: '<?php echo $GLOBALS['PDF_LIB_PATH']; ?>',
    fullAPI: false,
    extension: 'pdf',
    backendType: 'ems'
    }, document.getElementById('viewer_new')).then(instance => {
     const { Annotations } = instance;
     
     if(filetype=='mail'){
        instance.loadDocument(base_url + '<?php echo $GLOBALS['PDF_STORAGE_PATH'];?>Email_'+email_id+ '/'+ hashvalue +'.pdf?v='+Math.random(), {
        filename: originalnamee+'.pdf'
        });
      }else{
        instance.loadDocument(base_url + '<?php echo $GLOBALS['PDF_STORAGE_PATH'];?>'+accountid+ '/'+ hashvalue +'.pdf?v='+Math.random(), {
        filename: originalnamee+'.pdf'
        });
      }
        var docViewer = instance.docViewer;
        var annotManager = docViewer.getAnnotationManager();
        var logined_user=login_name;
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
        var specific_person_hideshow = '<? php echo $GLOBALS["READ_ONLY_USER"]; ?>';
      
        if ( $.inArray( localStorage.getItem('userid'), specific_person_hideshow )=='-1' ) {
        instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: base_url + '<?php echo $GLOBALS['PDF_SAVE_ICON_PATH']; ?>',
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
            var url=base_url + '<?php echo $GLOBALS['PDF_SAVE_FILE_PATH']; ?>';

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
                       new PNotify({ title: 'Success', text: 'Pdf saved successfully', delay: 1000, type: 'success' });
                     setTimeout(function() {
                     location.reload();

                      }, 3000);
                      $('.loader1').fadeOut('slow');
                    }else{
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

});

</script>
</body>
</html>