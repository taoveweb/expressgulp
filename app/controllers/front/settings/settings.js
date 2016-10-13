var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/settings',auth.requireLogin,router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/settings', {
      layout:"main_m",
      route:'settings',
      title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/settings', {
      route:'settings',
      title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});


router.get('/account' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/account', {
      layout:"main_m",
      route:'account',
      title: '账号设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/account', {
      route:'account',
      title: '账号设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});


router.get('/domain' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/domain', {
      route:'domain',
      layout:"main_m",
      title: '域名 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/domain', {
      route:'domain',
      title: '域名 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/avatar' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/avatar', {
      route:'avatar',
      layout:"main_m",
      title: '头像设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/avatar', {
      route:'avatar',
      title: '头像设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/authority' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/authority', {
      route:'authority',
      layout:"main_m",
      title: '版权设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/authority', {
      route:'authority',
      title: '版权设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/homepage' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/homepage', {
      layout:"main_m",
      route:'homepage',
      title: '外观风格 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/homepage', {
      route:'homepage',
      title: '外观风格 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/preferences' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/preferences', {
      layout:"main_m",
      route:'preferences',
      title: '偏好 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/preferences', {
      route:'preferences',
      title: '偏好 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/connect' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/settings/connect', {
      layout:"main_m",
      route:'connect',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/settings/connect', {
      route:'connect',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});





