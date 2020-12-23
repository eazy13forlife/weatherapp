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
const searchCityEl = document.querySelector("#search_city");

//function that renders all the weather content to the screen. No errors are checked in this;
const renderWeatherNoError = async (cityName, unit) => {
  spanEl.setAttribute("style", "display:none");
  weatherContainerEl.setAttribute("style", "display:block");
  displayBackground(cityName, unit);
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
};

//function to handle errors for our renderWeather on page load
const handleErrorsPageLoad = (singleFunction) => {
  return (cityName, unit) => {
    return singleFunction(cityName, unit).catch((error) => {
      console.log("mike");
    });
  };
};
//function to handle errors for our general renderWeather function
const handleErrors = (singleFunction) => {
  return (cityName, unit) => {
    return singleFunction(cityName, unit).catch((error) => {
      mainSelector.setAttribute("style", "animation:opacity 1000ms forwards");
      weatherContainerEl.setAttribute("style", "display:none");
      spanEl.setAttribute("style", "display:block");
    });
  };
};

//our new general renderWeather function  after checking for errors
const renderWeather = handleErrors(renderWeatherNoError);

//our new renderWeather function for page load after checking for errors
const renderWeatherPageLoad = handleErrorsPageLoad(renderWeatherNoError);

//function to run when using our click or enter event to search for city name
const searchEvent = (e) => {
  let cityString = searchCityEl.value;
  if (cityString.trim() !== "") {
    renderWeather(cityString, "imperial");
    searchCityEl.value = "";
    mainSelector.setAttribute("style", "animation:none");
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
  searchCityEl,
  searchEvent,
  renderWeatherPageLoad,
};
