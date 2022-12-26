<?php
//修改
$arr = "notice";
$json_id = $_POST["json_id"];
if(is_file("./resource/common/json/".$json_id.".json")){
    $json_string = file_get_contents("./resource/common/json/".$json_id.".json");// 从文件中读取数据到php变量
}
else{
    if($_POST["json_id"]!=""){
        if(is_numeric($_POST["json_id"])){
            echo "已创建id为".$json_id."的json文件<br>";
            fopen("./resource/common/json/".$json_id.".json", "w");
            fclose("./resource/common/json/".$json_id.".json");
            $json_string = file_get_contents("./resource/common/default.json");
        }
        else{
            echo "ID应该为纯数字！<br> 将在三秒后返回……";
            exit ('<meta http-equiv="refresh" content="3;url=./set.php">'); 
        }
    }
    else {
        echo "ID不可为空！<br> 将在三秒后返回……";
        exit ('<meta http-equiv="refresh" content="3;url=./set.php">'); 
    }
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

try{
    for ($i = 0; $i < 12; $i++){
        $data["time_set"][$i] = $_POST["time_set".$i];
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
echo "完成写入了！请记住您的json_id为".$json_id."<br>将在8秒后返回……<br>";
echo "<a href='./set.php?json_id=".$json_id."'>单击此处立即返回</a>";
exit ('<meta http-equiv="refresh" content="8;url=./set.php?json_id='.$json_id.'">');
?>
