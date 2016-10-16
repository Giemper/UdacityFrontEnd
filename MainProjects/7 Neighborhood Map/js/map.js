// 'map.js' handles all the calls and request to
// the Google Maps API.

var map;
var infoWindow;
var bounds;
var path;

// initMap() is the callback function when the API is requested.
function initMap() {
    var Styles = [];
    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    // getStyles() reads and parses the Custom Map Styles
    // made with https://snazzymaps.com/.
    // The style is found in 'map_styles.json'.
    function getStyles () {
        $.getJSON("json/map_styles.json", function (data) {
            data.forEach(function (block) {
                Styles.push(block);
            });
        }).always(function(){
            // Sets the initial values for the displayed map.
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 45.500618, lng: -73.599700 },
                zoom: 13,
                styles: Styles
            });
            
            // getPoints reads the metro.json
            getPoints();
        });
    }
    
    // getPoints() reads and parses through all the metro locations
    // The locations are found in 'metro.json'. 
   function getPoints() {
        $.getJSON("json/metro.json", function (data) {
            data.forEach(function (block, index) {
                vm.points.push(block);
                vm.list.push(block);
                vm.points()[index].index = index;
            });

            // For each element it creates a marker, and draws it in the map.
            vm.points().forEach(function (point, index) {
                if(point.lat !== 0){
                    vm.pins().push(new vm.Pin(point));

                    // Creates a click event for each marker.
                    // If clicked, the marker is focused on the map, and opens
                    // it's infowindow.
                    vm.pins()[index].marker.addListener('click', function () {
                        map.setZoom(13);
                        map.setCenter(this.getPosition());
                        openInfoWindow(this);
                    });
                    bounds.extend(vm.pins()[index].marker.position);
                }
            });   
            map.fitBounds(bounds);
        })

        // If the JSON cannont be accessed, it displays a warning prompt.
        .fail(function (){
            $(".warning-off").toggleClass("warning-off");
            $("#warning").text("Map points couldn't be loaded.");
        });
    }

    //Initiates the drawing of the map
    getStyles();
}

function errorMap() {
    $(".warning-off").toggleClass("warning-off");
    $("#warning").text("Google Maps couldn't be loaded.");
}

// openInfoWindow handles the information and position
// of an infoWindow, and assigns it to the respective
// marker. 
function openInfoWindow(marker) {
    if (infoWindow.marker != marker) {
        //If a previous infowindow is already open, 
        //remove the animation.
        if (infoWindow.marker)
            infoWindow.marker.setAnimation(null);
        
        // NOT IN USE
        // getImage returns the first result of a 
        // Google Image Custom Search using Google CSE API.
        // getImage(marker.title, apiKey);

        // getFlickr returns an ugly photo using
        // Flickr API. That's about it.
        getFlickr(marker.title);

        infoWindow.marker = marker;
        infoWindow.setContent('<h3>Loading</h3>');
        infoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function () {
            marker.setAnimation(null);
        });
    }
}

// drawPath() draws a colored line when an specific
// colored metro line is selected. drawPath() makes sure
// to draw the path of the metro in order.
function drawPath (coor, select) {
    var color;
    if(select === 'blue')
        color = '#1252ba';
    else if (select === 'green')
        color = '#14910b';
    else if (select === 'yellow')
        color = '#ffef66';
    else if (select === 'orange')
        color = '#f9a913';

    coor.sort(function (a, b) {
        if (a.id > b.id)
            return 1;
        if (a.id < b.id)
            return -1;
        return 0;
    });

    var route = [];
    coor.forEach(function(data) {
        route.push(data.position);
    });

    path = new google.maps.Polyline({
        path: route,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 6
    });

    //Adds the path to the map
    path.setMap(map);
}

//Resizes the map when the window change size
window.onresize = function() {
    map.fitBounds(bounds);
}

//Creates and applies a ViewModel using KnockoutJS
ko.applyBindings(vm = new ViewModel());
