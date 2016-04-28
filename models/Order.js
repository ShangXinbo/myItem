/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const map = require('../configs/map.js');

const mongoose = require('mongoose');

/*
* children schema of Customer
* */
const Schema = new mongoose.Schema({
    code: Number,
    owner: mongoose.Schema.Types.ObjectId,
    company: Number,
    pick_way: Number,
    status: Number,
    in_time:Number,
    out_time: Number,
    add_time: Date
});

Schema.virtual('text_company').get(function(){
    return map.curier_company[this.company];
});
Schema.virtual('text_pick_way').get(function(){
    return map.curier_pick_way[this.pick_way];
});
Schema.virtual('text_status').get(function(){
    return map.order_status[this.status];
});


Schema.statics.getLists = function (param, start, count, cb) {
    this.find(param, cb).skip(start).limit(count);
};


Schema.statics.findByUserId = function (id, cb) {
    this.find({owner:id}, cb);
};


Schema.static.del = function(id,cb){
    this.remove({_id:id},cb);
};


const Order = mongoose.model('order', Schema);
module.exports = Order;
