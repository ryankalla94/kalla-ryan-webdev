/**
 * Created by ryankalla on 6/22/17.
 */


var app = require('../../express');
var pinModel = require('../models/pin/pin.model.server');


app.get('/api/project/pin/:pinId', findPinById);
app.get('/api/project/user/:userId/pin', findAllPinsForUser);
app.post('/api/project/user/:userId/pin', createPin);
app.put('/api/project/pin/:pinId', updatePin);
app.delete('/api/project/pin/:pinId', deletePin);
app.post('/api/project/pin/:pinId/comment', addComment);


function addComment(req, res){
    var comment = req.body;
    pinModel
        .addComment(req.params.pinId, comment)
        .then(function(){
            res.sendStatus(202);

        })
}

function deletePin(req, res){
    var pinId = req.params.pinId;
    pinModel
        .deletePin(pinId)
        .then(function(){
            res.sendStatus(202);
        });
}


function updatePin(req, res){
    var pin = req.body;
    var pinId = req.params.pinId;

    pinModel
        .updatePin(pinId, pin)
        .then(function(pin){
            res.json(pin);
        });

}

function findAllPinsForUser(req, res) {
    pinModel
        .findAllPinsForUser(req.params.userId)
        .then(function(pins){
            res.json(pins);
        });
}

function findPinById(req, res) {
    pinModel
        .findPinById(req.params['pinId'])
        .then(function(pin){
            res.json(pin);
        });

}


function createPin(req, res){
    var pin = req.body;
    pinModel
        .createPin(req.params.userId, pin)
        .then(function(pin){
            res.json(pin)
        }, function(err){
            res.send(err);
        });

}