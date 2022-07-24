<?php

// ini_set('display_errors', 1); 
// ini_set('display_startup_errors', 1); 
// error_reporting(E_ALL);

include("conn.php");

$rqbi_id = $_REQUEST['rqbi_id'];
$accountid = $_REQUEST['accid'];
$addedby_id = $_REQUEST['userid'];
$addedby_name = $_REQUEST['username'];
$uuid = $_REQUEST['uuid'];
$host = $_REQUEST['host'];
$category = 35;

$is_deleted = 0;
$created_at = date('Y-m-d H:i:s');
$ext1 = 'docx';
$filename = 'Risk_Evaluation';

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

$doc_name = 'Risk evaluation '.$val['total_count'].'.docx';
$doc_name1 = $rqbi_id.'_'.$filename.'_Q'.$val['quote_version'].'_V'.$val['total_count'];

$changed_filename = $doc_name1.'_'.$uniqid.'_'.$randid.'_'.$strtotime;


$output_pdf = $original_folder_path."/".$changed_filename.'.docx';

$folder_path1 = $folder_path."/".$changed_filename.'.docx';


// $get_riskevaluation_doc = get_riskevaluation_doc($_SERVER['SERVER_NAME'],$GLOBALS['doc_url']);


$riskeval_doc = base64_decode(get_riskevaluation_doc($_SERVER['SERVER_NAME'],$GLOBALS['doc_url'],$rqbi_id, $uuid,$accountid));

if (file_put_contents($folder_path1,$riskeval_doc)) {

    if (file_put_contents($output_pdf,$riskeval_doc)) {

    }else{
        $arrayName = array('status'=>'fail','msg'=>'File cannot be moved1 to '.$output_pdf );
        echo json_encode($arrayName);
        exit();
    }

    $result = insertintodb_document( $db_conn, $rqbi_id, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $changed_filename, $ext1 );

    if ($result == 'success') {
        $arrayName = array('status'=>'success','msg'=>'Document Moved to Policy Folder', 'folder_path1'=>$folder_path1, 
            'output_pdf'=>$output_pdf  );
        echo json_encode($arrayName);
        exit();
    }else{
        $arrayName = array('status'=>'fail','msg'=>'Not able to insert' );
        echo json_encode($arrayName);
        exit();
    }
}else{
    $arrayName = array('status'=>'fail','msg'=>'File cannot be moved to '.$folder_path1 );
    echo json_encode($arrayName);
    exit();
}




function insertintodb_document( $db_conn, $rqbi_id, $doc_name, $is_deleted, $created_at, $accountid, $addedby_id, $addedby_name, $category, $changed_filename, $ext1 ){

    $doc_name       = mysqli_real_escape_string($db_conn, $doc_name);
    $is_deleted     = mysqli_real_escape_string($db_conn, $is_deleted);
    $created_at     = mysqli_real_escape_string($db_conn, $created_at);
    $accountid      = mysqli_real_escape_string($db_conn, $accountid);
    $addedby_id     = mysqli_real_escape_string($db_conn, $addedby_id);
    $addedby_name   = mysqli_real_escape_string($db_conn, $addedby_name);
    $category       = mysqli_real_escape_string($db_conn, $category);
    $changed_filename = mysqli_real_escape_string($db_conn, $changed_filename);
    $ext1 = mysqli_real_escape_string($db_conn, $ext1);


    $sql_rqbid = "SELECT rid  
                  FROM acct_rqbi 
                  where acct_id = '$accountid' 
                  AND is_active = 1 
                  ORDER BY rid DESC LIMIT 1";
    $sql_rqbid_result = mysqli_query($db_conn, $sql_rqbid);

    $new_rqbid = mysqli_fetch_assoc($sql_rqbid_result);

    $rqbi_id = $new_rqbid['rid'];
    
   $Insert = "INSERT INTO underwriter_documents ( doc_name, rqbid, is_deleted, created_at, accountid, addedby_id, addedby_name, category, filesystem_hash, extension ) values('".$doc_name."',".$rqbi_id.",'".$is_deleted."','".$created_at."','".$accountid."','".$addedby_id."','".$addedby_name."','".$category."','".$changed_filename."','".$ext1."')";

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

    if($filename == 'Risk_Evaluation'){
        $filename = 'Risk evaluation';
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



function get_riskevaluation_doc($servername, $doc_url, $rqbi_id, $uuid, $accountid){

    if( $servername == 'localhost' ){
        $quote_doc_url = $doc_url.'/docgen/var/www/docgen/qdoc_master_risk_evaluation.php?rqbi_id='.$rqbi_id.'&uuid='.$uuid.'&host='.$servername.'&acctid='.$accountid;
        // https://asicbpdpr.esinsurancecloud.com/docgen/risk_package_useful.php?rqbi_id=2290&uuid=0a24ee11-c614-4328-9576-deb603c7631c&host=ategrity-devbgl.esinsurancecloud.com&policy_status=issue&acctid=1185
    }else{
        $quote_doc_url = $doc_url.'/docgen/qdoc_master_risk_evaluation.php?rqbi_id='.$rqbi_id.'&uuid='.$uuid.'&host='.$servername.'&acctid='.$accountid;
    }

    $postdata = [''];
    
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => $quote_doc_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_POSTFIELDS => $postdata,
    ));

    $response = curl_exec($curl);

    // if (curl_errno($curl)) {
    //     echo $error_msg = curl_error($curl);
    // }

    curl_close($curl);
    return $response;
}


?>