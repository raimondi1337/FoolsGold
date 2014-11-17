var mongoose = require('mongoose');
var _ = require('underscore');

var ScrapeResultModel;

var setURL = function(url) {
    return _.escape(url).trim();
};

var ScrapeResultSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
        set: setURL
    },

    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Scrape'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

ScrapeResultSchema.methods.toAPI = function() {
    return {
        url: this.url,
    };
};

ScrapeResultSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return ScrapeResultModel.find(search).select("url").exec(callback);
};


ScrapeResultModel = mongoose.model('ScrapeScrape', ScrapeResultSchema);


module.exports.ScrapeModel = ScrapeResultModel;
module.exports.ScrapeSchema = ScrapeResultSchema;