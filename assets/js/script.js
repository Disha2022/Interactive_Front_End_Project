
var dayIndex = 0;
var previousDayEl =$("#previous-day");
var nextDayEl =$("#next-day");
var weather;
  
var overlay = $('#overlay');
var closeBtn = $('#close-modal');
var searchBtn = $('#search-btn');
var searchForm = $('#search-form');
var OKBtn = $('#ok-btn');
var confirmBtn = $('#confirm-btn');
var locationBtn= $("#location-btn");
const places = document.getElementById('places')
var restaurantList= $('#places')
var searchInput = document.getElementById('user-search');
var restaurantLocation = $('#restaurant-name')
var weatherTitle =  $('#weather-title')

var request ={
    location: {lat: 0, lng: 0},
    radius: 5000,
    type: ['restaurant']
};

var results = [];

function fadeTitles(){
    restaurantLocation.removeClass('duration-1000')
    weatherTitle.removeClass('duration-1000')
    restaurantLocation.addClass('opacity-0 transition-all duration-100')
    weatherTitle.addClass('opacity-0 transition-all duration-100')

    setTimeout(function(){
        weatherTitle.addClass('duration-1000')
        restaurantLocation.addClass('duration-1000')
        restaurantLocation.removeClass('opacity-0')
        weatherTitle.removeClass('opacity-0')
    }, 1000)
}

// searches for address by location
function findCurrentLocation(){
    if (navigator.geolocation){
   navigator.geolocation.getCurrentPosition(
       (position) => {
          request.location.lat=position.coords.latitude
          request.location.lng=position.coords.longitude
          searchForAddress()
          fadeTitles()
          restaurantLocation.text('Restaurants Near My Current Location')
          weatherTitle.text('Weather Near My Current Location')

       }
   )}
}

// adds address to modal and to Restaurant section

function displayAddress(){
    fadeTitles()
    document.getElementById('modal-text').textContent= searchInput.value + ' is not a valid address'

        setTimeout(function(){
        weatherTitle.text('The Weather Near ' + searchInput.value)
        restaurantLocation.text('Restaurants Nearby: ' + searchInput.value)
        }, 500)
}



// Searches for restaurants within a radius around a coordinate
function searchForAddress(){


    const service = new google.maps.places.PlacesService(places);
    service.nearbySearch(request, callback);

    function callback(response, status) {
        if(request.location.lat === 0 && request.location.lng === 0){
            AppearModal()
        } else if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.push(...response);
        }
        displayResults();
        searchInput.value=''
    }
  }

// Sorts results by rating biggest to smallest
    function displayResults(){
    DisplayWeather(request.location.lat,request.location.lng);

    restaurantList.empty()

    
    results
      .filter((result) => result.rating)
      .sort((a, b) => (a.rating > b.rating ? -1 : 1))
      .forEach((result) => {
        var span = $("<span></span>");
        span.addClass("text-yellow-200");
        span.html("Rating: " + result.rating + "&#9734;");
        var button = $("<button></button>");
        button.attr("type", "button");
        button.addClass("list-btn hover:scale-150 duration-300");
        button.html("<img src='./assets/images/heart.png'></img>");
        button.click(function () {
          addPick(result.name);
        });
        var ol = $('#places')
        var li = $("<li></li>");
        ol.addClass('ease-in-out transition-all opacity-0')
        li.addClass('ease-in-out opacity-0 transition-all -translate-y-5 scale-0')
        li.text(result.name + " - ");

        li.append(span);
        li.append(button);
        $("#places").append(li);
        function fadeIn(){
        ol.addClass('opacity-100 duration-700')
        ol.removeClass('opacity-0')
        li.removeClass('-translate-y-5 scale-0 opacity-0')
        li.addClass('translate-y-0 opacity-100 scale-100 duration-1000')
       }
       setTimeout(fadeIn, 100)
    })
}



function initialize() {
  geocoder = new google.maps.Geocoder();
}

function codeAddress() {

    var address = searchInput.value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {

       request.location.lat= results[0].geometry.location.lat()
       request.location.lng= results[0].geometry.location.lng()

       setTimeout(searchForAddress, 1000)
      }
      else {
          AppearModal()
      }
    });

}

searchForm.submit(function (e) {
  e.preventDefault();
});

