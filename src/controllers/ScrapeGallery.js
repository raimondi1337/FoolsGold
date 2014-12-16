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

function doScrape(u, q){
    var x = [];
    console.log('x before='+x);
    request(u, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var tRes= $("a:contains(q)").each(function(){
                var t = $(this).text();
                var a = $(this).attr('href');
                var item={url: a, text: t};
                console.log(item);
                x.push(item);
            });
        }
    });
    console.log('x after='+x);
    return x;
}

var makeScrape = function(req, res) {
    if(!req.body.url || !req.body.query) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }

    var currentResults = doScrape(req.body.url, req.body.query);
    console.log('zxcvbnm');
    console.log(currentResults);
    
    var scrapeData = {
        url: req.body.url,
        query: req.body.query,
        results: currentResults,
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