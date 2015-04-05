var Post = require('../../../../models/post').Post;

exports.post = function(req, res) {
    var id = req.params.id;
    var editPost = req.body;
    var isNotEdit = ['authorId','authorName','users','responders'];

    Post.findById(id, function(err, post){
        if(err) return res.send(err);

        for(var k in editPost)
            if(!(isNotEdit.indexOf(k) > -1))
                post[k] = editPost[k];

        post.save(function(err) {
            var obj = {
                message: err ? err.message : "ok",
                action: "edit post",
                post: post
            };
            return res.send(obj);
        });
    })
};