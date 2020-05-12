import {getFormattedTime, getTime} from "../TimeService"

test('get time valid', async () => {
  const latitude = 40.43
  const longitude = -105.08
  const cityData = {
    coord: {
      lat: latitude,
      lon: longitude
    }
  }
  const response = await getTime(cityData)
  expect(response.formatted).toBeTruthy()
})

test('get time invalid', async () => {
  const latitude = -90
  const longitude = -180
  const cityData = {
    coord: {
      lat: latitude,
      lon: longitude
    }
  }
  const response = await getTime(cityData)
  expect(response.status).toStrictEqual('FAILED')
  expect(response.formatted).toBeFalsy()
})

test('get formatted time valid', async () => {
  const latitude = 40.43
  const longitude = -105.08
  const cityData = {
    coord: {
      lat: latitude,
      lon: longitude
    }
  }
  const response = await getTime(cityData)
  const formattedTime = getFormattedTime(response)
  expect(formattedTime).toBeTruthy()
  expect(formattedTime).not.toStrictEqual(0)
})

test('get formatted time invalid', async () => {
  const latitude = -90
  const longitude = -180
  const cityData = {
    coord: {
      lat: latitude,
      lon: longitude
    }
  }
  const response = await getTime(cityData)
  const formattedTime = getFormattedTime(response)
  expect(formattedTime).toBeFalsy()
  expect(formattedTime).toStrictEqual(0)
})