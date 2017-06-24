/**
 * Created by ryankalla on 6/22/17.
 */

var mongoose = require('mongoose');
var pinSchema = require('./pin.schema.server');
var pinModel = mongoose.model("ProjectPinModel", pinSchema);
var userModel = require('../user/user.model.server');


pinModel.createPin = createPin;
pinModel.findPinById = findPinById;
pinModel.findAllPinsForUser = findAllPinsForUser;
pinModel.updatePin = updatePin;
pinModel.deletePin = deletePin;
pinModel.addComment = addComment;

module.exports = pinModel;


function createPin(userId, pin){
    pin._user = userId;
    return pinModel.create(pin)
        .then(function(pin){
            return userModel.addPin(userId, pin._id);
        });
}

function findPinById(pinId){
    return pinModel.findById(pinId)
        .populate('_user')
        .exec();
}

function findAllPinsForUser(userId){
    return pinModel.find({_user : userId});
}

function updatePin(pinId, newPin){
    return pinModel.update({_id: pinId}, {$set: newPin});
}

function deletePin(pinId){
    return pinModel
        .findPinById(pinId)
        .then(function(pin){
            var userId = pin._user;
            return pinModel
                .remove({_id : pinId})
                .then(function (status){
                    return userModel.deletePin(userId, pinId);
                });
        });
}

function addComment(pinId, comment){
    return pinModel
        .update({_id: pinId}, {$push: {comments: comment}});
}


