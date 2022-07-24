
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

	$class_code = $_REQUEST['class_code'];
	$coverage = $_REQUEST['coverage'];

	$master_data = "SELECT mca.rid,mca.class_code,mca.class_code_type,mca.class_description,pb.basis_value AS												premium_base_id FROM master_class_code AS mca 
											LEFT JOIN master_premium_basis AS pb on pb.rid = mca.premium_base_id where mca.is_active = 1 AND (mca.class_code LIKE '%$class_code%' OR mca.class_description LIKE '%$class_code%') 			AND mca.class_code_type IN ($coverage)";
	
	$resultTest = mysqli_query($db_conn,$master_data);

	$rowcount=mysqli_num_rows($resultTest);
		if($rowcount > 0){
			$post = array();
			$x = 0;
			while ($row = mysqli_fetch_array($resultTest, MYSQLI_ASSOC)) {
				$posts[$x]['rid'] = $row['rid'];
				$posts[$x]['classcode_gl'] = $row['class_code'];
			    $posts[$x]['class_code_type1'] = $row['class_code_type'];
			    $posts[$x]['classname'] = $row['class_description'];
			    $posts[$x]['premium_base1'] = $row['premium_base_id'];
			    $x++;
			}
			echo json_encode($posts);
		}
		else{
			if( strlen($class_code) >= 5 ) { /*Naics update*/
				$arrayName = array('status' =>'fail','message'=>'Incorrect class code' );
				echo json_encode($arrayName);
			}
		}

?>
