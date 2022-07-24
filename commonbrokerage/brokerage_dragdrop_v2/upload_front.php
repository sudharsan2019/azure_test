<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

ini_set('upload-max-filesize', '10M');
ini_set('post_max_size', '10M');

include("conn.php");

$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
$site_url =  $protocol."://".$_SERVER['SERVER_NAME'];

if(!empty($_FILES)){ /* MOVE FILE TO YOUR PREFERRED DIRECTORY */

    $fileName = $_FILES['file']['name'];

    $ext = pathinfo($fileName, PATHINFO_EXTENSION);

    // $category = $_REQUEST['category'];
    // $dragname = $_REQUEST['dragname'];
    // $dragtype = $_REQUEST['dragtype'];
    // $accountid = $_REQUEST['accountid'];
    // $userid = $_REQUEST['userid'];
    // $username = $_REQUEST['username'];

    $is_delete = '0';
    $Current_email_id = '0';

    $crdate = date('Y-m-d H:i:s');

        //Msg Format I Outlook
        if($ext =='msg'){  // Msg Format

           // echo $ext;
                //  if($tab_name == 'email'){
                //     $majesco_transaction_id = $majesco_response->transactionid;
                // }
                // else{

                //     $majesco_transaction_id =  "0";
                // }

                /** MSG to EML Converted Formart Code Start Here Azhar 29-11-2019**/
                 //   $d = date('mdyhis');
                    $six_digit_random_number = mt_rand(100000, 999999);

                /** MSG to EML Converted Formart Code Start Here Azhar 29-11-2019**/
                    $d = date('mdyhis').'_'.$six_digit_random_number;
                    $file_name = $_FILES['file']['name'];
                    $file_size =$_FILES['file']['size'];
                    $file_tmp =$_FILES['file']['tmp_name'];
                    $file_type=$_FILES['file']['type'];

                    //$file_name = str_replace(' ', '_', $file_name);
                    $file_name = "test$d.msg";

                    // $get_upload_name =  explode('.msg', $file_name);
                    // $eml_move_name = $get_upload_name[0];


         //$path = "/var/www/asic-dev/drag_email/Upload/".basename($file_name);

              // $path = __DIR__."/Upload/".basename($file_name);
              $path = "Upload/".basename($file_name);


                if($res = move_uploaded_file($file_tmp,$path)){
                        //echo "chl".$res;
                        $status= "File uploaded..";

                }else{
                        //echo "err".$res;
                      $status=  "Error on uploading...";
                }


// print_r($status);

// $file_open = __DIR__."/eml/test$d.eml";
//  //$handle = fopen("/var/www/asic-dev/drag_email/eml/test$d.eml", 'w');
//  $handle = fopen($file_open, 'w');


//$msg_to_eml_converted = "msgconvert --outfile /var/www/asic-dev/drag_email/eml/test$d.eml ".$path."";

$msg_to_eml_converted = "msgconvert --outfile ".__DIR__."/eml/test$d.eml ".$path;



// $msg_to_eml_converted = "python3 vendor/outlookmsgfile.py  < ".$path." > ".__DIR__."/eml/test$d.eml";


//print_r($msg_to_eml_converted);


//$msg_to_eml_converted = system('msgconvert --outfile test Testemailfromtenacitcs.msg');
$result_system = system($msg_to_eml_converted);


//Eml Format Converted to text format start here



 //$localFilename = "/var/www/asic-dev/drag_email/eml/test$d.eml";

 $localFilename = __DIR__."/eml/test$d.eml";
  //$localFilename = __DIR__."/eml/test_43126212.eml";


//echo "test$d";

// include("conn.php");

// echo "<pre>";

require_once __DIR__.'/vendor/autoload.php';


$emlpath = $localFilename;




$Parser = new PhpMimeMailParser\Parser();


// There are four methods available to indicate which mime mail to parse.
// You only need to use one of the following four:

// // 1. Specify a file path to the mime mail.
// $Parser->setPath($path);

// // 2. Specify a php file resource (stream) to the mime mail.
// $Parser->setStream(fopen($path, "r"));

// 3. Specify the raw mime mail text.
$Parser->setText(file_get_contents($emlpath));

// // 4.  Specify a stream to work with mail server
// $Parser->setStream(fopen("php://stdin", "r"));

// Once we've indicated where to find the mail, we can parse out the data
$to = $Parser->getHeader('to');             // "test" <test@example.com>, "test2" <test2@example.com>
$addressesTo = $Parser->getAddresses('to'); //Return an array : [["display"=>"test", "address"=>"test@example.com", false],["display"=>"test2", "address"=>"test2@example.com", false]]

$addTo = $addressesTo[0]['address'];

$from = $Parser->getHeader('from');             // "test" <test@example.com>
$addressesFrom = $Parser->getAddresses('from'); //Return an array : [["display"=>"test", "address"=>"test@example.com", "is_group"=>false]]

//$get_from = get_string_between($from, '<', '>');
$get_from = str_replace('<>', '', $from);
$crt_from = str_replace('"', '', $get_from);
$from_address_new = $addressesFrom[0]['display'];



$subject = $Parser->getHeader('subject');

 $text = $Parser->getMessageBody('text');

  $broker_email = get_recent_email($text);

$html = $Parser->getMessageBody('html');

$htmlEmbedded = $Parser->getMessageBody('htmlEmbedded'); //HTML Body included data

$stringHeaders = $Parser->getHeadersRaw();      // Get all headers as a string, no charset conversion
$arrayHeaders = $Parser->getHeaders();          // Get all headers as an array, with charset conversion

// Pass in a writeable path to save attachments
$attach_dir = 'attachments/';   // Be sure to include the trailing slash
$include_inline = true;                         // Optional argument to include inline attachments (default: true)
//$Parser->saveAttachments($attach_dir ,[$include_inline]);

// Get an array of Attachment items from $Parser
$attachments = $Parser->getAttachments([$include_inline]);

$date_email=date("Y-m-d h:i:s", strtotime(($Parser->getHeader('date'))));


//$date_email = date("Y-m-d h:i:s");
$subject = str_replace(',', ',', $subject);

$to_add = mysqli_real_escape_string($db_conn, $addTo);
$content1 = mysqli_real_escape_string($db_conn, $text);
$subject1=mysqli_real_escape_string($db_conn, $subject);
$from_address_new1=mysqli_real_escape_string($db_conn, $from_address_new);
$date_email1=mysqli_real_escape_string($db_conn, $date_email);
$is_delete1=mysqli_real_escape_string($db_conn, $is_delete);
$Current_email_id1=mysqli_real_escape_string($db_conn, $Current_email_id);
$broker_email1=mysqli_real_escape_string($db_conn, $broker_email);
//[""]


    $Insert = "INSERT INTO ten_email (to_email,from_email, cc_mail, subject_email, body_email, date_email, is_deleted, parentemailid, child_id, flag_status, broker_email) values('".$to_add."','".$from_address_new1."','[\"\"]','".$subject1."','".$content1."','".$date_email1."','".$is_delete1."','".$Current_email_id1."','0','3','".$broker_email1."')";

$res = mysqli_query($db_conn,$Insert);

if($res){

    // echo "raj inserted ";

        //print_r($res);
        $last_id = mysqli_insert_id($db_conn);
        //upated ParentEmail 
        // $select = "select child_id from ten_email where ten_email_id = '".$Current_email_id."'";
        // $res_select =  mysqli_query($db_conn,$select);


        // $update_parenet = "Update ten_email SET child_id = '[\"$last_id\"]'  where ten_email_id = '".$Current_email_id."'";
        // $updates_email = mysqli_query($db_conn,$update_parenet);
		$date_email1=mysqli_real_escape_string($db_conn, $date_email);
		$last_id1=mysqli_real_escape_string($db_conn, $last_id);
        $emil_exract_insert = "INSERT INTO ten_email_extract (submission_date,ten_email_ten_email_id)
                        values('".$date_email1."','".$last_id1."')";

        $res_emil_exract = mysqli_query($db_conn,$emil_exract_insert);
}
$hp = 'filename:protected';
// echo "attache";
//  Loop through all the Attachments

$msgtext_2 = "";
$msgtext2_subject = "";

if (count($attachments) > 0) {
        foreach ($attachments as $attachment) {
        $ex_var = $attachment->getheaders();


        if ($ex_var['content-disposition'] == 'inline') {

        }else{



            if ($ex_var['content-type'] == 'message/rfc822' || $ex_var['content-type'] == 'message/RFC822') {

                    $ParserAttachedMessage = new PhpMimeMailParser\Parser();


                    $withinattachment = $ParserAttachedMessage->setText($attachment->getContent());

                   echo "MSG BoDY inner One<br> ";
                     $msgtext_2 = $ParserAttachedMessage->getMessageBody('text');
                    $msgtext2_subject = $ParserAttachedMessage->getHeader('subject');
                   //var_dump($msgtext_2);
                   echo "subject headers2<pre>";
                   print_r($msgtext2_subject);

                    echo "========================<br/>";

            }

        // $exp = $ex_var['content-id'];
        $exp = 'base64';

        $mime = $attachment->getMimePartStr();

        print_r($mime);
         $m_Subject = preg_grep('/^Subject:\s.*/', $mime);

         echo "from subject start";

         echo "<pre>";
         print_r($m_Subject);
         echo "from subject End";


         echo "get inner email test<br>";
         // var_dump($mime);
        $get_email =  $attachment->getContent();
        print_r($get_email);

        echo "#############################";

        // echo "<br>get inner email test";
        $base64 = explode($exp, $mime);

        $base64 = $base64['1'];
// print_r($base64);

        $base64 = preg_split("#\n\s*\n#Uis", $base64);
       // echo "Insertbase64<pre>";
        // print_r($base64);

                $fn= 'Filename : '.$attachment->getFilename().'<br />'; // logo.jpg
                // $fs=  'Filesize : '.filesize($attach_dir.$attachment->getFilename()).'<br />'; // 1000
                $ft= 'Filetype : '.$attachment->getContentType().'<br />'; // image/jpeg
                $fm= 'MIME part string : '.$attachment->getMimePartStr().'<br />'; // (the whole MIME part of the attachment)

				$attachment_name=mysqli_real_escape_string($db_conn, $attachment->getFilename());
				$base_64=mysqli_real_escape_string($db_conn, $base64[1]);
				$last_id1=mysqli_real_escape_string($db_conn, $last_id);

        

          if ($msgtext_2 != '') {
              $base_64 = base64_encode(nl2br($msgtext_2));
          }else{
              $base_64=mysqli_real_escape_string($db_conn, $base64[1]);
          }
          

          $haystack = "noname noname1 noname2 noname3 noname4 noname5 noname6 noname7 noname8 noname9";

          if( strpos( $haystack, $attachment_name ) !== false) {
              $attachment_name = $msgtext2_subject.".html";
          }else{
              $attachment_name = $attachment_name;
          }

				
                 $ten_email_attachment_insert = "INSERT INTO ten_email_attachment (attach_name,attach_blob,ten_email_ten_email_id)
                        values('".$attachment_name."','".$base_64."','".$last_id1."')";

        $res_ten_email_attachment = mysqli_query($db_conn,$ten_email_attachment_insert);
      }
        }
}
                /** MSG to EML Converted Formart Code End Here Azhar 29-11-2019**/

        unlink($path);
        unlink($emlpath);


        }
        else{   
            echo "fail";
        }

}



function get_recent_email($string)
    {
	$matches = array();
    $pattern = '/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/';
    preg_match_all($pattern, $string, $matches);
    $neaterArray = array_values(array_unique($matches[0]));
    if(count($neaterArray) == 0) 
     $br_email=null;
    else
    $br_email=$neaterArray[0];
	return $br_email;
    }



?>
