var async = require("async");

var Company = require('../../../models/company').Company;
var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    async.waterfall([
        function(callback){
            Post.find({postAuthorId: req.params.id}, callback)
        }
    ], function(err, post){
        Company.findById(req.params.id, function (err, company) {
            var message = {
                action: "get company info"
            };

            if(err){
                message.message = err.message ? err.message : err;
                return res.send(obj);
            }

            if(!company){
                message.message = "Company not found!";
                return res.send(message);
            }

            message.message = "ok";
            delete company.hashedPassword;
            delete company.salt;
            message.company = company;
            message.user = req.user ? true : false;
            message.subscribe = req.user ? company.subscribe.indexOf(req.user['id']) > -1 : false;

            if(post) message.post = post;

            return res.send(message);
        });
    });

}