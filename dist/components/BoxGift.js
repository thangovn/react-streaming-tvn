"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _material = require("@mui/material");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _reactRedux = require("react-redux");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BoxGridLiveItem = _ref => {
  let {
    gift
  } = _ref;
  const {
    giftNotifyBaseClass
  } = (0, _reactRedux.useSelector)(state => state.liveStreamingState);
  return /*#__PURE__*/_react.default.createElement("div", {
    id: gift.queue_id,
    className: (0, _classnames.default)(giftNotifyBaseClass, "animate__fadeInRight")
  }, /*#__PURE__*/_react.default.createElement(_material.Avatar, {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkwYQuTYcqB7wnAvzApNYO2MLl_Llz4RyyA&usqp=CAU"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "d-flex flex-column ms-2"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "fw-bolder"
  }, gift.user_name), /*#__PURE__*/_react.default.createElement("div", null, "Send ", gift.gift_data.name)));
};

var _default = () => {
  const {
    liveStreamingState: {
      chanelGifts
    },
    sessionState: {
      currentChanel,
      currentLoginInformation
    }
  } = (0, _reactRedux.useSelector)(state => state);
  const gifts = (0, _lodash.cloneDeep)((0, _lodash.filter)((0, _lodash.get)(chanelGifts, currentChanel)));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "box-gift d-flex flex-column justify-content-end"
  }, (0, _lodash.map)(gifts, (item, idx) => /*#__PURE__*/_react.default.createElement(BoxGridLiveItem, {
    key: idx,
    gift: item
  })));
};

exports.default = _default;