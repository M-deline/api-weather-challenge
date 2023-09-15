//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchButton = document.querySelector('#search-button');
var apiKey = "9f87752a06c22d77f56671cc917855d3";
var history = []
//prevent default refresh
var documentForm = function (event) {
  event.preventDefault();
}

// fetch() from that AI helper tool in BCS
function displayData(data) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.textContent = JSON.stringify(data);
}
function getGeo(name) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`).then(response => {
    return response.json()
  }).then(data => {
    var lat = data[0].lat
    var lon = data[0].lon
    getCurrentWeather(lat, lon)
  })
  .catch(err => console.log(err))
}
function getCurrentWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => {
    return response.json()
  }).then(data => {
    console.log(data)
   let timeStamp = dayjs.unix(data.dt)
   let dataDisplay = timeStamp.format("MMMM DD, YYYY")
   document.getElementById("city-name").textContent = dataDisplay
   document.getElementById("date").lastChild.textContent = time
   var urlIcon = 
   "https://openweathermap.org/img/wn/10d@2x.png"
   var temp = data.main.temp;
   console.log(temp)
   var humidity = data.main.humidity;
   console.log(humidity)
   var wind = data.wind.speed;
   console.log(wind)
  var temp = document.getElementById("temp")
  var humidity = document.getElementById("humidity")
  var wind = document.getElementById("wind")
  var icon = document.getElementById("icon")
  
   document.getElementById("temp").textContent = temp;
   document.getElementById("humidity").textContent = humidity;
   document.getElementById("wind").textContent = wind;
   document.getElementById("icon").textContent = urlIcon;
    getForecast(lat, lon)
  }) 
  .catch(err => console.log(err))
  
}

function getForecast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  .then(response => {
    return response.json()
  }).then(data => {
    console.log(data)
  }) 
  .catch(err => console.log(err))
  
}
// var displayCurrentData = function(city, data) {
///  var divCurrent = document.createElement("div")
// var tempEl = document.createElement("p");
// var humidityEl = document.createElement("p");
// var windSpeedEl = document.createElement("p");
  //somehting main
  //Endpoints to dislay current data 
  // var tempCurrent = Math.round(data.current.temp);
  // var humidity = Math.round(data.current.humidity);
  // var windSpeed = data.current.wind_speed;
  // var uvIndex = data.current.uvi;
  // var iconCurrent = data.current.weather[0].icon;

function getCondition (param1, param2) {
  fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

//filter fr 5 day forecast
searchButton.addEventListener('click', function() {
  var cityName = document.getElementById("search-form").value
  getGeo(cityName)
})