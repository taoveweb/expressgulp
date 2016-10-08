var express = require('express'),
  router = express.Router(),
  auth = require('../front/user/user'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin', router);

};
router.get('/', function (req, res, next) {
  if (req.user && req.user.admin == 3) {
    res.redirect('/admin/user/list');
  } else {
    res.render('admin/login', {
      title: '后台登录'
    });
  }
});

router.get('/login', function (req, res, next) {
  if (req.user && req.user.admin == 3) {
    res.redirect('/admin/user/list');
  } else {
    res.render('admin/login', {
      title: '后台登录'
    });
  }

});


/*router.post('/login', passport.authenticate('local', {failureRedirect: '/admin/login'}), function (req, res, next) {
 if(req.body && req.body.type && req.body.type=="poplogin"){
 res.json({
 success:1,
 msg:'登录成功',
 })
 }else{
 res.redirect("/")
 }
 });*/

router.post('/login', function (req, res, next) {
  co(function *() {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (info.message=='Incorrectusername') {
        return res.json({
          success: 0,
          msg: '没有这个用户'
        });
      }
      if (info.message=='Incorrectpassword') {
        return res.json({
          success: 0,
          msg: '密码不正确'
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        res.json({
          success: 1,
          msg: '登录成功',
        })
      });
    })(req, res, next);
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：edit 具体内容", err)
  });
});


router.get('/loginout', function (req, res, next) {
  //todo
  req.logout();
  res.redirect('/')
});





