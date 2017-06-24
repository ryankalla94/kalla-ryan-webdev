/**
 * Created by ryankalla on 6/22/17.
 */

(function () {

    angular
        .module('MapApp')
        .service('pinService', pinService);



    function pinService($http) {
        this.createPin = createPin;
        this.findPinsForUser = findPinsForUser;
        this.findPinById = findPinById;
        this.updatePin = updatePin;
        this.deletePin = deletePin;
        this.addComment = addComment;
        this.getRestaurants = getRestaurants;

        function createPin(userId, pin){
            var url = '/api/project/user/'+ userId +'/pin';
            return $http.post(url, pin)
                .then(function (response){
                    return response.data;
                });
        }

        function findPinsForUser(userId){
            var url = '/api/project/user/'+ userId +'/pin';
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function findPinById(pinId){
            var url = '/api/project/pin/' + pinId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }


        function updatePin(pinId, pin){
            var url = '/api/project/pin/' + pinId;
            return $http.put(url, pin)
                .then(function (response){
                    return response.data;
                });
        }

        function deletePin(pinId){
            var url = '/api/project/pin/' + pinId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
        }

        function addComment(pinId, comment){
            var url = '/api/project/pin/' + pinId + '/comment';
            return $http.post(url, comment)
                .then(function (response){
                    return response.data;
                });
        }

        function getRestaurants(lat, lng){

            console.log("test");

            var googleUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
            googleUrl += "location=" + lat + "," + lng;
            googleUrl += "&radius=200&type=restaurant&key=AIzaSyA9lgvIli9MSMufacGSus0ZqLtHKSk1UJA";
            return $http.get(googleUrl)
                .then(function(restaurants){

                    console.log(restaurants);

                    return restaurants;
                })
        }

    }

})();