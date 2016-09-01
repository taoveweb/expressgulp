var express = require('express'),
  router = express.Router(),
  auth = require('../../mobile/user/user'),
  mongoose = require('mongoose'),
  Image = mongoose.model('Image'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin/img', auth.adminLogin, router);
};


//会员列表
router.get('/list', function (req, res, next) {

  var search = {};
  var originSearch={};

  if (req.query.introduction) {
    originSearch.introduction=req.query.introduction;
    search.introduction = new RegExp(req.query.introduction.trim(), 'i');
  }
  if (req.query.sign) {
    originSearch.sign=req.query.sign;
    search.sign = new RegExp(req.query.sign.trim(), 'i');
  }

  if (req.query.daterange) {
    originSearch.daterange=req.query.daterange;
    var dataArr = req.query.daterange.split('+/+');
    search.created = {$lte: new Date(dataArr[1].replace("+"," ")),$gte:new Date(dataArr[0].replace("+"," "))};
    console.log(search.created )
  }


  var option = {
    Model: Image,
    routerClass: 'imglist',
    hbsTemplate: 'admin/img/imglist',
    sortArray: ['created', 'sex', 'fans', 'concern'],
    search:search,
    originSearch:originSearch
  };
  require('../../function/pagelist')(req, res, next, option);
  /*co(function *() {
   var pageSize = 18;
   var count = yield Image.count({});
   var pageNum = req.query.page || 1;
   if (pageNum > pageCount) {
   pageNum = pageCount
   }
   var pageCount = Math.ceil(count / pageSize);
   var starPage = 1;
   var sortby = req.query.sortby ? req.query.sortby : 'created';
   var sortdir = req.query.sortdir ? req.query.sortdir : 'desc';
   if (['created', 'sex', 'fans', 'concern'].indexOf(sortby) === -1) {
   sortby = 'created'
   }
   if (['desc', 'asc'].indexOf(sortdir) === -1) {
   sortdir = 'desc'
   }

   var sortObj = {};
   sortObj[sortby] = sortdir;
   if (req.query.fans) {
   sort = {fans: parseInt(req.query.fans)}
   }
   if (req.query.created) {
   sort = {created: parseInt(req.query.created)}
   }
   if (req.query.concern) {
   sort = {concern: parseInt(req.query.concern)}
   }
   if (pageNum > pageSize) {
   starPage = Math.floor(pageNum / pageSize) * pageSize + 1
   }

   var endPage = starPage + pageSize >= pageCount ? pageCount + 1 : starPage + pageSize;
   var prePage = starPage - pageSize <= 0 ? 1 : starPage - pageSize;
   var nextPage = starPage + pageSize >= pageCount ? pageCount : starPage + pageSize;
   var imgs = yield new Promise(function (resolve, reject) {
   Image.find().populate('author').sort(sortObj).skip((pageNum - 1) * pageSize).limit(pageSize).exec(function (err, imgs) {
   if (err) {
   reject(err);
   } else {
   resolve(imgs)
   }
   });
   });

   res.render('admin/img/imglist', {
   title: '会员列表',
   imgs: imgs,
   pageNum: pageNum,
   pageCount: pageCount,
   starPage: starPage,
   endPage: endPage,
   prePage: prePage,
   nextPage: nextPage,
   sortdir: sortdir,
   sortby: sortby,
   router: 'imglist',
   currentPage: parseInt(pageNum)
   });
   }).catch(function (err) {
   console.log('出错文件'+ __filename + "出错方法：list 具体内容", err)
   });*/
});








