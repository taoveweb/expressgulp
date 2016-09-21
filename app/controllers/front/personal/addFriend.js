var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/m/addfriend', router);
};

router.get('/', function (req, res, next) {
  res.render('mobile/personal/addFriend', {
    title: '添加好友',
  });
});




