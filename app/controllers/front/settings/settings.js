var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co=require('co'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/settings',auth.requireLogin,router);
};
function getArray(start,length){
  var arr=[];
  for(var i=start;i<=length;i++){
    arr.push(i);
  }
  return arr;
}
router.get('/' , function (req, res, next) {
  var resJson={};
  resJson.month=getArray(0,12);
  resJson.day=getArray(0,31);
  resJson.year=getArray(1934,2013);
  resJson.location=['安徽','澳门','北京','福建','甘肃','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南',
    '吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','上海','四川','台湾','天津','西藏'
    ,'香港','新疆','云南','浙江','重庆','海外']
  co(function *(){
    if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
      res.render('mobile/settings/settings', {
        layout:"main_m",
        route:'settings',
        resJson:resJson,
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
      });
    }else {
      res.render('pc/settings/settings', {
        route:'settings',
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
        resJson,
      });
    }
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：settings / 具体内容", err)
    res.json({msg: err});
  });

});


router.post('/' , function (req, res, next) {
  console.log(req.body,'aaaa')
  co(function *(){
    if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
      res.render('mobile/settings/settings', {
        layout:"main_m",
        route:'settings',
        resJson:resJson,
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
      });
    }else {
      res.render('pc/settings/settings', {
        route:'settings',
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
        resJson,
      });
    }
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：settings / 具体内容", err)
    res.json({msg: err});
  });

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





