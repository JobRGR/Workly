var checkAuth = require('../../middleware/checkAuth');

module.exports = function(app) {
    app.get('/api/user/:id', checkAuth, require('./lib/user').get);
    app.get('/api/company/:id', /*checkAuth,*/ require('./lib/company').get); //на время
    app.get('/api/post/:id', checkAuth, require('./lib/post').get);
}