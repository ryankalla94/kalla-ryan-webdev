/**
 * Created by ryankalla on 6/5/17.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'FACULTY', 'STUDENT', 'ADMIN']}],
    firstName: String,
    lastName: String,
    email: String,
    google: {
        id: String,
        token: String
    },
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "user"});

module.exports = userSchema;



