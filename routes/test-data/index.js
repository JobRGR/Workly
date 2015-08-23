var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
  app.get('/api/test/get-category', require('./lib/get-category').get);
  app.post('/api/test/add-category', checkAuth.checkAdmin, require('./lib/add-category').post)
  app.post('/api/test/edit-category', checkAuth.checkAdmin, require('./lib/edit-category').post)
  app.post('/api/test/remove-category', checkAuth.checkAdmin, require('./lib/remove-category').post)
  app.post('/api/test/get-tests', require('./lib/get-tests').post)
  app.post('/api/test/update-category', checkAuth.checkAdmin, require('./lib/update-category').post)
  app.get('/api/test/get-categories', require('./lib/get-categories').get)
}