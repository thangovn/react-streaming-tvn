"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LiveStreamingScreenLayout = props => {
  const {
    children,
    className
  } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(className, "position-relative flex-fill")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "screen-player"
  }, children));
};

var _default = LiveStreamingScreenLayout;
exports.default = _default;