var User = require('../../../../models/user').User;

exports.get = function(req, res, next) {
  var id = req.params.id;

  User.findById(id, function(err, user) {
    if (err) return res.send(err);

    delete user.hashedPassword;
    delete user.salt;
    req.session.user = user._id;
    var obj = {
      message: "ok",
      action: "auth user",
      user: user
    };
    return res.send(obj);

  })
};