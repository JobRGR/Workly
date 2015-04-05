var async = require('async');

var User = require('../../../../models/user').User;
var getModel = require('../../../authentication/lib/middleware/getModel').getModel;


exports.post = function(req, res, next) {
  var mail = req.body.necessary.mail;
  var password = req.body.necessary.password;

  async.waterfall([
    function(callback){
      getModel(mail, callback)
    }
  ], function (err, result) {
    if(!err){
      var message = {
        "action":"create user",
        "message": "Mail is already used"
      };

      return res.send(message);
    }

    User.create(req, function (err, user) {
      if (err) return res.send(err);

      var obj = {
        "message":"ok",
        "user":user,
        "action":"create user"
      };

      return res.send(obj);
    })
  })
};