var User = require('../../../models/user').User;

exports.get = function(req, res, next) {
    User.find({}, function (err, users) {
        var message = {
            action: "get users"
        };

        if(err){
            message.message = err.message ? err.message : err;
            return res.send(message);
        };

        if(!users){
            message.message = "Users not found!";
            return res.send(message);
        };

        message.message = "ok";
        message.users = users;

        return res.send(message);
    })
}