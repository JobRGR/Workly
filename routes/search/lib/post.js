var Search = require('./search').searchModel;

exports.post = function(req, res, next) {
    var keyObj = {
        inString: [ 'authorName','job','city', 'tags'],
        inObj: [],
        type: "post"
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
    };
};