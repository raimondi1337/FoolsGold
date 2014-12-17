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

function doScrape(link, query, callback){
    var x = [];
    //download the page at the url link
    request(link, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            //get all of the links on the page that contain the query
            $("a:contains(query)").each(function(){
                var t = $(this).text();
                var a = $(this).attr('href');
                //itemize the link and the text associated with it
                var item={url: a, text: t};
                console.log('testing from here');
                console.log(item);
                x.push(item);
            });

            console.log('testing from here');
            console.log(response);
            console.log(x);
            return callback(x);
        }
    });
}

var makeScrape = function(req, res) {
    if(!req.body.url || !req.body.query) {
        return res.status(400).json({error: "Both URL and Query are required"});
    }

    doScrape(req.body.url, req.body.query, function(currentResults){
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
    });
    
};

module.exports.makerPage = makerPage;
module.exports.make = makeScrape;