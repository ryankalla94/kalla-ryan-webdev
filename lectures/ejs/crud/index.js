/**
 * Created by ryankalla on 6/19/17.
 */


//console.log("hello from ejs");

const app = require("../../../express");

var userModel = require("../../../assignment/models/user/user.model.server");

app.get('/lectures/ejs/crud/user', findAllUsers);
app.get('/lectures/ejs/crud/user/:userId/delete', deleteUser);
app.post('/lectures/ejs/crud/user', createUser);


app.get('/hello/from/client', hello);

function hello(req, res){
    res.render('lectures/ejs/crud/hello.ejs');
}

function findAllUsers(req, res){
    userModel
        .findAllUsers()
        .then(function(users){
            var scope = {
                users: users
            };
            res.render('lectures/ejs/crud/user-list.view.server.ejs' , scope);
        })
}

function deleteUser(req, res){
    userModel
        .deleteUser(req.params.userId)
        .then(function(status){
            res.redirect('/lectures/ejs/crud/user');
        })
}

function createUser(req, res){
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(user){
            res.redirect('/lectures/ejs/crud/user');
        })
}