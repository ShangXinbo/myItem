'use strict';

const uploads = require('multer')({dest: 'uploadfile'});
const upload = require('../controllers/upload');
const sms = require('../controllers/sms');
const index = require('../controllers/index');
const account = require('../controllers/account');

module.exports = function (app,passport) {

    app
        .get('/', index)
        .get('/upload', upload.showtpl)
        .post('/upload/submit', uploads.single('file'), upload.submit)
        .get('/sms',isLoggedIn, sms.showtpl)
        .get('/sms/sendSingle', isLoggedIn, sms.sendSingle)
        .get('/account/login',account.login)
        .post('/account/submit/', passport.authenticate('local-login', {
            failureRedirect: '/account/login',
            successRedirect : '/',
            failureFlash: true
        }));


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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()
    res.redirect('/account/login')
}