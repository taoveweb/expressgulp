var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/discovery', router);
};

router.get('/', function (req, res, next) {


  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/discovery/discovery', {
      title: '发现',
      layout:"main_m"
    });
  }else {
    res.render('pc/discovery/discoveryMain', {
      title: '发现',
    });
  }

});




