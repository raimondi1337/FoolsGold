//import the controllers
//This only specifies the folder name, which means it will automatically pull the index.js file
var controllers = require('./controllers');

//function to attach routes
var router = function(app) { //pass the express app in
    
    //app.VERB maps get requests to a middleware action
    //For example
    //app.get handles GET requests
    //app.post handles POST requests
    
    //whenever someone goes to the site without a path (AKA the home page), call controllers.main
    //For example www.webpage.com
    app.get('/', controllers.main);
    
    //when someone goes to the /gallery page, call controllers.getGallery
    //For example, www.webpage.com/gallery
    app.get('/gallery', controllers.getGallery);
    
    //When someone POSTS to /time, call controllers.updateTime
    //For example, a form submission to www.webpage.com/time 
    app.post('/time', controllers.updateTime);
};

//export the router function
module.exports = router;