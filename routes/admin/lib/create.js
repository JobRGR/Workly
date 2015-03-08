var Admin = require('../../../models/admin').Admin;

exports.post = function(req, res, next) {
  Admin.registration(req,function(err, admin){
    var message = {
      message: "ok",
      action: "create admin"
    };

    if(err) {
      message.message = err.message;
      return res.send(message);
    }
    message.admin = admin;
    return res.send(message);
  });
};