var express = require('express'),
    router = express.Router(),
    auth = require('../mobile/user/user');


module.exports = function (app) {
    app.use('/admin',auth.adminLogin,router);
};

router.get('/',  function (req, res, next) {
    res.render('admin/', {
        title: '后台主页',
    });
});






