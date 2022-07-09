import fetchBuilder from '../utils/requestBuilder'

export async function getUsersAPI(page) {
  const fetchOptions = fetchBuilder('GET')
  const endpoint = `https://reqres.in/api/users?page=${page}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('Data cannot be downloaded')
  const result = await response.json()
  return result
}

export async function editUserAPI(user) {
  const body = JSON.stringify({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  })

  const fetchOptions = fetchBuilder('PUT', body)
  const endpoint = `https://reqres.in/api/users/${user.id}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('User cannot be editted')
  const result = await response.json()
  return result
}

export async function deleteUserAPI(id) {
  const fetchOptions = fetchBuilder('DELETE', null)
  const endpoint = `https://reqres.in/api/users/${id}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('User deletion returned error')
}
