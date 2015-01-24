var Company = require('../../../../models/company').Company;
var Post = require('../../../../models/post').Post;
var User = require('../../../../models/user').User;

exports.get = function(req, res, next) {
    var id = req.params.id;
    Company.findById(id,function(err,company) {
        if(err) return res.send(err);
        var subscribeUsers = company.subscribe;
        company.remove(function (err) {
            if (err) return res.send(err);

            User.find({
                '_id':{
                    '$in':subscribeUsers
                }
            }, function(err, users) {
                users.forEach(function(user){
                    user.subscribe = user.subscribe.filter(function(val){
                        return val!=id;
                    });

                    user.save();
                });
            });

            Post.find({authorId: id}).remove(function () {
                if (err) return res.send(err);

                var obj = {
                    "message": "ok",
                    "action": "remove company"
                };

                return res.send(obj);
            });
        });
    });
}
