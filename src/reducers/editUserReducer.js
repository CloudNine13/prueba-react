import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  RELEASE_EDIT
} from '../utils/constants'

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  updated_at: '',
  loadingEdit: false
}

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
