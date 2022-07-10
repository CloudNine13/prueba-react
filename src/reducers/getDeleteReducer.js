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

/**
 * The method used to set state of get or delete action to different conditions according to type of actions.
 * These actions are merged because delete actions affect the state of get user actions (i.e. in home component)
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} state is the object of key-value type containing get/delete actions values such as user object, number of pages, id of deleted user etc.
 * @param {Object} action is the object used to get values of dispatched actions performed in components
 * @returns state of get/delete actions according to last type of action performed
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loadingUsers: true
      }

    case USER_LIST_SUCCESS: {
      const ar = action.result
      // If user is deleted
      if (state.deleted_id) {
        return {
          ...state,
          users: state.users.filter((user) => user.id !== state.deleted_id),
          current_page: ar.page,
          pages: ar.total_pages,
          loadingUsers: false
        }
      }
      // If user is not deleted
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
