var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.get('/api/subscribe/:id', checkAuth.checkUser, require('./lib/subscribe').get);
    app.get('/api/unsubscribe/:id', checkAuth.checkUser, require('./lib/unsubscribe').get);

    app.get('/api/get-subscribe-companies', checkAuth.checkUser, require('./lib/subscribe-companies').get);
    app.get('/api/get-subscribe-companies-post', checkAuth.checkUser, require('./lib/subscribe-companies').get);
    app.get('/api/get-subscribe-posts', checkAuth.checkUser, require('./lib/subscribe-posts').get);

    app.get('/api/get-subscribe-user/:id', checkAuth, require('./lib/subscribe-user').get);
}