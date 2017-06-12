/**
 * Created by ryankalla on 5/31/17.
 */


var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

var widgetModel = require('../models/widget/widget.model.server');




// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];


app.post('/api/assignment/page/:pageId/widget', createWidget);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put('/page/:pageId/widget', orderWidgets);


function orderWidgets(req, res){
    var initialIndex = req.query.initial;
    var finalIndex = req.query.final;
    // var pageWidgets = [];
    // var nonPageWidgets = [];
    // for(var w in widgets){
    //     if(widgets[w].pageId === req.params.pageId){
    //         pageWidgets.push(widgets[w]);
    //     } else{
    //         nonPageWidgets.push(widgets[w]);
    //     }
    // }
    // widgets = nonPageWidgets;
    // var widget = pageWidgets[initialIndex];
    // pageWidgets.splice(initialIndex, 1);
    // pageWidgets.splice(finalIndex, 0, widget);
    // widgets = widgets.concat(pageWidgets);
    // res.sendStatus(202);
    // return;

    widgetModel
        .reorderWidget(req.params.pageId, initialIndex, finalIndex)
        .then(function (status){
            res.sendStatus(202);
        })
}


function createWidget(req, res){
    var widget = req.body;
    widgetModel
        .createWidget(req.params.pageId, widget)
        .then(function(widget){
            res.json(widget)
        }, function(err){
            res.send(err);
        });
}

function findAllWidgetsForPage(req, res){
    widgetModel
        .findAllWidgetsForPage(req.params.pageId)
        .then(function (widgets){
            res.json(widgets);
        });
}

function findWidgetById(req, res){
    widgetModel
        .findWidgetById(req.params.widgetId)
        .then(function (widget){
            res.json(widget);
        })
}

function updateWidget(req, res){
    var newWidget = req.body;
    var widgetId = req.params.widgetId;

    widgetModel
        .updateWidget(widgetId, newWidget)
        .then(function(widget){
            res.json(widget);
        })
}

function deleteWidget(req, res){
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status){
            res.sendStatus(202);
        })
}


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

    res.redirect(callbackUrl);
}






