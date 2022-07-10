import fetchBuilder from '../utils/requestBuilder'

/**
 * Function used to make async get request to reqres API
 * @author Igor Dzichkovskii <Igordzich@gmail.com>
 * @param {Number} page is used to pass a number (page) to API as it is required by reqres
 * @returns {Object} users data object
 */
export async function getUsersAPI(page) {
  const fetchOptions = fetchBuilder('GET')
  const endpoint = `https://reqres.in/api/users?page=${page}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('Data cannot be downloaded')
  const result = await response.json()
  return result
}

/**
 * Function used to make async post request to reqres API
 * @param {Object} user is used to pass user's password and email to API as it is required by reqres
 * @returns {Object} users data object
 */
export async function loginAPI(user) {
  const body = JSON.stringify({
    email: user.email,
    password: user.password
  })

  const fetchOptions = fetchBuilder('POST', body)
  const endpoint = 'https://reqres.in/api/login'
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

/**
 * Function used to make async put request to reqres API
 * @param {Object} user is the object containing information to change
 * @returns {Object} changed user object
 */
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

/**
 * Function used to make async delete request to reqres API
 * @param {Object} user is the object containing information to change
 * @returns {Object} changed user object
 */
export async function deleteUserAPI(id) {
  const fetchOptions = fetchBuilder('DELETE', null)
  const endpoint = `https://reqres.in/api/users/${id}`
  const response = await fetch(endpoint, fetchOptions)
  if (!response.ok) throw new Error('User deletion returned error')
}
