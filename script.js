
var map;
var latLng = {lat: -25.363, lng: 131.044};
      function initMap() {

        console.log(document.getElementById('map'));
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 2
        });

        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: 'Hello World!'
        });
      }
