var fs = require('fs');
exports.get = function(req, res, next) {
    fs.readdir(__dirname+'/../../../public/json/texts/', function(err, list){
        return res.send({'nav': list})
    })
};