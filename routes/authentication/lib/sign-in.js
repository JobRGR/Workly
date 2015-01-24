var async = require('async');

var authModel = require('./middleware/authModel').authModel;

exports.post = function(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;

    async.waterfall([
        function(callback){
            authModel(mail, password, callback)
        }
    ], function (err, result) {
        var message = {
            "action":"sign-in"
        };
        if(err){
            message.message = err.message;
            return res.send(message);
        }

        var type = result.type;
        message[type] = result[type];
        message['message'] = "ok";

        req.session[type] = result[type]._id;

        return res.send(message);
    });
}