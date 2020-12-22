import getWeatherByCity from "./requests.js";
import { enterSearch } from "./views.js";

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
searchCityEl.addEventListener("input", (e) => {
  const value = e.target.value;
  cityString = "";
  cityString = cityString + value;
  console.log(cityString);
});
searchCityEl.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    enterSearch(cityString, "imperial");
  }
});
