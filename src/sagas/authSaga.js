import { put, takeLatest } from 'redux-saga/effects'
import loginAPI from '../api/login'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  SET_ERROR,
  USER_TOKEN
} from '../utils/constants'
import { setError } from '../actions/errorActions'
/**
 * Method to execute when watcherLogin is triggered
 * @param {Object} action used to trigger navigate function
 */
function* loginUser(action) {
  try {
    const result = yield loginAPI(action.user)
    localStorage.setItem(USER_TOKEN, result)
    action.navigate('/')
    yield put({ type: LOGIN_SUCCESS, result })
  } catch (e) {
    const err = e.message
    yield put({ type: LOGIN_FAILURE })
    yield put(setError({ type: SET_ERROR, err }))
  }
}

/**
 * [Method to execute when watcherLogout is triggered]
 * @param {NavigateFunction} action [used to trigger navigate function]
 */
function logoutUser(action) {
  localStorage.removeItem(USER_TOKEN)
  action.navigate('/login')
}

// Login watcher
export function* watcherLogin() {
  yield takeLatest(LOGIN_REQUEST, loginUser)
}

// Logout watcher
export function* watcherLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser)
}
