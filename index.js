'use strict';

var express = require('express');
var app = new express();

app.get('/',function(req,res){
	console.log(123);
});

app.listen(3000,function(req,res){
	console.log(12312);
});