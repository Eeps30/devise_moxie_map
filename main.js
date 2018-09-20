$(document).ready(function() {
  initMap();
})

//Initialize Map and Autocomplete
function initMap() {
  var myLatlng = {lat: 0, lng: 0};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 33.888504, lng: -117.813255},
    zoom: 12
  });

  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  })

  var markers = [];

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    //Clear out the old Markers
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    //For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach((function(place) {
      if(!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      //Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }));
      map.fitBounds(bounds);
    });
  }

  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map
  // });

  // var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));

  // google.maps.event.addListener(searchBox, 'places_changed', function() {
  //   var places = searchBox.getPlaces();

  //   var bounds = new google.maps.LatLngBounds();
  //   var i, place;

  //   for(i=0; place=places[i]; i++){
  //     bounds.extend(place.geometry.location);
  //     marker.setPosition(place.geometry.location);
  //   }

  //   map.fitBounds(bounds);
  //   map.setZoom(12);
  // })
