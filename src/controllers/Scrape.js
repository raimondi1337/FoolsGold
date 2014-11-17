var _ = require('underscore');
var models = require('../models');

var Scrape = models.Scrape;

var makerPage = function(req, res) {
    var data;
    
    Scrape.ScrapeModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        data.scrapes=docs;
    });

    ScrapeResult.ScrapeResultModel.findByOwner(req.session.account._id, function(err, docs) {

        if(err) {
            console.log(err);
            return res.status(400).json({error:'An error occurred'}); 
        }

        data.results=docs;
    });

    res.render('app', data);
};

//create a data object
var make = function(req, res) {
    var data;
    
    //if the controller is sent url and query, make a scrape model
    if(req.body.url && req.body.query){
        data = {
            url: req.body.url,
            query: req.body.query,
            owner: req.session.account._id
        };

        var newScrape = new Scrape.ScrapeModel(data);

        newScrape.save(function(err) {
            if(err) {
                console.log(err);
                return res.status(400).json({error:'An error occurred'}); 
            }

            res.json({redirect: '/maker'});
        });

    //if the controller is sent result, make a scrapeResult model
    } else /*if(req.body.result){
        data = {
            result: req.body.result;
        };

        var newScrapeResult = new ScrapeResult.ScrapeResultModel(data);

            newScrapeResult.save(function(err) {
                if(err) {
                    console.log(err);
                    return res.status(400).json({error:'An error occurred'}); 
                }

                res.json({redirect: '/maker'});
            });

    //if the controller is sent anything else, blow up
    } else */{
        return res.status(400).json({error: "Bad data sent"});
    }    
};

module.exports.makerPage = makerPage;
module.exports.make = make;