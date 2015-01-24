//var checkAuth = require('../../middleware/checkAuth');
module.exports = function(app) {
    app.get('/api/drop-db', require('./lib/dropDb').get);
}