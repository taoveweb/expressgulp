var express = require('express'),
  router = express.Router(),
  auth = require('../../mobile/user/user'),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  ObjectId = mongoose.Types.ObjectId,
  _ = require('lodash');


module.exports = function (app) {
  app.use('/admin/img', auth.adminLogin, router);
};

//图片表单
router.get('/add', function (req, res, next) {
  co(function *() {
    res.render('admin/img/imgadd', {
      title: '添加图片',
      router: 'imgadd',
      imgUrl: "/common/uploadheaderimg/logo.jpg"
    });
  }).catch(function (err) {
    console.log('err at' + __dirname + "get add", err)
  });
});

router.post('/add', function (req, res, next) {
  co(function *() {
    var add = {};
    var user=req.user;

    req.checkBody('excellent', '不是数字').isInt();
    req.checkBody('published', '不是数字').isInt();
    req.checkBody('imgUrl', '图片不能为空').notEmpty();
    req.checkBody('introduction', '简介不能为空').notEmpty();
    req.checkBody('sign', '没有设置签名').notEmpty();
    add.introduction = req.body.introduction;
    add.published = req.body.published;
    add.imgUrl = req.body.imgUrl;
    add.width=req.body.width;
    add.height=req.body.height;
    add.author=ObjectId(user['_id']);
    console.log(add.author)
    add.created=new Date();
    var sign=req.body.sign;
    if(sign.indexOf('.')){
      add.sign=sign.split(".");
    }else{
      add.sign = req.body.sign;
    }
    add.excellent = req.body.excellent;

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
    } else {
      add = new Image(add);
      add=yield new Promise(function(resolve,reject){
        add.save(function(err,img){
          if(err){
            reject(err);
          }else{
            resolve(img)
          }
        })
      })
    }


    if(errors){
      res.render('admin/img/imgadd', {
        title: '厍图片',
        router: 'imgadd',
        img:[add],
        err: errors,
        success: !errors.length
      });
    }else{
      res.redirect("/admin/img/edit?id="+add["_id"]);
    }



  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：add 具体内容", err)
  });
});


//提交图片
router.post('/edit/postimg', function (req, res, next) {
  require('../../function/uploadimg')(req, res, next)
});





