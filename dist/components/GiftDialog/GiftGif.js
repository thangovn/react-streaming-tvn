"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareAinimation = exports.default = exports.GIF_ICON_WIDTH = exports.GIF_ICON_HEIGHT = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GIF_ICON_WIDTH = 120;
exports.GIF_ICON_WIDTH = GIF_ICON_WIDTH;
const GIF_ICON_HEIGHT = 120;
exports.GIF_ICON_HEIGHT = GIF_ICON_HEIGHT;

const prepareAinimation = animationData => ({
  loop: true,
  autoplay: true,
  animationData,
  isStoped: true,
  isPause: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
});

exports.prepareAinimation = prepareAinimation;

var _default = _ref => {
  let {
    resource,
    onClick,
    isStopped,
    name
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("gift-lottie p-1", {
      "d-none": isStopped
    }),
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      //   top: "10%",
      //   left: "10%",
      //   bottom: 0,
      //   right: 0,
      height: GIF_ICON_HEIGHT,
      width: GIF_ICON_WIDTH,
      cursor: "pointer"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: resource,
    alt: name,
    style: {
      maxWidth: "90%",
      maxHeight: "90%"
    }
  }), /*#__PURE__*/_react.default.createElement("tspan", {
    style: {
      letterSpacing: "0.01rem",
      position: "absolute",
      bottom: 0
    }
  }, (0, _lodash.capitalize)(name))));
};

exports.default = _default;