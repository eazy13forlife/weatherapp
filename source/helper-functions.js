import moment from "moment";
import { bodyEl, weatherContainerEl, spanEl, timeEl } from "./views.js";
import { getWeatherByCity } from "./requests.js";
import nightSky from "./background-images/clearnight.jpg";
import daySky from "./background-images/clearskies.jpg";

//function that tells us cloud value based on cloudy percentage
const cloudValue = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  const percent = object.cloudy_percentage;
  if (percent > 87) {
    return "Cloudy";
  } else if (percent > 69) {
    return "Mostly Cloudy";
  } else if (percent > 50) {
    return "Partly Clear";
  } else if (percent > 25) {
    return "Mostly Clear";
  } else {
    return "Clear";
  }
};

//function that displays the body background we want based on sunset/sunsrise
const displayBackground = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  const sunrise = object.sunrise + object.timezone;
  const sunset = object.sunset + object.timezone;
  const universalTime = moment.utc().add(object.timezone).valueOf();
  //if the time is less than the citys sunset time but greater than the citys sunrise time, show sun because the sun is still up.
  if (universalTime <= sunrise) {
    bodyEl.setAttribute(
      "style",
      `background-image:url(${nightSky});background-size:130%,background-position:0, 20px;`
    );
    addClass("night", timeEl, weatherContainerEl, spanEl);
    // show dark image
  } else if (universalTime > sunrise) {
    bodyEl.setAttribute("style", `background-image:url(${daySky});`);
    removeClass("night", timeEl, weatherContainerEl, spanEl);
  }
};

//function to add a class to a list of elements
const addClass = (className, ...elements) => {
  elements.forEach((element) => {
    element.classList.add(className);
  });
};

//function to remove a class from a list of elements
const removeClass = (className, ...elements) => {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
};
//get the current time for our city
const getTime = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  const time = moment.utc().add(object.timezone).format("MMM Do, h:mm a");
  return time;
};

export { cloudValue, displayBackground, getTime };
