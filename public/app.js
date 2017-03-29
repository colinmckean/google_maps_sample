var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
};


MapWrapper.prototype = {
  addMarker: function(coords){
    var infowindow = new google.maps.InfoWindow({
      content:"<h1>London</h1> \n <p>London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city. " +
      "</br><strong>Population:</strong> 8.674 million (2015)"+
      "</br><strong>Area:</strong> 1,572 km²"+
      "</br><strong>Founded:</strong> 43 AD</p>"
    });
    var marker = new google.maps.Marker({ 
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(this.googleMap,marker);
    });
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, "click", function(event){
      this.addMarker({ lat: event.latLng.lat(),lng: event.latLng.lng() });
    }.bind(this));
  }
};


var changeCenter = function (mainMap,coords) {
  mainMap.googleMap.setCenter(coords);
  mainMap.addMarker(coords);
};

var app = function () {
  var containter = document.getElementById("main-map");
  var center = { lat: 51.5074 , lng:-0.1278 };
  var zoom = 10;
  var mainMap = new MapWrapper(containter, center, zoom);

  mainMap.addMarker(center);
  mainMap.addClickEvent();
  
  document.querySelector("#magicButton").addEventListener('click',function(){
    var chicago = { lat: 41.878114, lng: -87.629798}
    changeCenter(mainMap, chicago);
  });

  document.querySelector("#findMeButton").addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var youAreHere = { lat: position.coords.latitude , lng: position.coords.longitude }
      changeCenter(mainMap, youAreHere);
    });
  });
};

window.onload = app;