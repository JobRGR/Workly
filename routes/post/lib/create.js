var Post = require('../../../models/post').Post;

exports.post = function(req, res) {
    Post.create(req, function(err, post){
        if(err) return send(res, err.message, null);
        else return send(res,"ok", post);

        function send(res, mes, post){
            var obj = {
                message: mes,
                action: "create post"
            };
            if(mes == "ok") obj.post = post;
            return res.send(obj);
        }
    })
};