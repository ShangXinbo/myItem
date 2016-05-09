
'use strict';

const Order = require('../models/Order');
const Customer = require('../models/Customer');
const FN = require('../classes/functions');


exports.orderList = function(req,res){

    let page = req.query.page ? req.query.page : 1;
    let status = req.query.status? req.query.status : 0;
    page--;
    let pageNum = 15;
    let param = {};
    let keyword = '';
    if(req.query.keyword){
        keyword = FN.removeHTMLTag(req.query.keyword);
        if(keyword){
            if(isNaN(keyword)){
                Customer.findByName(keyword,function(err,doc){
                    getOrders({owner:doc._id,status:status});
                })
            }else{
                if(FN.isRealPhone(keyword)){
                    Customer.findByTel(keyword,function(err,doc){
                        getOrders({owner:doc._id,status:status});
                    })
                }else{
                    param.code = {$regex:eval('/'+ keyword+ '/i')};
                }
            }
        }
    }else{
        getOrders({status:status});
    }

    function getOrders(param){

        Order.find(param).skip(page * pageNum).limit(pageNum).sort({'in_time':-1}).populate('owner').exec(function(err,doc){
            Order.count(param,function(err,count){
                res.render('order/list', {
                    title: '订单管理',
                    keyword: keyword,
                    orders: doc,
                    status: status,
                    pages: {
                        current: parseInt(page) + 1,
                        total : Math.ceil(count/pageNum)
                    }
                });
            });
        });
    }
};

exports.delOrder = function(req,res){
    let arr = req.query.arr;
    if(arr.length){
        Order.delByIdArr(arr,function(err,data){
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
    //TODO 修改权限再考虑
    res.render('order.edit');
};


exports.taged = function(req,res){
    let method = req.query.tag;
    let arr = req.query.arr;
    method = method ? method: 0;
    console.log(method);
    Order.update({_id:{$in:arr}},{status:2,pick_way:method},function(err,doc){
        res.send(FN.resData(0, '更改成功'));
    });

};