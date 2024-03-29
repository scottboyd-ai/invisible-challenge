'use strict'

import {readFile} from "fs"
import {getCityByZip, getCityFromList} from "./CityService"
import {getWeather, getWeatherDescription} from "./WeatherService"
import {getFormattedTime, getTime} from "./TimeService"

const input = "Fort Collins, 10005, Tokyo, São Paulo, Pluto"

export const main = async (input) => {

  readFile('./city.list.json', async (err, data) => {
    if (err) {
      console.log('Error reading city list.')
      return
    }
    const cityList = JSON.parse(data.toString())

    const locationArray = input.split(",")

    for (const location of locationArray) {
      console.log(await getOutput(location, cityList))
    }
  })
}

export const getOutput = async (location, cityList) => {
  const start = Date.now()
  let city = location.trim()

  if (parseInt(city)) {
    // Assume value is zip code
    city = await getCityByZip(city)
  }

  const cityObj = await getCityFromList(city, cityList)

  if (cityObj && cityObj.length >= 1) {
    const cityData: any = cityObj[0]
    const cityId = cityData.id

    const weatherJson = await getWeather(cityId)

    const timeZoneJson = await getTime(cityData)

    const time = getFormattedTime(timeZoneJson)

    const weatherDescription = getWeatherDescription(weatherJson.weather)

    // API rate limit of 1 req/s
    if (Date.now() - start <= 1000) {
      await new Promise((resolve) => {
        setTimeout(() => {resolve()}, 1000 - (Date.now() - start))
      })
    }

    return(`In ${city}, the time is currently ${time} and the weather is ${weatherDescription}`)

  } else {
    return(`Location '${city}' does not appear in our records. Please try again with a valid city or zip code`)
  }
}

main(input)
