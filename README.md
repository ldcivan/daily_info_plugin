# daily_info_plugin(不建议使用)
以Yunzai-Bot为基础的日程提醒js插件，默认版式是为大学生设计的

# 安装与更新
请将js文件放置在/plugin/example下，api文件夹需要部署到网站上（所以不建议使用）。重启Yunzai-Bot后即可使用。

不提供自动更新，请手动下载更新

## Yunzai版本与支持
### V3云崽
经测试本插件可以稳定运行在V3云崽上

### V2云崽
未测试，未作适配

# 功能说明
### #每日日程
可选择刊登TO DO，时间表，并设置了独立的青年大学习开关（

以上内容可在/resource/common/data.json内设置（注意首先修改/resource/common/daily_info.html内的url为你的api所在地）

默认版式可参考<a href="https://www.pro-ivan.com/api/daily/resource/common/daily_info.html">此处</a>（推荐宽高：850*920）

默认版式可通过更改/resource/common/daily_info.html实现（代码比较乱，需要一点html基础才方便改；真改坏了就回来再下一个吧，做好data.json的备份就行）
### 定时发送面板
可设置定时发送面板，该功能可手动关闭

以上内容可在/resource/common/daily_info.html内设置

# 其他
感谢：

* [官方Yunzai-Bot-V3](https://github.com/Le-niao/Yunzai-Bot) : [Gitee](https://gitee.com/Le-niao/Yunzai-Bot)
  / [Github](https://github.com/Le-niao/Yunzai-Bot)
* [椰羊Plugin](https://github.com/yeyang52/yenai-plugin) : [Gitee](https://gitee.com/yeyang52/yenai-plugin)
  / [Github](https://github.com/yeyang52/yenai-plugin)
* [MDUI](https://github.com/zdhxiong/mdui) : [Gitee](https://gitee.com/zdhxiong/mdui)
  / [Github](https://github.com/zdhxiong/mdui)
