var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/discussion',router);
};
router.get('/' , function (req, res, next) {
  res.redirect("/discussion/hot")
})
router.get('/hot' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/discussion/hot', {
      layout:"main_m",
      title: '论坛热门话题 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/discussion/hot', {
      title: '论坛热门话题 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/new-comments' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/discussion/new-comments', {
      layout:"main_m",
      title: '最新评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/discussion/new-comments', {
      title: '最新评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});




