import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  USER_TOKEN
} from '../utils/constants'

// Initial state of authentification
const initialState = {
  token: localStorage.getItem(USER_TOKEN),
  error: null,
  loading: false
}

/**
 * The method used to set state of authentification to different conditions according to type of actions
 * @param {Object} state is the dictionary of key-value type containing auth values such as token, error, etc.
 * @param {Object} action is the object used to get methods or types of dispatched actions performed in components
 * @returns state of authentification according to last type of action performed
 */
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOGIN_SUCCESS:
      return {
        token: action.result,
        error: null,
        loading: false
      }

    case LOGOUT_REQUEST:
      return { token: null, error: null, loading: false }

    default:
      return state
  }
}

export default authReducer
