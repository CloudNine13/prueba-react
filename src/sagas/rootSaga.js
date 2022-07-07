import { all } from 'redux-saga/effects'
import { watcherLogin, watcherLogout } from './authSaga'
import watcherUserList from './userSaga'

// Configurating saga's watchers
function* rootSaga() {
  yield all([watcherLogin(), watcherLogout(), watcherUserList()])
}

export default rootSaga
