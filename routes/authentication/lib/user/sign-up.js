var async = require('async');

var User = require('../../../../models/user').User;
var getModel = require('../middleware/getModel').getModel;


exports.post = function(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        if(!err){
            var message = {
                "action":"sign-up user",
                "message": "Mail is already used"
            };

            return res.send(message);
        }

        User.registration(req, function (err, user) {
            if (err) return res.send(err);

            req.session.user = user._id;

            var obj = {
                "message":"ok",
                "user":user,
                "action":"sign-up user"
            };

            return res.send(obj);
        })
    })
};