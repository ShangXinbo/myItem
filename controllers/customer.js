
'use strict';

const Customer = require('../models/Customer');
const FN = require('../models/functions');

exports.list = function(req,res){
    Customer.find({},function(err,doc){
        console.log(err);
        console.log(doc);
        res.render('customer_list',{
            title:'客户管理',
            customers: doc
        });
    });
};
exports.add = function(req,res){
    let name = req.query.name;
    let tel = req.query.tel;
    let time = new Date().getTime();
    let town = req.query.town;
    let customerEntity = new Customer({
        name: name,
        tel : tel,
        town: town,
        useful: 1,
        join_time : time,
        last_time: time
    });
    customerEntity.save(function(err,data){
        if(err)console.log(err);
        if(data){
            res.send(FN.resData(0,'添加成功',{}));
        }
    });
};
exports.del = function(req,res){
    let id = req.query.id;
    Customer.remove({_id:id},function(err,data){
        res.send(FN.resData(0,'删除成功',{}));
    })
};









