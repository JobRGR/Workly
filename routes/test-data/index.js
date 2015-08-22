var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
  app.get('/api/test/get-category', require('./lib/get-category').get);
  app.post('/api/test/add-category', checkAuth.checkAdmin, require('./lib/add-category').post)

  app.post('/api/test/get-item', require('./lib/get-item').post);
  app.post('/api/test/set-item', checkAuth.checkAdmin, require('./lib/set-item').post);
  app.post('/api/test/remove-item', checkAuth.checkAdmin, require('./lib/remove-item').post);
}