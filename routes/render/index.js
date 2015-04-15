module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/signup', require('./lib/signup').get);
    app.get('/admin', require('./lib/admin').get);
	app.get('/feed', require('./lib/feed').get);
	app.get('/post', require('./lib/post').get);
	app.get('/user', require('./lib/user').get);
    app.get('/edit', require('./lib/edit').get);
    app.get('/create-post', require('./lib/create-post').get);
}