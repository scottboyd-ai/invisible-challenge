import {makeRequest} from "./RequestService"

const OPEN_WEATHER_MAP_API_KEY = '58c836297221843ddfc55ecb941c3c77'

export const getWeather = async (cityId) => {
  const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${OPEN_WEATHER_MAP_API_KEY}`
  return makeRequest(openWeatherUrl)
}

export const getWeatherDescription = (weather) => {
  let weatherDescription = ''
  for (const weatherDesc of weather) {
    if (weatherDescription) {
      weatherDescription += ` and ${weatherDesc.description}`
    } else {
      weatherDescription += `${weatherDesc.description}`
    }
  }
  return weatherDescription
}