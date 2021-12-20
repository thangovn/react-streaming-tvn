"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLottie = _interopRequireDefault(require("react-lottie"));

var _reactRedux = require("react-redux");

var _GiftLottie = require("./GiftLottie");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = /*#__PURE__*/_react.default.memo(() => {
  const {
    gift
  } = (0, _reactRedux.useSelector)(state => state.liveStreamingState); // console.log(gift)

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "gift-container",
    className: "animate__animated"
  }, (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == 'Lottie' && /*#__PURE__*/_react.default.createElement(_reactLottie.default, {
    options: (0, _GiftLottie.prepareAinimation)(gift.gift_data.resource),
    style: {
      zIndex: 10000
    }
  }), (gift === null || gift === void 0 ? void 0 : gift.gift_data.gift_type) == 'Gif' && /*#__PURE__*/_react.default.createElement("img", {
    src: gift.gift_data.resource,
    alt: "",
    style: {
      zIndex: 10000
    }
  }));
});

exports.default = _default;