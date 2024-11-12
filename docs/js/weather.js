var apiKey = 'c041f2001b625644fbb191f16075c628'; // Replace this with your API key
var city = 'shanghai'; // Replace this with the city you want to display the weather for

fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Display the weather data
    var weather = data.weather[0].description;
    var temperature = data.main.temp - 273.15; // Convert from Kelvin to Celsius

    document.getElementById('weather').textContent = 'Weather in ' + city + ': ' + weather + ', ' + temperature.toFixed(2) + '°C';
  });
