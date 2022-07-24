<?php
/*
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
*/
?>

<?php
/**
 * WebEditor AJAX Process Execution.
 */
require_once( dirname(__FILE__) . '/config.php' );
require_once( dirname(__FILE__) . '/ajax.php' );
require_once( dirname(__FILE__) . '/common.php' );
require_once( dirname(__FILE__) . '/functions.php' );
require_once( dirname(__FILE__) . '/jwtmanager.php' );

$_trackerStatus = array(
    0 => 'NotFound',
    1 => 'Editing',
    2 => 'MustSave',
    3 => 'Corrupted',
    4 => 'Closed'
);


if (isset($_GET["type"]) && !empty($_GET["type"])) { //Checks if type value exists
    $response_array;
    @header( 'Content-Type: application/json; charset==utf-8');
    @header( 'X-Robots-Tag: noindex' );
    @header( 'X-Content-Type-Options: nosniff' );

    nocache_headers();

    sendlog(serialize($_GET), "webedior-ajax.log");

    $type = $_GET["type"];

    switch($type) { //Switch case for value of type
        case "upload":
            $response_array = upload();
            $response_array['status'] = isset($response_array['error']) ? 'error' : 'success';
            die (json_encode($response_array));
        case "convert":
            $response_array = convert();
            $response_array['status'] = 'success';
            die (json_encode($response_array));
        case "track":
            $response_array = track();
            $response_array['status'] = 'success';
            die (json_encode($response_array));
        case "delete":
            $response_array = delete();
            $response_array['status'] = 'success';
            die (json_encode($response_array));
        default:
            $response_array['status'] = 'error';
            $response_array['error'] = '404 Method not found';
            die(json_encode($response_array));
    }
}

function upload() {
    $result; $filename;

    if ($_FILES['files']['error'] > 0) {
        $result["error"] = 'Error ' . json_encode($_FILES['files']['error']);
        return $result;
    }

    $tmp = $_FILES['files']['tmp_name'];

    if (empty(tmp)) {
        $result["error"] = 'No file sent';
        return $result;
    }

    if (is_uploaded_file($tmp))
    {
        $filesize = $_FILES['files']['size'];
        $ext = strtolower('.' . pathinfo($_FILES['files']['name'], PATHINFO_EXTENSION));

        if ($filesize <= 0 || $filesize > $GLOBALS['FILE_SIZE_MAX']) {
            $result["error"] = 'File size is incorrect';
            return $result;
        }

        if (!in_array($ext, getFileExts())) {
            $result["error"] = 'File type is not supported';
            return $result;
        }

        $filename = GetCorrectName($_FILES['files']['name']);
        if (!move_uploaded_file($tmp,  getStoragePath($filename)) ) {
            $result["error"] = 'Upload failed';
            return $result;
        }
        createMeta($filename);

    } else {
        $result["error"] = 'Upload failed';
        return $result;
    }

    $result["filename"] = $filename;
    return $result;
}

