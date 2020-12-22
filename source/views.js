import moment from "moment";
import getWeatherByCity from "./requests.js";
import { cloudValue } from "./helper-functions.js";

const cityNameEl = document.querySelector("#name");
const cloudyEl = document.querySelector("#cloudy");
const feelsLikeEl = document.querySelector("#feels_like");
const windEl = document.querySelector("#wind");
const humidityEl = document.querySelector("#humidity");
const bodyEl = document.querySelector("body");
const degrees = document.querySelector("#degrees");

const enterSearch = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  cityNameEl.textContent = `${object.city}, ${object.state}`;
  cloudyEl.textContent = await cloudValue(cityName);
  if (unit === "imperial") {
    degrees.innerHTML = `${object.temp}&#8457`;
    feelsLikeEl.innerHTML = `Feels like: ${object.feels_like}&#8457`;
    windEl.textContent = `Wind: ${object.wind} MPH`;
  } else if (unit === "metric") {
    degrees.innerHTML = `${object.temp} &#8451`;
    feelsLikeEl.innerHTML = `Feels like: ${object.feels_like} &#8451`;
    windEl.textContent = `Wind: ${object.wind} M/S`;
  }
  humidityEl.textContent = `Humidity: ${object.humidity}%`;
};

export { bodyEl, enterSearch };
