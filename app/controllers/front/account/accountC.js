var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/account',router);
};


router.get('/forget', function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/account/forget', {
      layout:"main_m",
      route:'forget',
      title: '忘记密码 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/account/forget', {
      route:'forget',
      title: '忘记密码 - 偶酷网 - 最好的摄影师都在这',
    });
  }
});




