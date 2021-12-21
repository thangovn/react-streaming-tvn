"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = exports.store = void 0;
var redux_1 = require("redux");
var redux_saga_1 = __importDefault(require("redux-saga"));
var reducers_1 = __importDefault(require("./reducers"));
var sagas_1 = __importDefault(require("./sagas"));
var redux_persist_1 = require("redux-persist");
var storage_1 = __importDefault(require("redux-persist/lib/storage"));
var lodash_1 = require("lodash");
var reduxDevTools = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.REACT_APP_DEV_ENV) === "YES" ? true : false;
var persistConfig = {
    key: "thangotvn.livestreaming.Storage",
    storage: storage_1.default,
    whitelist: ["sessionState"],
};
var persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, reducers_1.default); // create a persisted reducer
var sagaMiddleware = (0, redux_saga_1.default)();
var composeEnhancers = (0, lodash_1.get)(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", redux_1.compose);
var store = (0, redux_1.createStore)(persistedReducer, (0, redux_1.applyMiddleware)(sagaMiddleware));
exports.store = store;
if (reduxDevTools)
    exports.store = store = (0, redux_1.createStore)(persistedReducer, composeEnhancers((0, redux_1.applyMiddleware)(sagaMiddleware)));
sagaMiddleware.run(sagas_1.default);
var persistor = (0, redux_persist_1.persistStore)(store);
exports.persistor = persistor;
