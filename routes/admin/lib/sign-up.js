var Admin = require('../../../models/admin').Admin;

exports.post = function(req, res, next) {
    var key = req.body.key
      , isKey = key == "1234567";

    if(!isKey) return res.send({
        message: "Error Key",
        action: "sign up admin"
    });

    Admin.registration(req,function(err, admin){
        var message = {
            message: "ok",
            action: "sign up admin"
        };

        if(err) {
            message.message = err.message;
            return res.send(message);
        }
        message.admin = admin;
        req.session.admin = admin._id;
        return res.send(message);
    });
};