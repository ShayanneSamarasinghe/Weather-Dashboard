var infoOutput = document.getElementById("infoContainer");
var dailyOutput = document.getElementById("dailyContainer");
var weatherInput = document.getElementById("weatherInput");
var searchButton = document.getElementById("searchButton");
var cityList = JSON.parse(localStorage.getItem("cityList"));



searchButton.addEventListener("click", function(){
  var city = weatherInput.value;
  var apiKey = "34022347658ce6e3238847b999454f96";

  $.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`,
    function (data) {
      console.log(data);
      var currentDay = moment
        .unix(data.list[0].dt)
        .format("dddd, MMMM Do, YYYY");
      console.log(currentDay);
      var lat = data.city.coord.lat;
      var lon = data.city.coord.lon;
      var cityName = data.city.name;
      cityList.push();
    //   document.getElementById("cityContainer").innerHTML = cityList;
      localStorage.setItem("cityList", JSON.stringify(cityList));

      

      $.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
        function (response) {
          console.log(response);
          var currentDay = moment
            .unix(response.current.dt)
            .format("dddd, MMMM Do, YYYY");
          console.log(currentDay);
          var temp = response.current.temp;
          var humidity = response.current.humidity;
          var windSpeed = response.current.wind_speed;
          var uv = response.current.uvi;
          var icon = response.current.weather[0].icon;
          var description = response.current.weather[0].description;

          var uvIndex = "";
          if (uv >= 6) {
            uvIndex = "severe";
          } else if (uv >= 3) {
            uvIndex = "moderate";
          } else {
            uvIndex = "favourable";
          }

          var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

          var infoContainer = `<div class="card" style="width: 12rem;">
        <img src=${iconurl} class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${cityName}</h4>
            <h5 class="card-title">Temperature: ${temp}°C</h5>
            <h6>Humidity: ${humidity}%</h6>
            <h6>Wind: ${windSpeed}</h6>
            <h6 class="${uvIndex}">UV Index: ${uv}</h6>
            <h6>${description}</h6>
        </div>
        </div>`;

          infoOutput.innerHTML = infoContainer;

          for (var i = 1; i <= 5; i++) {
            var dailyTemp = response.daily[i].temp.day;
            var dailyHumidity = response.daily[i].humidity;
            var dailyIcon = response.daily[i].weather[0].icon;

            var date = moment
              .unix(response.daily[i].dt)
              .format("dddd, MMMM Do, YYYY");

            var dailyIconurl =
              "http://openweathermap.org/img/w/" + dailyIcon + ".png";

            var dailyContainer = `<div class="card" style="width: 12rem;">
            <img src=${dailyIconurl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${date}</h5> 
                <h5 class="card-title">Temperature: ${dailyTemp}°C </h5> 
                <p class="card-text">Humidity: ${dailyHumidity}%</p>
            </div>
            </div>`;

            dailyOutput.innerHTML += dailyContainer;
          }
        }
      );
    }
  );
});
