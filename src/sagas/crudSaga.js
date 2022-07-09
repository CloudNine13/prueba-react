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

export function* watcherUserList() {
  yield takeLatest(USER_LIST_REQUEST, getUserList)
}

export function* watcherUserEdit() {
  yield takeLatest(EDIT_REQUEST, editUser)
}

export function* watcherUserDelete() {
  yield takeLatest(DELETE_REQUEST, deleteUser)
}
