var Company = require('../../../models/company').Company;
var User = require('../../../models/user').User;

exports.get = function(req, res, next) {
    var id = req.params.id;

    Company.findById(id,function(err, company){
        if(err) return callback(err, null);

        if (!company) return res.send({
            action: "get subscribe companies",
            message: "Company not found!"
        });

        var sunscribe = company.subscribe;
        User.find({'_id': {
            '$in':sunscribe
        }}, function(err, users){
            if(err) return callback(err, null);
            return callback(null, users)
        });
    });

    function callback(err, users){
        var obj = {
            action: "get subscribe users",
            message: err ? err : "ok"
        };
        if(!err) obj.users = users;
        return res.send(obj);
    }
}