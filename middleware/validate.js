module.exports.validateCompany = function(req, res, next) {
    var fields=["contacts","website","tel","img","about"];

    for(var k in req.body)
        if(fields.indexOf(k) == -1)
            delete req.body[k];

    next();
};

module.exports.validateUser = function(req, res, next) {
    var fields=["secondname","firstname","position","dob","city","tel","img","about","skills","work","study"];

    for(var k in req.body)
        if(fields.indexOf(k) == -1)
            delete req.body[k];
    /* return res.send({
     message: "Edit deny! Incorrect input data!"
     });*/

    next();
};

