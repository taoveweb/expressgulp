var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    auth = require('../user/user');
module.exports = function (app) {
    app.use('/m/browsermessage', auth.requireLogin, router);
};

router.get('/', function (req, res, next) {
    res.render('mobile/browser/browserMessage', {
        title: '消息',
    });
});




