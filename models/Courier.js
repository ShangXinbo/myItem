/**
 * Created by 31491 on 2016/4/14.
 */

'use strict';

const mongoose = require('mongoose');
const courierSchema = new mongoose.Schema({
    name: String,
    tel: String,
    town: Number,
    join_time:Number,
    last_time: Number
});

let Courier = mongoose.model('Courier', courierSchema);

e