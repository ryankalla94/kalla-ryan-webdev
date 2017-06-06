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
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);

            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);

            function renderWidgets(widgets){
                model.widgets = widgets;
            }

            function renderWidget(widget){
                model.widget = widget;
            }

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
            widgetService
                .updateWidget(widget._id, widget)
                .then(function(){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }

        function deleteWidget(widgetId){
            widgetService
                .deleteWidget(widgetId)
                .then(function(){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }


    }
})();