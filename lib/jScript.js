 // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var placeSearch, autocomplete;
      var infowindow, map;
     
        
      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
          
        initMap()
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);
      }

      function fillInAddress() {
         
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();
          console.log("===",place);
          var addr = place.formatted_address;
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          
          console.log("---address is %s latitude is %s & longitude is %s ",addr,lat,lng);
          
           var geolocation = {
              lat: lat,
              lng: lng
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: 2000
            });
          
          var request = {
 /*   location: lat,lng,*/
    bounds: circle.getBounds(),
    types: ['atm']
  };

   infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);


function callback(results, status) {
    
    document.getElementById("mytable").innerHTML = "";
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
        createMarker(place);
        var tbody = document.createElement('tbody')
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        
        var img = document.createElement('img');
        img.setAttribute('src',"images/atm.jpg");
        td3.appendChild(img);
        td1.innerHTML="<h4>"+place.name+"</h4>"
        td2.innerHTML="<h4>"+place.vicinity+"</h4>"
    
        tr.appendChild(td3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
       
        document.getElementById("mytable").appendChild(tbody);


      console.log("my atmssssss..are",place);
    }
      
     
  }

}


           function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

          
   

      
}        // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
          console.log("i am geolocate");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
              //console.log("radius is  :",circle.radius);
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }
        
 
             function initMap() {
        var uluru = {lat: 28.5667256, lng: 77.1399658};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }