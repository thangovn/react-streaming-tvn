var _a;
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { get } from "lodash";
var reduxDevTools = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.REACT_APP_DEV_ENV) === "YES" ? true : false;
var persistConfig = {
    key: "thangotvn.livestreaming.Storage",
    storage: storage,
    whitelist: ["sessionState"],
};
var persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer
var sagaMiddleware = createSagaMiddleware();
var composeEnhancers = get(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", compose);
var store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
if (reduxDevTools)
    store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
var persistor = persistStore(store);
export { store, persistor };
