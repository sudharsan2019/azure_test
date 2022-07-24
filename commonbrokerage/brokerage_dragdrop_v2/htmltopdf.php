<?php 
session_start();
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);
include("conn.php");
require_once(__DIR__ . '/final_muhumbi/client/autoload.php');

$api_key = $GLOBALS['MUHIMBI_PDF_KEY'];

 
MuhimbiPDFOnline\Client\Configuration::getDefaultConfiguration()->setApiKey('api_key', $api_key);
MuhimbiPDFOnline\Client\Configuration::getDefaultConfiguration()->setHost('https://api.muhimbi.com/api');
$api_instance = new MuhimbiPDFOnline\Client\Api\ConvertApi();
$input_data = new MuhimbiPDFOnline\Client\Model\ConvertData();

$action = $_POST['action'];

if($action == 'createHtmlFile'){

$data = '';
    
    $user_name = $_POST['userhtp'];
    $user_id = $_POST['userhtpid'];
    $account_name = $_POST['account_name'];
    $ac_lob = $_POST['ac_lob'];
    //$majesco_id = $_POST['majesco_id'];
    $ac_mailAdd_zip = $_POST['ac_mailAdd_zip'];
    $ac_mailAdd_state = $_POST['ac_mailAdd_state'];
    $ac_mailAdd_city = $_POST['ac_mailAdd_city'];
    $limits = $_POST['limits'];
    $classCode = $_POST['classCode'];
    $classCode_len = intval($_POST['classCode_len']);
    $exposure = $_POST['exposure'];
    $effect_dt = $_POST['effect_dt'];
    $accid = $_POST['accid'];
    $get_Ccode = $_POST['get_Ccode'];
    $get_pc = $_POST['get_pc'];
    $get_lc = $_POST['get_lc'];
    $get_lcm = $_POST['get_lcm'];
    $get_br = $_POST['get_br'];
    $get_ilf = $_POST['get_ilf'];
    $get_abr = $_POST['get_abr'];
    $get_premium = $_POST['get_premium'];
    $total_premium = $_POST['total_premium'];
    $territory_code = $_POST['territory_code'];
    $exposure_basis = $_POST['exposure_basis'];
    $territory_code_expl = explode('&&', $territory_code);
    $exposure_basis_expl = explode('&&', $exposure_basis);      
    $classCode_expl = explode('&&',$classCode);
    $exposure_expl = explode('&&',$exposure);
    $getCcode_expl = explode('&&',$get_Ccode);
    $getpc_expl = explode('&&',$get_pc);
    $getlc_expl = explode('&&',$get_lc);
    $getlcm_expl = explode('&&',$get_lcm);
    $getbr_expl = explode('&&',$get_br);
    $getilf_expl = explode('&&',$get_ilf);
    $getabr_expl = explode('&&',$get_abr);
    $getpremium_expl = explode('&&',$get_premium);
    $classCode_data = '';
    $exposure_data = '';
    $sublist_data = '';
    $sublisthead_data = '';

    $sublisthead_data.= "
   
        <div class='col-md-12 pull-left'>
                        <p>Rating algorithm displays here per class code, displays rate(s), prem/prod combined</p>
                        <table class='table table-responsive-sm table-bordered text-center mb-0 ratingTbl'>
                            <thead>
                                <tr>
                                    <th>PC</th>
                                    <th>LC</th>
                                    <th>LCM</th>
                                    <th>BR</th>
                                    <th>ILF</th>
                                    <th>ABR</th>
                                    <th>Premium</th>
                                </tr>
                            </thead>"; 


                            $total_length = $classCode_len * 2; 

                            $j = 0;    
      
        foreach ($classCode_expl as $key => $value) {

                        $territory_code = preg_replace('/[^0-9]/', '', $territory_code_expl[$key]);
                        $exposure_basis = substr($exposure_basis_expl[$key],9);

          $classCode_data.=  '
             <div class="row col-md-12">
                    <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Class Code</label>            
             <input type="text" class="form-control" id="class_code" name="class_code" value="'.htmlspecialchars($value).'">  
             </div>
             </div>

             <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Territory Code</label>           
             <input type="text" class="form-control" id="territory_code" name="territory_code" value="'.$territory_code.'">  
             </div>
             </div>

             <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Exposure Basis</label>           
             <input type="text" class="form-control" id="exposure_basis" name="exposure_basis" value="'.$exposure_basis.'">  
             </div>
             </div>

             <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Exposure</label>       
             <input type="text" class="form-control" id="exposure" name="exposure" value="'.htmlspecialchars($exposure_expl[$key]).'">  
             </div>
             </div>  
             </div>';
            
            $classCode_data .= $sublisthead_data;
            for($i = 0; $i < 2; $i++){

              $classCode_data.=  '
               
               <tbody>
               <tr>
               <td>'.$getpc_expl[$j].'</td>
               <td>'.$getlc_expl[$j].'</td>
               <td>'.$getlcm_expl[$j].'</td>
               <td>'.$getbr_expl[$j].'</td>
               <td>'.$getilf_expl[$j].'</td>
               <td>'.$getabr_expl[$j].'</td>
               <td>'.$getpremium_expl[$j].'</td>
               </tr>
               </tbody>'; 

               ++$j;      

            }

              $classCode_data .= '</table><br></div>';
             
          }
           
       $data.= '
                 
      <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <style type="text/css">
            .mainWrap {
                float: none;
                margin: 0 auto;
            }
            .effecDate.input-group-addon {
                padding: 6px 12px;
                font-size: 14px;
                font-weight: 400;
                color: #555;
                text-align: center;
                background-color: #eee;
                border: 1px solid #e4e6eb;
                border-radius: 4px;
                cursor: pointer;
                border-top-left-radius: unset!important;
                cursor: pointer;
                border-bottom-left-radius: unset!important;
                border-left: unset;
            }
            .ratingTbl th {
                 background: #f4f4f4;
            }
            .ratingTbl th, .ratingTbl tbody tr td {
                padding: 4px!important;
                font-size: 14px;
            }
        </style>
    </head>
       <br><br>
       <div class="container">
            <div class="col-md-10 mainWrap">
                <div class="row col-md-12">
                    <div class="col-md-9 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Account Name</label>              
                            <input type="text" class="form-control" id="ac_tname" name="ac_name" value="'.$account_name.'">       
            </div>
      </div>
      <div class="form-group col-md-3 pr-0 mb-1 pull-left pl-0">
                        <label class="col-sm-12 col-form-label pl-0">LOB</label>
                        <div class="col-sm-12 pl-0">
                <input type="text" class="form-control" id="ac_tname" name="ac_name" value="'.$ac_lob.'">  
            </div>
      </div>
    </div>
    <div class="row col-md-12">
                    <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">City</label>
             <input type="text" class="form-control" id="ac_tname" name="ac_name" value="'.$ac_mailAdd_city.'"> 
          </div>
      </div>
       <div class="form-group col-md-3 pr-0 mb-1 pull-left pl-0">
                        <label class="col-sm-12 col-form-label">State</label>
                        <div class="col-sm-12">
          <input type="text" name="ac_mailAdd_state" id="ac_mailAdd_state" class="form-control city_name_hide1 bg-white" value="'.$ac_mailAdd_state.'">
        </div>
      </div>
        <div class="col-md-3 pull-left">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Zip</label>
            <input type="text" name="ac_mailAdd_zip" id="ac_mailAdd_zip" maxlength="5" class="form-control" value="'.$ac_mailAdd_zip.'">
          </div>
      </div>
    </div>
    <div class="row col-md-12">
                    <div class="form-group col-md-3 pr-0 mb-1 pull-left pl-0">
                        <label class="col-sm-12 col-form-label">Limits</label>
                        <div class="col-sm-12">
            <input type="text" name="effective_dt" id="effective_dt" class="form-control ac_mailAdd_zip" autocomplete="data-off" value="'.$limits.'">
          </div>
      </div>
     <div class="form-group col-md-3 pull-right">
                        <label class="col-sm-12 col-form-label pl-0">Effective Date</label>
                        <div class="input-group date mb-3">
            <input type="text" name="effective_dt" id="effective_dt" class="form-control ac_mailAdd_zip" autocomplete="data-off" value="'.$effect_dt.'">
            </div>
      </div>
    </div>';
   $data .= $classCode_data;
   $data .= '<div class="col-md-4 pull-left pt-4">
                        <div class="form-group">
                            <label class="col-sm-12 col-form-label pl-0">Indicated Premium</label>
            <input type="text" name="indicated_premium" id="indicated_premium" class="form-control" autocomplete="data-off" value="'.$total_premium.'">
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>';

    $cur_date = date('Y-m-d');
    $cur_date = date('m-d-Y',strtotime($cur_date));
    $cur_date_up = date("m/d/Y");

    $pdf_name = '';
    $submission_number = 'Indication1-'.$total_premium.'-'.$cur_date;
    $submission_number_up = 'Indication1-'.$total_premium.'-'.$cur_date_up;
    $sql_check = "select pdfname from ten_pdfhistory where accountid='".$accid."' order by id DESC limit 0,1";
    $result = mysqli_query($db_conn, $sql_check);
    while($fetch = mysqli_fetch_assoc($result)){

         $pdf_name=$fetch['pdfname'];
    }
    
  
    if($pdf_name!=''){
         
             $pdf_name_expl = explode('-',$pdf_name);
             $pdf_name_expl = $pdf_name_expl[0];
             $pdf_name_subs =  substr($pdf_name_expl,10);
             $pdf_name_subs = intval($pdf_name_subs) + 1;
             $submission_number = 'Indication'.$pdf_name_subs.'-'.$total_premium.'-'.$cur_date;
             $submission_number_up = 'Indication'.$pdf_name_subs.'-'.$total_premium.'-'.$cur_date_up;

  }              

  $file_name = $submission_number.'.html';

  $folder_path_html = $GLOBALS['HTML_TO_PDF_STORAGE_PATH'];

  if (!file_exists($folder_path_html)) {
            if (mkdir($folder_path_html, 0777, true)) {

            }
            else{
                $arrayName = array('status' => 'fail', 'message'=> 'Unable to Create Account Folder' );
                echo json_encode($arrayName);
                exit();
            }
  }
  $path =  $GLOBALS['HTML_TO_PDF_STORAGE_PATH'].$file_name;
  $res = file_put_contents($path, $data);

  $input_data->setSourceFileName($file_name);
  $input_data->setSourceFileContent(base64_encode(file_get_contents($GLOBALS['HTML_TO_PDF_STORAGE_PATH'].$file_name)));
  $input_data->setOutputFormat('PDF');

  ini_set('default_socket_timeout', 300);
  set_time_limit ( 300 );


    try { 
       
          $result = $api_instance->convert($input_data);
          file_put_contents($GLOBALS['HTML_TO_PDF_STORAGE_PATH'].$result->getBaseFileName().".pdf" , base64_decode($result->getProcessedFileContent()));

        $sql_insert ="insert into ten_pdfhistory (image_preview,pdfname,accountid) values ('','".$submission_number_up."','".$accid."')";
        $res_insert = mysqli_query($db_conn, $sql_insert);

        if($res_insert){

                
                $last_id = mysqli_insert_id($db_conn);
                $acc_rep_id = '';
                $sql_get_quick_report_id = "select acc_rep_id from accounts_quickcode_report where account_id='".$accid."' order by acc_rep_id DESC limit 0,1";
                $result_uniq_id = mysqli_query($db_conn, $sql_get_quick_report_id);
                while($fetch_unique_id = mysqli_fetch_assoc($result_uniq_id)){

                     $acc_rep_id=$fetch_unique_id['acc_rep_id'];
                }

                $sql_insert_pdf_id ="update accounts_quickcode_report set pdf_id='$last_id' where account_id='$accid' and acc_rep_id='$acc_rep_id'";
                $res_insert_pdf_id = mysqli_query($db_conn, $sql_insert_pdf_id);

        }

        

        $trimfilename1 = basename(str_replace(' ', '__', $submission_number), '.'.'.pdf');
        $trimfilename = preg_replace('/[^A-Za-z0-9]/', '_', $trimfilename1);

        $uniqid = uniqid();
        $randid = mt_rand(100000, 999999);
        $strtotime = strtotime("now");
        $changed_filename = $trimfilename.''.$uniqid.''.$randid.'_'.$strtotime;

        $folder_path = $GLOBALS['HTML_TO_PDF_PATH_POLICY_FILE'].$accid;

        if (!file_exists($folder_path)) {
            if (mkdir($folder_path, 0777, true)) {

            }else{
                $arrayName = array('status' => 'fail', 'message'=> 'Unable to Create Account Folder' );
                echo json_encode($arrayName);
                exit();
            }
        }
        file_put_contents($folder_path.'/'.$changed_filename.".pdf" , base64_decode($result->getProcessedFileContent()));


        $original_folder_path = $GLOBALS['HTML_TO_PDF_PATH_POLICY_FILE'].$accid.'/original';

        if (!file_exists($original_folder_path)) {
            if (mkdir($original_folder_path, 0777, true)) {

            }else{
                $arrayName = array('status' => 'fail', 'message'=> 'Unable to Create Account original Folder' );
                echo json_encode($arrayName);
                exit();
            }
        }

        file_put_contents($original_folder_path.'/'.$changed_filename.".pdf" , base64_decode($result->getProcessedFileContent()));

        

        $sql_insert_underwriter = "insert into underwriter_documents (doc_name,accountid,addedby_id,category,filesystem_hash,extension,archive_restore,is_deleted,addedby_name) values('".$submission_number."','".$accid."','".$user_id."','5','".$changed_filename."','pdf','1',0,'".$user_name."')";

        $res_insert_underwriter = mysqli_query($db_conn, $sql_insert_underwriter);

        if($res_insert){

             $status = '1';
             unlink($GLOBALS['HTML_TO_PDF_STORAGE_PATH'].$file_name);
        }
        else{

             $status = '0';
        }
        
        echo json_encode(array('status'=>$status,'msg'=>$sql_insert,'path'=>$path));  
        exit;
    } catch (Exception $e) {

        $error = 'Exception when calling API: '.$e->getMessage();
        
        $status = '0';
        
        echo json_encode(array('status'=>$status,'msg'=>$error,'path'=>$path));

    }  

}

?>