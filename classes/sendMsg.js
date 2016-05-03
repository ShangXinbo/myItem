'use strict';


const https = require('https');
const qs = require('querystring');
const FN = require('../classes/functions');

const apikey = '80b19200e90dcc958506a48fea5387eb';
const hostName = 'sms.yunpian.com';


let post = function(uri,content,callback){
    let options = {
        hostname: hostName,
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
    });
    req.write(content);
    req.end();*/
    console.log('发送成功');
};


exports.sendBatch = function(req,res,msg){
    let send_sms_uri = '/v2/sms/tpl_single_send.json';
    let tpl_id = 1309895;
    for(let val of msg.log){
        let mobile = val.tel;
        let tpl_value = {
            '#userName#': val.username,
            '#code#': val.code,
            '#admin#': 18612119498
        };
        let post_data = {
            'apikey': apikey,
            'mobile': mobile,
            'tpl_id': tpl_id,
            'tpl_value': qs.stringify(tpl_value)
        };
        let content = qs.stringify(post_data);
        post(send_sms_uri,content,function(data){
            //更新短信记录状态
            if(data.code == 0){ //success

            }else{

            }
        });
    }
    res.send(FN.resData(0,'已加入短信发送池'));
};

