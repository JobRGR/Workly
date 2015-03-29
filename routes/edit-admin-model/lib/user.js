var User = require('../../../models/user').User;

exports.post = function(req, res) {
    var id = req.params.id;
    var editUser = req.body;
    var isNotEdit = ['password','mail', 'subscribe'];

    User.findById(id, function(err, user){
        if(err) return res.send(err);

        for(var k in editUser)
            if(!(isNotEdit.indexOf(k) > -1))
                user[k] = editUser[k];

        user.save(function(err) {
            var obj = {
                message: err ? err.message : "ok",
                action: "edit user",
                user: user
            };
            return res.send(obj);
        });
    })
};