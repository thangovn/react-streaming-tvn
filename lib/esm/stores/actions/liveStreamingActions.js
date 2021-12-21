var actionTypes = {
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
    HANDLE_RAPID_PUSH_GIFT: "HANDLE_RAPID_PUSH_GIFT",
};
var showGift = function (gift) { return ({
    type: actionTypes.SHOW_GIFT,
    gift: gift,
}); };
var closeGift = function () { return ({
    type: actionTypes.CLOSE_GIFT,
}); };
var appendLiveChatMessage = function (payload) { return ({
    type: actionTypes.APPEND_LIVE_CHAT_MESSAGE,
    payload: payload,
}); };
var setLiveChatMessages = function (payload) { return ({
    type: actionTypes.SET_LIVE_CHAT_MESSAGES,
    payload: payload,
}); };
var clearLiveChatMessage = function (chane_id) { return ({
    type: actionTypes.CLEAR_LIVE_CHAT_MESSAGE,
    chane_id: chane_id,
}); };
var putReconnectFlag = function () { return ({
    type: actionTypes.PUT_RECONNECT_FLAG,
}); };
var destroyReconnectFlag = function () { return ({
    type: actionTypes.DESTROY_RECONNECT_FLAG,
}); };
var appendGiftHistories = function (payload) { return ({
    type: actionTypes.APPEND_GIFT_HISTORY,
    payload: payload,
}); };
var handleRapidPushGift = function (payload) { return ({
    type: actionTypes.HANDLE_RAPID_PUSH_GIFT,
    payload: payload,
}); };
var destroyGiftHistory = function (payload) { return ({
    type: actionTypes.DESTROY_GIFT_HISTORY,
    payload: payload,
}); };
var clearGiftHistories = function (chanel_id) { return ({
    type: actionTypes.CLEAR_GIFT_HISTORIES,
    chanel_id: chanel_id,
}); };
export default {
    actionTypes: actionTypes,
    showGift: showGift,
    closeGift: closeGift,
    appendLiveChatMessage: appendLiveChatMessage,
    clearLiveChatMessage: clearLiveChatMessage,
    setLiveChatMessages: setLiveChatMessages,
    putReconnectFlag: putReconnectFlag,
    destroyReconnectFlag: destroyReconnectFlag,
    appendGiftHistories: appendGiftHistories,
    destroyGiftHistory: destroyGiftHistory,
    clearGiftHistories: clearGiftHistories,
    handleRapidPushGift: handleRapidPushGift,
};
