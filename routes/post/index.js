var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/create-post', checkAuth.checkCompany,require('./lib/create').post);

    app.post('/api/edit-post/:id', checkAuth.checkCompany,require('./lib/edit').post);
    app.get('/api/remove-post/:id', checkAuth.checkCompany,require('./lib/remove').get);


    app.get('/api/get-companies-posts/:id',require('./lib/get-companies-posts').get);
    app.get('/api/get-my-posts', checkAuth.checkCompany,require('./lib/get-my-posts').get);
};
