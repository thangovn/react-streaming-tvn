"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _signInKey = require("../utils/signInKey");

var _react = _interopRequireWildcard(require("react"));

var _reactHelmetAsync = require("react-helmet-async");

var _reactRedux = require("react-redux");

var _react2 = require("redux-persist/integration/react");

var _ScreenLayout = _interopRequireDefault(require("../layouts/ScreenLayout"));

var _stores = require("../stores");

require("../styles/app.scss");

var _GiftDialog = _interopRequireDefault(require("./GiftDialog"));

var _GiftContainer = _interopRequireDefault(require("./GiftDialog/GiftContainer"));

var _LiveAgoraTVN = _interopRequireDefault(require("./LiveAgoraTVN"));

var _LiveChat = _interopRequireDefault(require("./LiveChat"));

var _sessionActions = _interopRequireDefault(require("../stores/actions/sessionActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = /*#__PURE__*/_react.default.memo(_ref => {
  let {
    userInfo: {
      user_id,
      user_name
    },
    configChat: {
      socketURL = "18.138.225.4:5000",
      channelChat
    },
    configLive: {
      autoJoin = true,
      showSetting = false,
      uid,
      appid,
      token,
      channelLive
    },
    giftData
  } = _ref;
  const [appId, setAppId] = (0, _react.useState)("");
  const [statusAppId, setStatusAppId] = (0, _react.useState)(null); // const dispatch = useDispatch();

  const initial = res => {
    if (res.error) {
      setStatusAppId({
        statusCode: res.error.statusCode,
        name: res.error.name,
        message: res.error.message
      });
    } else {
      setAppId(res.secret);
      setStatusAppId({
        statusCode: 200,
        name: "ok",
        message: "ok"
      });
    }
  };

  (0, _react.useEffect)(() => {
    (0, _signInKey.fetchSignInKey)(appid).then(res => {
      initial(res);
    }).catch();
  }, [appid]);
  (0, _react.useEffect)(() => {
    _stores.store.dispatch(_sessionActions.default.setCurrentLoginInformations({
      user_name: user_name,
      user_id: user_id
    }));
  }, [user_id, user_name]);
  (0, _react.useEffect)(() => {
    _stores.store.dispatch(_sessionActions.default.setCurrentChanel(channelChat));
  }, [channelChat]);

  const rederResult = () => {
    if ((statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.statusCode) == 200) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_GiftContainer.default, null), /*#__PURE__*/_react.default.createElement(_LiveChat.default, {
        socketURL: socketURL,
        channelChat: channelChat,
        onReceiveGift: gift => {
          console.log(gift);
        }
      }), /*#__PURE__*/_react.default.createElement(_GiftDialog.default, {
        className: "gift-absolute",
        value: giftData.value,
        loading: giftData.loading,
        socketURL: socketURL
      }), /*#__PURE__*/_react.default.createElement(_LiveAgoraTVN.default, {
        appid: appId,
        channel: channelLive,
        autoJoin: autoJoin,
        showSetting: showSetting,
        token: token,
        uid: uid
      }));
    } else {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "loading-wrap"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "content"
      }, statusAppId === null || statusAppId === void 0 ? void 0 : statusAppId.message));
    }
  };

  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _stores.store
  }, /*#__PURE__*/_react.default.createElement(_react2.PersistGate, {
    loading: null,
    persistor: _stores.persistor
  }, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.HelmetProvider, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "live-streaming-screen container d-flex flex-column flex-fill"
  }, /*#__PURE__*/_react.default.createElement(_ScreenLayout.default, {
    className: "screen "
  }, rederResult())))));
});

exports.default = _default;