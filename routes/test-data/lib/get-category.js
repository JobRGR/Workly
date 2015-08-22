var fs = require('fs');

exports.get = function(req, res, next) {
  var filePath = __dirname+'/../../../public/test-data/index.json'
    , exist = fs.existsSync(filePath)
    , file = exist ? fs.readFileSync(filePath) : null
    , text= file ? file.toString() : '{"category": []}';

  return res.send({'json': text})
};