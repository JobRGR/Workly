var crypto = require('crypto');
var async = require('async');
var util = require('util');
var fs = require('fs');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    mail: {
        type: String,
        unique: true,
        required: true,
        default: " "
    },
    position:{
        type: String,
        required: false
    },
    firstname:{
        type: String,
        required: true,
        default: " "
    },
    secondname:{
        type: String,
        required: true,
        default: " "
    },
    dob:{
        type: Date,
        required: false
    },
    city:{
        type: String,
        required: false
    },
    tel:{
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    skills: {
        type: String,
        required: false
    },
    work:[{
        job: {type: String, required: false},
        company: {type: String, required: false},
        start: {type: String, required: false},
        end: {type: String, required: false},
        description: {type: String, required: false}
    }],
    study:[{
        university: {type: String, required: false},
        direction: {type: String, required: false},
        start: {type: String, required: false},
        end: {type: String, required: false},
        degree: {type: String, required: false}
    }],
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    subscribe: {
        type: Array,
        required: true
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
    var User = this;

    async.waterfall([
        function(callback) {
            User.findOne({mail: mail}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(null,new AuthError("Wrong Password"));
                }
            } else {
                callback(null,new AuthError("Wrong mail"));
            }
        }
    ], callback);
};

schema.statics.password = function(req, callback) {
    var user = req.user;
    var password = req.body.password;

    user.hashedPassword = user.encryptPassword(password);

    user.save(function(err) {
        if (err) return callback(err);
        callback(null, user);
    });
};

schema.statics.changePassword = function(id, password, callback) {
    var User = this;
    User.findById(id, function(err, user){
        if(err) return callback(err);
        user.hashedPassword = user.encryptPassword(password);
        user.save(function(err) {
            if (err) return callback(err);
            callback(null, user);
        });
    });
};

schema.statics.edit =  function(req, callback) {
    if(!req.user) return callback(new AuthError("User is not Authorized"));
    var editUser = req.body;
    var user = req.user;

    for(var k in editUser)
        user[k] = editUser[k];

    user.save(function(err) {
        if (err) return callback(err);
        callback(null, user);
    });
};

schema.statics.registration = function(req, callback) {
    var password = req.body.password;
    var firstname = req.body.firstname;
    var secondname = req.body.secondname;
    var mail = req.body.mail;

    var User = this;

    var user = new User({
        password: password,
        firstname: firstname,
        secondname: secondname,
        mail: mail,
        subscribe: [null]
    });

    user.save(function(err) {
        if (err) return callback(err);
        callback(null, user);
    });
};

schema.statics.create = function(req, callback) {
    var necessary = req.body.necessary;
    var other = req.body.other;
    var User = this;

    var user = new User({
        password: necessary.password,
        firstname: necessary.firstname,
        secondname: necessary.secondname,
        mail: necessary.mail,
        subscribe: [null]
    });

    for(var k in other)
        user[k] = other[k];

    user.save(function(err) {
        if (err) return callback(err);
        callback(null, user);
    });
};

exports.User = mongoose.model('User', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
