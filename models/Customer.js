/**
 * Created by 31491 on 2016/4/14.
 */

'use strict';

const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: String,
    tel: String,
    town: Number,
    useful: Boolean,
    marks: String,
    join_time:Number,
    last_time: Number,
});

module.exports = mongoose.model('Customer', customerSchema);
