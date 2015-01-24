var async = require('async');
var getModel = require('../middleware/getModel').getModel;


exports.post = function(req, res, next) {
    var mail = req.body.mail;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        if(!err){
            var message = {
                "action":"change mail user",
                "message": "Mail is already used"
            };

            return res.send(message);
        }

        var user = req.user;
        user['mail'] = mail;



        req.session.user = user._id;

        var obj = {
            "message":"ok",
            "action":"change mail user"
        };

        user.save(function(err) {
            if (err) obj.message = err;
            else obj.user = user;

            return res.send(obj);
        });

    })
};