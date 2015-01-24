var async = require('async');

var User = require('../../../../models/user').User;
var Company = require('../../../../models/company').Company;

exports.authModel = function(mail, password, next) {

    async.parallel({
            company: function(callback) {
                Company.authorize(mail, password, callback);
            },
            user: function(callback){
                User.authorize(mail, password, callback);
            }
        },
        function(err, results) {

            if(!results.user.message) var obj = {type:"user", message: "ok", user: results.user};
            else if(!results.company.message) var obj = {type:"company", message: "ok", company: results.company};
            else {
                var error = {};
                error.message = results.user.message;
                return next(error, null)
            }

            next(null, obj)
        });
}
