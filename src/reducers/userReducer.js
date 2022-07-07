import { USER_LIST_REQUEST, USER_LIST_SUCCESS } from '../utils/constants'

const initialState = {
  users: null,
  pages: 1,
  loading: false
}

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }

    case USER_LIST_SUCCESS:
      return {
        users: action.result.data,
        pages: action.result.total_pages,
        loading: false
      }

    default:
      return state
  }
}

export default userReducer
