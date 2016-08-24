var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

module.exports = function (app) {
  app.use('/m/admin', router);
};

router.get('/', function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err);
    console.log(posts.length,'articles')
    res.render('mobile/admin/index', {
      title: '后端的首页',
      articles: posts
    });
  });
});


