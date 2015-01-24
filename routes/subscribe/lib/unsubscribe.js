var Company = require('../../../models/company').Company;

exports.get = function(req, res, next) {
    var user = req.user;
    var id = req.params.id;

    var isSubscribe = user.subscribe.indexOf(id) > -1;
    if(!isSubscribe) return callback(res, "User don't subscribe!")

    user['subscribe'] = concat(id,user['subscribe']);

    user.save(function(err,resUser){
        if(err) return callback(res, err);

        req.session.user = resUser._id;

        Company.findById(id, function(err,company){
            if(err) return callback(res, err);
            if(!company) return res.send({
                action: "unsubscribe to company",
                message: "ok",
                error: "Subscribe Company not found!"
            });

            company.subscribe = concat(resUser['id'],user['subscribe']);

            company.save(function(err,user) {
                if (err) return callback(res, err);
                return callback(res, "ok");
            })
        })
    });

    function concat(val, arr){
        var index = arr.indexOf(val),
            first = arr.slice(0,index),
            second = arr.slice(index+1,arr.length)

        return first.concat(second)
    }

    function callback(res, mes){
        return res.send({
            action: "unsubscribe to company",
            message: mes
        })
    }
}