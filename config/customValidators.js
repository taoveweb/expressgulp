/**
 * Created by Administrator on 2016/8/5 0005.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');
var mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = {
  isNic: function (value) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
    return reg.test(value);
  },
  isWeixin: function (value) {
    var reg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,9}$/;
    return reg.test(value);
  },
  isRealname: function (value) {
    var reg = /^[(\u4e00-\u9fa5)|(a-zA-Z)]+$/;
    return reg.test(value);
  },
  isBirthday: function (value) {
    var reg = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/;
    return reg.test(value);
  },
  isLocation: function (value) {
    var reg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
    return reg.test(value);
  },
  isZipcode: function (value) {
    var reg = /^[0-9]{6}$/;
    return reg.test(value);
  },
  isAddress: function (value) {
    var reg = /^[-_\u4e00-\u9fa5a-zA-Z]+$/;
    return reg.test(value);
  },
  isWeibo: function (value) {
    var reg = /^[-_\u4e00-\u9fa5a-zA-Z]+$/;
    return reg.test(value);
  },
}
