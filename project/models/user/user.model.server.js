/**
 * Created by ryankalla on 6/13/17.
 */
var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model("ProjectUserModel", userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPin = addPin;
userModel.deletePin = deletePin;
userModel.friendRequest = friendRequest;
userModel.addFriend = addFriend;
userModel.removeFriend = removeFriend;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;


function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}


function createUser(user){
    return userModel.create(user);
}

function findUserById(userId){
    return userModel.findById(userId);
}

function findAllUsers(){
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser){
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function addPin(userId, pinId){
    return userModel
        .findById(userId)
        .then(function(user){
            user.pins.push(pinId);
            return user.save();
        });
}

function deletePin(userId, pinId){
    return userModel
        .findById(userId)
        .then(function (user){
            var index = user.pins.indexOf(pinId);
            user.pins.splice(index, 1);
            return user.save();
        })

}


function friendRequest(to, from){
    return userModel
        .findById(to)
        .then(function(user){

            var request = {
                _id: from._id,
                username: from.username
            };

            user.requests.push(request);
            return user.save();
        })
}

function addFriend(userId1, userId2){
    return userModel
        .findById(userId1)
        .then(function(user1){

            return userModel
                .findById(userId2)
                .then(function (user2) {
                    var friend = {
                        _id: userId2,
                        username: user2.username
                    };
                    user1.friends.push(friend);
                    return user1
                        .save()
                        .then(function(){
                            var friend = {
                                _id : userId1,
                                username : user1.username
                            };
                            var index = 0;
                            for(var r in user2.requests){
                                if(user2.requests[r]._id === userId1){
                                    index = r;
                                }
                            }

                            user2.requests.splice(index, 1);
                            user2.friends.push(friend);
                            return user2.save();
                        });
                });

            });
}



function removeFriend(userId1, userId2){
    return userModel
        .findById(userId1)
        .then(function(user1){
            var index = 0;
            for(var f in user1.friends){
                if(user1.friends[f]._id === userId2){
                    index = f;
                }
            }
            user1.friends.splice(index, 1);
            return user1.save();
        })
        .then(function(user1){
            return userModel
                .findById(userId2)
                .then(function(user2){
                    var index2 = 0;
                    for(var g in user2.friends){
                        if(user2.friends[g]._id === userId1){
                            index2 = g;
                        }
                    }
                    user2.friends.splice(index2, 1);
                    return user2.save();
                })
        })

}


