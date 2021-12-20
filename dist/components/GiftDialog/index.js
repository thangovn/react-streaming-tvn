"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _material = require("@mui/material");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactUse = require("react-use");

var _useSocketIO = _interopRequireDefault(require("../../hooks/useSocketIO"));

var _index = require("../../images/index");

var _GiftGif = _interopRequireDefault(require("./GiftGif"));

var _GiftLottie = _interopRequireDefault(require("./GiftLottie"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const GiftDialog = _ref => {
  let {
    className,
    value,
    loading,
    socketURL
  } = _ref;
  const {
    sendGift
  } = (0, _useSocketIO.default)(socketURL);
  const dialogRef = (0, _react.useRef)(null);
  const [open, toggleOpen] = (0, _reactUse.useToggle)(false);
  const {
    currentChanel,
    currentLoginInformation
  } = (0, _reactRedux.useSelector)(state => state.sessionState);

  const onGiftClicked = item => {
    sendGift(_objectSpread({
      chanel_id: currentChanel,
      quantity: 99,
      gift_data: item,
      time: new Date().toISOString()
    }, currentLoginInformation));
    toggleOpen();
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    variant: "text",
    onClick: toggleOpen,
    disableRipple: true,
    className: (0, _classnames.default)(className)
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _index.gift_icon.default,
    className: "ms-auto",
    style: {
      width: "5rem"
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Dialog, {
    ref: dialogRef,
    open: true,
    onClose: toggleOpen,
    className: (0, _classnames.default)({
      "d-none": !open
    }),
    "aria-labelledby": "alert-dialog-title",
    PaperProps: {
      className: "dark-dialog gift-dialog"
    },
    "aria-describedby": "alert-dialog-description",
    maxWidth: "sm"
  }, /*#__PURE__*/_react.default.createElement(_material.DialogContent, {
    className: "text-light"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    spacing: 1,
    className: "gift-container"
  }, loading && /*#__PURE__*/_react.default.createElement(_material.CircularProgress, null), !loading && (0, _lodash.map)(value, (item, idx) => {
    return /*#__PURE__*/_react.default.createElement(_material.Grid, {
      item: true,
      md: 3,
      key: idx,
      className: (0, _classnames.default)("position-relative")
    }, item.gift_type === 'Lottie' && /*#__PURE__*/_react.default.createElement(_GiftLottie.default, {
      resource: item.resource,
      name: item.name,
      isStopped: !open,
      onClick: () => onGiftClicked(item)
    }), item.gift_type === 'Gif' && /*#__PURE__*/_react.default.createElement(_GiftGif.default, {
      resource: item.resource,
      name: item.name,
      isStopped: !open,
      onClick: () => onGiftClicked(item)
    }));
  })))));
};

var _default = GiftDialog;
exports.default = _default;