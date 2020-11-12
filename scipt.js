// weather api key
var apiKey = "31b2ec10feccf2ed54ed62f57354e7e0";

var searchTxt = document.querySelector('#search')
console.log(searchTxt.value)
var button = document.querySelector('button')
button.addEventListener("click", function () {
    var request = new XMLHttpRequest()
    request.open('GET', 'https://openweathermap.org/data/2.5/weather?q=' + searchTxt.value + '&appid=439d4b804bc8187953eb36d2a8c26a02', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        console.log('data', data)
    }
    request.send()
    console.log(searchTxt.value)

    
    
});
// get results
var results = response;
    
$("#today").empty();

var newDivCard = $("<div class = 'card current-city'></div>");
// building current weather 
$("#today").append(newDivCard)

// creating cards 
    var milli = results.dt * 1000
    var datObj = new Date(milli)
    var convertedDate = new Date(datObj)

    var month = convertedDate.getMonth() + 1
    var day = convertedDate.getDate();
    var year = convertedDate.getFullYear();
    var shortStartDate = month + "/" + day + "/" + year;
$(".current-city").append(($("<h3 class = 'card-title current-cityhd col-12'></h3>")).text((results.name) +  ' ' + "(" + shortStartDate + ")"));
$(".current-city").append(($("<img id='wicon'" + "src='http://openweathermap.org/img/w/" + results.weather[0].icon + ".png'" + "alt='Weather icon'>")))
// call get forecast
$(".current-city").append($("<p class='card-text'></p>").text("Temperature: " + results.main.temp + " °F"))
$(".current-city").append($("<p class='card-text'></p>").text("Humidity: " + results.main.humidity + " %"))
$(".current-city").append($("<p class='card-text'></p>").text("Wind Speed: " + results.wind.speed + " MPH"))

getUVIndex(results.coord.lat, results.coord.lon)
getExpectedForecast(results.coord.lat, results.coord.lon)
})


}
// checks if it exists in history - if not push to llocal storage 


// call get uv index
function getUVIndex (lat, lon){
var apiKey = "appid=2644d35b2adfcc8bc5136b634f1b23fb";
var weatherURL = "http://api.openweathermap.org/data/2.5/uvi?";
var lat = "&lat=" + lat;
var lon = "&lon=" + lon;


var queryURL = weatherURL + apiKey + lat + lon;

$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {
// get results
var results = response;

$(".current-city").append($("<p class='card-text uv-index'></p>").text("UV Index: " + results.value))

if (results.value < 3){
    $(".uv-index").addClass("good-uv");
}
else if (results.value > 3 && results.value < 6){
    $(".uv-index").addClass("moderate-uv");
}
else  if (results.value >  6){
    $(".uv-index").addClass("severe-uv");
}
})


}

function getExpectedForecast(lat, lon){
var apiKey = "&appid=2644d35b2adfcc8bc5136b634f1b23fb";
var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?";
var lat = "lat=" + lat;
var lon = "&lon=" + lon;
var exclude = "&exclude=current,minutely,hourly"

$("#forecast").append("<h3>5-Day Forecast</h3>")


var queryURL = weatherURL + lat + lon + exclude + apiKey + "&units=imperial";

$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {

for (i = 0; i < (response.daily.length - 3); i++){
    
    var milli = response.daily[i].dt * 1000
    var datObj = new Date(milli)
    var convertedDate = new Date(datObj)

    var month = convertedDate.getMonth() + 1
    var day = convertedDate.getDate();
    var year = convertedDate.getFullYear();
    var shortStartDate = month + "/" + day + "/" + year;
    

    var newDivCard = $("<div class='card forecast' style='width: 10rem;'><div class='card-body'> </div></div>");

    

    newDivCard.append("<h5 class='card-title'>" + shortStartDate + "</h5>")
    newDivCard.append(($("<img id='wicon'" + "src='http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png'" + "alt='Weather icon'>")))
    newDivCard.append($("<p class='card-text'></p>").text("Temperature: " + response.daily[i].temp.day + " °F"))
    newDivCard.append($("<p class='card-text'></p>").text("Humidity: " + response.daily[i].humidity + " %"))
    
    $("#forecast").append(newDivCard)
}

})
}

function addToHistory(cityname){
$(".search-history").append("<li class = list-group-item searched-city>" + cityname + "</li>")
}

$(document).ready(function () {
var searchHistory = JSON.parse(localStorage.getItem("history")) || [];
// first - click events 
$(".searchBtn").on("click", function () {
$(".maindiv").removeClass("disappear");
$("#forecast").empty();
var searchInput = $(".searchInput").val();
searchWeather(searchInput)
addToHistory(searchInput)

})
$(".search-history").on("click", "li", function (){
$("#forecast").empty();
searchWeather($(this).html())
})
});





