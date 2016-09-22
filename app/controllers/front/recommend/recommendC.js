var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/recommend',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/recommend/recommend', {
      layout:"main_m",
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:"recommend",
    });
  }else {
    res.render('pc/recommend/recommend', {
      title: '首页 - 偶酷网 - 最好的摄影师都在这',
      route:"recommend",
    });
  }

});




