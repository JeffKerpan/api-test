var map;
var latLng = {
  lat: -25.363,
  lng: 131.044
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644
    },
    zoom: 2
  });
}


var $body = $('Body');

function getData (event) {
  event.preventDefault();
  let $startDate = $('#startDate').val();
  let $endDate = $('#endDate').val();
  let $magnitude = $('#magnitude').val();
  let string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime='+ $startDate + '&endtime=' + $endDate + '&minmagnitude=' + $magnitude;

  var $xhr = $.getJSON(string);

  $xhr.done(function(data) {

      $.each(data.features, function(){
        let $element = $('<div>');
        let $time = new Date(this.properties.time);
        let $mag = this.properties.mag;
        let $place = this.properties.place;
        let $lat = this.geometry.coordinates[1];
        let $long = this.geometry.coordinates[0];
        let $placetag = $('<p>');
        $placetag.append($('<span>').html('Location: '));
        $placetag.append($('<span>').html($place));
        $element.append($placetag);
        let $timetag = $('<p>');
        $timetag.append($('<span>').html('Time: '));
        $timetag.append($('<span>').html($time));
        $element.append($timetag);
        let $magtag = $('<p>');
        $magtag.append($('<span>').html('Magnitude: '));
        $magtag.append($('<span>').html($mag));
        $element.append($magtag);
        let $coords = $('<p>');
        $coords.append($('<span>').html('Lattitude: '));
        $coords.append($('<span>').html($lat));
        $coords.append($('<span>').html('Longitude: '));
        $coords.append($('<span>').html($long));
        $element.append($coords);
        $body.append($element);

        var latLng = new google.maps.LatLng($lat,$long);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      });
  });
  $xhr.fail(function(err) {
      console.log(err);
  });
}

$('#userInput').on('submit', getData);
