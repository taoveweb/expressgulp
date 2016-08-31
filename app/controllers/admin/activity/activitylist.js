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
router.get('/list',  function (req, res, next) {
  var search={};
  var option={
    Model:Activity,
    routerClass:'activityList',
    hbsTemplate:'admin/activity/activityList',
    sortArray:['created', 'sex', 'fans', 'concern'],
    search:search
  };
  require('../../function/pagelist')(req, res, next,option);
});








