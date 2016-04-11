
'use strict';

const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    last_login_time : Number 
});

module.exports = mongoose.model('account',accountSchema);
