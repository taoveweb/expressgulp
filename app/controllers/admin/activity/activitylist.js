var express = require('express'),
  router = express.Router(),
  auth = require('../../front/user/user'),
  mongoose = require('mongoose'),
  Activity = mongoose.model('Activity'),
  co = require('co');


module.exports = function (app) {
  app.use('/admin/activity', auth.adminLogin, router);
};

//活动列表
router.get('/list',  function (req, res, next) {
  var search = {};
  var originSearch={};

  if (req.query.title) {
    originSearch.title=req.query.title;
    search.title = new RegExp(req.query.title.trim(), 'i');
  }
  if (req.query.content) {
    originSearch.content=req.query.content;
    search.content = new RegExp(req.query.content.trim(), 'i');
  }

  if (req.query.daterange) {
    originSearch.daterange=req.query.daterange;
    var dataArr = req.query.daterange.split('+/+');
    search.created = {$lte: new Date(dataArr[1].replace("+"," ")),$gte:new Date(dataArr[0].replace("+"," "))};
  }
  var option={
    Model:Activity,
    routerClass:'activityList',
    hbsTemplate:'admin/activity/activityList',
    sortArray:['created', 'author'],
    search:search,
    originSearch:originSearch

  };
  require('../../function/pagelist')(req, res, next,option);
});








