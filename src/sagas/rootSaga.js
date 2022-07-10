import { all } from 'redux-saga/effects'
import { watcherLogin, watcherLogout } from './authSaga'
import { watcherUserList, watcherUserEdit, watcherUserDelete } from './crudSaga'

/**
 * Generator function of Redix Saga used to set watchers
 */
function* rootSaga() {
  yield all([
    watcherLogin(),
    watcherLogout(),
    watcherUserList(),
    watcherUserEdit(),
    watcherUserDelete()
  ])
}

export default rootSaga
