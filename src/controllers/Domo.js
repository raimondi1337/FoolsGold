var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res) {
    res.render('app');
};

var makeDomo = function(req, res) {

};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;