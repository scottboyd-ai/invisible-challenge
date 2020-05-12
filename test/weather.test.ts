import {getWeather, getWeatherDescription} from "../WeatherService";

test('get city by valid id', async () => {
  const cityId = 5579368
  const response = await getWeather(cityId)
  console.log(response)
  expect(response).toBeTruthy()
  expect(response.weather).toBeTruthy()
  expect(response.weather.length).toBeGreaterThan(0)
})

test('get city by invalid id', async () => {
  const cityId = 999999999999
  const response = await getWeather(cityId)
  console.log(response)
  expect(response).toStrictEqual({})
})

test('get weather description single', () => {
  const weatherPatterns = [{
    description: 'rainy'
  }]
  const weatherDescription = getWeatherDescription(weatherPatterns)
  expect(weatherDescription).toStrictEqual('rainy')
})

test('get weather description multiple', () => {
  const weatherPatterns = [{
    description: 'rainy'
  },
    {
      description: 'cloudy'
    }]
  const weatherDescription = getWeatherDescription(weatherPatterns)
  expect(weatherDescription).toStrictEqual('rainy and cloudy')
})

test('get weather description none', () => {
  const weatherPatterns = []
  const weatherDescription = getWeatherDescription(weatherPatterns)
  expect(weatherDescription).toStrictEqual('')
})