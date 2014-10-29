var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name) {
    return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        set: setName
    },
    
    age: {
        type: Number,
        min: 0,
        required: true
    },
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

DomoSchema.methods.toAPI = function() {
    return {
        name: this.name,
        age: this.age
    };
};

DomoSchema.statics.findByName = function(name, callback) {

    var search = {
        name: name
    };

    return DomoModel.findOne(search, callback);
};


DomoModel = mongoose.model('Domo', DomoSchema);


module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;