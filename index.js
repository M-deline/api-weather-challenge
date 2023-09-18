//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const searchButton = document.querySelector('#search-button');
var apiKey = "cdfc743396b214e68c6bc948dddc6bfc";
var history = []

//prevent default refresh
var documentForm = function (event) {
  event.preventDefault();
}

// var recentSearches = JSON.parse(localStorage.getItem("searches"));
// var searchHistory = document.getElementById("history");

function displayData(data) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.textContent = JSON.stringify(data);
}
function getGeo(name) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`).then(response => {
    return response.json()
  }).then(data => {
    localStorage.setItem("city", JSON.stringify(data));
    console.log(data);
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
      localStorage.setItem("city", JSON.stringify(data));
      console.log(data);
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



window.onload = function() {

  // Retrieve the users name.
  var test = localStorage.getItem('city')

  if (test != "undefined" || test != "null") {
    document.getElementById('history').innerHTML = "Recent " + test + "!";
  } else
    document.getElementById('history').innerHTML = "Recent!";
  }



//filter for 5 day forecast
searchButton.addEventListener('click', function () {
  var cityName = document.getElementById("search-form").value
  getGeo(cityName)
})


// var searchHistory = document.getElementById("search-history");
// var city = document.getElementById("city-name");
// searchHistory.addEventListener("click", function (event) {
//   event.preventDefault();
//   var searchCity = city.value
//   // Adds searched city to local storage
//   submitSearch(searchCity);
//   addRecentSearch(searchCity);
// });
// function addRecentSearch(city) {
//   var recentButton = document.createElement("button");
//   recentButton.textContent = city;
//   recentButton.addEventListener("click", function () {
//     submitSearch(city);
//   });
//   searchHistory.appendChild(recentButton);
// }
// function submitSearch(searchCity) {
//   recentSearches.push(searchCity);
//   console.log(recentSearches)
//   localStorage.setItem("searches", JSON.stringify(recentSearches));
//   getCurrentWeather(searchCity);
// }

