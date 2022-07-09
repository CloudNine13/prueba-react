import { combineReducers } from 'redux'
import authReducer from './authReducer'
import editUserReducer from './editUserReducer'
import errorReducer from './errorReducer'
import userReducer from './getUserReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  users: userReducer,
  edit: editUserReducer
})
