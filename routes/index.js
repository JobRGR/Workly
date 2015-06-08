module.exports = function(app) {
    var Authentication = require('./authentication')(app);
    var GetInfo = require('./get-inf')(app);
    var Render = require('./render')(app);
};