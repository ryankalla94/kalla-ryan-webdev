/**
 * Created by ryankalla on 6/13/17.
 */


var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var FacebookStrategy = require('passport-facebook').Strategy;

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/user', findAllUsers);
app.post('/api/project/user', createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);

app.post('/api/project/login', passport.authenticate('local'), login);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.get('/api/project/loggedin', loggedIn);

app.post('/api/project/friend/:userId/request', friendRequest);
app.post('/api/project/friend/:userId1/:userId2', addFriend);
app.delete('/api/project/friend/:userId1/:userId2', removeFriend);

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/',
        failureRedirect: '/project/#!/login'
    }));



function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        username:  profile.displayName,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        roles: ['USER'],
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function friendRequest(req, res){
    var from = req.body;
    var to = req.params.userId;
    userModel
        .friendRequest(to, from)
        .then(function(user){
            res.json(user);
        })
}

function addFriend(req, res){
    var user1 = req.params.userId1;
    var user2 = req.params.userId2;
    userModel
        .addFriend(user1, user2)
        .then(function(user){
            res.json(user);
        })
}

function removeFriend(req, res){
    var user1 = req.params.userId1;
    var user2 = req.params.userId2;
    userModel
        .removeFriend(user1, user2)
        .then(function(user){
            res.json(user);
        })
}


function loggedIn(req, res){
    if(req.isAuthenticated()){
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function register(req, res){
    var userObj = req.body;
    userObj.roles = ['USER'];
    userModel
        .createUser(userObj)
        .then(function (user){
            req
                .login(user, function (status){
                    res.send(status);
                });
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err, false);
                }
            }
        );
}


function login(req, res){
    res.json(req.user);
}

function logout(req, res){
    req.logout();
    res.sendStatus(200);
}



function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}



function deleteUser(req, res){
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(){
            res.sendStatus(202);
        });
}


function updateUser(req, res){
    var user = req.body;
    var userId = req.params.userId;

    userModel
        .updateUser(userId, user)
        .then(function(user){
            res.json(user);
        });

}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password){

        userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                if(user){
                    res.json(user);
                } else{
                    res.sendStatus(404);
                }
            });

    } else if(username){

        userModel
            .findUserByUsername(username)
            .then(function(user){
                if(user){
                    res.json(user);
                } else{
                    res.sendStatus(404);
                }
            });

    } else{
        userModel
            .findAllUsers()
            .then(function(users){
                res.json(users);
            });

    }
}

function findUserById(req, res) {

    userModel
        .findUserById(req.params['userId'])
        .then(function(user){
            res.json(user);
        });

}


function createUser(req, res){
    var user = req.body;
    if(!user.roles){
        user.roles = ['USER'];
    }
    userModel
        .createUser(user)
        .then(function(user){
            res.json(user)
        }, function(err){
            res.send(err);
        });

}