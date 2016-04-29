
'use strict';

const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Sms = require('../models/Sms');

exports.edit = function(req,res){
    //TODO SMS edit model
    res.send('asdf');
};

exports.send = function(req,res){

    let arr = req.query.arr;

    Order.find({_id: {$in:arr}}).populate('owner').exec(function(err,doc){

        let msg = new Sms();
        msg.name = new Date().getTime();

        for(var i=0;i<doc.length;i++){
            //TODO 更新状态
            msg.log.push({
                username: doc[i].owner.name,
                tel: doc[i].owner.tel,
                code: doc[i].code,
                status: 0,   //正在发送中
                mark: ''
            });
        }
        msg.save(function(){
            //TODO 发送短信
            Sms.sendSingle(req,res,msg);
        });
    });
};