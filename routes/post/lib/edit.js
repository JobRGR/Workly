var Post = require('../../../models/post').Post;

exports.post = function(req, res) {
    Post.edit(req, function(err, post){
        var obj = {
            message: err ? err.message : "ok",
            action: "edit post",
            post: post
        };

        return res.send(obj)

    })
};