function AppearModal() {
  overlay.removeClass("hidden").addClass("flex");
}
function DissapearModal() {
  overlay.removeClass("flex").addClass("hidden");
}

// retreives info from the weather api and then passes it to fill weather data...............
var DisplayWeather = function (lat, long) {
  var apiAdress =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&exclude=hourly,alerts,minutely&units=imperial&appid=ec93ec889e22ec6a9e1c57a53cc4c613";
  var weather = fetch(apiAdress).then(function (response) {
    response.json().then(function (data) {
      weather = data;
      FillWeatherData(weather.daily[0]);
      previousDayEl.on("click",function(){
        dayIndex--;

        //if it moves from the last day to the second to last day reenable the other button
        if(dayIndex==6)
          nextDayEl.removeClass("disabled");
        // if it is the first day disable this button
        else if(dayIndex ==0)
          previousDayEl.addClass("disabled");

        FillWeatherData(weather.daily[dayIndex]);
      });
      nextDayEl.on("click",function(){
        dayIndex++;

                //if it moves from the first day to the second day reenable the other button
                if(dayIndex==1)
                previousDayEl.removeClass("disabled");
              // if it is the last day disable this button
              else if(dayIndex ==7)
                nextDayEl.addClass("disabled");

        FillWeatherData(weather.daily[dayIndex]);
      });
    });
  });
};

// ..........adds weather info to its appropriate section in the weather div............
var FillWeatherData = function (data) {
  var weatherEl = $("#myweather");
  dataField = weatherEl.children("p");
  var date = new Date(data.dt*1000).toLocaleDateString("en-US");;
  $("#date").text(date);
  //pick the correct cloud img.
  var cloudInfo = data.weather[0];
  var CloudEl = $("#cloud");
  var cloudimg =
    "http://openweathermap.org/img/wn/" + cloudInfo.icon + "@2x.png";
  CloudEl.attr({
    src: cloudimg,
    alt: cloudInfo.description,
  });

  FillDataField(dataField[0], data.temp.day + String.fromCharCode(176) + "F");
  FillDataField(dataField[1], data.wind_speed + " mph");
  FillDataField(dataField[2], data.humidity + "%");
};

// fills each individual field with the given data
var FillDataField = function (element, data) {
  var text = element.innerText;
  var numberLoc = element.innerText.match(/\d/);
  if (numberLoc) {
    element.innerText = element.innerText.substring(0, numberLoc.index) + data;
  } else element.textContent += data;
};


// clear results
function clearResults(){results=[]}

DisplayWeather(request.location.lat, request.location.lng);

searchBtn.on('click', clearResults)
searchBtn.on('click', codeAddress)
searchBtn.on('click', displayAddress)
OKBtn.on('click', DissapearModal)
closeBtn.on('click', DissapearModal)
locationBtn.on('click', findCurrentLocation)
locationBtn.on('click', clearResults)


// -----------------My Picks Section: Add restaurants for selection-------------------------
const myPicks = JSON.parse(localStorage.getItem("myPicks")) || [];
var myPicksList = $("#mypicks-list");
for (let i = 0; i < myPicks.length; i++) {
  const element = myPicks[i];
  showPickInList(element);
}

function showPickInList(name) {
  var li = $("<li></li>");
  li.text(name);
  var button = $("<button>");
  button.attr("type", "button");
  button.addClass("list-btn-2 hover:translate-y-0.5 hover:-translate-x-0.5 hover:scale-110 duration-300");
  button.html("<img src='./assets/images/delete.png'></img>");
  button.addClass("list-btn-3");
  button.click(function () {
    removePick(name);
  });
  li.append(button);
  myPicksList.append(li);
}

function addPick(name) {
  var newName = true;
  for (let i = 0; i < myPicks.length; i++) {
    const element = myPicks[i];
    if (name === element) {
      newName = false;
    }
  }
  if (newName) {
    myPicks.push(name);
    localStorage.setItem("myPicks", JSON.stringify(myPicks));
    showPickInList(name);
  }
}
//removes the the given restraunt from the local storage and the webpage
function removePick(name) {
  var index = myPicks.indexOf(name);
  myPicks.splice(index, 1);
  localStorage.setItem("myPicks", JSON.stringify(myPicks));
  $("#mypicks-list").children().get(index).remove();
}
