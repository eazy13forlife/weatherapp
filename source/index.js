import { getWeatherByCity, getCurrentCity } from "./requests.js";
import {
  renderWeather,
  detailsDiv,
  mainSelector,
  searchCityEl,
  searchEvent,
  renderWeatherPageLoad,
} from "./views.js";
import moment from "moment";
/**
clear at night is shining moon
clear when its sunny is sunny
cloudy when sunny is sun with cloud in it;
cloudy at night is cloud with moon in it;
sunrise or maybe 30 minutes after will show sun image;
sunset or maybe 30 minutes afterwill show night image;
**/

//for some reason the border to the left of the details div shows at page load, so I added a class that remooves this border on page load. We will add this border back into renderweather function instead.
detailsDiv.classList.add("remove-border");
const searchIcon = document.querySelector("#search_icon");

//on page load, call onLoad
const onLoad = async (unit) => {
  const city = await getCurrentCity();
  renderWeatherPageLoad(city, unit);
};

onLoad("imperial");

//when we press enter in search bar, we call renderWeather with the value of cityString.
searchCityEl.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    searchEvent(e);
  }
});

//when we click search icon, we call renderWeather with the value of cityString.
searchIcon.addEventListener("click", searchEvent);
