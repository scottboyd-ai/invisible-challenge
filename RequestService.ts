import * as  fetch from "node-fetch"

export const makeRequest = async (url: string) => {
  const response = await fetch(url)
  if (response.ok) {
    return response.json()
  } else {
    return {}
  }
}