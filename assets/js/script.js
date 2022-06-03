// CRITERIA
//  5-day forecast that displays the date, 
// an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity
// UV index with a color that indicates whether the conditions are favorable, moderate, or severe


let city = "new orleans"
function getCity() {
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
        displayWeather(data);
      })
  }

getCity();

  function displayWeather(data) {
    
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

// Display 5 Day

  }




  // weather icon
  // var iconcode = a.weather[0].icon;
  // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
