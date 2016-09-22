var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/notifications',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/messages/notifications', {
      layout:"main_m",
      title: '我的通知 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/messages/notifications', {
      title: '我的通知 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});




