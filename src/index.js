//set current date and time

function formatTime(currentdate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  return `${day}: ${hour}:${minute} ${AmOrPm}`;
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

let day2 = new Date(now);
day2.setDate(day2.getDate() + 1);

let day3 = new Date(now);
day3.setDate(day3.getDate() + 2);

let day4 = new Date(now);
day4.setDate(day4.getDate() + 3);

let day5 = new Date(now);
day5.setDate(day5.getDate() + 4);

let day6 = new Date(now);
day6.setDate(day6.getDate() + 5);

let updateDate2 = document.querySelector(".date2");
updateDate2.innerHTML = formatDate(day2);

let updateDay2 = document.querySelector(".day2");
updateDay2.innerHTML = formatDay(day2);

let updateDate3 = document.querySelector(".date3");
updateDate3.innerHTML = formatDate(day3);

let updateDay3 = document.querySelector(".day3");
updateDay3.innerHTML = formatDay(day3);

let updateDate4 = document.querySelector(".date4");
updateDate4.innerHTML = formatDate(day4);

let updateDay4 = document.querySelector(".day4");
updateDay4.innerHTML = formatDay(day4);

let updateDate5 = document.querySelector(".date5");
updateDate5.innerHTML = formatDate(day5);

let updateDay5 = document.querySelector(".day5");
updateDay5.innerHTML = formatDay(day5);

let updateDate6 = document.querySelector(".date6");
updateDate6.innerHTML = formatDate(day6);

let updateDay6 = document.querySelector(".day6");
updateDay6.innerHTML = formatDay(day6);

// console.log( new Intl.DateTimeFormat("default", { hour: "numeric", minute: "numeric", hour12: true, weekday: "short", }).format(now));

//display city searched for and get weather for city from API

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp_max);
  let mainTemp = document.querySelector(".max-temp");
  mainTemp.innerHTML = `${temperature}º`;

  let minTemperature = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector(".min-temp");
  minTemp.innerHTML = `${minTemperature}º`;

  let todayDesc = response.data.weather[0].description;
  let todayText = document.querySelector(".today-text");
  todayText.innerHTML = `${todayDesc}`;

  let currentTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector(".temp-now");
  tempNow.innerHTML = `Currently ${currentTemp}º`;

  let humidity = response.data.main.humidity;
  let newHumidity = document.querySelector(".humidity");
  newHumidity.innerHTML = `Humidity ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector(".wind");
  wind.innerHTML = `Wind Speed ${windSpeed} km/h`;

  let icon = document.querySelector("#today-icon");
  icon.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
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

// convert temps to C or F when button clicked

function convertC() {
  let maxTempC = document.querySelector(".max-temp");
  maxTempC.innerHTML = "15 º";
  let minTempC = document.querySelector(".min-temp");
  minTempC.innerHTML = "8 º";
}

function convertF() {
  let maxTempF = document.querySelector(".max-temp");
  maxTempF.innerHTML = "59 º";
  let minTempF = document.querySelector(".min-temp");
  minTempF.innerHTML = "40 º";
}

let updateC = document.querySelector("#unit-C");
updateC.addEventListener("click", convertC);

let updateF = document.querySelector("#unit-F");
updateF.addEventListener("click", convertF);

// make C or F button stay dark when clicked on

function activeC(event) {
  let cButton = document.querySelector(".c-button");
  cButton.classList.add("active");
  let fButton = document.querySelector(".f-button");
  fButton.classList.remove("active");
}

function activeF(event) {
  let fButton = document.querySelector(".f-button");
  fButton.classList.add("active");
  let cButton = document.querySelector(".c-button");
  cButton.classList.remove("active");
}

let buttonClickC = document.querySelector(".c-button");
buttonClickC.addEventListener("click", activeC);

let buttonClickF = document.querySelector(".f-button");
buttonClickF.addEventListener("click", activeF);
