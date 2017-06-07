/**
 * Created by ryankalla on 5/31/17.
 */


var app = require('../../express');
var userModel = require('../models/user/user.model.server');

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];



app.get('/api/assignment/user/:userId', findUserById);
app.get('/api/assignment/user', findAllUsers);
app.post('/api/assignment/user', createUser);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);



function deleteUser(req, res){
    var userId = req.params.userId;
    for(var u in users) {
        if( users[u]._id === userId) {
            users.splice(u,1);
            res.sendStatus(202);
            return;
        }
    }
    res.sendStatus(404);
}


function updateUser(req, res){
    var user = req.body;
    for(var u in users) {
        if( users[u]._id === req.params.userId) {
            users[u] = user;
            res.sendStatus(202);
            return;
        }
    }
    res.sendStatus(404);
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password){
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else if(username){
        for(var u in users) {
            var user = users[u];
            if( user.username === username) {
                res.json(user);
                return;
            }
        }
        res.sendStatus(404);
    } else{
        res.json(users);
    }
}

function findUserById(req, res) {
    var user = users.find(function (user) {
        return user._id === req.params['userId'];
    });
    if(typeof user === "undefined"){
        res.sendStatus(404);
        return;
    }
    res.send(user);
}


function createUser(req, res){
    var user = req.body;

    // userModel
    //     .createUser(user)
    //     .then(function(user){
    //         res.json(user)
    //     }, function(err){
    //         res.send(err);
    //     });

    user._id = (new Date()).getTime() + "";
    user.created = new Date();
    users.push(user);
    res.json(user);
    return user;
}



