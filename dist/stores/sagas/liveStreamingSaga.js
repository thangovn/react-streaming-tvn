"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = liveStreamingSaga;

var _liveStreamingActions = _interopRequireDefault(require("../actions/liveStreamingActions"));

var _classnames = _interopRequireDefault(require("classnames"));

var _effects = require("redux-saga/effects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* handleGiftReceive(data) {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;

  const {
    giftNotifyBaseClass,
    giftContainerId
  } = yield (0, _effects.select)(state => state.liveStreamingState);
  yield (0, _effects.put)(_liveStreamingActions.default.appendGiftHistories(data.payload));
  yield (0, _effects.put)(_liveStreamingActions.default.showGift(data.payload));
  (_document$getElementB = document.getElementById(giftContainerId)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.setAttribute("class", (0, _classnames.default)(giftNotifyBaseClass, "animate__fadeInRight"));
  yield (0, _effects.delay)(2000, true);
  (_document$getElementB2 = document.getElementById(data.payload.queue_id)) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.setAttribute("class", (0, _classnames.default)(giftNotifyBaseClass, "animate__fadeOutLeft"));
  (_document$getElementB3 = document.getElementById(giftContainerId)) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.setAttribute("class", (0, _classnames.default)(giftNotifyBaseClass, "animate__animated animate__fadeOutLeft"));
  yield (0, _effects.delay)(2000, true);
  (_document$getElementB4 = document.getElementById(data.payload.queue_id)) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.remove();
}

function* liveStreamingSaga() {
  yield (0, _effects.throttle)(3000, _liveStreamingActions.default.actionTypes.HANDLE_RAPID_PUSH_GIFT, handleGiftReceive);
}