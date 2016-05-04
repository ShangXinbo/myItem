
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
    //TODO 删除订单
    let id = req.query.id ;
    if(id){
        Order.del(id,function(err,doc){
            if(doc){
                res.send(FN.resData(0, '删除成功', data));
            }
        });
    }else{
        console.log('');
    }
};

exports.edit = function(req,res){
    //TODO 修改订单
    res.render('order.edit');
};