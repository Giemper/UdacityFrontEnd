var ViewModel = function () {
    this.pins = ko.observableArray([]);

    this.Pin = function (Title, Latitude, Longitude) {
        this.marker = new google.maps.Marker({
            position: { lat: Latitude, lng: Longitude },
            map: map,
            animation: google.maps.Animation.DROP,
            title: Title
        });


    }

    this.points = ko.observableArray([]);
    var p = this.points;
    $.getJSON("json/metro.json", function (data) {
        data.forEach(function (block) {
            p.push(block);
        });
    });

    $("#lines").change(function () {
        var selected = $("#lines option:selected").val();
        if(selected === "all"){
            $(".dropPin").show();
            return;
        }
        $(".dropPin").each(function () {
            if ($(this).prop('title').includes(selected))
                $(this).show();
            else
                $(this).hide();
        });
    });

    var gpins = this.pins;
    this.listClick = function (element) {
        openInfoWindow(gpins()[element.id].marker);
    }
}

var Styles = [];
$.getJSON("json/map_styles.json", function (data) {
    data.forEach(function (block) {
        Styles.push(block);
    });
});

function openInfoWindow(marker) {
    if (infoWindow.marker != marker) {
        if(infoWindow.marker)
            infoWindow.marker.setAnimation(null);

        infoWindow.marker = marker;
        infoWindow.setContent('<h3>' + marker.title + '</h3>');
        infoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, marker);
        
        infoWindow.addListener('closeclick',function(){
            marker.setAnimation(null);
        });
    }
}


ko.applyBindings(vm = new ViewModel());