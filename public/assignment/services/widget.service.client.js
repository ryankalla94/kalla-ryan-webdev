/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .service('widgetService', widgetService);

    function widgetService() {
        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(pageId, widget){
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId (pageId) {
            var results = [];

            for(var w in widgets){
                if(widgets[w].pageId === pageId){
                    widgets[w].created = new Date();
                    widgets[w].accessed = new Date();
                    results.push(widgets[w]);
                }
            }

            return results;
        }

        function findWidgetById (widgetId) {
            return widgets.find(function (widget) {
                return widget._id === widgetId;
            });
        }

        function updateWidget(widgetId, widget){
            var old = findWidgetById(widgetId);
            var index = widgets.indexOf(old);
            widgets[index] = widget;
        }

        function deleteWidget(widgetId){
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index,1);
        }




    }

})();
