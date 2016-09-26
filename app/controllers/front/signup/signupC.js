var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user');

module.exports = function (app) {
  app.use('/signup', router);
};

router.get('/', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/signup/signup', {
      layout: "main_m",
      title: '注册帐号 - 偶酷网 - 最好的摄影师都在这',
      route: "动态",
    });
  } else {
    res.render('pc/signup/signup', {
      title: '注册帐号 - 偶酷网 - 最好的摄影师都在这',
      route: "动态",
    });
  }

});




