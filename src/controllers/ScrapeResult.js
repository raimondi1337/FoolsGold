var _ = require('underscore');
var models = require('../models');

var ScrapeResult = models.ScrapeResult;

var makerPage = function(req, res) {
    
    ScrapeResult.ScrapeResultModel.findByOwner(model.Scrape._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('app', {scraperesults: docs});
    });
};

var makeScrapeResult = function(req, res) {

    if(!req.body.result) {
        return res.status(400).json({error: "Result are required"});
    }
    
    var scrapeResultData = {
        url: req.body.url,
        owner: models.Scrape._id
    };
    
    var newScrapeResult = new ScrapeResult.ScrapeResultModel(scrapeResultData);
    
    newScrapeResult.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/maker'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeScrapeResult;