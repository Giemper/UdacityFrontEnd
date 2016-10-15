// 'app.js' mainly manages the ViewModel of the app itself, and 
// a few other generic functions.

//var ViewModel handles all the functions and objects used with KnockoutJS
var ViewModel = function () {
    // this.points reads the contents of 'json/metro.json'.
    // 'metro.json' contains the arrays of every metro of
    // Montreal, QC, Canada. this.points does two main things:
    // feed this.pins (markers) and the metro list on the app.
    this.points = ko.observableArray([]);

    // var gpins (used in functions) and this.pins (local) are
    // the markers that appear on the map. While the markers are
    // created and stored in the ViewModel, they're managed completely
    // by the Google Map API at map.js
    var gpins = this.pins = ko.observableArray([]);
    
    // this.Pin is the marker 'class'.
    // Contains 'id' that helps parse and select an specific marker
    // 'color' is a string that specifies the line(s) the station is at.
    // 'marker' is a google.maps.Marker object that assigns the necessary
    // components to create a marker. 
    this.Pin = function (point) {
        this.id = point.index;
        this.color = point.value;
        this.line = point.line;
        this.marker = new google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            icon: colorMarker(point.value),
            animation: google.maps.Animation.DROP,
            title: point.name
        });
    }

    // this.linesChange handles the 'change' event of the #lines dropdown menu
    this.linesChange = function(){
        bounds = new google.maps.LatLngBounds();
        if(path !== undefined)
            path.setMap(null);
        var selected = $("#lines option:selected").val();
        var coordinates = [];

        // This makes sure of displaying the selected metro points in the sidebar list.
        if (selected === "all") {
            $(".dropPin").show();
        }
        else {
            $(".dropPin").each(function () {
                if ($(this).prop('title').includes(selected))
                    $(this).show();
                else
                    $(this).hide();
            });
        }

        // This makes sure of displaying the markers on the map.
        gpins().forEach(function (pin) {
            if (pin.color.includes(selected) || selected === "all") {
                pin.marker.setVisible(true);
                bounds.extend(pin.marker.position);
                if(selected !== "all") {
                    //Filters the color and order of the metro points
                    var i = pin.line.find(function(data) { return data.color === selected; });
                    coordinates.push({
                        id: i.id,
                        position: pin.marker.position
                    });
                }
            }
            else
                pin.marker.setVisible(false);

            //Adds a nice DROP animation to indicate that a change has been made
            pin.marker.setAnimation(google.maps.Animation.DROP);

        });

        //Draws a color path through the metro lines
        drawPath(coordinates, selected);

        //Focus the display on the specific pins
        map.fitBounds(bounds);

        //Closes any open infoWindow to avoid inconsistencies
        infoWindow.close();
    }

    // this.listClick listens to the click of an item in the sidebar list.
    // It zooms and center the focus unto the selected marker, and
    // opens and infoWindow with it's respective info.
    this.listClick = function (element) {
        map.setZoom(13);
        map.setCenter(gpins()[element.index].marker.getPosition());
        openInfoWindow(gpins()[element.index].marker);
    }

    // Enables market bounce when the mouse is over a list item in the sidebar.
    this.enableBounce = function (element) {
        gpins()[element.index].marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    // Disables market bounce when the mouse is out of a list item in the sidebar.
    this.disableBounce = function (element) {
        gpins()[element.index].marker.setAnimation(null);
    }

    // var toggle (functions) and this.toggle (local) handles
    // the status of the sidebar menu. 
    // this.clicker listens to the clicks to open or close
    // the sidebar menu.
    var toggle = this.toggle = ko.observable(true);
    this.clicker = function() {
        if(toggle())
            toggle(false);  
        else
            toggle(true);
    }
}

// Assigns the respective color to a marker.
// Icons are pulled from the Google Map Resources.
function colorMarker(value) {
    var color;
    if (value === "orange")
        color = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
    else if (value === "green")
        color = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    else if (value === "blue")
        color = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    else if (value === "yellow")
        color = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    else
        color = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'

    var icon = new google.maps.MarkerImage(color);
    return icon;
}

//Created and applies a ViewModel using KnockoutJS
ko.applyBindings(vm = new ViewModel());   