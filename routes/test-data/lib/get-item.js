var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname+'/../../../public/test-data/data/' + req.body.name
    , file = fs.readFileSync(filePath)
    , text= file.toString();

  return res.send({'json': text})
};