"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const actionTypes = {
  SHOW_GIFT: "SHOW_GIFT",
  CLOSE_GIFT: "CLOSE_GIFT",
  APPEND_LIVE_CHAT_MESSAGE: "APPEND_LIVE_CHAT_MESSAGE",
  CLEAR_LIVE_CHAT_MESSAGE: "CLEAR_LIVE_CHAT_MESSAGE",
  SET_LIVE_CHAT_MESSAGES: "SET_LIVE_CHAT_MESSAGES",
  PUT_RECONNECT_FLAG: "PUT_RECONNECT_FLAG",
  DESTROY_RECONNECT_FLAG: "DESTROY_RECONNECT_FLAG",
  APPEND_GIFT_HISTORY: "APPEND_GIFT_HISTORY",
  DESTROY_GIFT_HISTORY: "DESTROY_GIFT_HISTORY",
  CLEAR_GIFT_HISTORIES: "CLEAR_GIFT_HISTORIES",
  HANDLE_RAPID_PUSH_GIFT: "HANDLE_RAPID_PUSH_GIFT"
};

const showGift = gift => ({
  type: actionTypes.SHOW_GIFT,
  gift
});

const closeGift = () => ({
  type: actionTypes.CLOSE_GIFT
});

const appendLiveChatMessage = payload => ({
  type: actionTypes.APPEND_LIVE_CHAT_MESSAGE,
  payload
});

const setLiveChatMessages = payload => ({
  type: actionTypes.SET_LIVE_CHAT_MESSAGES,
  payload
});

const clearLiveChatMessage = chane_id => ({
  type: actionTypes.CLEAR_LIVE_CHAT_MESSAGE,
  chane_id
});

const putReconnectFlag = () => ({
  type: actionTypes.PUT_RECONNECT_FLAG
});

const destroyReconnectFlag = () => ({
  type: actionTypes.DESTROY_RECONNECT_FLAG
});

const appendGiftHistories = payload => ({
  type: actionTypes.APPEND_GIFT_HISTORY,
  payload
});

const handleRapidPushGift = payload => ({
  type: actionTypes.HANDLE_RAPID_PUSH_GIFT,
  payload
});

const destroyGiftHistory = payload => ({
  type: actionTypes.DESTROY_GIFT_HISTORY,
  payload
});

const clearGiftHistories = chanel_id => ({
  type: actionTypes.CLEAR_GIFT_HISTORIES,
  chanel_id
});

var _default = {
  actionTypes,
  showGift,
  closeGift,
  appendLiveChatMessage,
  clearLiveChatMessage,
  setLiveChatMessages,
  putReconnectFlag,
  destroyReconnectFlag,
  appendGiftHistories,
  destroyGiftHistory,
  clearGiftHistories,
  handleRapidPushGift
};
exports.default = _default;