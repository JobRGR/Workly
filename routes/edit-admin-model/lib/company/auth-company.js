var Company = require('../../../../models/company').Company;

exports.get = function(req, res, next) {
  var id = req.params.id;

  Company.findById(id, function(err, company) {
    if (err) return res.send(err);

    delete company.hashedPassword;
    delete company.salt;
    req.session.company = company._id;
    var obj = {
      message: "ok",
      action: "auth company",
      company: company
    };
    return res.send(obj);

  })
};