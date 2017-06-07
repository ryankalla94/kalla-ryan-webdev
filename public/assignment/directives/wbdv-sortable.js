/**
 * Created by ryankalla on 6/6/17.
 */

(function(){

    angular
        .module('wbdvDirectives', [])
        .directive('wdSortable', wdSortable);


    function wdSortable($location, $routeParams, widgetService) {

        function linkFunction(scope, element){
            var pageId = $routeParams.pageId;
            var userId = $routeParams.userId;
            var websiteId  = $routeParams.websiteId;
            $(element).sortable({
                start:function( event, ui ) {
                    $(this).attr('data-previndex', ui.item.index());
                },
                update: function( event, ui ) {
                    var oldIndex = $(this).attr('data-previndex') + "";
                    var newIndex = ui.item.index() + "";
                    var url = "/page/"+pageId+"/widget?initial="+oldIndex+"&final="+newIndex;
                    widgetService
                        .orderWidgets(url)
                        .then(function (response) {
                            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                        });
                }
            });

        }

        return {
            link: linkFunction
        }

    }


})();

