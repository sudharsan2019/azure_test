<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
$file_blob_value=$data->base_value;
$file_name = $data->originalname;
$acc_id = $data->account_id;
$hash = $data->hash_value;
$file_type = $data->type;
try {
	if($file_blob_value){
		$folder_path=__DIR__ ."/v4uploads/documents_filesystem/".$acc_id."/".$hash;
		file_put_contents($folder_path.".pdf",base64_decode($file_blob_value)) or print_r(error_get_last());
		//sleep(3);
		$size=filesize($folder_path.".pdf");
		$check_val= formatSizeUnits($size);
		echo json_encode(['message'=>'pdf is converted','size'=>$check_val,'filename'=>$file_name]);
	}
	else{
		echo json_encode(['message'=>'data is empty']);
	}
}
catch(Exception $e) {
  		echo json_encode(['message'.$e->getMessage()]);
}

function formatSizeUnits($bytes)
    	{
	        if ($bytes >= 1073741824)
	        {
	            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
	        }
	        elseif ($bytes >= 1048576)
	        {
	            $bytes = number_format($bytes / 1048576, 2) . ' MB';
	        }
	        elseif ($bytes >= 1024)
	        {
	            $bytes = number_format($bytes / 1024, 2) . ' KB';
	        }
	        elseif ($bytes > 1)
	        {
	            $bytes = $bytes . ' bytes';
	        }
	        elseif ($bytes == 1)
	        {
	            $bytes = $bytes . ' byte';
	        }
	        else
	        {
	            $bytes = '0 bytes';
	        }

	        return $bytes;
		}
		//testcommitbytg
?>
