var express = require('express'),
  router = express.Router(),
  auth = require('../../front/user/user'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin/user',auth.adminLogin, router);
};

router.get('/',function(req,res,next){
  res.redirect('/admin/user/list');
});

//会员列表
router.get('/list',  function (req, res, next) {
  var search = {};
  var originSearch={};
  if (req.query.email) {
    originSearch.email=req.query.email;
    search.email = new RegExp(req.query.email.trim(), 'i');
  }
  if (req.query.name) {
    originSearch.name=req.query.name;
    search.name = new RegExp(req.query.name.trim(), 'i');
  }
  if (req.query.phone) {
    originSearch.phone=req.query.phone;
    search.phone = new RegExp(req.query.phone.trim(), 'i');
  }
  if (req.query.daterange) {
    originSearch.daterange=req.query.daterange;
    var dataArr = req.query.daterange.split('+/+');
    search.created = {$lte: new Date(dataArr[1].replace("+"," ")),$gte:new Date(dataArr[0].replace("+"," "))};
  }
  var option={
    Model:User,
    routerClass:'userlist',
    title:"会员列表",
    hbsTemplate:'admin/user/userlist',
    sortArray:['created','sex','disable','fans','concern'],
    search:search,
    originSearch:originSearch
  };
  require('../../function/pagelist')(req, res, next,option);

/*  co(function *() {
    var pageSize = 18;
    var count = yield User.count({});
    var pageNum = req.query.page || 1;
    if (pageNum > pageCount) {
      pageNum = pageCount
    }
    var pageCount = Math.ceil(count / pageSize);
    var starPage = 1;
    var sortby= req.query.sortby ? req.query.sortby : 'created';
    var sortdir= req.query.sortdir ? req.query.sortdir : 'desc';
    if(['created','sex','disable','fans','concern'].indexOf(sortby) ===-1){
      sortby='created'
    }

    if(['desc','asc'].indexOf(sortdir) ===-1){
      sortdir='desc'
    }

    var sortObj={};
    sortObj[sortby]=sortdir;
    if(pageNum>pageSize ){
      starPage=Math.floor(pageNum / pageSize) * pageSize+1
    }

    var endPage = starPage + pageSize >= pageCount ? pageCount+1 : starPage + pageSize;
    var prePage = starPage - pageSize <= 0 ? 1 : starPage - pageSize;
    var nextPage = starPage + pageSize >= pageCount ? pageCount : starPage + pageSize;
    var users = yield User.find().sort(sortObj).skip((pageNum - 1) * pageSize).limit(pageSize);

    res.render('admin/user/userlist', {
      title: '会员列表',
      users: users,
      pageNum: pageNum,
      pageCount: pageCount,
      starPage: starPage,
      endPage: endPage,
      prePage: prePage,
      nextPage: nextPage,
      sortdir:sortdir,
      sortby:sortby,
      router:'userlist',
      currentPage:parseInt(pageNum)
    });
  }).catch(function (err) {
    console.log('出错文件'+ __filename + "出错方法：/list 具体内容", err)
  });*/
});







