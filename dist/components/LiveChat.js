"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

var _material = require("@mui/material");

var _classnames = _interopRequireDefault(require("classnames"));

var _emojiMart = require("emoji-mart");

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _sessionActions = _interopRequireDefault(require("../stores/actions/sessionActions"));

var _BoxGift = _interopRequireDefault(require("./BoxGift"));

var _index = require("../images/index");

var _useSocketIO = _interopRequireDefault(require("../hooks/useSocketIO"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _ref => {
  let {
    channelChat,
    onReceiveGift,
    socketURL
  } = _ref;
  const {
    sessionState: {
      currentLoginInformation,
      currentChanel
    },
    liveStreamingState: {
      chanelMessages
    }
  } = (0, _reactRedux.useSelector)(state => state);

  const [anchorEl, setAnchorEl] = _react.default.useState(null);

  const [mess, setMess] = (0, _react.useState)("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    joinState,
    sendMessage,
    joinChat,
    leaveChat,
    errors,
    messages
  } = (0, _useSocketIO.default)(socketURL);
  (0, _react.useEffect)(() => {
    if (currentLoginInformation && channelChat) {
      dispatch(_sessionActions.default.setCurrentChanel(channelChat));
      joinChat(_objectSpread(_objectSpread({}, currentLoginInformation), {}, {
        chanel_id: channelChat
      }));
    }

    return () => {
      leaveChat(_objectSpread(_objectSpread({}, currentLoginInformation), {}, {
        chanel_id: channelChat
      }));
    };
  }, []); // useEffect(() => {
  //   joinChat("khoa", "khoa", "bacarat-18");
  //   return () => leaveChat("khoa", "khoa", "bacarat-18");
  // }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHideChat = event => {
    var _document$getElementB, _document$getElementB2, _document$getElementB3;

    (_document$getElementB = document.getElementById("box-chat")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.classList.toggle("show");
    (_document$getElementB2 = document.getElementById("chatInputWrap")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.classList.toggle("show");
    (_document$getElementB3 = document.getElementById("hideIcon")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.classList.toggle("back");
  };

  const addEmoji = emj => {
    setMess(mess + String.fromCodePoint(parseInt(emj.unified, 16)));
  };

  const onSend = () => {
    if (mess === "") return;

    const data = _objectSpread(_objectSpread({}, currentLoginInformation), {}, {
      chanel_id: currentChanel,
      message: mess
    }); // console.log(data);


    sendMessage(data);
    setMess("");
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "live-chat",
    style: {
      position: "absolute"
    }
  }, /*#__PURE__*/_react.default.createElement(_BoxGift.default, null), /*#__PURE__*/_react.default.createElement("div", {
    id: "box-chat",
    className: "box-chat hide--slide-y show"
  }, (0, _lodash.map)((0, _lodash.get)(chanelMessages, currentChanel), (item, index) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: (0, _classnames.default)("box-chat-item rounded-pill", {
        "text-end": currentLoginInformation.user_id === item.user_id,
        "text-start": currentLoginInformation.user_id !== item.user_id
      })
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)("box-chat-item--text", {
        current: currentLoginInformation.user_id === item.user_id
      })
    }, /*#__PURE__*/_react.default.createElement("b", null, item.user_name, ":"), " ", item.message));
  }), /*#__PURE__*/_react.default.createElement("a", {
    id: "end"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Button, {
    onClick: handleHideChat,
    variant: "text",
    disableTouchRipple: true
  }, /*#__PURE__*/_react.default.createElement("img", {
    id: "hideIcon",
    className: "ticon rotate-225 back",
    src: _index.ticon_arrow_bottom.default,
    style: {
      width: 20,
      height: 20
    }
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "chatInputWrap hide--slide-x hide--slide-y show",
    id: "chatInputWrap"
  }, /*#__PURE__*/_react.default.createElement(_material.TextField, {
    className: "overflow-hidden",
    variant: "standard",
    id: "chatInput",
    fullWidth: true,
    value: mess,
    size: "medium",
    onKeyDown: e => Boolean(e.keyCode == 13) && onSend(),
    onChange: e => setMess(e.target.value),
    InputProps: {
      startAdornment: /*#__PURE__*/_react.default.createElement(_material.Button, {
        onClick: handleClick,
        "aria-describedby": id,
        variant: "text",
        disableTouchRipple: true
      }, /*#__PURE__*/_react.default.createElement(_material.Icon, {
        className: "hover--opacity"
      }, "mood")),
      endAdornment: /*#__PURE__*/_react.default.createElement(_material.Button, {
        name: "SEND",
        onClick: onSend,
        className: "btn-send-chat br-5"
      }, "SEND"),
      disableUnderline: true
    }
  })), /*#__PURE__*/_react.default.createElement(_material.Popover, {
    id: id,
    open: open,
    anchorEl: anchorEl,
    onClose: handleClose,
    elevation: 0,
    disablePortal: true,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right"
    },
    transformOrigin: {
      vertical: "bottom",
      horizontal: "left"
    }
  }, /*#__PURE__*/_react.default.createElement(_emojiMart.Picker, {
    theme: "dark",
    showPreview: false,
    showSkinTones: false,
    useButton: false,
    emojiSize: 20,
    sheetSize: 20,
    onSelect: addEmoji
  })));
};

exports.default = _default;