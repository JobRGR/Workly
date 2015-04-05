var async = require('async');
var User = require('../../../../models/user').User;

exports.post = function(req, res, next) {
    var id = req.params.id
      , password = req.body.password;

    User.changePassword(id, password, function(err, user){
        var message = {
            action: "change password user"
        };

        if(err){
            message.message = err;
        } else {
            message.message = "ok";
            delete user.hashedPassword;
            delete user.salt;
            message.company = user;
        }
        return res.send(message);
    })
};