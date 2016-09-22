var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/categories', router);
};

router.get('/:category', function (req, res, next) {

  var category=req.param('category');
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/categories/categories', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      layout:"main_m",
      route:category,
    });
  }else {
    res.render('pc/categories/categories', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      route:category,
    });
  }

});




