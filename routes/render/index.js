module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/signup', require('./lib/signup').get);
    app.get('/admin', require('./lib/admin').get);
    app.get('/feed', require('./lib/feed').get);
    app.get('/post/:id', require('./lib/post').get);
    app.get('/user/:id', require('./lib/user').get);
    app.get('/company/:id', require('./lib/company').get);
    app.get('/post-info/:id', require('./lib/post-info').get);
    app.get('/edit', require('./lib/edit').get);
    app.get('/edit-post/:id', require('./lib/edit-post').get);
    app.get('/competence', require('./lib/competence').get);
    app.get('/create-post', require('./lib/create-post').get);
    app.get('/subscription', require('./lib/subscription').get);
    app.get('/my-vacancy', require('./lib/my-vacancy').get);
}