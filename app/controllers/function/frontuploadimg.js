/**
 * Created by Administrator on 2016/8/30 0030.
 */
var mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  co = require('co'),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  gm = require('gm'),
  crypto = require('crypto'),
  _ = require('lodash'),
  ExifImage=require('exif').ExifImage,
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


module.exports = function (req, res, next) {

  co(function *() {
    var form = new formidable.IncomingForm();
    var dir = config.root + "/upload/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    form.keepExtensions = true;
    form.uploadDir = dir;
    form.maxFieldsSize = 3 * 1024 * 1024;
    var formmid = yield new Promise(function (resole, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        resole({fields: fields, files: files});
      });
    });



    if (formmid) {
      var imgptah = formmid.files['files'].path;
      var imgPathParse=path.parse(imgptah);
      console.log(imgptah)
      var exifData=yield new Promise(function (resolve, reject) {
        new ExifImage({ image : imgptah }, function (error, exifData) {
          if (error)
            reject(error);
          else
            resolve(exifData); // Do something with your data!
        });
      });
      console.log(exifData)
 /*     yield new Promise(function (resolve, reject) {
        gm(ptah).crop(crop.width, crop.height, crop.x, crop.y).write(ptah, function (err) {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }

        });
      })*/

      res.json({imgptah: imgptah.split('upload')[1],});
    }


  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：upload img 具体内容", err)
    res.json({msg: err});
  });
}
