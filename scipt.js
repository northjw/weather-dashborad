

// var request = new XMLHttpRequest()

// request.open('GET', 'https://openweathermap.org/data/2.5/weather?q=Chicago&appid=439d4b804bc8187953eb36d2a8c26a02', true)
// request.onload = function () {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)
// console.log('data', data )

// }

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

    //set item 

    
});





