'use strict';

const Setting = require('../models/Setting');
const FN = require('../classes/functions');

exports.index = function(req, res) {
    Setting.findOne({},function(err,doc){
        res.render('setting/index', {
            title: "上传文件",
            setting:doc
        });
    });

};

exports.edit = function(req,res){
    let admin_tel = req.query.admin_tel;
    Setting.find({},function(err,doc){
        if(doc.length<=0){
            Setting.create({'admin_tel':admin_tel},function(err,doc) {
                res.send(FN.resData(0, '更新成功'));
            });
        }else{
            Setting.update({}, {$set:{'admin_tel':admin_tel}}, function(err,doc){
                res.send(FN.resData(0, '更新成功'));
            });
        }
    })
};