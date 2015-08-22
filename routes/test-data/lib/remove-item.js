var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname+'/../../../public/test-data/data/' + req.body.name;
  fs.unlinkSync(filePath);
  return res.send({'message': 'ok'});
};