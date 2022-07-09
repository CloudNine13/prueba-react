import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  RELEASE_DELETE
} from '../utils/constants'

const initialState = {
  users: null,
  pages: 1,
  current_page: 1,
  loadingUsers: false,
  loadingDelete: false,
  deleted_id: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loadingUsers: true
      }

    case USER_LIST_SUCCESS: {
      const ar = action.result
      if (state.deleted_id) {
        return {
          ...state,
          users: state.users.filter((user) => user.id !== state.deleted_id),
          current_page: ar.page,
          pages: ar.total_pages,
          loadingUsers: false
        }
      }
      return {
        ...state,
        users: ar.data,
        current_page: ar.page,
        pages: ar.total_pages,
        loadingUsers: false
      }
    }

    case USER_LIST_FAILURE:
      return {
        ...state,
        loadingUsers: false
      }

    case DELETE_REQUEST:
      return {
        ...state,
        loadingDelete: true
      }

    case DELETE_SUCCESS:
      return {
        ...state,
        deleted_id: action.id,
        loadingDelete: false
      }

    case DELETE_FAILURE:
      return { ...state, loadingDelete: false }

    case RELEASE_DELETE:
      return {
        ...state,
        deleted_id: null
      }

    default:
      return state
  }
}
