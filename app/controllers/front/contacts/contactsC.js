var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/contacts', router);
};

router.get('/', function (req, res, next) {
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/contacts/contacts', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      layout:"main_m",
      route:"contacts",
      sort:'weekly-rank',
    });
  }else {
    res.render('pc/contacts/contacts', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      route:"contacts",
      sort:'weekly-rank',
    });
  }
})
router.get('/:sort', function (req, res, next) {
  var sort=req.param('sort');
  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/contacts/contacts', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      layout:"main_m",
      route:"contacts",
      sort:sort,
    });
  }else {
    res.render('pc/contacts/contacts', {
      title: '热门标签 - 偶酷网 - 最好的摄影师都在这',
      route:"contacts",
      sort:sort,
    });
  }
});




