var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.post('/api/search-user', checkAuth, require('./lib/user').post);
    app.post('/api/search-company', checkAuth, require('./lib/company').post);
    app.post('/api/search-post', checkAuth, require('./lib/post').post);
}