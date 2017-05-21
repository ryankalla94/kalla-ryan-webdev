/**
 * Created by ryankalla on 5/21/17.
 */

// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'Adddddddddd';
var labelIndex = 0;

function initialize() {
    //var bangalore = { lat: 12.97, lng: 77.59 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(37.09024, -95.712891),
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, "click-test", map);
    });


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        console.log("show position test");
        var lat = position.coords.latitude.toFixed(2);
        var lng = position.coords.longitude.toFixed(2);
        addMarker(new google.maps.LatLng(lat,lng), "ryan-test", map);
    }

    getLocation();



    // Add a marker at the center of the map.
    //addMarker(bangalore, map);
}

// Adds a marker to the map.
function addMarker(location, label, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: label,
        map: map
    });
}
