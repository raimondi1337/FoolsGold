
var requiresLogin = function(req, res, next) {
    if(!req.session.account) {
        return res.redirect('/');
    }
    
    next();
};

var requiresLogout = function(req, res, next) {

    if(req.session.account) {
        return res.redirect('/maker');
    }

    next();
}

var requiresSecure = function(req, res, next) {

    console.log(req.secure);
    if(!req.secure) {
        console.log("@@@redirecting");
        return res.redirect("https://" + req.host + req.url);
    }
    
    next();
};

var bypassSecure = function(req, res, next) {
    console.log("@@@@bypassing");
    next();
};

if(process.env.NODE_ENV === "production") {
    module.exports.requiresSecure = requiresSecure;
}
else {
    module.exports.requiresSecure = bypassSecure;
}

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;