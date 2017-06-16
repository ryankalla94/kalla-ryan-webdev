/**
 * Created by ryankalla on 5/31/17.
 */


var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var bcrypt = require("bcrypt-nodejs");

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};


app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', isAdmin, findAllUsers);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.get('/api/assignment/loggedin', loggedIn);
app.get('/api/assignment/checkAdmin', checkAdmin);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
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



function isAdmin(req, res, next){
    var user = req.user;
    if(req.isAuthenticated() && user.roles.indexOf('ADMIN') > -1){
        next();
    } else {
        res.sendStatus(401);
    }
}

function checkAdmin(req, res){
    if(req.user.roles.indexOf('ADMIN') > -1){
        res.json(req.user);
    } else {
        res.send('0');
    }
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
    userObj.password = bcrypt.hashSync(userObj.password);
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
        .findUserByUsername(username)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false);
                }
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
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

    userModel
        .createUser(user)
        .then(function(user){
            res.json(user)
        }, function(err){
            res.send(err);
        });

}



