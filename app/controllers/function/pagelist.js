/**
 * Created by Administrator on 2016/8/30 0030.
 */
var mongoose = require('mongoose'),
  co = require('co'),
  path = require('path'),
  fs = require('fs'),
  qs = require('qs'),
  crypto = require('crypto'),
  _ = require('lodash'),
  config = require('../../../config/config');

module.exports = function (req, res, next, option) {
  var Model = option.Model,
    sortArray = option.sortArray,
    routerClass = option.routerClass,
    hbsTemplate = option.hbsTemplate,
    search = option.search;
  co(function *() {
    var pageSize = 14;
    var count = yield Model.count(search);
    var pageNum = req.query.page || 1;
    var pageCount = Math.ceil(count / pageSize);
    var starPage = 1;
    var sortby = req.query.sortby ? req.query.sortby : 'created';
    var sortdir = req.query.sortdir ? req.query.sortdir : 'desc';
    if (sortArray.indexOf(sortby) === -1) {
      sortby = 'created'
    }
    if (['desc', 'asc'].indexOf(sortdir) === -1) {
      sortdir = 'desc'
    }
    var sortObj = {};
    sortObj[sortby] = sortdir;

    if (pageNum > pageSize) {
      starPage = Math.floor(pageNum / pageSize) * pageSize + 1
    }

    var endPage = starPage + pageSize >= pageCount ? pageCount + 1 : starPage + pageSize;
    var prePage = starPage - pageSize <= 0 ? 1 : starPage - pageSize;
    var nextPage = starPage + pageSize >= pageCount ? pageCount : starPage + pageSize;
    var docs = {};

    docs = yield new Promise(function (resolve, reject) {
      var skip=((pageNum - 1) * pageSize);
      Model.find(search).populate('author').sort(sortObj).skip(skip).limit(pageSize).exec(function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs)
        }
      });
    });


    if(option.api){
      return res.json(docs)
    }



    res.render(hbsTemplate, {
      title: '会员列表',
      docs: docs,
      pageNum: pageNum,
      pageCount: pageCount,
      starPage: starPage,
      endPage: endPage,
      prePage: prePage,
      nextPage: nextPage,
      sortdir: sortdir,
      sortby: sortby,
      router: routerClass,
      search:qs.stringify(option.originSearch),
      currentPage: parseInt(pageNum)
    });
  }).catch(function (err) {
    console.log('出错文件' + __filename + "出错方法：list 具体内容", err)
  });
}
