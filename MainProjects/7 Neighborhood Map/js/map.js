var map;
var pins = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.500618, lng: -73.599700 },
        zoom: 13
    });

    function Information(marker, infowindow) {
        //FIX THIS
    }

    var Pin = function (Title, Latitude, Longitude) {
        var marker = new google.maps.Marker({
            position: { lat: Latitude, lng: Longitude },
            map: map,
            animation: google.maps.Animation.DROP,
            title: Title
        });

        var infoWindow = new google.maps.InfoWindow({
            content: '<div>' +
            '<h3>' + Title + '</h3>'
            + '</div>'
        });

        marker.addListener('click', function () {
            // infoWindow.open(map, marker);
            // marker.setAnimation(google.maps.Animation.BOUNCE);
            Information(this, infoWindow);
        });
    }

    // var bounds = new google.maps.LatLngBounds();
    vm.points().forEach(function (point) {
        console.log(point.name);
        pins.push(new Pin(point.name, point.lat, point.lng));
        // bounds.extend(point.location);
    });
    // map.fitBounds(bounds);
}