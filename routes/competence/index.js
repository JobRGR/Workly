var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
  app.get('/api/competence/get-list', require('./lib/get-list').get);
  app.post('/api/competence/set-list', checkAuth.checkAdmin, require('./lib/set-list').post);
  app.get('/api/competence/drop', checkAuth.checkAdmin, require('./lib/drop').get);

  app.post('/api/competence/get-item', require('./lib/get-item').post);
  app.post('/api/competence/set-item', checkAuth.checkAdmin, require('./lib/set-item').post);
  app.post('/api/competence/remove-item', checkAuth.checkAdmin, require('./lib/remove-item').post);
}