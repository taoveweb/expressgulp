var express = require('express'),
  router = express.Router(),
  auth = require('../../front/user/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co'),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  gm = require('gm'),
  crypto = require('crypto'),
  _ = require('lodash'),
  config = require('../../../../config/config');
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
  app.use('/admin/user',auth.adminLogin, router);
};

//get会员编缉
router.get('/edit',  function (req, res, next) {
  co(function *() {
    var id = req.query.id || "";
    var user = {};
    if (id) {
      user = yield User.find({"_id": id});

      user[0]['headPicture'] = user[0]['headPicture'] == "" ? "/common/uploadheaderimg/logo.jpg" : user[0]['headPicture'];
    }

    res.render('admin/user/useredit', {
      layout:'main_admin',
      title: '会员编辑',
      router: 'userlist',
      user: user

    });
  }).catch(function (err) {
    console.log('出错文件'+ __filename + "出错方法：edit 具体内容", err)
  });
});


router.post('/update', function (req, res, next) {

  co(function *() {
    var update = {};
    var oldImg = "";
    if (req.body.name) {
      update.name = req.body.name;
    }
    if (req.body.sex) {
      req.checkBody('sex', '不是数字').isInt();
      update.sex = req.body.sex
    }
    if (req.body.disable) {
      req.checkBody('disable', '不是数字').isInt();
      update.disable = req.body.disable
    }
    if (req.body.email) {
      req.checkBody('email', "格试不对").isEmail();
      update.email = req.body.email
    }
    if (req.body.phone) {
      req.checkBody('phone', "电话格试不对").isMobilePhone('zh-CN');
      update.phone = req.body.phone
    }
    if (req.body.headPicture) {
      update.headPicture = req.body.headPicture
    }
    if (req.body.level) {
      update.level = req.body.level
    }

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
    }
    var id = req.body['_id'] || "";
    var user = {};
    if (update) {
      update.updateby=new Date();
      user = yield new Promise(function (resolve, reject) {
        User.findOneAndUpdate({"_id": id}, update, {new: true}, function (err, user) {
          if (err) {
            reject(err)
          } else {
            resolve(user)
          }
        });
      })
    }

    user['headPicture'] = user['headPicture'] == "" ? "/common/uploadheaderimg/logo.jpg" : user['headPicture'];

    res.render('admin/user/useredit', {
      layout:'main_admin',
      title: '会员编辑',
      router: 'useredit',
      user: [user],
      err: errors,
      success: !errors.length
    });
  }).catch(function (err) {
    console.log('出错文件'+ __filename + "出错方法：update 具体内容", err)
  });
});


router.post('/edit/postheaderimg',  function (req, res, next) {
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

      res.json({path: ptah.split('upload')[1]});
    }


  }).catch(function (err) {
    console.log('出错文件'+ __filename + "出错方法：/edit/postheaderimg 具体内容", err)
    res.json({msg: err});
  });
})







