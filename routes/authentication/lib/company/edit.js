var Company = require('../../../../models/company').Company;

exports.post = function(req, res, next) {
    Company.edit(req, callback);
    function callback(err, company) {
        if (err) return res.send(err)
        var obj = {
            "message":"ok",
            "company":company,
            "action":"edit company"
        };

        req.session.company = company._id;
        return res.send(obj);
    }
}