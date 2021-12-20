"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _agoraRtcSdkNg = _interopRequireDefault(require("agora-rtc-sdk-ng"));

var _react = _interopRequireWildcard(require("react"));

var _useAgora = _interopRequireDefault(require("../hooks/useAgora"));

var _MediaPlayer = _interopRequireDefault(require("./MediaPlayer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const client = _agoraRtcSdkNg.default.createClient({
  codec: "h264",
  mode: "live"
});

const LiveAgoraTVN = _ref => {
  let {
    appid = "3098260ca7614087844230aec70a64eb",
    channel = "demo",
    token,
    uid,
    showSetting = false,
    autoJoin = true
  } = _ref;
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
    errors,
    joinAu
  } = (0, _useAgora.default)(client !== null && client !== void 0 ? client : null);
  (0, _react.useEffect)(() => {
    if (autoJoin) joinAu(appid, channel, token);
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "call h-100"
  }, Boolean(showSetting) && /*#__PURE__*/_react.default.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "join",
    type: "button",
    className: "btn-primary mr-2",
    disabled: joinState,
    onClick: () => {
      join(appid, channel, token);
    }
  }, "Create Chanel"), /*#__PURE__*/_react.default.createElement("button", {
    id: "join",
    type: "button",
    className: "btn-primary mr-2",
    disabled: joinState,
    onClick: () => {
      joinAu(appid, channel, token);
    }
  }, "Join"), /*#__PURE__*/_react.default.createElement("button", {
    id: "leave",
    type: "button",
    color: "error",
    disabled: !joinState,
    onClick: () => {
      leave();
    }
  }, "Leave")), /*#__PURE__*/_react.default.createElement("div", {
    className: "player-container h-100 position-relative"
  }, Boolean(joinState) && /*#__PURE__*/_react.default.createElement("div", {
    className: "loading-wrap"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "loader m-auto"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "content"
  }, "Waiting for connection")), remoteUsers.map(user => /*#__PURE__*/_react.default.createElement("div", {
    className: "remote-player-wrapper",
    key: user.uid
  }, /*#__PURE__*/_react.default.createElement(_MediaPlayer.default, {
    videoTrack: user.videoTrack,
    audioTrack: user.audioTrack
  })))));
};

var _default = LiveAgoraTVN;
exports.default = _default;