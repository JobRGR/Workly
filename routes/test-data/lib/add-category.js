var fs = require('fs');

exports.post = function(req, res, next) {
  var filePath = __dirname + '/../../../public/test-data/index.json'
    , exist = fs.existsSync(filePath)
    , data = exist ? JSON.parse(fs.readFileSync(filePath)) : {category: []}

  data.category.push({title: req.body.title, filename: req.body.filename})
  data = JSON.stringify(data, null, '\t')
  fs.writeFile(filePath, data, 'utf8', function(err) {
    if(err) return res.send(err)
    fs.writeFile(
      __dirname + '/../../../public/test-data/tests/' + req.body.filename +'.json',
      JSON.stringify({
        title: req.body.title,
        filename: req.body.filename,
        test: [],
        open: [],
      }, null, '\t'),
      'utf8',
      function (err) {
        if(err) return res.send(err);
        return res.send({'message': 'ok'})
      }
    )
  })
}