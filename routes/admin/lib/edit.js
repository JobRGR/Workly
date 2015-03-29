var Admin = require('../../../models/admin').Admin;

exports.post = function(req, res, next) {
    Admin.edit(req, function (err, admin) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "user": admin,
            "action":"edit admin"
        };

        req.session.admin = admin._id;
        res.send(obj);
    })
}