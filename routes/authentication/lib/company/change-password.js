var Company = require('../../../../models/company').Company;

exports.post = function(req, res, next) {
    Company.password(req, function (err, company) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "action":"change company password"
        };

        req.session.company = company._id;

        company.save(function(err) {
            if (err) obj.message = err
            else obj.company = company;

            return res.send(obj);
        });
    })
}