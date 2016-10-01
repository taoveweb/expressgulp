var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/help',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/help', {
      layout:"main_m",
      title: '偶酷网 - 最好的摄影师都在这',
      route:'help'
    });
  }else {
    res.render('pc/help/help', {
      title: '偶酷网 - 最好的摄影师都在这',
      route:'help',
    });
  }
});

router.get('/user' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/user', {
      layout:"main_m",
      title: '用户操作守则 - 偶酷网 - 最好的摄影师都在这',
      route:'user'
    });
  }else {
    res.render('pc/help/user', {
      title: '用户操作守则 - 偶酷网 - 最好的摄影师都在这',
      route:'user',
    });
  }
});

router.get('/photo' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/photo', {
      layout:"main_m",
      title: '作品指南 - 偶酷网 - 最好的摄影师都在这',
      route:'photo'
    });
  }else {
    res.render('pc/help/photo', {
      title: '作品指南 - 偶酷网 - 最好的摄影师都在这',
      route:'photo',
    });
  }
});

router.get('/advanced' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/advanced', {
      layout:"main_m",
      title: '玩转偶酷 - 偶酷网 - 最好的摄影师都在这',
      route:'advanced'
    });
  }else {
    res.render('pc/help/advanced', {
      title: '玩转偶酷 - 偶酷网 - 最好的摄影师都在这',
      route:'advanced',
    });
  }
});

router.get('/event' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/event', {
      layout:"main_m",
      title: '活动审核标准 - 偶酷网 - 最好的摄影师都在这',
      route:'event'
    });
  }else {
    res.render('pc/help/event', {
      title: '活动审核标准 - 偶酷网 - 最好的摄影师都在这',
      route:'event',
    });
  }
});

router.get('/job' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/help/job', {
      layout:"main_m",
      title: '活动审核标准 - 偶酷网 - 最好的摄影师都在这',
      route:'event'
    });
  }else {
    res.render('pc/help/job', {
      title: '活动审核标准 - 偶酷网 - 最好的摄影师都在这',
      route:'event',
    });
  }
});







