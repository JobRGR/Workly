var User = require('../../../../models/user').User;

exports.post = function(req, res, next) {
    User.password(req, function (err, user) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "action":"change user password"
        };

        req.session.user = user._id;

        user.save(function(err) {
            if (err) obj.message = err
            else obj.user = user;

            return res.send(obj);
        });
    })
}