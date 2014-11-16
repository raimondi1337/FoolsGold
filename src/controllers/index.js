//function to return the main page
//express functions always receive the request and response objects
var main = function(req, res){
    //res.render returns a view from the views folder. 
    //The file extension is not needed because it has been defined by the view engine
    //The file path is not needed because it was set up with the views in the app.js file
    //This will automatically render out the index.jade page into HTML and return it
    res.render('index');
};

//function to return the /gallery page
//express functions always receive the request and response objects
var getGallery = function(req, res) {
    //res.render returns a view from the views folder. 
    //The file extension is not needed because it has been defined by the view engine
    //The file path is not needed because it was set up with the views in the app.js file
    //This will automatically render out the gallery.jade page into HTML and return it
    res.render('gallery');
};

//function to return the /extended page
//express functions always receive the request and response objects
var getExtended = function(req, res) {
    
    //json data to pass to a page as variables that can be used in Jade
    var pageData = {
        title: 'Extending Jade pages',
        user: 'bro'
    };

    //res.render returns a view from the views folder. 
    //The file extension is not needed because it has been defined by the view engine
    //The file path is not needed because it was set up with the views in the app.js file
    //This will automatically render out the extended.jade page into HTML and return it
    /** The second parameter is the variables in JSON to pass into the template.
        Any of these variables passed in will be accessible in the jade template.
    **/
    res.render('extended', {pageData: pageData});
};

//function to return the /variables page
//express functions always receive the request and response objects
var getVariablePage = function(req, res) {

    var pageData = {
        title: 'Jade variables',
        user: 'friend'
    };

    //res.render returns a view from the views folder. 
    //The file extension is not needed because it has been defined by the view engine
    //The file path is not needed because it was set up with the views in the app.js file
    //This will automatically render out the variables.jade page into HTML and return it
    /** The second parameter is the variables in JSON to pass into the template.
        Any of these variables passed in will be accessible in the jade template.
    **/
    res.render('variables', {pageData: pageData});
};

//function to return the /time POST
//express functions always receive the request and response objects
var updateTime = function(req, res) {
    
    var time = new Date().getTime();
    
    //res.json sends a JSON response back to the client
    //This is often used for Ajax requests
    res.json({time: time});
};

//export the public functions
module.exports.main = main;
module.exports.getVariablePage = getVariablePage;
module.exports.getExtended = getExtended;
module.exports.getGallery = getGallery;
module.exports.updateTime = updateTime;