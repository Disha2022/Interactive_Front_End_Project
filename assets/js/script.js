var overlay = $('#overlay');
var closeBtn = $('#close-modal');
var searchBtn = $('#search-btn');
var searchForm = $('#search-form');
var cancelBtn = $('#cancel-btn');
var confirmBtn = $('#confirm-btn');
var searchInput = document.getElementById('user-search');
var request ={
    location: {lat: 28.6024, lng: -81.2001},
    radius: 5000,
    type: ['restaurant']
};


function searchForAddress(){


    const results = [];
    const places = document.getElementById('places')


    const service = new google.maps.places.PlacesService(places);
    service.nearbySearch(request, callback);

    function callback(response, status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        results.push(...response);
    }

    if (pagination.hasNextPage){
        setTimeout(() => pagination.nextPage(), 2000);
    } else {
        displayResults();
        DissapearModal();
        searchInput.value=''
    }
}


    function displayResults(){
    results.filter(result => result.rating)
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .forEach(result => {
        places.innerHTML += `<li>${result.name} - ${result.rating}</li>`
    })
}
}

function initialize(){
    geocoder = new google.maps.Geocoder();
}

function codeAddress() {
    var address = searchInput.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {

       request.location.lat= results[0].geometry.location.lat()
       request.location.lng= results[0].geometry.location.lng()
      }
      else{
          alert('Error: Please Enter Valid Address')
      }
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

function insertModalAddress(){
    var modalText = searchInput.value
    document.getElementById('modal-text').textContent='Is ' + modalText + ' the correct address?'
}


searchInput.addEventListener('keyup', insertModalAddress)
confirmBtn.on('click', searchForAddress)
searchBtn.on('click', AppearModal)
searchBtn.on('click', codeAddress)
closeBtn.on('click', DissapearModal)
cancelBtn.on('click', DissapearModal)

