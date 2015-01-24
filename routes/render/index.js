module.exports = function(app) {
    app.get('/', require('./lib/frontpage').get);
    app.get('/test', require('./lib/test').get);
}