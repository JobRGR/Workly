var fs = require('fs');

exports.post = function(req, res, next) {
  var data = req.body
    , filePath = __dirname+'/../../../public/test-data/data/' + data.name
    , text = JSON.stringify(data, null, '\t');

  fs.writeFile(filePath, text, 'utf8', function(err) {
    if(err) return res.send(err);
    return res.send({'message': 'ok'});
  });
};