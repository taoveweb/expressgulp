var express = require('express'),
  router = express.Router(),
  auth = require('../mobile/user/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin', auth.adminLogin, router);
};

router.get('/', function (req, res, next) {
  co(function *() {
    var pageSize = 14;
    var count = yield User.count({});
    var pageNum = req.query.page || 1;
    var pageCount=Math.ceil(count/pageSize);
    var starPage=pageNum-7<0 ? 0 :pageNum-7;
    var endPage=starPage+14>pageCount ? pageCount :starPage+14;
    var users = yield User.find().skip((pageNum-1)*pageSize).limit(pageSize);
    if(pageNum>pageCount){
      pageNum=pageCount
    }
    res.render('admin/userlist', {
      title: '会员列表',
      users: users,
      pageNum:pageNum,
      pageCount:pageCount,
      starPage:starPage,
      endPage:endPage
    });
  }).catch(function (err) {
    console.log('get /admin', err)
  });
});







