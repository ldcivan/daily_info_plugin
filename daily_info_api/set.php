<title>日程API设置</title>

<style>
    body {
        margin:20 30 20 30;
    }
    .content {
        margin-left:20px;
    }
</style>
<?php
$arr = "notice";
$json_id = $_GET["json_id"];

if(is_file("./resource/common/json/".$json_id.".json")){
    $json_string = file_get_contents("./resource/common/json/".$json_id.".json");// 从文件中读取数据到php变量
}
else{
    echo "<h5>请注意：您正在创建一个新的配置文件，ID为".$json_id."</h5><h5>预览前请先更新一次，否则预览无效</h5>";
    $json_string = file_get_contents("./resource/common/default.json");
}
$data = json_decode($json_string,true);// 把json字符串转成php数组
echo "<h3>通告(不用编号，按顺序写会自动编号)</h3><form method='post' action='./write.php'><div class='content'>";
try{
    for ($i = 0; $i < 5; $i++){
        echo "<input id= '".$i."' name='".$i."' type='text' style='width:80%;'; value='";
        print $data[$arr][$i];
        echo "'><br>";
    }
}
catch (Exception $e) {
    exit();
}
echo "</div><br><hr><h3>是否开启大字提示</h3><div class='content'><lable>开启<input id= 'big_notice' name='big_notice' type='checkbox' value='1'";
if($data["big_notice"] == 1) 
    echo "checked=checked";
echo "></lable><br><lable>内容<input id= 'big_info' name='big_info' type='text' value='";
echo $data["big_info"];
echo "' style='width:80%;'></div><br><br><hr><h3>课表(一列为一日，第一列为周日)</h3><div class='content'>";
try{
    for ($i = 1; $i < 12; $i++){
        for ($j = 0; $j < 7; $j++){
            echo "<input id= '".$j.$i."' name='".$j.$i."' type='text' style='width:12%;'; value='";
            print $data["timetable"][$j]["class".$i];
            echo "'>";
        }
        echo "<br>";
    }
}
catch (Exception $e) {
    exit();
}
echo "<br><br><hr><h3>杂项</h3>主标题：<input id= 'title' name='title' type='text' value='";
print $data["title"];
echo "'><br>备忘录标题：<input id= 'subtitle' name='subtitle' type='text' value='";
print $data["subtitle"];
echo "'><br>课表标题:<input id= 'timetable_name' name='timetable_name' type='text' value='";
print $data["timetable_name"];
echo "'><br>头像url(留空则使用默认头像)：<input id= 'head_img' name='head_img' type='text' value='";
print $data["head_img"];
echo "'><br>背景url(留空则使用默认背景)：<input id= 'bg_img' name='bg_img' type='text' value='";
print $data["bg_img"];
echo "'><br>可在<a href='http://www.pro-ivan.com/new-upload.html'>此处</a>上传头像或背景，并自行复制链接填入框体";

echo "<hr>请确认好您的jsonid是：<input id= 'json_id' name='json_id' type='text' value='";
echo $json_id;
echo "' style='width:30%;'><br>*若非第一次配置，请勿随意更改上面一栏以免保存错误";
echo "<br><br><button type='submit' style='width:70px;height:30px;'>确定更新</button></div></form><button style='width:70px;height:30px;margin-left:20px;width:70px;height:30px;' onclick='preview()'>查看效果</button>";
exit ('<script>function preview(){window.open("./resource/common/daily_info.html?json_id='.$json_id.'", "_blank", "scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes,width=850,height=920");}</script>');

?>

