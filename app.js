
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const join = require('path').join;

const fs = require('fs');
const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

app
.set('view engine', 'jade')
.use(express.static('./static/'))
.use(bodyParser.json())
.set('views', './views');

require('./config/routes')(app);

app.listen(port);