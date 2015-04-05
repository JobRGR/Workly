var Company = require('../../../../models/company').Company;

exports.post = function(req, res) {
    var id = req.params.id;
    var editCompany = req.body;
    var isNotEdit = ['mail','password','companyName'];

    Company.findById(id, function(err, company){
        if(err) return res.send(err);

        for(var k in editCompany)
            if(!(isNotEdit.indexOf(k) > -1))
                company[k] = editCompany[k];

        company.save(function(err) {
            delete company.hashedPassword;
            delete company.salt;
            var obj = {
                message: err ? err.message : "ok",
                action: "edit company",
                company: company
            };
            return res.send(obj);
        });
    })
};