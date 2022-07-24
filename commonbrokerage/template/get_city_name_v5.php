<?php

include('../config.php');

    $dbhost = DB_HOST_v2;
    $dbuser = DB_USERNAME_v2;
    $dbpassword = DB_PASSWORD_v2;

    $database = DB_NAME_v2;
  $db_conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $database);

  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $zip = $_REQUEST['zip'];
  
  $master_data = "select us_city,us_state_desc from brok_gl_us_zip_master where us_zip=$zip";
  
  $resultTest = mysqli_query($db_conn,$master_data);

  $rowcount=mysqli_num_rows($resultTest);
    if($rowcount > 0){
      $post = array();
      $x = 0;
      while ($row = mysqli_fetch_array($resultTest, MYSQLI_ASSOC)) {
          $posts[$x]['city'] = $row['us_city'];
          $posts[$x]['state_code'] = $row['us_state_desc'];
          $x++;
      }
      echo json_encode($posts);
    }
    else{
      
        $arrayName = array('status' =>'fail','message'=>'Incorrect Zip code' );
        echo json_encode($arrayName);
      }
   
?>