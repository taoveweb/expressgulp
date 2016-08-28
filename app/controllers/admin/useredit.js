var express = require('express'),
  router = express.Router(),
  auth = require('../mobile/user/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co'),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  gm = require('gm'),
  config = require('../../../config/config');


module.exports = function (app) {
  app.use('/admin', router);
};

//会员列表
router.get('/useredit', auth.adminLogin, function (req, res, next) {
  co(function *() {
    var id = req.query.id || "";
    var user = {};
    if (id) {
      user = yield User.find({"_id": id});
    }

    res.render('admin/useredit', {
      title: '会员编辑',
      router: 'useredit',
      user: user

    });
  }).catch(function (err) {
    console.log('admin/useredit', err)
  });
});

router.post('/useredit/headerimg', auth.adminLogin, function (req, res, next) {
  co(function *() {
    var form = new formidable.IncomingForm();
    var dir = config.root + "/upload/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    ;
    form.keepExtensions = true;
    form.uploadDir = dir;
    form.maxFieldsSize = 1 * 1024 * 1024;
    var formmid = yield new Promise(function (resole, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        resole({fields: fields, files: files});
      });
    });

    if (formmid) {
      var crop = JSON.parse(formmid.fields.avatar_data);
      var ptah = formmid.files.avatar_file.path;
      gm(ptah).crop(crop.width, crop.height, crop.x, crop.y).resize('200', '200').write(ptah, function (err) {
        if (!err) console.log('crazytown has arrived');
      });

    }
    res.json({msg: "ok"});


  }).catch(function (err) {
    console.log('err at admin/useredit/headerimg', err)
    res.json({msg: err});
  });
})







