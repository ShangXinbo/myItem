'use strict';

var fs = require('fs');

exports.showtpl = function(req, res) {
    res.render('upload', {
        title: "shang",
        message: '点我上传'
    });
};
exports.submit = function(req, res) {
    console.log(req.body);
    console.log(req.file);
    fs.open(req.file.originalname, 'w', '0644', function(e, fd) {
        if (e) throw e;
        fs.read(req.file.path, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data.length);
            }
            fs.write(fd, data, function(e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        })
    });
    res.end();
};