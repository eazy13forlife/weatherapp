import moment from "moment";
import { getWeatherByCity } from "./requests.js";
import { cloudValue, displayBackground, getTime } from "./helper-functions.js";

const cityNameEl = document.querySelector("#name");
const cloudyEl = document.querySelector("#cloudy");
const feelsLikeEl = document.querySelector("#feels_like");
const windEl = document.querySelector("#wind");
const humidityEl = document.querySelector("#humidity");
const bodyEl = document.querySelector("body");
const weatherContainerEl = document.querySelector(".weather-container");
const degrees = document.querySelector("#degrees");
const spanEl = document.querySelector("span");
const detailsDiv = document.querySelector(".details");
const mainSelector = document.querySelector("main");
const timeEl = document.querySelector("#time");

//function that renders all the weather content to the screen;
const renderWeather = async (cityName, unit) => {
  try {
    spanEl.setAttribute("style", "display:none");
    weatherContainerEl.setAttribute("style", "display:block");
    await displayBackground(cityName, unit);
    const object = await getWeatherByCity(cityName, unit);
    mainSelector.setAttribute("style", "animation:opacity 1000ms forwards");
    cityNameEl.textContent = `${object.city}, ${object.state}`;
    cloudyEl.textContent = await cloudValue(cityName, unit);
    timeEl.textContent = await getTime(cityName, unit);
    //right after some text has shown on the screen but before the details div shows, remove the remove-border class so our border can show again.
    detailsDiv.classList.remove("remove-border");
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
  } catch (e) {
    mainSelector.setAttribute("style", "animation:opacity 1000ms forwards");
    weatherContainerEl.setAttribute("style", "display:none");
    spanEl.setAttribute("style", "display:block");
  }
};

export {
  bodyEl,
  renderWeather,
  detailsDiv,
  weatherContainerEl,
  spanEl,
  mainSelector,
  timeEl,
};
