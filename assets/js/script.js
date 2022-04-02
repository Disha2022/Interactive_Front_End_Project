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
    map = new google.maps.Map(mapArea, options)
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
