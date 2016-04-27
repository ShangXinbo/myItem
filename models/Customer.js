/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const mongoose = require('mongoose');

/*
* children schema of Customer
* */
const OrderSchema = new mongoose.Schema({
    code: Number,
    company: Number,
    pick_way: Number,
    status: Number,
    in_time:Number,
    out_time: Number
    //TODO 信息添加的时间,用于数据排序
});

const CustomerSchema = new mongoose.Schema({
    name: String,
    tel: String,
    town: Number,
    useful: Boolean,
    marks: String,
    orders:[OrderSchema],   //sub-document
    join_time: Number,
    last_time: Number
});

/*
 * @param start Number
 * @param end Nunber
 * @param cb Function
 * */
CustomerSchema.statics.getUserLists = function (param, start, count, cb) {
    this.find(param, cb).skip(start).limit(count);
};

/*
 * @param start Number
 * @param end Nunber
 * @param cb Function
 * */
CustomerSchema.statics.findUserById = function (id, cb) {
    this.findOne({_id:id}, cb);
};


/*
* @param id ObjectId
* */
CustomerSchema.statics.delUsersByIdArr = function(arr,cb){
    this.remove({_id:{$in:arr}},cb);
};

/*
* add customer
* */
CustomerSchema.statics.addUser = function(obj,cb){
    this.create(obj,cb);
};


/*
 * getAllUserOrders
 * */
CustomerSchema.statics.getAllOrders = function(id,obj,cb){
    this.create(obj,cb);
};

/*
 * delete Order
 * */
CustomerSchema.statics.delOrder = function(id,obj,cb){
    this.create(obj,cb);
};


/*
 * Collection Name customers
 * */
const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;
