module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/signup', require('./lib/signup').get);
}