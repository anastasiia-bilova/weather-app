let apiKey = "8f82c6d344f9012fca0574b26e72d1f7";

let daysExtended = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let cities = ["Kyiv", "Lisbon", "Barcelona", "Paris", "London", "Tokyo"];

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let day = daysExtended[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  return daysShort[date.getDay()];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="g-1 g-xl-3 g-lg-3 g-md-2 g-sm-2 mt-3 row row-cols-5 justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-0 forecast-day">
          <div class="card text-center text-white">
            <div class="card-body">
              <h6 class="card-title forecast-date">${formatDay(
                forecastDay.dt
              )}</h6>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                class="forecast-icon"
              />
              <div class="forecast-temperatures">
                <span class="forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>
          </div>
        </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let dateElement = document.querySelector("#date");
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let maxTemperatureElement = document.querySelector("#max-temperature");
  let minTemperatureElement = document.querySelector("#min-temperature");
  let visibilityElement = document.querySelector("#visibility");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  dateElement.innerHTML = formatDate(response.data.dt);
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
  minTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  visibilityElement.innerHTML = Math.round(response.data.visibility / 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);

  cityInputElement.value = "";
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function (event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
});

function displayCities() {
  let citiesElements = document.querySelector("#list-of-cities");
  let citiesHTML = ``;

  cities.forEach(function (city) {
    citiesHTML += `<a href="#" id="${city.toLowerCase()}">${city}</a>`;
  });
  citiesElements.innerHTML = citiesHTML;

  let listOfCitiesElements = document.querySelectorAll("#list-of-cities a");

  for (let cityItem of listOfCitiesElements) {
    console.log(cityItem.innerHTML);
    cityItem.addEventListener("click", function (event) {
      event.preventDefault();
      search(cityItem.innerHTML);
    });
  }
}

displayCities();

search("Salzburg");
