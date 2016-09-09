var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/discovery', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/discovery/discovery', {
    title: '发现',
    layout:"main_m"
  });
});




