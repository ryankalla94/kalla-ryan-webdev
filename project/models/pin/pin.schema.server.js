/**
 * Created by ryankalla on 6/22/17.
 */

/**
 * Created by ryankalla on 6/13/17.
 */

var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "ProjectUserModel"},
    name: String,
    privacy: {type: String, enum: ["PUBLIC", "FRIENDS", "PRIVATE"]},
    categories: [{type: String, enum: ['FOOD', 'DRINK', 'LEISURE', 'MUSIC']}],
    lat: Number,
    lng: Number,
    comments: [{}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "mapPin"});

module.exports = pinSchema;