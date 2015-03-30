module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/signup', require('./lib/signup').get);
    app.get('/admin', require('./lib/admin').get);
    app.get('/edit', require('./lib/edit').get);
    app.get('/create-post', require('./lib/create-post').get);
}