var express = require('express'),
  router = express.Router(),
  auth = require('../../front/user/user'),
  mongoose = require('mongoose'),
  Activity = mongoose.model('Activity'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash');


module.exports = function (app) {
  app.use('/admin/activity', auth.adminLogin, router);
};

//图片表单
router.get('/edit', function (req, res, next) {
  co(function *() {
    var id = req.query.id || "";
    var activities = {};
    if (id) {
      activities = yield new Promise(function(resolve,reject){
        Activity.find({"_id": id}).exec(function(err,doc){
          if(err){
            reject(err);
          }else{
            resolve(doc)
          }
        });
      });
    }

    activities['imgUrl'] = activities['imgUrl'] == "" ? "/common/uploadheaderimg/logo.jpg" : activities['imgUrl'];
    console.log(activities)
    res.render('admin/activity/activityEdit', {
      title: '图片编缉',
      router: 'activityList',
      activities: activities
    });
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：edit 具体内容", err)
  });
});

router.post('/update', function (req, res, next) {

  co(function *() {
    var update = {};
    var oldImg = "";
    if (req.body.published) {
      req.checkBody('published', '不是数字').isInt();
      update.published = req.body.published
    }else{
      update.published =0;
    }

    if (req.body.activitiesUrl) {
      update.activitiesUrl = req.body.activitiesUrl
    }

    if (req.body.sign) {

      var sign=req.body.sign;
      if(sign.indexOf('.')!==-1){
        update.sign=sign.split(".");
      }else{
        update.sign = req.body.sign;
      }
    }
    if (req.body.title) {
      req.checkBody('title', '简介不能为空').notEmpty();
      update.title = req.body.title
    }
    if (req.body.content) {
      req.checkBody('content', '主要内容不能为空').notEmpty();
      update.content = req.body.content
    }
    if (req.body.imgUrl) {
      update.imgUrl = req.body.imgUrl
    }
    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
    }
    var id = req.body['_id'] || "";
    var activities = {};
    if (update) {
      update.updateby=new Date();
      activities = yield new Promise(function (resolve, reject) {
        Activity.findOneAndUpdate({"_id": id}, update, {new: true}, function (err, activities) {
          if (err) {
            reject(err)
          } else {
            resolve(activities)
          }
        });
      })
    }


    activities['imgUrl'] = activities['imgUrl'] == "" ? "/common/uploadheaderimg/logo.jpg" : activities['imgUrl'];
    res.render('admin/activity/activityEdit', {
      title: '图片编缉',
      router: 'activitiesedit',
      activities: [activities],
      err: errors,
      success: !errors.length
    });
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：update 具体内容", err)
  });
});


router.get('/delete', function (req, res, next) {

  co(function *() {
    var id = req.query.id || "";
    var state = false;
    var activities = yield new Promise(function (resolve, reject) {
      Activity.findOneAndRemove({'_id': id}, function (err, activities) {
        if (err) {
          reject(err)
        } else {
          resolve(activities)
        }
      });
    });

    if(activities){
      state = true;
    }


    res.json({
      state: state
    })

  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：edit 具体内容", err)
  });

});












