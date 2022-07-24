
<?php

	$cc = file_get_contents('business_class_code.json');
	$cc =json_decode($cc);

	$cc = array_values($cc);

	usort($cc, function($a, $b) {
	   return $a->{'CLASS CODE'} <=> $b->{'CLASS CODE'};
	});

	$cc1= [];

	foreach ($cc as $key => $value) {

	  $value->{'CLASS CODE'};

	$cc1[$key][0]= $value->{'CLASS CODE'}." - " .$value->DESCRIPTION;
	$cc1[$key][1]= $value->{'CLASS CODE'}." - " .$value->DESCRIPTION;


	}

echo json_encode($cc1);		