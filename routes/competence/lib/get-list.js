var fs = require('fs');

exports.get = function(req, res, next) {
  var filePath = __dirname+'/../../../public/competence/index.json'
    , exist = fs.existsSync(filePath)
    , file = exist ? fs.readFileSync(filePath) : null
    , text= file ? file.toString() : '{"list": []}';

  return res.send({'json': text})
};