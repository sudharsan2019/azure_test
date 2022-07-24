
<?php
session_start();
$zipcode = $_GET['zip'];
$territory_code = json_decode(file_get_contents('../data/territory_code.json'));
$zipcode_us =json_decode(file_get_contents('../data/us_zip.json'));

    $zip_array = array_column($territory_code, 'ZIP');
    $as =array_search($zipcode, $zip_array); 

    $zip_array2=array_column($zipcode_us, 'zip');
    $us_zip=array_search($zipcode, $zip_array2);

if($as !=''){

  $_SESSION["state_code_ai_forms"] = $zipcode_us[$us_zip]->state;
  $tc = ["tc"=>$territory_code[$as]->TERRITORY,"city"=>$zipcode_us[$us_zip]->city,"state_code"=>$zipcode_us[$us_zip]->state_desc, "key"=>$as];

    echo json_encode($tc);

 }
else{
  $_SESSION["state_code_ai_forms"]='';
    $tc = ["tc"=>"","city"=>"","state_code"=>"","key"=>""];

  echo json_encode($tc);

}