var Post = require('../../../models/post').Post;

exports.get = function(req, res) {
    Post.findById(req.params.id).remove(function(err) {
        if (err) return res.send(err);
        var obj = {
            "message":"ok",
            "action":"remove post"
        };

        return res.send(obj);
    });
};