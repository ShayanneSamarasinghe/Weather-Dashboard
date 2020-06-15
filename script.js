

var weatherInput = document.getElementById("weatherInput")
var searchButton = document.getElementById("searchButton")

searchButton.addEventListener ("click", function(){
    var city = weatherInput.value
    var apiKey = "34022347658ce6e3238847b999454f96"

//     $.ajax({
//         // headers: { "Accept": "application/json", 'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'},
//         type: 'GET',
//         url: `https://cors-anywhere.herokuapp.com/http//:api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
//         // crossDomain: true,
//     //     beforeSend: function(xhr){
//     //         xhr.withCredentials = true;
//     //   },
//         success: function(data, textStatus, request){
//             console.log(data);
//         }
// });

$.get(`https//:api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`, function(data){
    console.log(data)
})


})
