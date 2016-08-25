var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  md5 = require('md5'),
  passport = require('passport');

module.exports = function (app) {
  app.use('/m/user', router);
};
module.exports.requireLogin=function(req,res,next){
    if(req.user){
        next();
    }else{
        res.redirect('/m/user/login');
    }
}

router.get('/login', function (req, res, next) {
    if(req.session && req.session.passport && req.session.passport.user){
        res.redirect('/m/browser')
    }else{
        res.render('mobile/user/login', {
            title: '登录页面',
        });
    }

});

router.post('/login',passport.authenticate('local', { failureRedirect: '/user/login' }), function (req, res, next) {
   res.redirect("/m/browser")
});

router.get('/register', function (req, res, next) {
  res.render('mobile/user/register', {
    title: '注册页面'
  });
});

router.post('/register', function (req, res, next) {


  req.checkBody('email', "邮箱不能为空").notEmpty().isEmail();
  req.checkBody("password", "密码不能为空").notEmpty();
  req.checkBody("cpassword", "两次密码不匹配").notEmpty().equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    console.log("post user/register",errors);
    return res.render('mobile/user/register', req.body
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
      res.render('mobile/user/register')
    }else{
      res.redirect('/user/login')
    }
  });
});


router.get('/forgetpassword', function (req, res, next) {
  res.render('mobile/user/forgetpassword', {
    title: '忘记密码',

  });
});

router.post('/forgetpassword', function (req, res, next) {
  res.redirect("/")
});


router.get('/loginout', function (req, res, next) {
  //todo
  req.logout();
  res.redirect('/m/user/login')
});




