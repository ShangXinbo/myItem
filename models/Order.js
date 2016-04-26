/**
 * Created by 31491 on 2016/4/14.
 */

'use strict';

const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    code: Number,
    company: Number,
    owner: String,
    pick_way: Number,
    status: Number,
    in_time:Number,
    out_time: Number
});

/*
 * @param start Number
 * @param end Nunber
 * @param cb Function
 * */
Schema.statics.getUserOrders = function (userId,cb) {
    this.find({_id:userId}, cb);
};






const Order = mongoose.model('Order', Schema);

module.exports = Order;
