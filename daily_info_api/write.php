<?php
//修改
$arr = "notice";
$json_id = $_POST["json_id"];
if(is_file("./resource/common/json/".$json_id.".json")){
    $json_string = file_get_contents("./resource/common/json/".$json_id.".json");// 从文件中读取数据到php变量
}
else{
    echo "创建id为".$json_id."的json文件";
    fopen("./resource/common/json/".$json_id.".json", "w");
    fclose("./resource/common/json/".$json_id.".json");
    $json_string = file_get_contents("./resource/common/default.json");
}
$data = json_decode($json_string,true);// 把json字符串转成php数组
try{
    for ($i = 0; $i < 5; $i++){
        $data[$arr][$i]=$_POST[strval($i)];
    }
}
catch (Exception $e) {
    exit();
}

try{
    for ($i = 1; $i < 12; $i++){
        for ($j = 0; $j < 7; $j++){
            $data["timetable"][$j]["class".$i] = $_POST[strval($j.$i)];
        }
    }
}
catch (Exception $e) {
    exit();
}

if ($_POST["big_notice"] == 1)
    $data["big_notice"]=$_POST["big_notice"];
else {
    $data["big_notice"]=0;
}
$data["big_info"]=$_POST["big_info"];

$data["title"]=$_POST["title"];
$data["subtitle"]=$_POST["subtitle"];
$data["timetable_name"]=$_POST["timetable_name"];
$data["head_img"]=$_POST["head_img"];
$data["bg_img"]=$_POST["bg_img"];

$json_strings = json_encode($data);
file_put_contents("./resource/common/json/".$json_id.".json",$json_strings);//写入
echo "完成写入了！将在3秒后返回……";
exit ('<meta http-equiv="refresh" content="3;url=./set.php?json_id='.$json_id.'">');
?>
