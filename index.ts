const fetch = require('node-fetch')

const OPEN_WEATHER_MAP_API_KEY = '58c836297221843ddfc55ecb941c3c77'
const ZIP_CODE_API_KEY = 'HsZQRDGQFQIwFM3FuxLnUD7jMu2XV8v13ef7A8ZYCizOqLePdhDNj1XVZfthBJtd'

const input = "80538"

const locationArray = input.split(",")

const main = async () => {

  for (const location of locationArray) {
    const time = 0
    const weather = ''

    let city = ''

    if (parseInt(location)) {
      // Assume value is zip code
      // Use Zip Code API to get city
      const zipCodeRequest = await fetch(`https://www.zipcodeapi.com/rest/${ZIP_CODE_API_KEY}/info.json/${location}/degrees`)
      const zipCodeJson = await zipCodeRequest.json()
      city = zipCodeJson.city;
    } else {
      city = location;
    }

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}`);
    const json = await response.json()
    console.log(json)

    console.log(`In ${city}, the time is currently ${time} and the weather is ${weather}`)
  }
}

main()
