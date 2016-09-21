var express = require('express'),
  router = express.Router(),
  auth = require('../../front/user/user'),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash');


module.exports = function (app) {
  app.use('/admin/img', auth.adminLogin, router);
};

//图片表单
router.get('/edit', function (req, res, next) {
  co(function *() {
    var id = req.query.id || "";
    var img = {};
    if (id) {
      img = yield new Promise(function(resolve,reject){
        Image.find({"_id": id}).exec(function(err,doc){
          if(err){
            reject(err);
          }else{
            resolve(doc)
          }
        });
      });
      img[0]['headPicture'] = img[0]['headPicture'] == "" ? "/common/uploadheaderimg/logo.jpg" : img[0]['headPicture'];
    }
    res.render('admin/img/imgedit', {
      title: '图片编缉',
      router: 'imglist',
      img: img,
      sign:img[0]['sign']

    });
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：edit 具体内容", err)
  });
});

router.post('/update', function (req, res, next) {

  co(function *() {
    var update = {};
    var oldImg = "";
    if (req.body.excellent) {
      req.checkBody('excellent', '不是数字').isInt();
      update.excellent = req.body.excellent;
    }
    if (req.body.published) {
      req.checkBody('published', '不是数字').isInt();
      update.published = req.body.published
    }
    if (req.body.imgUrl) {
      update.imgUrl = req.body.imgUrl
    }
    if (req.body.sign) {
      var sign=req.body.sign;
      if(sign.indexOf('.') !== -1){
        update.sign=sign.split(".");
      }else{
        update.sign = req.body.sign;
      }
    }
    if (req.body.introduction) {
      req.checkBody('introduction', '简介不能为空').notEmpty();
      update.introduction = req.body.introduction
    }

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
    }
    var id = req.body['_id'] || "";
    var img = {};
    if (update) {
      update.updateby=new Date();
      img = yield new Promise(function (resolve, reject) {
        Image.findOneAndUpdate({"_id": id}, update, {new: true}, function (err, img) {
          if (err) {
            reject(err)
          } else {
            resolve(img)
          }
        });
      })
    }

    img['imgUrl'] = img['imgUrl'] == "" ? "/common/uploadheaderimg/logo.jpg" : img['imgUrl'];

    res.render('admin/img/imgedit', {
      title: '图片编缉',
      router: 'imgedit',
      img: [img],
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
    var img = yield new Promise(function (resolve, reject) {
      Image.findOneAndRemove({'_id': id}, function (err, img) {
        if (err) {
          reject(err)
        } else {
          resolve(img)
        }
      });
    });

    if(img){
      state = true;
    }


    res.json({
      state: state
    })

  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：edit 具体内容", err)
  });

});












