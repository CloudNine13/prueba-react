import {
  USER_LIST_REQUEST,
  EDIT_REQUEST,
  RELEASE_EDIT,
  DELETE_REQUEST,
  RELEASE_DELETE
} from '../utils/constants'

export const getUsers = (page) => ({
  type: USER_LIST_REQUEST,
  page
})

export const editUser = (user, setIsEditable) => ({
  type: EDIT_REQUEST,
  user,
  setIsEditable
})

export const releaseEdit = () => ({
  type: RELEASE_EDIT
})

export const deleteUser = (id, navigate) => ({
  type: DELETE_REQUEST,
  id,
  navigate
})

export const releaseDelete = () => ({
  type: RELEASE_DELETE
})
