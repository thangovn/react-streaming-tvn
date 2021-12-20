import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { get } from "lodash"

const reduxDevTools = process?.env?.REACT_APP_DEV_ENV === "YES" ? true : false

const persistConfig = {
  key: "thangotvn.livestreaming.Storage",
  storage, // define which storage to use
  whitelist: ["sessionState"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = get(
  window,
  "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__",
  compose
)

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
if (reduxDevTools)
  store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

sagaMiddleware.run(rootSaga)
const persistor = persistStore(store)

export { store, persistor }
