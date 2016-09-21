var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/imagedetail', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/discovery/imageDetail', {
    title: '图片详情',
    layout:"main_m"
  });
});




