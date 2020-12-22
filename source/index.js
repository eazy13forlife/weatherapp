import getWeatherByCity from "./requests.js";

getWeatherByCity("seattle", "imperial").then((weather) => {
  console.log(weather);
});
