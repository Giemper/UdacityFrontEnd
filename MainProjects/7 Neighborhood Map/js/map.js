var map;
var infoWindow;
var bounds;

function initMap() {
    var Styles = [];
    infoWindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    function getStyles () {
        $.getJSON("json/map_styles.json", function (data) {
            data.forEach(function (block) {
                Styles.push(block);
            });
        }).always(function(){
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 45.500618, lng: -73.599700 },
                zoom: 13,
                styles: Styles
            });
            getPoints();
        });
    }
    
   function getPoints() {
        $.getJSON("json/metro.json", function (data) {
            data.forEach(function (block, index) {
                vm.points.push(block);
                vm.points()[index].index = index;
            });

            vm.points().forEach(function (point, index) {
                if(point.lat !== 0){
                    vm.pins().push(new vm.Pin(point.name, point.lat, point.lng, point.value, points.index));
                    vm.pins()[index].marker.addListener('click', function () {
                        map.setZoom(13);
                        map.setCenter(this.getPosition());
                        openInfoWindow(this);
                    });
                    bounds.extend(vm.pins()[index].marker.position);
                }
            });
            
            map.fitBounds(bounds);
        }).fail(function (){
            $(".warning-off").toggleClass("warning-off");
            $("#warning").text("Map points couldn't be loaded.");
        });
    }

    getStyles();
}