var async = require('async');
var Company = require('../../../../models/company').Company;

exports.post = function(req, res, next) {
    var id = req.params.id
      , password = req.body.password;

    Company.changePassword(id, password, function(err, company){
        var message = {
            action: "change password company"
        };

        if(err){
            message.message = err;
        } else {
            message.message = "ok";
            delete company.hashedPassword;
            delete company.salt;
            message.company = company;
        }
        return res.send(message);
    })
};