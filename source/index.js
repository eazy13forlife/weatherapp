import getWeatherByCity from "./requests.js";
getWeatherByCity("brussels", "imperial").then((weather) => {
  console.log(weather);
});
