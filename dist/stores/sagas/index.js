"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rootSaga;

var _effects = require("redux-saga/effects");

var _liveStreamingSaga = _interopRequireDefault(require("./liveStreamingSaga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* rootSaga() {
  yield (0, _effects.all)([(0, _liveStreamingSaga.default)()]);
}