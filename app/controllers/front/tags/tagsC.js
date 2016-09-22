var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/tags',router);
};

router.get('/:sign' , function (req, res, next) {
  sign=req.param('sign');
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/tags/tags', {
      layout:"main_m",
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:sign,
    });
  }else {
    res.render('pc/tags/tags', {
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:sign,
    });
  }

});




