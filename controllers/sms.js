'use strict';

const https = require('https');
const qs = require('querystring');

const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Sms = require('../models/Sms');
const SmsAlone = require('../models/SmsAlone');
const Setting = require('../models/Setting');
const FN = require('../classes/functions');
const config = require('../configs/config');

let send_sms_uri = '/v2/sms/tpl_single_send.json';
let tpl_id = 1309895;
let tpl_id2 = 1353625;

let post = function (msgid, msg) {
    let options = {
        hostname: config.sms_host,
        port: config.sms_port,
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
        '#admin#': Setting.admin_tel
    };
    let post_data = {
        'apikey': config.sms_apikey,
        'mobile': mobile,
        'tpl_id': tpl_id,
        'tpl_value': qs.stringify(tpl_value)
    };

    let content = qs.stringify(post_data);

    var req = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            chunk = JSON.parse(chunk);
            if (chunk.code == 0) {
                Sms.update({'log': {$elemMatch: {_id: msg._id}}}, {
                    $set: {
                        "log.$.status": 1,
                        "log.$.fee": chunk.fee,
                        "log.$.sid": chunk.sid
                    }
                }, function (err, data) {
                    console.log(data);
                });
            } else {
                Sms.update({'log': {$elemMatch: {_id: msg._id}}}, {
                    $set: {
                        "log.$.status": 2,
                        "log.$.err_code": chunk.code,
                        "log.$.err_msg": chunk.msg
                    }
                }, function (err) {
                    if (err) console.log(err);
                });
            }
        });
    });
    req.write(content);
    req.end();
};


exports.list = function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    page--;
    let pageNum = 5;

    Sms.find({}).sort({'name': -1}).skip(page * pageNum).limit(pageNum).exec(function (err, doc) {
        Sms.count({},function(err,count){
            res.render('sms/list', {
                list: doc,
                pages: {
                    current: parseInt(page) + 1,
                    total : Math.ceil(count/pageNum)
                }
            });
        })
    });

};

exports.send = function (req, res) {

    let arr = req.query.arr;

    Order.find({_id: {$in: arr}}).populate('owner').exec(function (err, doc) {

        let msg = new Sms();
        msg.name = new Date().getTime();

        for (var i = 0; i < doc.length; i++) {
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
        msg.save(function () {
            for (var val of msg.log) {
                console.log(val);
                post(msg._id, val);
            }
            res.send(FN.resData(0, '已加入短信发送池'));
        });
    });
};

exports.alone = function(req,res){
    SmsAlone.find({}).sort({'name': -1}).limit(1).exec(function (err, doc) {
        SmsAlone.count({},function(err,count){
            res.render('sms/list_alone', {
                list: doc
            });
        })
    });
};

exports.sendAlone = function(req,res){

    let tel = req.query.tel;
    let msg_alone = new SmsAlone();
    msg_alone.name = new Date().getTime();
    let options = {
        hostname: config.sms_host,
        port: config.sms_port,
        path: send_sms_uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    for(let i=0;i<tel.length;i++){

        let mobile = tel[i];

        let post_data = {
            'apikey': config.sms_apikey,
            'mobile': mobile,
            'tpl_id': tpl_id2
        };

        let content = qs.stringify(post_data);

        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                chunk = JSON.parse(chunk);
                if(chunk.http_status_code == 400){
                    msg_alone.log.push({
                        "sid": '',
                        "tel": mobile,
                        "status": 2,
                        "err_code": chunk.code,
                        "err_msg": chunk.msg
                    });
                }else if(chunk.code == 0) {
                    msg_alone.log.push({
                        "sid": chunk.sid,
                        "tel": mobile,
                        "status": 1,
                        "fee": chunk.fee
                    });
                } else {
                    msg_alone.log.push({
                        "sid": chunk.sid,
                        "tel": mobile,
                        "status": 2,
                        "err_code": chunk.code,
                        "err_msg": chunk.msg
                    });
                }
                if(msg_alone.log.length==tel.length){
                    msg_alone.save();
                }
            });
        });
        req.write(content);
        req.end();
    }
    res.send(FN.resData(0, '已加入短信发送池'));
};

