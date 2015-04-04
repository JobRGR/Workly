var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/admin/edit-company/:id', checkAuth.checkAdmin, require('./lib/company').post);
    app.post('/api/admin/edit-user/:id', checkAuth.checkAdmin, require('./lib/user').post);
    app.post('/api/admin/edit-post/:id', checkAuth.checkAdmin, require('./lib/post').post);

    app.post('/api/admin/change-password-user/:id', checkAuth.checkAdmin, require('./lib/change-password-user').post);
    app.post('/api/admin/change-password-company/:id', checkAuth.checkAdmin, require('./lib/change-password-company').post);
    app.post('/api/admin/change-mail-user/:id', checkAuth.checkAdmin, require('./lib/change-mail-user').post);
    app.post('/api/admin/change-mail-company/:id', checkAuth.checkAdmin, require('./lib/change-mail-company').post);
}