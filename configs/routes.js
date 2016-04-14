'use strict';

const uploads = require('multer')({dest: 'uploadfile'});
const upload = require('../controllers/upload');
const courier = require('../controllers/courier');
const index = require('../controllers/index');
const account = require('../controllers/account');

module.exports = function (app) {
    app
        .get('/', index)
        .post('/upload/submit',account.isLogged, uploads.single('file'), upload.submit)
        .get('/upload/',account.isLogged, upload.showtpl)
        /*.get('/sms/sendSingle', account.isLogged, sms.sendSingle)
        .get('/sms/list', account.isLogged, sms.showtpl)*/
        .get('/courier/list', account.isLogged, courier.list)
        .get('/courier/user', account.isLogged, courier.list)
        .get('/courier/account', account.isLogged, courier.list)
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

