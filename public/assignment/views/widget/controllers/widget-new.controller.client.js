/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($sce, $routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createImageWidget = createImageWidget;
        model.createHeadingWidget = createHeadingWidget;
        model.createYouTubeWidget = createYouTubeWidget;
        model.createHTMLWidget = createHTMLWidget;
        model.createTextWidget = createTextWidget;


        function init(){
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);

            function renderWidgets(widgets){
                model.widgets = widgets;
            }        }
        init();

        function createImageWidget(){
            var widget = { "type": "IMAGE" };
            widget.width = "100%";
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
                });
        }

        function createHeadingWidget(){
            var widget = { "type": "HEADING" };
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
                });
        }

        function createYouTubeWidget(){
            var widget = { "type": "YOUTUBE" };
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
                });
        }

        function createHTMLWidget(){
            var widget = { "type": "HTML" };
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
                });
        }

        function createTextWidget(){
            var widget = { "type": "TEXT" };
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(widget){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
                });
        }


    }
})();