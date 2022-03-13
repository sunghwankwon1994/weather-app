var key = config.WEATHER_API;

const icon = document.querySelector(".curIcon");
const temperature = document.querySelector(".curTemp");
const city = document.querySelector(".city");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const moreInfoEl = document.getElementById("moreInfo");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hourFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour < 12 ? "AM" : "PM";

  timeEl.innerHTML =
    (hourFormat < 10 ? "0" + hourFormat : hourFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

navigator.geolocation.getCurrentPosition(function (location) {
  const latitude = String(location.coords.latitude);
  const longitude = String(location.coords.longitude);
  getDataByLocating(latitude, longitude);
});
function getDataByLocating(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })
    .then((data) => {
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temperature.innerHTML = `<div>${data.weather[0].main}</div><div> ${data.main.temp}ºC</div>
      <div class="min-max-box"><span class="min">${data.main.temp_min}ºC</span><span class="max">${data.main.temp_max}ºC</span><div>`;
      city.innerHTML = `${data.name}, ${data.sys.country}`;
      moreInfoEl.innerHTML = `<div id="windChill">Feels like: ${data.main.feels_like}ºC</div>
      <div>wind speed: ${data.wind.speed} km/h</div>
      <div>Humidity: ${data.main.humidity}%</div>
      <div>Pressure: ${data.main.pressure} kPa</div>`;
    });
}
