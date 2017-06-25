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
pinModel.deleteComment = deleteComment;
pinModel.findPublicPins = findPublicPins;
pinModel.findFriendPins = findFriendPins;

module.exports = pinModel;

function findPublicPins(){
    return pinModel.find({privacy : "PUBLIC"})
}

function findFriendPins(userId, $q){
    return userModel
        .findById(userId)
        .then(function(user){
            return pinModel.find()
                .then(function (pins){
                    var friendIds = [];
                    for(var f in user.friends){
                        if(user.friends[f]._id){
                            friendIds.push(user.friends[f]._id);
                        }
                    }

                    var friendPins = [];
                    for(var p in pins){
                        if(friendIds.indexOf(pins[p]._user.toString()) > -1 && pins[p].privacy === "FRIENDS"){
                            friendPins.push(pins[p])
                        }
                    }
                    return friendPins;
                })
        })

}

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

function deleteComment(pinId, commentId){
    return pinModel
        .findById(pinId)
        .then(function(pin){
            var index = 0;
            for(var c in pin.comments){
                if(pin.comments[c]._id === commentId){
                    console.log("test");
                    index = c;
                }
            }
            pin.comments.splice(index, 1);
            return pin.save();
        })
}


