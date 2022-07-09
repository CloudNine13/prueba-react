import { USER_LIST_REQUEST, EDIT_REQUEST } from '../utils/constants'

export const getUsers = (page) => ({
  type: USER_LIST_REQUEST,
  page
})

export const editUser = (user, setIsEditable) => ({
  type: EDIT_REQUEST,
  user,
  setIsEditable
})
