/**
 * Created by ryankalla on 5/24/17.
 */
(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);

    function flickrService($http) {
        this.searchPhotos = searchPhotos;


        var key = "cbed0908110f0f10ad8f1f97cc2b283d";
        var secret = "ff511703f42f11bc";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }



    }

})();
