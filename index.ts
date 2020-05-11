import {readFile} from "fs";

const fetch = require('node-fetch')

const OPEN_WEATHER_MAP_API_KEY = '58c836297221843ddfc55ecb941c3c77'
const ZIP_CODE_API_KEY = 'JEf3YrmlDLaItqjZDgJw86htLRIxB2vzOAEMnGXTdpCDMOFEGdqq3HwooIzcBOgR'
const TIME_ZONE_API_KEY = 'FZBOIWSUNCQ9'

const main = async () => {

  readFile('./city.list.json', async (err, data) => {
    const cityList = JSON.parse(data.toString());

    const input = "Fort Collins, 10005, Tokyo, São Paulo, Pluto"

    const locationArray = input.split(",")

    for (const location of locationArray) {
      const start = Date.now()
      let city = location.trim()

      if (parseInt(city)) {
        // Assume value is zip code
        const zipCodeUrl = `https://www.zipcodeapi.com/rest/${ZIP_CODE_API_KEY}/info.json/${city}/degrees`
        const zipCodeRequest = await fetch(zipCodeUrl)
        const zipCodeJson = await zipCodeRequest.json()

        city = zipCodeJson.city;
      }

      const cityObj = cityList.filter((cityItem) => {
        return cityItem.name === city
      })

      if (cityObj && cityObj.length >= 1) {
        const cityData = cityObj[0];
        const cityId = cityData.id
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${OPEN_WEATHER_MAP_API_KEY}`
        const weatherResponse = await fetch(openWeatherUrl)
        const weatherJson = await weatherResponse.json()

        const timeZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_ZONE_API_KEY}&format=json&by=position&lat=${cityData.coord.lat}&lng=${cityData.coord.lon}`
        const timeZoneResponse = await fetch(timeZoneUrl)
        const timeZoneJson = await timeZoneResponse.json()

        let time = 0
        if (timeZoneJson && timeZoneJson.formatted) {
          time = timeZoneJson.formatted
        }

        let weatherDescription = ''

        for (const weatherDesc of weatherJson.weather) {
          if (weatherDescription) {
            weatherDescription += ` and ${weatherDesc.description}`
          } else {
            weatherDescription += `${weatherDesc.description}`
          }
        }

        console.log(`In ${city}, the time is currently ${time} and the weather is ${weatherDescription}`)

        // API rate limit of 1 req/s
        if (Date.now() - start <= 1000) {
          await new Promise((resolve) => {
            setTimeout(() => {resolve()}, 1000)
          })
        }
      } else {
        console.log(`Location '${city}' does not appear in our records. Please try again with a valid city or zip code`)
      }
    }
  })
}

main()
