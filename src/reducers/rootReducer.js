import { combineReducers } from 'redux'
import authReducer from './authReducer'
import editUserReducer from './editUserReducer'
import errorReducer from './errorReducer'
import getDeleteReducer from './getDeleteReducer'

/**
 * Redux method used to map reducers to be able to use them as props in components
 */
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  getDelete: getDeleteReducer,
  edit: editUserReducer
})
