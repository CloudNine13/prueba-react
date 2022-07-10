import {
  USER_LIST_REQUEST,
  EDIT_REQUEST,
  RELEASE_EDIT,
  DELETE_REQUEST,
  RELEASE_DELETE
} from '../utils/constants'

/**
 * This is the function used to set action to get user list
 * @param {Number} page is the page number required by API
 * @returns {Object} an object with keys: {type, page}
 */
export const getUsers = (page) => ({
  type: USER_LIST_REQUEST,
  page
})

/**
 * This is the function used to set action to get user list
 * @param {Object} user is the user object containing the user's data to edit
 * @param {Function} setIsEditable is the `useState()` set function to change isEditable state (to show or hide edit form)
 * @returns {Object} an object with keys: {type, user, setIsEditable}
 */
export const editUser = (user, setIsEditable) => ({
  type: EDIT_REQUEST,
  user,
  setIsEditable
})

/**
 * This is the function used to release edit changes action
 * @returns {Object} an object with type key
 */
export const releaseEdit = () => ({
  type: RELEASE_EDIT
})

/**
 * This is the function used to set action to delete user from API
 * @param {Number} id is the user id number required by API
 * @param {Function} navigate is the function to navigate after delete is successful
 * @returns {Object} an object with keys: {type, id, navigate}
 */
export const deleteUser = (id, navigate) => ({
  type: DELETE_REQUEST,
  id,
  navigate
})

/**
 * This is the function used to release delete changes action
 * @returns {Object} an object with type key
 */
export const releaseDelete = () => ({
  type: RELEASE_DELETE
})
