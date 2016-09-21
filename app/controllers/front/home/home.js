var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/home/homeMain', {
      layout:"main_m",
      title: '首页',
    });
  }else {
    console.log('abc')
    res.render('pc/home/homeMain', {
      title: '首页',
    });
  }

});




