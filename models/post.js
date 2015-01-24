var crypto = require('crypto');

var async = require('async');
var util = require('util');
var mongoose = require('../lib/mongoose'),
    Schema = mongoose.  Schema;

var Company = require('./company');

var openQuestion = [{
    correct: {type: String, default: ' '},
    question: {type: String,  default: ' '},
    isChecked: {type: Boolean,  default: true}
}];

var testQuestion = [{
    question: {type: String, default: ' '},
    correct: {type: String, default: ' '},
    answers: {type: Array,  default: ' '}
}];

var schema = new Schema({
    authorId: {
        type: String,
        required: true,
        default: " "
    },
    authorName:{
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true,
        default: " "
    },
    city:{
        type: String,
        required: true,
        default: " "
    },
    requirements:{
        type: String,
        required: true,
        default: " "
    },
    acting:{
        type: String,
        required: true,
        default: " "
    },
    offer:{
        type: String,
        required: true,
        default: " "
    },
    about:{
        type: String,
        required: true,
        default: " "
    },
    tags:{
        type: String,
        required: true,
        default: " "
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    },
    responders:{
        type: Array,
        required: true,
        default: [null]
    },
    users: [{
       id: {type: String, default: ' '},
        openQuestion: openQuestion,
        testQuestion: testQuestion,
        result: {type: Number, default: 0},
        openChecked: {type: Array,  default: ' '},
        testChecked: {type: Array,  default: ' '},
        openCorrect: {type: Number, default: 0},
        testCorrect: {type: Number, default: 0},
        openAnswer: {type: Array,  default: ' '},
        testAnswer: {type: Array,  default: ' '},
        unChecked: {type: Array, default: ' '}
    }],
    openQuestion:openQuestion,
    testQuestion:testQuestion
});

schema.statics.create = function(req, callback) {
    var Post = this;
    var post = new Post();

    var company = req.company;
    var data = req.body;

    for(var k in data)
        post[k] = data[k];

    post.authorId = company.id;
    post.authorName = company.companyName;

    post.save(function(err) {
        if (err) return callback(err);
        callback(null,post)
    });
};

schema.statics.edit =  function(req, callback) {
    var id = req.params.id;
    var data = req.body;
    var companyId = req.company.id;

    var Post = this;

    async.waterfall([
        function(callback) {
            Post.findById(id, callback);
        },
        function(post, callback) {
            if (!post)
                return callback(new PostError("Wrong Data"));

            if(post.authorId!=companyId)
                return callback(new PostError("Permission deny! Not property of your Company!"));

            for(var k in data)
                post[k] = data[k];

            post.save(function(err) {
                if (err) return callback(err);
                callback(null, post);
            });
        }
    ], callback);
};


exports.Post = mongoose.model('Post', schema);


function PostError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, PostError);

    this.message = message;
}

util.inherits(PostError, Error);

PostError.prototype.name = 'PostError';

exports.PostError = PostError;