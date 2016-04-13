'use strict';

const uploads = require('multer')({dest: 'uploadfile'});
const upload = require('../controllers/upload');
const sms = require('../controllers/sms');
const index = require('../controllers/index');
const account = require('../controllers/account');


module.exports = function (app, passport) {
    app
        .get('/', index)
        .post('/upload/submit', uploads.single('file'), upload.submit)
        .get('/upload/', upload.showtpl)
        .get('/sms/sendSingle', account.isLogged, sms.sendSingle)
        .get('/sms', account.isLogged, sms.showtpl)
        .all('/login', account.login)
        .all('/logout', account.logout);

    app.use(function (err, req, res, next) {

        if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }

        console.error(err.stack);

        if (err.stack.includes('ValidationError')) {
            res.status(422).render('422', {
                error: err.stack
            });
            return;
        }

        // error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res) {
        /*res.status(404).render('404', {
         url: req.originalUrl,
         error: 'Not found'
         });*/
    });
};

