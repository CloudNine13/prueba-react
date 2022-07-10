import { SET_ERROR, RELEASE_ERROR } from '../utils/constants'

const initialState = {
  text: null
}

/**
 * The method used to set or release error according to type of actions
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} state is the object of key-value type containing text of error.
 * @param {Object} action is the object used to set messages of dispatched errors in components
 * @returns state of error according to last type of action performed
 */
const errorReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        text: action.payload
      }

    case RELEASE_ERROR:
      return initialState

    default:
      return state
  }
}

export default errorReducer
