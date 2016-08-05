var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  md5 = require('md5'),
  passport = require('passport');

module.exports = function (app) {
  app.use('/user', router);
};

router.get('/login', function (req, res, next) {
  res.render('user/login', {
    title: '登录页面',

  });
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/user/login' }), function (req, res, next) {
   res.redirect("/")
});

router.get('/register', function (req, res, next) {
  res.render('user/register', {
    title: '注册页面',

  });
});

router.post('/register', function (req, res, next) {


  req.checkBody('email', "邮箱不能为空").notEmpty().isEmail();
  req.checkBody("password", "密码不能为空").notEmpty();
  req.checkBody("cpassword", "两次密码不匹配").notEmpty().equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    console.log("post user/register",errors);
    return res.render('user/register', req.body
    );
  }

  var user = new User({
    name:req.body.email.split("@").shift(),
    email:req.body.email,
    password:md5(req.body.password),
    created:new Date()
  });

  user.save(function(err,user){
    if(err) {
      console.log("admin/user/register",err);
      res.render('user/register')
    }else{
      res.redirect('/user/login')
    }
  });
});


router.get('/loginout', function (req, res, next) {
  //todo
  req.logout();
  req.flash("info", "a");
  req.flash("info", "b");
  req.flash("info", "c");
  req.flash("info", "出错了出错了");
  res.redirect('/')
});




