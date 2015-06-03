var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var log = require('./lib/log')(module);
var bodyParser = require('body-parser');
var config = require('./config');

var http = require('http');

var app = express();

var port = process.env.PORT || config.get('port');
app.set('port', port);

var server = http.createServer(app);
server.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});
console.log('Express server listening on port ' + app.get('port'))

//app.use(favicon(__dirname + '/public/favicon.ico'));

if(app.get('env') == 'development'){
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(logger('dev'));
app.use(cookieParser());

app.set('views', __dirname + '/public/pages');

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(express.static(__dirname + '/public'));

var store = require('./lib/sessionStore')

var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require("mongoose");

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: store
}));

app.use(require('./middleware/loadUser'));
app.use(require('./middleware/loadCompany'));
app.use(require('./middleware/loadAdmin'));

var routes = require('./routes')(app);

app.engine('html', require('ejs').renderFile);

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
        if (err.status == 404) {
            res.render('404.html', {
                message: err.message,
                error: {}
            });
        }
        else {
            res.send( {
                message: err.message,
                error: err
            });
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status == 404) {
        res.render('404.html', {
            message: err.message,
            error: {}
        });
    }
    else {
        res.send( {
            message: err.message,
            error: err
        });
    }
});


module.exports = app;
