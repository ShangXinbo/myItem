'use strict';

const order = require('../controllers/order');
const customer = require('../controllers/customer');
const sms = require('../controllers/sms');
const index = require('../controllers/index');
const account = require('../controllers/account');
const setting = require('../controllers/setting');

module.exports = function (app) {
    app
        .get('/', account.isLogged, customer.list)
        .get('/courier/user', account.isLogged, customer.list)
        .get('/courier/user/add*', account.isLogged, customer.add)
        .all('/courier/user/edit*', account.isLogged, customer.edit)
        .get('/courier/user/orders*', account.isLogged, customer.userOrders)
        .get('/courier/user/orderadd*', account.isLogged, customer.addOrder)
        .get('/courier/user/del*', account.isLogged, customer.del)
        .get('/courier/orders', account.isLogged, order.orderList)
        .get('/courier/orders/del', account.isLogged, order.delOrder)
        .get('/courier/orders/tag*', account.isLogged, order.taged)
        .get('/courier/sms/list*', account.isLogged, sms.list)
        .get('/courier/sms/send*', account.isLogged, sms.send)
        .get('/courier/sms/alone*', account.isLogged, sms.alone)
        .get('/courier/sms/msgsend*', account.isLogged, sms.sendAlone)
        .get('/courier/setting', account.isLogged, setting.index)
        .get('/courier/setting/edit', account.isLogged, setting.edit)
        .all('/login*', account.login)
        .all('/logout', account.logout);

    app.get('*',function(req,res){
        res.render('common/404');
    });

    app.use(function (err, req, res) {
        res.status(500).render('500', {
            error: err.stack
        });
    });
};

