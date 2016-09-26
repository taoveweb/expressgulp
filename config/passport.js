/**
 * Created by Administrator on 2016/8/5 0005.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');
var mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports.init = function () {
  passport.use(new LocalStrategy({
      usernameField:'account',
      passwordField:'password'
    },
    function (account, password, done) {
      var search={};
      if(validator.isEmail(account)){
        search.email=account;
      }else if(validator.isMobilePhone(account,'zh-CN')){
        search.phone=account;
      }else{
        search.name=account
      }
      User.findOne(search, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  ));


  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

};
