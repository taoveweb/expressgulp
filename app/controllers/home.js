var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    console.log(articles.length,'articles')
    res.render('blog/index', {
      title: '前端的首页',
      articles: articles,
      data:['a', 'b', 'c', 'd', 'e']
    });
  });
});
