/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const mongoose = require('mongoose');
const FN = require('../classes/functions.js');

const CustomerSchema = new mongoose.Schema({
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
CustomerSchema.statics.getLists = function (param, start, count, cb) {
    this.find(param, cb).sort({'last_time':-1}).skip(start).limit(count);
};

/*
 * @param start Number
 * @param end Nunber
 * @param cb Function
 * */
CustomerSchema.statics.findById = function (id, cb) {
    this.findOne({_id:id}, cb);
};


CustomerSchema.statics.findByName = function (name, cb) {
    this.findOne({name:{$regex:eval('/'+ name+ '/i')}}, cb);
};

CustomerSchema.statics.findByTel = function (tel, cb) {
    this.findOne({tel:tel}, cb);
};

CustomerSchema.virtual('format_join_time').get(function(){
    return FN.dateFormat(this.join_time);
});
CustomerSchema.virtual('format_last_time').get(function(){
    return FN.dateFormat(this.last_time);
});



/*
* @param id ObjectId
* */
CustomerSchema.statics.delByIdArr = function(arr,cb){
    this.remove({_id:{$in:arr}},cb);
};

/*
* add customer
* */
CustomerSchema.statics.add = function(obj,cb){
    this.create(obj,cb);
};

/*
 * Collection Name customers
 * */
const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
