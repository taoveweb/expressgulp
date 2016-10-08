var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/info',router);
};

router.get('/terms' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/terms', {
      layout:"main_m",
      title: '用户守则 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/terms', {
      title: '用户守则 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/copyright' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/copyright', {
      layout:"main_m",
      title: '版权保护 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/copyright', {
      title: '版权保护 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/links' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/links', {
      layout:"main_m",
      title: '友情链接 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/links', {
      title: '友情链接 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/service' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/service', {
      layout:"main_m",
      title: '偶酷服务 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/service', {
      title: '偶酷服务 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});



router.get('/contactus' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/contactus', {
      layout:"main_m",
      title: '联系我们 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/contactus', {
      title: '联系我们 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/aboutus' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/info/aboutus', {
      layout:"main_m",
      title: '关于我们 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/info/aboutus', {
      title: '关于我们 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});









