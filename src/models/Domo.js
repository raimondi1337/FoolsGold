var mongoose = require('mongoose');
var _ = require('underscore');

var ScrapeModel;

var setURL = function(url) {
    return _.escape(url).trim();
};

var ScrapeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
        set: setURL
    },
    
    query: {
        type: String,
        trim: true,
        required: true
    },
    
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

ScrapeSchema.methods.toAPI = function() {
    return {
        url: this.url,
        query: this.query
    };
};

ScrapeSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return DomoModel.find(search).select("url query").exec(callback);
};


scrapeModel = mongoose.model('scrape', ScrapeSchema);


module.exports.ScrapeModel = ScrapeModel;
module.exports.ScrapeSchema = ScrapeSchema;