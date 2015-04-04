var async = require('async');
var getModel = require('../../authentication/lib/middleware/getModel').getModel;
var User = require('../../../models/user').User;

exports.post = function(req, res, next) {
    var mail = req.body.mail;
    var id = req.params.id;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        var message = {
            action: "change mail user"
        };

        if(!err){
            message.message =  "Mail is already used";
            return res.send(message);
        }

        User.findById(id, function (err, user) {
            if(err){
                message.message = err.message ? err.message : err;
                return res.send(message);
            }

            user['mail'] = mail;
            user.save(function(err) {
                if (err) {
                    message.message = err.message ? err.message : err;
                    return res.send(message);
                }
                message.message = "ok";
                message.user = user;
                return res.send(message);
            });
        });
    });
};