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

let currentDateTime = document.querySelector("#current-date-time");

let currentDay = days[date.getDay()];
let currentHour = date.getHours();
let currentMinute = String(date.getMinutes()).padStart(2, "0");

currentDateTime.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

let apiKey = "8f82c6d344f9012fca0574b26e72d1f7";

function showWeatherDescription(response) {
  let heading = document.querySelector("#city");

  if (city) {
    heading.innerHTML = response.data.name;
  }

  let cityTemperature = document.querySelector("#city-temperature");
  let temperature = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = temperature;
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-input");
  let city = searchCityInput.value;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeatherDescription);

  searchCityInput.value = "";
});

function getCurrentCityWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  // document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // document.querySelector("#wind").innerHTML = Math.round(
  //   response.data.wind.speed
  // );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentLocation);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit.
// When clicking on it, it should convert the temperature to Fahrenheit.
// When clicking on Celsius, it should convert it back to Celsius.

// let celsius = document.querySelector("#celsius-link");
// let fahrenheit = document.querySelector("#fahrenheit-link");

// celsius.addEventListener("click", function (event) {
//   let cityTemperature = document.querySelector("#city-temperature");
//   cityTemperature.innerHTML = "30";
// });

// fahrenheit.addEventListener("click", function (event) {
//   let cityTemperature = document.querySelector("#city-temperature");
//   cityTemperature.innerHTML = "86";
// });
