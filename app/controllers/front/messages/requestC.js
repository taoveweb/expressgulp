var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/requests',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/messages/requests', {
      layout:"main_m",
      title: '图虫网 - 最好的摄影师都在这 - 请求等待你处理 - 图虫网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/messages/requests', {
      title: '图虫网 - 最好的摄影师都在这 - 请求等待你处理 - 图虫网 - 最好的摄影师都在这',
    });
  }

});





