var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    Post.remove({},function(err) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "action":"drop posts"
        };

        return res.send(obj);
    });
}