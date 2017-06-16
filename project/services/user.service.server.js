/**
 * Created by ryankalla on 6/13/17.
 */


var app = require('../../express');
var userModel = require('../models/user/user.model.server');

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);


app.get('/api/project/user/:userId', findUserById);
app.get('/api/project/user', findAllUsers);
app.post('/api/project/user', createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', deleteUser);

// app.post('/api/project/login', passport.authenticate('local'), login);
// app.post('/api/project/logout', logout);
// app.post('/api/project/register', register);
// app.get('/api/project/loggedin', loggedIn);
//
//
// function loggedIn(req, res){
//     if(req.isAuthenticated()){
//         res.json(req.user);
//     } else {
//         res.send('0');
//     }
// }
//
// function register(req, res){
//     var userObj = req.body;
//     userModel
//         .createUser(userObj)
//         .then(function (user){
//             req
//                 .login(user, function (status){
//                     res.send(status);
//                 });
//         })
// }
//
// function localStrategy(username, password, done) {
//     userModel
//         .findUserByCredentials(username, password)
//         .then(
//             function(user) {
//                 if (!user) {
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             },
//             function(err) {
//                 if (err) {
//                     return done(err, false);
//                 }
//             }
//         );
// }
//
//
// function login(req, res){
//     res.json(req.user);
// }
//
// function logout(req, res){
//     req.logout();
//     res.sendStatus(200);
// }
//
//
//
// function serializeUser(user, done) {
//     done(null, user);
// }
//
// function deserializeUser(user, done) {
//     userModel
//         .findUserById(user._id)
//         .then(
//             function(user){
//                 done(null, user);
//             },
//             function(err){
//                 done(err, null);
//             }
//         );
// }



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