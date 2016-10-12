var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../../front/user/user'),
  Image = mongoose.model('Image'),
  Img = mongoose.model('Img'),
  co = require('co'),
  async = require('async'),
  path = require('path'),
  fs = require('fs'),
  ObjectId = mongoose.Types.ObjectId,
  _ = require('lodash');

module.exports = function (app) {
  app.use('/new-photo', auth.requireLogin, router);
};

router.get('/', function (req, res, next) {

  co(function*() {
    var user = req.user;
    var imgs = yield new Promise((resolve, reject)=> {
      Img.find({author: user['_id']}, {imgUrl: 1}, (err, imgs)=> {
        if (err) {
          reject(err)
        } else {
          resolve(imgs)
        }
      })
    });

    var imgs = imgs.map((a, b)=> {
      var obj = {};
      obj['_id'] = a["_id"];
      obj.imgUrl = a.imgUrl.replace('.', '_90.')
      return obj;
    })
    if (req.headers["user-agent"].toLowerCase().indexOf('mobile') !== -1) {
      res.render('mobile/new-photo/newPhoto', {
        layout: "main_m",
        imgs: imgs,
        title: '发布',
      });
    } else {
      res.render('pc/new-photo/newPhoto', {
        title: '发布',
        imgs: imgs,
      });
    }
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：/ 具体内容", err)
    res.json({msg: err});
  });


});
function transform(obj) {
  var arr = [];
  for (var item in obj) {
    arr.push(obj[item]);
  }
  return arr;
}

//保存相关信息
router.post('/', function (req, res, next) {

  var add = {};
  var user = req.user;
  req.checkBody('title', '标题不能为空').notEmpty();
  req.checkBody('tags', '签名不能为空').notEmpty();
  req.checkBody('images', '图片不能为空').notEmpty();
  add.title = req.body.title;
  add.tags = req.body.tags;
  add.copyright = req.body.copyright;
  add.author = ObjectId(user['_id']);
  var imgs = transform(req.body.images);
  var errors = req.validationErrors();

  async.map(imgs, function (value, callback) {
    Img.findOne({_id: value.id}, (err, img)=> {
      var newObj = {};
      Object.assign(newObj, img._doc, value);
      callback(err, newObj)
    })
  }, function (err, results) {
    add.imgs = results;
    if (errors) {
      res.json(errors);
    } else {
      co(function *() {
        var hasSameTitle = yield  new Promise((resove, reject)=> {
          Image.find({title: add.title}, (err, img)=> {
            if (err) {
              reject(err)
            } else {
              resove(img)
            }
          })
        });
        if (hasSameTitle.length>0) {
          return res.json({msg: "这个标题已经存在"})
        }
        add = new Image(add);
        add.save(function (err, img) {
          if (err) {
            res.json(err);
          } else {
            res.json({msg:"成功"});
          }
        })
      }).catch(function (err) {
        console.log('出错文件' + __filename + "出错方法：/ 具体内容", err)
        res.json({msg: err});
      });

    }

  });

});


//提交图片
router.post('/img', auth.requireLogin, function (req, res, next) {
  console.log('bb')
  require('../../function/frontuploadimg')(req, res, next)
});







