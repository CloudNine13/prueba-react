import { RELEASE_ERROR, SET_ERROR } from '../utils/constants'

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
})

export const releaseError = () => ({
  type: RELEASE_ERROR
})
