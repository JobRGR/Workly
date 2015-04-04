var User = require('../../../models/user').User;

exports.get = function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
        var message = {
            action: "get user info"
        };

        if(err){
            message.message = err.message ? err.message : err;
            return res.send(message);
        };

        if(!user){
            message.message = "User not found!";
            return res.send(message);
        }

        message.message = "ok";
        delete user.hashedPassword;
        delete user.salt;
        message.user = user;

        return res.send(message);
    })
}