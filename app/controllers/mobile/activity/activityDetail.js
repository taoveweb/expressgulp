var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/activity/detail', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/activity/activityDetail', {
    title: '活动详情',
    layout:'main_m'
  });
});




