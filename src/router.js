//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 
var mid = require('./middleware');

var router = function(app) {

    app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage); 
    app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login); 
    app.get("/signup", mid.requiresSecure,mid.requiresLogout, controllers.Account.signupPage);
    app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get("/logout", mid.requiresLogin, controllers.Account.logout);
    app.get("/gallery", mid.requiresLogin, controllers.ScrapeGallery.makerPage);
    app.post("/gallery", mid.requiresLogin, controllers.ScrapeGallery.make);
    //app.get("/list", mid.requiresLogin, controllers.ScrapeList.makerPage);
    //app.post("/list", mid.requiresLogin, controllers.ScrapeList.make);
    //app.get("/thumb", mid.requiresLogin, controllers.ScrapeThumb.makerPage);
    //app.post("/thumb", mid.requiresLogin, controllers.ScrapeThumb.make);
    app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router; 