var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/admin/edit-company/:id', checkAuth.checkAdmin, require('./lib/user').post);
    app.post('/api/admin/edit-user/:id', checkAuth.checkAdmin, require('./lib/company').post);
    app.post('/api/admin/edit-post/:id', checkAuth.checkAdmin.require('./lib/post').post);
}