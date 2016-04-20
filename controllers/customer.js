
'use strict';

//const https = require('https');
const Customer = require('../models/Customer');

exports.list = function(req,res){
    res.render('customer_list',{title:'客户管理'});
};
exports.add = function(req,res){
    console.log(req.params);
    console.log(req.body);
    let name = req.body.name;
    let tel = req.body.tel;
    let time = new Date();
    let town = req.body.town;
    res.end();
    let customerEntity = new Customer({
        name: name,
        tel : tel,
        town: town,
        useful: 1,
        join_time : time,
        last_time: time
    });
    //console.log(customerEntity);
    //console.log(customerEntity);
    customerEntity.save(function(err,data){
        ///console.log(err);
        //console.log(data);
    });

};









