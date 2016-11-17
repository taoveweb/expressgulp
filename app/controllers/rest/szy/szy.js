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
  app.use('/rest/szy', router);
};
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//图片列表
router.all('/list', function (req, res, next) {

    res.json({
      msg:'提交成功',
      stage:1,
      imgurl:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    })

});





