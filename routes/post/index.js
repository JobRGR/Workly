var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/create-post', checkAuth.checkCompany,require('./lib/create').post);

    app.post('/api/edit-post/:id', checkAuth.checkCompany,require('./lib/edit').post);
    app.get('/api/remove-post/:id', checkAuth.checkCompany,require('./lib/remove').get);

    //in future only admin permission
    app.get('/api/drop-post', require('./lib/drop').get);

};