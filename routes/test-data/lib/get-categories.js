var fs = require('fs');

exports.get = function(req, res, next) {
  var filePath = __dirname+'/../../../public/test-data/tests/'
    , data = []
  fs.readdir(filePath, function(err,files) {
    if (err) res.send(err)
    files.forEach(function(file) {
      file = fs.readFileSync(filePath)
      data.push(JSON.parse(file))
    })
    return res.send({'tests': data})
  })
};