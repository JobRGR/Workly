var User = require('../../../../models/user').User;
var Company = require('../../../../models/company').Company;

exports.get = function(req, res, next) {
    User.remove({},function(err) {
        if (err) return res.send(err);

        Company.find({}, function(err,companies){
            companies.forEach(function(company){
                company.subscribe = [null];
                company.save();
            });
        });

        var obj = {
            "message":"ok",
            "action":"drop users"
        };

        return res.send(obj);
    });
}