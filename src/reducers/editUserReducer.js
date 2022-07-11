import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  RELEASE_EDIT
} from '../utils/constants'

// Initial state of edit user action
const initialState = {
  first_name: '',
  last_name: '',
  id: '',
  email: '',
  updated_at: '',
  loadingEdit: false
}

/**
 * The method used to set state of edit to different conditions according to type of actions
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} state is the object of key-value type containing edit action values such as user's names, updated_at, etc.
 * @param {Object} action is the object used to get methods or types of dispatched actions performed in components
 * @returns state of edit according to last type of action performed
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case EDIT_REQUEST:
      return {
        ...state,
        loadingEdit: true
      }

    case EDIT_SUCCESS: {
      const ar = action.result
      return {
        first_name: ar.first_name,
        last_name: ar.last_name,
        id: '',
        email: ar.email,
        updated_at: ar.updatedAt,
        loadingEdit: false
      }
    }

    case EDIT_FAILURE: {
      return {
        ...state,
        loadingEdit: false
      }
    }

    case RELEASE_EDIT:
      return initialState

    default:
      return state
  }
}
