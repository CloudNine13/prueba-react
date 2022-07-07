import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../utils/constants'

/**
 *
 * @param {*} user
 * @param {*} navigate
 * @returns {*} a dictionary with keys: {type, payload, navigate}
 */
export const loginUser = (user, navigate) => ({
  type: LOGIN_REQUEST,
  user,
  navigate
})

export const logoutUser = (navigate) => ({
  type: LOGOUT_REQUEST,
  navigate
})
