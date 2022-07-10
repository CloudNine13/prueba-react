import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers/rootReducer'
import rootSaga from '../sagas/rootSaga'

// Using Saga middleware
const sagaMiddleware = createSagaMiddleware()

/**
 * Redux function used to configurate and set vault of values, saga's middleware
 */
export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // using serializable false because of useNavigation() inside sagas
      serializableCheck: false
    }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)
