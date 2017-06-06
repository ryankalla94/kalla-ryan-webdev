/**
 * Created by ryankalla on 6/5/17.
 */
(function (){

    var app = require('../../express');

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];


    app.post('/api/assignemnt/website/:websiteId/page', createPage);
    app.get('/api/assignemnt/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/assignemnt/page/:pageId', findPageById);
    app.put('/api/assignemnt/page/:pageId', updatePage);
    app.delete('/api/assignemnt/page/:pageId', deletePage);


    function createPage(req, res){
        var page = req.body;
        page.created = new Date();
        page.websiteId = req.params['websiteId'];
        page._id = (new Date()).getTime() + "";
        pages.push(page);
        res.json(page);
        return page;
    }

    function findAllPagesForWebsite(req, res){
        var results = [];
        for(var p in pages){
            if(pages[p].websiteId === req.params.websiteId){
                results.push(pages[p]);
            }
        }
        res.json(results);
    }

    function findPageById(req, res){
        var page = pages.find(function (page) {
            return page._id === req.params['pageId'];
        });
        if(typeof page === "undefined"){
            res.sendStatus(404);
            return;
        }
        res.send(page);
    }

    function updatePage(req, res){
        var page = req.body;
        page.accessed = new Date();
        var old = pages.find(function (page) {
            return page._id === req.params['pageId'];
        });
        var index = pages.indexOf(old);
        pages[index] = page;
        res.sendStatus(202);
        return;
    }

    function deletePage(req, res){
        var page = pages.find(function (page) {
            return page._id === req.params['pageId'];
        });
        var index = pages.indexOf(page);
        pages.splice(index,1);
        res.sendStatus(202);
        return;
    }


})();