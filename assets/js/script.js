const apiKey = '4af0193721309dff41bbabaded87109e';
const callOpenWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiKey;
const callGeocoding = 'https://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&limit=none&appid='+apiKey;
const searchInput = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');
const currentForecast = document.getElementById('5day-forecast');
var cityName;

searchBtn.addEventListener('click', () => {
    cityName = '';
    currentCity.innerHTML = '';
    currentDate.innerHTML = '';
    currentConditions.innerHTML = '';
    currentTemp.textContent = '';
    currentWind.textContent = '';
    currentHumidity.textContent = '';
    getCoordinates();
    getForecast();
    displayWeather();
});

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 13) {
        event.preventDefault();
        searchBtn.click();
    }
})

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

var currentCity = document.$('#city-name');
var currentDate = document.$('#main-date');
var currentConditions = document.$('#main-conditions');
var currentTemp = document.$('#main-temp');
var currentWind = document.$('#main-wind');
var currentHumidity = document.$('#main-humidity');

function displayWeather() {
    fetch(callOpenWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        currentCity.innerHTML = data.city.name;
        currentDate.innerHTML = data.list.dt;
        currentConditions.setAttribute("src", "") = data.list.weather.icon;
        currentTemp.textContent = 'Temp: '+data.list.main.temp+' °F';
        currentWind.textContent = 'Wind: '+data.list.wind.speed+' MPH';
        currentHumidity.textContent = 'Humidity: '+data.list.main.humidity+' %';
    })
};



function saveSearch() {
    prevSearchEl = document.createElement("li");
    prevSearchEl.textContent = prevSearch;
}