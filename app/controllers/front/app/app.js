var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/app',router);
};

router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/app/appMain', {
      layout:"main_m",
      title: '偶酷app',
    });
  }else {
    res.render('pc/app/appMain', {
      title: '偶酷app',
    });
  }

});




