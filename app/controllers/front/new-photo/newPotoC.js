var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../../front/user/user'),
  Image = mongoose.model('Image'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  ObjectId = mongoose.Types.ObjectId,
  _ = require('lodash');

module.exports = function (app) {
  app.use('/new-photo', router);
};

router.get('/', function (req, res, next) {

  if(req.headers["user-agent"].toLowerCase().indexOf('mobile')!==-1){
    res.render('mobile/new-photo/newPhoto', {
      layout:"main_m",
      title: '发布',
    });
  }else {
    res.render('pc/new-photo/newPhoto', {
      title: '发布',
    });
  }

});
function transform(obj){
  var arr = [];
  for(var item in obj){
    arr.push(obj[item]);
  }
  return arr;
}

//保存相关信息
router.post('/', function (req, res, next) {
  var imgs={ '8602613': { order: '8602613', description: '' },
    '8602911': { order: '8602911', description: '' },
    '8602912': { order: '8602912', description: '' },
    '8603084': { order: '8603084', description: '' } };
  //var images=Object.values(imgs);
  console.log(transform(imgs));
  return res.json(req.body);
  co(function *() {
    /*var add = {};
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
    add.excellent = req.body.excellent;*/
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
        layout:'main_admin',
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



//保存相关信息
/*
router.post('/', function (req, res, next) {
  co(function *() {
    console.log('aaa')
    res.json({msg:"成功了"})


  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：add 具体内容", err)
  });

});
*/




//提交图片
router.post('/img', auth.requireLogin,function (req, res, next) {
  require('../../function/frontuploadimg')(req, res, next)
});







