/**
 * Created by ryankalla on 6/5/17.
 */
var app = require('../../express');

var pageModel = require('../models/page/page.model.server');



app.post('/api/assignemnt/website/:websiteId/page', createPage);
app.get('/api/assignemnt/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/assignemnt/page/:pageId', findPageById);
app.put('/api/assignemnt/page/:pageId', updatePage);
app.delete('/api/assignemnt/page/:pageId', deletePage);


function createPage(req, res){
    var page = req.body;
    pageModel
        .createPage(req.params.websiteId, page)
        .then(function(page){
            res.json(page)
        }, function(err){
            res.send(err);
        });

}

function findAllPagesForWebsite(req, res){
    pageModel
        .findAllPagesForWebsite(req.params.websiteId)
        .then(function (pages){
            res.json(pages);
        });
}

function findPageById(req, res){
    pageModel
        .findPageById(req.params.pageId)
        .then(function (page){
            res.json(page);
        })
}

function updatePage(req, res){
    var newPage = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, newPage)
        .then(function(page){
            res.json(page);
        })
}

function deletePage(req, res){
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (status){
            res.sendStatus(202);
        })
}