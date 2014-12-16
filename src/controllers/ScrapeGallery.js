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

function getTestResults(){
    console.log('creating array');
    //var x = [];

    console.log('making request');
    request('http://www.miataturbo.net/miata-parts-sale-trade-5/', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log('no error in request, loading html');
            var $ = cheerio.load(html);
            var tRes= $("a:contains('wheels')").each(function(){
                console.log('parsing with cheerio');
                var t = $(this).text());
                var a = $(this).attr('href');
                console.log('creating item');
                var item = {
                    url:a,
                    text:t
                };
                console.log(item);
            });
        }
    });

    return [{url:'http://www.example.com/'},{url:'http://www.example.com/'}];
}

var testResults = getTestResults();

var makeScrape = function(req, res) {
    if(!req.body.url || !req.body.query) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }
    
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