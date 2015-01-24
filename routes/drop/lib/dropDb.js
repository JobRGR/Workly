var mongoose = require('mongoose');

exports.get = function(req, res, next) {
    mongoose.connection.db.dropDatabase(function(err){
        if(err) return res.send({
            action: "drop database",
            message: err
        })

        return res.send({
            action: "drop database",
            message: "ok"
        })
    });
}