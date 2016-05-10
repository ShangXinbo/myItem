/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const mongoose = require('mongoose');
const FN = require('../classes/functions.js');

const SchemaSmsAlone = new mongoose.Schema({
    sid : String,
    tel : Number,
    status: Number,
    err_code: String,
    err_msg : String,
    fee: String
});

const Schema = new mongoose.Schema({
    name : Date,
    log : [SchemaSmsAlone]
});

Schema.virtual('format_name').get(function(){
    return FN.dateFormat(this.name);
});

const SmsAlong = mongoose.model('SmsAlong', Schema);
module.exports = SmsAlong;
