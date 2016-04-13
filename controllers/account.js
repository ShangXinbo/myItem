'use strict';

const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    last_login_time: Number
});

let User = mongoose.model('Account', accountSchema);
let refererUrl = '';

exports.login = function (req, res) {

    if (req.body.username) {
        let username = req.body.username;
        let password = req.body.password;
        User.findOne({'username': username,'password':password}, function (err, user) {
            if (user) {
                req.session.regenerate(function () {
                    req.user = user;
                    req.session.userId = user._id;
                    req.session.save();
                    if(refererUrl){
                        res.redirect(refererUrl);
                    }else{
                        res.redirect('/');
                    }
                });
            }
            else {
                console.error('用户名或密码错误');
            }
        });
    } else {
        let userId = req.session.userId;
        if (userId) {
            let user = findUserById(userId);
            if (user) {
                req.user = user;
                next();
            } else {
                refererUrl = request.headers['referer'];
                res.redirect('/login');
            }
        } else {
            refererUrl = request.headers['referer'];
            res.redirect('/login');
        }
        res.render('login');
    }
};

exports.logout = function (req, res) {

    req.clearCookie('connect.sid');
    req.user = null;

    req.session.regenerate(function () {
        res.redirect('/login');
    })
};

exports.isLogged = function (req, res, next) {
    let userId = req.session.userId;
    if (userId) {
        let user = findUserById(userId);
        if (user) {
            req.user = user;
            next();
        } else {
            refererUrl = request.headers['referer'];
            res.redirect('/login');
        }
    } else {
        refererUrl = request.headers['referer'];
        res.redirect('/login');
    }
};
