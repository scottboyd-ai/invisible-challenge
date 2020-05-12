import {getOutput} from "../index"
import {readFile} from "fs"

const testGetOutput = async (cityName, valid) => {
  readFile('./city.list.json', async (err, data) => {
    if (err) {
      expect(err).toBeFalsy()
    }
    const cityList = JSON.parse(data.toString())
    const output = await getOutput(cityName, cityList)
    expect(output).toBeTruthy()
    if (valid) {
      expect(output).toContain(`In ${cityName}, the time is currently`)
    } else {
      expect(output).toStrictEqual(`Location '${cityName}' does not appear in our records. Please try again with a valid city or zip code`)
    }
  })
}

test('get output statement for valid city by name', async () => {
  const cityName = 'Loveland'
  await testGetOutput(cityName, true)
})

test('get output statement for valid city by zip code', async () => {
  const cityName = '80538'
  await testGetOutput(cityName, true)
})

test('get output statement for invalid city by name', async () => {
  const cityName = 'Test city'
  await testGetOutput(cityName, false)
})

test('get output statement for invalid city by zip code', async () => {
  const cityName = '999999'
  await testGetOutput(cityName, false)
})