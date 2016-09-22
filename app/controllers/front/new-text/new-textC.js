var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/new-text', router);
};

router.get('/', function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/new-text/new-text', {
      layout:"main_m",
      title: '发表文字 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/new-text/new-text', {
      title: '发表文字 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});




