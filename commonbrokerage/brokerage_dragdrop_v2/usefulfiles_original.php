<?php

echo "<center><h4>List all files in (v4uploads/original_emails) folder</h4></center>";

$sizeInBytes = getFolderSize('v4uploads/original_emails');
echo '<br/>v4uploads/original_emails folder size - '.getFormattedSize($sizeInBytes);
echo "<br/><hr/>";



echo "<hr/>";
echo "http://".$_SERVER['SERVER_NAME']."/brokerage/brokerage_dragdrop_v2/usefulfiles_original.php?foldername=folder";
echo "<br/>";

if (isset($_GET['foldername'])) {
	$foldername = $_GET['foldername'];
	$folderfiles = glob('v4uploads/original_emails/'.$foldername.'/*');
	echo "<pre>";
	print_r($folderfiles);
}


$files = glob('v4uploads/original_emails/*'); //get all file names

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

?>