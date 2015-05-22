var fs = require('fs');

exports.get = function(req, res, next) {
  var dirPath = __dirname+'/../../../public/competence/data';
  var files = fs.readdirSync(dirPath);
  files.forEach(function(file){
    var filePath = dirPath + '/' + file;
    fs.unlinkSync(filePath);
  });
  var filePath = __dirname+'/../../../public/competence/index.json';
  var text = JSON.stringify({list: []}, null, '\t');
  fs.writeFile(filePath, text, 'utf8', function(err) {
    if(err) return res.send(err);
    return res.send({'message': 'ok'});
  });
};