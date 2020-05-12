import {makeRequest} from "./RequestService";

const TIME_ZONE_API_KEY = 'FZBOIWSUNCQ9'

export const getTime = async (cityData) => {
  const timeZoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_ZONE_API_KEY}&format=json&by=position&lat=${cityData.coord.lat}&lng=${cityData.coord.lon}`
  return makeRequest(timeZoneUrl)
}

export const getFormattedTime = (timeZoneJson) => {
  return timeZoneJson && timeZoneJson.formatted ? timeZoneJson.formatted : 0
}