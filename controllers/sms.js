
'use strict';


const https = require('https');
const qs = require('querystring');
const fn = require('../models/functions');

const apikey = '80b19200e90dcc958506a48fea5387eb';
const sms_host = 'sms.yunpian.com';


let text = '【菜园韵达】您的快件已经被韵达小子接受了，请尽快领取'; // text of message

/*发送请求*/
let post = function(req,res,uri,content){ 
    let options = {  
        hostname: sms_host,
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
    res.send(fn.resData(0, '发送成功', {}));
    res.end();   
};


exports.showtpl = function(req,res){
    res.render('sms',{title:'发送短信'});
}; 

exports.sendSingle = function(req,res){
    let send_sms_uri = '/v2/sms/single_send.json';
    let mobile = req.query;
    let post_data = {  
        'apikey': apikey,  
        'mobile': mobile,
        'text':text,
    }; 
    let content = qs.stringify(post_data); 
    post(req,res,send_sms_uri,content);
};

exports.send_tpl_sms = function(req,res,mobile){
    // 指定发送的模板编号
    var tpl_id = 1309895;
    // 指定发送模板的内容
    var tpl_value =  {'#code#':'1234','#company#':'yunpian'};
    // 指定模板发送接口https地址
    var send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';
    let post_data = {  
        'apikey': apikey,
        'mobile':mobile,
        'tpl_id':tpl_id,
        'tpl_value':qs.stringify(tpl_value),  
    }; 
    let content = qs.stringify(post_data);  
    post(req,res,send_sms_uri,content,sms_host); 
};







