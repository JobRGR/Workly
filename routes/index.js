module.exports = function(app) {
    var Authentication = require('./authentication')(app);
    var GetInfo = require('./get-inf')(app);
    var GetModels = require('./get-models')(app);
    var Render = require('./render')(app);
    var Post = require('./post')(app);
    var Subscribe = require('./subscribe')(app);
    var DropDb = require('./drop')(app);
    var Respond = require('./respond')(app);
    var Search = require('./search')(app);

    //ADMIN KEY = 1234567
    var Admin = require('./admin')(app);
    var AdminEditModel = require('./edit-admin-model')(app);
};