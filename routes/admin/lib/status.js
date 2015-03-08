exports.get = function(req, res, next) {
    var message = {
        message: "ok",
        action: "get auth data"
    };

    if(req.admin)  message.admin = req.admin;
    else  message.message = "No Authorized as Admin";

    return res.send(message);

}