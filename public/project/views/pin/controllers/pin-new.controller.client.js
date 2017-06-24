/**
 * Created by ryankalla on 5/21/17.
 */

(function(){
    angular
        .module("MapApp")
        .controller('pinNewController', pinNewController);



    function pinNewController(pinService, $routeParams, $location, currentUser){

        var model = this;
        model.userId = currentUser._id;

        model.createPin = createPin;

        model.getLocation = getLocation;
        model.showPosition = showPosition;
        model.addMarker = addMarker;
        model.showAddress = showAddress;
        model.test = function(){};

        model.pin = {};

        model.error = null;

        model.pinName = "";
        model.pinPrivacy = "Public";


        function init(){



            model.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: new google.maps.LatLng(37.09024, -95.712891)
            });


            model.geocoder = new google.maps.Geocoder;

            model.currentMarker = null;

            model.infowindow = new google.maps.InfoWindow;


            // This event listener calls addMarker() when the pin is clicked.
            google.maps.event.addListener(model.map, 'click', function(event) {
                addMarker(event.latLng, "", model.map);
            });


        }
        init();

        function createPin(pin){
            if(!model.currentMarker){
                model.error = "need to choose a marker";
                return;
            }
            if(model.pinName === ""){
                model.error = "pin needs a name";
                return;
            }
            model.pin.lat  = model.currentMarker.position.lat();
            model.pin.lng = model.currentMarker.position.lng();
            model.pin.name = model.pinName;
            model.pin.privacy = model.pinPrivacy.toUpperCase();
            pinService
                .createPin(model.userId, model.pin)
                .then(function(){
                    $location.url("/pin");
                });
        }


        function getLocation() {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var location = new google.maps.LatLng(lat,lng);
            addMarker(location, "", model.map);
            model.map.panTo(location);
            smoothZoom(model.map, 15, 4);
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

        function smoothZoom (map, max, cnt) {
            if (cnt >= max) {
                return;
            }
            else {
                z = google.maps.event.addListener(map, 'zoom_changed', function(event){
                    google.maps.event.removeListener(z);
                    smoothZoom(map, max, cnt + 1);
                });
                setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
            }
        }




    }

})();



