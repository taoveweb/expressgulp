var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/notifications',router);
};

router.get('/reposts' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notifications/reposts', {
      layout:"main_m",
      title: '我被转发的图博 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notifications/reposts', {
      title: '我被转发的图博 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/collections' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notifications/collections', {
      layout:"main_m",
      title: '我被转发的图博 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notifications/collections', {
      title: '我被转发的图博 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});




