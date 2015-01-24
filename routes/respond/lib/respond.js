var Post = require('../../../models/post').Post;
var async = require('async');
var RES;

exports.post = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;
    var userId = req.user['id'];
    RES = res;

    Post.findById(id,function(err,post){
        if(err) return RES.send({
                action: "respond post",
                message: err
            });

        if(!post) return RES.send({
            action: "respond post",
            message: "Respond Post not found!"
        });

        var isRespond = post.responders.indexOf(userId) > -1;

        if(isRespond) return RES.send({
            action: "respond post",
            message: "You have already respond!"
        });

        setUser(post, userId, data, send);
    });

    function setUser(post, userId, data, send){
        async.waterfall([
            function(callbak){
                var user = {
                        id: userId,
                        openQuestion: post.openQuestion,
                        testQuestion: post.testQuestion,
                        openAnswer: data.openQuestion.map(function(val){
                            return val.ans;
                        }),
                        testAnswer: data.testQuestion.map(function(val){
                            return val.ans;
                        }),
                        openChecked: post.openQuestion.map(function(val, index){
                            return res = val.isChecked ? data.openQuestion[index].ans == val.correct : "unChecked";
                        }),
                        testChecked: post.testQuestion.map(function(val, index){
                            return data.testQuestion[index].ans == val.correct;
                        }),
                        openCorrect: 0,
                        testCorrect: 0,
                        unChecked: 0
                    };

                callbak(null, user,post, send)
            },
            function(user,post, callback){
                var openCorrect = user.openChecked.reduce(function(pre,cur){
                        return {
                            correct: cur == "unChecked" ? pre.correct : pre.correct+cur,
                            uncorrect: cur == "unChecked" ?  ++pre.uncorrect : pre.uncorrect
                        }
                    }, {
                        correct:0,
                        uncorrect:0
                    }),
                        testCorrect = user.testChecked.reduce(function(pre,cur){
                            return pre + cur
                        },0);

                    user.openCorrect = openCorrect.correct;
                    user.testCorrect = testCorrect;
                    user.unChecked = openCorrect.uncorrect;

                    user.result = user.openCorrect + user.testCorrect;

                callback(null, user, post, send)
            }
        ], function(err, user, post, send){
            if(err) return send(err,user,post);
            send(null, user,post);
        })
    }

    function send(err, user, post){
        post.responders.push(user.id);
        post.users.push(user);

        post.save(function(err, post){
            if(err) return RES.send({
                action: "respond post",
                message: err
            });

            return RES.send({
                action: "respond post",
                message: "ok"
            });
        });
    }
};

