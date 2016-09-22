var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user') ;

module.exports = function (app) {
  app.use('/notes',router);
};

router.get('/comments' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notes/comments', {
      layout:"main_m",
      title: '我收到的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notes/comments', {
      title: '我收到的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});

router.get('/likes' , function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notes/likes', {
      layout:"main_m",
      title: '我被赞同的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notes/likes', {
      title: '我收到的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }

});
router.get('/favorites' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notes/favorites', {
      layout:"main_m",
      title: '我的分享 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notes/favorites', {
      title: '我的分享 - 偶酷网 - 最好的摄影师都在这',
    });
  }
});
router.get('/my-comments' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notes/my-comments', {
      layout:"main_m",
      title: '我发表的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notes/my-comments', {
      title: '我发表的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }
});

router.get('/my-likes' , function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/notes/my-likes', {
      layout:"main_m",
      title: '我赞同的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }else {
    res.render('pc/notes/my-likes', {
      title: '我赞同的评论 - 偶酷网 - 最好的摄影师都在这',
    });
  }
});





