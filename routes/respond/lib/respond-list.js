var Post = require('../../../models/post').Post;
var User = require('../../../models/user').User;

exports.get = function(req, res, next) {
    var id = req.params.id;
    var companyId = req.company['id'];

    Post.findById(id,function(err,post){
        if(err) return res.send({
            action: "respond post list",
            message: err
        });

        if(!post) return res.send({
            action: "respond post",
            message: "Respond Post not found!"
        });

        var isAuthor = post.authorId == companyId;
        if(!isAuthor) return res.send({
            action: "respond post",
            message: "Permission deny, not your post!"
        });

        callback(post);
    });

    function callback(post){
        var responders = post.responders.filter(function(user){
            return isUser = user ? true : false;
        });

        User.find({'_id':{
            '$in': responders
        }},function(err,users){
            if(err) return res.send({
                action: "respond post list",
                message: err
            });

            if(!users) return res.send({
                action: "respond post list",
                message: "Respond users not found!"
            });

            var list = post.users
                .filter(function(respondUser){
                    return isUser = respondUser ? true : false
                })
                .map(function(respondUser){
                    var id = respondUser.id;
                    var user = users.filter(function(curUser){
                        return curUser['id'] == id
                    });
                    respondUser._doc.user = user[0];
                    return respondUser;
                })
                .filter(function(user){
                    return isUser = user._doc.user ? true : false
                })
                .sort(function(curUser,nextUser){
                    return curUser.result < nextUser.result
                });


            return res.send({
                action: "respond post list",
                message: "ok",
                list: list
            });
        });
    }
};