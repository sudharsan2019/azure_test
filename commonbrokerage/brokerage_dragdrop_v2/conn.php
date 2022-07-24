<?php

include('../config.php');
// error_reporting(E_ALL ^ E_WARNING);
// error_reporting( error_reporting() & ~E_NOTICE );

// $islocalhost=true;
    $dbhost = DB_HOST_v2;
    $dbuser = DB_USERNAME_v2;
    $dbpassword = DB_PASSWORD_v2;

    $database = DB_NAME_v2;
	$db_conn = mysqli_connect($dbhost, $dbuser, $dbpassword, $database);

	if (mysqli_connect_errno()){
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}


	// $conversionapi = 'CICD_CONVERTAPI';
	// $cicdpdftron =  'CICD_PDFTRON_PHP';
	// $cicd_cloudmersive = 'CICD_CLOUDMERSIVE';
	// $cicd_muhimbi = 'CICD_MUHIMBI';

?>
