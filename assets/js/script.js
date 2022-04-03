var overlay = $('#overlay');
var closeBtn = $('#close-modal');
var searchBtn = $('#search-btn');
var searchForm = $('#search-form');
var cancelBtn = $('#cancel-btn');
var searchInput = document.getElementById('user-search');

const request ={
    location: new google.maps.LatLng(51.5287352, -0.3817841),
    radius: 5000,
    type: ['restaurant']
};
const results = [];
const places = document.getElementById('places')
const service = new google.maps.places.PlacesService(places)

service.nearbySearch(request, callback);

function callback(response, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.push(...response);
    }

    if (pagination.hasNextPage){
        setTimeout(() => pagination.nextPage(), 2000);
    } else {
        displayResults();
    }
}

function displayResults(){
    results.filter(result => result.rating)
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .forEach(result => {
        places.innerHTML += `<li>${result.name} - ${result.rating}</li>`
    })
}



function addSearchInput(){
    var Location= searchInput.value

}



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

