
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

// 全局变量
GLOBAL = {
    rootpath : path.normalize(__dirname),
    controllerPath : path.join(__dirname + '/app/controller/'),
    modulePath : path.join(__dirname + '/app/modules/'),
    viewPath : path.join(__dirname + '/app/views/'),
    configPath : path.join(__dirname + '/app/config/')
};

app
.set('view engine', 'jade')
.use(express.static('static'))
.use(bodyParser.json())
.set('views', GLOBAL.viewPath);

require(GLOBAL.configPath + 'routes')(app);

app.listen(port);