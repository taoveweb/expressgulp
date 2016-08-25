var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/m/browser', router);
};

router.get('/',auth.requireLogin, function (req, res, next) {
  res.render('mobile/browser/browser', {
    title: '浏览页面',
  });
});




