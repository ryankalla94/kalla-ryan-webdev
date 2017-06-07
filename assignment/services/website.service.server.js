/**
 * Created by ryankalla on 5/31/17.
 */


var app = require('../../express');

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.post('/api/assignment/user/:userId/website', createWebsite);
app.get('/api/assignment/website/:websiteId', findWebsiteById);
app.delete('/api/assignment/website/:websiteId', deleteWebsite);
app.put('/api/assignment/website/:websiteId', updateWebsite);


function updateWebsite(req, res){
    var website = req.body;
    website.accessed = new Date();
    var old = websites.find(function (website) {
        return website._id === req.params['websiteId'];
    });
    var index = websites.indexOf(old);
    websites[index] = website;
    res.sendStatus(202);
    return;
}


function deleteWebsite(req, res){
    var website = websites.find(function (website) {
        return website._id === req.params['websiteId'];
    });
    var index = websites.indexOf(website);
    websites.splice(index,1);
    res.sendStatus(202);
    return;
}


function findAllWebsitesForUser(req, res){
    var results = [];
    for(var v in websites){
        if(websites[v].developerId === req.params.userId){
            results.push(websites[v]);
        }
    }
    res.json(results);
}


function createWebsite(req,res){
    var website = req.body;
    website.developerId = req.params['userId'];
    website._id = (new Date()).getTime() + "";
    website.created = new Date();
    websites.push(website);
    res.json(website);
    return website;

}


function findWebsiteById(req,res){
    var result = websites.find(function (website) {
        return website._id === req.params['websiteId'];
    });
    if(typeof result === "undefined"){
        res.sendStatus(404);
        return;
    }
    res.json(result);
    return result;
}





