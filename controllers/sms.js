
'use strict';

var https = require('https');
var qs = require('querystring');

var apikey = '80b19200e90dcc958506a48fea5387eb';
// 修改为您要发送的手机号码，多个号码用逗号隔开
var mobile = '18612119498';
// 修改为您要发送的短信内容
var text = '【菜园韵达】您的快件已经被韵达小子接受了，请尽快领取';
// 指定发送的模板编号
var tpl_id = 1309895;
// 指定发送模板的内容
var tpl_value =  {'#code#':'1234','#company#':'yunpian'};

var sms_host = 'sms.yunpian.com';

var send_sms_uri = '/v2/sms/single_send.json';
// 指定模板发送接口https地址
var send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';


exports.send_sms = function(req,res,uri,apikey,mobile,text){
    var post_data = {  
    'apikey': apikey,  
    'mobile':mobile,
    'text':text,
    };//这是需要提交的数据  
    var content = qs.stringify(post_data);  
    post(uri,content,sms_host);
}

exports.send_tpl_sms = function(req,res,uri,apikey,mobile,tpl_id,tpl_value){
    var post_data = {  
    'apikey': apikey,
    'mobile':mobile,
    'tpl_id':tpl_id,
    'tpl_value':qs.stringify(tpl_value),  
    }; 
    var content = qs.stringify(post_data);  
    post(uri,content,sms_host); 
}

function post(uri,content,host){
    var options = {  
        hostname: host,
        port: 443,  
        path: uri,  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        }  
    };
    /*var req = https.request(options, function (res) {  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
        });  
    }); */
    console.log('发送成功');
    //req.write(content);  
    //req.end();   
};





