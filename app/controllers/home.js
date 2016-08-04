var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err);
    console.log(posts.length,'articles')
    res.render('blog/index', {
      title: '前端的首页',
      articles: posts,
      data:['a', 'b', 'c', 'd', 'e']
    });
  });
});
