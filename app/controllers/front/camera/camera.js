var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/camera', router);
};

router.get('/', function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/camera/camera', {
      layout:"main_m",
      title: '发布',
    });
  }else {
    console.log('aaa')
    res.render('pc/camera/cameraMain', {
      title: '发布',
    });
  }

});




