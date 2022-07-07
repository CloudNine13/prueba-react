import fetchBuilder from '../utils/requestBuilder'

const endpoint = 'https://reqres.in/api/login'

export default async function loginAPI(user) {
  const fetchOptions = fetchBuilder(
    'POST',
    JSON.stringify({
      email: user.email,
      password: user.password
    })
  )

  let error = new Error('Email address is not correct')
  let response = null
  try {
    response = await fetch(endpoint, fetchOptions)
  } catch {
    error = new Error('No internet connection')
  }
  if (!response || !response.ok) throw error
  const result = await response.json()
  return result.token
}
