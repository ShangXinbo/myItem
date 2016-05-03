/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const Customer = require('../models/Customer');
const mongoose = require('mongoose');

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

const Schema = new mongoose.Schema({
    name : Date,
    log : [SmsSchema]
});


const SmsLog = mongoose.model('Smslog', Schema);
module.exports = SmsLog;
