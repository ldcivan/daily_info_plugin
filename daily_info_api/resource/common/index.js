function  GetQueryString(name)
{
      var  reg = new  RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
      var  r = window.location.search.substr(1).match(reg);
      if (r!= null ) return   unescape(r[2]); return  null ;
}

var json_id = GetQueryString("json_id") 
// 读取json
var url = "./json/"+json_id+".json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/

var request = new XMLHttpRequest();

request.open("get", url);/*设置请求方法与路径*/

request.send(null);/*不发送数据到服务器*/

request.onload = function () {/*XHR对象获取到返回信息后执行*/

    if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
    
        var data = JSON.parse(request.responseText);
        
        console.log(data);
        
        renderTimetable(data);
        renderTimeSet(data);
        renderNotice(data);
        renderTime(data);
        renderBigNotice(data);
        document.getElementById("flag").innerHTML = '<div id="done"></div>';
        renderOther(data);
    }

}

// 设定时间
date = new Date()
var day = date.getDay(); //获取星期数0-6（0为周日）
var month = date .getMonth() + 1; //获取当前月份(0-11,0代表1月)
var date = date .getDate(); //获取当前日(1-31)
var cn_zh_day = ["日", "一", "二", "三", "四", "五", "六"] //星期数字汉字化



function renderTimetable (data) {
    document.getElementById("class1").innerHTML = data.timetable[day].class1;
    document.getElementById("class2").innerHTML = data.timetable[day].class2;
    document.getElementById("class3").innerHTML = data.timetable[day].class3;
    document.getElementById("class4").innerHTML = data.timetable[day].class4;
    document.getElementById("class5").innerHTML = data.timetable[day].class5;
    document.getElementById("class6").innerHTML = data.timetable[day].class6;
    document.getElementById("class7").innerHTML = data.timetable[day].class7;
    document.getElementById("class8").innerHTML = data.timetable[day].class8;
    document.getElementById("class9").innerHTML = data.timetable[day].class9;
    document.getElementById("class10").innerHTML = data.timetable[day].class10;
    document.getElementById("class11").innerHTML = data.timetable[day].class11;
    if (day == 5|day == 6) {
        document.getElementById("class0").innerHTML = "&nbsp;<br>&nbsp;";
    }
}

function renderTimeSet (data) {
    for (var i = 0; i < 12; i++){
        if (data.time_set[i]!=''){
            document.getElementById("time_set"+String(i)).innerHTML = data.time_set[i];
        }
    }
    if (data.time_set[5] == "0"){
        document.getElementById("time_set5").innerHTML = "&nbsp;";
        document.getElementById("class0").innerHTML = "&nbsp;<br>&nbsp;";
    }
}

function renderNotice (data) {
    if (data.notice[0]!="")
        document.getElementById("notice1").innerHTML = "1. " + data.notice[0];
    if (data.notice[1]!="")
        document.getElementById("notice2").innerHTML = "2. " + data.notice[1];
    if (data.notice[2]!="")
        document.getElementById("notice3").innerHTML = "3. " + data.notice[2];
    if (data.notice[3]!="")
        document.getElementById("notice4").innerHTML = "4. " + data.notice[3];
    if (data.notice[4]!="")
        document.getElementById("notice5").innerHTML = "5. " + data.notice[4];
}

function renderTime (data) {
    var time = month + "月" + date + "日 · 星期" + cn_zh_day[day]
    document.getElementById("time").innerHTML = time;
}

function renderBigNotice (data) {
    var big_noticeInner = '<div class="box"><center style="font-size:28px;color:red;">'+data.big_info+'</center></div>';
    if (data.big_notice == 1)
        document.getElementById("big_notice").innerHTML = big_noticeInner;
}

function renderOther (data) {
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("subtitle").innerHTML = data.subtitle;
    document.getElementById("timetable_name").innerHTML = data.timetable_name;
    if (data.bg_img != ""){
        var css='body {background: url("' + data.bg_img + '") white center top no-repeat;background-size: cover;}'
        function add_css(str_css) { //Copyright @ rainic.com
            try { //IE下可行
            var style = document.createStyleSheet();
            style.cssText = str_css;
            }
            catch (e) { //Firefox,Opera,Safari,Chrome下可行
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = str_css;
            document.getElementsByTagName("HEAD").item(0).appendChild(style);
            }
        }
        add_css(css)
    }
    if (data.head_img != ""){
        document.getElementById("head_img").src = data.head_img
    }
}



