var express = require('express'),
  router = express.Router(),
  auth = require('../../mobile/user/user'),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
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
  app.use('/admin/img', auth.adminLogin,router);
};

//图片表单
router.get('/edit',  function (req, res, next) {

  co(function *() {
    var id = req.query.id || "";
    var img = {};
    if (id) {
      img = yield Image.find({"_id": id});
      img[0]['headPicture'] = img[0]['headPicture'] == "" ? "/common/uploadheaderimg/logo.jpg" : img[0]['headPicture'];
    }

    res.render('admin/img/imgedit', {
      title: '图片编缉',
      router: 'imgedit',
      img: img

    });
  }).catch(function (err) {
    console.log('admin/img/imgedit', err)
  });
});

router.post('/update',  function (req, res, next) {

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
    if (req.body.introduction) {
          req.checkBody('introduction', '简介不能为空').isNull();
      update.introduction = req.body.introduction
    }

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
    }
    var id = req.body['_id'] || "";
    var img = {};
    if (update) {
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


    img['headPicture'] = img['headPicture'] == "" ? "/common/uploadheaderimg/logo.jpg" : img['headPicture'];

    res.render('admin/img/imgedit', {
      title: '图片编缉',
      router: 'imgedit',
      img: [img],
      err: errors,
      success: !errors.length
    });
  }).catch(function (err) {
    console.log('err at post admin/imgedit', err)
  });
});



router.post('/edit/postimg',function (req, res, next) {
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
    console.log('err at admin/img/edit/postimg', err)
    res.json({msg: err});
  });
})







