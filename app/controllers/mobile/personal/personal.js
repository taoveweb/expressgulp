var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/personal', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/personal/personal', {
    title: '活动',
  });
});




