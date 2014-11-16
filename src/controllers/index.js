var path = require('path'); //path is a built-in node library to handle file system paths

//There is no reason for the time here except as an example
var time = new Date().getTime(); //Get the current time, just as an example 

//function to handle requests to the main page
//controller functions in Express receive the full HTTP request 
//and a pre-filled out response object to send
var main = function(req, res){
    //path.resolve finds the absolute path for you
    //send the main.page.html file using a resolved absolute path
    //the res.sendFile action returns a file to a user
    //res.sendFile response to the HTTP request so you can't send any more data through HTTP
    //until the next request
    res.sendFile(path.resolve(__dirname+'../../../client/mainpage.html'));
};

//function to handle requests to the gallery page
//controller functions in Express receive the full HTTP request 
//and a pre-filled out response object to send
var getGallery = function(req, res) {
    //path.resolve finds the absolute path for you
    //send the gallery.html file using a resolved absolute path
    //the res.sendFile action returns a file to a user
    //res.sendFile response to the HTTP request so you can't send any more data through HTTP
    //until the next request
    res.sendFile(path.resolve(__dirname+'../../../client/gallery.html'));
};

//function to handle post request to update the time
//controller functions in Express receive the full HTTP request 
//and a pre-filled out response object to send
var updateTime = function(req, res) {
    //update the time
    time = new Date().getTime();
    
    //res.json returns json to the page. Since this sends back the data through HTTP
    //you can't send any more data to this user until the next response
    res.json({time: time});
};

//export the controller functions
module.exports.main = main;
module.exports.getGallery = getGallery;
module.exports.updateTime = updateTime;