import moment from "moment";
import { bodyEl } from "./views.js";
import getWeatherByCity from "./requests.js";

const cloudValue = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  const percent = object.cloudy_percentage;
  if (percent > 87) {
    return "Cloudy";
  } else if (percent > 69) {
    return "Mostly Cloudy";
  } else if (percent > 50) {
    return "Partly Sunny";
  } else if (percent > 25) {
    return "Mostly Sunny";
  } else {
    return "Sunny";
  }
};

const displayBackground = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  const sunrise = object.sunrise;
  const sunset = object.sunset;
  const universalTime = moment.utc().valueOf();
  //if the time is less than the citys sunset time but greater than the citys sunrise time, show sun because the sun is still up.
  if (universalTime >= sunrise && universalTime <= sunset) {
    bodyEl.setAttribute("style", "background-image:");
    // show dark image
  } else if (universalTime >= sunset && universalTime <= sunrise) {
    bodyEl.setAttribute("style", "background-image:");
  }
};
export { cloudValue, displayBackground };
