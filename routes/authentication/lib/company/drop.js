var Company = require('../../../../models/company').Company;
var User= require('../../../../models/user').User;
var Post = require('../../../../models/post').Post;

exports.get = function(req, res, next) {
    Company.remove({},function(err) {
        if (err) return res.send(err);

        User.find({},function(err, users){
            users.forEach(function(user){
                user.subscribe = [null];
                user.save();
            });
        });

        Post.find({}).remove(function(){
            if (err) return res.send(err);

            var obj = {
                "message":"ok",
                "action":"drop companies"
            };

            return res.send(obj);
        })
    });
}
