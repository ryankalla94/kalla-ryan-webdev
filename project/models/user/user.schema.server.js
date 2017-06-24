/**
 * Created by ryankalla on 6/13/17.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    roles: [{type: String, default: 'USER', enum: ['USER', 'ADMIN']}],
    firstName: String,
    facebook: {
        id:    String,
        token: String
    },
    lastName: String,
    email: String,
    requests: [{}],
    friends: [{}],
    pins: [{type: mongoose.Schema.Types.ObjectId, ref: "ProjectPinModel"}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "mapUser"});

module.exports = userSchema;