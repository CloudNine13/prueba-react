import { USER_LIST_REQUEST } from '../utils/constants'

const getUsers = (page) => ({
  type: USER_LIST_REQUEST,
  page
})

export default getUsers
