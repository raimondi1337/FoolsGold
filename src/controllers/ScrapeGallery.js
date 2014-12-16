var _ = require('underscore');
var request = require('request');
var cheerio = require('cheerio');

var models = require('../models');

var Scrape = models.Scrape;

var makerPage = function(req, res) {
    
    Scrape.ScrapeModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }
        
        res.render('gallery', {scrapes: docs});
    });
};

var makeScrape = function(req, res) {
    if(!req.body.url || !req.body.query) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }

    //initial scrape
    var testURL = 'http://forum.miata.net/vb/forumdisplay.php?f=124';
    var testResults;
    request(testURL, function(error, response, html){
        if(!error){
            testResults = $('a').html();
        }
    });
    
    var scrapeData = {
        url: req.body.url,
        query: req.body.query,
        results: testResults,
        owner: req.session.account._id
    };
    
    var newScrape = new Scrape.ScrapeModel(scrapeData);
    
    newScrape.save(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        res.json({redirect: '/gallery'});
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeScrape;