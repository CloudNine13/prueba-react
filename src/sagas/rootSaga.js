import { all } from 'redux-saga/effects'
import { watcherLogin, watcherLogout } from './authSaga'

// Configurating saga's watchers
function* rootSaga() {
  yield all([watcherLogin(), watcherLogout()])
}

export default rootSaga
