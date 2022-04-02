var overlay = $('#overlay')
var closeBtn = $('#close-modal')
var searchBtn = $('#search-btn')
var searchForm = $('#search-form')
var cancelBtn = $('#cancel-btn')
var mapArea = document.getElementById("map")
var searchInput = document.getElementById('user-search')
var infowindow;
var map;
var service;



var request = {
    query: '',
    fields: ['name', 'geometry', 'rating'],
    types: ['restaurant']
}

function addSearchInput(){
    var Location= searchInput.value
   address= Location
}

function initGoogle() {
    var location = {
        lat: 40.000,
        lng: -79.000
    }
    var options = {
        center: location,
        zoom: 9
    }

    if(navigator.geolocation) {
        console.log('geolocation is here!');

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            map = new google.maps.Map(mapArea, options);
            infowindow= new google.maps.InfoWindow();
        },
        (err) => {
            console.log('user blocked')
            map = new google.maps.Map(mapArea, options);
            infowindow= new google.maps.InfoWindow()
        })
    } else{
        console.log('geolocation not supported boo!')
        map = new google.maps.Map(mapArea, options)
        infowindow= new google.maps.InfoWindow()
    }
    
}
 
function SearchLocation(){
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
        }
    })
}

function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name);
      infowindow.open(map);
    });
  }
  



searchForm.submit(function(e){
    e.preventDefault();
})

function AppearModal(){
        overlay.removeClass('hidden').addClass('flex')
}
function DissapearModal(){
    overlay.removeClass('flex').addClass('hidden')
}


searchInput.addEventListener('keyup', addSearchInput)
searchBtn.on('click', AppearModal)
closeBtn.on('click', DissapearModal)
cancelBtn.on('click', DissapearModal)
searchBtn.on('click', SearchLocation)

