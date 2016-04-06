
'use strict';

const upload = require('../controllers/upload');
const sms = require('../controllers/sms');
const multer = require('multer');
const uploads = multer({dest: 'uploads'});

/*
 * 路由控制
*/
module.exports = function(app) {

    app
    .get('/',function(){ res.send('this is index page'); })
    .get('/upload', upload.showtpl)
    .post('/upload/submit',uploads.single('file'), upload.submit)
    .get('/sms', sms.send_sms);

    app.use(function(err, req, res, next) {
        // treat as 404
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
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};