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


        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
        }
        init();

        function createImageWidget(){
            var widget = { "widgetType": "IMAGE" };
            widget._id = (new Date()).getTime() + "";
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
        }

        function createHeadingWidget(){
            var widget = { "widgetType": "HEADING" };
            widget._id = (new Date()).getTime() + "";
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
        }

        function createYouTubeWidget(){
            var widget = { "widgetType": "YOUTUBE" };
            widget._id = (new Date()).getTime() + "";
            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + '/page/' + model.pageId + "/widget/" + widget._id);
        }


    }
})();