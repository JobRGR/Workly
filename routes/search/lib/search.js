var User = require('../../../models/user').User;
var Post = require('../../../models/post').Post;
var Company = require('../../../models/company').Company;

var async = require('async');

exports.searchModel = function(keyObj,req, next) {
    var keyArray = keyObj.inString;
    var typeOfSearch = keyObj.type;
    var keyObjArray = keyObj.inObj;

    var query = req.body.query.toLowerCase();
    var words = query.split(" ");
    var regex = words.map(function(word){
        return new RegExp(['.*', word, '.*'].join(''), 'i');
    });

    var searchReq = keyObjArray.map(function(key){
        var obj = {};
        var field = key.field;
        var option = key.option;

        obj[field] = {};
        obj[field]['$elemMatch'] = {};
        obj[field]['$elemMatch'][option] = {
            '$in':regex
        };

        return obj;
    });
    var searchArray = keyArray.map(function(key){
        var obj = {};
        obj[key] = {
            '$in':regex
        };
        return obj;
    });
    searchArray = searchArray.concat(searchReq);

    var Models = {
        user: User,
        company: Company,
        post: Post
    };

    Models[typeOfSearch].find()
        .or(searchArray)
        .exec(function(err, items){
            if(err) return next(err,null);
            sortItems(items,keyArray,regex);
        });

    function sortItems(items,keyArray,regex){
        async.waterfall([
            function(callback) {
                items.sort(function (curItem, nextItem) {
                    var curStatus = keyArray.filter(function (key) {
                        return regex.some(function (reg) {
                            return reg.test(curItem[key])
                        });
                    });
                    var nextStatus = keyArray.filter(function (key) {
                        return regex.some(function (reg) {
                            return reg.test(nextItem[key])
                        });
                    });

                    return curStatus.length < nextStatus.length;
                });

                callback(null,items)
            }],next);
    }
};