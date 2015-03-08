var async = require('async');

var Admin = require('../../../models/admin').Admin;


exports.post = function(req, res, next) {
    var login = req.body.login;
    var password = req.body.password;

    Admin.authorize(login,password,function(err, admin){
        var message = {
            message: "ok",
            action: "sign in admin"
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