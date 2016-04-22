/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    tel: String,
    town: Number,
    useful: Boolean,
    marks: String,
    join_time: Number,
    last_time: Number
});

/*
 * @param start Number
 * @param end Nunber
 * @param cb Function
 * */
Schema.statics.getLists = function (start, count, cb) {
    this.find({}, cb).skip(start).limit(count);
};

/*
* @param id ObjectId
* */
Schema.statics.delById = function(id,cb){
    this.remove({_id:id},cb);
};

/*
* add customer
* */
Schema.statics.add = function(obj,cb){
    this.create(obj,cb);
};

/*
 * Collection Name customers
 * */
const Customer = mongoose.model('customer', Schema);

module.exports = Customer;
