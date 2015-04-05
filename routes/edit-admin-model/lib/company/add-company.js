var async = require('async');

var Company = require('../../../../models/company').Company;
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
        "action":"create company",
        "message": "Mail is already used"
      };

      return res.send(message);
    }

    Company.create(req, function (err, company) {
      if (err) return res.send(err);

      var obj = {
        "message":"ok",
        "user":company,
        "action":"create company"
      };

      return res.send(obj);
    })
  })
};