
'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

require('./configs/passport')(passport);

app.use(session({resave: true, saveUninitialized: true,secret: 'cookie_secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require(path.join(__dirname, 'configs/routes'))(app,passport);

module.exports = app;

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  //.once('open', listen);

function listen () {
    const port = 3000;
    app.listen(port);
    console.log('Express app started on port ' + port);
}
function connect () {
    let options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect('mongodb://127.0.0.1:27017/yunda', options).connection;
}