import plugin from '../../lib/plugins/plugin.js'
import fetch from 'node-fetch'
import schedule from 'node-schedule'
import {segment} from'oicq'
import common from'../../lib/common/common.js'
import lodash from "lodash";

import { createRequire } from 'module'
const require = createRequire(import.meta.url)


let groupnumber_list = [1169863627, 1149486254]//开启定时推送的群号

//let rule =`秒 分 时 * * ?` 改完记得重启一下
//auto_send 是每日群早报开关，1开0关
let rule =`0 0 7 * * ?`
let auto_send = 1


var json_id = `data` //id名，可在https://www.pro-ivan.com/api/daily/set.php?json_id={你想要的id}进行初始化
var api_url = `http://www.pro-ivan.com/api/daily/?json_id=` //api地址
let url = api_url + json_id 
let job = schedule.scheduleJob(rule, async (e) => {
    console.log('日程已获取');
    
    if (auto_send == 1){
    
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
          ]
    });
    const page = await browser.newPage();
    await page.goto(url, {
       timeout: 30 * 1000,
       waitUntil: [
           'load',                       //等待 “load” 事件触发
           'domcontentloaded',  //等待 “domcontentloaded” 事件触发
           'networkidle0',          //在 500ms 内没有任何网络连接
           'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
       ]
    });
    await page.waitForSelector('#done');
    await page.setViewport({
        width: 1000,
        height: 980
    });
    await page.screenshot({
        path: `./daily_info.png`,
        fullPage: true
    })
    await browser.close();
    
    for(var i=0;i<groupnumber_list.length;i++){
        Bot.pickGroup(groupnumber_list[i]).sendMsg(segment.image("./daily_info.png"));
        common.sleep(3000)
        Bot.pickGroup(groupnumber_list[i]).sendMsg('新的一天又开始啦，这是今日日程，请查收~~');
    }
    function deleteFile(name)   
    {   
        var fso = new ActiveXObject("Scripting.FileSystemObject");   
        if(fso.FileExists(name))   
            fso.DeleteFile(name);   
        else
            return false;   
    }     
    deleteFile("./daily_info.png");
    }
}
);

export class daily extends plugin {
  constructor () {
    super({
      /** 功能名称 */
      name: '每日日程',
      /** 功能描述 */
      dsc: '主动获得每日日程',
      /** https://oicqjs.github.io/oicq/#events */
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 2500,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^#?(今日)?(每日)?(今天)?的?(日程|课程)$',
          /** 执行方法 */
          fnc: 'daily'
        },
        {
          reg: '^#?(日程|课程)参数$',
          fnc: 'config'
        },
        {
          reg: '^#?(日程|课程)帮助$',
          fnc: 'help'
        }
      ]
    })
  }

  async daily (e) {
        await this.reply("正在拉取……");
        const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process'
              ]
        });
        const page = await browser.newPage();
        await page.goto(url, {
           timeout: 30 * 1000,
           waitUntil: [
               'load',                       //等待 “load” 事件触发
               'domcontentloaded',  //等待 “domcontentloaded” 事件触发
               'networkidle0',          //在 500ms 内没有任何网络连接
               'networkidle2'           //在 500ms 内网络连接个数不超过 2 个
           ]
        });
        await page.waitForSelector('#done');
        await page.setViewport({
            width: 1000,
            height: 980
        });

    
        await this.reply(segment.image(await page.screenshot({
            fullPage: true
        })))
    
        await browser.close();
  }
  
  async config (e){
        if (e.isMaster){
            let sentence = ""
            if (auto_send == 1)
                sentence = "是\n激活自动发送的群："+groupnumber_list.toString()+"\n自动发送定时规则："+ rule;
            else
                sentence = "否"
            await this.reply("api地址："+api_url+"\nJson_ID："+json_id+"\n是否开启自动发送："+sentence);
        }else
            await this.reply("您不是Bot的管理者，无权查看配置信息");
  }
  
  async help (e){
      let sentence = ""
      if (e.isMaster)
        sentence = "\n输入 #日程参数 可检视使用的api地址以及配置的json_id"
      else
        sentence = ""
      await this.reply("输入 #每日日程 来拉取日程面板"+sentence);
  }
}
