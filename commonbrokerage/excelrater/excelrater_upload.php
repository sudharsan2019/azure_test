<?php

include("../brokerage_dragdrop_v2/conn.php");

use Aspera\Spreadsheet\XLSX\Reader;
use Aspera\Spreadsheet\XLSX\Worksheet;

require_once __DIR__ . '/vendor/autoload.php';

if(!empty($_FILES)){
	$file_name  = $_FILES['file']['name'];
    $file_size  = $_FILES['file']['size'];
    $file_tmp   = $_FILES['file']['tmp_name'];
    $file_type  = $_FILES['file']['type'];

    $original_file_name = $file_name;
    $rqbid  = $_REQUEST['rqbi_id'];
    $accid  = $_REQUEST['accid'];
    $userid  = $_REQUEST['userid'];

    $ext = pathinfo($file_name, PATHINFO_EXTENSION);
    $ext1  = strtolower($ext);

	$trimfilename1 = basename(str_replace(' ', '__', $file_name), '.'.$ext);
	$trimfilename = preg_replace('/[^A-Za-z0-9]/', '_', $trimfilename1);

	$allowed_formats = array("XLSM","xlsm");

    if (in_array($ext1, $allowed_formats)){

        // Excelrater file Upload Folder Path
        $folder_path = '../brokerage_dragdrop_v2/v4uploads/documents_filesystem/excelraterupload/'.$accid;

        if (!file_exists($folder_path)) {
            if (mkdir($folder_path, 0777, true)) {

            }else{
                $arrayName = array('status' => 'fail', 'msg' => 'Folder not created' );
    			echo json_encode($arrayName);
    			exit();
            }
        }


        $uniqid = uniqid();
        $randid = mt_rand(100000, 999999);
        $strtotime = strtotime("now");


        $changed_filename = $trimfilename.'_'.$uniqid.'_'.$randid.'_'.$strtotime;

        $path = __DIR__."/".$folder_path."/".$changed_filename.'.'.$ext1;

        $filehash = $changed_filename.'.'.$ext1;

        $filemove_issue = array('temp'=>$file_tmp,'path'=> $path );

        if (move_uploaded_file($file_tmp, $path)){

        		$reader = new Reader();
				$reader->open($path);
				// single sheet
				/* foreach ($reader as $row) {
				    print_r($row);
				} */


				//Multiple Sheet
				$sheets = $reader->getSheets();

				foreach ($sheets as $index => $sheet_data) {
				    $reader->changeSheet($index);
					$sheetName = $sheet_data->getName();
					if ($sheetName == 'Landing') {
						foreach ($reader as $row) {
							$newarray[] = $row;
						}
					}
				}


				$allowed_datas = array("AccountName","EffectiveDate","ExpirationDate","Revenue1","Revenue2","Revenue3","Revenue4","Revenue5","Revenue6","Revenue7","Revenue8","Revenue9","Revenue10","OCC_1","Agg_Limit1","GL_Retention1","PROD_Limit_1","FT_1","Street_loc1","Zip_Loc1","City_loc1","State_loc1","Street_loc2","Zip_Loc2","City_loc2","State_loc2","Street_loc3","Zip_Loc3","City_loc3","State_loc3","Street_loc4","Zip_Loc4","City_loc4","State_loc4","Street_loc5","Zip_Loc5","City_loc5","State_loc5","Street_loc6","Zip_Loc6","City_loc6","State_loc6","Street_loc7","Zip_Loc7","City_loc7","State_loc7","Street_loc8","Zip_Loc8","City_loc8","State_loc8","Street_loc9","Zip_Loc9","City_loc9","State_loc9","Street_loc10","Zip_Loc10","City_loc10","State_loc10","NAICSCode1","NAICSCode2","NAICSCode3","NAICSCode4","NAICSCode5","NAICSCode6","NAICSCode7","NAICSCode8","NAICSCode9","NAICSCode10","Domicle_street","Domicile_zip","Domicle_city","Domicle_state");


				foreach ($newarray as $key => $value) {

					if ($value[0] != '') {

						if (in_array($value[0], $allowed_datas)){
							$data[$value[0]][0] = $value[0];

							if (isset($value[1])) {
								$data[$value[0]][1] = $value[1];
							}else{
								$data[$value[0]][1] = NULL;
							}
						}
					}
				}

				// echo "<pre>";
				// echo "test2";
				// echo "<br/>";

				// print_r(var_dump( date(strtotime('d/M/Y',$data['EffectiveDate'][1])) ));
				// echo "<br/>";
				// print_r(var_dump($data['ExpirationDate'][1]));
				// exit();


				$result = insertintodb_excelrater( $db_conn, $rqbid, $accid, $userid, 
					$data['AccountName'][1], $data['EffectiveDate'][1], $data['ExpirationDate'][1], 
					$data['Revenue1'][1], $data['Revenue2'][1], $data['Revenue3'][1], $data['Revenue4'][1], 
					$data['Revenue5'][1], $data['Revenue6'][1], $data['Revenue7'][1], $data['Revenue8'][1], 
					$data['Revenue9'][1], $data['Revenue10'][1], $data['OCC_1'][1], $data['Agg_Limit1'][1], 
					$data['GL_Retention1'][1], $data['PROD_Limit_1'][1], $data['FT_1'][1], 
					$data['Street_loc1'][1], $data['Zip_Loc1'][1], $data['City_loc1'][1], $data['State_loc1'][1], 
					$data['Street_loc2'][1], $data['Zip_Loc2'][1], $data['City_loc2'][1], $data['State_loc2'][1], 
					$data['Street_loc3'][1], $data['Zip_Loc3'][1], $data['City_loc3'][1], $data['State_loc3'][1], 
					$data['Street_loc4'][1], $data['Zip_Loc4'][1], $data['City_loc4'][1], $data['State_loc4'][1], 
					$data['Street_loc5'][1], $data['Zip_Loc5'][1], $data['City_loc5'][1], $data['State_loc5'][1], 
					$data['Street_loc6'][1], $data['Zip_Loc6'][1], $data['City_loc6'][1], $data['State_loc6'][1], 
					$data['Street_loc7'][1], $data['Zip_Loc7'][1], $data['City_loc7'][1], $data['State_loc7'][1], 
					$data['Street_loc8'][1], $data['Zip_Loc8'][1], $data['City_loc8'][1], $data['State_loc8'][1], 
					$data['Street_loc9'][1], $data['Zip_Loc9'][1], $data['City_loc9'][1], $data['State_loc9'][1], 
					$data['Street_loc10'][1], $data['Zip_Loc10'][1], $data['City_loc10'][1], $data['State_loc10'][1], 
					$data['NAICSCode1'][1], $data['NAICSCode2'][1], $data['NAICSCode3'][1], $data['NAICSCode4'][1], 
					$data['NAICSCode5'][1], $data['NAICSCode6'][1], $data['NAICSCode7'][1], $data['NAICSCode8'][1], 
					$data['NAICSCode9'][1], $data['NAICSCode10'][1], $data['Domicle_street'][1], $data['Domicile_zip'][1],
					$data['Domicle_city'][1], $data['Domicle_state'][1], $filehash);


				if ($result == 'success') {
					$arrayName = array('status' => 'success', 'msg' => 'Imported is successfully', 'path'=>$filemove_issue);
    				echo json_encode($arrayName);
				}else{
					$arrayName = array('status' => 'fail', 'msg' => 'Imported is not successfully','path'=>$filemove_issue);
    				echo json_encode($arrayName);
				}

				$reader->close();

        }else{
        	$arrayName = array('status' => 'fail', 'msg' => 'Unable to move the file', 'path'=>$filemove_issue );
    		echo json_encode($arrayName);
        }

    }else{
    	$arrayName = array('status' => 'fail', 'msg' => 'Invalid file type', 'path'=>$filemove_issue );
    	echo json_encode($arrayName);
    }



}


