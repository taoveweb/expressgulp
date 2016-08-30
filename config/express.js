var express = require('express');
var glob = require('glob');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var helper = require('handlebars-helpers')();
var exphbs = require('express-handlebars');
var myhelper = require("./myRegisterHelpers");
var expressValidator = require('express-validator');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function (app, config,connection) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('.hbs', exphbs({
    extname:'.hbs',
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [
      config.root + '/app/views/partials/',
      config.root + '/app/views/partials/mobile/',
      config.root + '/app/views/partials/admin/'
    ],
    helpers:myhelper
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', '.hbs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(session({
    secret: 'nodeblog',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: connection })
  }));
  app.use(require('connect-flash')());
  app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function(req,res,next){
    req.user = null;
    if(req.session.passport && req.session.passport.user){
      User.findById(req.session.passport.user,function(err,user){
        if(err) return next(err);
        user.password = null ;
        req.user = user;

        next()
      })
    }else{
      next()
    }
  });
  app.use(function(req,res,next){
    res.locals.user=req.user;
    next();
  });
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));
  app.use(function(req,res,next){
    app.locals.user = req.user;
    next();
  });
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(express.static(config.root + '/dist'));
  app.use(express.static(config.root + '/upload'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js',{ignore:config.root + '/app/controllers/function/*.js'});
  controllers.forEach(function (controller) {
    require(controller)(app);
  });


  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};



