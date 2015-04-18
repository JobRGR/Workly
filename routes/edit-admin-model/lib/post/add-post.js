var async = require('async');
var Post = require('../../../../models/post').Post;

exports.post = function(req, res, next) {
  var necessary = req.body.necessary
    , data = {body:{}};

  for(var k in necessary)
    data.body[k] = necessary[k]

  if(!req.company) return res.send({
    message: 'Permission denied. Not authorized by company.',
    action: 'create post'
  });

  Post.create(data, function(err, post){
    if(err) return send(res, err.message, null);
    else return send(res,'ok', post);

    function send(res, mes, post){
      var obj = {
        message: mes,
        action: 'create post'
      };
      if(mes == 'ok') obj.post = post;
      return res.send(obj);
    }
  })
};