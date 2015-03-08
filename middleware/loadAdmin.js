var Admin = require('../models/admin').Admin;

module.exports = function(req, res, next) {
    req.admin = res.locals.admin = null;

    if (!req.session.admin) return next();

    Admin.findById(req.session.admin, function(err, admin) {
        if (err) return next(err);

        req.admin = res.locals.admin = admin;
        next();
    });
};