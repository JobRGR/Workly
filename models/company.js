var crypto = require('crypto');
var async = require('async');
var util = require('util');
var fs = require('fs');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var User = require('./user').User;

var schema = new Schema({
    companyName: {
        type: String,
        required: true,
        default: " "
    },
    mail:{
        type: String,
        unique: true,
        required: true,
        default: " "
    },
    img: {
        type: String,
        required: false
    },
    contacts:{
        type: String,
        required: false
    },
    tel:{
        type: String,
        required: false
    },
    website:{
        type: String,
        required: false
    },
    about:{
        type: String,
        required: false
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    subscribe: {
        type: Array,
        required: true,
        default: [null]
    },
    vacancies: {
        type: Array,
        default: []
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(mail, password, callback) {
    var Company = this;

    async.waterfall([
        function(callback) {
            Company.findOne({mail: mail}, callback);
        },
        function(company, callback) {
            if (company) {
                if (company.checkPassword(password)) {
                    callback(null, company);
                } else {
                    callback(null,new AuthError("Wrong Password"));
                }
            } else {
                callback(null,new AuthError("Wrong name"));
            }
        }
    ], callback);
};

schema.statics.registration = function(req, callback) {
    var companyName = req.body.companyName;
    var password = req.body.password;
    var mail = req.body.mail;

    var Company = this;

    Company.findOne({'companyName': companyName},function(err, isFind){
       if(isFind) return callback(new AuthError("Company with such name is Sign-Up"));

        var company = new Company({
            companyName: companyName,
            password: password,
            mail: mail
        });

        company.save(function(err) {
            if (err) return callback(err);
            callback(null, company);
        });
    });
};


schema.statics.create = function(req, callback) {
    var necessary = req.body.necessary;
    var other = req.body.other;

    var Company = this;

    Company.findOne({'companyName': necessary.companyName},function(err, isFind){
        if(isFind) return callback(new AuthError("Company with such name is Sign-Up"));

        var company = new Company({
            companyName: necessary.companyName,
            password: necessary.password,
            mail: necessary.mail
        });

        for(var k in other)
            company[k] = other[k];

        company.save(function(err) {
            if (err) return callback(err);
            callback(null, company);
        });
    });
};

schema.statics.password = function(req, callback) {
    var company = req.company;
    var password = req.body.password;

    company.hashedPassword = company.encryptPassword(password);

    company.save(function(err) {
        if (err) return callback(err);
        callback(null, company);
    });
};

schema.statics.changePassword = function(id, password, callback) {
    var Company = this;

    Company.findById(id, function(err, company){
        if(err) return callback(err);
        company.hashedPassword = company.encryptPassword(password);
        company.save(function(err) {
            if (err) return callback(err);
            callback(null, company);
        });
    });
};

schema.statics.edit =  function(req, callback) {
    if(!req.company) return callback(new AuthError("Company is not Authorized"));
    var editCompany = req.body;
    var company = req.company;

    for(var k in editCompany)
        company[k] = editCompany[k];

    company.save(function(err) {
        if (err) return callback(err);
        callback(null, company);
    });
};


exports.Company = mongoose.model('Company', schema);


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;