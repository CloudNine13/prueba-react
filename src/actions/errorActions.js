import { RELEASE_ERROR } from '../utils/constants'

export const setError = (error) => ({
  type: error.type,
  payload: error.err
})

export const releaseError = () => ({
  type: RELEASE_ERROR
})
