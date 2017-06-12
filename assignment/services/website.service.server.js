/**
 * Created by ryankalla on 5/31/17.
 */


var app = require('../../express');

var websiteModel = require('../models/website/website.model.server');


app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);


function updateWebsite(req, res){
    var newWebsite = req.body;
    var websiteId = req.params.websiteId;

    websiteModel
        .updateWebsite(websiteId, newWebsite)
        .then(function(website){
            res.json(website);
        })
}


function deleteWebsite(req, res){
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (status){
            res.sendStatus(202);
        })
}


function findAllWebsitesForUser(req, res){
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites){
            res.json(websites);
        });
}


function createWebsite(req,res){
    var website = req.body;
    websiteModel
        .createWebsite(req.params.userId, website)
        .then(function(website){
            res.json(website)
        }, function(err){
            res.send(err);
        });
}


function findWebsiteById(req,res){
    websiteModel
        .findWebsiteById(req.params.websiteId)
        .then(function (website){
            res.json(website);
        })
}





