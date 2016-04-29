
'use strict';

const Order = require('../models/Order');
const Customer = require('../models/Customer');
const FN = require('../classes/functions');


exports.orderList = function(req,res){

    //TODO 订单列表的类型   未通知订单，已通知订单，已领取订单
    let page = req.query.page ? req.query.page : 1;
    page--;
    let pageNum = 15;
    let param = {};
    let keyword = '';
    if(req.query.keyword){
        keyword = FN.removeHTMLTag(req.query.keyword);
        if(keyword){
            if(isNaN(keyword)){
                Customer.findByName(keyword,function(err,doc){
                    getOrders({owner:doc._id});
                })
            }else{
                if(FN.isRealPhone(keyword)){
                    Customer.findByTel(keyword,function(err,doc){
                        getOrders({owner:doc._id});
                    })
                }else{
                    param.code = {$regex:eval('/'+ keyword+ '/i')};
                }
            }
        }
    }else{
        getOrders({});
    }

    function getOrders(param){
        Order.getLists(param, page * pageNum, pageNum, function (err, doc) {
            Customer.count(param,function(err,count){
                res.render('order/list', {
                    title: '订单管理',
                    keyword: keyword,
                    orders: doc,
                    pages: {
                        current: parseInt(page) + 1,
                        total : Math.ceil(count/pageNum)
                    },
                    FN : FN
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