// CRITERIA
//  5-day forecast that displays the date, 
// an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity
// UV index with a color that indicates whether the conditions are favorable, moderate, or severe


let city = "oakland"
function getCity() {
  let lat = 30.489772
  let long = -99.771335
  let requestGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${directAPIkey}`;
  fetch(requestGeo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let long = data[0].lon;
    })
  }

  function getWeather() {
    let lat = 30.489772;
    let long = -99.771335;
    var requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&appid=${onecallAPIkey}`;
    getCity(lat, long);

    fetch(requestUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        displayWeather(data);
      })
  }

  getWeather();

  function displayWeather(data) {
    
    const tempNow = Math.round(data.current.temp);
    const tempNowEl = document.getElementById("tempNow");
    tempNowEl.innerHTML = "Tempurature:" + tempNow;

    const humidNow = data.current.humidity;
    const humidNowEl = document.getElementById("humidNow");
    humidNowEl.innerHTML = "Humidity:" + humidNow;

    const cityNow = data.name;
    const cityNowEl = document.getElementById("cityNow");
    cityNowEl.innerHTML = cityNow;
  }




  // weather icon
  // var iconcode = a.weather[0].icon;
  // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
