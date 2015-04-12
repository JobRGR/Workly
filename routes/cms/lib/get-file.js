var fs = require('fs');
exports.post = function(req, res, next) {
    var filePath = __dirname+'/../../../public/json/texts/'+req.body.filename
      , file = fs.readFileSync(filePath)
      , text= file.toString();

    //fs.readFile(filePath,'utf8', function(err, data){
    //    return res.send({'json': data})
    //})

    return res.send({'json': text})
};