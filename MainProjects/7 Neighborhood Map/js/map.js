var map;
var infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.500618, lng: -73.599700 },
        zoom: 13,
        styles: Styles
    });
    
    infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    vm.points().forEach(function (point) {
        if(point.id !== undefined){
            vm.pins()[point.id] = new vm.Pin(point.name, point.lat, point.lng);
            vm.pins()[vm.pins().length - 1].marker.addListener('click', function () {
                // if (infoWindow.marker != this) {
                //     if(infoWindow.marker)
                //         infoWindow.marker.setAnimation(null);

                //     infoWindow.marker = this;
                //     infoWindow.setContent('<h3>' + this.title + '</h3>');
                //     infoWindow.marker.setAnimation(google.maps.Animation.BOUNCE);
                //     infoWindow.open(map, this);
                    
                //     infoWindow.addListener('closeclick',function(){
                //         this.marker.setAnimation(null);
                //     });
                // }
                openInfoWindow(this);
            });
            bounds.extend(vm.pins()[vm.pins().length - 1].marker.position);
        }
    });

    map.fitBounds(bounds);
}