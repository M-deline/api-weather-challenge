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
      document.getElementById("city-name").textContent = dataDisplay
      document.getElementById("date").lastChild.textContent = time

      var weatherDiv = document.createElement("div")
      var tempElement = document.createElement("p");
      var humidityElement = document.createElement("p");
      var windElement = document.createElement("p");
      var iconElement = document.createElement("p");
      
      tempElement.textContent = "temp" + tempCurrent + f // Assuming 'temp' is in Celsius
      humidityElement.textContent = "humidity:" + response.main.humidity;
      windElement.textContent = "wind" + response.wind.speed;

      weatherDiv.appendChild(tempElement);
      weatherDiv.appendChild(humidityElement);
      weatherDiv.appendChild(windElement);


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

// In your JavaScript code, you should use textContent to update the content of these elements like the example below.
// Example
// // Inside getCurrentWeather function
// var tempElement = document.getElementById("temp");
// var humidityElement = document.getElementById("humidity");
// var windElement = document.getElementById("wind");
// var iconElement = document.getElementById("icon");

// tempElement.textContent = `${temp} °C`; // Assuming 'temp' is in Celsius
// humidityElement.textContent = `${humidity}%`;
// windElement.textContent = `${wind} m/s`;
// iconElement.setAttribute('src', urlIcon); // Set the 'src' attribute for the image
// Ensure that you have the urlIcon variable set correctly. You currently have a hardcoded URL for the weather icon. You should replace it with the actual URL you receive from the API response. The example below is an example, so make sure you check the return data to get the right link.
// Example
// var urlIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
// You have a function getCondition(param1, param2) that seems to be incomplete. If you want to fetch weather conditions for a specific location, you should pass the lat and lon parameters to that function and make a fetch request inside it. The example below is how you can structure the getCondition function.
// Remember to call getCondition with the appropriate lat and lon values when needed.
// Example
// function getCondition(lat, lon) {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//     .then(response => {
//       return response.json()
//     })
//     .then(data => {
//       // Handle the data here
//     })
//     .catch(err => console.log(err))
// }
// Finally, make sure your getForecast function is complete and handles the forecast data properly. To ensure that the getForecast function is complete and handles the forecast data properly, you need to process the data returned from the API and update the DOM elements with the relevant forecast information.