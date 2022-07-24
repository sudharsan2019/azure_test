<?php
session_start();

if(!isset($_SESSION['userid'])){
header('Location: /brok-wbui/logout.php');
}

?>

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
   header ("Access-Control-Allow-Origin: *");
   header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
   header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
   header ("Access-Control-Allow-Headers: *");
   ?>

<?php
    require_once( dirname(__FILE__) . '/config.php' );
    require_once( dirname(__FILE__) . '/common.php' );
    require_once( dirname(__FILE__) . '/functions.php' );
    require_once( dirname(__FILE__) . '/jwtmanager.php' );

    $filename;

    $acc_id=$_GET["accid"];
    $org_name=$_GET["org_name"];
    $up_date=$_GET["up_dat"];

    $externalUrl = $_GET["fileUrl"];
    if (!empty($externalUrl))
    {
        $filename = DoUpload($externalUrl);
    }
    else
    {
        $filename = basename($_GET["fileID"]);
    }
    $createExt = $_GET["fileExt"];

    if (!empty($createExt))
    {
        $filename = tryGetDefaultByType($createExt);

        $new_url = "doceditor.php?fileID=" . $filename . "&user=" . $_GET["user"];
        header('Location: ' . $new_url, true);
        exit;
    }



    $fileuri = FileUri($acc_id, $filename, true);
    $fileuriUser = FileUri($acc_id, $filename);
    $docKey = getDocEditorKey($acc_id, $filename);
    $filetype = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    
    $uid=0;
    $uname = $_GET["user"];

    $editorsMode = empty($_GET["action"]) ? "edit" : $_GET["action"];
    $canEdit = in_array(strtolower('.' . pathinfo($filename, PATHINFO_EXTENSION)), $GLOBALS['DOC_SERV_EDITED']);
    $mode = $canEdit && $editorsMode != "view" ? "edit" : "view";

    $config = [
        "type" => empty($_GET["type"]) ? "desktop" : $_GET["type"],
        "documentType" => getDocumentType($filename),
        "document" => [
            "title" => $org_name,
            "url" => $fileuri,
            "fileType" => $filetype,
            "key" => $docKey,
            "info" => [
                "author" => "Me",
                "created" => date('d.m.y')
            ],
            "permissions" => [
                "comment" => $editorsMode != "view" && $editorsMode != "fillForms" && $editorsMode != "embedded" && $editorsMode != "blockcontent",
                "download" => true,
                "edit" => $canEdit && ($editorsMode == "edit" || $editorsMode == "filter" || $editorsMode == "blockcontent"),
                "fillForms" => $editorsMode != "view" && $editorsMode != "comment" && $editorsMode != "embedded" && $editorsMode != "blockcontent",
                "modifyFilter" => $editorsMode != "filter",
                "modifyContentControl" => $editorsMode != "blockcontent",
                "review" => $editorsMode == "edit" || $editorsMode == "review"
            ]
        ],
        "editorConfig" => [
            "mode" => $mode,
            "lang" => empty($_COOKIE["ulang"]) ? "en" : $_COOKIE["ulang"],
            "callbackUrl" => getCallbackUrl($acc_id, $filename),
            "user" => [
                "id" => $uid,
                "name" => $uname
            ],
            "embedded" => [
                "saveUrl" => $fileuriUser,
                "embedUrl" => $fileuriUser,
                "shareUrl" => $fileuriUser,
                "toolbarDocked" => "top",
            ],
            "customization" => [
                "about" => true,
                "feedback" => true,
                "autosave" => false,
                "customer" => [
                    "logo" => serverPath().$GLOBALS['Logo_Url'],
                ],
                "goback" => [
                    "url" => serverPath(),
                ],
                "logo" => [
                "image" => serverPath().$GLOBALS['Logo_Url'],
                "imageEmbedded" => serverPath().$GLOBALS['Logo_Url'],
                "url" => serverPath(),
            ]

            ]
        ]
    ];

    if (isJwtEnabled()) {
        $config["token"] = jwtEncode($config);
    }

    function tryGetDefaultByType($createExt) {
        $demoName = ($_GET["sample"] ? "demo." : "new.") . $createExt;
        $demoFilename = GetCorrectName($demoName);

        if(!@copy(dirname(__FILE__) . DIRECTORY_SEPARATOR . "app_data" . DIRECTORY_SEPARATOR . $demoName, getStoragePath($demoFilename)))
        {
            sendlog("Copy file error to ". getStoragePath($demoFilename), "common.log");
            //Copy error!!!
        }

        createMeta($demoFilename, $_GET["user"]);

        return $demoFilename;
    }

    function getCallbackUrl($acc_id, $fileName) {
        return serverPath(TRUE) . '/' . "webeditor-ajax.php" . "?type=track" . "&fileName=" . urlencode($fileName) . "&ac_id=" . urlencode($acc_id);
    }

    function getHistory($acc_id, $filename, $filetype, $docKey, $fileuri) {
        $histDir = getHistoryDir(getStoragePath($acc_id, $filename));

        if (getFileVersion($histDir) > 0) {
            $curVer = getFileVersion($histDir);

            $hist = [];
            $histData = [];

            for ($i = 0; $i <= $curVer; $i++) {
                $obj = [];
                $dataObj = [];
                $verDir = getVersionDir($histDir, $i + 1);

                $key = $i == $curVer ? $docKey : file_get_contents($verDir . DIRECTORY_SEPARATOR . "key.txt");
                $obj["key"] = $key;
                $obj["version"] = $i;

                if ($i == 0) {
                    $createdInfo = file_get_contents($histDir . DIRECTORY_SEPARATOR . "createdInfo.json");
                    $json = json_decode($createdInfo, true);

                    $obj["created"] = $_GET["up_dat"];
                    $obj["user"] = [
                        "id" => 0,
                        "name" => $_GET["user"]
                    ];
                }

                $prevFileName = $verDir . DIRECTORY_SEPARATOR . "prev." . $filetype;
                $prevFileName = substr($prevFileName, strlen(getStoragePath($acc_id, $filename)));
                sendlog("prevFileName=> ". $prevFileName, "common.log");
                 sendlog("history_getVirtualPath=> ". getVirtualPath($acc_id, true), "common.log");
                $dataObj["key"] = $key;
                $dataObj["url"] = $i == $curVer ? $fileuri : getVirtualPath($acc_id, true) .$filename. str_replace("%2F", "/", rawurlencode($prevFileName));
                $dataObj["version"] = $i;
                sendlog("======================historystart=============================== ", "common.log");
                sendlog("url=> ". $dataObj["url"], "common.log");

                if ($i > 0) {
                    $changes = json_decode(file_get_contents(getVersionDir($histDir, $i) . DIRECTORY_SEPARATOR . "changes.json"), true);
                    $change = $changes["changes"][0];

                    $obj["changes"] = $changes["changes"];
                    $obj["serverVersion"] = $changes["serverVersion"];
                    $obj["created"] = $change["created"];
                    $obj["user"] = $change["user"];

                    $prev = $histData[$i -1];
                    $dataObj["previous"] = [
                        "key" => $prev["key"],
                        "url" => $prev["url"]
                    ];
                    $changesUrl = getVersionDir($histDir, $i) . DIRECTORY_SEPARATOR . "diff.zip";
                    $changesUrl = substr($changesUrl, strlen(getStoragePath($acc_id, $filename)));

                    $dataObj["changesUrl"] = getVirtualPath($acc_id, true) .$filename. str_replace("%2F", "/", rawurlencode($changesUrl));
                    sendlog("changesUrl=> ". $dataObj["changesUrl"], "common.log");
                    sendlog("=========================historyend============================ ", "common.log");
                }

                array_push($hist, $obj);
                $histData[$i] = $dataObj;
            }

            $out = [];
            array_push($out, [
                    "currentVersion" => $curVer,
                    "history" => $hist
                ],
                $histData);
            return $out;
        }
    }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="icon" href="./favicon.ico" type="image/x-icon" />
    <title>Ategrity Specialty Insurance Company</title>

    <style>
        html {
            height: 100%;
            width: 100%;
        }

        body {
            background: #fff;
            color: #333;
            font-family: Arial, Tahoma,sans-serif;
            font-size: 12px;
            font-weight: normal;
            height: 100%;
            margin: 0;
            overflow-y: hidden;
            padding: 0;
            text-decoration: none;
        }

        form {
            height: 100%;
        }

        div {
            margin: 0;
            padding: 0;
        }
    </style>

    <script type="text/javascript" src="<?php echo $GLOBALS["DOC_SERV_API_URL"] ?>"></script>

    <script type="text/javascript">

        var docEditor;
        var fileName = "<?php echo $filename ?>";
        var fileType = "<?php echo strtolower(pathinfo($filename, PATHINFO_EXTENSION)) ?>";

        var innerAlert = function (message) {
            if (console && console.log)
                console.log(message);
        };

        var onAppReady = function () {
            innerAlert("Document editor ready");
        };

                var onCollaborativeChanges = function () {
            console.log("The document changed by collaborative user");
        }; // main for auto save

        var onDocumentStateChange = function (event) {
            if (event.data) {
                console.log("The document changed");
            } else {
                console.log("Changes are collected on document editing service");
            }
            var title = document.title.replace(/\*$/g, "");
            document.title = title + (event.data ? "*" : "");
        };

        var onRequestEditRights = function () {
            console.log("Document Editor requests editing rights");
            location.href = location.href.replace(RegExp("action=view\&?", "i"), "");
        };

        var onError = function (event) {
            console.log("Document Editor reports an error: code " + event.data.errorCode + ", description " + event.data.errorDescription);
            if (event)
                innerAlert(event.data);
        };

        var onOutdatedVersion = function (event) {
            location.reload(true);
        };

        var сonnectEditor = function () {

            <?php
                if (!file_exists(getStoragePath($acc_id, $filename))) {
                    echo "alert('File not found'); return;";
                }
            ?>

            var config = <?php echo json_encode($config) ?>;

            config.width = "100%";
            config.height = "100%";

            config.events = {
                'onAppReady': onAppReady,
                'onDocumentStateChange': onDocumentStateChange,
                'onRequestEditRights': onRequestEditRights,
                'onError': onError,
                'onOutdatedVersion': onOutdatedVersion,
                'onCollaborativeChanges': onCollaborativeChanges,
            };

            <?php
                $out = getHistory($acc_id, $filename, $filetype, $docKey, $fileuri);
                $history = $out[0];
                $historyData = $out[1];
            ?>
            <?php if ($history != null && $historyData != null): ?>
            config.events['onRequestHistory'] = function () {
                docEditor.refreshHistory(<?php echo json_encode($history) ?>);
            };
            config.events['onRequestHistoryData'] = function (event) {
                var ver = event.data;
                var histData = <?php echo json_encode($historyData) ?>;
                docEditor.setHistoryData(histData[ver]);
            };
            config.events['onRequestHistoryClose'] = function () {
                document.location.reload();
            };
            <?php endif; ?>

            docEditor = new DocsAPI.DocEditor("iframeEditor", config);
        };

        if (window.addEventListener) {
            window.addEventListener("load", сonnectEditor);
        } else if (window.attachEvent) {
            window.attachEvent("load", сonnectEditor);
        }

    </script>
</head>
<body>
    <form id="form1">
        <div id="iframeEditor">
        </div>
    </form>
</body>
</html>