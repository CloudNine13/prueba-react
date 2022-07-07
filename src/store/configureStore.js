import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

// Configurating redux store and saga middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Because of useNavigation() inside sagas
      serializableCheck: false
    }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

export default store
