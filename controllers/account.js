'use strict';

/*const mongoose = require('mongoose');
      require('../models/account');
const accountModel = mongoose.model('account');*/

exports.login = function(req,res){
    res.render('login');
    res.end();
};

exports.post = function(req,res){
    console.log(123);
}

/*exports = function(req,res){
    
    let myname = new accountModel({username:'shangxinbo'});
    console.log(myname.username);
    res.end();
};*/
