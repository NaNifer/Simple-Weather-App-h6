// CRITERIA
//  5-day forecast that displays the date, 
// an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity
// UV index with a color that indicates whether the conditions are favorable, moderate, or severe



function getApi() {
    const APIkey = "1954d330fe9f2fbee8fe2fbda687fcb7"
    let city = "oakland"
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
  
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
  }
  
  getApi();
  
  
  
  
  // weather icon
  // var iconcode = a.weather[0].icon;
  // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  