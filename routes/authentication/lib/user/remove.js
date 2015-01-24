var User = require('../../../../models/user').User;
var Company = require('../../../../models/company').Company;

exports.get = function(req, res, next) {
    var id = req.params.id;

    User.findById(id,function(err,user){
        if (err) return res.send(err);

        var subscribeCompany = user.subscribe;

        Company.find({
            "_id":{
                "$in":subscribeCompany
            }
        }, function(err, companies){

            companies.forEach(function(company){
                var subscribeUser = company.subscribe;
                company.subscribe = slice(id,subscribeUser);

                company.save();
            });

            user.remove(function (err) {
                if (err) return res.send(err);
                var obj = {
                    "message": "ok",
                    "action": "remove user"
                };

                return res.send(obj);
            });
        });
    });

    function slice(val,arr){
        return arr.filter(function(cur){
            return cur!=val
        })
    }
}