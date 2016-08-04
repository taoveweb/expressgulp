var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  Post.find().populate("category").populate("author").exec(function (err, posts) {
    if (err) return next(err);
    res.render('blog/index', {
      title: '前端的首页',
      posts: posts,
      data:['a', 'b', 'c', 'd', 'e'],
      pretty:true
    });
  });
});
