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
  crypto = require('crypto'),
  config = require('../../../config/config');
formidable.IncomingForm.prototype._uploadPath = function (filename) {
  var name = 'hp_';
  var buf = crypto.randomBytes(16);
  for (var i = 0; i < buf.length; ++i) {
    name += ('0' + buf[i].toString(16)).slice(-2);
  }

  if (this.keepExtensions) {
    var ext = path.extname(filename);
    ext = ext.replace(/(\.[a-z0-9]+).*/i, '$1');

    name += ext;
  }

  return path.join(this.uploadDir, name);
};

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
      yield new Promise(function (resolve, reject) {
        gm(ptah).crop(crop.width, crop.height, crop.x, crop.y).resize('200', '200').write(ptah, function (err) {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }

        });
      })
    }
    res.json({msg: "ok"});

  }).catch(function (err) {
    console.log('err at admin/useredit/headerimg', err)
    res.json({msg: err});
  });
})







