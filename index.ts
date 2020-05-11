const fs = require('fs');
const fetch = require('node-fetch')

const OPEN_WEATHER_MAP_API_KEY = '58c836297221843ddfc55ecb941c3c77'
const ZIP_CODE_API_KEY = 'JEf3YrmlDLaItqjZDgJw86htLRIxB2vzOAEMnGXTdpCDMOFEGdqq3HwooIzcBOgR'

const main = async () => {

  fs.readFile('./city.list.json', async (err, data) => {
    const cityList = JSON.parse(data.toString());

    const input = "New York, 10005, Tokyo, São Paulo, Pluto"

    const locationArray = input.split(",")

    for (const location of locationArray) {
      const time = 0

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
        const cityId = cityObj[0].id
        const openWeatherURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${OPEN_WEATHER_MAP_API_KEY}`;
        const response = await fetch(openWeatherURL);
        const weatherJson = await response.json()

        // console.log(weatherJson)

        let weatherDescription = ''

        for (const weatherDesc of weatherJson.weather) {
          if (weatherDescription) {
            weatherDescription += ` and ${weatherDesc.description}`
          } else {
            weatherDescription += `${weatherDesc.description}`
          }
        }

        console.log(`In ${city}, the time is currently ${time} and the weather is ${weatherDescription}`)
      } else {
        console.log(`Location ${city} does not appear in our records. Please try again with a valid city or zip code`)
      }

    }
  })
}

main()
