var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../front/user/user'),
  Image = mongoose.model('Image'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  ObjectId = mongoose.Types.ObjectId,
  _ = require('lodash');

module.exports = function (app) {
  app.use('/rest', router);
};


//创建相册
router.post('/albums', function (req, res, next) {
  co(function *() {



  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：add 具体内容", err)
  });

});










