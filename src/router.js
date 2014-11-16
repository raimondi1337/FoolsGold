//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 

//router function to set up the URL routes for an Express MVC app
var router = function(app) {

    app.get('/', controllers.main); //map the main site page to controllers.main
    app.get('/variables', controllers.getVariablePage); //map the /variables page to controllers.getVariablePage
    app.get('/extended', controllers.getExtended); //map the /extended page to controllers.getExtended
    app.get('/gallery', controllers.getGallery); //map the /gallery page to controllers.getGallery
    app.post('/time', controllers.updateTime); //map the /time page to controllers.updateTime
};

module.exports = router; //export the router as a public function