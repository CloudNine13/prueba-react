import { put, takeLatest } from 'redux-saga/effects'
import { loginAPI } from '../api/crud'
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  USER_TOKEN
} from '../utils/constants'
import { setError } from '../actions/errorActions'

/**
 * Saga's generator method to execute post call to API when watcherLogin is triggered
 * Sets user token to local storage
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} action used to pass user object to login request to API and trigger navigate function
 */
function* loginUser(action) {
  try {
    const result = yield loginAPI(action.user)
    localStorage.setItem(USER_TOKEN, result)
    action.navigate('/')
    yield put({ type: LOGIN_SUCCESS, result })
  } catch (e) {
    const { message } = e
    yield put({ type: LOGIN_FAILURE })
    yield put(setError(message))
  }
}

/**
 * Saga's generator method to execute when watcherLogout is triggered.
 * Deletes user token from local storage
 * @param {Object} action used to trigger navigate function
 */
function logoutUser(action) {
  localStorage.removeItem(USER_TOKEN)
  action.navigate('/login')
}

/**
 * Generator function used as login action watcher
 */
export function* watcherLogin() {
  yield takeLatest(LOGIN_REQUEST, loginUser)
}

/**
 * Generator function used as logout action watcher
 */
export function* watcherLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser)
}
