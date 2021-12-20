"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSocketIO;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

var _reactRedux = require("react-redux");

var _socket = _interopRequireDefault(require("socket.io-client"));

var _liveStreamingActions = _interopRequireDefault(require("../stores/actions/liveStreamingActions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSocketIO(url) {
  const socket = (0, _react.useMemo)(() => {
    return (0, _socket.default)(url, {
      transports: ["websocket"],
      withCredentials: true
    });
  }, [url]);

  const scrollDown = () => {
    var _document$getElementB;

    (_document$getElementB = document.getElementById("end")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.scrollIntoView({
      behavior: "smooth"
    });
  };

  const [errors, setErrors] = (0, _react.useState)([]);
  const [joinState, setJoinState] = (0, _react.useState)(false);
  const [messages, setMessages] = (0, _react.useState)([]);
  const dispatch = (0, _reactRedux.useDispatch)();

  function sendMessage(data) {
    if (!socket) return;

    try {
      socket.emit("send_message", data);
    } catch (error) {
      setErrors([...errors, error]);
    }
  }

  function sendGift(data) {
    if (!socket) return;

    try {
      socket.emit("send_gift", data);
    } catch (error) {
      setErrors([...errors, error]);
    }
  }

  function joinChat(data) {
    socket.emit("join_room", data);
    setJoinState(true);
  }

  function leaveChat(data) {
    socket.emit("leave_room", data);
    setJoinState(true);
  }

  (0, _react.useEffect)(() => {
    if (joinState) return;

    const handleConnect = () => {
      console.log("connected");
    };

    const handleDisconnect = async () => {
      console.log("dis chat");
      setJoinState(false);
    };

    const handleReceiveGift = async data => {
      console.log("subscribe.receive_gift", {
        data
      });
      dispatch(_liveStreamingActions.default.closeGift());
      dispatch(_liveStreamingActions.default.handleRapidPushGift(data));
    };

    const handleSubChanelMessage = async payload => {
      dispatch(_liveStreamingActions.default.setLiveChatMessages(payload)); //   setMessages(payload.messages);

      scrollDown();
    };

    const handleChanelConcurrent = async _ref => {
      let {
        concurrent,
        chanel_id
      } = _ref;
      console.log({
        concurrent,
        chanel_id
      });
    };

    const handleNewMessage = async data => {
      dispatch(_liveStreamingActions.default.appendLiveChatMessage(data));
      scrollDown();
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("subscribe.receive_gift", handleReceiveGift);
    socket.on("subscribe.chanel_messages", handleSubChanelMessage);
    socket.on("subscribe.chanel_concurrent", handleChanelConcurrent);
    socket.on("subscribe.new_message", handleNewMessage);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("subscribe.receive_gift", handleReceiveGift);
      socket.off("subscribe.chanel_messages", handleSubChanelMessage);
      socket.off("subscribe.chanel_concurrent", handleChanelConcurrent);
      socket.off("subscribe.new_message", handleNewMessage);
    };
  }, [url]);
  return {
    joinState,
    sendMessage,
    joinChat,
    leaveChat,
    errors,
    messages,
    sendGift
  };
}