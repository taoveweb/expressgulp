var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/camera', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/camera/camera', {
    title: '拍照',
  });
});




