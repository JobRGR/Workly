var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname+'/../../../public/test-data/index.json'
    , data = JSON.stringify(req.body, null, '\t');

  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err);
    return res.send({'message': 'ok'})
  });
};