/**
 * Created by ryankalla on 5/21/17.
 */

(function(){
    angular
        .module("MapApp")
        .controller('pinController', pinController);



    function pinController(pinService, $routeParams, $location, currentUser){

        var model = this;
        model.userId = currentUser._id;
        model.pinId = $routeParams.pinId;

        model.addMarker = addMarker;
        model.showAddress = showAddress;
        model.test = function(){};
        model.currentMarker = null;

        model.currentUser = currentUser;
        model.deletePin = deletePin;
        model.deleteComment = deleteComment;


        model.addComment = addComment;

        model.error = null;
        model.pinName = "";
        model.pinComment = "";

        model.restaurants = [];

        model.getRestaurantDetails = getRestaurantDetails;


        function init(){

            model.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: new google.maps.LatLng(37.09024, -95.712891)
            });

            model.geocoder = new google.maps.Geocoder;

            pinService
                .findPinById(model.pinId)
                .then(function (pin){
                    model.pin = pin;
                    model.pinName = model.pin.name;
                    var position = new google.maps.LatLng(model.pin.lat, model.pin.lng);
                    addMarker(position, "", model.map);
                    model.map.setCenter(position);
                    model.map.setZoom(15);

                    var request = {
                        location: position,
                        radius: '5000',
                        types: ['restaurant']
                    };

                    model.service = new google.maps.places.PlacesService(model.map);
                    model.service.nearbySearch(request, renderRestaurants);

                    function renderRestaurants(results, status) {
                        model.restaurants = results;
                        document.getElementById('hiddenButton').click();
                    }



                });




            model.infowindow = new google.maps.InfoWindow;



        }
        init();


        function deletePin(){
            pinService
                .deletePin(model.pinId)
                .then(function(){
                    $location.url("/");
                });
        }

        function deleteComment(comment){
            pinService
                .deleteComment(model.pinId, comment._id)
                .then(function(){
                    pinService
                        .findPinById(model.pinId)
                        .then(function (pin) {
                            model.pin = pin;
                        })
                })
        }

        function getRestaurantDetails(restaurant){
            var request = {
                placeId: restaurant.place_id
            };

            model.service.getDetails(request, renderDetails);

            function renderDetails(place, status){
                model.restaurant = place;
                document.getElementById('hiddenButton').click();
            }

        }



        function addComment(comment){

            var commentObj = {
                _id : (new Date()).getTime() + "",
                user : currentUser.username,
                text : comment
            };

            pinService
                .addComment(model.pinId, commentObj)
                .then(function(){
                    pinService
                        .findPinById(model.pinId)
                        .then(function (pin) {
                            model.pin = pin;
                        })
                })
        }



        function showAddress(){
            if(model.currentMarker){
                var latlng = model.currentMarker.position;
                geocodeLatLng(model.geocoder, model.map, latlng);
            } else {
                console.log("no marker");
            }

        }


        function geocodeLatLng(geocoder, map, latlng) {
            geocoder.geocode({'location': latlng}, function(results, status){
                if (status === 'OK') {
                    if (results[0]) {
                        model.address = results[0].formatted_address;
                        document.getElementById('hiddenButton').click();
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        function removeMarker(marker){
            marker.setMap(null);
        }


        // Adds a marker to the pin.
        function addMarker(location, label, map) {
            // Add the marker at the clicked location, and add the next-available label
            // from the array of alphabetical characters.

            if(model.currentMarker){
                removeMarker(model.currentMarker);
            }

            model.currentMarker = new google.maps.Marker({
                position: location,
                label: label,
                map: map
            });

            showAddress();
        }


    }

})();




