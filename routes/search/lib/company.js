    var Search = require('./search').searchModel;

exports.post = function(req, res, next) {
    var keyObj = {
        inString: [ 'companyName','about','contact'],
        inObj: [],
        type: "company"
    };

    Search(keyObj, req, callback);
    function callback(err, users){
        if(err) return res.send({
            action: 'search users',
            message: err
        });

        return res.send({
            action: 'search users',
            message: 'ok',
            users: users
        });
    }
};