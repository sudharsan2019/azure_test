<?php

echo "<center><h4>List all files in (v4uploads/documents_filesystem - original_emails) folder</h4></center>";


$sizeInBytes1 = getFolderSize('v4uploads');
echo '<br/>v4uploads folder size - '.getFormattedSize($sizeInBytes1);
echo "<br/><hr/>";

echo "<hr/>";
echo "http://".$_SERVER['SERVER_NAME']."/brokerage/brokerage_dragdrop_v2/usefulfiles.php?foldername=Newolder";
echo "<br/>";
echo "http://".$_SERVER['SERVER_NAME']."/brokerage/brokerage_dragdrop_v2/usefulfiles.php?menuscriptforms=menuscriptforms";
echo "<br/>";
echo "http://".$_SERVER['SERVER_NAME']."/brokerage/brokerage_dragdrop_v2/usefulfiles.php?v4uploads=v4uploads";

echo "<br/>";
echo "http://".$_SERVER['SERVER_NAME']."/brokerage/brokerage_dragdrop_v2/usefulfiles.php?searchfiles=searchfiles";

echo "<br/>";

if (isset($_GET['foldername'])) {
	$foldername = $_GET['foldername'];
	$folderfiles = glob('v4uploads/documents_filesystem/'.$foldername.'/*');
	echo "<pre>";
	print_r($folderfiles);
}

if (isset($_GET['v4uploads'])) {
    $v4uploads = $_GET['v4uploads'];
    $v4_folderfiles = glob('v4uploads/*');
    echo "<pre>";
    print_r($v4_folderfiles);
}

if (isset($_GET['searchfiles'])) {
    $searchfiles = $_GET['searchfiles'];
    $v4_folderfiles = glob('v4uploads/'.$searchfiles.'/*');
    echo "<pre>";
    print_r($v4_folderfiles);
}

$files = glob('v4uploads/documents_filesystem/*'); //get all file names

echo "<pre>";
print_r($files);

    function getFolderSize($directory){
        $totalSize = 0;
        $directoryArray = scandir($directory);

        foreach($directoryArray as $key => $fileName){
            if($fileName != ".." && $fileName != "."){
                if(is_dir($directory . "/" . $fileName)){
                    $totalSize = $totalSize + getFolderSize($directory . "/" . $fileName);
                } else if(is_file($directory . "/". $fileName)){
                    $totalSize = $totalSize + filesize($directory. "/". $fileName);
                }
            }
        }
        return $totalSize;
    }


    function getFormattedSize($sizeInBytes) {

        if($sizeInBytes < 1024) {
            return $sizeInBytes . " bytes";
        } else if($sizeInBytes < 1024*1024) {
            return $sizeInBytes/1024 . " KB";
        } else if($sizeInBytes < 1024*1024*1024) {
            return $sizeInBytes/(1024*1024) . " MB";
        } else if($sizeInBytes < 1024*1024*1024*1024) {
            return $sizeInBytes/(1024*1024*1024) . " GB";
        } else if($sizeInBytes < 1024*1024*1024*1024*1024) {
            return $sizeInBytes/(1024*1024*1024*1024) . " TB";
        } else {
            return "Greater than 1024 TB";
        }

    }


include("conn.php");

print_r($dbhost);
echo "<br/>";
print_r($dbuser);
echo "<br/>";
print_r($dbpassword);
echo "<br/>";
print_r($database);
echo "<br/>";
print_r($conversionapi);
echo "<br/>";
print_r($cicdpdftron);
echo "<br/>";
print_r($cicd_muhimbi);
echo "<br/>";


echo "********************************";
echo "<br/>";

print_r('DB_HOST_v2 - '.DB_HOST_v2 );
echo "<br/>";
print_r('DB_USERNAME_v2 - '.DB_USERNAME_v2);
echo "<br/>";
print_r('DB_PASSWORD_v2 - '.DB_PASSWORD_v2);
echo "<br/>";

print_r('cicd_muhimbi - '.$cicd_muhimbi);
echo "<br/>";
print_r('FORMS_MANAGEMENT_URL - '.$GLOBALS['FORMS_MANAGEMENT_URL']);
echo "<br/>";

print_r('doc_url - '.$GLOBALS['doc_url']);
echo "<br/>";


echo "********************************";
echo "<br/>";
?>