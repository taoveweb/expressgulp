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

});







