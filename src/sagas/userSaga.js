import { put, takeLatest } from 'redux-saga/effects'
import { setError } from '../actions/errorActions'
import getUsersAPI from '../api/user'
import {
  SET_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS
} from '../utils/constants'

function* getUserList(action) {
  try {
    const result = yield getUsersAPI(action.page)
    yield put({ type: USER_LIST_SUCCESS, result })
  } catch (e) {
    const err = e.message
    yield put(setError({ type: SET_ERROR, err }))
  }
}

function* watcherUserList() {
  yield takeLatest(USER_LIST_REQUEST, getUserList)
}

export default watcherUserList
