/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($sce, $routeParams, $location, widgetService) {
        var model = this;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;


        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }
        init();



        function updateWidget(widget){
            if(typeof widget === 'undefined'){
                model.error = 'name is required';
                return;
            }
            if(typeof widget.size === 'string'){
                widget.size = parseInt(widget.size.charAt(0));
            }
            widgetService.updateWidget(widget._id, widget);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function deleteWidget(widgetId){
            widgetService.deleteWidget(widgetId);
            $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }


    }
})();