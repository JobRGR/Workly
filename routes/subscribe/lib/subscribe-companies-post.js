var Company = require('../../../models/company').Company;
var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    var companyId = [];

    Company.find({'_id':{
        $in:req.user.subscribe
    }}, function(err, companies) {
        if (err) return res.send({
            action: "get subscribe companies",
            message: err
        });

        if (!companies) return res.send({
            action: "get subscribe companies",
            message: "Subscribe Companies not found!"
        });

        for (var i = 0; i <= companies.length; i++)
            companyId.push(companies['_id']);

        Post.find({'_id':{
            $in:companyId
        }}, function(posts) {

            return res.send({
                action: "get subscribe companies post",
                message: "ok",
                posts: posts.sort(function (a, b) {
                    return new Date(a.date) > new Date(b.date)
                })
            });
        });
    });
};