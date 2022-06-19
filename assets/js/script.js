// Global variable for main section, hides it on page load, and displays search history
const weatherDataEl = document.getElementById("weatherData");
const searchButtonEl = document.getElementById('searchButton');

weatherDataEl.style.display = "none";
window.onload = displayStorage();
searchButtonEl.addEventListener("click", function () {
  validateForm();
});

// When user enters in city, changes to uppercase, calls on getCity()
function validateForm(event) {
  if (event) {
    event.preventDefault();
  }
  const city = document.getElementById('city').value.toUpperCase();
  if (city == "") {
    alert("Please enter a city.");
    return false;
  }
  getCity(city);
  document.getElementById("form").reset();
}

// Inputs user's city into geocode API to get long & lat, sends it to API call getWeather() & send city to toStorage()
function getCity(city) {
  let requestGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${directAPIkey}`;

  fetch(requestGeo)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      if (data.length === 0) {
        showError();
        return;
      }
      getWeather(city, data);
      toStorage(city);
    })
}

// Error message for improper user entry
function showError() {
  alert("Not a valid city, please try again.")
}


// Gets weather data and send city & data to displayCurrentWeather()
function getWeather(city, data) {
  let lat = data[0].lat;
  let long = data[0].lon;
  var requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${onecallAPIkey}`;

  fetch(requestUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      addInfo(city, data);
      displayCurrentWeather(city, data);
    })
}

// Displays current weather in top div by creating elements and inputing from data array sent
function displayCurrentWeather(city, data) {
  document.getElementById('cityNow').innerHTML = city;

  const tempNow = Math.round(data.current.temp);
  const tempNowEl = document.getElementById("tempNow");
  tempNowEl.innerHTML = "Tempurature: " + tempNow + "°F";

  const humidNow = data.current.humidity;
  const humidNowEl = document.getElementById("humidNow");
  humidNowEl.innerHTML = "Humidity: " + humidNow;

  const windNow = data.current.wind_speed;
  const windNowEl = document.getElementById("windNow");
  windNowEl.innerHTML = "Wind Speed: " + windNow;

  // UV elements in a box
  const uvNow = data.current.uvi;
  const uvNowEl = document.getElementById("uvNow");
  const uvBox = document.createElement("div");

  uvNowEl.innerHTML = "UV Index: ";
  uvNowEl.appendChild(uvBox);
  uvBox.innerText = + uvNow;
  uvBox.classList.add("UVstyle");

  const iconcode = data.current.weather[0].icon;
  const iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

  const currentIconEl = document.getElementById("currentIcon");
  currentIconEl.src = iconurl;
  currentIconEl.style.width = "100px";

  // Adds color class for UV index
  if (uvNow <= 2) {
    uvBox.classList.add("green");
  }
  else if (uvNow >= 2 && uvNow <= 5) {
    uvBox.classList.add("yellow");
  }
  else if (uvNow >= 6 && uvNow <= 7) {
    uvBox.classList.add("orange");
  }
  else if (uvNow >= 8) {
    uvBox.classList.add("red");
  }
}


// Creates forcast weather elements, adds data and date
function addInfo(city, data) {
  weatherDataEl.style.display = "block";
  let today = moment().format("l");
  let dateTodayEl = document.getElementById("dateToday");
  dateTodayEl.innerHTML = today;

  // Creates container for Forcast Weather
  let fiveDayContainer = document.getElementById("fiveDayContainer")

  while (fiveDayContainer.firstChild) {
    fiveDayContainer.removeChild(fiveDayContainer.firstChild);
  }
  for (let i = 0; i < 5; i++) {
    let divContainer = document.createElement("div")
    divContainer.classList.add("col-md-2")

    let dateVal = moment().add(i + 1, "days").format("l");
    let temp = Math.round(data.daily[i].temp.day);
    let humidity = data.daily[i].humidity;
    let wind = data.daily[i].wind_speed;
    let iconcode = data.daily[i].weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    let card = `
    <div id="Forcast-card" class="card text-bg-info mb-3">
        <div class="forcast-date" class="card-header">${dateVal}</div>
        <div class="card-body">
            <img id="icon" class="icon" src="${iconurl}"></img>
            <p id="forcast-temp" class="card-title">Temp: ${temp + "°F"}</p>
            <p id="forcast-wind" class="card-text">Wind: ${wind}</p>
            <p id="forcast-humidity" class="card-text">Humidity: ${humidity}</p>
        </div>
    </div>
    `
    divContainer.innerHTML += card
    fiveDayContainer.appendChild(divContainer);
  }
}

// // user's city is put into local storage, most recent first, calls on displayStorage()
function toStorage(city) {
  let historyCities = JSON.parse(localStorage.getItem("inputCity"));

  if (historyCities === null) {
    historyCities = [city];
  }
  else {
    for (let i = 0; i < historyCities.length; i++) {
      if (city === historyCities[i]) {
        return;
      }
    }
    historyCities.unshift(city);
  }
  localStorage.setItem("inputCity", JSON.stringify(historyCities));
  displayStorage();
}

// // Creates buttons in aside, and inputs the stored city name in each button
function displayStorage() {
  let historyCities = JSON.parse(localStorage.getItem("inputCity")) || [];
  let previousCitiesEl = document.getElementById("previous-cities");

  while (previousCitiesEl.firstChild) {
    previousCitiesEl.removeChild(previousCitiesEl.firstChild);
  }
  for (let i = 0; i < 10 && i < historyCities.length; i++) {
    let previousCity = document.createElement("button");
    previousCity.classList.add("cityButton", "btn", "btn-info");
    previousCity.textContent = historyCities[i];
    previousCitiesEl.appendChild(previousCity);

    previousCity.addEventListener("click", function () {
      getCity(historyCities[i]);
    });
  }
}