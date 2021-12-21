"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var liveStreamingActions_1 = __importDefault(require("../../stores/actions/liveStreamingActions"));
var lodash_1 = require("lodash");
var initialState = {
    giftNotifyBaseClass: "d-flex align-items-center box-gift-item rounded-pill p-1 my-3 animate__animated",
    giftContainerBaseClass: "gift-animate-container animate__animated",
    giftContainerId: "gift-container",
    showGift: false,
    tryReconnect: false,
    gift: null,
    chanelMessages: null,
};
exports.default = (function (state, action) {
    var _a, _b, _c;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case liveStreamingActions_1.default.actionTypes.SHOW_GIFT:
            return __assign(__assign({}, state), { showGift: true, gift: action.gift });
        case liveStreamingActions_1.default.actionTypes.SHOW_GIFT:
            return __assign(__assign({}, state), { showGift: true, gift: action.gift });
        case liveStreamingActions_1.default.actionTypes.CLOSE_GIFT:
            return __assign(__assign({}, state), { showGift: false, gift: null });
        case liveStreamingActions_1.default.actionTypes.SET_LIVE_CHAT_MESSAGES:
            return __assign(__assign({}, state), { chanelMessages: (_a = {},
                    _a[action.payload.chanel_id] = action.payload.messages,
                    _a) });
        case liveStreamingActions_1.default.actionTypes.APPEND_LIVE_CHAT_MESSAGE:
            if (!(0, lodash_1.get)(state, ["chanelMessages", action.payload.chanel_id]))
                (0, lodash_1.set)(state, ["chanelMessages", action.payload.chanel_id], []);
            state.chanelMessages[action.payload.chanel_id].push(action.payload);
            return __assign(__assign({}, state), { chanelMessages: state.chanelMessages });
        case liveStreamingActions_1.default.actionTypes.CLEAR_LIVE_CHAT_MESSAGE:
            (0, lodash_1.set)(state, ["chanelMessages", action.chanel_id], []);
            return __assign({}, state);
        case liveStreamingActions_1.default.actionTypes.PUT_RECONNECT_FLAG:
            return __assign(__assign({}, state), { tryReconnect: true });
        case liveStreamingActions_1.default.actionTypes.DESTROY_RECONNECT_FLAG:
            return __assign(__assign({}, state), { tryReconnect: false });
        case liveStreamingActions_1.default.actionTypes.APPEND_GIFT_HISTORY:
            (0, lodash_1.set)(state, ["chanelGifts", action.payload.chanel_id, action.payload.queue_id], action.payload);
            return __assign(__assign({}, state), { chanelGifts: __assign({}, state.chanelGifts) });
        case liveStreamingActions_1.default.actionTypes.DESTROY_GIFT_HISTORY: {
            return __assign(__assign({}, state), { chanelGifts: __assign(__assign({}, state.chanelGifts), (_b = {}, _b[action.payload.chanel_id] = (_c = {},
                    _c[action.payload.queue_id] = undefined,
                    _c), _b)) });
        }
        case liveStreamingActions_1.default.actionTypes.CLEAR_GIFT_HISTORIES:
            (0, lodash_1.set)(state, ["chanelGifts", action.chanel_id], null);
            return __assign({}, state);
        default:
            return state;
    }
});
