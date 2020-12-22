import getWeatherByCity from "./requests.js";
import { renderWeather } from "./views.js";

/**
clear at night is shining moon
clear when its sunny is sunny
cloudy when sunny is sun with cloud in it;
cloudy at night is cloud with moon in it;
sunrise or maybe 30 minutes after will show sun image;
sunset or maybe 30 minutes afterwill show night image;
**/

const searchCityEl = document.querySelector("#search_city");
let cityString = "";

//when we type in the search bar, the value of cityString changes
searchCityEl.addEventListener("input", (e) => {
  cityString = "";
  cityString = e.target.value;
});

//when we press enter in search bar, we call renderWeather with the value of cityString.
searchCityEl.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    renderWeather(cityString, "imperial");
  }
});
