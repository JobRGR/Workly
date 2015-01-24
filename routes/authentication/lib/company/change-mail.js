var async = require('async');
var getModel = require('../middleware/getModel').getModel;


exports.post = function(req, res, next) {
    var mail = req.body.mail;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        if(!err){
            var message = {
                "action":"change mail company",
                "message": "Mail is already used"
            };

            return res.send(message);
        }

        var company = req.company;
        company.mail = mail;

        req.session.company = company._id;

        var obj = {
            "message":"ok",
            "action":"change mail company"
        };

        company.save(function(err) {
            if (err) obj.message = err
            else obj.company = company;

            return res.send(obj);
        });

    })
};