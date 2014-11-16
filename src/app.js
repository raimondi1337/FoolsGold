//import libraries 
var path = require('path'); //path is a built-in node library to handle file system paths
var express = require('express'); //express is a popular Model-View-Controller framework for Node
var compression = require('compression'); //compression library to gzip responses for smaller/faster transfer
var favicon = require('serve-favicon'); //favicon library to handle favicon requests
var cookieParser = require('cookie-parser'); //Library to parse cookies from the requests

//In MVC, you have 'routes' that line up URLs to controller methods
var router = require('./router.js'); //import our router.js file to handle the MVC routes

//Port set by process.env.PORT environment variable.
//If the process.env.PORT variable or the env.NODE_PORT variables do not exist, use port 3000    
var port = process.env.PORT || process.env.NODE_PORT || 3000;

//call express to get an Express MVC server object
var app = express();

//app.use tells express to use different options
//This option tells express to use /assets in a URL path as a static mirror to our client folder
//Any requests to /assets will map to the client folder to find a file
//For example going to /assets/img/favicon.png would return the favicon image
app.use('/assets', express.static(path.resolve(__dirname+'../../client/')));

//Call compression and tell the app to use it
app.use(compression());

//app.set sets one of the express config options
//set up the view (V of MVC) to use jade (not shown in this example but needed for express to work)
//You can use other view engines besides jade
app.set('view engine', 'jade');

//set the views path to the template directory (not shown in this example but needed for express to work)
app.set('views', __dirname + '../../client/template');

//call favicon with the favicon path and tell the app to use it
app.use(favicon(__dirname + '../../client/img/favicon.png'));

//call the cookie parser library and tell express to use it
app.use(cookieParser());

//pass our app to our router object to map the routes
router(app);

//Tell the app to listen on the specified port
var server = app.listen(port, function(err) {
    //if the app fails, throw the err 
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});

