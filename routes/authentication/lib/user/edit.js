var User = require('../../../../models/user').User;

exports.post = function(req, res, next) {
    User.edit(req, function (err, user) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "user": user,
            "action":"edit user"
        };

        req.session.user = user._id;
        res.send(obj);
    })
}