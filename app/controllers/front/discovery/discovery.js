var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/discovery', router);
};

router.get('/', function (req, res, next) {


  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/discovery/discoveryMain', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      layout:"main_m",
      route:'discovery'
    });
  }else {
    res.render('pc/discovery/discoveryMain', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      route:'discovery'

    });
  }

});




