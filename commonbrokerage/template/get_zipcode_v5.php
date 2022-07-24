
<?php

//   $ss =$_REQUEST['search_string']; 
// //$ss = '85';

// $zip = file_get_contents('../data/us_zip.json');
// $zip =json_decode($zip);

// $zip = array_values($zip);


// $zip1= [];

// foreach ($zip as $key => $value) {

// if (preg_match("/$ss/", $value->zip) || preg_match("/$ss/i", $value->city) )
// {

// 	if($value->state=='AZ' || $value->state=='CA' || $value->state=='NY' || $value->state=='NJ' || $value->state=='FL' || $value->state=='GA' || $value->state=='PA' || $value->state=='OH' || $value->state=='IL' || $value->state=='TX' || $value->state=='LA')
// {
// $zip1[$key][0]= $value->zip." - " .$value->city;
// $zip1[$key][1]= $value->zip;
// }
// else
// {

// }
// }

// }

// $zip1 = array_values($zip1);

// 	foreach ($zip1 as $key => $value) {
// 		$val[$value[0]] = $value;
// 	}
// 	$zip1 = array_values($val);
//     echo json_encode($zip1);


include('../config.php');

    $dbhost = DB_HOST_v2;
    $dbuser = DB_USERNAME_v2;
    $dbpassword = DB_PASSWORD_v2;

    $database = DB_NAME_v2;
  $db_conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $database);

  if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $ss =$_REQUEST['search_string'];
  
  $master_data = "select us_zip,us_city,us_state_desc from brok_gl_us_zip_master where us_zip like '%$ss%'";
  
  $resultTest = mysqli_query($db_conn,$master_data);

  $rowcount=mysqli_num_rows($resultTest);
    if($rowcount > 0){
      $post = array();
      $x = 0;
      while ($row = mysqli_fetch_array($resultTest, MYSQLI_ASSOC)) {

          $posts[$x][0] = $row['us_city']." - ".$row['us_state_desc'];
          $posts[$x][1] = $row['us_zip'];
          
          $x++;
      }
      echo json_encode(array_values($posts));
    }
    else{
      
        $arrayName = array('status' =>'fail','message'=>'Incorrect Zip code' );
        echo json_encode($arrayName);
      }

?>
