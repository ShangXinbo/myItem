/**
 * Created by 31491 on 2016/4/14.
 * Model Customers
 *
 */

'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    admin_tel: Number

});

const Setting = mongoose.model('Setting', Schema);
module.exports = Setting;
