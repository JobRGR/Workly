var async = require('async');
var getModel = require('../../authentication/lib/middleware/getModel').getModel;
var Company = require('../../../models/company').Company;

exports.post = function(req, res, next) {
    var mail = req.body.mail;
    var id = req.params.id;

    async.waterfall([
        function(callback){
            getModel(mail, callback)
        }
    ], function (err, result) {
        var message = {
            action: "change mail company"
        };

        if(!err){
            message.message =  "Mail is already used";
            return res.send(message);
        }

        Company.findById(id, function (err, company) {
            if(err){
                message.message = err.message ? err.message : err;
                return res.send(message);
            }

            company['mail'] = mail;
            company.save(function(err) {
                if (err) {
                    message.message = err.message ? err.message : err;
                    return res.send(message);
                }
                message.message = "ok";
                message.company = company;
                return res.send(message);
            });
        });
    });
};