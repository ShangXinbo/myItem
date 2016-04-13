'use strict';

const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    last_login_time: Number
});

let User = mongoose.model('Account', accountSchema);

exports.login = function (req, res) {

    if (req.body.username) {
        let username = req.body.username;
        let password = req.body.password;
        let referrer = req.body.referrer;
        User.findOne({'username': username, 'password': password}, function (err, user) {
            if (user) {
                req.session.regenerate(function () {
                    req.user = user;
                    req.session.userId = user._id;
                    req.session.save();
                    if (referrer && referrer != 'undefined') {
                        res.redirect(referrer);
                    } else {
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
            User.findOne({'_id': userId}, function (err, user) {
                if (user) {
                    res.redirect('/');
                }
            });
        } else {
            var referrer = req.query.referrer;
            res.render('login', {"referrer": referrer});
        }
    }
};

exports.logout = function (req, res) {
    res.clearCookie('connect.sid');
    req.user = null;
    req.session.regenerate(function () {
        res.redirect('/login');
    })
};

exports.isLogged = function (req, res, next) {
    let userId = req.session.userId;
    if (userId) {
        User.findOne({'_id': userId}, function (err, user) {
            if (user) {
                req.user = user;
                next();
            } else {
                res.redirect('/login?referrer=' + encodeURI(req.url));
            }
        });
    } else {
        res.redirect('/login?referrer=' + encodeURI(req.url));
    }
};
