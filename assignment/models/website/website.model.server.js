
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model("WebsiteModel", websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;



module.exports = websiteModel;



function createWebsite(userId, website){
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function(website){
            return userModel.addWebsite(userId, website._id);
        });
}

function findAllWebsites(){
    return websiteModel.find();
}

function findAllWebsitesForUser(userId){
    return websiteModel
        .find({_user : userId})
        .populate('_user')
        .exec();
}

function findWebsiteById(websiteId){
    return websiteModel.findOne({_id : websiteId});
}


function deleteWebsite(websiteId){
     return websiteModel
        .findWebsiteById({_id : websiteId})
        .then(function(website){
            var userId = website._user;
            return websiteModel
                .remove({_id : websiteId})
                .then(function (status){
                    return userModel.deleteWebsite(userId, websiteId);
                });
        });

}

function updateWebsite(websiteId, newWebsite){
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}


function addPage(websiteId, pageId){
    return websiteModel
        .findById(websiteId)
        .then(function(website){
            website.pages.push(pageId);
            return website.save();
        });
}

function deletePage(websiteId, pageId){
    return websiteModel
        .findById(websiteId)
        .then(function (website){
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })

}


