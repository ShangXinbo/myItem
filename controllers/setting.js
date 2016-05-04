'use strict';

var fs = require('fs');

exports.index = function(req, res) {
    res.render('setting/index', {
        title: "上传文件"
    });
};
