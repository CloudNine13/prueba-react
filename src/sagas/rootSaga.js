import { all } from 'redux-saga/effects'
import { watcherLogin, watcherLogout } from './authSaga'
import { watcherUserList, watcherUserEdit } from './userSaga'

// Configurating saga's watchers
function* rootSaga() {
  yield all([
    watcherLogin(),
    watcherLogout(),
    watcherUserList(),
    watcherUserEdit()
  ])
}

export default rootSaga
