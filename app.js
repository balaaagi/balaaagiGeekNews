var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request=require('request');
var jsdom=require('jsdom');
var mongoose=require('mongoose');
var passport=require('passport');
var http = require('http');
require('./models/Users');
require('./models/Posts');
require('./config/passport');
mongoose.connect('mongodb://localhost/balaaagigeekynews');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var weburl;

app.set('port', process.env.PORT || 7575);
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
app.use(passport.initialize());
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

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

routes.get('/processTitle',function(req,res){
  var weburl=req.headers.weburl;
  var origUrl=weburl;
  var hostname,title,link;
  request( { method: "HEAD", url: weburl, followAllRedirects: true },
            function (error, response) {
              origUrl=response.request.href
              link=origUrl;
                console.log(origUrl);
                var document=jsdom.jsdom(null);
                var a = document.createElement('a');
                a.href = origUrl;
                hostname=a.hostname;
                console.log(hostname);
                jsdom.env(
                   origUrl,
                      ["http://code.jquery.com/jquery.js"],
                  function (err, window) {
                    var $ = window.jQuery;
                      title=$('title').text();     
                        console.log(title);
    
                  res.send({'hostname':hostname,'link':link,'title':title});                            
                    
                  }
                );
            });
 

        

      
  
});

