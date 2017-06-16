/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);

    function widgetListController($sce, currentUser, $routeParams, $location, widgetService) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.widgetUrl = widgetUrl;


        function init(){
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(renderWidgets);

            function renderWidgets(widgets){
                model.widgets = widgets;
            }
        }
        init();

        function trust(html){
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(linkUrl){
            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function widgetUrl(widget){
            var url = 'views/widget/templates/widget-' + widget.type.toLowerCase() + '.view.client.html';
            return url;
        }


    }
})();