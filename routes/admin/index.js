var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/admin/sign-in', checkAuth.checkNoAdmin, require('./lib/sign-in').post);

    app.post('/api/admin/create-admin', require('./lib/create').post);
    app.post('/api/admin/sign-up',require('./lib/sign-up').post);
    app.post('/api/admin/edit',require('./lib/edit').post);

    app.post('/api/admin/logout', require('./lib/logout').post);
    app.get('/api/admin/get-status', require('./lib/status').get);


    app.get('/api/admin/remove-admin/:id', require('./lib/remove').get);
    app.get('/api/admin/drop-admin', require('./lib/drop').get);
}