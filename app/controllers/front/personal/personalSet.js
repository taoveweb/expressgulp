var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/personalset', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/personal/personalset', {
    title: '个人设置',
  });
});




