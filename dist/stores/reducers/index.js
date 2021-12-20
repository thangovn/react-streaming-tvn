"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _liveStreamingState = _interopRequireDefault(require("./liveStreamingState"));

var _sessionState = _interopRequireDefault(require("./sessionState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootReducer = (0, _redux.combineReducers)({
  liveStreamingState: _liveStreamingState.default,
  sessionState: _sessionState.default
});
var _default = rootReducer;
exports.default = _default;