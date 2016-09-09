var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/category', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/discovery/category', {
    title: '分类',
    layout:"main_m"
  });
});




