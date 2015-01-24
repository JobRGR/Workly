var async = require("async");

var Company = require('../../../models/company').Company;
var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    Company.find({}, function (err, companies) {
        var message = {
            action: "get companies"
        };

        if(err){
            message.message = err.message ? err.message : err;
            return res.send(message);
        };

        if(!companies){
            message.message = "Companies not found!";
            return res.send(message);
        };

        message.message = "ok";
        message.companies = companies;


        return res.send(message);
    });
};