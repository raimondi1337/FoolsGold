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

function doScrape(link, query){
    var x = [];
    console.log('link = '+link);
    request(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            console.log('query = '+query);
            var tRes= $("a:contains(query)").each(function(){
                var t = $(this).text();
                console.log('t = '+t);
                var a = $(this).attr('href');
                console.log('a = '+a);
                var item={url: a, text: t};
                console.log('item found - '+item);
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

    var currentResults = doScrape(req.body.url, req.body.query);
    console.log('results found: '+currentResults);
    
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