
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const join = require('path').join;

const app = express();
const port = process.env.PORT || 3000;
GLOBAL.database = 'mongodb://127.0.0.1:27017/yunda';

app
    .set('env','test')
    .use(express.static(join(__dirname, 'public')))
    .set('views', join(__dirname, 'views'))
    .set('view engine', 'jade')
    .use(favicon(join(__dirname, 'public', 'favicon.ico')))
    .use(logger('dev'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(session({resave:true,saveUninitialized:true, secret: 'node-auth'}))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash());

module.exports = app;

require('./configs/passport')(passport);
require('./configs/routes')(app,passport);

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}
function connect () {
    let options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(GLOBAL.database, options).connection;
}