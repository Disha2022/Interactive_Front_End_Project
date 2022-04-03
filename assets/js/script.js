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

// Searches for restaurants within a radius around a coordinate
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

// Sorts results by rating biggest to smallest
    function displayResults(){
    results.filter(result => result.rating)
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .forEach(result => {
        places.innerHTML += `<li>${result.name} - <span class="text-yellow-200">Rating: ${result.rating}&#9734;</span></li>`
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


// retreives info from the weather api and then passes it to fill weather data...............
var DisplayWeather = function(lat, long){
    var apiAdress = 
        "https://api.openweathermap.org/data/2.5/onecall?lat="
        +lat+"&lon="+long+"&exclude=hourly,daily,alerts,minutely&units=imperial&appid=ec93ec889e22ec6a9e1c57a53cc4c613";
    var weather = fetch(apiAdress).then(function(response){
        response.json().then(function(data){
             FillWeatherData(data.current);
        });
    });
}

// ..........adds weather info to its appropriate section in the weather div............
var  FillWeatherData = function(data){
    var weatherEl = $("#myweather");
    dataField =  weatherEl.children("p");
    //pick the correct cloud img.
    var cloudInfo = data.weather[0]
    var CloudEl = $("#cloud");
    var cloudimg = "http://openweathermap.org/img/wn/"
        +cloudInfo.icon+"@2x.png";
    CloudEl.attr({
        src: cloudimg,
       alt: cloudInfo.description
    });

    FillDataField(dataField[0],data.temp +String.fromCharCode(176)+"F"); 
    FillDataField(dataField[1],data.wind_speed +" mph");
    FillDataField(dataField[2],data.humidity+"%");

}

// fills each individual field with the given data
var FillDataField = function(element, data)
{
    var text = element.innerText;
    var numberLoc =  element.innerText.match(/\d/);
    if (numberLoc){
        element.innerText = element.innerText.substring(0,numberLoc.index)+ data
    }
    else
        element.textContent += data;
}

//DisplayWeather(0,0);

searchInput.addEventListener('keyup', insertModalAddress)
confirmBtn.on('click', searchForAddress)
searchBtn.on('click', AppearModal)
searchBtn.on('click', codeAddress)
closeBtn.on('click', DissapearModal)
cancelBtn.on('click', DissapearModal)

// -----------------My Picks Section: Add restaurants for selection-------------------------
