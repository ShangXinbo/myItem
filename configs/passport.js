'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/account');
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  });
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done, res) {
    User.findOne({'username': username,'password': password}, function(err, user) {
      console.log(err);
      console.log(user);
      if (err)
        return done(err)

      if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'))

      /*if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))*/

      return done(null, user);
      res.end();
    })
  }));
};