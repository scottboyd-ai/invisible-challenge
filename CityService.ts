import {makeRequest} from "./RequestService"
const ZIP_CODE_API_KEY = 'JEf3YrmlDLaItqjZDgJw86htLRIxB2vzOAEMnGXTdpCDMOFEGdqq3HwooIzcBOgR'

export const getCityByZip = async (zipCode: string | number) => {
  const zipCodeUrl = `https://www.zipcodeapi.com/rest/${ZIP_CODE_API_KEY}/info.json/${zipCode}/degrees`
  const city = await makeRequest(zipCodeUrl)
  return city && city.city ? city.city : {}
}

export const getCityFromList = async (city: string, cityList: any) => {
  return cityList.filter((cityItem: any) => {
    const cityItemName = cityItem.name.toLowerCase()
    const cityName = city.toLowerCase()
    return cityItemName === cityName
  })
}