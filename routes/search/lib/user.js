var Search = require('./search').searchModel;

exports.post = function(req, res, next) {
    var keyObj = {
        inString: [ 'city','firstname','secondname', 'skills','position'],
        inObj: [{
            field: 'work',
            option: 'job'
        },{
            field: 'work',
            option: 'company'
        },{
            field: 'study',
            option: 'university'
        },{
            field: 'study',
            option: 'direction'
        }],
        type: "user"
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