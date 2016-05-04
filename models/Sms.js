/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const Customer = require('../models/Customer');
const mongoose = require('mongoose');
const map = require('../configs/map.js');
const FN = require('../classes/functions.js');

const SmsSchema = new mongoose.Schema({
    username: String,
    tel : Number,
    code: String,
    status: Number,
    mark : String,
    err_code: String,
    err_msg : String,
    fee: String,
    sid : String
});

SmsSchema.virtual('text_status').get(function(){
    return map.sms_status[this.status];
});

const Schema = new mongoose.Schema({
    name : Date,
    log : [SmsSchema]
});

Schema.virtual('format_name').get(function(){
    return FN.dateFormat(this.name);
});


const SmsLog = mongoose.model('Smslog', Schema);
module.exports = SmsLog;
