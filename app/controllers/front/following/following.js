var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/following',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/following/following', {
      layout:"main_m",
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:"动态",
    });
  }else {
    res.render('pc/following/following', {
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:"动态",
    });
  }

});




