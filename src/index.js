//set current date and time

function formatTime(currentdate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hour = currentdate.getHours();

  let AmOrPm;
  if (hour >= 12) {
    AmOrPm = "PM";
  } else {
    AmOrPm = "AM";
  }

  hour = hour % 12 || 12;

  let minute = currentdate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let day = days[currentdate.getDay()];

  return `${day} ${hour}:${minute} ${AmOrPm}`;
}

let now = new Date();

let updateCurrentDay = document.querySelector(".update-day");
updateCurrentDay.innerHTML = formatTime(now);

//set other days and dates

function formatDate(day) {
  let date = day.getDate();
  return date;
}

function formatDay(day) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let DOW = days[day.getDay()];
  return DOW;
}

let day3 = new Date(now);
day3.setDate(day3.getDate() + 2);

let day4 = new Date(now);
day4.setDate(day4.getDate() + 3);

let day5 = new Date(now);
day5.setDate(day5.getDate() + 4);

let day6 = new Date(now);
day6.setDate(day6.getDate() + 5);

// console.log( new Intl.DateTimeFormat("default", { hour: "numeric", minute: "numeric", hour12: true, weekday: "short", }).format(now));

// display forecast

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let shortDate = date.getDate();
  return shortDate;
}

function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row g-1"> <hr/>`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
 <div class="col-4 forecast-left">
    <div class="day-forecast">${formatForecastDay(forecastDay.dt)}</div>
    <div class="date-forecast">${formatForecastDate(forecastDay.dt)}</div>
  </div>
  <div class="col-4 forecast-icon">
    <img
      src="img/${forecastDay.weather[0].icon}.png"
      alt="partly sunny"
    />
  </div>
  <div class="col-4 forecast-right">
    <span class="max-temp-forecast">${Math.round(
      forecastDay.temp.max
    )}º</span> / <span class="min-temp-forecast">${Math.round(
          forecastDay.temp.min
        )}º</span>
  </div>
  <hr />`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let unit = "metric";
  let apiKey = "f3887e262c88d1158f7e2ef4998e234c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//display city searched for and get weather for city from API

function showWeather(response) {
  maxTemperature = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector(".max-temp");
  maxTemp.innerHTML = `${maxTemperature}º`;

  minTemperature = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector(".min-temp");
  minTemp.innerHTML = `${minTemperature}º`;

  let todayDesc = response.data.weather[0].description;
  let todayText = document.querySelector(".today-text");
  todayText.innerHTML = `${todayDesc}`;

  currentTemperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector(".temp-now");
  tempNow.innerHTML = `Currently <span id="current-color">${currentTemperature}º</span>`;

  let humidity = response.data.main.humidity;
  let newHumidity = document.querySelector(".humidity");
  newHumidity.innerHTML = `Humidity <span id ="humidity-color">${humidity}%</span>`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed <span id="wind-color">${windSpeed} km/h </span>`;

  let icon = document.querySelector("#today-icon");
  icon.setAttribute(
    "src",
    `img/${response.data.weather[0].icon}.png`,
    "alt",
    response.data.weather[0].description
  );
  getForecast(response.data.coord);
}

function enterCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = citySearch.value;

  let unit = "metric";
  let apiKey = "f1f3df11762d58c6c6cc9b0c0b6c69d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showWeather);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", enterCity);

//update weather from current location button

function newLocation(response) {
  let cityLocate = document.querySelector("h1");
  cityLocate.innerHTML = response.data.name;
  showWeather(response);
}

function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let unit = "metric";
  let apiKey = "f1f3df11762d58c6c6cc9b0c0b6c69d9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(newLocation);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let findMe = document.querySelector("#locate-button");
findMe.addEventListener("click", currentLocation);

// make C or F button stay dark when clicked on and convert temps to C or F

function activeC(event) {
  event.preventDefault();
  let cButton = document.querySelector(".c-button");
  cButton.classList.add("active");
  let fButton = document.querySelector(".f-button");
  fButton.classList.remove("active");

  let maxTempC = document.querySelector(".max-temp");
  maxTempC.innerHTML = `${maxTemperature}º`;
  let minTempC = document.querySelector(".min-temp");
  minTempC.innerHTML = `${minTemperature}º`;
  let currentTempC = document.querySelector(".temp-now");
  currentTempC.innerHTML = `Currently ${currentTemperature}º`;
}

function activeF(event) {
  event.preventDefault();
  let fButton = document.querySelector(".f-button");
  fButton.classList.add("active");
  let cButton = document.querySelector(".c-button");
  cButton.classList.remove("active");

  let maxTempF = document.querySelector(".max-temp");
  let maxTempFConv = (maxTemperature * 9) / 5 + 32;
  maxTempF.innerHTML = `${Math.round(maxTempFConv)}º`;
  let minTempF = document.querySelector(".min-temp");
  let minTempFConv = (minTemperature * 9) / 5 + 32;
  minTempF.innerHTML = `${Math.round(minTempFConv)}º`;
  let currentTempF = document.querySelector(".temp-now");
  let currentTempFConv = (currentTemperature * 9) / 5 + 32;
  currentTempF.innerHTML = `Currently ${Math.round(currentTempFConv)}º`;
}

let maxTemperature = null;
let minTemperature = null;
let currentTemperature = null;

let buttonClickC = document.querySelector(".c-button");
buttonClickC.addEventListener("click", activeC);

let buttonClickF = document.querySelector(".f-button");
buttonClickF.addEventListener("click", activeF);
