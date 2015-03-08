exports.post = function(req, res, next) {
    if(req.user) var user = req.user;
    else if(req.company) var company = req.company;

    req.session.destroy(function(err) {
        if (err) return next(err);

        var obj = {
            "message": "ok",
            "action":"log-out"
        };

        return res.send(obj);
    });
};