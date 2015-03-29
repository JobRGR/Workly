var Admin = require('../../../models/admin').Admin;

exports.get = function(req, res, next) {
    var id = req.params.id;

    Admin.findById(id,function(err,admin) {
        if (err) return res.send(err);


        admin.remove(function (err) {
            if (err) return res.send(err);
            var obj = {
                "message": "ok",
                "action": "remove admin"
            };

            return res.send(obj);
        });
    });
};