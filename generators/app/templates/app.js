var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');
var multer    = require('multer');
var log_dao = require('./dao/log.dao');

var app = express();
app.use(function(req, res, next) {
    var log = {
        api: req.originalUrl,
        method: req.method,
        host: req.get('host')
    };
    log_dao.createLog(log);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, PUT, X-Auth-Token");
    res.header("Access-Control-Allow-Methods", "OPTIONS, PUT, POST, GET, DELETE");
    //if (!req.xhr) return res.send({"API Attempt": "Attempting to see our API. Contact us at support@compnay.com for access. "});
    next();
});

// view engine setup
//app.set('views', path.join(__dirname, 'templates'));
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
var router = require('./router')(app);
app.use('/apidoc', express.static(path.join(__dirname, '../apidocs')));
console.log("url for api docs: https://host:port/apidoc eg. https://localhost:port/apidoc");


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({status :'error',
      error: err.message,
      error_stack: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({status: 'error',
    error: err.message,
    error_stack: {}
  });
});


module.exports = app;
