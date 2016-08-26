var express = require('express'),
  router = express.Router(),
  auth = require('../mobile/user/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin', auth.adminLogin, router);
};

//会员列表
router.get('/', function (req, res, next) {
  co(function *() {
    var pageSize = 20;
    var count = yield User.count({});
    var pageNum = req.query.page || 1;
    if (pageNum > pageCount) {
      pageNum = pageCount
    }
    var pageCount = Math.ceil(count / pageSize);
    var starPage = 1;
    var sort={created:1};
    if(req.query.fans){
      sort={fans:parseInt(req.query.fans)}
    }
    if(req.query.created){
      sort={created:parseInt(req.query.created)}
    }
    if(req.query.concern){
      sort={concern:parseInt(req.query.concern)}
    }
    if(pageNum>pageSize ){
      starPage=Math.floor(pageNum / pageSize) * pageSize+1
    }

    var endPage = starPage + pageSize >= pageCount ? pageCount+1 : starPage + pageSize;
    var prePage = starPage - pageSize <= 0 ? 1 : starPage - pageSize;
    var nextPage = starPage + pageSize >= pageCount ? pageCount : starPage + pageSize;
    var users = yield User.find().sort(sort).skip((pageNum - 1) * pageSize).limit(pageSize);

    res.render('admin/userlist', {
      title: '会员列表',
      users: users,
      pageNum: pageNum,
      pageCount: pageCount,
      starPage: starPage,
      endPage: endPage,
      prePage: prePage,
      nextPage: nextPage,
      currentPage:parseInt(pageNum)
    });
  }).catch(function (err) {
    console.log('get /admin', err)
  });
});







