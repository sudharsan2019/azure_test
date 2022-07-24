<?php

// ini_set('display_errors', 1); 
// ini_set('display_startup_errors', 1); 
// error_reporting(E_ALL);

include("conn.php");

$rqbi_id = $_REQUEST['rqbi_id'];
$accountid = $_REQUEST['accid'];
$addedby_id = $_REQUEST['userid'];
$addedby_name = $_REQUEST['username'];

$value = $_REQUEST['value'];

if ($_REQUEST['value'] == 'quote') {
    $category = 29;
    $files[0] = 'QuotePackage_1';
    $files[1] = 'RatingWorksheet_quote';
}

if ($_REQUEST['value'] == 'bind') {
    $category = 25;
    $files[0] = 'BindPackage_1';
    $files[1] = 'RatingWorksheet_bind';
}

if ($_REQUEST['value'] == 'issue') {
    $category = 19;
    $files[0] = 'IssuePackage_1';
    $files[1] = 'RatingWorksheet_issue';
}

$is_deleted = 0;
$created_at = date('Y-m-d H:i:s');
$ext1 = 'pdf';


foreach ($files as $key => $filename) {

    $folder_path = 'v4uploads/documents_filesystem/'.$accountid;

    if (!file_exists($folder_path)) {
        if (mkdir($folder_path, 0777, true)) {

        }else{
            $arrayName = array('status' => 'fail', 'msg' => 'unable to create Folder' );
            echo json_encode($arrayName);
            exit();
        }
    }

    // original file folder start
    $original_folder_path = 'v4uploads/documents_filesystem/'.$accountid.'/original';

    if (!file_exists($original_folder_path)) {
        if (mkdir($original_folder_path, 0777, true)) {

        }else{
            $arrayName = array('status' => 'fail', 'msg' => 'unable to create Folder' );
            echo json_encode($arrayName);
            exit();
        }
    }
    // original file folder end


    $uniqid = uniqid();
    $randid = mt_rand(100000, 999999);
    $strtotime = strtotime("now");

    $val = select_rqbi_details( $db_conn, $rqbi_id, $accountid, $category, $filename );


    if($filename == 'QuotePackage_1'){
        $doc_name = 'Quote '.$val['total_count'].'.pdf';
    }

    if($filename == 'BindPackage_1'){
        $doc_name = 'Binder '.$val['total_count'].'.pdf';
    }

    if($filename == 'IssuePackage_1'){
        $doc_name = 'Policy.pdf';
    }

    if($filename == 'RatingWorksheet_quote' || $filename == 'RatingWorksheet_bind' || $filename == 'RatingWorksheet_issue'){
        $doc_name = 'Rating worksheet '.$val['total_count'].'.pdf';
    }

    
    
    $doc_name1 = $rqbi_id.'_'.$filename.'_Q'.$val['quote_version'].'_V'.$val['total_count'];

    $changed_filename = $doc_name1.'_'.$uniqid.'_'.$randid.'_'.$strtotime;




    // $input_pdf = $GLOBALS['doc_url'].'/pdfs/'.$rqbi_id.'_'.$filename.'.pdf';

    $input_pdf = $GLOBALS['doc_url'].'/pdfs/'.$rqbi_id.'_'.$_SERVER['SERVER_NAME'].'_'.$filename.'.pdf';
    $output_pdf = $original_folder_path."/".$changed_filename.'.pdf';
    $folder_path = $folder_path."/".$changed_filename.'.pdf';


    if (copy($input_pdf, $output_pdf)) {

        if (copy($input_pdf, $folder_path)) {

        }else{
            $err_msg[$key] = 'fail File cannot be moved to '.$folder_path;
            continue;
        }

        $result = insertintodb_document( $db_conn, $rqbi_id, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $changed_filename, $input_pdf, $ext1 ,$_REQUEST['value']);

        if ($result == 'success') {
            $err_msg[$key] = 'success Document Moved to Policy Folder';
            continue;
        }else{
            $err_msg[$key] = 'fail Not able to insert';
            continue;
        }
    }else{
        $err_msg[$key] = 'fail File cannot be moved to '.$original_folder_path;
            continue;
    }
}

echo json_encode($err_msg);


function insertintodb_document( $db_conn, $rqbi_id, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $changed_filename, $input_pdf, $ext1 ,$category_val){

    $doc_name       = mysqli_real_escape_string($db_conn, $doc_name);
    $is_deleted     = mysqli_real_escape_string($db_conn, $is_deleted);
    $created_at     = mysqli_real_escape_string($db_conn, $created_at);
    $accountid      = mysqli_real_escape_string($db_conn, $accountid);
    $addedby_id     = mysqli_real_escape_string($db_conn, $addedby_id);
    $addedby_name   = mysqli_real_escape_string($db_conn, $addedby_name);
    $category       = mysqli_real_escape_string($db_conn, $category);
    $changed_filename = mysqli_real_escape_string($db_conn, $changed_filename);
    $ext1 = mysqli_real_escape_string($db_conn, $ext1);


    if ($category_val != 'bind') {
        $sql_rqbid = "SELECT rid  
                      FROM acct_rqbi 
                      where acct_id = '$accountid' 
                      AND is_active = 1 
                      ORDER BY rid DESC LIMIT 1";
        $sql_rqbid_result = mysqli_query($db_conn, $sql_rqbid);

        $new_rqbid = mysqli_fetch_assoc($sql_rqbid_result);

        $rqbi_id = $new_rqbid['rid'];
    }
    

   $Insert = "INSERT INTO underwriter_documents ( doc_name, rqbid, is_deleted, created_at, accountid, addedby_id, addedby_name, category, filesystem_hash, docgen_pdf_url, extension ) values('".$doc_name."',".$rqbi_id.",'".$is_deleted."','".$created_at."','".$accountid."','".$addedby_id."','".$addedby_name."','".$category."','".$changed_filename."','".$input_pdf."','".$ext1."')";

    $res = mysqli_query($db_conn,$Insert);

    if ($res) {
        $result = 'success';
    }else{
        $result = 'fail';
    }

    return $result;
}


function select_rqbi_details( $db_conn, $rqbi_id, $accountid, $category, $filename ){

    $response = [''];
    $sql_check = "SELECT rid, quote_version FROM acct_rqbi where rid = $rqbi_id ";
    $result = mysqli_query($db_conn, $sql_check);

    while ( $fetch = mysqli_fetch_assoc($result) ){
        $response['quote_version'] = $fetch['quote_version'];
    }


    if($filename == 'QuotePackage_1'){
        $filename = 'Quote';
    }

    if($filename == 'BindPackage_1'){
        $filename = 'Binder';
    }

    if($filename == 'IssuePackage_1'){
        $filename = 'Policy';
    }

    if($filename == 'RatingWorksheet_quote' || $filename == 'RatingWorksheet_bind' || $filename == 'RatingWorksheet_issue'){
        $filename = 'Rating worksheet';
    }


    $sql_check1 = "SELECT count(*) AS total_count  
                  FROM underwriter_documents 
                  where accountid = '$accountid' 
                  AND category = '$category' 
                  AND is_deleted = 0 
                  AND doc_name LIKE '%$filename%'";
    $result1 = mysqli_query($db_conn, $sql_check1);

    while ( $fetch1 = mysqli_fetch_assoc($result1) ){
        $response['total_count'] = $fetch1['total_count']+1;
    }

    return $response;

}

?>