function track() {
    sendlog("Track START", "webedior-ajax.log");
    sendlog("_GET params: " . serialize( $_GET ), "webedior-ajax.log");

    global $_trackerStatus;
    $data;
    $result["error"] = 0;

    if (($body_stream = file_get_contents('php://input'))===FALSE) {
        $result["error"] = "Bad Request";
        return $result;
    }

    $data = json_decode($body_stream, TRUE); //json_decode - PHP 5 >= 5.2.0

    if ($data === NULL) {
        $result["error"] = "Bad Response";
        return $result;
    }

    sendlog("InputStream data: " . serialize($data), "webedior-ajax.log");

    if (isJwtEnabled()) {
        sendlog("jwt enabled, checking tokens", "webedior-ajax.log");

        $inHeader = false;
        $token = "";
        if (!empty($data["token"])) {
            $token = jwtDecode($data["token"]);
        } elseif (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = jwtDecode(substr($_SERVER['HTTP_AUTHORIZATION'], strlen("Bearer ")));
            $inHeader = true;
        } else {
            sendlog("jwt token wasn't found in body or headers", "webedior-ajax.log");
            $result["error"] = "Expected JWT";
            return $result;
        }
        if (empty($token)) {
            sendlog("token was found but signature is invalid", "webedior-ajax.log");
            $result["error"] = "Invalid JWT signature";
            return $result;
        }

        $data = json_decode($token, true);
        if ($inHeader) $data = $data["payload"];
    }

    $status = $_trackerStatus[$data["status"]];

    switch ($status) {
        case "MustSave":
        case "Corrupted":

            
            $fileName = $_GET["fileName"];
            $acc_id=$_GET["ac_id"];
            $downloadUri = $data["url"];

            $curExt = strtolower('.' . pathinfo($fileName, PATHINFO_EXTENSION));
            $downloadExt = strtolower('.' . pathinfo($downloadUri, PATHINFO_EXTENSION));

            $saved = 1;

            if (($new_data = file_get_contents($downloadUri)) === FALSE) {
                $saved = 0;
            } else {

                $storagePath = getStoragePath($acc_id, $fileName, $userAddress);
                $histDir = getHistoryDir($storagePath);
                $verDir = getVersionDir($histDir, getFileVersion($histDir) + 1);
                mkdir($verDir);

                copy($storagePath, $verDir . DIRECTORY_SEPARATOR . "prev" . $downloadExt);
                file_put_contents($storagePath, $new_data, LOCK_EX);

                if ($changesData = file_get_contents($data["changesurl"])) {
                    file_put_contents($verDir . DIRECTORY_SEPARATOR . "diff.zip", $changesData, LOCK_EX);
                }

                $histData = $data["changeshistory"];
                if (empty($histData)) {
                    $histData = json_encode($data["history"], JSON_PRETTY_PRINT);
                }
                if (!empty($histData)) {
                    file_put_contents($verDir . DIRECTORY_SEPARATOR . "changes.json", $histData, LOCK_EX);
                }
                file_put_contents($verDir . DIRECTORY_SEPARATOR . "key.txt", $data["key"], LOCK_EX);
            }

            $result["c"] = "saved";
            $result["status"] = $saved;
            break;
    }

    sendlog("track result: " . serialize($result), "webedior-ajax.log");
    return $result;
}

function convert() {
    $fileName = $_GET["filename"];
    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $internalExtension = trim(getInternalExtension($fileName),'.');

    if (in_array("." + $extension, $GLOBALS['DOC_SERV_CONVERT']) && $internalExtension != "") {

        $fileUri = $_GET["fileUri"];
        if ($fileUri == NULL || $fileUri == "") {
            $fileUri = FileUri($fileName, TRUE);
        }
        $key = getDocEditorKey($fileName);

        $newFileUri;
        $result;
        $percent;

        try {
            $percent = GetConvertedUri($fileUri, $extension, $internalExtension, $key, TRUE, $newFileUri);
        }
        catch (Exception $e) {
            $result["error"] = "error: " . $e->getMessage();
            return $result;
        }

        if ($percent != 100)
        {
            $result["step"] = $percent;
            $result["filename"] = $fileName;
            $result["fileUri"] = $fileUri;
            return $result;
        }

        $baseNameWithoutExt = substr($fileName, 0, strlen($fileName) - strlen($extension) - 1);

        $newFileName = GetCorrectName($baseNameWithoutExt . "." . $internalExtension);

        if (($data = file_get_contents(str_replace(" ","%20",$newFileUri))) === FALSE) {
            $result["error"] = 'Bad Request';
            return $result;
        } else {
            file_put_contents(getStoragePath($newFileName), $data, LOCK_EX);
            createMeta($newFileName);
        }

        $stPath = getStoragePath($fileName);
        unlink($stPath);
        delTree(getHistoryDir($stPath));

        $fileName = $newFileName;
    }

    $result["filename"] = $fileName;
    return $result;
}

function delete() {
    try {
        $fileName = $_GET["fileName"];

        $filePath = getStoragePath($fileName);

        unlink($filePath);
        delTree(getHistoryDir($filePath));
    }
    catch (Exception $e) {
        sendlog("Deletion ".$e->getMessage(), "webedior-ajax.log");
        $result["error"] = "error: " . $e->getMessage();
        return $result;
    }
}

function delTree($dir) {
    if (!file_exists($dir) || !is_dir($dir)) return;

    $files = array_diff(scandir($dir), array('.','..'));
    foreach ($files as $file) {
        (is_dir("$dir/$file")) ? delTree("$dir/$file") : unlink("$dir/$file");
    }
    return rmdir($dir);
}

?>