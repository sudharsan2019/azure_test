
<?php

  $ss =$_REQUEST['search_string']; 
//$ss = '85';

$zip = file_get_contents('../data/us_zip.json');
$zip =json_decode($zip);

$zip = array_values($zip);


$zip1= [];

foreach ($zip as $key => $value) {

if (preg_match("/$ss/", $value->zip) || preg_match("/$ss/i", $value->city) )
{

	if($value->state=='AZ' || $value->state=='CA' || $value->state=='NY' || $value->state=='NJ' || $value->state=='FL' || $value->state=='GA' || $value->state=='PA' || $value->state=='OH' || $value->state=='IL' || $value->state=='TX' || $value->state=='LA')
{
$zip1[$key][0]= $value->zip." - " .$value->city;
$zip1[$key][1]= $value->zip;
}
else
{

}
}

}

$zip1 = array_values($zip1);

	foreach ($zip1 as $key => $value) {
		$val[$value[0]] = $value;
	}
	$zip1 = array_values($val);
    echo json_encode($zip1);

?>
