var Post = require('../../../models/post').Post;

exports.get = function(req, res, next) {
  Post.find({'authorId':req.company._id}, function(err, posts) {
    if (err) return res.send({
      action: "get my posts",
      message: err
    });

    if (!posts) return res.send({
      action: "get my posts",
      message: "My Posts not found!"
    });

    return res.send({
      action: "get my posts",
      message: "ok",
      posts: posts.reverse()
    });
  });
};