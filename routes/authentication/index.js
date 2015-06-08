var checkAuth = require('../../middleware/checkAuth');
var validateUser = require('../../middleware/validate').validateUser;
var validateCompany = require('../../middleware/validate').validateCompany;

module.exports = function(app) {
    app.post('/api/sign-in', checkAuth.notAuth, require('./lib/sign-in').post)

    app.post('/api/sign-up-user', checkAuth.notAuth,require('./lib/user/sign-up').post);
    app.post('/api/sign-up-company', checkAuth.notAuth,require('./lib/company/sign-up').post);

    app.post('/api/edit-user', checkAuth.checkUser,validateUser,require('./lib/user/edit').post);
    app.post('/api/edit-company',checkAuth.checkCompany,validateCompany,require('./lib/company/edit').post);

    app.post('/api/logout',checkAuth, require('./lib/logout').post);

    app.get('/api/get-status', require('./lib/status').get);

    app.post('/api/change-password-user',checkAuth.checkUser,require('./lib/user/change-password').post);
    app.post('/api/change-password-company',checkAuth.checkCompany,require('./lib/company/change-password').post);

    app.post('/api/change-mail-user',checkAuth.checkUser,require('./lib/user/change-mail').post);
    app.post('/api/change-mail-company',checkAuth.checkCompany,require('./lib/company/change-mail').post);
}