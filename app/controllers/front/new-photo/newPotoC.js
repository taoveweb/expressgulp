var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/new-photo', router);
};

router.get('/', function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/new-photo/newPhoto', {
      layout:"main_m",
      title: '发布',
    });
  }else {
    res.render('pc/new-photo/newPhoto', {
      title: '发布',
    });
  }

});