function exffective_expiry_formatcheck($valcheckdate){
	if(!empty($valcheckdate)){
  
		    $valcheckdate_date = explode("T",$valcheckdate);

			if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$valcheckdate_date[0])) {

				$checkdate = explode("-",$valcheckdate_date[0]);

				$year 	= $checkdate[0];
			    $month 	= $checkdate[1];
				$day 	= $checkdate[2];
				
				if (checkdate($month, $day, $year)) {
					return $valcheckdate_date[0];
					exit();
				}else{
					return null;
					exit();
				}
			} else {
			    return null;
			    exit();
			}

	}else{
		return null;
		exit();
	}
}

function insertintodb_excelrater( $db_conn, $rqbid, $accid, $userid, $AccountName, $EffectiveDate, $ExpirationDate, $Revenue1, $Revenue2, $Revenue3, $Revenue4, $Revenue5, $Revenue6, $Revenue7, $Revenue8, $Revenue9, $Revenue10, $OCC_1, $Agg_Limit1, $GL_Retention1, $PROD_Limit_1, $ft_1, $Street_loc1, $Zip_Loc1, $City_loc1, $State_loc1, $Street_loc2, $Zip_Loc2, $City_loc2, $State_loc2, $Street_loc3, $Zip_Loc3, $City_loc3, $State_loc3, $Street_loc4, $Zip_Loc4, $City_loc4, $State_loc4, $Street_loc5, $Zip_Loc5, $City_loc5, $State_loc5, $Street_loc6, $Zip_Loc6, $City_loc6, $State_loc6, $Street_loc7, $Zip_Loc7, $City_loc7, $State_loc7, $Street_loc8, $Zip_Loc8, $City_loc8, $State_loc8, $Street_loc9, $Zip_Loc9, $City_loc9, $State_loc9, $Street_loc10, $Zip_Loc10, $City_loc10, $State_loc10, $classcode1, $classcode2, $classcode3, $classcode4, $classcode5, $classcode6, $classcode7, $classcode8, $classcode9, $classcode10, $Domicle_street, $Domicile_zip, $Domicle_city, $Domicle_state, $filehash ){


	$update_query ="UPDATE excelrater SET is_active = '0' WHERE rqbid = '".$rqbid."' AND accid = '".$accid."' ";
    mysqli_query($db_conn, $update_query);

	// $EffectiveDate = '2002-08-22';
	// $ExpirationDate = '2002-08-23';

    $EffDate_val = exffective_expiry_formatcheck($EffectiveDate);
    $ExpDate_val = exffective_expiry_formatcheck($ExpirationDate);

    if($EffDate_val != null && $ExpDate_val != null){

		$dateTimestamp1 = strtotime($EffDate_val);
		$dateTimestamp2 = strtotime($ExpDate_val);

		// Compare the timestamp date 
		if ($dateTimestamp1 < $dateTimestamp2){
			$EffDate = "'".$EffDate_val."'";
			$ExpDate = "'".$ExpDate_val."'";
		}else{
			$EffDate = 'null';
    		$ExpDate = 'null';
		}

    }elseif($EffDate_val != null && $ExpDate_val == null){
    	$EffDate = "'".$EffDate_val."'";
    	$ExpDate = "'".date('Y-m-d',strtotime(date($EffDate_val) . " + 365 day"))."'";
    }elseif($EffDate_val == null){
    	$EffDate = 'null';
    	$ExpDate = 'null';
    }
	
	$rqbid 			= mysqli_real_escape_string($db_conn, $rqbid);
	$accid 			= mysqli_real_escape_string($db_conn, $accid);
	$userid 		= mysqli_real_escape_string($db_conn, $userid);
	$AccountName 	= mysqli_real_escape_string($db_conn, $AccountName);

	// $EffDate1 		= mysqli_real_escape_string($db_conn, $EffDate);
	// $ExpDate1 		= mysqli_real_escape_string($db_conn, $ExpDate);

	$EffDate1 		= $EffDate;
	$ExpDate1 		= $ExpDate;

	$Revenue1 		= mysqli_real_escape_string($db_conn, $Revenue1);
	$Revenue2 		= mysqli_real_escape_string($db_conn, $Revenue2);
	$Revenue3 		= mysqli_real_escape_string($db_conn, $Revenue3);
	$Revenue4 		= mysqli_real_escape_string($db_conn, $Revenue4);
	$Revenue5 		= mysqli_real_escape_string($db_conn, $Revenue5);
	$Revenue6 		= mysqli_real_escape_string($db_conn, $Revenue6);
	$Revenue7 		= mysqli_real_escape_string($db_conn, $Revenue7);
	$Revenue8 		= mysqli_real_escape_string($db_conn, $Revenue8);
	$Revenue9 		= mysqli_real_escape_string($db_conn, $Revenue9);
	$Revenue10 		= mysqli_real_escape_string($db_conn, $Revenue10);
	$OCC_1 			= mysqli_real_escape_string($db_conn, $OCC_1);
	$Agg_Limit1 	= mysqli_real_escape_string($db_conn, $Agg_Limit1);
	$GL_Retention1 	= mysqli_real_escape_string($db_conn, $GL_Retention1);
	$PROD_Limit_1 	= mysqli_real_escape_string($db_conn, $PROD_Limit_1);
	$ft_1 			= mysqli_real_escape_string($db_conn, $ft_1);
	$Street_loc1 	= mysqli_real_escape_string($db_conn, $Street_loc1);
	$Zip_Loc1 		= mysqli_real_escape_string($db_conn, $Zip_Loc1);
	$City_loc1 		= mysqli_real_escape_string($db_conn, $City_loc1);
	$State_loc1 	= mysqli_real_escape_string($db_conn, $State_loc1);
	$Street_loc2 	= mysqli_real_escape_string($db_conn, $Street_loc2);
	$Zip_Loc2		= mysqli_real_escape_string($db_conn, $Zip_Loc2);
	$City_loc2 		= mysqli_real_escape_string($db_conn, $City_loc2);
	$State_loc2 	= mysqli_real_escape_string($db_conn, $State_loc2);
	$Street_loc3 	= mysqli_real_escape_string($db_conn, $Street_loc3);
	$Zip_Loc3 		= mysqli_real_escape_string($db_conn, $Zip_Loc3);
	$City_loc3 		= mysqli_real_escape_string($db_conn, $City_loc3);
	$State_loc3 	= mysqli_real_escape_string($db_conn, $State_loc3);
	$Street_loc4 	= mysqli_real_escape_string($db_conn, $Street_loc4);
	$Zip_Loc4 		= mysqli_real_escape_string($db_conn, $Zip_Loc4);
	$City_loc4 		= mysqli_real_escape_string($db_conn, $City_loc4);
	$State_loc4 	= mysqli_real_escape_string($db_conn, $State_loc4);
	$Street_loc5 	= mysqli_real_escape_string($db_conn, $Street_loc5);
	$Zip_Loc5 		= mysqli_real_escape_string($db_conn, $Zip_Loc5);
	$City_loc5 		= mysqli_real_escape_string($db_conn, $City_loc5);
	$State_loc5 	= mysqli_real_escape_string($db_conn, $State_loc5);
	$Street_loc6 	= mysqli_real_escape_string($db_conn, $Street_loc6);
	$Zip_Loc6 		= mysqli_real_escape_string($db_conn, $Zip_Loc6);
	$City_loc6 		= mysqli_real_escape_string($db_conn, $City_loc6);
	$State_loc6 	= mysqli_real_escape_string($db_conn, $State_loc6);
	$Street_loc7 	= mysqli_real_escape_string($db_conn, $Street_loc7);
	$Zip_Loc7 		= mysqli_real_escape_string($db_conn, $Zip_Loc7);
	$City_loc7 		= mysqli_real_escape_string($db_conn, $City_loc7);
	$State_loc7 	= mysqli_real_escape_string($db_conn, $State_loc7);
	$Street_loc8 	= mysqli_real_escape_string($db_conn, $Street_loc8);
	$Zip_Loc8 		= mysqli_real_escape_string($db_conn, $Zip_Loc8);
	$City_loc8 		= mysqli_real_escape_string($db_conn, $City_loc8);
	$State_loc8 	= mysqli_real_escape_string($db_conn, $State_loc8);
	$Street_loc9 	= mysqli_real_escape_string($db_conn, $Street_loc9);
	$Zip_Loc9 		= mysqli_real_escape_string($db_conn, $Zip_Loc9);
	$City_loc9 		= mysqli_real_escape_string($db_conn, $City_loc9);
	$State_loc9 	= mysqli_real_escape_string($db_conn, $State_loc9);
	$Street_loc10 	= mysqli_real_escape_string($db_conn, $Street_loc10);
	$Zip_Loc10 		= mysqli_real_escape_string($db_conn, $Zip_Loc10);
	$City_loc10 	= mysqli_real_escape_string($db_conn, $City_loc10);
	$State_loc10 	= mysqli_real_escape_string($db_conn, $State_loc10);
	$classcode1 	= mysqli_real_escape_string($db_conn, $classcode1);
	$classcode2 	= mysqli_real_escape_string($db_conn, $classcode2);
	$classcode3 	= mysqli_real_escape_string($db_conn, $classcode3);
	$classcode4 	= mysqli_real_escape_string($db_conn, $classcode4);
	$classcode5 	= mysqli_real_escape_string($db_conn, $classcode5);
	$classcode6 	= mysqli_real_escape_string($db_conn, $classcode6);
	$classcode7 	= mysqli_real_escape_string($db_conn, $classcode7);
	$classcode8 	= mysqli_real_escape_string($db_conn, $classcode8);
	$classcode9 	= mysqli_real_escape_string($db_conn, $classcode9);
	$classcode10 	= mysqli_real_escape_string($db_conn, $classcode10);
	$Domicle_street = mysqli_real_escape_string($db_conn, $Domicle_street);
	$Domicile_zip 	= mysqli_real_escape_string($db_conn, $Domicile_zip);
	$Domicle_city 	= mysqli_real_escape_string($db_conn, $Domicle_city);
	$Domicle_state 	= mysqli_real_escape_string($db_conn, $Domicle_state);
	$filehash 		= mysqli_real_escape_string($db_conn, $filehash);

	$Insert = "INSERT INTO excelrater ( rqbid, accid, created_by, AccountName, rqbi_effective_date, rqbi_expiry_date, Revenue1, Revenue2, Revenue3, Revenue4, Revenue5, Revenue6, Revenue7, Revenue8, Revenue9, Revenue10, OCC_1, Agg_Limit1, GL_Retention1, PROD_Limit_1, ft_1, Street_loc1, Zip_Loc1, City_loc1, State_loc1, Street_loc2, Zip_Loc2, City_loc2, State_loc2, Street_loc3, Zip_Loc3, City_loc3, State_loc3, Street_loc4, Zip_Loc4, City_loc4, State_loc4, Street_loc5, Zip_Loc5, City_loc5, State_loc5, Street_loc6, Zip_Loc6, City_loc6, State_loc6, Street_loc7, Zip_Loc7, City_loc7, State_loc7, Street_loc8, Zip_Loc8, City_loc8, State_loc8, Street_loc9, Zip_Loc9, City_loc9, State_loc9, Street_loc10, Zip_Loc10, City_loc10, State_loc10, classcode1, classcode2, classcode3, classcode4, classcode5, classcode6, classcode7, classcode8, classcode9, classcode10, Domicle_street, Domicile_zip, Domicle_city, Domicle_state, filehash ) values('".$rqbid."','".$accid."','".$userid."','".$AccountName."',".$EffDate1.",".$ExpDate1.",'".$Revenue1."','".$Revenue2."','".$Revenue3."','".$Revenue4."','".$Revenue5."','".$Revenue6."','".$Revenue7."','".$Revenue8."','".$Revenue9."','".$Revenue10."','".$OCC_1."','".$Agg_Limit1."','".$GL_Retention1."','".$PROD_Limit_1."','".$ft_1."','".$Street_loc1."','".$Zip_Loc1."','".$City_loc1."','".$State_loc1."','".$Street_loc2."','".$Zip_Loc2."','".$City_loc2."','".$State_loc2."','".$Street_loc3."','".$Zip_Loc3."','".$City_loc3."','".$State_loc3."','".$Street_loc4."','".$Zip_Loc4."','".$City_loc4."','".$State_loc4."','".$Street_loc5."','".$Zip_Loc5."','".$City_loc5."','".$State_loc5."','".$Street_loc6."','".$Zip_Loc6."','".$City_loc6."','".$State_loc6."','".$Street_loc7."','".$Zip_Loc7."','".$City_loc7."','".$State_loc7."','".$Street_loc8."','".$Zip_Loc8."','".$City_loc8."','".$State_loc8."','".$Street_loc9."','".$Zip_Loc9."','".$City_loc9."','".$State_loc9."','".$Street_loc10."','".$Zip_Loc10."','".$City_loc10."','".$State_loc10."','".$classcode1."','".$classcode2."','".$classcode3."','".$classcode4."','".$classcode5."','".$classcode6."','".$classcode7."','".$classcode8."','".$classcode9."','".$classcode10."','".$Domicle_street."','".$Domicile_zip."','".$Domicle_city."','".$Domicle_state."','".$filehash."')";

    $res = mysqli_query($db_conn,$Insert);

    if ($res) {
        $result = 'success';
    }else{
        $result = 'fail';
    }

    return $result;
}
