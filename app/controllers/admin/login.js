var express = require('express'),
  router = express.Router(),
  auth = require('../front/user/user'),
  passport = require('passport');


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


router.post('/login', passport.authenticate('local', {failureRedirect: '/admin/login'}), function (req, res, next) {
  res.redirect("/admin/user/list")
});


router.get('/loginout', function (req, res, next) {
  //todo
  req.logout();
  res.redirect('/')
});





