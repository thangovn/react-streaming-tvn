"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _liveStreamingActions = _interopRequireDefault(require("../actions/liveStreamingActions"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialState = {
  giftNotifyBaseClass: "d-flex align-items-center box-gift-item rounded-pill p-1 my-3 animate__animated",
  giftContainerBaseClass: "gift-animate-container animate__animated",
  giftContainerId: "gift-container",
  showGift: false,
  tryReconnect: false,
  gift: null,
  chanelMessages: null
};

var _default = function _default() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _liveStreamingActions.default.actionTypes.SHOW_GIFT:
      return _objectSpread(_objectSpread({}, state), {}, {
        showGift: true,
        gift: action.gift
      });

    case _liveStreamingActions.default.actionTypes.SHOW_GIFT:
      return _objectSpread(_objectSpread({}, state), {}, {
        showGift: true,
        gift: action.gift
      });

    case _liveStreamingActions.default.actionTypes.CLOSE_GIFT:
      return _objectSpread(_objectSpread({}, state), {}, {
        showGift: false,
        gift: null
      });

    case _liveStreamingActions.default.actionTypes.SET_LIVE_CHAT_MESSAGES:
      return _objectSpread(_objectSpread({}, state), {}, {
        chanelMessages: {
          [action.payload.chanel_id]: action.payload.messages
        }
      });

    case _liveStreamingActions.default.actionTypes.APPEND_LIVE_CHAT_MESSAGE:
      if (!(0, _lodash.get)(state, ["chanelMessages", action.payload.chanel_id])) (0, _lodash.set)(state, ["chanelMessages", action.payload.chanel_id], []);
      state.chanelMessages[action.payload.chanel_id].push(action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        chanelMessages: state.chanelMessages
      });

    case _liveStreamingActions.default.actionTypes.CLEAR_LIVE_CHAT_MESSAGE:
      (0, _lodash.set)(state, ["chanelMessages", action.chanel_id], []);
      return _objectSpread({}, state);

    case _liveStreamingActions.default.actionTypes.PUT_RECONNECT_FLAG:
      return _objectSpread(_objectSpread({}, state), {}, {
        tryReconnect: true
      });

    case _liveStreamingActions.default.actionTypes.DESTROY_RECONNECT_FLAG:
      return _objectSpread(_objectSpread({}, state), {}, {
        tryReconnect: false
      });

    case _liveStreamingActions.default.actionTypes.APPEND_GIFT_HISTORY:
      (0, _lodash.set)(state, ["chanelGifts", action.payload.chanel_id, action.payload.queue_id], action.payload);
      return _objectSpread(_objectSpread({}, state), {}, {
        chanelGifts: _objectSpread({}, state.chanelGifts)
      });

    case _liveStreamingActions.default.actionTypes.DESTROY_GIFT_HISTORY:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          chanelGifts: _objectSpread(_objectSpread({}, state.chanelGifts), {}, {
            [action.payload.chanel_id]: {
              [action.payload.queue_id]: undefined
            }
          })
        });
      }

    case _liveStreamingActions.default.actionTypes.CLEAR_GIFT_HISTORIES:
      (0, _lodash.set)(state, ["chanelGifts", action.chanel_id], null);
      return _objectSpread({}, state);

    default:
      return state;
  }
};

exports.default = _default;