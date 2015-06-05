var crypto = require('crypto');
var async = require('async');
var util = require('util');
var fs = require('fs');
var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  login: {
    type: String,
    required: true,
    default: " "
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
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

schema.statics.authorize = function(login, password, callback) {
  var Admin = this;

  async.waterfall([
    function(callback) {
      Admin.findOne({login: login}, callback);
    },
    function(admin, callback) {
      if (admin) {
        if (admin.checkPassword(password)) {
          callback(null, admin);
        } else {
          callback(new AuthError("Wrong Password"), null);
        }
      } else {
        callback(new AuthError("Wrong name"), null);
      }
    }
  ], callback);
};

schema.statics.registration = function(req, callback) {
  var login = req.body.login;
  var password = req.body.password;

  var Admin = this;

  Admin.findOne({'login': login},function(err, isFind){
    if(isFind) return callback(new AuthError("Admin with such login is Sign-Up"));

    var admin = new Admin({
      login: login,
      password: password
    });

    admin.save(function(err) {
      if (err) return callback(err);
      callback(null, admin);
    });
  });
};


schema.statics.edit =  function(req, callback) {
  var login = req.body.login;
  var password = req.body.password;
  var id = req.params.id;

  var Admin = this;

  Admin.findById(id, function(err, admin){
    admin.login = login;
    admin.hashedPassword = admin.encryptPassword(password);

    admin.save(function(err) {
      if (err) return callback(err);
      callback(null, admin);
    });
  });
};


exports.Admin = mongoose.model('Admin', schema);


function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;