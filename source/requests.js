import { weatherKey, geocoderKey } from "./configkeys.js";

//async function to get the weather details for a specific city
const getWeatherByCity = async (cityName, unit) => {
  const responseObject = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}&units=${unit}`
  );
  if (responseObject.ok) {
    const object = await responseObject.json();
    const fullLocation = await getState(cityName);
    return {
      temp: Math.floor(object.main.temp),
      feels_like: Math.floor(object.main.feels_like),
      humidity: Math.floor(object.main.humidity),
      wind: Math.floor(object.wind.speed),
      cloudy_percentage: Math.floor(object.clouds.all),
      ...fullLocation,
    };
  } else {
    throw new Error("City not found");
  }
};

//async function to get city, state,and counry for a speicific city
const getState = async (cityName) => {
  const responseObject = await fetch(
    `https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${geocoderKey}&searchtext=${cityName}`
  );
  if (responseObject.ok) {
    const objectData = await responseObject.json();
    const city = objectData.Response.View[0].Result[0].Location.Address.City;
    const state =
      objectData.Response.View[0].Result[0].Location.Address.AdditionalData[1]
        .value;
    const country =
      objectData.Response.View[0].Result[0].Location.Address.AdditionalData[0]
        .value;
    if (country === "United States") {
      return {
        city: city,
        State: state,
      };
    } else {
      return {
        city: city,
        State: country,
      };
    }
  } else {
    throw new Error("Location not found");
  }
};
export default getWeatherByCity;
