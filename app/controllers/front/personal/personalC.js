var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/1551288', router);
};


router.get('/' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/personalMain', {
      title: '子一 - 偶酷摄影网',
      route:'home',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/personalMain', {
      title: '子一 - 偶酷摄影网',
      route:'home',
      layout:'main'
    });
  }

});


router.get('/albums' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/albums', {
      title: '我的相册 - 子一824 - 偶酷摄影网',
      route:'albums',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/albums', {
      title: '我的相册 - 子一824 - 偶酷摄影网',
      route:'albums',
      layout:'main'
    });
  }

});


router.get('/following' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/following', {
      title: '个人主页- 偶酷摄影网',
      route:'following',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/following', {
      title: '个人主页- 偶酷摄影网',
      route:'following',
      layout:'main'
    });
  }

});
router.get('/favorites' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/favorites', {
      title: '子一824的分享 - 子一824 - 偶酷摄影网',
      route:'favorites',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/favorites', {
      title: '子一824的分享 - 子一824 - 偶酷摄影网',
      route:'favorites',
      layout:'main'
    });
  }

});

router.get('/collections' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/collections', {
      title: '子一824的收藏夹 - 偶酷摄影网',
      route:'collections',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/collections', {
      title: '子一824的收藏夹- 偶酷摄影网',
      route:'collections',
      layout:'main'
    });
  }

});
router.get('/profile' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/personal/profile', {
      title: '我的资料 - 子一824 - 偶酷摄影网',
      route:'profile',
      layout:'main_m'
    });
  }else {
    res.render('pc/personal/profile', {
      title: '我的资料 - 子一824 - 偶酷摄影网',
      route:'profile',
      layout:'main'
    });
  }

});


