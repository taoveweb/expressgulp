var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co'),
  auth = require('../user/user');

module.exports = function (app) {
  app.use('/settings', auth.requireLogin, router);
};
function getArray(start, length) {
  var arr = [];
  for (var i = start; i <= length; i++) {
    arr.push(i);
  }
  return arr;
}
router.get('/', function (req, res, next) {
  var resJson = {};
  resJson.month = getArray(0, 12);
  resJson.day = getArray(0, 31);
  resJson.year = getArray(1934, 2013);
  resJson.location = ['安徽', '澳门', '北京', '福建', '甘肃', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南',
    '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏'
    , '香港', '新疆', '云南', '浙江', '重庆', '海外']
  co(function *() {
    if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
      res.render('mobile/settings/settings', {
        layout: "main_m",
        route: 'settings',
        resJson: resJson,
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
      });
    } else {
      res.render('pc/settings/settings', {
        route: 'settings',
        title: '个人设置 - 偶酷网 - 最好的摄影师都在这',
        resJson,
      });
    }
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：settings / 具体内容", err);
    res.json({msg: err});
  });

});


router.post('/', function (req, res, next) {
  var body = req.body;
  var update = {};
  if (body.nic != '') {
    var nic = body.nic.trim();
    req.checkBody('nic', "昵称由字母或中文组成").isNic();
    update.nic = nic;
  }
  if (body.weixin != '') {
    req.checkBody('weixin', "微信格式不正确").isWeixin();
    update.weixin = body.weixin;
  }
  if (body.realname != '') {
    req.checkBody('realname', "真实姓名由中文或英文组成").isRealname();
    update.realname = body.realname;
  }
  if (body.birthday != '') {
    req.checkBody('birthday', "生日账号格式如2013-12-20").isBirthday();
    update.birthday = body.birthday;
  }
  if (body.location != '') {
    req.checkBody('location', "真实姓名由中文或英文组成").isLocation();
    update.location = body.location;
  }
  if (body.homepage != '') {
    req.checkBody('homepage', "url地址格式不正确").isURL();
    update.homepage = body.homepage;
  }
  if (body.zipcode != '') {
    req.checkBody('zipcode', "邮箱格式不对").isZipcode();
    update.zipcode = body.zipcode;
  }
  if (body.address != '') {
    req.checkBody('address', "地址信息不正确").isAddress();
    update.address = body.address;
  }
  if (body.weibo != '') {
    req.checkBody('weibo', "新浪微博账号").isWeibo();
    update.weibo = body.weibo;
  }
  if (body.description != '') {
    req.checkBody('description', "邮箱不能为空").notEmpty().isEmail();
    update.description = body.description;
  }
  if (body.qq != '') {
    req.checkBody('qq', "邮箱不能为空").notEmpty().isEmail();
    update.qq = body.qq;
  }
  if (body.gender != '') {
    req.checkBody('gender', "邮箱不能为空").notEmpty().isEmail();
    update.gender = body.gender;
  }
  if (body.email != '') {
    req.checkBody('email', "邮箱不能为空").notEmpty().isEmail();
    update.email = body.email;
  }
  if (body.mobile != '') {
    req.checkBody('mobile', "邮箱不能为空").notEmpty().isEmail();
    update.mobile = body.mobile;
  }
  if (body.backgroundParam != '') {
    req.checkBody('backgroundParam', "邮箱不能为空").notEmpty().isEmail();
    update.backgroundParam = body.backgroundParam;
  }
  if (body.phone != '') {
    req.checkBody('phone', "邮箱不能为空").notEmpty().isEmail();
    update.phone = body.phone;
  }
  if (body.regMobile != '') {
    req.checkBody('regMobile', "邮箱不能为空").notEmpty().isEmail();
    update.regMobile = body.regMobile;
  }
  if (body.regSina != '') {
    req.checkBody('regSina', "邮箱不能为空").notEmpty().isEmail();
    update.regSina = body.regSina;
  }
  if (body.regWeixin != '') {
    req.checkBody('regWeixin', "邮箱不能为空").notEmpty().isEmail();
    update.regWeixin = body.regWeixin;
  }
  if (body.regQq != '') {
    req.checkBody('regQq', "邮箱不能为空").notEmpty().isEmail();
    update.regQq = body.regQq;
  }
  if (body.commercial != '') {
    req.checkBody('commercial', "邮箱不能为空").notEmpty().isEmail();
    update.commercial = body.commercial;
  }
  if (body.derivatives != '') {
    req.checkBody('derivatives', "邮箱不能为空").notEmpty().isEmail();
    update.derivatives = body.derivatives;
  }
  if (body.allApply != '') {
    req.checkBody('allApply', "邮箱不能为空").notEmpty().isEmail();
    update.allApply = body.allApply;
  }
  if (body.credential_type != '') {
    req.checkBody('credential_type', "邮箱不能为空").notEmpty().isEmail();
    update.credential_type = body.credential_type;
  }
  if (body.credential_num != '') {
    req.checkBody('credential_num', "邮箱不能为空").notEmpty().isEmail();
    update.credential_num = body.credential_num;
  }

  if (body.password != '') {
    req.checkBody('password', "邮箱不能为空").notEmpty().isEmail();
    update.password = body.password;
  }

  if (body.disable != '') {
    req.checkBody('disable', "邮箱不能为空").notEmpty().isEmail();
    update.disable = body.disable;
  }

  if (body.headPicture != '') {
    req.checkBody('headPicture', "邮箱不能为空").notEmpty().isEmail();
    update.headPicture = body.headPicture;
  }

  if (body.following != '') {
    req.checkBody('following', "邮箱不能为空").notEmpty().isEmail();
    update.following = body.following;
  }

  if (body.flags != '') {
    req.checkBody('flags', "邮箱不能为空").notEmpty().isEmail();
    update.flags = body.flags;
  }

  if (body.followers != '') {
    req.checkBody('followers', "邮箱不能为空").notEmpty().isEmail();
    update.followers = body.followers;
  }
  if (body.recommend != '') {
    req.checkBody('recommend', "邮箱不能为空").notEmpty().isEmail();
    update.recommend = body.recommend;
  }
  if (body.latestVisited != '') {
    req.checkBody('latestVisited', "邮箱不能为空").notEmpty().isEmail();
    update.latestVisited = body.latestVisited;
  }
  if (body.level != '') {
    req.checkBody('level', "邮箱不能为空").notEmpty().isEmail();
    update.level = body.level;
  }
  if (body.loginIp != '') {
    req.checkBody('loginIp', "邮箱不能为空").notEmpty().isEmail();
    update.loginIp = body.loginIp;
  }

  if (body.albums != '') {
    req.checkBody('albums', "邮箱不能为空").notEmpty().isEmail();
    update.albums = body.albums;
  }
  update.updateby = new Date();

  co(function *() {

  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：settings / 具体内容", err);
    res.json({msg: err});
  });

});


router.get('/account', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/account', {
      layout: "main_m",
      route: 'account',
      title: '账号设置 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/account', {
      route: 'account',
      title: '账号设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});


router.get('/domain', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/domain', {
      route: 'domain',
      layout: "main_m",
      title: '域名 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/domain', {
      route: 'domain',
      title: '域名 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/avatar', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/avatar', {
      route: 'avatar',
      layout: "main_m",
      title: '头像设置 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/avatar', {
      route: 'avatar',
      title: '头像设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/authority', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/authority', {
      route: 'authority',
      layout: "main_m",
      title: '版权设置 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/authority', {
      route: 'authority',
      title: '版权设置 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/homepage', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/homepage', {
      layout: "main_m",
      route: 'homepage',
      title: '外观风格 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/homepage', {
      route: 'homepage',
      title: '外观风格 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/preferences', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/preferences', {
      layout: "main_m",
      route: 'preferences',
      title: '偏好 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/preferences', {
      route: 'preferences',
      title: '偏好 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/connect', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/settings/connect', {
      layout: "main_m",
      route: 'connect',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  } else {
    res.render('pc/settings/connect', {
      route: 'connect',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});





