var Post = require('../../../models/post').Post;
var User = require('../../../models/user').User;

exports.post = function(req, res, next) {
    var postId = req.body.postId;
    var userId = req.body.userId;
    var companyId = req.company['id'];

    Post.findById(postId,function(err,post){
        if(err) return res.send({
            action: "respond post user",
            message: err
        });

        if(!post) return res.send({
            action: "respond user",
            message: "Respond Post not found!"
        });

        var isAuthor = post.authorId == companyId;
        if(!isAuthor) return res.send({
            action: "respond user",
            message: "Permission deny, not your post!"
        });

        var isUser = post.responders.indexOf(userId) > -1;
        if(!isUser) return res.send({
            action: "respond user",
            message: "User is not respond!"
        });

        callback(post);
    });

    function callback(post){
        User.findById(userId,function(err,user){
            if(err) return res.send({
                action: "respond post user",
                message: err
            });

            if(!user) return res.send({
                action: "respond post list",
                message: "Respond users not found!"
            });

            var resUser = post.users
                .filter(function(respondUser){
                    var isUser = respondUser ? true : false;
                    if(!isUser) return false
                    return respondUser.id == userId
                });

            resUser[0]._doc.user = user;

            return res.send({
                action: "respond post list",
                message: "ok",
                user: resUser[0]
            });
        });
    }
};