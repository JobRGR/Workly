var express = require('express');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require("mongoose");

var connect = require('connect');
var SessionStore = require("session-mongoose")(connect);

var store = new SessionStore({
    connection: mongoose.connection // <== custom connection
});

module.exports = store;
