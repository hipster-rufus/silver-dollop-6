const searchBtn = document.querySelector("#search-btn");
const searchCity = document.querySelector("#search-city");
const searchAlert = document.querySelector("#search-alert");
const weatherResults = document.querySelector("#weather-results");
const forecastResults = document.querySelector("#forecast-results");
const searchHistoryList = document.querySelector("#search-history");
const apiKey = '4af0193721309dff41bbabaded87109e';

let searchHistory= [];

function getWeather() {
    let city = searchCity.value;
    let geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey;

    while (weatherResults.firstChild) {
        weatherResults.removeChild(weatherResults.firstChild);
    };

    fetch(geoUrl)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey;

        fetch(weatherUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            console.log(data)
            var nowDayEl = document.createElement("div")
            nowDayEl.classList.add('card');
            nowDayEl.classList.add('col-lg-8');
            nowDayEl.classList.add('p-3');
            nowDayEl.classList.add('m-3');

            var nowCityEl = document.createElement("h1");
            var nowTempEl = document.createElement("h3");
            var nowWindEl = document.createElement("p");
            var nowHumidityEl = document.createElement("p");
            var nowIconEl = document.createElement("img");

            var fahrenheitTemp = Math.floor((data.main.temp - 273.15) * (9/5) + 32)

            nowCityEl.textContent = data.name;
            nowTempEl.textContent = "Temperature: " + fahrenheitTemp + "°F";
            nowWindEl.textContent = "Wind: " + data.wind.speed;
            nowHumidityEl.textContent = "Humidity: " + data.main.humidity;
            nowIconEl.setAttribute('src', 'https://openweathermap.org/img/w/'+ data.weather[0].icon +'.png')
            nowIconEl.setAttribute('style', 'width: 150px; height: 150px');

            nowDayEl.append(nowCityEl, nowTempEl, nowWindEl, nowHumidityEl, nowIconEl)

            weatherResults.appendChild(nowDayEl);
        })  
        .catch(function(err) {
            console.log(err)
        })
    })
};

function getForecast() {
    let city = searchCity.value;
    let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=" + apiKey + "&q=" + city;
    let currentDate = new Date().toISOString().split("T")[0]; 

    if (!city) {
        return searchAlert.textContent = "Please enter a city name";
    } else {
        searchAlert.textContent = "";
    }

    while (forecastResults.firstChild) {
        forecastResults.removeChild(forecastResults.firstChild);
    };

    fetch(forecastUrl)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      if (data.list) {
        var forecast = data.list;
        var fiveDayForecast = [];

        forecast.forEach(function (day) {
          var [date, time] = day.dt_txt.split(" ");

          if (time === "12:00:00" && date >= currentDate && fiveDayForecast.length < 5) {
            fiveDayForecast.push(day);
          }
        });
        
        fiveDayForecast.forEach(function (day) {
            var dayEl = document.createElement("div");
            dayEl.classList.add('card');
            dayEl.classList.add('col-lg-2');
            dayEl.classList.add('p-3');
            dayEl.classList.add('m-3');
            var dateEl = document.createElement("h3");          
            var tempEl = document.createElement("p");
            var windEl = document.createElement("p");
            var humidityEl = document.createElement("p");
            var iconEl = document.createElement("img");

            var fahrenheitTemp = Math.floor((day.main.temp - 273.15) * (9/5) + 32)

            dateEl.textContent = day.dt_txt.split(" ")[0];
            tempEl.textContent = "Temperature: " + fahrenheitTemp + "°F";
            windEl.textContent = "Wind: " + day.wind.speed;
            humidityEl.textContent = "Humidity: " + day.main.humidity;
            iconEl.setAttribute('src','https://openweathermap.org/img/w/'+ day.weather[0].icon +'.png')

            dayEl.append(
                dateEl, tempEl, windEl, humidityEl, iconEl
            );     

            forecastResults.appendChild(dayEl);
        });

      } else {
        console.log("Error fetching weather data", error);
      }
    })
    .catch(function(err) {
      console.log(err);
    });

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);

        var cityItem = document.createElement("li");
        var cityLink = document.createElement("button");
        cityLink.textContent = city;
        cityLink.classList.add('btn');
        cityLink.classList.add('btn-secondary');
        cityItem.append(cityLink);

        cityLink.addEventListener("click", function () {
            searchCity.value = city;
            getWeather();
            getForecast();
        });
    }
    searchHistoryList.append(cityItem);
};

searchBtn.addEventListener("click", function () {
    getWeather();
    getForecast();
});