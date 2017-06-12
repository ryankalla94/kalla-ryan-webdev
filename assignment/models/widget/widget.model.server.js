/**
 * Created by ryankalla on 6/11/17.
 */

var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model("WidgetModel", widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgets = findAllWidgets;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;


function createWidget(pageId, widget){
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function(widget){
            pageModel.addWidget(pageId, widget._id);
            return widget;
        });
}

function findAllWidgets(){
    return widgetModel.find();
}

function findAllWidgetsForPage(pageId){
    return widgetModel
        .find({_page : pageId})
        .populate('_page')
        .exec();
}

function findWidgetById(widgetId){
    return widgetModel.findOne({_id : widgetId});
}

function updateWidget(widgetId, newWidget){
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId){
    return widgetModel
        .findWidgetById({_id : widgetId})
        .then(function(widget){
            var pageId = widget._page;
            return widgetModel
                .remove({_id : widgetId})
                .then(function (status){
                    return pageModel.deleteWidget(pageId, widgetId);
                });
        });
}

function reorderWidget(pageId, start, end){
    return widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){

            var pageWidgets = [];
            for(var w in widgets){
                if(widgets[w]._page._id.toString() === pageId){
                    pageWidgets.push(widgets[w]);
                }
            }
            var widget = pageWidgets[start];
            pageWidgets.splice(start, 1);
            pageWidgets.splice(end, 0, widget);

            return widgetModel
                .remove({_page : pageId})
                .then(function(){
                    return widgetModel.insertMany(pageWidgets);
                })
        })
}
