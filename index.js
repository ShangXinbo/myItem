'use strict';

var express = require('express');
var swig = require('swig');

var app = express();

swig.init({
	allowErrors: false,
	autoescape: true,
	cache: true,
	encoding: 'utf8',
	filters: {},
	root: '/',
	tags: {},
	extensions: {},
	tzOffset: 0
});
app.engine('html', swig.renderFile);

app.set('APP_NAME', '测试项目');
app.set('view engine', 'html');
//app.set('views', __dirname + '/views');

app.use(function(req, res, next) { //使用中间件
	console.log("%s %s", req.method, req.url);
	next();
});
app.route('/').get(function(req, res) {

	res.render('index', { /* template locals context */ });

	/*var env = app.get('env');
	var templates_path = app.get('views');
	var appName = app.get('APP_NAME');
	var proxy = app.disabled('trust proxy');     //检测是否可用,如果是true ,则为不可用, 相反enabled
	res.send(proxy);*/


}).post(function(req, res) {
	res.download('123');
});
app.listen(3000);