var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/groups',router);
};
router.get('/' , function (req, res, next) {
  console.log('groups')
  res.redirect("/groups/all")
})
router.get('/all' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/groups/groupsMain', {
      layout:"main_m",
      title: '交流',
    });
  }else {
    res.render('pc/groups/groupsMain', {
      title: '交流',
    });
  }

});




