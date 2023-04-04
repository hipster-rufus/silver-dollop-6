var apiKey = '4af0193721309dff41bbabaded87109e';
var callOpenWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiKey;
var callGeocoding = 'https://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=none&appid='+apiKey;
var searchInput = document.getElementById('city-search');
var searchBtn = document.getElementById('search-btn');
var cityName;
var currentForecast = document.getElementById('5day-forecast');

searchBtn.addEventListener('click', () => {
    cityName = searchInput.value;

    getForecast();
});

function getCoordinates() {
    fetch(callGeocoding)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            var lat = data.lat;
            var lon = data.lon;
        }
    });
}

function getForecast() {
    fetch(callOpenWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

var currentCity = document.getElementById('city-name');
var currentDate = document.getElementById('main-date');
var currentConditions = document.getElementById('main-conditions');
var currentTemp = document.getElementById('main-temp');
var currentWind = document.getElementById('main-wind');
var currentHumidity = document.getElementById('main-humidity');

function displayWeather() {
    fetch(callOpenWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        currentCity[i] = data.city.name;
        currentDate[i] = data.list.dt;
        currentConditions[i] = data.list.weather.icon;
        currentTemp[i] = data.list.main.temp;
        currentWind[i] = data.list.wind.speed;
        currentHumidity[i] = data.list.main.humidity;
    })
}