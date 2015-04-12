var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname+'/../../../public/json/texts/'+req.body.filename
    , data = JSON.stringify(req.body.data, null, 2);

  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err);
    return res.send({'message': 'ok'})
  });
};