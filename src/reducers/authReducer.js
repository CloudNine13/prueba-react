import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGIN_FAILURE,
  USER_TOKEN
} from '../utils/constants'

// Initial state of authentification
const initialState = {
  token: localStorage.getItem(USER_TOKEN),
  loading: false
}

/**
 * The method used to set state of authentification to different conditions according to type of actions
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} state is the object of key-value type containing auth values such as token, error, etc.
 * @param {Object} action is the object used to get methods or types of dispatched actions performed in components
 * @returns state of authentification according to last type of action performed
 */
const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loadingAuth: true
      }

    case LOGIN_SUCCESS:
      return {
        token: action.result,
        loadingAuth: false
      }

    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        loading: false
      }

    // Deleting token in case of logout
    case LOGOUT_REQUEST:
      return { token: null, loading: false }

    default:
      return state
  }
}

export default authReducer
