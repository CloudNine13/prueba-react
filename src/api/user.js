import fetchBuilder from '../utils/requestBuilder'

export default async function getUsersAPI(page) {
  const fetchOptions = fetchBuilder('GET', null)
  const endpoint = `https://reqres.in/api/users?page=${page}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('Data cannot be downloaded')
  const result = await response.json()
  return result
}
