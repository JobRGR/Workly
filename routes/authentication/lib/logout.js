exports.post = function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) return next(err);

        var obj = {
            "message": "ok",
            "action":"log-out"
        };

        return res.send(obj);
    });
};