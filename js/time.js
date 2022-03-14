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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
export function timeSet() {
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
}
