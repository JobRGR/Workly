var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname + '/../../../public/test-data/index.json'
    , exist = fs.existsSync(filePath)
    , data = exist ? JSON.parse(fs.readFileSync(filePath)) : {category: []}
    , testPath = __dirname + '/../../../public/test-data/tests/' + req.body.filename +'.json'
    , testExist = fs.existsSync(testPath)
    , testData = testExist ? JSON.parse(fs.readFileSync(testPath)) : {title: req.body.title, filename: req.body.filename, test: [], open: []}

  testData.title = req.body.title
  testData = JSON.stringify(testData, null, '\t')
  data.category.forEach(function (item) {
    if(item.filename == req.body.filename) item.title = req.body.title
  })
  data = JSON.stringify(data, null, '\t')
  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err)
    fs.writeFile(testPath, testData, 'utf8',
      function (err) {
        if(err) return res.send(err);
        return res.send({'message': 'ok'})
      }
    )
  })
}