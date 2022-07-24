<?php

// ini_set('display_errors', 1); 
// ini_set('display_startup_errors', 1); 
// error_reporting(E_ALL);


ini_set('upload-max-filesize', '50M');
ini_set('post_max_size', '50M');

include("conn.php");

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
$site_url =  $protocol."://".$_SERVER['SERVER_NAME'];


// require_once(__DIR__ . '/cloudmersive/vendor/autoload.php');

// // Configure API key authorization: Apikey
// $config = Swagger\Client\Configuration::getDefaultConfiguration()->setApiKey('Apikey', $cicd_cloudmersive);

// $apiInstance = new Swagger\Client\Api\ConvertDocumentApi(
//     new GuzzleHttp\Client(),
//     $config
// );


// if ($_SERVER['SERVER_NAME'] == 'ategrity-dev.esinsurancecloud.com') {
//     include("/opt/pdftron/pdftron7/PDFNetWrappers/PDFNetC/Lib/PDFNetPHP.php");
// }else{
//     include("/opt/pdftron/7.0/PDFNetWrappers/PDFNetC/Lib/PDFNetPHP.php");
// }


//mubumbi start
require_once(__DIR__ . '/final_muhumbi/client/autoload.php');

MuhimbiPDFOnline\Client\Configuration::getDefaultConfiguration()->setApiKey('api_key', $cicd_muhimbi);
MuhimbiPDFOnline\Client\Configuration::getDefaultConfiguration()->setHost('https://api.muhimbi.com/api');
$api_instance = new MuhimbiPDFOnline\Client\Api\ConvertApi();
$input_data = new MuhimbiPDFOnline\Client\Model\ConvertData();


//mubumbi end


// include($cicdpdftron);

// PDFNet::Initialize();
// PDFNet::GetSystemFontList();


