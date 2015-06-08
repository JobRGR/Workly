var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.get('/api/get-users', require('./lib/user').get);
    app.get('/api/get-companies', require('./lib/company').get);
    app.get('/api/get-posts', require('./lib/post').get);
}