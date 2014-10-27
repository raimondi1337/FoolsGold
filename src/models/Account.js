var mongoose = require('mongoose');

var AccountModel;

var encodePassword = function(pass) {

};

var AccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[A-Za-z0-9_\-\.]{1,16}$/
    },
    
    password: {
        type: String,
        required: true,
        set: encodePassword
    },
    
    createdData: {
        type: Date,
        default: Date.now
    }

});

AccountSchema.methods.toAPI = function() {
    return {
        username: this.username,
    };
};

AccountSchema.methods.validatePassword = function(password, callback) {
    
};

AccountSchema.statics.findByUsername = function(name, callback) {

    var search = {
        username: name
    };

    return AccountModel.findOne(search, callback);
};

AccountSchema.statics.authenticate = function(username, password, callback) {

};

AccountModel = mongoose.model('Account', AccountSchema);


module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;