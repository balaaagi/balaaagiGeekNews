var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request=require('request');
var jsdom=require('jsdom');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var weburl;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

routes.get('/processTitle',function(req,res){
  var weburl=req.headers.weburl;
  var origUrl=weburl;
  request( { method: "HEAD", url: weburl, followAllRedirects: true },
            function (error, response) {
              origUrl=response.request.href
                console.log(origUrl);
                var document=jsdom.jsdom(null);
                var a = document.createElement('a');
                a.href = origUrl;
                console.log(a.hostname);
                

                jsdom.env(
                   origUrl,
                      ["http://code.jquery.com/jquery.js"],
                  function (err, window) {
                    var $ = window.jQuery;
                     
                      console.log($('title').text());
                                
                    
                  }
                );
            });
  
  

        

      
  
res.send("success");
});

routes.get('/processurl',function(req,res){
   weburl=req.headers.weburl;
  console.log(weburl);
  //var weburl=req.body.weburl;
  console.log("ok");
      
      
      res.send({"message":"success"});
}); 