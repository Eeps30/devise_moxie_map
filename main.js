$( document ).ready(function() {
    createView();
});

function createView () {
    new storeLocator.View(map, dataFeed);
    var features = new storeLocator.FeatureSet(feature1, feature2, feature3);
    new storeLocator.View(map, dataFeed, {
    markerIcon: 'icon.png',
    features: features,
    geolocation: false
    });
    // refresh stores every 10 seconds, regardless of interaction on the map.
    var view = new storeLocator.View(map, dataFeed, {
    updateOnPan: false
    });
    setTimeout(function() {
    view.refreshView();
    }, 10000);
    // custom MarkerOptions, by overriding the createMarker method.
    view.createMarker = function(store) {
    return new google.maps.Marker({
        position: store.getLocation(),
        icon: store.getDetails().icon,
        title: store.getDetails().title
    });
    };
}
