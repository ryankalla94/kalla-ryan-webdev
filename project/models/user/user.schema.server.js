/**
 * Created by ryankalla on 6/13/17.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "mapUser"});

module.exports = userSchema;