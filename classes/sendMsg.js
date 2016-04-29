'use strict';


const https = require('https');
const qs = require('querystring');
const FN = require('../classes/functions');

const apikey = '80b19200e90dcc958506a48fea521321';
const sms_host = 'sms.yunpian.com';

let text = '【菜园韵达】您的快件已经被韵达小子接受了，请尽快领取';

/*发送请求*/
let post = function(req,res,uri){
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


exports.sendSingle = function(req,res,msg){
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

