var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/groups',router);
};
router.get('/' ,auth.requireLogin, function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/groups/groups', {
      layout:"main_m",
      title: '我的小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/groups/groups', {
      title: '我的小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }
})
router.get('/all' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/groups/all', {
      layout:"main_m",
      title: '所有小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/groups/all', {
      title: '所有小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/new' ,auth.requireLogin, function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/groups/new', {
      layout:"main_m",
      title: '申请小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/groups/new', {
      title: '申请小组 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});





