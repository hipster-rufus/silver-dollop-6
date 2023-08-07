var searchBtn = document.querySelector("#search-btn"); // Search button
var searchInput = document.querySelector("#city-input"); // Input for Search
var weatherResultsEl = document.querySelector("#first");
var searchedCities= [];

var API_KEY = "33bf6212a02f55406c312de7ffdcf207";
var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=" + API_KEY;

function weather() {
  var city = searchInput.value;
  var queryUrl = weatherUrl + "&q=" + city;
  var currentDate = new Date().toISOString().split("T")[0]; 

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.list) {
        var forecast = data.list;

          // weather data string
        var dailyWeather = [];

        // weather data for every day for the next 5 days
        forecast.forEach(function (day) {
          // date and time of the forecast
          var [date, time] = day.dt_txt.split(" ");
          
          // forecast for 12PM
          if (time === "12:00:00" && date >= currentDate && dailyWeather.length < 5) {
            dailyWeather.push(day);
          }
        });
        
        // create a div for each day's weather forecast
        dailyWeather.forEach(function (day) {
          var dayEl = document.createElement("div");
          dayEl.classList.add('col')
          // create elements for the weather data
          var dateEl = document.createElement("h3");          
          var tempEl = document.createElement("p");
          var windEl = document.createElement("p");
          var humidityEl = document.createElement("p");
          var iconEl = document.createElement("img"); //create icon element

          // add data to the elements
          dateEl.textContent = day.dt_txt.split(" ")[0];
          tempEl.textContent = "Temperature: " + day.main.temp;
          windEl.textContent = "Wind: " + day.wind.speed;
          humidityEl.textContent = "Humidity: " + day.main.humidity;
          iconEl.setAttribute('src','https://openweathermap.org/img/w/'+ day.weather[0].icon +'.png' )

          // append the elements to the day's weather div
          dayEl.append(dateEl, tempEl, windEl, humidityEl, iconEl);          

         // append the div to the results container
          weatherResultsEl.appendChild(dayEl);
        });

      } else {
        console.error("No weather data found");
      }
    })
    .catch(function (error) {
      console.error("Error fetching weather data", error);
    });

    // check if the searched city is already in the array
    if (!searchedCities.includes(city)) {
    // add the searched city to the array
    searchedCities.push(city);

    // create a new button element for the searched city
    var cityBtnEl = document.createElement("button");
    cityBtnEl.textContent = city;

    // add an event listener to the button to search for the city again
    cityBtnEl.addEventListener("click", function () {
      searchInput.value = city;
      weather();
  });
    }
  // append the button to the HTML element
  var searchedCitiesListEl = document.querySelector("#searched-cities-list");
  
  searchedCitiesListEl.appendChild(cityBtnEl);
}

searchBtn.addEventListener("click", function () {
  weather();
});