var Company = require('../models/company').Company;

module.exports = function(req, res, next) {
    req.company = res.locals.company = null;

    if (!req.session.company) return next();

    Company.findById(req.session.company, function(err, company) {
        if (err) return next(err);

        req.company = res.locals.company = company;
        next();
    });
};