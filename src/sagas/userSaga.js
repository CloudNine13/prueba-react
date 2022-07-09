import { put, takeLatest } from 'redux-saga/effects'
import { setError } from '../actions/errorActions'
import { getUsersAPI, editUserAPI } from '../api/user'
import {
  EDIT_REQUEST,
  EDIT_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS
} from '../utils/constants'

function* getUserList(action) {
  try {
    const result = yield getUsersAPI(action.page)
    yield put({ type: USER_LIST_SUCCESS, result })
  } catch (e) {
    const { message } = e
    yield put(setError(message))
  }
}

function* editUser(action) {
  try {
    const { user } = action
    const result = yield editUserAPI(user)
    // Setting editted user in detail component
    yield put({ type: EDIT_SUCCESS, result })
    action.setIsEditable((editable) => !editable)
  } catch (e) {
    const { message } = e
    yield put(setError(message))
  }
}

export function* watcherUserList() {
  yield takeLatest(USER_LIST_REQUEST, getUserList)
}

export function* watcherUserEdit() {
  yield takeLatest(EDIT_REQUEST, editUser)
}
