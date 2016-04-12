'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');
const User = require('../models/Account');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log(1);
        done(user.id)
    });

    passport.deserializeUser(function (id, done) {
        console.log(2);
        User.findById(id, function (err, user) {
            done(err, user)
        })
    });

    passport.use(new LocalStrategy({
        passReqToCallback: true
    },function (req,username, password, done) {
        console.log(123);
        done('asdf');
        User.findOne({ 'username': username}, function(err, user) {
         if (err)
         return done(err)

         if (!user)
         return done(null, false, req.flash('loginMessage', 'No user found.'))

         /*if (!user.validPassword(password))
         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))*/

         return done(null, user)
         })
    }));
    //console.log(passport);
};
