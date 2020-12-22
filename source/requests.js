import { weatherKey, geocoderKey } from "./configkeys.js";

const getWeatherByCity = async (cityName, unit) => {
  const responseObject = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=${unit}`
  );
  if (responseObject.ok) {
    const object = await responseObject.json();
    const locationName = await getState(cityName);
    return {
      temp: Math.floor(object.main.temp),
      feels_like: Math.floor(object.main.feels_like),
      humidity: Math.floor(object.main.humidity),
      wind: Math.floor(object.wind.speed),
      cloudy_percentage: Math.floor(object.clouds.all),
      ...locationName,
    };
  } else {
    throw new Error("City not found");
  }
};

const getState = async (cityName) => {
  const responseObject = await fetch(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${geocoderKey}&searchtext=${cityName}`
  );
  if (responseObject.ok) {
    const objectData = await responseObject.json();
    const addressObject =
      objectData.Response.View[0].Result[0].Location.Address;
    if (addressObject.Country === "USA") {
      return {
        city: addressObject.City,
        State: addressObject.State,
      };
    } else {
      return {
        city: addressObject.City,
        State: addressObject.Country,
      };
    }
  } else {
    throw new Error("Location not found");
  }
};
export default getWeatherByCity;
