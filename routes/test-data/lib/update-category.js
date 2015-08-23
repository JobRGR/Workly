var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname + '/../../../public/test-data/tests/' + req.body.filename +' .json'
    , exist = fs.existsSync(filePath)
    , data = exist ? JSON.parse(fs.readFileSync(filePath)) : {title: '', filename: req.body.filename, test: [], open: []}

  data.test = req.test
  data.open = req.open
  data = JSON.stringify(data, null, '\t')
  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err)
    return res.send({'message': 'ok'})
  })
};