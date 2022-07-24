<?php
include('../config.php');

$arrayName = array( 
	'majesco_url' => $GLOBALS['majesco_url'],
	'forms_management_url' => $GLOBALS['FORMS_MANAGEMENT_URL'], 
	'doc_url' => $GLOBALS['doc_url'],
	'site_url' => $GLOBALS['Site_url'], 
	'pdf_lib_path' => $GLOBALS['PDF_LIB_PATH'], 
	'pdf_str_path' => $GLOBALS['PDF_STORAGE_PATH'], 
	'read_only_user' => $GLOBALS['READ_ONLY_USER'],
	'pdf_save_file_path' => $GLOBALS['PDF_SAVE_FILE_PATH'],
	'pdf_save_icon_path' => $GLOBALS['PDF_SAVE_ICON_PATH'],
	'pdf_viewer_key' => $GLOBALS['PDF_VIEWER_KEY'],
	'pdf_new_viewer' => $GLOBALS['PDF_NEW_VIEWER'],
	'lll_cc' => $GLOBALS['LLL_CLASS_CODE'],
	'ocp_cc' => $GLOBALS['OCP_CLASS_CODE']
);
echo json_encode($arrayName);
?>