$(document).ready(function() {

  var celsius = true;
  var temperature = 0;

  navigator.geolocation.getCurrentPosition(foundLocation, noLocation);

  function foundLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=734149a28a162443ecdc9094141d48fd&units=metric";
    $.getJSON(weatherApi, function(json) {
      console.log(json);
      $('#header').html("The Weather in " + json.name);
      $('#sky-condition').html(json.weather[0].description.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '));
      temperature = Math.round(json.main.temp);
      $('#temperature').html(temperature + "°C (click to convert to °F)");
      if (json.weather[0].id >= 200 && json.weather[0].id <= 232) {
        $('#picture').addClass('stormy');
      } else if (json.weather[0].id >= 300 && json.weather[0].id <= 531) {
        $('#picture').addClass('rainy');
      } else if (json.weather[0].id >= 600 && json.weather[0].id <= 622) {
        $('#picture').addClass('snowy');
      } else if (json.weather[0].id == 800) {
        $('#picture').addClass('sunny');
      } else if (json.weather[0].id >= 801 && json.weather[0].id <= 804) {
        $('#picture').addClass('cloudy');
      }
      $('#wind').html(json.wind.speed + "m/s [" + json.wind.deg + "°]");
      $('#humidity').html(json.main.humidity + "%");
      $('#sunrise').html(convertTime(json.sys.sunrise));
      $('#sunset').html(convertTime(json.sys.sunset));
    });
  }

  function noLocation() {
    alert('Could not find location');
  }

  function changeTemperature() {
    if (celsius) {
      temperature = Math.round(temperature * 1.8 + 32);
      $('#temperature').html(temperature + "°F(click to convert to °C)");
      celsius = false;
    } else {
      temperature = Math.round((temperature - 32) / 1.8);
      $('#temperature').html(temperature + "°C (click to convert to °F)");
      celsius = true;
    }
  }

  $('#temperature').click(changeTemperature);

  function convertTime(time) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(time * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    // Will display time in 10:30:23 format
    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }

});