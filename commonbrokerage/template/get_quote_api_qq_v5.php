 <?php

include('../config.php');

 try {
        $term = $_REQUEST['term'];
        $effective_datee = $_REQUEST['effective_date'];
        
        if($term==6){
          $months = '+6 months';
        }else{
          $months = '+12 months';
        }
        
        $arr = explode('-', $effective_datee);
        $effective_date = $arr[1].'-'.$arr[0].'-'.$arr[2];
        $expiry_date = date('Y-m-d', strtotime($months, strtotime($effective_date)));
        $effective_date = strtotime($effective_date);
        $expiry_date = strtotime($expiry_date);
        $datediff = $expiry_date - $effective_date;
        $policydaycheck=round($datediff / (60 * 60 * 24));
        
        if($policydaycheck >= 365){
          $policy_days = 365;
        }else{
          $policy_days = $policydaycheck;
        }
        
        $class_code_json = json_decode($_REQUEST['class_code_json']);
        $zip_code_json = json_decode($_REQUEST['zip_code_json']);
        $exposure_json = json_decode($_REQUEST['exposure_json']);
        $city_json = json_decode($_REQUEST['city_json']);
        $location = json_decode($_REQUEST['location_no']);
        $loc_len = count($location);
        $l_array = [];
        $limits = $_REQUEST['limits']; 
        $GLOBALS['res'] = [];
        $overage = json_decode($_REQUEST['coverage']);

        for($i=0;$i<$loc_len;$i++)
        {
         $zip_code = $zip_code_json[$i];
         $class_code = $class_code_json[$i];
         $exposure = $exposure_json[$i];
         $class_location_no = $i+1;
         $city = $city_json[$i];
         $location_no =$location[$i];
         $overage_no =$overage[$i];

         if($overage_no==1){
          $ccoverage='CGL,PCO';
         }elseif($overage_no==2){
          $ccoverage='LLL';
         }else{
          $ccoverage='OCP';
         }

         $exposure = str_replace(',', '', $exposure);
         $exposure = str_replace('$', '', $exposure);

            switch ($limits) {

                case '1221':
                $occurance = 1000000;
                $aggregate = 2000000;
                break;  

                case '2442':
                $occurance = 2000000;
                $aggregate = 4000000;
                break;

                case '1331':
                $occurance = 1000000;
                $aggregate = 3000000;
                break;

                case '1441':
                $occurance = 1000000;
                $aggregate = 4000000;
                break;

                case '2222':
                $occurance = 2000000;
                $aggregate = 2000000;
                break;

                case '2332':
                $occurance = 2000000;
                $aggregate = 3000000;
                break;
              
                default:
                $occurance = 1000000;
                $aggregate = 2000000;
                break;
            }

            if($ccoverage == 'LLL'){
              $occurance = 1000000;
              $aggregate = 1000000;
            }elseif($ccoverage == 'OCP'){
              $occurance = 1000000;
              $aggregate = 2000000;
            }else{
              $occurance = $occurance;
              $aggregate = $aggregate;
            }
         
        
        $deduct = 1;

        $fetch_county=get_city_data($zip_code,$city);
        
        $county=$fetch_county[0]['us_county'];
        $state=$fetch_county[0]['us_state'];
        $check_state=['AK','AL','AR','AZ']; 
        
        $Version = $GLOBALS['Rating_version'];

          if($deduct!=''){

            if($deduct == 1){
                $deduct = 1.0;
              }
            else{
                $deduct = str_replace(',', '', $deduct);
                $deduct = ((100 - $deduct) / 100);
                $deduct = $deduct;
                $deduct = str_replace('-', '', $deduct);
            }
        }
        
        $smfactor = 1.0;
       
          $postfields ="{\n  \"ClassCode\":\"$class_code\",\n  \"ZipCode\":\"$zip_code\",\n  \"City\":\"$city\",\n  \"County\":\"$county\",\n  \"State\":\"$state\",\n  \"Aggregate\":$aggregate,\n  \"Occurrence\":$occurance,\n  \"Coverages\":\"$ccoverage\",\n  \"DeductFactor\":$deduct,\n  \"Exposure\":$exposure,\n  \"PolicyDays\": $policy_days,\n  \"Version\":\"$Version\",\n \"SMFactor\":\"$smfactor\" \n}"; 
       
        $header = array(
            "Accept: application/json",
            "Cache-Control: no-cache",
            "Content-Type: application/json",
          );

        
         $rating_url=$GLOBALS['Rating_url']; 

         $response_premops_prodcops = []; 
        
         $response_premops_prodcops[$location_no] = curl_function($rating_url,$method ="POST",$header,$postfields); 
         $response_premops_prodcops['coverage']=$ccoverage;
         array_push($GLOBALS['res'],$response_premops_prodcops);
         
       }
        
         $result['postfields']=$postfields;
         $result['result']=$GLOBALS['res'];
         $result['premium_response']=json_encode($GLOBALS['res']);

      } catch (Exception $e) {

          $error = $e->getMessage();
          $result['error']=$error;
          
      }

        echo json_encode($result);
   

function get_city_data($zip_code,$city){

    $dbhost = DB_HOST_v2;
    $dbuser = DB_USERNAME_v2;
    $dbpassword = DB_PASSWORD_v2;

    $database = DB_NAME_v2;
    $db_conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $database);

  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


  $master_data = "select us_county,us_state from brok_gl_us_zip_master where us_zip=$zip_code and us_city='$city' ";
  
  $resultTest = mysqli_query($db_conn,$master_data);

    $rowcount=mysqli_num_rows($resultTest);
    if($rowcount > 0){
      $post = array();
      $x = 0;
      while ($row = mysqli_fetch_array($resultTest, MYSQLI_ASSOC)) {
        $posts[$x]['us_county'] = $row['us_county'];
        $posts[$x]['us_state'] = $row['us_state'];
         
          $x++;
      }
      return $posts;
    }

}


function curl_function($url,$method,$header,$postfields){

      $curl = curl_init();
      //$curl_log  = fopen($GLOBALS['curl_log_loc'], 'w+');
      curl_setopt($curl, CURLOPT_VERBOSE, true);
      //curl_setopt($curl, CURLOPT_STDERR, $curl_log);
      curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => $method,
         CURLOPT_POSTFIELDS => $postfields,
        CURLOPT_HTTPHEADER => $header,
      ));

      $response = curl_exec($curl);
      //rewind($curl_log);
      //$output= fread($curl_log, 2048);
      //echo $output;


      $err = curl_error($curl);

      curl_close($curl);
      //fclose($curl_log);

      if ($err) {
         echo json_decode($err);
        

      } else {

          $response =(json_decode($response));
          return $response;
        
        }

      }


?>