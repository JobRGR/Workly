var Company = require('../../../models/company').Company;

exports.get = function(req, res, next) {
    var user = req.user;
    var id = req.params.id;

    var isSubscribe = user.subscribe.indexOf(id) > -1
    if(isSubscribe) return callback(res, "User already subscribe!")

    Company.findById(id, function(err,company){
        if(err) return callback(res, err);
        if(!company) return callback(res, "Company not found!");

        user['subscribe'].push(id);

        user.save(function(err,resUser){
            if(err) return callback(res, err);
            req.session.user = resUser._id;

            company.subscribe.push(resUser['id']);
            company.save(function(err,user) {
                if (err) return callback(res, err);
                return callback(res, "ok");
            })
        })
    });

    function callback(res, mes){
        return res.send({
            action: "subscribe to company",
            message: mes
        })
    }
}