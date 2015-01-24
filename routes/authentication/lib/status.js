exports.get = function(req, res, next) {
    var message = {
        message: "ok",
        action: "get auth data"
    };

    if(req.company)  message.company = req.company;
    else if(req.user) message.user = req.user;
    else  message.message = "No Authorized Account";

    return res.send(message);

}