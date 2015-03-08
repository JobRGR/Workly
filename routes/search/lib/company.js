    var Search = require('./search').searchModel;

exports.post = function(req, res, next) {
    var keyObj = {
        inString: [ 'companyName','about','contact'],
        inObj: [],
        type: "company"
    };

    Search(keyObj, req, callback);
    function callback(err, companies){
        if(err) return res.send({
            action: 'search companies',
            message: err
        });

        return res.send({
            action: 'search companies',
            message: 'ok',
            companies: companies
        });
    }
};