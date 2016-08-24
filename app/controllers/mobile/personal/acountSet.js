var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/acountSet', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/personal/acountSet', {
    title: '账号设置',
  });
});




