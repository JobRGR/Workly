module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/signup', require('./lib/signup').get);
    app.get('/user/:id', require('./lib/user').get);
    app.get('/company/:id', require('./lib/company').get);
    app.get('/edit', require('./lib/edit').get);
}