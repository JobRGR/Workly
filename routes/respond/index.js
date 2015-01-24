var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/respond-post/:id', checkAuth.checkUser, require('./lib/respond').post);
    app.get('/api/respond-post-list/:id', checkAuth.checkCompany, require('./lib/respond-list').get);
    app.post('/api/respond-post-user', checkAuth.checkCompany, require('./lib/respond-user').post);
}