var _ = require('underscore');
var models = require('../models');

var Scrape = models.Scrape;

var makerPage = function(req, res) {
    
    Scrape.ScrapeModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {scrapes: docs});
    });
};

var makeScrape = function(req, res) {

    if(!req.body.name || !req.body.age) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }
    
    var ScrapeData = {
        url: req.body.url,
        query: req.body.query,
        results: ['result 1','result 2'],
        owner: req.session.account._id
    };
    
    var newScrape = new Scrape.ScrapeModel(scrapeData);
    
    newScrape.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeScrape;