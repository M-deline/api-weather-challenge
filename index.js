//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchButton = document.querySelector('#search-button');
var apiKey = "f8332907dad2ea3f708292660e2f5f7b";
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

      document.getElementById("city-name").textContent = data.name
      document.getElementById("maintemp").firstChild.textContent = "Temperature  " + data.main.temp + "  " + "Humidity:  " + data.main.humidity + "  " + "Wind Speed:  " + data.wind.speed

      document.getElementById("city-name").textContent = data.name + " " + dataDisplay
      document.getElementById("date").nextSibling.textContent = time
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


function getCondition(param1, param2) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

//filter fr 5 day forecast
searchButton.addEventListener('click', function () {
  var cityName = document.getElementById("search-form").value
  getGeo(cityName)
})
