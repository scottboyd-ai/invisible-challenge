import {getCityByZip, getCityFromList} from "../CityService"
import {readFile} from "fs";

test('get valid city by zip', async () => {
  const city = await getCityByZip(80538)
  expect(city).toBe('Loveland')
});

test('get city by invalid zip', async () => {
  const city = await getCityByZip(99999)
  expect(city).toStrictEqual({})
})

test('get valid city from list', async () => {
  readFile('./city.list.json', async (err, data) => {
    if (err) {
      expect(err).toBeFalsy()
    }
    const cityList = JSON.parse(data.toString());
    const city = await getCityFromList('Loveland', cityList)
    expect(city.length).toBe(2)
  })
})