import { put, takeLatest } from 'redux-saga/effects'
import loginAPI from '../api/login'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  USER_TOKEN
} from '../utils/constants'

/**
 * Method to execute when watcherLogin is triggered
 * @param {Object} action used to trigger navigate function
 */
function* loginUser(action) {
  try {
    const res = yield loginAPI(action.payload)
    localStorage.setItem(USER_TOKEN, res)
    action.navigate('/home')
    yield put({ type: LOGIN_SUCCESS, res })
  } catch (e) {
    yield put({ type: LOGIN_FAILURE, error: e.message })
  }
}

/**
 * [Method to execute when watcherLogout is triggered]
 * @param {NavigateFunction} action [used to trigger navigate function]
 */
function logoutUser(action) {
  localStorage.removeItem(USER_TOKEN)
  action.navigate('/')
}

// Login watcher
export function* watcherLogin() {
  yield takeLatest(LOGIN_REQUEST, loginUser)
}

// Logout watcher
export function* watcherLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser)
}
