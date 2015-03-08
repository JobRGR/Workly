var Admin = require('../../../models/admin').Admin;

exports.get = function(req, res, next) {
    Admin.remove({},function(err) {
        if (err) return res.send(err);

        var obj = {
            "message":"ok",
            "action":"drop admin"
        };

        return res.send(obj);
    });
}