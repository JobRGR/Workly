var async = require('async');

var Company = require('../../../../models/company').Company;

var getModel = require('../middleware/getModel').getModel;

exports.post = function(req, res, next) {
    var mail = req.body.mail;
    var password = req.body.password;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        if (!err) {
            var message = {
                "action": "sign-up company",
                "message": "Mail is already used"
            };

            return res.send(message);
        }

        Company.registration(req, function (err, company) {
            if (err) return res.send(err);
            var obj = {
                "message": "ok",
                "company": company,
                "action": "sign-up company"
            };

            return res.send(obj);
        })
    })
}