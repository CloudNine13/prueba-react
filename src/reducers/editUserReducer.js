import { EDIT_REQUEST, EDIT_SUCCESS } from '../utils/constants'

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  updated_at: '',
  loadingEdit: true
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case EDIT_REQUEST:
      return {
        ...state,
        loadingEdit: true
      }

    case EDIT_SUCCESS: {
      const res = action.result
      return {
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        updated_at: res.updatedAt,
        loadingEdit: false
      }
    }

    default:
      return state
  }
}
