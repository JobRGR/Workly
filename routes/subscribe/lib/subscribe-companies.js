var Company = require('../../../models/company').Company;

exports.get = function(req, res, next) {
    Company.find({'_id':{
        $in:req.user.subscribe
    }}, function(err, companies) {
        if (err) return res.send({
            action: "get subscribe companies",
            message: err
        });

        if (!companies) return res.send({
            action: "get subscribe companies",
            message: "Subscribe Companies not found!"
        });

        return res.send({
            action: "get subscribe companies",
            message: "ok",
            companies: companies
        });
    });
};