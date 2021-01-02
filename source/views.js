import moment from "moment";
import { getWeatherByCity } from "./requests.js";
import { onLoad } from "./index.js";
import { filters } from "./filters.js";
import { cloudValue, displayBackground, getTime } from "./helper-functions.js";

let cityString;
const cityNameEl = document.querySelector("#name");
const cloudyEl = document.querySelector("#cloudy");
const feelsLikeEl = document.querySelector("#feels_like");
const windEl = document.querySelector("#wind");
const humidityEl = document.querySelector("#humidity");
const bodyEl = document.querySelector("body");
const weatherContainerEl = document.querySelector(".weather-container");
const degrees = document.querySelector("#degrees");
const errorMessageEl = document.querySelector("#error_message");
const detailsDiv = document.querySelector(".details");
const mainSelector = document.querySelector("main");
const timeEl = document.querySelector("#time");
const searchCityEl = document.querySelector("#search_city");
const celsiusCheckbox = document.querySelector("#celsius");

//function that renders all the weather content to the screen. No errors are checked in this;
const renderWeatherNoError = async (cityName, unit) => {
  elementsOnSuccess();
  await displayBackground(cityName, unit);
  const object = await getWeatherByCity(cityName, unit);
  mainSelector.setAttribute("style", "animation:opacity 800ms forwards");
  cityNameEl.textContent = `${object.city}, ${object.state}`;
  cloudyEl.textContent = await cloudValue(cityName, unit);
  timeEl.textContent = await getTime(cityName, unit);
  //setInterval(async () => {
  //timeEl.textContent = await getTime(cityName, unit);
  //}, 6000);
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

// function that displays correct elements when there are  errors on the page
const elementsOnError = () => {
  mainSelector.setAttribute("style", "animation:opacity 1000ms forwards");
  weatherContainerEl.setAttribute("style", "display:none");
  errorMessageEl.setAttribute("style", "display:block");
  timeEl.setAttribute("style", "display:none");
};

// function that displays correct elements when there are no errors on the page
const elementsOnSuccess = () => {
  timeEl.setAttribute("style", "display:block");
  errorMessageEl.setAttribute("style", "display:none");
  weatherContainerEl.setAttribute("style", "display:block");
};

// function to handle errors for our renderWeather on page load
const handleErrorsPageLoad = (singleFunction) => {
  return (cityName, unit) => {
    return singleFunction(cityName, unit).catch((error) => {
      singleFunction("Los Angeles", unit);
    });
  };
};

// function to handle errors for our general renderWeather function
const handleErrors = (singleFunction) => {
  return (cityName, unit) => {
    return singleFunction(cityName, unit).catch((error) => {
      elementsOnError();
    });
  };
};

// our new general renderWeather function  after checking for errors
const renderWeather = handleErrors(renderWeatherNoError);

// our new renderWeather function for page load after checking for errors
const renderWeatherPageLoad = handleErrorsPageLoad(renderWeatherNoError);

// function to run when using our click or enter event to search for city name
const searchEvent = (e) => {
  cityString = searchCityEl.value;
  if (cityString.trim() !== "") {
    // if checkmark is checked, run renderWeather using metric unit, otherwise using imperial
    if (filters.celsiusCheck) {
      renderWeather(cityString, "metric");
    } else {
      renderWeather(cityString, "imperial");
    }
    searchCityEl.value = "";
    // remove animation on our main tag, so renderWeather can add it back again when it is called
    mainSelector.setAttribute("style", "animation:none");
  }
};

// function to run when clicking our checkbox
const displayOnCheckbox = (e) => {
  // if there is no cityString value, meaning page just opened and we are getting the person's ip address to find the page, run onLoad function
  if (!cityString) {
    if (filters.celsiusCheck) {
      onLoad("metric");
    } else {
      onLoad("imperial");
    }
  } else {
    // otherwise, call renderWeather with the correct units.
    if (filters.celsiusCheck) {
      renderWeather(cityString, "metric");
    } else {
      renderWeather(cityString, "imperial");
    }
  }
};

export {
  bodyEl,
  renderWeather,
  detailsDiv,
  weatherContainerEl,
  errorMessageEl,
  mainSelector,
  timeEl,
  searchCityEl,
  searchEvent,
  renderWeatherPageLoad,
  celsiusCheckbox,
  displayOnCheckbox,
};
