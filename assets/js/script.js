var overlay = $('#overlay')
var closeBtn = $('#close-modal')
var searchBtn = $('#search-btn')
var searchForm = $('#search-form')
var cancelBtn = $('#cancel-btn')
var mapArea = document.getElementById("map")

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
searchBtn.on('click', AppearModal)
closeBtn.on('click', DissapearModal)
cancelBtn.on('click', DissapearModal)
