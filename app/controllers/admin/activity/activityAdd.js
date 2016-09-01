var express = require('express'),
  router = express.Router(),
  auth = require('../../mobile/user/user'),
  mongoose = require('mongoose'),
  Activity = mongoose.model('Activity'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  ObjectId = mongoose.Types.ObjectId,
  _ = require('lodash');


module.exports = function (app) {
  app.use('/admin/activity', auth.adminLogin, router);
};

//图片表单
router.get('/add', function (req, res, next) {
  co(function *() {
    res.render('admin/activity/activityAdd', {
      title: '添加活动',
      router: 'activityAdd',
      activities:[{ imgUrl: "/common/uploadheaderimg/logo.jpg"}]

    });
  }).catch(function (err) {
    console.log('err at' + __dirname + "get add", err)
  });
});

router.post('/add', function (req, res, next) {

  co(function *() {
    var add = {};
    var hasSameTitle=false;
    var user=req.user;

    req.checkBody('title', '标题不能为空').notEmpty();
    req.checkBody('imgUrl', '图片不能为空').notEmpty();
    req.checkBody('content', '主体不能为空').notEmpty();
    req.checkBody('sign', '没有设置签名').notEmpty();

    add.title = req.body.title.trim();
    if(!req.body.published){
      add.published = 0;
    }else{
      add.published = req.body.published;
    }
    add.imgUrl = req.body.imgUrl;
    add.content = req.body.content.trim();
    add.author=ObjectId(user['_id']);
    var sign=req.body.sign;
    if(sign.indexOf('.')){
      add.sign=sign.split(".");
    }else{
      add.sign = req.body.sign;
    }
    add.excellent = req.body.excellent;
    add.created=new Date();


    var errors = req.validationErrors();

    if (errors) {
      console.log(errors);
    } else {
      //如果有相当的标题就没得添加了
      hasSameTitle=yield new Promise(function(resolve,reject){
        Activity.findOne({title:add.title},function(err,doc){
          if(err){
            reject(err);
          }
          if(doc){
            errors=[];
            errors.push({msg:"已经有相同的活动了"});
            resolve(true)
          }else{
            resolve(false)
          }
        })
      });


      if(!hasSameTitle){
        //进行添加
        add = new Activity(add);
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
    }


    if(errors){
      res.render('admin/activity/activityAdd', {
        title: '活动编缉',
        router: 'activityAdd',
        activities:[add],
        err: errors,
        success: !errors.length
      });
    }else{
      res.redirect("/admin/activity/edit?id="+add["_id"]);
    }



  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：add 具体内容", err)
  });
});


//提交图片
router.post('/edit/postimg', function (req, res, next) {
  require('../../function/uploadimg')(req, res, next)
});





