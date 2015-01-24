var async = require('async');

var User = require('../../../../models/user').User;
var Company = require('../../../../models/company').Company;

exports.getModel = function(mail, next) {

    async.parallel({
            company: function(callback) {
                Company.findOne({mail: mail}, callback);
            },
            user: function(callback){
                User.findOne({mail: mail}, callback);
            }
        },
        function(err, results) {

            if(results.user) var obj = {type:"user", message: "ok", user: results.user};
            else if(results.company) var obj = {type:"company", message: "ok", company: results.company};
            else return next({
                    message: "No models find"
                }, null)

            next(null, obj)
        });
}
