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

function getTestResults(u, q){
    var x = [];
    request(u, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            console.log('zxcvbnm');
            var tRes= $("a:contains(q)").each(function(){
                var t = $(this).text();
                var a = $(this).attr('href');
                var item={url: a, text: t};
                x.push(item);
            });
        }
    });

    return x;
}

var makeScrape = function(req, res) {
    if(!req.body.url || !req.body.query) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }

    var testResults = getTestResults(req.body.url, req.body.query);
    
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