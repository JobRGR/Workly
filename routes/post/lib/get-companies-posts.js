var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
  Post.find({'authorId':req.params.id}, function(err, posts) {
    if (err) return res.send({
      action: "get companies posts",
      message: err
    });

    if (!posts) return res.send({
      action: "get companies posts",
      message: "Companies Posts not found!"
    });

    return res.send({
      action: "get companies posts",
      message: "ok",
      posts: posts.reverse()
    });
  });
};