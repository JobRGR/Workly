var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
    Post.find({}, function (err, posts) {
        var message = {
            action: "get posts"
        };

        if(err){
            message.message = err.message ? err.message : err;
            return res.send(message);
        };

        if(!posts){
            message.message = "Posts not found!";
            return res.send(message);
        };

        posts = posts.reverse()

        posts.forEach(function(post){
            post.openQuestion.forEach(function(q){
                delete q.correct;
            });

            post.testQuestion.forEach(function(q){
                delete q.correct;
            });
        });

        message.message = "ok";
        message.posts = posts.map(function(post){
            delete post._doc.responders;
            delete post._doc.users;
            return post;
        });

        return res.send(message);
    })
}