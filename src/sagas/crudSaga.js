import { put, takeLatest } from 'redux-saga/effects'
import { setError } from '../actions/errorActions'
import { getUsersAPI, editUserAPI, deleteUserAPI } from '../api/crud'
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE
} from '../utils/constants'

/**
 * Saga's generator method to execute get API call when watcherLogin is triggered
 * @author Igor Dzichkovskii <igordzich@gmail.com>
 * @param {Object} action used to pass page number to get request of API
 */
function* getUserList(action) {
  try {
    const result = yield getUsersAPI(action.page)
    yield put({ type: USER_LIST_SUCCESS, result })
  } catch (e) {
    const { message } = e
    yield put({ type: USER_LIST_FAILURE })
    yield put(setError(message))
  }
}

/**
 * Saga's generator method to execute put API call when watcherLogin is triggered
 * @param {Object} action used to pass user object to put request of API. Uses `setIsEditable()` to set edit form to false when succeeds
 */
function* editUser(action) {
  try {
    const result = yield editUserAPI(action.user)
    yield put({ type: EDIT_SUCCESS, result })
    // Setting editted user in detail component
    action.setIsEditable((editable) => !editable)
  } catch (e) {
    const { message } = e
    yield put({ type: EDIT_FAILURE })
    yield put(setError(message))
  }
}

/**
 * Saga's generator method to execute delete API call when watcherLogin is triggered
 * @param {Object} action used to pass id  of user to delete request of API. Also navigates back when request succeeds
 */
function* deleteUser(action) {
  try {
    yield deleteUserAPI(action.id)
    action.navigate(-1)
    yield put({ type: DELETE_SUCCESS, id: action.id })
  } catch (e) {
    const { message } = e
    yield put({ type: DELETE_FAILURE })
    yield put(setError(message))
  }
}

/**
 * Generator function used as get users action watcher
 */
export function* watcherUserList() {
  yield takeLatest(USER_LIST_REQUEST, getUserList)
}

/**
 * Generator function used as edit user action watcher
 */
export function* watcherUserEdit() {
  yield takeLatest(EDIT_REQUEST, editUser)
}

/**
 * Generator function used as delete user action watcher
 */
export function* watcherUserDelete() {
  yield takeLatest(DELETE_REQUEST, deleteUser)
}
