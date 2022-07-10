import { RELEASE_ERROR, SET_ERROR } from '../utils/constants'

/**
 * This is the function used to set action to show an error
 * @param {string} error is the error message which needs to be shown
 * @returns {Object} an object with keys: {type, payload}
 */
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
})

/**
 * This is the function used to release error (set off the timer) action
 * @returns {Object} an object with type key
 */
export const releaseError = () => ({
  type: RELEASE_ERROR
})
