var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/admin/edit-company/:id', checkAuth.checkAdmin, require('./lib/company/get-company').post);
    app.post('/api/admin/edit-user/:id', checkAuth.checkAdmin, require('./lib/user/get-user').post);
    app.post('/api/admin/edit-post/:id', checkAuth.checkAdmin, require('./lib/post/get-post').post);

    app.post('/api/admin/change-password-user/:id', checkAuth.checkAdmin, require('./lib/user/change-password-user').post);
    app.post('/api/admin/change-password-company/:id', checkAuth.checkAdmin, require('./lib/company/change-password-company').post);
    app.post('/api/admin/change-mail-user/:id', checkAuth.checkAdmin, require('./lib/user/change-mail-user').post);
    app.post('/api/admin/change-mail-company/:id', checkAuth.checkAdmin, require('./lib/company/change-mail-company').post);

    app.post('/api/admin/add-company', checkAuth.checkAdmin,require('./lib/company/add-company').post);
    app.post('/api/admin/add-user', checkAuth.checkAdmin,require('./lib/user/add-user').post);
    app.post('/api/admin/add-post', checkAuth.checkAdmin,require('./lib/post/add-post').post);
};