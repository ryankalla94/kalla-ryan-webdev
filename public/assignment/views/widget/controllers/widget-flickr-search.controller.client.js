/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .controller('flickrImageSearchController', flickrImageSearchController);

    function flickrImageSearchController($routeParams, currentUser, flickrService, widgetService, $location) {
        var model = this;

        model.userId = currentUser._id;
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;


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


        function searchPhotos(searchTerm){
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });

        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            model.widget.url = url;
            model.widget.width = "100%";
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function(){
                    $location.url('/user/' + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
        }



    }
})();