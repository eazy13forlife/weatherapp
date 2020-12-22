const getWeatherByCity = async (cityName, unit) => {
  const responseObject = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ef2e9d5820aa333383eb82d5350f8a6a&units=${unit}`
  );
  if (responseObject.ok) {
    const object = await responseObject.json();
    console.log(object);
    return {
      temp: Math.floor(object.main.temp),
      feels_like: Math.floor(object.main.feels_like),
      humidity: Math.floor(object.main.humidity),
      wind: Math.floor(object.wind.speed),
      cloudy_percentage: Math.floor(object.clouds.all),
    };
  } else {
    throw new Error("City not found");
  }
};

export default getWeatherByCity;
