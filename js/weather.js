const icon = document.querySelector(".curIcon");
const temperature = document.querySelector(".curTemp");
const city = document.querySelector(".city");
const moreInfoEl = document.getElementById("moreInfo");

let key = config.WEATHER_API;
//Get data from API
export const getData = async (latitude, longitude) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    const res = await fetch(url);
    const data = await res.json();

    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temperature.innerHTML = `<div>${data.weather[0].main}</div><div> ${data.main.temp}ºC</div>
    <div class="min-max-box"><span class="min">${data.main.temp_min}ºC</span><span class="max">${data.main.temp_max}ºC</span><div>`;
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    moreInfoEl.innerHTML = `<div id="windChill">Feels like: ${data.main.feels_like}ºC</div>
    <div>wind speed: ${data.wind.speed} km/h</div>
    <div>Humidity: ${data.main.humidity}%</div>
    <div>Pressure: ${data.main.pressure} kPa</div>`;

    return data;
  } catch (err) {
    console.error(err);
  }
};
navigator.geolocation.getCurrentPosition(function (location) {
  const latitude = String(location.coords.latitude);
  const longitude = String(location.coords.longitude);
  getData(latitude, longitude);
});
