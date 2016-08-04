var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/', function (req, res, next) {
  Article.find(function (err, articles) {
    if (err) return next(err);
    console.log(articles.length,'articles')
    res.render('admin/index', {
      title: '后端的首页',
      articles: articles
    });
  });
});
