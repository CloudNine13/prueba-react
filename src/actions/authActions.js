import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../utils/constants'

/**
 * This is the function used to set action to log in user
 * @author Igor Dzichkovskii <Igordzichkovskii@gmail.com>
 * @param {Object} user used to set user object to process in saga/api
 * @param {Function} navigate is the function to navigate after login is successful
 * @returns {Object} an object with keys: {type, payload, navigate}
 */
export const loginUser = (user, navigate) => ({
  type: LOGIN_REQUEST,
  user,
  navigate
})

/**
 * This is the function used to set action to log out user
 * @param {Function} navigate is the function to navigate after logout is successful
 * @returns {Object} an object with keys: {type, navigate}
 */
export const logoutUser = (navigate) => ({
  type: LOGOUT_REQUEST,
  navigate
})
