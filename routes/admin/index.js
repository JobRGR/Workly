var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/admin/sign-in', checkAuth.checkNoAdmin, require('./lib/sign-in').post);

    app.post('/api/admin/add-admin', checkAuth.checkAdmin,require('./lib/create').post);
    app.post('/api/admin/sign-up', checkAuth.checkNoAdmin,require('./lib/sign-up').post);
    app.post('/api/admin/edit/:id', checkAuth.checkAdmin,require('./lib/edit').post);

    app.post('/api/admin/logout', checkAuth.checkAdmin,require('./lib/logout').post);
    app.get('/api/admin/get-status', checkAuth.checkAdmin,require('./lib/status').get);


    app.get('/api/admin/remove-admin/:id', checkAuth.checkAdmin,require('./lib/remove').get);
    app.get('/api/admin/drop-admin', checkAuth.checkAdmin,require('./lib/drop').get);
}