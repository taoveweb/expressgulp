var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/vision',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/vision/visionMain', {
      layout:"main_m",
      title: '图像',
    });
  }else {
    res.render('pc/vision/visionMain', {
      title: '图像',
    });
  }

});




