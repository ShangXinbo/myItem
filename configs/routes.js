'use strict';

const uploads = require('multer')({dest: 'uploadfile'});
const upload = require('../controllers/upload');
const sms = require('../controllers/sms');
const index = require('../controllers/index');
const account = require('../controllers/account');

module.exports = function (app) {
    app
        .get('/', index)
        .post('/upload/submit',account.isLogged, uploads.single('file'), upload.submit)
        .get('/upload/',account.isLogged, upload.showtpl)
        .get('/sms/sendSingle', account.isLogged, sms.sendSingle)
        .get('/sms', account.isLogged, sms.showtpl)
        .all('/login*', account.login)
        .all('/logout', account.logout);

    app.get('*',function(req,res){
        res.render('404');
    });

    app.use(function (err, req, res) {
        res.status(500).render('500', {
            error: err.stack
        });
    });
};

