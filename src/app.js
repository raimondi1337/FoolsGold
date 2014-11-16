//import libraries 
<<<<<<< HEAD
var path = require('path'); //path handles file system paths
var express = require('express'); //Express is an MVC server framework
var compression = require('compression'); //compression is used to gzip packets into smaller/faster sizes
var favicon = require('serve-favicon'); //serve-favicon serves the favicon quickly without needing to code a controller or route
var cookieParser = require('cookie-parser'); //cookie parser pulls cookie data from HTTP packets
//pull in our routes file to handle all of the URL routes
var router = require('./router.js'); 

var server;  //the http server
var port = process.env.PORT || process.env.NODE_PORT || 3000; //server port based on environment falling back to 3000 if needed

var app = express(); //the express MVC app
app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); //sets the static file folder (css, images, etc) to the url /assets
app.use(compression()); //tell express to use compression for smaller/faster packets
app.set('view engine', 'jade'); //set the view type to Jade
app.set('views', __dirname + '/views'); //set the views folder (for use with the controllers)
app.use(favicon(__dirname + '/../client/img/favicon.png')); //set the favicon
app.use(cookieParser()); //tell express to use the cookie parser

router(app); //pass the app to our router module to set up the URL routes

//tell the express app to listen on the given port and get the HTTP server back
=======
var path = require('path'); 
var express = require('express');  
var compression = require('compression');  
var favicon = require('serve-favicon'); 
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose'); 
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var url = require('url');
 
var dbURL = process.env.MONGOHQ_URL || "mongodb://localhost/DomoMaker";

var db = mongoose.connect(dbURL, function(err) {
    if(err) {
        console.log("Could not connect to database");
        throw err;
    }
});

var redisURL = {
    hostname: 'localhost',
    port: 6379
};

var redisPASS;

if(process.env.REDISCLOUD_URL){
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisPASS = redisURL.auth.split(":")[1];
}

//pull in our routes
var router = require('./router.js'); 

var server;  
var port = process.env.PORT || process.env.NODE_PORT || 3000; 

var app = express(); 
app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); 
app.use(compression()); 
app.use(bodyParser.urlencoded({ 
  extended: true                
}));                            
app.use(session({
    store: new RedisStore({
        host: redisURL.hostname,
        port: redisURL.port,
        pass: redisPASS 
    }),
    secret: 'Domo Arigato',
    resave: true,
    saveUninitialized: true
}));                             
app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views'); 
app.use(favicon(__dirname + '/../client/img/favicon.png')); 
app.use(cookieParser()); 

router(app); 

>>>>>>> parent of f64b764... removed jade
server = app.listen(port, function(err) { 
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});
