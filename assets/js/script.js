

// retreives info from the weather api and then passes it to fill weather data.
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

// adds weather info to its appropriate section in the weather div.
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

DisplayWeather(0,0);



              