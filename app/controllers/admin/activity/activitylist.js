var express = require('express'),
  router = express.Router(),
  auth = require('../../mobile/user/user'),
  mongoose = require('mongoose'),
  Activity = mongoose.model('Activity'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin/activity', auth.adminLogin, router);
};


//活动列表
router.get('/list', function (req, res, next) {
  co(function *(){
    var aa = yield new Promise(function (resolve, reject) {
      Activity.find({_id:'57c61e366b4fcbbaf0f7acc4'}).exec(function (err, doc) {
        console.log(doc)
        if (err) {
          reject(err);

        }else{
          resolve(doc)
        }

      });
    });

    res.json({aa: 'aa'})
  }).catch(function (err) {
    console.log('出错文件'+ __filename + "出错方法：list 具体内容", err)
  })


  /* co(function *() {
   var pageSize = 18;
   var count = yield Activity.count({});
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
   var activitys = yield new Promise(function (resolve, reject) {
   Activity.find().sort(sortObj).skip((pageNum - 1) * pageSize).limit(pageSize).exec(function (err, activitys) {
   if (err) {
   reject(err);
   } else {
   resolve(activitys)
   }
   });
   });

   res.render('admin/activity/activityList', {
   title: '会员列表',
   activitys: activitys,
   pageNum: pageNum,
   pageCount: pageCount,
   starPage: starPage,
   endPage: endPage,
   prePage: prePage,
   nextPage: nextPage,
   sortdir: sortdir,
   sortby: sortby,
   router: 'activitylist',
   currentPage: parseInt(pageNum)
   });
   }).catch(function (err) {
   console.log('出错文件'+ __filename + "出错方法：list 具体内容", err)
   });*/
});








