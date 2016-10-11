var ViewModel = function () {
    this.points = ko.observableArray([
        {
            name: "Square-Victoria-OACI",
            lat: 45.501723,
            lng: -73.564006,
            location: { lat: 45.501723, lng: -73.564006}
        }, {
            name: "Bonaventure",
            lat: 45.498025,
            lng: -73.566839,
            location: { lat: 45.501723, lng: -73.564006}
        }, {
            name: "Lucien-L'Allier",
            lat: 45.495051, 
            lng: -73.570938,
            location: { lat: 45.501723, lng: -73.564006}
        }, {
            name: "Georges-Vanier",
            lat: 45.488909,
            lng: -73.576502,
            location: { lat: 45.501723, lng: -73.564006}
        }
    ]);
}

ko.applyBindings(vm = new ViewModel());