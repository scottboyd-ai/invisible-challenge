import {makeRequest} from "../RequestService"

test('make valid request', async () => {
  const response = await makeRequest('http://ip.jsontest.com/')
  expect(response.ip).toBeTruthy()
})