if(!empty($_FILES)){

for ($i=0; $i < count($_FILES['file']['name']); $i++) { 

    $file_name  = $_FILES['file']['name'][$i];
    $file_size  = $_FILES['file']['size'][$i];
    $file_tmp   = $_FILES['file']['tmp_name'][$i];
    $file_type  = $_FILES['file']['type'][$i];

    $original_file_name = $file_name;
    $accountid  = $_REQUEST['accountid'];
    $drag_filename   = $_REQUEST['filename'];
    $drag_colorpick  = $_REQUEST['colorpick'];
    $drag_tagname = $_REQUEST['colorpick_text'];
    $userid     = $_REQUEST['userid'];
    $username   = $_REQUEST['username'];

    if ($_REQUEST['subcategory'] == 'please_select' || $_REQUEST['subcategory'] == 'newsubcategory'){
        $category = $_REQUEST['category'];
    }else{
        $category = $_REQUEST['subcategory'];
    }

    if ($_REQUEST['nomediaval'] == 'undefined'){
        $nomediaval = NULL;
    }else{
        $nomediaval = $_REQUEST['nomediaval'];
    }

    $ext = pathinfo($file_name, PATHINFO_EXTENSION);
    $ext1  = strtolower($ext);


$trimfilename1 = basename(str_replace(' ', '__', $file_name), '.'.$ext);
$trimfilename = preg_replace('/[^A-Za-z0-9]/', '_', $trimfilename1);


    $allowed_formats = array("eml", "msg");

    if (in_array($ext1, $allowed_formats)){

        // MSG, EML Upload start

        $folder_path = 'v4uploads/documents_filesystem/'.$accountid;

        if (!file_exists($folder_path)) {
            if (mkdir($folder_path, 0777, true)) {

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }
        }

// original file folder start
        $original_folder_path = 'v4uploads/documents_filesystem/'.$accountid.'/original';

        if (!file_exists($original_folder_path)) {
            if (mkdir($original_folder_path, 0777, true)) {

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }
        }
// original file folder end

        $originalmail_folder_path = 'v4uploads/original_emails/'.$accountid;

        if (!file_exists($originalmail_folder_path)) {
            if (mkdir($originalmail_folder_path, 0777, true)) {

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }
        }

        $uniqid = uniqid();
        $randid = mt_rand(100000, 999999);
        $strtotime = strtotime("now");


        $changed_filename = $trimfilename.'_'.$uniqid.'_'.$randid.'_'.$strtotime;

        $path = __DIR__."/".$original_folder_path."/".$changed_filename.'.'.$ext1;

// sleep(3);


$qa_issue_msg = array('temp'=>$file_tmp,'path'=> $path );

        if (move_uploaded_file($file_tmp, $path)){

            if ($ext1 == 'msg') {

                try {


                    // MSG to EML conversion
                    $msg_to_eml_converted = "msgconvert --outfile ".__DIR__."/v4uploads/documents_filesystem/".$accountid."/original/".$changed_filename.".eml ".$path;
                    $result_system = system($msg_to_eml_converted);

                    // original file backup move
                        $input = $path;
                        $output="v4uploads/original_emails/".$accountid."/".$changed_filename.".msg";
                        copy($input,$output);
                    // original file backup move
sleep(3);

                        $input_data->setSourceFileName($changed_filename.".msg");
                        $input_data->setSourceFileContent(base64_encode(file_get_contents($output)));
                        $input_data->setOutputFormat('PDF');
                        $input_data->setOverrideSettings('<Override>
                                            <ConversionSettings>
                                                <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                                                    <ConvertAttachments>false</ConvertAttachments>
                                                    <IncludeAttachmentTypes></IncludeAttachmentTypes>
                                                    <PaperSize>Letter</PaperSize>
                                                    <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                                                    <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                                                    <BestBodyMode>Default</BestBodyMode>
                                                    <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                                                    <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                                                    <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                                                    <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                                                    <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                                                    <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                                                    <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                                                    <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                                                    <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                                                    <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                                                </ConverterSpecificSettings>
                                            </ConversionSettings>
                                        </Override>
                                        ');


                        ini_set('default_socket_timeout', 300);
                        set_time_limit ( 300 );

                    try {

                        // $result = $apiInstance->convertDocumentMsgToPdf($output);
                        // file_put_contents($original_folder_path."/".$changed_filename.".pdf" , $result);

                        $result = $api_instance->convert($input_data);
                        file_put_contents($original_folder_path."/".$changed_filename.".pdf" , base64_decode($result->getProcessedFileContent()) );


                        // original file backup move
                            $input_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$changed_filename.'.pdf';
                            $output_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/'.$changed_filename.'.pdf';
                            copy($input_pdf,$output_pdf);
                        // original file backup move

                    }catch(Exception $e) {
                        $err_msg[$i] = 'fail';
                        continue;
                    }


                }catch(Exception $e) {
                    $err_msg[$i] = 'fail';
                    continue;
                }
                
            }else{
                
                sleep(3);

                try {

                    $emlpath = __DIR__."/v4uploads/documents_filesystem/".$accountid."/original/".$changed_filename.".eml";

                    $input_data->setSourceFileName($changed_filename.".eml");
                    $input_data->setSourceFileContent(base64_encode(file_get_contents($emlpath)));
                    $input_data->setOutputFormat('PDF');
                    $input_data->setOverrideSettings('<Override>
                    <ConversionSettings>
                        <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                            <ConvertAttachments>false</ConvertAttachments>
                            <IncludeAttachmentTypes></IncludeAttachmentTypes>
                            <PaperSize>Letter</PaperSize>
                            <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                            <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                            <BestBodyMode>Default</BestBodyMode>
                            <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                            <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                            <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                            <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                            <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                            <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                            <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                            <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                            <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                            <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                        </ConverterSpecificSettings>
                    </ConversionSettings>
                </Override>
                ');

                    ini_set('default_socket_timeout', 300);
                    set_time_limit ( 300 );

                    // $result = $apiInstance->convertDocumentEmlToPdf($emlpath);
                    // file_put_contents($original_folder_path."/".$changed_filename.".pdf" , $result);

                    $result = $api_instance->convert($input_data);
                        file_put_contents($original_folder_path."/".$changed_filename.".pdf" , base64_decode($result->getProcessedFileContent()) );


                    // original file backup move
                        $input_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$changed_filename.'.pdf';
                        $output_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/'.$changed_filename.'.pdf';
                        copy($input_pdf,$output_pdf);
                    // original file backup move

                }catch(Exception $e) {
                    $err_msg[$i] = 'fail';
                    continue;
                }

            }


            $emlpath = __DIR__."/v4uploads/documents_filesystem/".$accountid."/original/".$changed_filename.".eml";

            $input1 = $emlpath;
            $output1="v4uploads/original_emails/".$accountid."/".$changed_filename.".eml";
            copy($input1,$output1);


            // EML Parsing start
            require_once __DIR__.'/vendor/autoload.php';

            $Parser = new PhpMimeMailParser\Parser();

            $Parser->setText(file_get_contents($emlpath));
            
            $to = $Parser->getHeader('to');
            $addressesTo = $Parser->getAddresses('to');

            if (count($addressesTo) > 1) {
                foreach ($addressesTo as $key => $value) {
                    $toaddress[] =  $value['address'];
                }
                $addTo = implode(',', $toaddress);
            }else{
                $addTo = $addressesTo[0]['address'];
            }

            $from = $Parser->getHeader('from');
            $addressesFrom = $Parser->getAddresses('from');
            $get_from = str_replace('<>', '', $from);
            $crt_from = str_replace('"', '', $get_from);
            $from_address_new = $addressesFrom[0]['display'];

            $subject = $Parser->getHeader('subject');
            $subject = str_replace(',', ',', $subject);

            $text = $Parser->getMessageBody('text');
            $html = $Parser->getMessageBody('html');
            $htmlEmbedded = $Parser->getMessageBody('htmlEmbedded'); //HTML Body included data
            $stringHeaders = $Parser->getHeadersRaw();      // Get all headers as a string, no charset conversion
            $arrayHeaders = $Parser->getHeaders();          // Get all headers as an array, with charset conversion
            $ccaddress = $Parser->getAddresses('cc');


            if (count($ccaddress) > 1) {
                foreach ($ccaddress as $key => $value) {
                    $ccaddress1[] =  $value['address'];
                }
                $addcc = implode(',', $ccaddress1);
            }else{
                if (isset($ccaddress[0]['address'])) {
                    $addcc = $ccaddress[0]['address'];
                }else{
                    $addcc = '';
                }
            }

            // Pass in a writeable path to save attachments
            $attach_dir = 'attachments/';   // Be sure to include the trailing slash
            $include_inline = false;
            $attachments = $Parser->getAttachments([$include_inline]);

            $child_id = '0';
            $dragtype = NULL;
            $flag_status = '3';
            $is_drag_droped = '1';
            $is_document_or_email = 'email';
            $is_delete = '0';
            $Current_email_id = '0';
            $crdate = date('Y-m-d H:i:s');
            $inserted_date_time = date('Y-m-d H:i:s');

            $date_email=date("Y-m-d h:i:s", strtotime(($Parser->getHeader('date'))));

            $msginsert_result = insertintodb_msg( $db_conn, $addTo, $from_address_new, $addcc, $subject, $date_email, $is_delete, $accountid, $category, $username, $nomediaval, $drag_filename, $drag_colorpick, $drag_tagname, $is_drag_droped, $original_file_name, $ext, $inserted_date_time, $changed_filename );


// attachment work start
            if ($msginsert_result) {

                if (isset($attachments)) {
                    
                    $ii = 0;
                    foreach ($attachments as $attachment) {

                        // echo 'MIME part string : '.$attachment->getMimePartStr().'<br /><hr/>';

                        $insert = true;

                        $headerval = $attachment->getheaders();
                        $getContentval = $attachment->getContent();

                        if (isset($headerval['content-disposition'])) {

                            $att_filename = $attachment->getFilename();
                            $altfile_name  = 'alt="'.$att_filename.'"';


                            if (strpos(strtolower($altfile_name), 'image0') !== false) {
                                continue;
                            }


                            if (strpos($headerval['content-disposition'], 'inline') !== false) {
                                continue;
                            }

                            if (strpos($html, $altfile_name) !== false) {
                                continue;
                            }


                            // skip the loop if the attachment name is noname
                            if (strpos(strtolower($altfile_name), 'noname') !== false) {
                                continue;
                            }

                            $attach_ext = strtolower(pathinfo($att_filename, PATHINFO_EXTENSION));
                            
                            $trimfilename11 = basename(str_replace(' ', '__', $att_filename), '.'.$attach_ext);

                            $trimfilename1 = preg_replace('/[^A-Za-z0-9]/', '_', $trimfilename11);

                            $attach_filesystem_hash = $trimfilename1.'__'.uniqid().'_'.mt_rand(100000, 999999).'_'.strtotime("now");

                            $attachment_folder = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.'.$attach_ext;

                            if(strpos($headerval['content-disposition'], 'attachment') !== false){
                            // if (strpos($headerval['content-disposition'], 'inline') === false) {
                            
                                if($_REQUEST['nomediaval'] != 'noMedia') {

                                    if(   strpos($headerval['content-disposition'], '.png') !== false || 
                                          strpos($headerval['content-disposition'], '.jpg') !== false || 
                                          strpos($headerval['content-disposition'], '.jpeg')!== false ||
                                          strpos($headerval['content-disposition'], '.PNG') !== false || 
                                          strpos($headerval['content-disposition'], '.JPG') !== false || 
                                          strpos($headerval['content-disposition'], '.JPEG')!== false 
                                      )
                                    {
                                        
                                        file_put_contents($attachment_folder, $getContentval ); 
                                        
                                        sleep(3);

                                        try {
                                                    
                                                    $input_data->setSourceFileName($attachment_folder);
                                                    $input_data->setSourceFileContent(base64_encode(file_get_contents($attachment_folder)));
                                                    $input_data->setOutputFormat('PDF');
                                                    $input_data->setOverrideSettings('<Override>
                                                    <ConversionSettings>
                                                        <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                                                            <ConvertAttachments>false</ConvertAttachments>
                                                            <IncludeAttachmentTypes></IncludeAttachmentTypes>
                                                            <PaperSize>Letter</PaperSize>
                                                            <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                                                            <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                                                            <BestBodyMode>Default</BestBodyMode>
                                                            <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                                                            <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                                                            <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                                                            <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                                                            <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                                                            <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                                                            <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                                                            <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                                                            <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                                                            <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                                                        </ConverterSpecificSettings>
                                                    </ConversionSettings>
                                                </Override>
                                                ');

                                                    ini_set('default_socket_timeout', 300);
                                                    set_time_limit ( 300 );

                                                    $result = $api_instance->convert($input_data);
                                                    file_put_contents('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf', 
                                                        base64_decode($result->getProcessedFileContent()) );

                                                    // original folder upload start
                                                    $input='v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf';
                                                    $output = 'v4uploads/documents_filesystem/'.$accountid.'/'.$attach_filesystem_hash.'.pdf';
                                                    copy($input,$output);
                                                // original folder upload end

                                                }catch(Exception $e) {
                                                    $err_msg[$i] = 'fail';
                                                    continue;
                                                }

                                        // try {

                                        //     $doc2 = new PDFDoc();
                                        //     Convert::ToPDF($doc2, $attachment_folder);
                                        //     $doc2->Save('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf', SDFDoc::e_linearized);
                                        //     $doc2->Close();

                                        //     // original folder upload start
                                        //         $input='v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf';
                                        //         $output = 'v4uploads/documents_filesystem/'.$accountid.'/'.$attach_filesystem_hash.'.pdf';
                                        //         copy($input,$output);
                                        //     // original folder upload end

                                        // }catch(Exception $e) {
                                        //     $err_msg[$i] = 'fail';
                                        //     continue;
                                        // }

                                    }

                                    // upload only other img, Audio and Video files
                                    if (  
                                          strpos($headerval['content-disposition'], '.tif')!== false ||
                                          strpos($headerval['content-disposition'], '.tiff')!== false ||
                                          strpos($headerval['content-disposition'], '.gif')!== false ||
                                          strpos($headerval['content-disposition'], '.TIF')!== false ||
                                          strpos($headerval['content-disposition'], '.TIFF')!== false ||
                                          strpos($headerval['content-disposition'], '.GIF')!== false ||

                                          strpos($headerval['content-disposition'], '.MP4')!== false ||
                                          strpos($headerval['content-disposition'], '.MOV')!== false ||
                                          strpos($headerval['content-disposition'], '.FLV')!== false ||
                                          strpos($headerval['content-disposition'], '.AVI')!== false ||
                                          strpos($headerval['content-disposition'], '.mp4')!== false ||
                                          strpos($headerval['content-disposition'], '.mov')!== false ||
                                          strpos($headerval['content-disposition'], '.flv')!== false ||
                                          strpos($headerval['content-disposition'], '.avi')!== false ||

                                          strpos($headerval['content-disposition'], '.MP3')!== false ||
                                          strpos($headerval['content-disposition'], '.WAV')!== false ||
                                          strpos($headerval['content-disposition'], '.MPEG')!== false ||
                                          strpos($headerval['content-disposition'], '.mp3')!== false ||
                                          strpos($headerval['content-disposition'], '.wav')!== false ||
                                          strpos($headerval['content-disposition'], '.mpeg')!== false
                                      ) {
                                            file_put_contents($attachment_folder, $getContentval ); 
                                        }

                                }else{
                                    if(   
                                          strpos($headerval['content-disposition'], '.png') !== false || 
                                          strpos($headerval['content-disposition'], '.jpg') !== false || 
                                          strpos($headerval['content-disposition'], '.jpeg')!== false ||
                                          strpos($headerval['content-disposition'], '.PNG') !== false || 
                                          strpos($headerval['content-disposition'], '.JPG') !== false || 
                                          strpos($headerval['content-disposition'], '.JPEG')!== false ||
                                          strpos($headerval['content-disposition'], '.tif')!== false ||
                                          strpos($headerval['content-disposition'], '.tiff')!== false ||
                                          strpos($headerval['content-disposition'], '.gif')!== false ||
                                          strpos($headerval['content-disposition'], '.TIF')!== false ||
                                          strpos($headerval['content-disposition'], '.TIFF')!== false ||
                                          strpos($headerval['content-disposition'], '.GIF')!== false ||

                                          strpos($headerval['content-disposition'], '.MP4')!== false ||
                                          strpos($headerval['content-disposition'], '.MOV')!== false ||
                                          strpos($headerval['content-disposition'], '.FLV')!== false ||
                                          strpos($headerval['content-disposition'], '.AVI')!== false ||
                                          strpos($headerval['content-disposition'], '.mp4')!== false ||
                                          strpos($headerval['content-disposition'], '.mov')!== false ||
                                          strpos($headerval['content-disposition'], '.flv')!== false ||
                                          strpos($headerval['content-disposition'], '.avi')!== false ||

                                          strpos($headerval['content-disposition'], '.MP3')!== false ||
                                          strpos($headerval['content-disposition'], '.WAV')!== false ||
                                          strpos($headerval['content-disposition'], '.MPEG')!== false ||
                                          strpos($headerval['content-disposition'], '.mp3')!== false ||
                                          strpos($headerval['content-disposition'], '.wav')!== false ||
                                          strpos($headerval['content-disposition'], '.mpeg')!== false

                                      ){
                                            $insert = false;
                                        }
                                }

                                $image_format = array("png", "jpg", "jpeg", "PNG", "JPG", "JPEG", "tif", "tiff", "gif", "TIF", "TIFF", "GIF", "MP4", "mp4", "MOV", "mov", "FLV", "flv", "AVI", "avi", "MP3", "mp3", "WAV", "wav", "MPEG", "mpeg");
                                if (!in_array($attach_ext, $image_format)) {

                                    // insert all other files (rar,txt,etc)
                                    file_put_contents($attachment_folder, $getContentval );


                                    $doc_formats_doc = array("docx", "xlsx", "csv", "doc","xls","docm","xlsm","pdf","DOCX", "XLSX", "CSV", "DOC","XLS","DOCM","XLSM","PDF");

                                    if (in_array($attach_ext, $doc_formats_doc)){
                                        // original folder upload start
                                        $input = $attachment_folder;
                                        $output = 'v4uploads/documents_filesystem/'.$accountid.'/'.$attach_filesystem_hash.'.'.$attach_ext;
                                        copy($input,$output);

                                    }

                                    // Email with in email work start
                                    if ($attach_ext == 'msg' || $attach_ext == 'eml') {

                                        $emailattchpath = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.'.$attach_ext;

                                        if ($attach_ext == 'msg') {
                                            sleep(3);
                                            try {

                                                // MSG to EML conversion
                                                // $msg_to_eml_converted_attach = "msgconvert --outfile ".__DIR__."/v4uploads/documents_filesystem/".$accountid."/original/".$attach_filesystem_hash.".eml ".$emailattchpath;
                                                
                                                // $attachment_result_system = system($msg_to_eml_converted_attach);

                                                try {
                                                    sleep(3);
                                                    
                                                    $input_data->setSourceFileName($attach_filesystem_hash.".msg");
                                                    $input_data->setSourceFileContent(base64_encode(file_get_contents($emailattchpath)));
                                                    $input_data->setOutputFormat('PDF');
                                                    $input_data->setOverrideSettings('<Override>
                                                    <ConversionSettings>
                                                        <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                                                            <ConvertAttachments>false</ConvertAttachments>
                                                            <IncludeAttachmentTypes></IncludeAttachmentTypes>
                                                            <PaperSize>Letter</PaperSize>
                                                            <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                                                            <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                                                            <BestBodyMode>Default</BestBodyMode>
                                                            <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                                                            <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                                                            <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                                                            <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                                                            <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                                                            <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                                                            <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                                                            <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                                                            <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                                                            <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                                                        </ConverterSpecificSettings>
                                                    </ConversionSettings>
                                                </Override>
                                                ');

                                                    ini_set('default_socket_timeout', 300);
                                                    set_time_limit ( 300 );

                                                    $result = $api_instance->convert($input_data);
                                                    file_put_contents('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf' , 
                                                        base64_decode($result->getProcessedFileContent()) );

                                                    // $result1 = $apiInstance->convertDocumentMsgToPdf($emailattchpath);
                                                    // file_put_contents('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf',$result1);

                                                    // original file backup move
                                                        $input_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf';
                                                        $output_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/'.$attach_filesystem_hash.'.pdf';
                                                        copy($input_pdf,$output_pdf);
                                                    // original file backup move

                                                }catch(Exception $e) {
                                                    $err_msg[$i] = 'fail';
                                                    continue;
                                                }

                                                // // Delete attachment msg 
                                                // unlink($emailattchpath);

                                            }catch(Exception $e) {
                                                $err_msg[$i] = 'fail';
                                                continue;

                                            }
                                            
                                        }else{

                                                try {
                                                    sleep(3);
                                                    // $result2 = $apiInstance->convertDocumentEmlToPdf($emailattchpath);
                                                    // file_put_contents('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf',$result2);

                                                    $input_data->setSourceFileName($attach_filesystem_hash.".eml");
                                                    $input_data->setSourceFileContent(base64_encode(file_get_contents($emailattchpath)));
                                                    $input_data->setOutputFormat('PDF');
                                                    $input_data->setOverrideSettings('<Override>
                                        <ConversionSettings>
                                            <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                                                <ConvertAttachments>false</ConvertAttachments>
                                                <IncludeAttachmentTypes></IncludeAttachmentTypes>
                                                <PaperSize>Letter</PaperSize>
                                                <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                                                <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                                                <BestBodyMode>Default</BestBodyMode>
                                                <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                                                <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                                                <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                                                <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                                                <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                                                <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                                                <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                                                <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                                                <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                                                <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                                            </ConverterSpecificSettings>
                                        </ConversionSettings>
                                    </Override>
                                    ');

                                                    ini_set('default_socket_timeout', 300);
                                                    set_time_limit ( 300 );

                                                    $result = $api_instance->convert($input_data);
                                                    file_put_contents('v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf' , 
                                                        base64_decode($result->getProcessedFileContent()) );


                                                    // original file backup move
                                                        $input_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/original/'.$attach_filesystem_hash.'.pdf';
                                                        $output_pdf = 'v4uploads/documents_filesystem/'.$accountid.'/'.$attach_filesystem_hash.'.pdf';
                                                        copy($input_pdf,$output_pdf);
                                                    // original file backup move

                                                }catch(Exception $e) {
                                                    $err_msg[$i] = 'fail';
                                                    continue;
                                                }
                                        }

                                        // Delete attachment msg 
                                        unlink($emailattchpath);

                                    }
                                    // Email with in email work end
                                }

                                $image_format = array("png", "jpg", "jpeg", "PNG", "JPG", "JPEG");
                                if (in_array($attach_ext, $image_format)) {
                                    // Delete attachment image 
                                    unlink($attachment_folder);
                                }

                                $attach_name = $attachment->getFilename();

                                $is_deleted = 0;
                                $ten_email_ten_email_id = $msginsert_result;

                                // if(strpos($headerval['content-disposition'], 'attachment') !== false){
                                    
                                if ($insert == true) {
                                    insertintodb_attachment( $db_conn, $attach_name, $is_deleted, $ten_email_ten_email_id, 
                                                        $attach_filesystem_hash, $attach_ext );
                                }
                                    
                                // }
                            }

                        }

                        $ii++;
                    }
                }


                // delete original files - "msg"
                unlink($path);

                // delete eml files
                unlink($emlpath);
        
                $err_msg[$i] = 'success';
                continue;

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }

        }else{
            $err_msg[$i] = 'fail';
            continue;
        }

        

    }else{

        // Document upload start

        $folder_path = 'v4uploads/documents_filesystem/'.$accountid;

        if (!file_exists($folder_path)) {
            if (mkdir($folder_path, 0777, true)) {

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }
        }


        // original file folder start
        $original_folder_path = 'v4uploads/documents_filesystem/'.$accountid.'/original';

        if (!file_exists($original_folder_path)) {
            if (mkdir($original_folder_path, 0777, true)) {

            }else{
                $err_msg[$i] = 'fail';
                continue;
            }
        }
        // original file folder end


        $uniqid = uniqid();
        $randid = mt_rand(100000, 999999);
        $strtotime = strtotime("now");

        $trimfilename1 = basename(str_replace(' ', '__', $original_file_name), '.'.$ext1);
        $trimfilename = preg_replace('/[^A-Za-z0-9]/', '_', $trimfilename1);

        $changed_filename = $trimfilename.'__'.$uniqid.'_'.$randid.'_'.$strtotime;

        $path = __DIR__."/".$original_folder_path."/".basename($changed_filename.'.'.$ext1);

        $allowed_formats_doc = array("png", "jpg", "jpeg","PNG", "JPG", "JPEG");

        if (move_uploaded_file($file_tmp, $path)){

            if (in_array($ext1, $allowed_formats_doc)){


                try {
                                                    sleep(3);
                                                    
                                                    $input_data->setSourceFileName($changed_filename.'.'.$ext1);
                                                    $input_data->setSourceFileContent(base64_encode(file_get_contents($original_folder_path."/".$changed_filename.'.'.$ext1)));
                                                    $input_data->setOutputFormat('PDF');
                                                    $input_data->setOverrideSettings('<Override>
                                                    <ConversionSettings>
                                                        <ConverterSpecificSettings type="ConverterSpecificSettings_MSG">
                                                            <ConvertAttachments>false</ConvertAttachments>
                                                            <IncludeAttachmentTypes></IncludeAttachmentTypes>
                                                            <PaperSize>Letter</PaperSize>
                                                            <HTMLScaleMode>FitWidthScaleImagesOnly</HTMLScaleMode>
                                                            <PlainTextLineBreaks>RemoveExtra</PlainTextLineBreaks>
                                                            <BestBodyMode>Default</BestBodyMode>
                                                            <EmailAddressDisplayMode>Name</EmailAddressDisplayMode>
                                                            <FromEmailAddressDisplayMode>NameAndAddress</FromEmailAddressDisplayMode>
                                                            <AttachmentMergeMode>Merge</AttachmentMergeMode>  
                                                            <DisplayAttachmentSummary>true</DisplayAttachmentSummary>
                                                            <BreakOnUnsupportedAttachment>false</BreakOnUnsupportedAttachment>
                                                            <BreakOnUnsupportedEmbeddedObject>false</BreakOnUnsupportedEmbeddedObject>
                                                            <EmbeddedObjectDisplayMode>InlineFitWidth</EmbeddedObjectDisplayMode>
                                                            <EmbeddedObjectIconDisplayMode>IconOnly</EmbeddedObjectIconDisplayMode>
                                                            <EmbeddedObjectScalePercentage>3.33</EmbeddedObjectScalePercentage>
                                                            <SentDateMissingDisplayMode></SentDateMissingDisplayMode>
                                                        </ConverterSpecificSettings>
                                                    </ConversionSettings>
                                                </Override>
                                                ');

                                                    ini_set('default_socket_timeout', 300);
                                                    set_time_limit ( 300 );

                                                    $result = $api_instance->convert($input_data);
                                                    file_put_contents($original_folder_path."/".$changed_filename.'.pdf' , 
                                                        base64_decode($result->getProcessedFileContent()) );

                                                    // original folder upload start
                                                    $input  = $original_folder_path."/".$changed_filename.'.pdf';
                                                    $output = $folder_path."/".$changed_filename.'.pdf';
                                                    copy($input,$output);
                                                    // original folder upload end

                                                    // delete original files - "png", "jpg", "jpeg","PNG", "JPG", "JPEG"
                                                    unlink($original_folder_path."/".$changed_filename.'.'.$ext1);

                                                }catch(Exception $e) {
                                                    $err_msg[$i] = 'fail';
                                                    continue;
                                                }


                // try {

                //     $doc1 = new PDFDoc();
                //     Convert::ToPDF($doc1, $original_folder_path."/".$changed_filename.'.'.$ext1);
                //     $doc1->Save($original_folder_path."/".$changed_filename.'.pdf', SDFDoc::e_linearized);
                //     $doc1->Close();

                // // original folder upload start
                //     $input  = $original_folder_path."/".$changed_filename.'.pdf';
                    // $output = $folder_path."/".$changed_filename.'.pdf';
                    // copy($input,$output);
                // original folder upload end

                //     // delete original files - "png", "jpg", "jpeg","PNG", "JPG", "JPEG"
                //     unlink($original_folder_path."/".$changed_filename.'.'.$ext1);

                // }catch(Exception $e) {

                //     // $arrayName = array('status' => 'fail', 'message'=> $e->getMessage(), 'custom_message' => 'doc image pdftron issue' );
                //     // echo json_encode($arrayName);
                //     //exit();
                //     $err_msg[$i] = 'fail';
                //     continue;

                // }              

            }

            $doc_formats_doc = array("docx", "xlsx", "csv", "doc","xls","docm","xlsm","pdf","DOCX", "XLSX", "CSV", "DOC","XLS","DOCM","XLSM","PDF");

            if (in_array($ext1, $doc_formats_doc)){
                // original folder upload start
                $input = $original_folder_path."/".$changed_filename.'.'.$ext1;
                $output  = $folder_path."/".$changed_filename.'.'.$ext1;
                copy($input,$output);
                // original folder upload end
            }

            $doc_name = $original_file_name;
            $is_deleted = 0;
            $created_at = date('Y-m-d H:i:s');
            $accountid = $accountid;
            $addedby_id = $userid;
            $addedby_name = $username;
            $category = $category;
            $dragname = $drag_filename;
            $filesystem_hash = $changed_filename;
            $drag_drop_tagname = $drag_tagname;
            $drag_drop_tagcolor = $drag_colorpick;

            $err_msg[$i] = insertintodb_document( $db_conn, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $dragname, $filesystem_hash, $drag_drop_tagname, $drag_drop_tagcolor, $ext1 );

        }else{
            $err_msg[$i] = 'fail';
            continue;
        }

        // Document upload End
    }

}
    
    $upload_fail = [];
    $upload_success = [];

    foreach ($err_msg as $err_msgkey => $err_msgvalue) {
        if ($err_msgvalue == 'fail') {
            $upload_fail[$err_msgkey] = 'fail';
        }else{
            $upload_success[$err_msgkey] = 'success';
        }
    }

    $arrayName = array('success' => count($upload_success), 'fail' => count($upload_fail) );
    echo json_encode($arrayName);

}


function insertintodb_attachment( $db_conn, $attach_name, $is_deleted, $ten_email_ten_email_id, $filesystem_hash, $extension ){

    $attach_name    = mysqli_real_escape_string($db_conn, $attach_name);
    $is_deleted     = mysqli_real_escape_string($db_conn, $is_deleted);
    $ten_email_ten_email_id  = mysqli_real_escape_string($db_conn, $ten_email_ten_email_id);
    $filesystem_hash = mysqli_real_escape_string($db_conn, $filesystem_hash);
    $extension = mysqli_real_escape_string($db_conn, $extension);

    $Insert = "INSERT INTO ten_email_attachment ( attach_name, is_deleted, ten_email_ten_email_id, filesystem_hash, extension ) values('".$attach_name."','".$is_deleted."','".$ten_email_ten_email_id."','".$filesystem_hash."','".$extension."' )";

    $res = mysqli_query($db_conn,$Insert);
}


function insertintodb_document( $db_conn, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $dragname, $filesystem_hash, $drag_drop_tagname, $drag_drop_tagcolor, $ext1 ){

    $doc_name       = mysqli_real_escape_string($db_conn, $doc_name);
    $is_deleted     = mysqli_real_escape_string($db_conn, $is_deleted);
    $created_at     = mysqli_real_escape_string($db_conn, $created_at);
    $accountid      = mysqli_real_escape_string($db_conn, $accountid);
    $addedby_id     = mysqli_real_escape_string($db_conn, $addedby_id);
    $addedby_name   = mysqli_real_escape_string($db_conn, $addedby_name);
    $category       = mysqli_real_escape_string($db_conn, $category);
    $dragname       = mysqli_real_escape_string($db_conn, $dragname);
    $filesystem_hash = mysqli_real_escape_string($db_conn, $filesystem_hash);
    $drag_drop_tagname = mysqli_real_escape_string($db_conn, $drag_drop_tagname);
    $drag_drop_tagcolor = mysqli_real_escape_string($db_conn, $drag_drop_tagcolor);
    $ext1 = mysqli_real_escape_string($db_conn, $ext1);

    $Insert = "INSERT INTO underwriter_documents ( doc_name, is_deleted, created_at, accountid, addedby_id, addedby_name, category, dragname, filesystem_hash, drag_drop_tagname, drag_drop_tagcolor, extension ) values('".$doc_name."','".$is_deleted."','".$created_at."','".$accountid."','".$addedby_id."','".$addedby_name."','".$category."','".$dragname."','".$filesystem_hash."','".$drag_drop_tagname."','".$drag_drop_tagcolor."','".$ext1."')";

    $res = mysqli_query($db_conn,$Insert);

    if ($res) {
        $result = 'success';
    }else{
        $result = 'fail';
    }

    return $result;
}



function insertintodb_msg( $db_conn, $addTo, $from_address_new, $addcc, $subject, $date_email, $is_delete, $accountid, $category, $username, $nomediaval, $filename, $colorpick, $colorpick_text, $is_drag_droped, $original_file_name, $ext, $inserted_date_time, $changed_filename ){

    $addTo = mysqli_real_escape_string($db_conn, $addTo);
    $from_address_new=mysqli_real_escape_string($db_conn, $from_address_new);
    $addcc = mysqli_real_escape_string($db_conn, $addcc);
    $subject=mysqli_real_escape_string($db_conn, $subject);
    $date_email=mysqli_real_escape_string($db_conn, $date_email);
    $is_delete=mysqli_real_escape_string($db_conn, $is_delete);
    // $Current_email_id=mysqli_real_escape_string($db_conn, $Current_email_id);
    // $child_id=mysqli_real_escape_string($db_conn, $child_id);
    $accountid=mysqli_real_escape_string($db_conn, $accountid);
    $category=mysqli_real_escape_string($db_conn, $category);
    // $crdate=mysqli_real_escape_string($db_conn, $crdate);
    $username=mysqli_real_escape_string($db_conn, $username);
    // $dragtype=mysqli_real_escape_string($db_conn, $dragtype);
    // $flag_status=mysqli_real_escape_string($db_conn, $flag_status);
    // $broker_email=mysqli_real_escape_string($db_conn, $broker_email);
    // $subcategory=mysqli_real_escape_string($db_conn, $subcategory);
    // $radioval=mysqli_real_escape_string($db_conn, $radioval);
    $nomediaval=mysqli_real_escape_string($db_conn, $nomediaval);
    $filename=mysqli_real_escape_string($db_conn, $filename);
    $colorpick=mysqli_real_escape_string($db_conn, $colorpick);
    $colorpick_text=mysqli_real_escape_string($db_conn, $colorpick_text);
    $is_drag_droped=mysqli_real_escape_string($db_conn, $is_drag_droped);
    $original_file_name=mysqli_real_escape_string($db_conn, $original_file_name);
    // $is_document_or_email=mysqli_real_escape_string($db_conn, $is_document_or_email);
    $ext=mysqli_real_escape_string($db_conn, $ext);
    $inserted_date_time=mysqli_real_escape_string($db_conn, $inserted_date_time);
    $changed_filename=mysqli_real_escape_string($db_conn, $changed_filename);


    $Insert = "INSERT INTO ten_email (to_email, from_email, cc_mail, subject_email, date_email, 
    is_deleted, assigned_id, assigned_stage, assigned_name, drag_drop_nomedia, drag_drop_filename, drag_drop_tagcolor, drag_drop_tagname, is_drag_droped, original_file_name, extension, inserted_date_time, filesystem_hash ) 
    values('".$addTo."','".$from_address_new."','".$addcc."','".$subject."','".$date_email."','".$is_delete."','".$accountid."','".$category."','".$username."','".$nomediaval."','".$filename."','".$colorpick."','".$colorpick_text."','".$is_drag_droped."','".$original_file_name."','".$ext."','".$inserted_date_time."','".$changed_filename."')";

        $res = mysqli_query($db_conn,$Insert);

        if ($res) {
            return mysqli_insert_id($db_conn);
        }else{
            return false;
        }
}


?>
