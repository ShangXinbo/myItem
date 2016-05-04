
'use strict';

const https = require('https');
const qs = require('querystring');

const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Sms = require('../models/Sms');
const FN = require('../classes/functions');

const apikey = '80b19200e90dcc958506a48fea5387eb1';
const hostName = 'sms.yunpian.com';
let send_sms_uri = '/v2/sms/tpl_single_send.json';
let tpl_id = 1309895;


let post = function(msgid,msg){
    let options = {
        hostname: hostName,
        port: 443,
        path: send_sms_uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };

    let mobile = msg.tel;
    let tpl_value = {
        '#userName#': msg.username,
        '#code#': msg.code,
        '#admin#': 15903168574
    };
    let post_data = {
        'apikey': apikey,
        'mobile': mobile,
        'tpl_id': tpl_id,
        'tpl_value': qs.stringify(tpl_value)
    };

    let content = qs.stringify(post_data);

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            chunk = JSON.parse(chunk);
            console.log(chunk);
            if(chunk.code==0){
                Sms.update({'log':{$elemMatch:{_id:msg._id}}}, {$set:{
                    "log.$.status" : 1,
                    "log.$.fee": chunk.fee,
                    "log.$.sid": chunk.sid
                }},function(err,data){
                    console.log(data);
                });
            }else{
                Sms.update({'log':{$elemMatch:{_id:msg._id}}}, {$set:{
                    "log.$.status" : 2,
                    "log.$.err_code": chunk.code,
                    "log.$.err_msg": chunk.msg
                }},function(err){
                    if(err) console.log(err);
                });
            }
        });
    });
    req.write(content);
    req.end();
};


exports.list = function(req,res){

    Sms.find({}).sort({'name':-1}).exec(function(err,doc) {
        res.render('sms/list',{
            list: doc
        });
    });

};

exports.send = function(req,res){

    let arr = req.query.arr;

    Order.find({_id: {$in:arr}}).populate('owner').exec(function(err,doc){

        let msg = new Sms();
        msg.name = new Date().getTime();

        for(var i=0;i<doc.length;i++){
            msg.log.push({
                username: doc[i].owner.name,
                tel: doc[i].owner.tel,
                code: doc[i].code,
                status: 0,   //正在发送中
                mark: ''
            });
            doc[i].status = 1;
            doc[i].save();
        }
        msg.save(function(){
            for(let val of msg.log){
                post(msg._id,val);
            }
            res.send(FN.resData(0,'已加入短信发送池'));
        });
    });
};