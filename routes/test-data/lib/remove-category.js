var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname + '/../../../public/test-data/index.json'
    , exist = fs.existsSync(filePath)
    , data = exist ? JSON.parse(fs.readFileSync(filePath)) : {category: []}
    , testPath = __dirname + '/../../../public/test-data/tests/' + req.body.filename +'.json'

  data.category = data.category.filter(function (item) {
    return item.filename != req.body.filename
  })
  data = JSON.stringify(data, null, '\t')
  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err)
    fs.unlinkSync(testPath)
    return res.send({'message': 'ok'})
  })
}