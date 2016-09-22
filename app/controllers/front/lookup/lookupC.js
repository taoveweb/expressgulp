var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/lookup',router);
};

router.get('/weibo' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/lookup/weibo', {
      layout:"main_m",
      route:'weibo',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/lookup/weibo', {
      route:'weibo',
      title: '社交绑定 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});





