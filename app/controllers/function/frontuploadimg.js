/**
 * Created by Administrator on 2016/8/30 0030.
 */
var mongoose = require('mongoose'),
  Img = mongoose.model('Img'),
  co = require('co'),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  gm = require('gm'),
  crypto = require('crypto'),
  ObjectId = mongoose.Types.ObjectId,
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
    var add = {};
    var user=req.user;
    var form = new formidable.IncomingForm();
    var dirDate = `${new Date().getFullYear()}${(new Date().getMonth() + 1)}/`;
    var dir = config.root + "/upload/images/" + dirDate;
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
      var imgPathParse = path.parse(imgptah);
      var imginfo = yield new Promise(function (resolve, reject) {
        gm(imgptah).identify(function (err, value) {
          if (err) {
            reject(err)
          } else {
            resolve(value);
          }
        })
      });
      if(imginfo['Profile-EXIF']){
        var exif=imginfo['Profile-EXIF'];
        add.device=exif['0xA434'];
      }
      var fimg = formmid.files['files'];
      add.size = fimg.size;
      add.lastModifiedDate = new Date(fimg.lastModifiedDate);
      add.imgUrl = dirDate + imgPathParse.base;
      add.author=ObjectId(user['_id']);
      add.width=imginfo.size.width;
      add.height=imginfo.size.height;
      add.signature=imginfo.Signature;

      var img=new Img(add);
      var hasimg=yield new Promise(function(resolve,reject){
        Img.find({signature:add.signature},function(err,img){
          if(err){
            reject(err);
          }else{
            resolve(img)
          }
        })
      });
      if(hasimg.length){
        return res.json({msg:'已经存在这张图片了'})
      }
      var nimg=yield new Promise(function(resolve,reject){
        img.save(function(err,img){
          if(err){
            reject(err);
          }else{
            resolve(img)
          }
        })
      });

      res.json(nimg);
    }


  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：upload img 具体内容", err)
    res.json({msg: err});
  });
}
