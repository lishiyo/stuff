// load dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();
var nomo = require('node-monkey').start({
	port: 3000
});

// config - all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//custom middleware before app.use(app.router)
app.use(function (req, res, next) {
  console.log("In comes a " + req.method + " to " + req.url);
	
	var real_value = Math.floor(Math.random()*2+1);
	console.log("real_value: " + real_value);
	req.real_value = real_value;
	res.real_value = real_value;
	
  next();
});

app.use(app.router); //express.router
app.use(express.static(path.join(__dirname, 'public')));

// config - development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/test', routes.test);

// configure http server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
