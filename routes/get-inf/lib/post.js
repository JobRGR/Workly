var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    var id = req.params.id;

    Post.findById(id, function(err, post){
        if(err) return res.send({
            message: err,
            action: 'get post info'
        });

        if(!post) return res.send({
            message: "Post not found!",
            action: 'get post info'
        });

        var userId,
            isRespond = false,
            isUser = req.user ? true : false;

        if(isUser) {
            userId = req.user['id'];
            isRespond = post.responders.indexOf(userId) > -1;
        }

        delete post._doc.responders;
        delete post._doc.users;

        return res.send({
            post: post,
            user: isUser,
            respond: isRespond,
            message: 'ok',
            action: 'get post info'
        })
    })
}