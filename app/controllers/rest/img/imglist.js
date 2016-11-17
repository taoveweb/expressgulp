var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  qs = require('qs'),
  crypto = require('crypto'),
  _ = require('lodash'),
  config = require('../../../../config/config');

module.exports = function (app) {
  app.use('/rest/img', router);
};
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//图片列表
router.all('/list', function (req, res, next) {
  var search = {};
  var pageSize = 10;
  var sortObj={created:-1};

  if(req.query.type && req.query.type=='refresh'){
    var created=req.query.created;
    search={created:{$gt:new Date(created)}}
  }

  if(req.query.type && req.query.type=='more'){
    var created=req.query.created;
    search={created:{$lt:new Date(created)}}
  }


  co(function *() {

    var docs = {};

    docs = yield new Promise(function (resolve, reject) {

      Image.find(search)
        .populate('author')
        .sort(sortObj)
        .limit(pageSize)
        .exec(function (err, docs) {
          if (err) {
            reject(err);
          } else {
            resolve(docs)
          }
        });
    });

    res.json(docs)


  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：list 具体内容", err)
  });


});





