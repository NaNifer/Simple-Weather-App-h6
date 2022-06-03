// CRITERIA
//  5-day forecast that displays the date, 
// an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity
// UV index with a color that indicates whether the conditions are favorable, moderate, or severe

// Adds dates and data to doc 
function addDate(data) {
  let today = moment().format("l");
  let dateTodayEl = document.getElementById("dateToday");
  dateTodayEl.innerHTML = today;

  // Creates container for Forcast Weather
  let fiveDayContainer = document.getElementById("fiveDayContainer")

  for (let i = 0; i < 5; i++) {
    let divContainer = document.createElement("div")
    divContainer.classList.add("col-md-2")

    let dateVal = moment().add(i + 1, "days").format("l");
    let temp = Math.round(data.daily[i].temp.day);
    let humidity = data.daily[i].humidity;
    let wind = data.daily[i].wind_speed;
    let iconcode = data.daily[i].weather[0].icon;
    let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(data.daily[i].weather[0].icon);
    let card = `
    <div id="Forcast-card" class="card text-bg-info mb-3">
        <div class="forcast-date" class="card-header">${dateVal}</div>
        <div class="card-body">
            <img id="icon" class="icon" src="${iconurl}"></img>
            <p id="forcast-temp" class="card-title">Temp: ${temp}</p>
            <p id="forcast-wind" class="card-text">Wind: ${wind}</p>
            <p id="forcast-humidity" class="card-text">Humidity: ${humidity}</p>
        </div>
    </div>
    `
    divContainer.innerHTML += card
    fiveDayContainer.appendChild(divContainer);

  }

}

// Use geocode to get long & lat
function getCity() {
  let city = document.getElementById('city').value;
  document.getElementById('cityNow').innerHTML = city.toUpperCase();
  console.log(city)
  let requestGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${directAPIkey}`;
  fetch(requestGeo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      getWeather(data)
    })
}



// Gets weather data and calls on displayCurrentWeather()
function getWeather(data) {
  console.log(data);
  let lat = data[0].lat;
  let long = data[0].lon;
  var requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${onecallAPIkey}`;

  fetch(requestUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      addDate(data);
      displayCurrentWeather(data);
    })
}

// Displays current weather
function displayCurrentWeather(data) {

  const tempNow = Math.round(data.current.temp);
  const tempNowEl = document.getElementById("tempNow");
  tempNowEl.innerHTML = "Tempurature: " + tempNow;

  const humidNow = data.current.humidity;
  const humidNowEl = document.getElementById("humidNow");
  humidNowEl.innerHTML = "Humidity: " + humidNow;

  const windNow = data.current.wind_speed;
  const windNowEl = document.getElementById("windNow");
  windNowEl.innerHTML = "Wind Speed: " + windNow;

  const uvNow = data.current.uvi;
  const uvNowEl = document.getElementById("uvNow");
  uvNowEl.innerHTML = "UV Index: " + uvNow;

  let iconcode = data.current.weather[0].icon;
  let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

  var currentIconEl = document.getElementById("currentIcon");
  currentIconEl.src = iconurl;
  currentIconEl.width = "20";


}
