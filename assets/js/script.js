var overlay = $('#overlay')
var closeBtn = $('#close-modal')
var searchBtn = $('#search-btn')
var searchForm = $('#search-form')
var cancelBtn = $('#cancel-btn')
var mapArea = document.getElementById("map")
var searchInput = document.getElementById('user-search')

var request = {
    query: '',
    fields: ['name', 'geometry', 'rating']
}

function addSearchInput(){
    var Location= searchInput.value
   request.query= Location
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
        },
        (err) => {
            console.log('user blocked')
            map = new google.maps.Map(mapArea, options);
        })
    } else{
        console.log('geolocation not supported boo!')
        map = new google.maps.Map(mapArea, options)
    }
    
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

