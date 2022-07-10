let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = new Date();

let currentTime = document.querySelector("#current-time");

let currentDay = days[date.getDay()];
let currentHour = date.getHours();
let currentMinute = String(date.getMinutes()).padStart(2, "0");

currentTime.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

let apiKey = "8f82c6d344f9012fca0574b26e72d1f7";

function showWeatherDescription(response) {
  let cityHeading = document.querySelector("#city");

  if (city) {
    cityHeading.innerHTML = response.data.name;
  }

  celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = celciusTemperature;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = searchInput.value;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeatherDescription);

  searchInput.value = "";
});

function getCurrentCityWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  // TODO
  // document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // document.querySelector("#wind").innerHTML = Math.round(
  //   response.data.wind.speed
  // );
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getCurrentCityWeather);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

// TODO

// let celciusTemperature = null;

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", function (event) {
//   let cityTemperature = document.querySelector("#temperature");
//   cityTemperature.innerHTML = celciusTemperature;
// });
// function toCelsius(fahrenheit) {
//   return (5 / 9) * (fahrenheit - 32);
// }

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", function (event) {
//   let cityTemperature = document.querySelector("#temperature");
//   let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
//   cityTemperature.innerHTML = Math.round(fahrenheitTemperature);
// });
