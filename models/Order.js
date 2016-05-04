/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const map = require('../configs/map.js');
const FN = require('../classes/functions.js');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/*
* children schema of Customer
* */
const Schema = new mongoose.Schema({
    code: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref : 'Customer'},
    company: Number,
    pick_way: Number,
    status: Number,
    in_time: Date,
    out_time: Date,
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

Schema.virtual('format_in_time').get(function(){
    return FN.dateFormat(this.in_time).substr(0,10);
});

Schema.statics.getLists = function (param, start, count, cb) {
    this.find(param, cb).sort({'in_time':-1}).skip(start).limit(count);
};

Schema.statics.findByUserId = function (id, cb) {
    this.find({owner:id}, cb).sort({'in_time':-1});
};

Schema.static.del = function(id,cb){
    this.remove({_id:id},cb);
};

const Order = mongoose.model('Order', Schema);
module.exports = Order;
