var ViewModel = function () {
    this.pins = ko.observableArray([]);
    var gpins = this.pins;
    this.points = ko.observableArray([]);

    this.Pin = function (Title, Latitude, Longitude, Value, Index) {
        this.id = Index;
        this.color = Value;
        this.marker = new google.maps.Marker({
            position: { lat: Latitude, lng: Longitude },
            map: map,
            icon: colorMarker(Value),
            animation: google.maps.Animation.DROP,
            title: Title
        });
    }

    $("#lines").change(function () {
        bounds = new google.maps.LatLngBounds();
        var selected = $("#lines option:selected").val();
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

        gpins().forEach(function (pin) {
            if (pin.color.includes(selected) || selected === "all") {
                pin.marker.setVisible(true);
                bounds.extend(pin.marker.position);
            }
            else
                pin.marker.setVisible(false);
            pin.marker.setAnimation(google.maps.Animation.DROP);
        });
        map.fitBounds(bounds);
        infoWindow.close();
    });

    this.listClick = function (element) {
        openInfoWindow(gpins()[element.index].marker);
    }
}

function openInfoWindow(marker) {
    if (infoWindow.marker != marker) {
        if (infoWindow.marker)
            infoWindow.marker.setAnimation(null);

        infoWindow.marker = marker;
        infoWindow.setContent('<h3>' + marker.title + '</h3>');
        infoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, marker);

        infoWindow.addListener('closeclick', function () {
            marker.setAnimation(null);
        });
    }
}

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

ko.applyBindings(vm = new ViewModel());

$("#clicker").click(function () {
    $("#leftline").toggleClass("menu-on");
    $("#leftline").toggleClass("menu-off");
    $("#content").toggleClass("content-on");
    $("#content").toggleClass("content-off");
    $("#top-content").toggleClass("top-content-on");
    $("#top-content").toggleClass("top-content-off");
});
    