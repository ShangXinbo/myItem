

'use strict';

const Customer = require('../models/Customer');
const map = require('../configs/map.js');
const FN = require('../classes/functions');

exports.list = function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    page--;
    let pageNum = 15;
    let param = {};
    let keyword = '';
    if(req.query.keyword){
        keyword = FN.removeHTMLTag(req.query.keyword);
        if(keyword){
            if(isNaN(keyword)){
                param.name = {$regex:eval('/'+ keyword+ '/i')};
            }else{
                param.tel = {$regex:eval('/'+ keyword+ '/i')};
            }
        }
    }

    Customer.getUserLists(param, page * pageNum, pageNum, function (err, doc) {
        Customer.count(param,function(err,count){
            res.render('customer/list', {
                title: '客户管理',
                keyword: keyword,
                customers: doc,
                pages: {
                    current: parseInt(page) + 1,
                    total : Math.ceil(count/pageNum)
                },
                FN : FN
            });
        });
    });
};

exports.add = function (req, res) {
    let name = req.query.name;
    let tel = req.query.tel;
    let time = new Date().getTime();
    let town = req.query.town;

    if(name && FN.isRealPhone(tel)){
        Customer.addUser({
            name: name,
            tel: tel,
            town: town ? town : 1,   // default '菜园村'
            useful: 1,
            join_time: time,
            last_time: time
        },function(err,data){
            if (data) {
                res.send(FN.resData(0, '添加成功', data));
            }else{
                res.send(FN.resData(1, err.toString()));
            }
        });
    }else{
        res.send(FN.resData(1, '参数格式不正确，添加失败'));
    }
};

exports.del = function (req, res) {
    let arr = req.query.arr;
    if(arr.length){
        Customer.delUsersByIdArr(arr,function(err,data){
            if(data){
                res.send(FN.resData(0, '删除成功'));
            }else{
                res.send(FN.resData(1, err.toString()));
            }
        });
    }else {
        res.send(FN.resData(2, '没有指定可删除的数据id'));
    }

};

exports.edit = function(req,res){
    let getId = req.query.id;
    let postId = req.body.id;
    if(getId){
        Customer.findUserById(getId,function(err,doc){
            res.render('customer/edit',{data:doc});
        });
    }else{
        if(postId){

        }else{
            
        }
    }
};

exports.userOrders = function(req,res){
    let getId = req.query.id;
    if(getId){
        Customer.findUserById(getId,function(err,doc){
            res.render('customer/orders',{data:doc});
        });
    }else{
        console.log('');
    }
};


exports.addOrder = function(req,res){
    let getId = req.query.id;
    let code = req.query.code;
    let company = req.query.company;
    let now = new Date().getTime();

    //TODO 入库时间转化

    Customer.findUserById(getId,function(err,doc){
        doc.orders.push({
            code: code,
            company: map.company[company],
            pick_way: map.pick_way[0],
            status: map.order_status[0],
            in_time : now
        });
        doc.save(function(){
            res.send(FN.resData(0, '添加成功'));
        });
    });
};








