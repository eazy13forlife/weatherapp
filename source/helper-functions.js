import moment from "moment";
import { bodyEl } from "./views.js";
import getWeatherByCity from "./requests.js";
import nightSky from "./background-images/clearnight.jpg";
import daySky from "./background-images/clearskies.jpg";
console.log(nightSky);
//function that tells us cloud value based on cloudy percentage
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
/*
daytime background pic
body {
background-image: url("../images/clear-skies.jpg");
background-size: 150%;
}
body {
  background-image: url("../images/patrick-fore-HVFYFns30-I-unsplash.jpg");
  background-size: 100%;
}
*/
//function that displays the body background we want based on sunset/sunsrise
const displayBackground = async (cityName, unit) => {
  const object = await getWeatherByCity(cityName, unit);
  console.log(object);
  const sunrise = moment(object.sunrise + object.timezone)
    .utc()
    .toString();
  const sunset = moment(object.sunset + object.timezone)
    .utc()
    .toString();
  const universalTime = moment.utc().add(object.timezone).toString();
  console.log(universalTime);
  console.log(sunrise);
  console.log(sunset);
  //if the time is less than the citys sunset time but greater than the citys sunrise time, show sun because the sun is still up.
  if (universalTime <= sunrise) {
    console.log("hey");
    bodyEl.setAttribute("style", `background-image:url("${nightSky}")`);
    // show dark image
  } else if (universalTime > sunrise) {
    bodyEl.setAttribute("style", `background-image:url("${daySky}")`);
    console.log("heym");
  } else {
    console.log("yesc");
  }
};

const handleErrors = (singleFunction) => {
  return (cityName, unit) => {
    return singleFunction(cityName, unit).catch((error) => {
      console.log("city not found");
    });
  };
};
export { cloudValue, displayBackground };
