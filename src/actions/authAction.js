import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../utils/constants'

// eslint-disable-next-line import/prefer-default-export
export const loginUser = (user, navigate) => ({
  type: LOGIN_REQUEST,
  payload: user,
  navigate
})

export const logoutUser = (navigate) => ({
  type: LOGOUT_REQUEST,
  navigate
})
