var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../user/user');
  md5 = require('md5'),
    co = require('co'),
  passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/signup', function (req, res, next) {
  if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
    res.render('mobile/signup/signup', {
      layout: "main_m",
      title: '注册帐号 - 偶酷网 - 最好的摄影师都在这',
      route: "动态",
    });
  } else {
    res.render('pc/signup/signup', {
      title: '注册帐号 - 偶酷网 - 最好的摄影师都在这',
      route: "动态",
    });
  }

});

router.post('/rest/accounts/register', function (req, res, next) {

  co(function *() {
    req.checkBody('user_name', "用户名").notEmpty();
    req.checkBody("user_password", "密码不能为空").notEmpty();
    req.checkBody("user_password2", "两次密码不匹配").notEmpty().equals(req.body.user_password);

    var errors = req.validationErrors();

    if (errors) {
      return res.json({
        success:0,
        msg:errors
      })
    }

    var ifuser =yield new Promise(function(resolve,reject){
      User.find({name:req.body.user_name},function(err,user){
        console.log(user)
        if(err){
          reject(err)
        }else{
          resolve(user)
        }
      })
    });


    if(ifuser.length>0){
      return res.json({
        success:0,
        msg:"用户名已经被注册过了"
      })
    }

    var user = new User({
      name: req.body.user_name,
      password: md5(req.body.user_password),
    });



    user.save(function (err, user) {
      if (err) {
        res.json({
          success:0,
          msg:err
        })
      } else {
        res.json({
          success:1,
          msg:'注册成功'
        })
      }
    });
  }).catch(function (err) {
    console.log('err at' + __dirname + "post /rest/accounts/register", err)
  });

});




