var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    Post.find({'authorId':{
        $in:req.user.subscribe
    }}, function(err, posts) {
        if (err) return res.send({
            action: "get subscribe posts",
            message: err
        });

        if (!posts) return res.send({
            action: "get subscribe companies",
            message: "Subscribe Posts not found!"
        });

        return res.send({
            action: "get subscribe posts",
            message: "ok",
            posts: posts
        });
    });
};