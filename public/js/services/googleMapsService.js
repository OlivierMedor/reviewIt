var app = angular.module('rateIt');
app.service('Map', function($q, $window) {

    var map, places, marker;
    var location;    
    
    this.init = function() {
    
    
        
        $window.navigator.geolocation.getCurrentPosition(function(position){
            
            location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            
            // var defaultBounds = new google.maps.LatLngBounds(
            //     new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            //     new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            var newOptions = {
                // bounds: defaultBounds,
                types: ['establishment']
            };
            var newInput = document.getElementById('pac-input');
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(newInput);
            this.autocomplete = new google.maps.places.Autocomplete(newInput, newOptions);
            
            var options = {
                center: location,
                zoom: 17,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.SATELLITE   
            }
            map = new google.maps.Map(
                document.getElementById("map"), options
            );
            places = new google.maps.places.PlacesService(map);
        });

        
    }
    
    this.search = function(str) {

    
        var d = $q.defer();
        places.nearbySearch({keyword: str, location: location, radius: 20000}, function(results, status) {

            if (status === 'OK') {
                
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(marker) marker.setMap(null);
        marker = new google.maps.Marker({
            draggable:true,
            map: map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', toggleBounce);
        map.setCenter(res.geometry.location);
    }
    function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
    
});

