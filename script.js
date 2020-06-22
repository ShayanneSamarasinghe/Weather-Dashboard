var infoOutput = document.getElementById("infoContainer");
var dailyOutput = document.getElementById("dailyContainer");
var searchButton = document.getElementById("searchButton");

var locationInfoList = JSON.parse(localStorage.getItem("locationInfoList"));
if(locationInfoList == null){
  var locationInfoList = new Array();
}

var weatherInfoList = JSON.parse(localStorage.getItem("weatherInfoList"));
if(weatherInfoList == null){
  var weatherInfoList = new Array();
}

var locationInfo = locationInfoList[locationInfoList.length -1];

var weatherInfo = weatherInfoList[weatherInfoList.length -1];

console.log (locationInfo)
console.log(weatherInfo)


if(locationInfo != null && weatherInfo != null ){
  outputWeatherInfo(locationInfo, weatherInfo);
 
}




searchButton.addEventListener("click", 



function(){
  var weatherInput = document.getElementById("weatherInput");
  var city = weatherInput.value;
  var apiKey = "34022347658ce6e3238847b999454f96";


  $.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`,
    function (data) {
      console.log(data);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      var cityName = data.city.name;
      locationInfoList.push(data); 
      localStorage.setItem("locationInfoList", JSON.stringify(locationInfoList));
 


      

      $.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        function (response) {
          console.log(response);
          weatherInfoList.push(response); 
          localStorage.setItem("weatherInfoList", JSON.stringify(weatherInfoList));
          outputWeatherInfo(data, response);
       
        }
      );
    }
  );
});



function outputWeatherInfo(locationInfo, weatherInfo){
  var lat = locationInfo.city.coord.lat;
  var lon = locationInfo.city.coord.lon;
  var cityName = locationInfo.city.name;

  var temp = weatherInfo.current.temp;
  var humidity =  weatherInfo.current.humidity;
  var windSpeed = weatherInfo.current.wind_speed;
  var uv = weatherInfo.current.uvi;
  var icon = weatherInfo.current.weather[0].icon;
  var description = weatherInfo.current.weather[0].description;

  var uvIndex = "";
  if (uv >= 6) {
    uvIndex = "severe";
  } else if (uv >= 3) {
    uvIndex = "moderate";
  } else {
    uvIndex = "favourable";
  }

  var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

  var infoContainer = 
 
  `<div class="card" style="width: 33rem;">
    <div class="card-body" style="width: 33rem;">
        <h4 class="card-title"><img src=${iconurl} width="80" height="80">${cityName}</h4>
        <h5 class="card-title">Temperature: ${temp}°C</h5>
        <h6>Humidity: ${humidity}%</h6>
        <h6>Wind: ${windSpeed}</h6>
        <h6 class="${uvIndex}">UV Index: ${uv}</h6>
        <h6>${description}</h6>
    </div>
  </div>`;

  infoOutput.innerHTML = infoContainer;

  document.getElementById("dailyContainer").innerHTML= null;
  for (var i = 1; i <= 5; i++) {
    var dailyTemp = weatherInfo.daily[i].temp.day;
    var dailyHumidity = weatherInfo.daily[i].humidity;
    var dailyIcon = weatherInfo.daily[i].weather[0].icon;

    var date = moment
      .unix(weatherInfo.daily[i].dt)
      .format("dddd, MMMM Do, YYYY");

    var dailyIconurl =
      "http://openweathermap.org/img/w/" + dailyIcon + ".png";

    var dailyContainer =
    ` 
      <div class="card" style="width: 15rem;">
          <div class="card-body">
            <h5 class="card-title">${date}</h5>
            <h5 class="card-title"><img src = ${dailyIconurl} width="80" height="80"></h5>Temperature: ${dailyTemp}°C</h5>
            <p class="card-text">Humidity: ${dailyHumidity}%</p>
          </div>
        </div>`


    dailyOutput.innerHTML += dailyContainer;
  }


  document.getElementById("cityContainer").innerHTML= null;
  for(var i = 0; i <locationInfoList.length; i++){
    var cityName = locationInfoList[i].city.name ;
    var cityButton = 
    ` 
   
        <ul class="list-group">
          <li class="list-group-item">${cityName}</li>
        </ul>
     
    
    `
    document.getElementById("cityContainer").innerHTML+= cityButton;

  }

}


