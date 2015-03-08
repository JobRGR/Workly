module.exports = function(req, res, next) {
    if(!req.company && !req.user && !req.admin){
        return res.send({
            message: "Permission deny! You are not authorized!"
        })
    }

    next();
};

module.exports.notAuth = function(req, res, next){
    if(req.company || req.user){
        return res.send({
            message: "Permission deny! You are authorized!"
        })
    }

    next();
};

module.exports.checkCompany = function(req, res, next){
    if(!req.company && !req.admin){
        return res.send({
            message: "Permission deny! You are not authorized by Company!"
        })
    }

    next();
};

module.exports.checkUser = function(req, res, next){
    if(!req.user && !req.admin){
        return res.send({
            message: "Permission deny! You are not authorized by User!"
        })
    }

    next();
};

module.exports.checkAdmin = function(req, res, next){
    if(!req.admin){
        return res.send({
            message: "Permission deny! You are not authorized by Admin!"
        })
    }

    next();
};

module.exports.checkNoAdmin = function(req, res, next){
    if(req.admin){
        return res.send({
            message: "Permission deny! You are authorized by Admin!"
        })
    }

    next();
};

