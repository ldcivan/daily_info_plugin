<?php
$json_id = $_GET["json_id"];
if (!$_GET["json_id"]){
    Header("Location: ./resource/common/ERR.html");
}else{Header("Location: ./resource/common/daily_info.html?json_id=".$json_id);}
?>
