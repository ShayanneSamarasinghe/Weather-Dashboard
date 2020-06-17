
var infoOutput = document.getElementById ("infoContainer")
var dailyOutput = document.getElementById ("dailyContainer")
var weatherInput = document.getElementById("weatherInput")
var searchButton = document.getElementById("searchButton")

searchButton.addEventListener ("click", function(){
    var city = weatherInput.value
    var apiKey = "34022347658ce6e3238847b999454f96"

$.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`, function(data){
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
            <h5 class="card-title">Card title</h5> ${dailyTemp},${dailyHumidity}
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>`


        dailyOutput.innerHTML += dailyContainer

    }








    $.get (`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`,function(response){
        console.log(response)
        var currentDay = moment.unix(response.current.dt).format('dddd, MMMM Do, YYYY')
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
            <h5 class="card-title">Card title</h5>${temp},${humidity},${windSpeed}, ${uv},${description}
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>`

        infoOutput.innerHTML = infoContainer

        
    })

    // dailyOutput.innerHTML = dailyContainer

})


})
