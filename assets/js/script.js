// CRITERIA
//  5-day forecast that displays the date, 
// an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity
// UV index with a color that indicates whether the conditions are favorable, moderate, or severe


let city = "oakland"
function getApi() {
    const APIkey = "1954d330fe9f2fbee8fe2fbda687fcb7"
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`;
  
    fetch(requestUrl)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("NETWORK RESPONSE ERROR");
        }
      })
        .then(function (data) {
            console.log(data);
            displayWeather(data);
        })
        .catch((error) => console.error("FETCH ERROR:", error));
  }
  
  getApi();

  function displayWeather(data) {
    const tempNow = Math.round(data.main.temp);
    const tempNowEl = document.getElementById("tempNow");
    tempNowEl.innerHTML = "Tempurature:" + tempNow;
    const humidNow = data.main.humidity;
    const humidNowEl = document.getElementById("humidNow");
    humidNowEl.innerHTML = "Humidity:" + humidNow;
    const cityNow = data.name;
    const cityNowEl = document.getElementById("cityNow");
    cityNowEl.innerHTML = cityNow;
  }   
  
 
  
  
  // weather icon
  // var iconcode = a.weather[0].icon;
  // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  