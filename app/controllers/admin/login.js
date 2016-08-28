var express = require('express'),
  router = express.Router(),
  auth = require('../mobile/user/user'),
  passport = require('passport');


module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/login', function (req, res, next) {
  res.render('admin/login', {
    title: '后台登录'
  });
});


router.post('/login', passport.authenticate('local', {failureRedirect: '/admin/login'}), function (req, res, next) {
  res.redirect("/admin/userlist")
});


router.get('/loginout', function (req, res, next) {
  //todo
  req.logout();
  res.redirect('/admin/login')
});





