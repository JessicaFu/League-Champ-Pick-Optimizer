function init(){
	var express = require('express');
	var app = express();

	var stylus = require('stylus');
	var nib = require('nib');
	var engines = require('consolidate');
	var bodyParser = require('body-parser')
	var morgan = require('morgan');
	var cookieParser = require('cookie-parser');
	var session = require("express-session");

	function compile(str, path) {
	  return stylus(str)
	    .set('filename', path)
	    .use(nib());
	};
	app.use(stylus.middleware({
	    src: 'public',
	    compile: compile}));

	app.set('views', 'views');
	app.set('view engine', 'jade');

	//app.use(logger('dev'));
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(cookieParser());

	app.use(session({
		secret: 'Yummies Nomnoms Snuball',
		resave: true,
		saveUninitialized: true
	}));

	app.use("/uploads", express.static('/'));
	app.use(express.static('/public'));
	/*
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});*/

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

	return app;
};
module.exports = init;
