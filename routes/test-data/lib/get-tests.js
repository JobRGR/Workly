var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname + '/../../../public/test-data/tests/' + req.body.filename +' .json'
    , exist = fs.existsSync(filePath)
    , data = exist ? JSON.parse(fs.readFileSync(filePath)) : {title: '', filename: req.body.filename, test: [], open: []}
  return res.send(data)
};