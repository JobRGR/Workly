module.exports = function(req, res, next) {
    if(!req.company && !req.user){
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
    if(!req.company){
        return res.send({
            message: "Permission deny! You are not authorized by Company!"
        })
    }

    next();
};

module.exports.checkUser = function(req, res, next){
    if(!req.user){
        return res.send({
            message: "Permission deny! You are not authorized by User!"
        })
    }

    next();
};

