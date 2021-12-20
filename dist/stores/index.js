"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.persistor = void 0;

var _redux = require("redux");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _sagas = _interopRequireDefault(require("./sagas"));

var _reduxPersist = require("redux-persist");

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _lodash = require("lodash");

var _process, _process$env;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const reduxDevTools = ((_process = process) === null || _process === void 0 ? void 0 : (_process$env = _process.env) === null || _process$env === void 0 ? void 0 : _process$env.REACT_APP_DEV_ENV) === "YES" ? true : false;
const persistConfig = {
  key: "thangotvn.livestreaming.Storage",
  storage: _storage.default,
  // define which storage to use
  whitelist: ["sessionState"]
};
const persistedReducer = (0, _reduxPersist.persistReducer)(persistConfig, _reducers.default); // create a persisted reducer

const sagaMiddleware = (0, _reduxSaga.default)();
const composeEnhancers = (0, _lodash.get)(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", _redux.compose);
let store = (0, _redux.createStore)(persistedReducer, (0, _redux.applyMiddleware)(sagaMiddleware));
exports.store = store;
if (reduxDevTools) exports.store = store = (0, _redux.createStore)(persistedReducer, composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware)));
sagaMiddleware.run(_sagas.default);
const persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;