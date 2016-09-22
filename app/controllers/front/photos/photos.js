var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/photos', router);
};

router.get('/recent', function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/photos/recent', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      layout:"main_m",
      route:"recent",
    });
  }else {
    res.render('pc/photos/recent', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      route:"recent",
    });
  }

});




