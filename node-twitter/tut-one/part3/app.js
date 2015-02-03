// load dependencies
// express is 3.x here, not 4
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
		morgan = require('morgan');

var app = express();
/**
var nomo = require('node-monkey').start({
	port: 4000
});
**/

// http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('0.0.0.0:27017/testdb');

// config - all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

//custom middleware that must be called before app.use(app.router)
/**
app.use(function (req, res, next) {
 
	var real_value = Math.floor(Math.random()*20+1);
	console.log("middleware real_value: " + real_value);
	req.real_value = real_value;
	res.real_value = real_value;
	
  next();
});
**/

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db; //the monk url to testdb
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
app.get('/userlist', routes.userlist);
app.get('/newuser', routes.newuser);
app.post('/adduser', routes.adduser);

// configure http server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
