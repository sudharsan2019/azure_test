
<?php
	$ss = $_REQUEST['search_string'];
	
	$zip_array = array();

	$zip = file_get_contents('us_zip.json');

	$zip_array = json_decode($zip);

	$city_name_array = array();
	foreach($zip_array as $key => $value){
		if($value->zip == $ss){
			//$city_name_array[$key]['zip'] = $value->zip;
			//$city_name_array[$key]['city'] = $value->city;
			//$city_name_array[$key]['state'] = $value->state;
			$city_name_array[] = $value;
		}	 	
	}

	if(!empty($city_name_array)){
		echo json_encode($city_name_array);
	}else{
		echo json_encode('empty');
	}	
?>