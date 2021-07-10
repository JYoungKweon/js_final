const API_KEY = "4626acfa759948367a23e28a2d0435bc";

let weatherIcon = {
  "01": "fas fa-sun",
  "02": "fas fa-cloud-sun",
  "03": "fas fa-cloud",
  "04": "fas fa-cloud-meatball",
  "09": "fas fa-cloud-sun-rain",
  "10": "fas fa-cloud-showers-heavy",
  "11": "fas fa-poo-storm",
  "13": "far fa-snowflake",
  "50": "fas fa-smog",
};

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  //console.log("You Live in ", lat, lon);
  const url = `
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector(".weather i");
      let iconData = data.weather[0].icon.substr(0, 2);
      weather.classList.add.apply(
        weather.classList,
        weatherIcon[iconData].split(" ")
      );
      //console.log(weatherIcon[iconData]);
      //console.log(weather);
    });
}
function onGeoError() {
  console.log("Can't find your location");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
