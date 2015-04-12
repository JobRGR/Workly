var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.get('/api/admin/cms/nav', checkAuth, require('./lib/nav').get);
    app.post('/api/admin/cms/get-file', checkAuth, require('./lib/get-file').post);
    app.post('/api/admin/cms/set-file', checkAuth, require('./lib/set-file').post);
}