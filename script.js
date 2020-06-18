
var infoOutput = document.getElementById ("infoContainer")
var dailyOutput = document.getElementById ("dailyContainer")
var weatherInput = document.getElementById("weatherInput")
var searchButton = document.getElementById("searchButton")

searchButton.addEventListener ("click", function(){
    var city = weatherInput.value
    var apiKey = "34022347658ce6e3238847b999454f96"

$.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`, function(data){
    console.log(data)
    var currentDay = moment.unix(data.list[0].dt).format('dddd, MMMM Do, YYYY')
    console.log(currentDay)
    var lat = data.city.coord.lat
    var lon = data.city.coord.lon 

    for(var i=0; i<=4; i++){
        var dailyTemp = data.list[i].main.temp
        var dailyHumidity = data.list[i].main.humidity
        var dailyIcon = data.list[i].weather[0].icon

       

        var dailyIconurl = "http://openweathermap.org/img/w/" + dailyIcon + ".png";

        var dailyContainer = 
        `<div class="card" style="width: 12rem;">
        <img src=${dailyIconurl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Temperature: ${dailyTemp}°C </h5> 
            <p class="card-text">Humidity: ${dailyHumidity}%</p>
        </div>
        </div>`


        dailyOutput.innerHTML += dailyContainer

    }


        





    $.get (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,function(response){
        console.log(response)
        var currentDay = moment.unix(response.current.dt).format('dddd, MMMM Do, YYYY, h:mm:ss a')
        console.log(currentDay)
        var temp = response.current.temp
        var humidity = response.current.humidity
        var windSpeed = response.current.wind_speed
        var uv = response.current.uvi
        var icon = response.current.weather[0].icon
        var description = response.current.weather[0].description

        var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";

        var infoContainer =  
        `<div class="card" style="width: 12rem;">
        <img src=${iconurl} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Temperature: ${temp}°C</h5>
            <h6>Humidity: ${humidity}%</h6>
            <h6>Wind: ${windSpeed}</h6>
            <h6>UV Index: ${uv}</h6>
            <h6>${description}</h6>
        </div>
        </div>`

        infoOutput.innerHTML = infoContainer

        
    })

    

})


})
