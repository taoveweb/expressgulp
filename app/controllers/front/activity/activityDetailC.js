var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/activity/', router);
};

router.get('/:id', function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/activity/detail', {
      title: '活动',
      layout:'main_m'
    });
  }else {
    res.render('pc/activity/detail', {
      title: '活动',
      layout:'main'
    });
  }

});




